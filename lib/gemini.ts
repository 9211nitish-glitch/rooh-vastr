import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || "";

export const geminiClient = apiKey ? new GoogleGenAI({ apiKey }) : null;

export interface GiftFinderInput {
  recipient: string;
  occasion: string;
  budget?: number;
  preferences?: string;
  availableProducts: Array<{ name: string; slug: string; price: number; description?: string }>;
}

export async function getAIGiftRecommendations(input: GiftFinderInput): Promise<string> {
  if (!geminiClient || !apiKey) {
    return "AI Gift Finder is currently running in offline preview mode. Please explore our curated collections above!";
  }

  const prompt = `You are the Rooh Vastr AI Gift Stylist. Rooh Vastr is a premium Indian personalized gifting brand.
The user is looking for a gift with these details:
- Recipient: ${input.recipient}
- Occasion: ${input.occasion}
${input.budget ? `- Budget: Up to ₹${input.budget}` : ""}
${input.preferences ? `- Notes/Style: ${input.preferences}` : ""}

Available Catalog Items:
${JSON.stringify(input.availableProducts, null, 2)}

Provide a thoughtful, warm, and concise recommendation (2-3 items max) grounded ONLY in the available catalog items listed above. Explain why each gift matches the recipient and occasion, with gentle emotional resonance ("Wear Your Story. Gift Your Feelings."). Include the exact product name and price. Do not invent items or discounts.`;

  try {
    const response = await geminiClient.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-3.8-flash",
      contents: prompt,
    });
    return response.text || "Here are our top recommended personalized gifts for your special moment.";
  } catch (error) {
    console.error("Gemini AI error:", error);
    return "We couldn't connect to the AI recommendation engine right now, but our bestselling personalized gifts below make unforgettable keepsakes!";
  }
}
