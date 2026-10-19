import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Heart, Award, ShieldCheck, ArrowRight } from "lucide-react";

export const metadata = {
  title: "About Us | ROOH VASTR — Wear Your Story. Gift Your Feelings.",
  description: "Learn about ROOH VASTR's journey, our commitment to artisanal custom print craftsmanship, and our philosophy of emotional personalized gifting.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#242124]">
      {/* Hero Banner */}
      <section className="relative py-24 sm:py-32 bg-[#6D1835] text-[#FAF7F2] overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C98F9F_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-widest uppercase bg-white/10 text-[#C98F9F] border border-white/10 mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Our Heritage & Philosophy
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight mb-6">
            Wear Your Story.<br />
            <span className="italic font-normal text-[#C98F9F]">Gift Your Feelings.</span>
          </h1>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            ROOH VASTR was born from a simple Indian truth: the most precious things we own are not generic goods, but the memories, names, dates, and emotions woven into them.
          </p>
        </div>
      </section>

      {/* Story Narrative */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="font-serif text-3xl font-bold text-[#6D1835]">
              Beyond Mass Production
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              In a marketplace flooded with mass-produced, disposable apparel and flimsy printed novelties, ROOH VASTR stands for thoughtful longevity. Every t-shirt, fleece hoodie, ceramic mug, and acrylic frame is conceived as an emotional talisman.
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              Whether you are commemorating your first anniversary in Roman numerals, printing your mother’s handwritten recipe onto an heirloom apron, or onboarding your founding team with 240 GSM organic cotton polos, we treat every custom detail with master craftsman reverence.
            </p>
            <div className="pt-2">
              <Link
                href="/custom-printing"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#6D1835] text-white text-xs font-semibold hover:bg-[#4F1026] transition-colors shadow-sm"
              >
                Explore Bespoke Studio
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-[#EAE0D5]">
            <Image
              src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80"
              alt="Artisans preparing handcrafted apparel"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Pillars of Quality */}
      <section className="bg-white py-20 border-y border-[#EAE0D5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-serif text-3xl font-bold text-[#242124]">
              The Rooh Vastr Standard
            </h2>
            <p className="text-xs text-gray-600 mt-2">
              Every creation adheres to strict quality benchmarks before shipping across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-[#FAF7F2] border border-[#EAE0D5] space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#6D1835]/10 text-[#6D1835] flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold">Bio-Washed Combed Cotton</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                We select heavyweight 220–380 GSM combed cotton fabrics pre-shrunk with organic bio-enzymes for pill-resistant, ultra-soft luxury handfeel.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#FAF7F2] border border-[#EAE0D5] space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#6D1835]/10 text-[#6D1835] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold">Manual 2D Artisan Proofs</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Zero automated guesswork. Before production begins, our studio team renders an exact 2D digital mockup and reviews placement with you on WhatsApp.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#FAF7F2] border border-[#EAE0D5] space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#6D1835]/10 text-[#6D1835] flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold">Keepsake Longevity</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Using archival DTF pigment inks and precision Japanese embroidery machines, our prints withstand 50+ washes without cracking or fading.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="font-serif text-3xl font-bold text-[#6D1835] mb-3">
            Have a Story Waiting to Be Told?
          </h2>
          <p className="text-xs text-gray-600 mb-8 leading-relaxed">
            Browse our ready-to-wear collections or get in touch with our design studio to craft a one-of-a-kind bespoke piece.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="px-8 py-3.5 rounded-full bg-[#6D1835] text-white text-xs font-semibold hover:bg-[#4F1026] transition-colors shadow-sm"
            >
              Browse Collections
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-full border border-[#6D1835] text-[#6D1835] text-xs font-semibold hover:bg-[#6D1835]/5 transition-colors"
            >
              Contact Our Studio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
