"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight, Quote } from "lucide-react";
import { Review } from "@/lib/types";

interface CustomerReviewsSectionProps {
  reviews: Review[];
}

// Avatars matching the design aesthetics
const AVATARS = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
];

export default function CustomerReviewsSection({ reviews }: CustomerReviewsSectionProps) {
  return (
    <section className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#242124]">
            What Our Customers Say
          </h2>
          <p className="text-xs text-gray-500 mt-1">Real stories. Real smiles.</p>
        </div>
        <Link
          href="#reviews"
          className="text-xs font-bold text-[#5B132B] hover:underline flex items-center gap-1 group"
        >
          <span>View All Reviews</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.slice(0, 3).map((rev, idx) => (
          <div
            key={rev.id}
            className="relative bg-white rounded-2xl p-6 border border-[#F0E6DD] shadow-2xs hover:shadow-md transition-shadow flex items-start gap-4"
          >
            {/* Customer Avatar */}
            <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border border-[#F0D5CD]">
              <Image
                src={AVATARS[idx] || AVATARS[0]}
                alt={rev.customer_name}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>

            {/* Review Content */}
            <div className="flex-1 space-y-2">
              <p className="text-xs text-gray-700 italic leading-relaxed line-clamp-3">
                &ldquo;{rev.comment}&rdquo;
              </p>

              <div>
                <h4 className="text-xs font-bold text-[#242124]">{rev.customer_name}</h4>
                <div className="flex items-center gap-0.5 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < rev.rating
                          ? "fill-[#F59E0B] text-[#F59E0B]"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Subtle quotation watermark */}
            <Quote className="w-6 h-6 text-[#F0D5CD]/60 shrink-0 self-end" />
          </div>
        ))}
      </div>
    </section>
  );
}
