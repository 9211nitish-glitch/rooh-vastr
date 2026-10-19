"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Layout,
  Image as ImageIcon,
  Save,
  CheckCircle2,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  MoveUp,
  MoveDown,
  Sparkles,
  ExternalLink,
  Sliders,
  BellRing,
  Tag,
} from "lucide-react";
import ImageUploadField from "@/components/admin/ImageUploadField";

interface HeroBanner {
  id: string;
  tag: string;
  heading: string;
  subheading: string;
  ctaText: string;
  ctaLink: string;
  imageUrl: string;
  active: boolean;
  priority: number;
}

interface PromoStrip {
  id: string;
  title: string;
  text: string;
  countdownDate?: string;
  bgColor: string;
  active: boolean;
}

interface HomepageSection {
  id: string;
  name: string;
  key: string;
  enabled: boolean;
  order: number;
}

const DEFAULT_HERO_BANNERS: HeroBanner[] = [
  {
    id: "banner-1",
    tag: "Festive Exclusive 2026",
    heading: "Wear Your Story. Gift Your Feelings.",
    subheading: "Premium Personalized Apparel, Heat-Revealing Magic Mugs, and Memory Frames handcrafted with love.",
    ctaText: "Design Custom Gifts",
    ctaLink: "/custom-printing",
    imageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop",
    active: true,
    priority: 1,
  },
  {
    id: "banner-2",
    tag: "Corporate & Team Swag",
    heading: "Bespoke Corporate Merchandise",
    subheading: "Custom Hoodies, Metal Bottles & Desk Essentials with free digital 3D sample proofs.",
    ctaText: "Get Corporate Quote",
    ctaLink: "/corporate",
    imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1200&auto=format&fit=crop",
    active: true,
    priority: 2,
  },
  {
    id: "banner-3",
    tag: "Trending POD Collection",
    heading: "Oversized Bio-Wash Heavy Tees",
    subheading: "240 GSM Luxury combed cotton featuring HD Direct-to-Film artwork that never fades.",
    ctaText: "Shop Collection",
    ctaLink: "/products?category=t-shirts",
    imageUrl: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop",
    active: true,
    priority: 3,
  },
];

const DEFAULT_PROMO: PromoStrip = {
  id: "promo-1",
  title: "Diwali & Wedding Season Mega Offer",
  text: "Use code ROOHFIRST for Flat 15% OFF on first personalized order + Free Pan-India Delivery!",
  bgColor: "from-amber-900 to-rose-900",
  active: true,
};

const DEFAULT_SECTIONS: HomepageSection[] = [
  { id: "sec-1", name: "Hero Banners & Sliders", key: "hero", enabled: true, order: 1 },
  { id: "sec-2", name: "Category Quick Pills & Visual Icons", key: "categories", enabled: true, order: 2 },
  { id: "sec-3", name: "Bespoke Custom POD Studio Banner", key: "custom_studio", enabled: true, order: 3 },
  { id: "sec-4", name: "Featured & Best Selling Products", key: "featured_products", enabled: true, order: 4 },
  { id: "sec-5", name: "Customer Testimonials & Photo Proofs", key: "testimonials", enabled: true, order: 5 },
  { id: "sec-6", name: "Trust Guarantees & Free Shipping Badge", key: "trust_badges", enabled: true, order: 6 },
];

