"use client";

import React, { useState } from "react";
import { Sparkles, X, Gift, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { SEED_PRODUCTS } from "@/lib/data/store-data";

interface GiftFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GiftFinderModal({ isOpen, onClose }: GiftFinderModalProps) {
  const [recipient, setRecipient] = useState("Friend");
  const [occasion, setOccasion] = useState("Birthday");
  const [budget, setBudget] = useState("1000");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recommendationText, setRecommendationText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/ai/gift-recommendation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipient,
          occasion,
          budget: Number(budget),
          preferences: notes || undefined,
        }),
      });

      const data = await res.json();
      if (data.recommendation) {
        setRecommendationText(data.recommendation);
      } else {
        setRecommendationText(
          "Here are our curated gifts that express heartfelt emotion: personalized photo mugs, embroidered coordinate hoodies, and custom frames!"
        );
      }
    } catch (err: any) {
      console.error(err);
      setError("Unable to generate suggestions right now. Please browse our collections.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#EAE0D5] relative max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-[#6D1835]/10 text-[#6D1835] flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-[#6D1835]" />
          </div>
          <span className="text-xs uppercase font-bold tracking-wider text-[#6D1835]">
            Rooh Vastr AI Advisor
          </span>
        </div>

        <h3 className="font-serif text-2xl font-bold text-[#242124]">
          Find the Perfect Heartfelt Gift
        </h3>
        <p className="text-xs text-gray-600 mt-1 mb-6">
          Tell us about the person and the moment. Our Gemini AI engine scans our catalog to suggest emotionally matched apparel and custom gift pieces.
        </p>

        {!recommendationText ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Who is it for?</label>
                <select
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full text-xs rounded-xl border border-[#EAE0D5] bg-white p-2.5 focus:border-[#6D1835] outline-none"
                >
                  <option>Partner / Spouse</option>
                  <option>Friend</option>
                  <option>Mom / Dad</option>
                  <option>Sibling</option>
                  <option>Colleague / Corporate</option>
                  <option>Self</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Occasion</label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full text-xs rounded-xl border border-[#EAE0D5] bg-white p-2.5 focus:border-[#6D1835] outline-none"
                >
                  <option>Birthday</option>
                  <option>Anniversary</option>
                  <option>Festive / Diwali</option>
                  <option>Farewell / Promotion</option>
                  <option>Just to say Thanks</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Max Budget (₹)</label>
              <input
                type="number"
                min="300"
                step="100"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full text-xs rounded-xl border border-[#EAE0D5] bg-white p-2.5 focus:border-[#6D1835] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Any specific vibe or memories? (Optional)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Loves minimalist typography, coffee, warm cozy apparel, or funny quotes"
                className="w-full text-xs rounded-xl border border-[#EAE0D5] bg-white p-2.5 focus:border-[#6D1835] outline-none resize-none"
              />
            </div>

            {error && <p className="text-xs text-rose-600">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-[#6D1835] text-white text-xs font-bold hover:bg-[#4F1026] flex items-center justify-center gap-2 shadow-md transition-colors"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Consulting Gemini AI...</span>
                </>
              ) : (
                <>
                  <Gift className="w-4 h-4" />
                  <span>Reveal Personalized Ideas</span>
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-sm text-[#6D1835]">
              Tailored Suggestions by Rooh Vastr AI:
            </h4>
            
            <div className="p-4 bg-white rounded-xl border border-[#EAE0D5] shadow-xs text-xs text-gray-800 leading-relaxed whitespace-pre-line">
              {recommendationText}
            </div>

            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={() => setRecommendationText(null)}
                className="flex-1 py-2.5 rounded-xl border border-[#6D1835] text-[#6D1835] text-xs font-semibold hover:bg-[#6D1835]/5"
              >
                Try Another Persona
              </button>
              <Link
                href="/shop"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl bg-[#6D1835] text-white text-xs font-semibold hover:bg-[#4F1026] text-center flex items-center justify-center gap-1.5"
              >
                <span>Browse Store</span> <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
