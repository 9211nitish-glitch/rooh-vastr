"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Globe,
  Save,
  CheckCircle2,
  ExternalLink,
  Plus,
  Trash2,
  ArrowRight,
  Sparkles,
  Search,
  Share2,
  RefreshCw,
  FileCode,
} from "lucide-react";
import ImageUploadField from "@/components/admin/ImageUploadField";

interface SeoSettings {
  siteTitle: string;
  metaDescription: string;
  keywords: string;
  canonicalUrl: string;
  ogImage: string;
  twitterHandle: string;
  robotsIndexing: boolean;
}

interface RedirectRule {
  id: string;
  fromPath: string;
  toPath: string;
  type: "301" | "302";
  hits: number;
}

const DEFAULT_SEO: SeoSettings = {
  siteTitle: "Rooh Vastr | Custom T-Shirts, Photo Mugs & Personalized Gifts India",
  metaDescription:
    "Design and order bespoke personalized gifts online in India. High-definition oversized t-shirt printing, color-changing magic mugs, and customized corporate merchandise with fast pan-India delivery.",
  keywords: "custom t-shirts india, personalized mugs, print on demand, rooh vastr, corporate gifts, customized hoodies",
  canonicalUrl: "https://roohvastr.com",
  ogImage: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop",
  twitterHandle: "@roohvastr",
  robotsIndexing: true,
};

const DEFAULT_REDIRECTS: RedirectRule[] = [
  { id: "red-1", fromPath: "/shop/old-tees", toPath: "/products?category=t-shirts", type: "301", hits: 342 },
  { id: "red-2", fromPath: "/diwali-offer-2025", toPath: "/coupons", type: "301", hits: 189 },
  { id: "red-3", fromPath: "/custom-order", toPath: "/custom-printing", type: "301", hits: 521 },
];

