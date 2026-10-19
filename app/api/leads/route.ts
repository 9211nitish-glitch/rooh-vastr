import { NextResponse } from "next/server";
import { INITIAL_CHAT_LEADS } from "@/lib/data/leads-data";
import { ChatLead } from "@/lib/types";

// In-memory fallback cache so added leads persist during the server session
let memoryLeads: ChatLead[] = [...INITIAL_CHAT_LEADS];

export async function GET() {
  return NextResponse.json({
    success: true,
    leads: memoryLeads,
    total: memoryLeads.length,
    newCount: memoryLeads.filter((l) => l.status === "new").length,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    if (!body.customer_name || !body.customer_phone) {
      return NextResponse.json(
        { success: false, error: "Customer name and phone number are required" },
        { status: 400 }
      );
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newLead: ChatLead = {
      id: body.id || `RV-LEAD-${randomSuffix}`,
      customer_name: body.customer_name.trim(),
      customer_phone: body.customer_phone.trim(),
      customer_email: body.customer_email?.trim() || undefined,
      product_name: body.product_name || "Custom Personalized Gift",
      category: body.category || "General Inquiry",
      customization_notes: body.customization_notes || body.notes || "",
      budget: body.budget || undefined,
      quantity: body.quantity ? Number(body.quantity) : 1,
      city: body.city || undefined,
      inquiry_type: body.inquiry_type || "order_request",
      chat_summary: body.chat_summary || "Captured from storefront AI Chatbot",
      transcript: body.transcript || [],
      status: "new",
      created_at: new Date().toISOString(),
      source: body.source || "AI Chatbot",
    };

    memoryLeads = [newLead, ...memoryLeads];

    return NextResponse.json({
      success: true,
      lead: newLead,
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

export async function PATCH(req: Request) {
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
      ...(customization_notes !== undefined && { customization_notes }),
    };

    return NextResponse.json({
      success: true,
      lead: memoryLeads[leadIndex],
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
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
