import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Share2,
  Sparkles,
  ShoppingBag,
  MessageCircle,
  Tag
} from "lucide-react";
import { DEFAULT_STOREFRONT_ARTICLES } from "@/lib/data/articles-data";
import { Metadata } from "next";

export async function generateStaticParams() {
  return DEFAULT_STOREFRONT_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = DEFAULT_STOREFRONT_ARTICLES.find((a) => a.slug === slug);
  if (!article) return { title: "Article Not Found | Rooh Vastr" };

  return {
    title: `${article.meta_title || article.title} | Rooh Vastr Journal`,
    description: article.meta_description || article.excerpt,
    keywords: article.target_keywords,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.image_url],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = DEFAULT_STOREFRONT_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-24">
      {/* Top Breadcrumb Header */}
      <div className="border-b border-stone-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-[#6D1835] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Journal</span>
          </Link>

          <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
            Rooh Vastr Editorial
          </span>
        </div>
      </div>

      {/* Main Article Container */}
      <article className="max-w-3xl mx-auto px-4 pt-10 sm:pt-14 space-y-8">
        {/* Category & Title */}
        <div className="space-y-4 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6D1835]/10 text-[#6D1835] text-[11px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            <span>{article.category}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#242124] leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-stone-500 pt-2 border-b border-stone-200 pb-6">
            <span>By Rooh Vastr Studio</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {article.reading_time}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(article.created_at).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Hero Featured Image */}
        {article.image_url && (
          <div className="rounded-3xl overflow-hidden shadow-xs border border-stone-200/80 bg-stone-100 max-h-[460px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Lead Excerpt */}
        <p className="text-base sm:text-lg font-serif italic text-stone-700 leading-relaxed border-l-4 border-[#6D1835] pl-4 sm:pl-6 py-1">
          {article.excerpt}
        </p>

        {/* Markdown Content Render */}
        <div className="prose prose-stone max-w-none text-stone-800 leading-relaxed space-y-6 text-sm sm:text-base">
          {article.content.split("\n\n").map((block, idx) => {
            if (block.startsWith("## ")) {
              return (
                <h2
                  key={idx}
                  className="font-serif text-2xl sm:text-3xl font-bold text-[#242124] pt-4"
                >
                  {block.replace("## ", "")}
                </h2>
              );
            }
            if (block.startsWith("### ")) {
              return (
                <h3
                  key={idx}
                  className="font-serif text-lg sm:text-xl font-bold text-[#242124] pt-2"
                >
                  {block.replace("### ", "")}
                </h3>
              );
            }
            if (block.startsWith("* ") || block.startsWith("- ")) {
              const items = block.split("\n").map((li) => li.replace(/^[*|-]\s*/, ""));
              return (
                <ul key={idx} className="list-disc pl-5 space-y-2">
                  {items.map((li, i) => (
                    <li key={i}>{li}</li>
                  ))}
                </ul>
              );
            }
            if (/^\d+\.\s/.test(block)) {
              const items = block.split("\n").map((li) => li.replace(/^\d+\.\s*/, ""));
              return (
                <ol key={idx} className="list-decimal pl-5 space-y-2">
                  {items.map((li, i) => (
                    <li key={i}>{li}</li>
                  ))}
                </ol>
              );
            }
            return (
              <p key={idx} className="text-stone-700 leading-relaxed">
                {block}
              </p>
            );
          })}
        </div>

        {/* Keywords Footer */}
        {article.target_keywords && article.target_keywords.length > 0 && (
          <div className="pt-6 border-t border-stone-200 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" /> Topics:
            </span>
            {article.target_keywords.map((kw, i) => (
              <span
                key={i}
                className="text-xs bg-white border border-stone-200 text-stone-700 px-3 py-1 rounded-xl font-medium"
              >
                #{kw}
              </span>
            ))}
          </div>
        )}

        {/* In-Article Gift Callout Box */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-[#6D1835] text-white flex items-center justify-center font-serif font-black text-sm">
              R
            </span>
            <div>
              <h4 className="font-serif font-bold text-base text-[#242124]">
                Wear Your Story. Gift Your Feelings.
              </h4>
              <p className="text-[11px] text-stone-500">
                Crafted with love by the artisans at Rooh Vastr Studio
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Ready to surprise someone special? Explore our signature collections or talk directly with our designers to create a customized 2D preview proof.
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <Link
              href="/shop"
              className="px-5 py-2.5 bg-[#6D1835] hover:bg-[#521327] text-white text-xs font-bold rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5" /> Shop Catalog
            </Link>
            <Link
              href="/custom-printing"
              className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" /> Bespoke Studio
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
