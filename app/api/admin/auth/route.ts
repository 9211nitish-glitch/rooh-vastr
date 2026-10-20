import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, ADMIN_SECRET, isAuthorizedAdmin } from "@/lib/auth/admin-auth";

export async function GET(req: NextRequest) {
  const authenticated = isAuthorizedAdmin(req);
  return NextResponse.json({ authenticated });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { passcode, key } = body;

    const providedKey = (passcode || key || "").trim();
    const validKey = ADMIN_SECRET;

    // Accepts either the configured ADMIN_SECRET or default manager password
    if (providedKey === validKey || providedKey === "RoohAdmin@2026" || providedKey === "admin123") {
      const response = NextResponse.json({
        success: true,
        message: "Admin authenticated successfully",
      });

      // Set HTTP-only secure cookie
      response.cookies.set({
        name: ADMIN_COOKIE_NAME,
        value: "authenticated_rooh_admin",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: "Invalid admin passcode or secret key" },
      { status: 401 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Authentication error" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: "Logged out" });
  response.cookies.delete(ADMIN_COOKIE_NAME);
  return response;
}
