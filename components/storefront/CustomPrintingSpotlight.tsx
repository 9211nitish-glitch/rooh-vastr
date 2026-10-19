import React from "react";
import Link from "next/link";
import { MessageCircle, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export default function CustomPrintingSpotlight() {
  const steps = [
    {
      num: "01",
      title: "Pick Any Canvas",
      desc: "Choose from 240 GSM Oversized Tees, Solid Polos, Ceramic Mugs, or Canvas Cushions.",
    },
    {
      num: "02",
      title: "Send Your Memory",
      desc: "Share your high-res photos, typography ideas, or brand logos via our guided WhatsApp intake.",
    },
    {
      num: "03",
      title: "Approve Digital Proof",
      desc: "Our human design team prepares an exact placement proof for your final 100% confirmation.",
    },
    {
      num: "04",
      title: "Printed & Shipped",
      desc: "Crafted with durable DTF / Sublimation inks and delivered to your doorstep across India.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#4F1026] text-[#FAF7F2] relative overflow-hidden">
      {/* Background aesthetics */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C98F9F]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#C98F9F] text-xs font-semibold border border-white/15">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bespoke Print on Demand (POD)</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Your Sentiments, Handcrafted to Perfection
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            Unlike cold automated printers, every Rooh Vastr custom piece receives direct attention from a human designer. We check image DPI, calibrate colors, and share a digital mock before printing.
          </p>
        </div>

        {/* 4-Step Process Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xs hover:bg-white/10 transition-colors"
            >
              <span className="font-serif text-2xl font-bold text-[#C98F9F] block mb-2">
                {step.num}
              </span>
              <h3 className="font-serif text-base font-bold text-white mb-1.5">{step.title}</h3>
              <p className="text-xs text-gray-300 leading-normal">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA Bar */}
        <div className="bg-white/10 rounded-2xl p-6 md:p-8 border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur-md">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif text-lg md:text-xl font-bold text-white">
              Have a custom request or bulk corporate inquiry?
            </h4>
            <p className="text-xs text-gray-300">
              Zero minimum order quantity. Singles, couples, weddings, and corporate batches welcome.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              href="/custom-printing"
              className="px-6 py-3 rounded-full bg-white text-[#4F1026] text-xs font-bold hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              <span>Explore Custom Printing</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <a
              href="https://wa.me/919999999999?text=Hi%20Rooh%20Vastr,%20I%20would%20like%20to%20discuss%20a%20custom%20print%20order"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors flex items-center gap-2 shadow-md"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Talk to Print Designer</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