export default function HomepageBannersAdminPage() {
  const [heroBanners, setHeroBanners] = useState<HeroBanner[]>(DEFAULT_HERO_BANNERS);
  const [promoStrip, setPromoStrip] = useState<PromoStrip>(DEFAULT_PROMO);
  const [sections, setSections] = useState<HomepageSection[]>(DEFAULT_SECTIONS);
  const [saved, setSaved] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const savedBanners = localStorage.getItem("rooh_hero_banners");
      const savedPromo = localStorage.getItem("rooh_promo_strip");
      const savedSecs = localStorage.getItem("rooh_homepage_sections");
      if (savedBanners) setHeroBanners(JSON.parse(savedBanners));
      if (savedPromo) setPromoStrip(JSON.parse(savedPromo));
      if (savedSecs) setSections(JSON.parse(savedSecs));
    } catch {
      // ignore
    }
  }, []);

  const handleSaveAll = () => {
    try {
      localStorage.setItem("rooh_hero_banners", JSON.stringify(heroBanners));
      localStorage.setItem("rooh_promo_strip", JSON.stringify(promoStrip));
      localStorage.setItem("rooh_homepage_sections", JSON.stringify(sections));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      // ignore
    }
  };

  const addHeroBanner = () => {
    const newB: HeroBanner = {
      id: `banner-${Date.now()}`,
      tag: "Special Launch",
      heading: "New Story Unlocked",
      subheading: "Describe the limited edition product or holiday collection.",
      ctaText: "Shop Now",
      ctaLink: "/products",
      imageUrl: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=1200&auto=format&fit=crop",
      active: true,
      priority: heroBanners.length + 1,
    };
    setHeroBanners([...heroBanners, newB]);
  };

  const removeBanner = (id: string) => {
    setHeroBanners(heroBanners.filter((b) => b.id !== id));
  };

  const updateBanner = (id: string, field: keyof HeroBanner, value: string | boolean) => {
    setHeroBanners(heroBanners.map((b) => (b.id === id ? { ...b, [field]: value } : b)));
  };

  const toggleSection = (id: string) => {
    setSections(sections.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)));
  };

  const moveSection = (index: number, direction: "up" | "down") => {
    const newSecs = [...sections];
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newSecs.length) return;
    const temp = newSecs[index];
    newSecs[index] = newSecs[targetIdx];
    newSecs[targetIdx] = temp;
    // update order
    newSecs.forEach((sec, idx) => (sec.order = idx + 1));
    setSections(newSecs);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-800">
            <Layout className="w-4 h-4" />
            Storefront Visual Builder
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif font-bold text-stone-900 mt-1">
            Homepage Layout, Hero Sliders &amp; Festive Banners
          </h1>
          <p className="text-sm text-stone-600">
            Control what visitors see on the front page — change headline copy, banner visuals, festive countdowns, and section ordering without touching code.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-rose-900 hover:bg-rose-950 text-white text-sm font-semibold transition shadow-md"
        >
          {saved ? (
            <>
              <CheckCircle2 className="w-4 h-4" /> Changes Published!
            </>
          ) : (
            <>
              <Save className="w-4 h-4" /> Publish to Storefront
            </>
          )}
        </button>
      </div>

      {/* Festive Notification Banner Strip */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <BellRing className="w-4 h-4 text-amber-700" />
            <h2 className="text-base font-bold text-stone-900">
              Top Header Announcement &amp; Flash Sale Bar
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setPromoStrip({ ...promoStrip, active: !promoStrip.active })}
            className={`px-3 py-1 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
              promoStrip.active
                ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                : "bg-stone-200 text-stone-600"
            }`}
          >
            {promoStrip.active ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            {promoStrip.active ? "Visible on Site" : "Hidden"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Campaign Heading / Tagline
            </label>
            <input
              type="text"
              value={promoStrip.title}
              onChange={(e) => setPromoStrip({ ...promoStrip, title: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:border-rose-800 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Announcement Message &amp; Coupon Code
            </label>
            <input
              type="text"
              value={promoStrip.text}
              onChange={(e) => setPromoStrip({ ...promoStrip, text: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:border-rose-800 focus:outline-none"
            />
          </div>
        </div>

        {/* Live Preview of the Announcement bar */}
        {promoStrip.active && (
          <div className="mt-2 p-2.5 rounded-xl bg-gradient-to-r from-amber-900 via-rose-950 to-amber-900 text-amber-100 text-xs text-center font-medium shadow-inner flex items-center justify-center gap-2">
            <span className="font-bold text-amber-300 uppercase tracking-wider text-[10px] bg-amber-500/20 px-2 py-0.5 rounded border border-amber-400/30">
              {promoStrip.title}
            </span>
            <span>{promoStrip.text}</span>
          </div>
        )}
      </div>

      {/* Hero Sliders / Banners Manager */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-rose-800" />
              Hero Carousel Banners ({heroBanners.length})
            </h2>
            <p className="text-xs text-stone-500">
              These large visual cards rotate at the top of your homepage for first-time visitors.
            </p>
          </div>
          <button
            type="button"
            onClick={addHeroBanner}
            className="px-3.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-900 text-xs font-semibold border border-rose-200 flex items-center gap-1.5 transition"
          >
            <Plus className="w-3.5 h-3.5" /> Add Hero Slide
          </button>
        </div>

        <div className="space-y-4">
          {heroBanners.map((banner, index) => (
            <div
              key={banner.id}
              className="p-4 rounded-xl border border-stone-200 bg-stone-50/60 flex flex-col md:flex-row gap-4 hover:border-rose-300 transition"
            >
              {/* Image Preview thumbnail */}
              <div className="w-full md:w-56 h-36 rounded-lg overflow-hidden relative bg-stone-200 shrink-0 border border-stone-300">
                <Image
                  src={banner.imageUrl}
                  alt={banner.heading}
                  fill
                  className="object-cover"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-bold">
                  Slide #{index + 1}
                </span>
              </div>

              {/* Editable Fields */}
              <div className="flex-1 space-y-2.5">
                <div className="space-y-2">
                  <ImageUploadField
                    label="Hero Slide Background Image"
                    value={banner.imageUrl}
                    onChange={(url) => updateBanner(banner.id, "imageUrl", url)}
                    folder="banners"
                    aspectRatio="banner"
                    helperText="Upload slide background from device or enter link."
                  />

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-stone-500">
                      Pill Tag
                    </label>
                    <input
                      type="text"
                      value={banner.tag}
                      onChange={(e) => updateBanner(banner.id, "tag", e.target.value)}
                      className="w-full px-2.5 py-1 rounded-lg border border-stone-200 text-xs font-semibold bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-stone-500">
                    Main Headline
                  </label>
                  <input
                    type="text"
                    value={banner.heading}
                    onChange={(e) => updateBanner(banner.id, "heading", e.target.value)}
                    className="w-full px-2.5 py-1 rounded-lg border border-stone-200 text-xs font-serif font-bold text-stone-900 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-stone-500">
                    Subheading Description
                  </label>
                  <input
                    type="text"
                    value={banner.subheading}
                    onChange={(e) => updateBanner(banner.id, "subheading", e.target.value)}
                    className="w-full px-2.5 py-1 rounded-lg border border-stone-200 text-xs text-stone-700 bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 items-end">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-stone-500">
                      CTA Button Text
                    </label>
                    <input
                      type="text"
                      value={banner.ctaText}
                      onChange={(e) => updateBanner(banner.id, "ctaText", e.target.value)}
                      className="w-full px-2.5 py-1 rounded-lg border border-stone-200 text-xs font-semibold bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-stone-500">
                      Target Link / Route
                    </label>
                    <input
                      type="text"
                      value={banner.ctaLink}
                      onChange={(e) => updateBanner(banner.id, "ctaLink", e.target.value)}
                      className="w-full px-2.5 py-1 rounded-lg border border-stone-200 text-xs font-mono bg-white"
                    />
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => updateBanner(banner.id, "active", !banner.active)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                        banner.active
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-stone-200 text-stone-600"
                      }`}
                    >
                      {banner.active ? "Active" : "Inactive"}
                    </button>
                    <button
                      type="button"
                      onClick={() => removeBanner(banner.id)}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition"
                      title="Delete Slide"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Homepage Section Reordering & Visibility */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-sm space-y-4">
        <div className="border-b border-stone-100 pb-3">
          <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-rose-800" />
            Homepage Section Order &amp; Visibility Matrix
          </h2>
          <p className="text-xs text-stone-500">
            Reorder which parts of the homepage appear first, or temporarily hide sections for a cleaner layout.
          </p>
        </div>

        <div className="space-y-2">
          {sections.map((sec, index) => (
            <div
              key={sec.id}
              className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition ${
                sec.enabled ? "bg-white border-stone-200" : "bg-stone-50 border-stone-200 opacity-60"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-stone-100 text-stone-600 font-bold text-xs flex items-center justify-center shrink-0">
                  {sec.order}
                </span>
                <div>
                  <span className="font-semibold text-sm text-stone-900">{sec.name}</span>
                  <span className="text-xs text-stone-400 font-mono ml-2">({sec.key})</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => moveSection(index, "up")}
                  className="p-1.5 rounded-lg hover:bg-stone-100 disabled:opacity-30 text-stone-600 transition"
                  title="Move Up"
                >
                  <MoveUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  disabled={index === sections.length - 1}
                  onClick={() => moveSection(index, "down")}
                  className="p-1.5 rounded-lg hover:bg-stone-100 disabled:opacity-30 text-stone-600 transition"
                  title="Move Down"
                >
                  <MoveDown className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => toggleSection(sec.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                    sec.enabled
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-stone-200 text-stone-600"
                  }`}
                >
                  {sec.enabled ? "Enabled" : "Disabled"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
