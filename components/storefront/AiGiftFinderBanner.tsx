"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, Heart, Calendar, IndianRupee, Package, ArrowRight } from "lucide-react";
import GiftFinderModal from "@/components/ai/GiftFinderModal";

export default function AiGiftFinderBanner() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#FDEEE9] via-[#FCEAE5] to-[#F7DFD8] border border-[#F0D5CD] p-6 sm:p-8 md:p-10 shadow-sm">
          {/* Subtle decorative glow */}
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/40 blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left: Gift Boxes Graphic / Image */}
            <div className="lg:col-span-3 flex justify-center lg:justify-start">
              <div className="relative w-44 h-36 sm:w-52 sm:h-40 rounded-xl overflow-hidden shadow-sm flex items-center justify-center bg-white/60 border border-white">
                <Image
                  src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&auto=format&fit=crop"
                  alt="Gift Boxes"
                  fill
                  sizes="240px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#6D1835]/30 to-transparent" />
                <span className="absolute bottom-2 left-2 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-white/90 text-[#6D1835] shadow-xs">
                  AI Curated
                </span>
              </div>
            </div>

            {/* Middle: Title, Subtitle, CTA */}
            <div className="lg:col-span-5 text-center lg:text-left space-y-3">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#242124] tracking-tight">
                Not Sure What to Gift?
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0">
                Let our AI Gift Finder suggest the perfect gift for your loved ones based on relation, budget, and occasion.
              </p>
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#5B132B] hover:bg-[#470e21] text-white text-xs font-semibold shadow-sm transition-all hover:shadow hover:scale-[1.02] cursor-pointer"
                >
                  <span>Find My Perfect Gift</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                </button>
              </div>
            </div>

            {/* Right: 4 Interactive Prompt Chips */}
            <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/90 hover:bg-white border border-[#EAC9C0] text-gray-700 hover:text-[#5B132B] text-xs font-medium shadow-2xs transition-all text-left group cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5 text-[#C05A18] group-hover:scale-110 transition-transform shrink-0" />
                <span className="truncate">Who are you gifting for?</span>
              </button>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/90 hover:bg-white border border-[#EAC9C0] text-gray-700 hover:text-[#5B132B] text-xs font-medium shadow-2xs transition-all text-left group cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-[#C05A18] group-hover:scale-110 transition-transform shrink-0" />
                <span className="truncate">What&apos;s the occasion?</span>
              </button>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/90 hover:bg-white border border-[#EAC9C0] text-gray-700 hover:text-[#5B132B] text-xs font-medium shadow-2xs transition-all text-left group cursor-pointer"
              >
                <IndianRupee className="w-3.5 h-3.5 text-[#C05A18] group-hover:scale-110 transition-transform shrink-0" />
                <span className="truncate">What&apos;s your budget?</span>
              </button>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/90 hover:bg-white border border-[#EAC9C0] text-gray-700 hover:text-[#5B132B] text-xs font-medium shadow-2xs transition-all text-left group cursor-pointer"
              >
                <Package className="w-3.5 h-3.5 text-[#C05A18] group-hover:scale-110 transition-transform shrink-0" />
                <span className="truncate">What type of product?</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* AI Gift Finder Modal Dialog */}
      {isModalOpen && (
        <GiftFinderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
