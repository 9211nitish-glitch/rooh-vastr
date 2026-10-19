"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  FileText,
  CheckCircle,
  Eye,
  RefreshCw,
  Search,
  BookOpen,
  Calendar,
  Clock,
  Send,
  Trash2,
  ExternalLink,
  Edit3
} from "lucide-react";
import Link from "next/link";
import { GeneratedBlogDraft } from "@/app/api/ai/generate-blog/route";
import ImageUploadField from "@/components/admin/ImageUploadField";

export default function AdminAIBlogPage() {
  const [drafts, setDrafts] = useState<GeneratedBlogDraft[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedDraft, setSelectedDraft] = useState<GeneratedBlogDraft | null>(null);
  const [themeInput, setThemeInput] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("rooh_blog_posts");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setDrafts(parsed);
          setSelectedDraft(parsed[0]);
          return;
        }
      }
      // If none, run a quiet initial generation to seed 4 daily drafts
      handleGenerateDrafts(false);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleGenerateDrafts = async (notify = true) => {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/ai/generate-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          count: 4,
          theme: themeInput || "Personalized Gifting, Custom Apparel & Meaningful Celebrations in India",
        }),
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.drafts)) {
        // Prepend new drafts
        const combined = [...data.drafts, ...drafts];
        setDrafts(combined);
        setSelectedDraft(data.drafts[0]);
        localStorage.setItem("rooh_blog_posts", JSON.stringify(combined));
        if (notify) {
          showNotification(`✨ Generated ${data.drafts.length} fresh daily blog articles with Gemini AI!`);
        }
      } else {
        showNotification("Failed to generate drafts. Please check API key.");
      }
    } catch (e) {
      console.error(e);
      showNotification("Error connecting to Gemini generation route.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePublish = (draftId: string) => {
    const updated = drafts.map((d) =>
      d.id === draftId ? { ...d, status: "published" as const } : d
    );
    setDrafts(updated);
    if (selectedDraft?.id === draftId) {
      setSelectedDraft({ ...selectedDraft, status: "published" });
    }
    localStorage.setItem("rooh_blog_posts", JSON.stringify(updated));
    showNotification("🎉 Article approved and published live to Storefront Journal!");
  };

  const handleUnpublish = (draftId: string) => {
    const updated = drafts.map((d) =>
      d.id === draftId ? { ...d, status: "draft" as const } : d
    );
    setDrafts(updated);
    if (selectedDraft?.id === draftId) {
      setSelectedDraft({ ...selectedDraft, status: "draft" });
    }
    localStorage.setItem("rooh_blog_posts", JSON.stringify(updated));
    showNotification("Article reverted to draft.");
  };

  const handleDelete = (draftId: string) => {
    const updated = drafts.filter((d) => d.id !== draftId);
    setDrafts(updated);
    if (selectedDraft?.id === draftId) {
      setSelectedDraft(updated[0] || null);
    }
    localStorage.setItem("rooh_blog_posts", JSON.stringify(updated));
    showNotification("Draft deleted.");
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDraft) return;
    const updated = drafts.map((d) =>
      d.id === selectedDraft.id ? selectedDraft : d
    );
    setDrafts(updated);
    localStorage.setItem("rooh_blog_posts", JSON.stringify(updated));
    setIsEditing(false);
    showNotification("Changes saved successfully!");
  };

  const publishedCount = drafts.filter((d) => d.status === "published").length;

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#242124] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-stone-700 text-xs font-semibold animate-in fade-in slide-in-from-top-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-stone-200 pb-5">
        <div>
          <span className="text-xs uppercase font-bold text-[#6D1835] tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Powered by Google Gemini 2.5 Flash
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#242124]">
            AI Daily Blog Engine & Journal Manager
          </h1>
          <p className="text-xs text-stone-600 mt-1">
            Produce 4 high-ranking, emotionally rich editorial drafts daily. Review, refine copy, and publish to the storefront.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/blog"
            target="_blank"
            className="px-4 py-2.5 rounded-2xl bg-white hover:bg-stone-50 border border-stone-300 text-stone-700 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#6D1835]" />
            <span>Storefront Blog ({publishedCount})</span>
            <ExternalLink className="w-3 h-3 text-stone-400" />
          </Link>
        </div>
      </div>

      {/* Generator Prompt Box */}
      <div className="p-5 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-[#6D1835]/10 text-[#6D1835] flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold text-[#242124] uppercase tracking-wider">
            Generate 4 Fresh Daily Editorial Drafts
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Focus theme (e.g., Diwali gifting, couple anniversary keepsakes, corporate merch)..."
            value={themeInput}
            onChange={(e) => setThemeInput(e.target.value)}
            className="flex-1 bg-[#FAF7F2] px-4 py-2.5 rounded-2xl border border-stone-200 text-xs text-stone-800 focus:outline-none focus:border-[#6D1835]"
          />

          <button
            onClick={() => handleGenerateDrafts(true)}
            disabled={isGenerating}
            className="px-6 py-2.5 rounded-2xl bg-[#6D1835] hover:bg-[#521327] disabled:opacity-50 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Crafting 4 Articles...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Generate Today&apos;s Batch</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Master Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Article Queue (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-stone-200/80 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-stone-100 flex justify-between items-center bg-[#FAF7F2]">
            <span className="text-xs font-bold text-[#242124] uppercase tracking-wider">
              Articles Vault ({drafts.length})
            </span>
            <span className="text-[11px] text-stone-500 font-medium">
              {publishedCount} live in journal
            </span>
          </div>

          <div className="divide-y divide-stone-100 max-h-[750px] overflow-y-auto">
            {drafts.length === 0 ? (
              <div className="p-8 text-center text-stone-400 text-xs">
                No articles generated yet. Click &quot;Generate Today&apos;s Batch&quot; above!
              </div>
            ) : (
              drafts.map((draft) => {
                const isSelected = selectedDraft?.id === draft.id;
                const isLive = draft.status === "published";

                return (
                  <button
                    key={draft.id}
                    onClick={() => {
                      setSelectedDraft(draft);
                      setIsEditing(false);
                    }}
                    className={`w-full text-left p-4.5 transition-all flex flex-col gap-2 ${
                      isSelected
                        ? "bg-[#6D1835]/5 border-l-4 border-[#6D1835]"
                        : "hover:bg-stone-50"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-[10px] uppercase font-bold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md">
                        {draft.category}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isLive
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {isLive ? "Live in Journal" : "Draft"}
                      </span>
                    </div>

                    <h4 className="font-serif font-bold text-xs sm:text-sm text-[#242124] line-clamp-2">
                      {draft.title}
                    </h4>

                    <p className="text-[11px] text-stone-600 line-clamp-2">
                      {draft.excerpt}
                    </p>

                    <div className="flex justify-between items-center text-[10px] text-stone-400 pt-1">
                      <span>{draft.reading_time}</span>
                      <span>
                        {draft.created_at
                          ? new Date(draft.created_at).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                            })
                          : "Today"}
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right: Article Reader & Publishing Actions (7 cols) */}
        {selectedDraft ? (
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs space-y-6">
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-stone-100 pb-4">
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    selectedDraft.status === "published"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {selectedDraft.status === "published" ? "Live in Storefront" : "Draft Mode"}
                </span>
                <span className="text-xs text-stone-400">·</span>
                <span className="text-xs text-stone-500 font-medium">
                  {selectedDraft.reading_time}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-3 py-1.5 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5 text-stone-500" />
                  <span>{isEditing ? "Cancel Editing" : "Edit"}</span>
                </button>

                {selectedDraft.status === "published" ? (
                  <button
                    type="button"
                    onClick={() => handleUnpublish(selectedDraft.id)}
                    className="px-4 py-1.5 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold text-xs transition-colors"
                  >
                    Unpublish to Draft
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handlePublish(selectedDraft.id)}
                    className="px-4 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Approve & Publish Live</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => handleDelete(selectedDraft.id)}
                  className="w-8 h-8 rounded-xl bg-stone-100 hover:bg-rose-50 text-stone-400 hover:text-rose-600 flex items-center justify-center transition-colors"
                  title="Delete Draft"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Editing Form */}
            {isEditing ? (
              <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">
                    Article Title
                  </label>
                  <input
                    type="text"
                    value={selectedDraft.title}
                    onChange={(e) =>
                      setSelectedDraft({ ...selectedDraft, title: e.target.value })
                    }
                    className="w-full bg-[#FAF7F2] px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-800 focus:outline-none focus:border-[#6D1835]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">
                      Slug
                    </label>
                    <input
                      type="text"
                      value={selectedDraft.slug}
                      onChange={(e) =>
                        setSelectedDraft({ ...selectedDraft, slug: e.target.value })
                      }
                      className="w-full bg-[#FAF7F2] px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-800 focus:outline-none focus:border-[#6D1835]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      value={selectedDraft.category}
                      onChange={(e) =>
                        setSelectedDraft({
                          ...selectedDraft,
                          category: e.target.value,
                        })
                      }
                      className="w-full bg-[#FAF7F2] px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-800 focus:outline-none focus:border-[#6D1835]"
                    />
                  </div>
                </div>

                <ImageUploadField
                  label="Featured Blog Image"
                  value={selectedDraft.image_url}
                  onChange={(url) =>
                    setSelectedDraft({
                      ...selectedDraft,
                      image_url: url,
                    })
                  }
                  folder="blogs"
                  aspectRatio="wide"
                  helperText="Upload blog header cover image from device or provide an image link."
                />

                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">
                    Excerpt
                  </label>
                  <textarea
                    rows={2}
                    value={selectedDraft.excerpt}
                    onChange={(e) =>
                      setSelectedDraft({
                        ...selectedDraft,
                        excerpt: e.target.value,
                      })
                    }
                    className="w-full bg-[#FAF7F2] px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-800 focus:outline-none focus:border-[#6D1835]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">
                    Body Content (Markdown)
                  </label>
                  <textarea
                    rows={12}
                    value={selectedDraft.content}
                    onChange={(e) =>
                      setSelectedDraft({
                        ...selectedDraft,
                        content: e.target.value,
                      })
                    }
                    className="w-full font-mono bg-[#FAF7F2] px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-800 focus:outline-none focus:border-[#6D1835]"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#6D1835] text-white font-bold text-xs"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              /* Reader View */
              <article className="space-y-6">
                {/* Hero preview image */}
                {selectedDraft.image_url && (
                  <div className="w-full h-56 sm:h-72 rounded-2xl overflow-hidden bg-stone-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={selectedDraft.image_url}
                      alt={selectedDraft.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Title & Metadata */}
                <div className="space-y-2">
                  <span className="text-xs uppercase font-bold text-[#6D1835] tracking-widest">
                    {selectedDraft.category}
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#242124] leading-tight">
                    {selectedDraft.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 italic">
                    {selectedDraft.excerpt}
                  </p>
                </div>

                {/* SEO Snippet Preview */}
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-stone-200/80 space-y-1.5 text-xs">
                  <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
                    Google SERP Preview (SEO)
                  </span>
                  <p className="font-semibold text-blue-700 text-sm">
                    {selectedDraft.meta_title || selectedDraft.title}
                  </p>
                  <p className="text-[11px] text-emerald-800">
                    roohvastr.in/blog/{selectedDraft.slug}
                  </p>
                  <p className="text-stone-600 text-xs">
                    {selectedDraft.meta_description || selectedDraft.excerpt}
                  </p>
                  {selectedDraft.target_keywords && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {selectedDraft.target_keywords.map((kw, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-white border border-stone-200 text-[10px] font-mono text-stone-600"
                        >
                          #{kw}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Body Content */}
                <div className="prose prose-stone max-w-none text-xs sm:text-sm leading-relaxed text-stone-800 space-y-4 whitespace-pre-wrap">
                  {selectedDraft.content}
                </div>
              </article>
            )}
          </div>
        ) : (
          <div className="lg:col-span-7 p-12 bg-white rounded-3xl border border-stone-200/80 text-center text-stone-400">
            Select an article from the left column to read or review.
          </div>
        )}
      </div>
    </div>
  );
}
