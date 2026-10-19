"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, X, Tag } from "lucide-react";

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside aria-label="Announcement" className="bg-[#4F1026] text-[#FAF7F2] py-1.5 px-3 sm:px-4 text-[11px] sm:text-xs font-medium tracking-wide flex items-center justify-between border-b border-[#6D1835]/40 transition-all duration-300">
      <div className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 text-center truncate">
        <Sparkles className="w-3 h-3 text-[#C98F9F] animate-pulse shrink-0 hidden xs:inline-block" />
        <span className="truncate">
          Flat <strong>10% OFF</strong> with code{" "}
          <span className="inline-flex items-center gap-1 bg-[#6D1835] px-1.5 py-0.5 rounded text-amber-200 font-mono font-semibold tracking-wider text-[10px] sm:text-[11px] border border-amber-300/30">
            <Tag className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> ROOHFIRST
          </span>
        </span>
        <span className="hidden md:inline-block text-[#C98F9F]">•</span>
        <span className="hidden md:inline-block">Free Delivery on orders above ₹999</span>
        <Link
          href="/shop"
          className="underline decoration-[#C98F9F] underline-offset-4 hover:text-[#C98F9F] transition-colors ml-1 hidden lg:inline shrink-0"
        >
          Explore All
        </Link>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="text-[#FAF7F2]/70 hover:text-[#FAF7F2] p-1 rounded transition-colors shrink-0 ml-1 cursor-pointer"
        aria-label="Dismiss banner"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </aside>
  );
}
