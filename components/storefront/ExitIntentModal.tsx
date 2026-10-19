"use client";

import React, { useEffect, useState } from "react";
import { X, Sparkles, Tag, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ExitIntentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if previously dismissed in session
    const dismissed = sessionStorage.getItem("rooh_exit_modal_dismissed");
    if (dismissed) {
      setHasShown(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when cursor leaves window towards top bar
      if (e.clientY <= 10 && !hasShown) {
        setIsOpen(true);
        setHasShown(true);
        sessionStorage.setItem("rooh_exit_modal_dismissed", "true");
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasShown]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-300">
      <div className="bg-[#FAF7F2] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#EAE0D5] relative text-center">
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1 rounded-full"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-full bg-[#6D1835]/10 text-[#6D1835] flex items-center justify-center mx-auto mb-3">
          <Sparkles className="w-6 h-6 text-[#6D1835]" />
        </div>

        <span className="text-[10px] font-bold uppercase tracking-widest text-[#C98F9F]">
          Wait! Before you leave...
        </span>
        <h3 className="font-serif text-2xl font-bold text-[#242124] mt-1">
          Take ₹50 OFF Your First Gift
        </h3>
        <p className="text-xs text-gray-600 mt-2 leading-relaxed">
          Whether it&apos;s a tailored tee for your sibling or a keepsake photo mug for your partner, make today memorable.
        </p>

        <div className="my-5 p-3.5 bg-white rounded-xl border border-dashed border-[#C98F9F] flex items-center justify-between">
          <div className="text-left">
            <span className="text-[10px] text-gray-500 block uppercase font-medium">Your Exclusive Code</span>
            <span className="font-mono text-base font-bold text-[#6D1835] tracking-wider">STAYGIFT50</span>
          </div>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText("STAYGIFT50");
              alert("Coupon code copied to clipboard!");
            }}
            className="text-[11px] font-bold text-[#6D1835] hover:text-[#4F1026] underline"
          >
            Copy Code
          </button>
        </div>

        <div className="space-y-2">
          <Link
            href="/shop"
            onClick={() => setIsOpen(false)}
            className="w-full py-3 px-4 rounded-xl bg-[#6D1835] text-white text-xs font-bold hover:bg-[#4F1026] flex items-center justify-center gap-2 shadow-md transition-colors"
          >
            <span>Browse Rooh Vastr Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="text-[11px] text-gray-500 hover:text-gray-800"
          >
            No thanks, I will miss this offer
          </button>
        </div>
      </div>
    </div>
  );
}
