import React from "react";
import { Star, CheckCircle, Quote } from "lucide-react";
import { Review } from "@/lib/types";

interface ReviewsSectionProps {
  reviews: Review[];
}

export default function ReviewsSection({ reviews }: ReviewsSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-[#FAF7F2] border-b border-[#EAE0D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#6D1835]">
            Real Stories, Real Emotions
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#242124]">
            Cherished by Families Across India
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Read how Rooh Vastr helped our patrons turn heartfelt memories into tangible, wearable keepsakes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-6 border border-[#EAE0D5] shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < rev.rating
                          ? "text-amber-400 fill-amber-400"
                          : "text-gray-200 fill-gray-200"
                      }`}
                    />
                  ))}
                </div>

                {rev.title && (
                  <h4 className="font-serif text-sm font-bold text-[#242124] mb-2">{rev.title}</h4>
                )}

                <p className="text-xs text-gray-600 italic leading-relaxed">
                  &quot;{rev.comment}&quot;
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#EAE0D5] flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#242124] block">{rev.customer_name}</span>
                  <span className="text-[10px] text-gray-400">Verified Buyer</span>
                </div>
                {rev.is_verified_purchase && (
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle className="w-3 h-3" /> Verified
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
