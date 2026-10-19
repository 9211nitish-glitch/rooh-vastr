import { NextResponse } from "next/server";
import { getAIGiftRecommendations, GiftFinderInput } from "@/lib/gemini";
import { SEED_PRODUCTS } from "@/lib/data/store-data";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const recipient = body.recipient || "Friend";
    const occasion = body.occasion || "Birthday";
    const budget = body.budget ? Number(body.budget) : undefined;
    const preferences = body.preferences || body.notes || "";

    const catalogItems = SEED_PRODUCTS.map((p) => ({
      name: p.name,
      slug: p.slug,
      price: p.selling_price || p.regular_price,
      description: p.short_description || p.description,
    }));

    const input: GiftFinderInput = {
      recipient,
      occasion,
      budget,
      preferences: preferences || undefined,
      availableProducts: catalogItems,
    };

    const recommendation = await getAIGiftRecommendations(input);

    return NextResponse.json({
      success: true,
      recommendation,
    });
  } catch (error: any) {
    console.error("AI gift recommendation error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to generate recommendations",
        recommendation:
          "We couldn't connect to the AI recommendation engine right now, but our bestselling personalized gifts below make unforgettable keepsakes!",
      },
      { status: 500 }
    );
  }
}
