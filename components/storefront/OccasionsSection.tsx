"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Cake, Heart, Gift, Users, Flame, Sparkles, GraduationCap, Briefcase, Smile } from "lucide-react";
import { SEED_OCCASIONS } from "@/lib/data/store-data";

export default function OccasionsSection() {
  const getOccasionIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "birthday":
        return <Cake className="w-5 h-5 text-[#6D1835]" />;
      case "anniversary":
        return <Heart className="w-5 h-5 text-[#6D1835]" />;
      case "valentine's day":
        return <Gift className="w-5 h-5 text-[#6D1835]" />;
      case "friendship day":
        return <Users className="w-5 h-5 text-[#6D1835]" />;
      case "festivals":
        return <Flame className="w-5 h-5 text-[#6D1835]" />;
      case "wedding":
        return <Sparkles className="w-5 h-5 text-[#6D1835]" />;
      case "graduation":
        return <GraduationCap className="w-5 h-5 text-[#6D1835]" />;
      case "corporate":
        return <Briefcase className="w-5 h-5 text-[#6D1835]" />;
      default:
        return <Smile className="w-5 h-5 text-[#6D1835]" />;
    }
  };

  return (
    <section id="occasions" className="py-12 border-b border-[#E8DFD8] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
            Gifts by Occasion
          </h2>
          <Link
            href="/shop"
            className="text-xs font-semibold text-stone-600 hover:text-[#6D1835] flex items-center gap-1 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 9 Circular Badges */}
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-4 sm:gap-6 text-center">
          {SEED_OCCASIONS.map((occ) => (
            <Link
              key={occ.id}
              href={`/shop?occasion=${occ.slug}`}
              className="group flex flex-col items-center"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#FAF3F3] group-hover:bg-[#F5E5E8] border border-[#F0D5DA] flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-xs">
                {getOccasionIcon(occ.name)}
              </div>
              <span className="mt-2 text-[11px] sm:text-xs font-medium text-stone-700 group-hover:text-[#6D1835] transition-colors leading-tight">
                {occ.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
