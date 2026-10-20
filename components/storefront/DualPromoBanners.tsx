"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function DualPromoBanners() {
  const handleWhatsAppCustom = () => {
    const text = encodeURIComponent(
      "Hi Rooh Vastr team! I'd like to get started with custom printing for my design. Could you guide me on the process and artwork submission?"
    );
    window.open(`https://wa.me/919654861504?text=${text}`, "_blank");
  };

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. Left Card: Custom Printing (Maroon) */}
          <div className="rounded-3xl bg-[#56132A] text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-sm group">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />

            <div className="max-w-xs space-y-2 z-10">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                Custom Printing
              </h3>
              <p className="text-sm font-semibold text-rose-200">
                Make it Truly Yours
              </p>
              <p className="text-xs text-rose-100/80 leading-relaxed pt-1">
                Your idea. Our print. Endless possibilities.
              </p>
            </div>

            <div className="pt-6 z-10">
              <button
                type="button"
                onClick={handleWhatsAppCustom}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-stone-900 text-xs font-bold hover:bg-rose-50 transition-all shadow-sm cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                <span>Get Started on WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Right Graphic: T-Shirt Mockup */}
            <div className="absolute right-3 sm:right-6 bottom-3 top-3 w-40 sm:w-48 flex items-center justify-center pointer-events-none">
              <div className="relative w-full aspect-square bg-[#FAF7F2] rounded-2xl p-2.5 shadow-md border border-white/10 rotate-3 group-hover:rotate-0 transition-transform duration-500 overflow-hidden flex items-center justify-center">
                <Image
                  src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80"
                  alt="Custom Print Mockup"
                  fill
                  sizes="(max-width: 640px) 160px, 200px"
                  loading="lazy"
                  className="object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-2 rounded-xl z-10">
                  <span className="text-[11px] font-black tracking-widest text-white uppercase border-2 border-dashed border-white/80 px-2 py-1 rounded">
                    YOUR DESIGN<br />HERE
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Right Card: Bulk & Corporate Orders (Dark Charcoal) */}
          <div className="rounded-3xl bg-[#322826] text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-sm group">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />

            <div className="max-w-xs space-y-2 z-10">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                Bulk &amp; Corporate Orders
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed pt-1">
                Customized merchandise for your team, events and business.
              </p>
            </div>

            <div className="pt-6 z-10">
              <Link
                href="/bulk-orders"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-stone-900 text-xs font-bold hover:bg-stone-100 transition-all shadow-sm"
              >
                <span>Discuss Your Requirement</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Right Graphic: Corporate merchandise set */}
            <div className="absolute right-3 sm:right-6 bottom-3 top-3 w-40 sm:w-48 flex items-center justify-center pointer-events-none">
              <div className="relative w-full aspect-square bg-[#FAF7F2] rounded-2xl p-2.5 shadow-md border border-white/10 -rotate-3 group-hover:rotate-0 transition-transform duration-500 overflow-hidden flex items-center justify-center">
                <Image
                  src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=400&q=80"
                  alt="Corporate Merchandise Kit"
                  fill
                  sizes="(max-width: 640px) 160px, 200px"
                  loading="lazy"
                  className="object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-2 rounded-xl z-10">
                  <span className="text-[10px] font-black tracking-widest text-white uppercase border-2 border-dashed border-white/80 px-2 py-1 rounded">
                    YOUR LOGO<br />HERE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