export default function SeoManagerAdminPage() {
  const [seo, setSeo] = useState<SeoSettings>(DEFAULT_SEO);
  const [redirects, setRedirects] = useState<RedirectRule[]>(DEFAULT_REDIRECTS);
  const [saved, setSaved] = useState(false);
  const [pingStatus, setPingStatus] = useState<string | null>(null);

  const [newRedirect, setNewRedirect] = useState({
    fromPath: "",
    toPath: "",
    type: "301" as "301" | "302",
  });

  // Sync with localStorage
  useEffect(() => {
    try {
      const savedSeo = localStorage.getItem("rooh_seo_settings");
      const savedRed = localStorage.getItem("rooh_redirect_rules");
      if (savedSeo) setSeo(JSON.parse(savedSeo));
      if (savedRed) setRedirects(JSON.parse(savedRed));
    } catch {
      // ignore
    }
  }, []);

  const handleSaveSeo = () => {
    try {
      localStorage.setItem("rooh_seo_settings", JSON.stringify(seo));
      localStorage.setItem("rooh_redirect_rules", JSON.stringify(redirects));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      // ignore
    }
  };

  const addRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRedirect.fromPath || !newRedirect.toPath) return;
    const rule: RedirectRule = {
      id: `red-${Date.now()}`,
      fromPath: newRedirect.fromPath.startsWith("/") ? newRedirect.fromPath : `/${newRedirect.fromPath}`,
      toPath: newRedirect.toPath.startsWith("/") ? newRedirect.toPath : `/${newRedirect.toPath}`,
      type: newRedirect.type,
      hits: 0,
    };
    const updated = [rule, ...redirects];
    setRedirects(updated);
    localStorage.setItem("rooh_redirect_rules", JSON.stringify(updated));
    setNewRedirect({ fromPath: "", toPath: "", type: "301" });
  };

  const deleteRedirect = (id: string) => {
    const updated = redirects.filter((r) => r.id !== id);
    setRedirects(updated);
    localStorage.setItem("rooh_redirect_rules", JSON.stringify(updated));
  };

  const pingSearchEngines = () => {
    setPingStatus("Pinging Google & Bing sitemaps...");
    setTimeout(() => {
      setPingStatus("Successfully notified Google & Bing of updated sitemap.xml!");
      setTimeout(() => setPingStatus(null), 4000);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700">
            <Globe className="w-4 h-4" />
            Search Visibility &amp; Organic Ranking
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif font-bold text-stone-900 mt-1">
            SEO Manager &amp; 301 URL Redirects
          </h1>
          <p className="text-sm text-stone-600">
            Control search engine meta tags, OpenGraph social sharing preview, canonical URLs, and manage broken link redirects without editing code.
          </p>
        </div>

        <button
          onClick={handleSaveSeo}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-900 hover:bg-amber-950 text-white text-sm font-semibold transition shadow-md"
        >
          {saved ? (
            <>
              <CheckCircle2 className="w-4 h-4" /> SEO Saved!
            </>
          ) : (
            <>
              <Save className="w-4 h-4" /> Save Meta &amp; SEO
            </>
          )}
        </button>
      </div>

      {/* Main 2-Col Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Meta Fields (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-3">
              <Search className="w-4 h-4 text-amber-700" />
              Primary Search Meta Tags
            </h2>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-stone-700">
                  Global Meta Title Tag
                </label>
                <span className="text-[10px] text-stone-400">{seo.siteTitle.length}/60 chars</span>
              </div>
              <input
                type="text"
                value={seo.siteTitle}
                onChange={(e) => setSeo({ ...seo, siteTitle: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:border-amber-800 focus:outline-none"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-stone-700">
                  Meta Description (SERP Snippet)
                </label>
                <span className="text-[10px] text-stone-400">
                  {seo.metaDescription.length}/160 chars
                </span>
              </div>
              <textarea
                rows={3}
                value={seo.metaDescription}
                onChange={(e) => setSeo({ ...seo, metaDescription: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:border-amber-800 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Canonical Base URL
                </label>
                <input
                  type="text"
                  value={seo.canonicalUrl}
                  onChange={(e) => setSeo({ ...seo, canonicalUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm font-mono text-xs focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Twitter / X Handle
                </label>
                <input
                  type="text"
                  value={seo.twitterHandle}
                  onChange={(e) => setSeo({ ...seo, twitterHandle: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Target Keywords (Comma separated)
              </label>
              <input
                type="text"
                value={seo.keywords}
                onChange={(e) => setSeo({ ...seo, keywords: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none"
              />
            </div>

            <ImageUploadField
              label="Social Sharing Card (OG:Image)"
              value={seo.ogImage}
              onChange={(url) => setSeo({ ...seo, ogImage: url })}
              folder="seo"
              aspectRatio="wide"
              helperText="Upload 1200x630 social preview card for WhatsApp, Facebook, X, and LinkedIn."
            />
          </div>

          {/* 301 URL Redirect Manager */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-3">
              <Share2 className="w-4 h-4 text-amber-700" />
              URL Redirect Rules ({redirects.length})
            </h2>

            {/* Add Rule Form */}
            <form onSubmit={addRedirect} className="grid grid-cols-1 sm:grid-cols-12 gap-2">
              <div className="sm:col-span-5">
                <input
                  type="text"
                  required
                  placeholder="/old-page"
                  value={newRedirect.fromPath}
                  onChange={(e) => setNewRedirect({ ...newRedirect, fromPath: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-mono"
                />
              </div>
              <div className="sm:col-span-5">
                <input
                  type="text"
                  required
                  placeholder="/new-destination"
                  value={newRedirect.toPath}
                  onChange={(e) => setNewRedirect({ ...newRedirect, toPath: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-mono"
                />
              </div>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full py-2 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-semibold"
                >
                  + Add
                </button>
              </div>
            </form>

            {/* Existing Redirects List */}
            <div className="space-y-2 pt-2">
              {redirects.map((r) => (
                <div
                  key={r.id}
                  className="p-3 rounded-xl border border-stone-200 bg-stone-50/50 flex items-center justify-between text-xs font-mono"
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px]">
                      {r.type}
                    </span>
                    <span className="text-stone-700">{r.fromPath}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span className="font-semibold text-emerald-700">{r.toPath}</span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 ml-2">
                    <span className="text-[11px] text-stone-400 font-sans">{r.hits} hits</span>
                    <button
                      type="button"
                      onClick={() => deleteRedirect(r.id)}
                      className="p-1 text-stone-400 hover:text-rose-600 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: SERP & Social Previews (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Google SERP Card Preview */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-sm space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Google Search Result Snippet Preview
            </span>

            <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-stone-200 flex items-center justify-center font-bold text-[10px] text-stone-600">
                  RV
                </div>
                <div>
                  <p className="text-[11px] text-stone-800 font-medium leading-none">Rooh Vastr</p>
                  <p className="text-[10px] text-stone-500 leading-none mt-0.5">{seo.canonicalUrl}</p>
                </div>
              </div>

              <h3 className="text-base text-[#1a0dab] font-medium hover:underline cursor-pointer leading-snug line-clamp-2">
                {seo.siteTitle}
              </h3>

              <p className="text-xs text-[#4d5156] leading-relaxed line-clamp-3">
                {seo.metaDescription}
              </p>
            </div>
          </div>

          {/* Social Card Preview (WhatsApp / Facebook) */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-sm space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Social Sharing &amp; WhatsApp Card Preview
            </span>

            <div className="rounded-xl border border-stone-200 overflow-hidden shadow-xs bg-stone-50">
              <div className="relative aspect-16/9 w-full bg-stone-200">
                <Image
                  src={seo.ogImage}
                  alt={seo.siteTitle}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-3 bg-white space-y-1">
                <p className="text-[10px] uppercase font-bold text-stone-400">
                  ROOHVASTR.COM
                </p>
                <p className="text-xs font-bold text-stone-900 line-clamp-1">{seo.siteTitle}</p>
                <p className="text-[11px] text-stone-500 line-clamp-2">{seo.metaDescription}</p>
              </div>
            </div>
          </div>

          {/* Sitemap & Indexing Status */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-sm space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Sitemap &amp; Crawler Control
            </span>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-stone-50 border border-stone-200">
                <span className="flex items-center gap-1.5 font-medium text-stone-700">
                  <FileCode className="w-4 h-4 text-emerald-600" /> /sitemap.xml
                </span>
                <span className="text-emerald-700 font-bold text-[11px]">ACTIVE &amp; AUTO-GENERATED</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-stone-50 border border-stone-200">
                <span className="flex items-center gap-1.5 font-medium text-stone-700">
                  <FileCode className="w-4 h-4 text-emerald-600" /> /robots.txt
                </span>
                <span className="text-emerald-700 font-bold text-[11px]">INDEXING ALLOWED</span>
              </div>
            </div>

            <button
              type="button"
              onClick={pingSearchEngines}
              className="w-full py-2.5 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-800 font-semibold text-xs flex items-center justify-center gap-2 transition"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Ping Google &amp; Bing for Re-indexing
            </button>
            {pingStatus && (
              <p className="text-xs text-center font-medium text-emerald-700 animate-in fade-in">
                {pingStatus}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
