"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  Search,
  Tag
} from "lucide-react";
import { GeneratedBlogDraft } from "@/app/api/ai/generate-blog/route";
import { DEFAULT_STOREFRONT_ARTICLES } from "@/lib/data/articles-data";

export default function BlogIndexPage() {
  const [articles, setArticles] = useState<GeneratedBlogDraft[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("rooh_blog_posts");
      if (stored) {
        const parsed: GeneratedBlogDraft[] = JSON.parse(stored);
        const liveOnly = parsed.filter((a) => a.status === "published");
        if (liveOnly.length > 0) {
          setArticles(liveOnly);
          return;
        }
      }
      setArticles(DEFAULT_STOREFRONT_ARTICLES);
    } catch (e) {
      console.error(e);
      setArticles(DEFAULT_STOREFRONT_ARTICLES);
    }
  }, []);

  const categories = [
    "all",
    ...Array.from(new Set(articles.map((a) => a.category))),
  ];

  const filteredArticles = articles.filter((a) => {
    const matchesCategory =
      selectedCategory === "all" || a.category === selectedCategory;
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (a.target_keywords || []).some((kw) =>
        kw.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = filteredArticles[0];
  const gridArticles = filteredArticles.slice(1);

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-20">
      {/* Editorial Header */}
      <section className="bg-[#242124] text-white py-16 sm:py-20 px-4 border-b border-stone-800">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#6D1835] text-white text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Rooh Vastr Journal</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
            Stories of Love, Fabric & Feeling
          </h1>
          <p className="text-stone-300 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed">
            Inspiration for heartfelt gifting, timeless custom apparel, and celebrating personal milestones across India.
          </p>

          {/* Search bar */}
          <div className="pt-4 max-w-md mx-auto">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search stories, occasions, and gift guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-stone-900/90 text-white pl-11 pr-4 py-3 rounded-2xl border border-stone-700 text-xs focus:outline-none focus:border-[#C98F9F]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter Chips */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all capitalize ${
                selectedCategory === cat
                  ? "bg-[#6D1835] text-white shadow-xs"
                  : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-100"
              }`}
            >
              {cat === "all" ? "All Stories" : cat}
            </button>
          ))}
        </div>
      </section>

      {/* Articles Feed */}
      <section className="max-w-6xl mx-auto px-4 space-y-10">
        {filteredArticles.length === 0 ? (
          <div className="p-16 bg-white rounded-3xl border border-stone-200 text-center space-y-3">
            <BookOpen className="w-10 h-10 mx-auto text-stone-300" />
            <h3 className="font-serif text-lg font-bold text-[#242124]">
              No articles found
            </h3>
            <p className="text-xs text-stone-500">
              Try adjusting your search query or switching categories.
            </p>
          </div>
        ) : (
          <>
            {/* Featured Hero Article */}
            {featuredArticle && (
              <div className="bg-white rounded-3xl border border-stone-200/80 overflow-hidden shadow-xs hover:shadow-md transition-shadow">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  <div className="lg:col-span-7 h-64 sm:h-96 relative bg-stone-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={featuredArticle.image_url}
                      alt={featuredArticle.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-[#6D1835] text-white text-[11px] font-bold rounded-lg uppercase tracking-wider shadow-xs">
                      Featured Story
                    </span>
                  </div>

                  <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs text-stone-400">
                        <span className="text-[#6D1835] font-bold uppercase tracking-wider text-[11px]">
                          {featuredArticle.category}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {featuredArticle.reading_time}
                        </span>
                      </div>

                      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#242124] leading-snug hover:text-[#6D1835] transition-colors">
                        <Link href={`/blog/${featuredArticle.slug}`}>
                          {featuredArticle.title}
                        </Link>
                      </h2>

                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-3">
                        {featuredArticle.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {(featuredArticle.target_keywords || []).slice(0, 2).map((kw, i) => (
                          <span
                            key={i}
                            className="text-[10px] text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md"
                          >
                            #{kw}
                          </span>
                        ))}
                      </div>

                      <Link
                        href={`/blog/${featuredArticle.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6D1835] hover:text-[#521327] group"
                      >
                        <span>Read Story</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Grid of Remaining Articles */}
            {gridArticles.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gridArticles.map((article) => (
                  <article
                    key={article.id}
                    className="bg-white rounded-3xl border border-stone-200/80 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-48 relative bg-stone-100 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={article.image_url}
                          alt={article.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-[#242124]/90 text-white text-[10px] font-bold rounded-md uppercase tracking-wider backdrop-blur-xs">
                          {article.category}
                        </span>
                      </div>

                      <div className="p-6 space-y-2.5">
                        <div className="flex items-center gap-2 text-[11px] text-stone-400">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {article.reading_time}
                          </span>
                        </div>

                        <h3 className="font-serif font-bold text-base text-[#242124] leading-snug line-clamp-2 hover:text-[#6D1835] transition-colors">
                          <Link href={`/blog/${article.slug}`}>
                            {article.title}
                          </Link>
                        </h3>

                        <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                          {article.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-0 border-t border-stone-100 mt-4 flex items-center justify-between">
                      <span className="text-[11px] text-stone-400">
                        {article.created_at
                          ? new Date(article.created_at).toLocaleDateString("en-IN", {
                              month: "short",
                              day: "numeric",
                            })
                          : "Recent"}
                      </span>

                      <Link
                        href={`/blog/${article.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#6D1835] hover:text-[#521327] group"
                      >
                        <span>Read</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </section>

      {/* Bespoke Studio CTA Banner */}
      <section className="max-w-5xl mx-auto px-4 mt-16">
        <div className="bg-[#6D1835] text-white rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-lg">
          <span className="text-xs uppercase font-bold tracking-widest text-[#FAF7F2]/80">
            Have a Story Waiting to Be Worn?
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold">
            Bring Your Custom Ideas to Life
          </h2>
          <p className="text-xs sm:text-sm text-stone-200 max-w-xl mx-auto leading-relaxed">
            Upload your artwork, anniversary dates, or heartfelt messages. Our studio team crafts a complimentary 2D preview proof before you commit.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link
              href="/custom-printing"
              className="px-6 py-3 bg-white text-[#6D1835] hover:bg-stone-100 font-bold text-xs rounded-2xl shadow-sm transition-colors"
            >
              Explore Bespoke Studio
            </Link>
            <Link
              href="/shop"
              className="px-6 py-3 bg-stone-900/60 hover:bg-stone-900 text-white font-bold text-xs rounded-2xl border border-white/20 transition-colors"
            >
              Shop Ready Collections
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
