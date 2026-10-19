import { NextResponse } from "next/server";
import { geminiClient } from "@/lib/gemini";
import { SEED_PRODUCTS } from "@/lib/data/store-data";
import { ChatProductItem } from "@/lib/types";

interface ChatMessageInput {
  sender: "user" | "bot";
  text: string;
}

const SUPPORT_WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919654861504";

// Helper to find matching products to attach as interactive cards
function findRelevantProducts(text: string): ChatProductItem[] {
  const lower = text.toLowerCase();
  const matched: ChatProductItem[] = [];

  const addBySlug = (slug: string) => {
    const prod = SEED_PRODUCTS.find((p) => p.slug === slug);
    if (prod && !matched.some((m) => m.id === prod.id)) {
      matched.push({
        id: prod.id,
        name: prod.name,
        slug: prod.slug,
        price: prod.selling_price || prod.sale_price || prod.regular_price || 0,
        regular_price: prod.regular_price || prod.compare_at_price || null,
        primary_image: prod.primary_image || "",
        category_name: prod.category_name,
      });
    }
  };

  // Mugs
  if (lower.includes("mug") || lower.includes("cup") || lower.includes("coffee") || lower.includes("chai")) {
    addBySlug("personalized-photo-mug");
  }

  // T-shirts / Apparel
  if (
    lower.includes("t-shirt") ||
    lower.includes("tshirt") ||
    lower.includes("tee") ||
    lower.includes("kapde") ||
    lower.includes("shirt")
  ) {
    addBySlug("custom-tshirt");
  }

  // Hoodies
  if (lower.includes("hoodie") || lower.includes("winter") || lower.includes("sweatshirt")) {
    addBySlug("custom-hoodie");
  }

  // Frames & Plaques
  if (lower.includes("frame") || lower.includes("photo") || lower.includes("acrylic") || lower.includes("spotify")) {
    addBySlug("photo-frame");
  }

  // Cushions
  if (lower.includes("cushion") || lower.includes("pillow")) {
    addBySlug("personalized-cushion");
  }

  // Keychains
  if (lower.includes("keychain") || lower.includes("chabi") || lower.includes("chaabi")) {
    addBySlug("couple-keychain");
  }

  // Insulated Bottle
  if (lower.includes("bottle") || lower.includes("flask") || lower.includes("drinkware")) {
    addBySlug("insulated-bottle");
  }

  // Phone Case
  if (lower.includes("case") || lower.includes("cover")) {
    addBySlug("phone-case-floral");
  }

  // General gifts & recommendations
  if (
    lower.includes("suggest") ||
    lower.includes("gift") ||
    lower.includes("anniversary") ||
    lower.includes("birthday") ||
    lower.includes("valentine") ||
    lower.includes("bestseller") ||
    lower.includes("order place") ||
    lower.includes("recommend") ||
    lower.includes("buy")
  ) {
    if (lower.includes("anniversary") || lower.includes("couple")) {
      addBySlug("custom-tshirt");
      addBySlug("personalized-photo-mug");
      addBySlug("couple-keychain");
    } else if (lower.includes("birthday")) {
      addBySlug("personalized-photo-mug");
      addBySlug("custom-tshirt");
      addBySlug("photo-frame");
    } else {
      addBySlug("personalized-photo-mug");
      addBySlug("custom-tshirt");
    }
  }

  return matched.slice(0, 3);
}

