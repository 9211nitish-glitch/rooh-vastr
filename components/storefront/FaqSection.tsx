"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FaqSection() {
  const faqs = [
    {
      q: "How does Custom Print on Demand work at Rooh Vastr?",
      a: "Unlike automated printing sites where images can get pixelated, we follow a human-guided flow. You choose your canvas (Tee, Mug, Hoodie, etc.), send your photo or idea via our guided WhatsApp link, our designers prepare a digital preview proof, and only after your 100% approval do we print and ship.",
    },
    {
      q: "What fabric quality do you use for your t-shirts and hoodies?",
      a: "We only use premium 100% super-combed cotton (240 GSM for oversized streetwear tees, 200 GSM for regular tees, and 350 GSM fleece for winter hoodies). Pre-shrunk, bio-washed, and color-fast.",
    },
    {
      q: "How long does delivery take across India?",
      a: "Ready-to-wear products are dispatched within 24-48 hours and arrive in 3-5 business days. Custom printed orders take an extra 24 hours for design proof approval and curing. Express courier tracking is provided for every order.",
    },
    {
      q: "Can I order a single customized mug or t-shirt, or is there a minimum?",
      a: "Zero minimum order quantity! You can order just 1 piece for a special anniversary or birthday, or 500 pieces for a corporate event. Discounted tiers apply for batch orders.",
    },
    {
      q: "What payment methods are supported?",
      a: "We accept UPI (Google Pay, PhonePe, Paytm), all major Debit/Credit Cards, Net Banking via Razorpay secure checkout, and Cash on Delivery for ready-made collections.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 md:py-24 bg-white border-b border-[#EAE0D5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-2">
          <div className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest text-[#6D1835]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#242124]">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Everything you need to know about ready-made purchases and custom printing.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-[#EAE0D5] bg-[#FAF7F2] overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif text-sm sm:text-base font-bold text-[#242124] hover:text-[#6D1835] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-transform duration-300 text-[#6D1835] ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-gray-600 leading-relaxed border-t border-[#EAE0D5]/50 pt-3 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
