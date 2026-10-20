import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || "";
const geminiClient = apiKey ? new GoogleGenAI({ apiKey }) : null;

export interface GeneratedBlogDraft {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  meta_title: string;
  meta_description: string;
  target_keywords: string[];
  reading_time: string;
  image_url: string;
  status: "draft" | "published";
  created_at: string;
}

const STOCK_EDITORIAL_IMAGES = [
  "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80",
];

import { isAuthorizedAdmin } from "@/lib/auth/admin-auth";

// Simple in-memory rate limiting: max 10 requests per 10-minute window
let requestTimestamps: number[] = [];

export async function POST(req: Request) {
  // 1. Staff Authorization Guard (eliminates public abuse and API quota drain)
  if (!isAuthorizedAdmin(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized: Staff authentication required to invoke AI blog generation." },
      { status: 401 }
    );
  }

  // 2. Rate Limiting Check
  const now = Date.now();
  requestTimestamps = requestTimestamps.filter((t) => now - t < 10 * 60 * 1000);
  if (requestTimestamps.length >= 10) {
    return NextResponse.json(
      { success: false, error: "Too many AI generation requests. Please wait a few minutes." },
      { status: 429 }
    );
  }
  requestTimestamps.push(now);

  try {
    const body = await req.json().catch(() => ({}));
    // 3. Clamped count (max 3 drafts per invocation)
    const count = Math.min(Math.max(Number(body.count) || 2, 1), 3);
    const focusTheme = String(body.theme || "Personalized Gifting, Custom Apparel & Meaningful Celebrations in India")
      .trim()
      .slice(0, 200);

    if (!geminiClient || !apiKey) {
      // Fallback realistic drafts if API key is not configured or in sandbox
      const sampleDrafts: GeneratedBlogDraft[] = [
        {
          id: `draft-${Date.now()}-1`,
          title: "The Art of Thoughtful Gifting: Why Custom Presents Touch the Soul",
          slug: "art-of-thoughtful-gifting-custom-presents",
          category: "Gifting Stories",
          excerpt: "In an era of mass-produced convenience, a gift that carries names, dates, or memories creates an emotional bond that lasts forever.",
          content: `## The Modern Gifting Paradox\n\nWe live in a world where almost any material good can be ordered with a single click. Yet, when birthdays, anniversaries, or wedding milestones approach, choosing a gift often feels surprisingly difficult. Why? Because the modern recipient doesn't need more things; they crave genuine connection.\n\n### The Shift to Narrative Keepsakes\n\nWhen you print a couple's first meeting coordinates on custom embroidered hoodies, or preserve a hand-written note on a ceramic mug, the object ceases to be merely fabric or ceramic. It transforms into an emotional talisman.\n\n* **Emotional Resonance:** A customized gift conveys intentionality. It proves that you invested time, recollection, and care.\n* **Heirloom Value:** Unlike generic gadgets that become obsolete, personalized mementos are preserved in living rooms and memory chests.\n\n### How to Choose the Perfect Customized Gift\n\n1. **Recall Shared Milestones:** Focus on dates, private jokes, or pet names.\n2. **Prioritize Fabric & Print Longevity:** High-grade 220 GSM bio-washed cotton and archival inks ensure the memory doesn't fade with washing.\n3. **Always Preview the 2D Proof:** Never settle for automated guesses—insist on verifying physical placement with real artisans.\n\n*Rooh Vastr was founded on the philosophy that you shouldn't just wear fabric—you should wear your story and gift your feelings.*`,
          meta_title: "The Art of Thoughtful Gifting | Rooh Vastr Blog",
          meta_description: "Discover why personalized custom gifts create deeper emotional connections than generic presents for Indian anniversaries and birthdays.",
          target_keywords: ["personalized gifts india", "customized presents", "anniversary keepsakes"],
          reading_time: "4 min read",
          image_url: STOCK_EDITORIAL_IMAGES[0],
          status: "draft",
          created_at: new Date().toISOString(),
        },
        {
          id: `draft-${Date.now()}-2`,
          title: "Top 7 Personalized Anniversary Gifts That Tell Your Love Story",
          slug: "top-7-personalized-anniversary-gifts-love-story",
          category: "Anniversaries",
          excerpt: "From matching coordinates hoodies to museum-grade floating acrylic frames, explore gifts that celebrate your unique journey together.",
          content: `## Celebrating Another Year of Shared Smiles\n\nAnniversaries are chapters in your shared book of life. Here are seven extraordinary ways to honor your journey together.\n\n### 1. Matching Embroidered Roman Numeral Hoodies\nDiscreet Roman numerals of your wedding date embroidered onto the cuff offer intimate elegance that couples love wearing on weekend escapes.\n\n### 2. High-Gloss Acrylic Floating Photo Art\nGive your wedding or travel portraits a luminous 3D gallery look with diamond-polished acrylic frames.\n\n### 3. Magic Color-Changing Photo Mugs\nMorning coffee becomes a daily ritual of joy as hot beverage reveals your favorite honeymoon memory.\n\n### 4. Custom Bio-Washed Graphic Tees\nFeaturing minimalist line art of your favorite photo together.\n\n### 5. Satin Memory Cushions\nAdding warmth to your bedroom or couch with high-definition non-fading portraits.\n\n### 6. Laser-Engraved Travel Flasks\nFor couples who explore the mountains and beaches together.\n\n### 7. Custom Message Wall Art\nFramed typography with your wedding vows or first dance lyrics.`,
          meta_title: "Top 7 Personalized Anniversary Gifts | Rooh Vastr",
          meta_description: "Explore 7 heartfelt anniversary gifts: embroidered hoodies, acrylic frames, and magic mugs crafted by Rooh Vastr.",
          target_keywords: ["anniversary gifts for couple", "custom hoodies date", "personalized photo frames"],
          reading_time: "5 min read",
          image_url: STOCK_EDITORIAL_IMAGES[1],
          status: "draft",
          created_at: new Date().toISOString(),
        },
        {
          id: `draft-${Date.now()}-3`,
          title: "Bespoke Corporate Swag: Elevating Brand Identity Beyond Cheap Pens",
          slug: "bespoke-corporate-swag-elevating-brand-identity",
          category: "Corporate & Bulk",
          excerpt: "Why modern startups and enterprises are moving to high-GSM custom apparel and premium drinkware for team onboarding.",
          content: `## The Death of Disposable Corporate Freebies\n\nFor decades, corporate gifting meant flimsy ballpoint pens and scratchy promo shirts that ended up in landfills. Today, companies recognize that onboarding merchandise is the physical touchpoint of company culture.\n\n### Quality Speaks Volumes\n\nWhen team members receive a heavyweight 240 GSM combed cotton polo with subtle chest embroidery, they wear it on weekends, to family gatherings, and during video conferences.\n\n* **Pride of Association:** High quality generates natural brand advocacy.\n* **Low MOQ Flexibility:** Whether you need 10 pieces for a founding team or 500 for an annual offsite, Rooh Vastr crafts each batch with bespoke perfection.`,
          meta_title: "Bespoke Corporate Merchandise & Swag | Rooh Vastr",
          meta_description: "Transform your company culture with high-GSM organic cotton polos, engraved flasks, and employee welcome kits.",
          target_keywords: ["corporate gifting india", "custom company hoodies", "startup onboarding merchandise"],
          reading_time: "4 min read",
          image_url: STOCK_EDITORIAL_IMAGES[2],
          status: "draft",
          created_at: new Date().toISOString(),
        },
        {
          id: `draft-${Date.now()}-4`,
          title: "How to Keep Your Custom Printed T-Shirts Looking Brand New",
          slug: "how-to-wash-care-custom-printed-tshirts",
          category: "Care & Craftsmanship",
          excerpt: "Our textile master shares essential washing, drying, and ironing guidelines to keep DTF and screen prints vibrant for years.",
          content: `## Preserving Your Story in Fabric\n\nEvery Rooh Vastr custom garment is crafted using bio-washed combed cotton and premium pigment inks. To ensure your prints remain as crisp as day one, follow these simple care tips.\n\n### 1. Always Wash Inside-Out\nTurning your t-shirt inside-out prevents abrasive friction against the printed artwork during the machine agitation cycle.\n\n### 2. Cold Water Is King\nWash in cold or lukewarm water (below 30°C). Hot water weakens both cotton fibers and print adhesives.\n\n### 3. Skip the Harsh Bleach\nOpt for mild, gentle detergents. Harsh bleaches and fabric softeners degrade elastane and pigment vibrancy.\n\n### 4. Never Iron Directly on the Print\nAlways iron on the reverse side or place a thin cotton handkerchief over the artwork to avoid direct heat transfer.\n\nWith these four habits, your cherished keepsake tee will look and feel immaculate through hundreds of wears!`,
          meta_title: "How to Wash and Care for Custom Printed T-Shirts | Rooh Vastr",
          meta_description: "Expert care guide for custom printed t-shirts: washing inside-out, temperature control, and iron safety.",
          target_keywords: ["wash custom printed shirts", "t-shirt care guide", "DTF print maintenance"],
          reading_time: "3 min read",
          image_url: STOCK_EDITORIAL_IMAGES[3],
          status: "draft",
          created_at: new Date().toISOString(),
        },
      ];

      return NextResponse.json({ success: true, drafts: sampleDrafts.slice(0, count) });
    }

    const prompt = `You are the Lead Content Strategist and Master Copywriter for ROOH VASTR, India's luxury personalized gifting and bespoke print-on-demand studio ("Wear Your Story. Gift Your Feelings.").

Generate exactly ${count} distinct, comprehensive, and emotionally evocative blog post drafts around the theme: "${focusTheme}".

Topics should span:
1. Emotional storytelling about personalized gifting (anniversaries, birthdays, milestones).
2. Creative styling and custom printing inspiration (minimalist typography, couple outfits, photo collage mugs).
3. Corporate and bulk identity merchandise (quality over throwaway swag).
4. Fabric, print durability, and keepsake maintenance.

Respond with ONLY valid JSON containing an array of ${count} objects matching this exact structure:
[
  {
    "title": "string",
    "slug": "string-kebab-case",
    "category": "string",
    "excerpt": "string (1-2 sentences)",
    "content": "string (rich markdown with ## and ### headings, bullet points, and concluding warm brand quote)",
    "meta_title": "string (under 60 chars)",
    "meta_description": "string (140-160 chars)",
    "target_keywords": ["keyword 1", "keyword 2", "keyword 3"],
    "reading_time": "X min read"
  }
]`;

    const response = await geminiClient.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-3.8-flash",
      contents: prompt,
    });

    const text = response.text || "";
    // Clean code fences if present
    const cleaned = text
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```$/i, "")
      .trim();

    const parsedArray = JSON.parse(cleaned);

    const formattedDrafts: GeneratedBlogDraft[] = parsedArray.map(
      (item: any, index: number) => ({
        id: `draft-${Date.now()}-${index + 1}`,
        title: item.title,
        slug: item.slug,
        category: item.category || "Gifting Stories",
        excerpt: item.excerpt,
        content: item.content,
        meta_title: item.meta_title,
        meta_description: item.meta_description,
        target_keywords: item.target_keywords || ["personalized gifts"],
        reading_time: item.reading_time || "4 min read",
        image_url: STOCK_EDITORIAL_IMAGES[index % STOCK_EDITORIAL_IMAGES.length],
        status: "draft" as const,
        created_at: new Date().toISOString(),
      })
    );

    return NextResponse.json({ success: true, drafts: formattedDrafts });
  } catch (error: any) {
    console.error("AI blog generator error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to generate blog drafts" },
      { status: 500 }
    );
  }
}
