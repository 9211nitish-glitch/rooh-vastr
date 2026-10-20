import { NextResponse } from "next/server";
import { INITIAL_CHAT_LEADS } from "@/lib/data/leads-data";
import { ChatLead } from "@/lib/types";
import { isAuthorizedAdmin } from "@/lib/auth/admin-auth";

// In-memory fallback cache so added leads persist during the server session
let memoryLeads: ChatLead[] = [...INITIAL_CHAT_LEADS];

/**
 * GET /api/leads
 * Protected: Staff/Admin only to safeguard customer privacy & phone numbers.
 */
export async function GET(req: Request) {
  if (!isAuthorizedAdmin(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized: Staff authentication required to access customer lead records." },
      { status: 401 }
    );
  }

  return NextResponse.json({
    success: true,
    leads: memoryLeads,
    total: memoryLeads.length,
    newCount: memoryLeads.filter((l) => l.status === "new").length,
  });
}

/**
 * POST /api/leads
 * Public endpoint for storefront chatbot with strict validation & sanitization
 */
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const customerName = String(body.customer_name || "").trim().slice(0, 100);
    const customerPhone = String(body.customer_phone || "").trim().slice(0, 20);

    if (!customerName || !customerPhone) {
      return NextResponse.json(
        { success: false, error: "Customer name and phone number are required" },
        { status: 400 }
      );
    }

    // Basic phone validation (digits, plus, dashes, spaces)
    if (!/^[0-9+\s-]{7,20}$/.test(customerPhone)) {
      return NextResponse.json(
        { success: false, error: "Invalid phone number format" },
        { status: 400 }
      );
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newLead: ChatLead = {
      id: `RV-LEAD-${Date.now().toString(36).toUpperCase()}-${randomSuffix}`,
      customer_name: customerName,
      customer_phone: customerPhone,
      customer_email: body.customer_email ? String(body.customer_email).trim().slice(0, 120) : undefined,
      product_name: body.product_name ? String(body.product_name).slice(0, 150) : "Custom Personalized Gift",
      category: body.category ? String(body.category).slice(0, 80) : "General Inquiry",
      customization_notes: String(body.customization_notes || body.notes || "").slice(0, 1000),
      budget: body.budget ? String(body.budget).slice(0, 50) : undefined,
      quantity: Math.min(Math.max(Number(body.quantity) || 1, 1), 10000),
      city: body.city ? String(body.city).slice(0, 100) : undefined,
      inquiry_type: body.inquiry_type || "order_request",
      chat_summary: String(body.chat_summary || "Captured from storefront AI Chatbot").slice(0, 500),
      transcript: Array.isArray(body.transcript) ? body.transcript.slice(-30) : [],
      status: "new",
      created_at: new Date().toISOString(),
      source: "AI Chatbot",
    };

    memoryLeads = [newLead, ...memoryLeads];

    return NextResponse.json({
      success: true,
      lead: { id: newLead.id, status: newLead.status },
      message: "Lead received successfully and registered in Admin CRM",
    });
  } catch (error: any) {
    console.error("Failed to save lead:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save lead" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/leads
 * Protected: Staff/Admin only
 */
export async function PATCH(req: Request) {
  if (!isAuthorizedAdmin(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized: Staff authentication required to alter lead records." },
      { status: 401 }
    );
  }

  try {
    const body = await req.json().catch(() => ({}));
    const { id, status, customization_notes } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Lead ID required" }, { status: 400 });
    }

    const leadIndex = memoryLeads.findIndex((l) => l.id === id);
    if (leadIndex === -1) {
      return NextResponse.json({ success: false, error: "Lead not found" }, { status: 404 });
    }

    memoryLeads[leadIndex] = {
      ...memoryLeads[leadIndex],
      ...(status && { status }),
      ...(customization_notes !== undefined && { customization_notes: String(customization_notes).slice(0, 1000) }),
    };

    return NextResponse.json({
      success: true,
      lead: memoryLeads[leadIndex],
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

/**
 * DELETE /api/leads
 * Protected: Staff/Admin only
 */
export async function DELETE(req: Request) {
  if (!isAuthorizedAdmin(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized: Staff authentication required to delete lead records." },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Lead ID required" }, { status: 400 });
    }

    memoryLeads = memoryLeads.filter((l) => l.id !== id);
    return NextResponse.json({ success: true, message: "Lead removed" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
