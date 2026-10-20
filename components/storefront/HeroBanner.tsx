"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, Gem, Heart, Truck, Sparkles } from "lucide-react";

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <section className="relative overflow-hidden bg-[#FAF4EE] py-10 md:py-16 lg:py-20 border-b border-[#E8DFD8]">
      {/* Background Soft Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C98F9F]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#6D1835]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Carousel Navigation Arrows */}
      <button
        type="button"
        onClick={() => setCurrentSlide((prev) => (prev === 0 ? 2 : prev - 1))}
        className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-[#6D1835] shadow-md items-center justify-center transition-all cursor-pointer"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        type="button"
        onClick={() => setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1))}
        className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-[#6D1835] shadow-md items-center justify-center transition-all cursor-pointer"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Emotion-driven Brand Typography & CTAs */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6 text-center lg:text-left">
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.18em] sm:tracking-[0.2em] uppercase text-[#6D1835] block">
              PERSONALIZED GIFTS &amp; CUSTOM MERCHANDISE
            </span>

            <h1 className="font-serif text-3xl xs:text-4xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-[#2D2424] leading-[1.15]">
              Wear Your Story. <br />
              Gift Your Feelings.
            </h1>

            <p className="text-xs sm:text-base text-stone-600 max-w-lg mx-auto lg:mx-0 font-normal leading-relaxed px-2 sm:px-0">
              Thoughtful gifts, custom designs and everyday essentials made just for the people who matter.
            </p>

            {/* DUAL ACTION BUTTONS */}
            <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1 sm:pt-2">
              <Link
                href="/shop"
                className="px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#6D1835] text-white text-xs sm:text-sm font-semibold shadow-md hover:bg-[#56132a] hover:scale-[1.02] transition-all flex items-center justify-center gap-1.5 sm:gap-2 group"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/custom-printing"
                className="px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-white text-[#2D2424] border border-[#2D2424]/30 text-xs sm:text-sm font-semibold hover:bg-stone-50 hover:border-[#6D1835] hover:text-[#6D1835] transition-all flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <span>Create Your Own</span>
                <span className="text-amber-500 font-serif">☆</span>
              </Link>
            </div>

            {/* 3 Trust Badges Row */}
            <div className="pt-4 sm:pt-6 grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:items-center sm:justify-center lg:justify-start sm:gap-8 border-t border-[#E8DFD8]">
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1 sm:gap-2 text-stone-700">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-[#6D1835] shrink-0">
                  <Gem className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] sm:text-xs font-semibold text-[#2D2424] block leading-tight">Premium Quality</span>
                  <span className="text-[9px] sm:text-[10px] text-stone-700 font-medium">Products</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1 sm:gap-2 text-stone-700">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-[#6D1835] shrink-0">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] sm:text-xs font-semibold text-[#2D2424] block leading-tight">Personalized</span>
                  <span className="text-[9px] sm:text-[10px] text-stone-700 font-medium">Just for You</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1 sm:gap-2 text-stone-700">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-[#6D1835] shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] sm:text-xs font-semibold text-[#2D2424] block leading-tight">Fast &amp; Safe</span>
                  <span className="text-[9px] sm:text-[10px] text-stone-700 font-medium">Delivery</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Montage Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Main Lifestyle Collage Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-xl bg-white border border-[#E8DFD8] p-4 sm:p-5">
                <div className="grid grid-cols-12 gap-3 sm:gap-4">
                  {/* Big T-Shirt & Box Card */}
                  <div className="col-span-7 space-y-3">
                    <div className="aspect-4/5 rounded-2xl overflow-hidden bg-[#F5EFEB] relative group">
                      <Image
                        src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80"
                        alt="Good Things Take Time Custom T-Shirt"
                        fill
                        priority
                        sizes="(max-width: 768px) 70vw, 420px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-xs rounded-xl p-2.5 text-center shadow-xs z-10">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-[#6D1835]">
                          Signature Apparel
                        </span>
                        <p className="text-xs font-medium text-stone-800">Good Things Take Time ♡</p>
                      </div>
                    </div>

                    <div className="rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#E8DFD8] p-3 flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0">
                        <Image
                          src="https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=400&q=80"
                          alt="Better Together Keychain"
                          fill
                          sizes="48px"
                          loading="lazy"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#2D2424] block">Wooden Keychain Pair</span>
                        <span className="text-[10px] text-stone-700 font-medium">Better Together ♡</span>
                      </div>
                    </div>
                  </div>

                  {/* Mug, Cushion & Frame Column */}
                  <div className="col-span-5 space-y-3">
                    <div className="aspect-square rounded-2xl overflow-hidden bg-[#FAF7F2] relative group border border-[#E8DFD8]">
                      <Image
                        src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80"
                        alt="Personalized Photo Mug"
                        fill
                        sizes="(max-width: 768px) 40vw, 240px"
                        loading="lazy"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 right-2 bg-[#6D1835] text-white text-[9px] font-bold px-2 py-0.5 rounded-full z-10">
                        Hot
                      </div>
                    </div>

                    <div className="aspect-square rounded-2xl overflow-hidden bg-[#FAF7F2] relative group border border-[#E8DFD8]">
                      <Image
                        src="https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80"
                        alt="Personalized Cushion"
                        fill
                        sizes="(max-width: 768px) 40vw, 240px"
                        loading="lazy"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-2.5 text-white z-10">
                        <span className="text-[10px] font-medium leading-tight">Home is wherever you are ♡</span>
                      </div>
                    </div>

                    <div className="aspect-4/3 rounded-2xl overflow-hidden bg-[#FAF7F2] relative group border border-[#E8DFD8]">
                      <Image
                        src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80"
                        alt="Couple Photo Frame"
                        fill
                        sizes="(max-width: 768px) 40vw, 240px"
                        loading="lazy"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Gift Finder Badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-3 shadow-lg border border-[#E8DFD8] hidden sm:flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#6D1835]/10 text-[#6D1835] flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-stone-900 block">AI Gift Assistant</span>
                  <span className="text-[10px] text-stone-700 font-medium">Pick the perfect gift in 30s</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Bottom Dots with WCAG AA compliant touch targets (min 44x44px) */}
        <div className="flex items-center justify-center gap-1 pt-8 sm:pt-10">
          {[0, 1, 2].map((idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              className="p-3 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
              aria-label={`Go to slide ${idx + 1}`}
            >
              <span
                className={`transition-all rounded-full block ${
                  currentSlide === idx ? "w-6 h-2 bg-[#6D1835]" : "w-2.5 h-2.5 bg-stone-400 hover:bg-stone-600"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