// Fallback intelligent knowledge base for instant short answers
function generateRuleBasedFallback(userText: string, allMessages: ChatMessageInput[]) {
  const lower = userText.toLowerCase();

  // Check phone number detection
  const phoneMatch = userText.match(/(?:(?:\+|0{0,2})91(\s*[- ]\s*)?|[0]?)?[6789]\d{9}/);
  const detectedPhone = phoneMatch ? phoneMatch[0].replace(/\D/g, "").slice(-10) : null;

  // 1. If phone number is found
  if (detectedPhone) {
    return {
      reply: `Bahut badiya! 🎉 Number **+91 ${detectedPhone}** note ho gaya hai. Hamari team **15 mins me** WhatsApp par free 3D preview aur best price quote bhejegi!`,
      leadExtracted: {
        phone: detectedPhone,
      },
      quickActions: ["Track Inquiry 📋", "View Trending Gifts 🎁", "Chat on WhatsApp 💬"],
      products: findRelevantProducts(userText),
    };
  }

  // 2. Order placement intent
  if (
    lower.includes("order place") ||
    lower.includes("buy") ||
    lower.includes("khareedna") ||
    lower.includes("kaise order kare") ||
    lower.includes("customize karwana") ||
    lower.includes("print karwana") ||
    lower.includes("custom order")
  ) {
    return {
      reply: `Order place karna bahut aasan hai! Niche product card par click karein ya apna WhatsApp number aur design idea yahan bhej dein. Hamari team free 3D preview bhejegi! ✨`,
      quickActions: ["Submit Order Details 📝", "Explore Best Sellers 🎁", "Talk on WhatsApp 💬"],
      leadPrompt: true,
      products: findRelevantProducts(userText).length > 0 ? findRelevantProducts(userText) : findRelevantProducts("suggest gift"),
    };
  }

  // 3. Price & Products: Mugs
  if (lower.includes("mug") || lower.includes("cup")) {
    return {
      reply: `☕ Personalized Mugs: Ceramic Mug (₹399) & Magic Heat-Reveal Mug (₹499). Microwave safe aur free gift box included hai!`,
      quickActions: ["Order Magic Mug (₹499)", "Photo Ceramic Mug (₹399)", "Place Custom Order"],
      products: findRelevantProducts(userText),
    };
  }

  // 4. Price & Products: T-Shirts / Hoodies
  if (lower.includes("t-shirt") || lower.includes("tshirt") || lower.includes("tee") || lower.includes("hoodie") || lower.includes("kapde")) {
    return {
      reply: `👕 Custom Apparel: 240 GSM Bio-Washed Cotton T-Shirt (₹499) aur 380 GSM Heavy Fleece Hoodie (₹999). Wash-proof HD DTF print!`,
      quickActions: ["Custom T-Shirt (₹499)", "Winter Hoodie (₹999)", "Bulk Order Quote"],
      products: findRelevantProducts(userText),
    };
  }

  // 5. Price & Products: Frames / Spotify Plaque
  if (lower.includes("frame") || lower.includes("spotify") || lower.includes("photo") || lower.includes("acrylic")) {
    return {
      reply: `🖼️ Keepsakes: Solid Pine Wood Photo Frame (₹699) aur Acrylic Scannable Song Plaque (₹599). Anniversaries aur birthdays ke liye top pick!`,
      quickActions: ["Wooden Frame (₹699)", "Spotify Plaque (₹599)", "Place Custom Order"],
      products: findRelevantProducts(userText),
    };
  }

  // 6. Occasion Gift Suggestions
  if (
    lower.includes("suggest") ||
    lower.includes("gift idea") ||
    lower.includes("anniversary") ||
    lower.includes("birthday") ||
    lower.includes("girlfriend") ||
    lower.includes("boyfriend") ||
    lower.includes("wife") ||
    lower.includes("husband") ||
    lower.includes("friend")
  ) {
    return {
      reply: `🎁 Top Gift Picks: Magic Heat-Reveal Mug (₹499), Custom 240 GSM Cotton Tee (₹499), aur Wooden Photo Frame (₹699). Niche card par click karke direct view karein!`,
      quickActions: ["Anniversary Gift 💖", "Birthday Gift 🎂", "Gifts Under ₹500 🏷️"],
      products: findRelevantProducts(userText),
    };
  }

  // 7. Delivery & Shipping
  if (
    lower.includes("delivery") ||
    lower.includes("shipping") ||
    lower.includes("kab milega") ||
    lower.includes("kab aayega") ||
    lower.includes("kitne din") ||
    lower.includes("courier") ||
    lower.includes("speed")
  ) {
    return {
      reply: `🚚 Delivery: Metro cities me 2-4 din, rest of India me 4-6 din. ₹999+ orders par Free Shipping aur Cash on Delivery (COD) uplabdh hai!`,
      quickActions: ["Track My Order 📦", "Place Urgent Order ⚡", "Check Pincode"],
      products: findRelevantProducts(userText),
    };
  }

  // 8. Payment & COD
  if (lower.includes("cod") || lower.includes("cash on delivery") || lower.includes("payment") || lower.includes("pay")) {
    return {
      reply: `💳 Payment: UPI (GPay, PhonePe, Paytm), Cards, aur ₹2,000 tak Cash on Delivery (COD) available hai. 100% secure checkout!`,
      quickActions: ["Place Custom Order", "Explore Products", "Contact WhatsApp"],
      products: findRelevantProducts(userText),
    };
  }

  // Default Greeting / General
  return {
    reply: `Namaste! 🙏 Welcome to Rooh Vastr. Main aapka AI Gift Stylist hoon. Best gift suggestions, instant rates aur custom orders ke liye main hazir hoon!`,
    quickActions: ["Suggest a Gift 🎁", "Custom T-Shirt (₹499) 👕", "Order Magic Mug ☕", "Delivery & COD 🚚"],
    products: findRelevantProducts("suggest bestseller"),
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const messages: ChatMessageInput[] = body.messages || [];
    const latestUserMsg = body.latestMessage || messages[messages.length - 1]?.text || "";

    if (!latestUserMsg.trim()) {
      return NextResponse.json({
        success: false,
        error: "Message cannot be empty",
      });
    }

    // Phone detection helper
    const phoneMatch = latestUserMsg.match(/(?:(?:\+|0{0,2})91(\s*[- ]\s*)?|[0]?)?[6789]\d{9}/);
    const detectedPhone = phoneMatch ? phoneMatch[0].replace(/\D/g, "").slice(-10) : null;

    // Matched product cards to attach
    const relevantProducts = findRelevantProducts(latestUserMsg);

    // Try Gemini if client is ready
    if (geminiClient && process.env.GEMINI_API_KEY) {
      try {
        const productCatalogBrief = SEED_PRODUCTS.slice(0, 8).map((p) => ({
          name: p.name,
          slug: p.slug,
          category: p.category_name,
          price: p.selling_price || p.regular_price,
        }));

        const systemPrompt = `You are "Rooh Vastr AI Concierge", the smart, warm, and attentive AI shopping assistant for Rooh Vastr. Tagline: "Wear Your Story. Gift Your Feelings."
Catalog items:
${JSON.stringify(productCatalogBrief, null, 1)}

Policies:
- Fast shipping: 2-4 days metro cities, 4-6 days rest of India. Free shipping above ₹999.
- Customization: Customer gets a FREE 3D preview on WhatsApp before printing begins.
- Payment: UPI, Cards, NetBanking, and Cash on Delivery (COD) under ₹2,000.
- Contact/WhatsApp: +91 96548 61504.

CRITICAL INSTRUCTIONS:
1. KEEP YOUR RESPONSES VERY SHORT AND CRISP (Strictly maximum 2 to 3 concise sentences). DO NOT write lengthy lists or paragraphs.
2. NO MARKDOWN ASTERISKS: DO NOT use double asterisks like **bold** or asterisks for emphasis. Write plain clean text with natural punctuation without raw star symbols (* or **).
3. Speak in warm, polite Hinglish or English (matching user language). Use gentle emojis.
4. If mentioning a product, keep the description punchy. Product cards will be shown directly below your message for the customer to click and view.
5. If user wants to place an order or customize, briefly ask for their design idea and WhatsApp number for a free 3D preview.
6. If phone number (${detectedPhone || "none"}) is provided, warmly confirm the inquiry is registered and team will reach out in 15 mins.`;

        const chatHistoryFormatted = messages.slice(-4).map((m) => `${m.sender === "user" ? "Customer" : "Rooh AI"}: ${m.text}`).join("\n");
        const fullPrompt = `${systemPrompt}\n\nChat History:\n${chatHistoryFormatted}\n\nCustomer's Message: "${latestUserMsg}"\n\nProvide short response (max 2-3 sentences, NO asterisks or stars):`;

        const response = await geminiClient.models.generateContent({
          model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
          contents: fullPrompt,
        });

        const replyText = response.text?.trim() || "";

        return NextResponse.json({
          success: true,
          reply: replyText,
          leadExtracted: detectedPhone ? { phone: detectedPhone } : undefined,
          products: relevantProducts,
          quickActions: detectedPhone
            ? ["Chat on WhatsApp 💬", "Explore Collections 🎁", "Delivery Status 🚚"]
            : ["Place Custom Order 📝", "Best Gift Ideas 💡", "Track My Order 📦", "WhatsApp Desk 💬"],
        });
      } catch (geminiErr) {
        console.warn("Gemini call failed or timed out, falling back to rule engine:", geminiErr);
      }
    }

    // Fallback rule engine (works offline, zero latency, 100% reliable)
    const fallback = generateRuleBasedFallback(latestUserMsg, messages);
    return NextResponse.json({
      success: true,
      ...fallback,
    });
  } catch (error: any) {
    console.error("Chatbot API error:", error);
    return NextResponse.json(
      {
        success: false,
        reply: "Aapka message note kar liya hai! Aap direct hamari team se WhatsApp (+91 96548 61504) par bhi connect kar sakte hain.",
        quickActions: ["Chat on WhatsApp", "View Products", "Try Again"],
        products: findRelevantProducts("suggest bestseller"),
      },
      { status: 500 }
    );
  }
}

