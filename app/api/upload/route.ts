import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { supabase, isSupabaseReady } from "@/lib/supabase/client";
import { isAuthorizedAdmin } from "@/lib/auth/admin-auth";

const ALLOWED_FOLDERS = new Set([
  "general",
  "products",
  "banners",
  "gallery",
  "custom-prints",
  "reviews",
]);

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

/**
 * Validates magic bytes of uploaded image buffer
 */
function isValidImageSignature(buffer: Buffer, mimeType: string): boolean {
  if (buffer.length < 12) return false;

  // JPEG: FF D8 FF
  if (mimeType === "image/jpeg") {
    return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  }

  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (mimeType === "image/png") {
    return (
      buffer[0] === 0x89 &&
      buffer[1] === 0x50 &&
      buffer[2] === 0x4e &&
      buffer[3] === 0x47
    );
  }

  // WebP: RIFF .... WEBP
  if (mimeType === "image/webp") {
    const isRiff = buffer.toString("ascii", 0, 4) === "RIFF";
    const isWebp = buffer.toString("ascii", 8, 12) === "WEBP";
    return isRiff && isWebp;
  }

  return false;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    let rawFolder = String(formData.get("folder") || "general").trim();

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // 1. Folder Allowlist & Sanitization (prevents path traversal)
    const sanitizedFolder = rawFolder.replace(/[^a-zA-Z0-9_-]/g, "");
    const folder = ALLOWED_FOLDERS.has(sanitizedFolder) ? sanitizedFolder : "general";

    // 2. Authorization check: Staff required for store management uploads (products, banners, general)
    // Shoppers are permitted only for 'custom-prints' & 'reviews'
    const isPublicFolder = folder === "custom-prints" || folder === "reviews";
    if (!isPublicFolder && !isAuthorizedAdmin(request)) {
      return NextResponse.json(
        { error: "Unauthorized: Staff credentials required to upload store assets." },
        { status: 401 }
      );
    }

    // 3. Strict format whitelist - Deny SVG to eliminate active content / Stored XSS vectors
    const mimeType = file.type.toLowerCase();
    if (!ALLOWED_MIME_TYPES.has(mimeType)) {
      return NextResponse.json(
        {
          error:
            "Invalid image format. Only JPEG, PNG, and WebP raster images are allowed. SVG files are prohibited for security.",
        },
        { status: 400 }
      );
    }

    // 4. File extension check
    const extension = path.extname(file.name).toLowerCase();
    const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];
    if (!allowedExtensions.includes(extension)) {
      return NextResponse.json(
        { error: "Invalid file extension. Allowed: .jpg, .jpeg, .png, .webp" },
        { status: 400 }
      );
    }

    // 5. Size check (Max 5MB)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File size exceeds 5MB limit." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 6. Deep Content Inspection: Magic Bytes verification
    if (!isValidImageSignature(buffer, mimeType)) {
      return NextResponse.json(
        { error: "Corrupted or falsified image file signature detected." },
        { status: 400 }
      );
    }

    // 7. Safe Filename Generation
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 9);
    const safeExtension = extension === ".jpeg" ? ".jpg" : extension;
    const uniqueFileName = `${timestamp}_${randomSuffix}${safeExtension}`;

    // 8. Try Supabase Storage if configured
    if (isSupabaseReady && supabase) {
      try {
        const bucketName = "rooh-vastr-assets";
        const filePath = `${folder}/${uniqueFileName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from(bucketName)
          .upload(filePath, buffer, {
            contentType: mimeType,
            upsert: false,
          });

        if (!uploadError && uploadData) {
          const { data: publicUrlData } = supabase.storage
            .from(bucketName)
            .getPublicUrl(filePath);

          if (publicUrlData?.publicUrl) {
            return NextResponse.json({
              success: true,
              url: publicUrlData.publicUrl,
              filename: uniqueFileName,
              source: "supabase",
            });
          }
        }
      } catch (err) {
        console.warn("Supabase storage upload failed, falling back to local disk storage:", err);
      }
    }

    // 9. Save to local public/uploads directory with path traversal containment
    const uploadsBase = path.join(process.cwd(), "public", "uploads");
    const uploadsDir = path.join(uploadsBase, folder);

    // Containment verification
    if (!uploadsDir.startsWith(uploadsBase)) {
      return NextResponse.json({ error: "Invalid upload directory target" }, { status: 400 });
    }

    await fs.mkdir(uploadsDir, { recursive: true });

    const localFilePath = path.join(uploadsDir, uniqueFileName);
    await fs.writeFile(localFilePath, buffer);

    const publicUrl = `/uploads/${folder}/${uniqueFileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: uniqueFileName,
      source: "local",
    });
  } catch (error: any) {
    console.error("Upload API error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error during upload" },
      { status: 500 }
    );
  }
}
