"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Star,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  MessageSquare,
  Search,
  Filter,
  ShieldCheck,
  Send,
  Trash2,
  Calendar,
  ThumbsUp,
} from "lucide-react";

interface Review {
  id: string;
  customerName: string;
  customerEmail: string;
  productName: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedBuyer: boolean;
  status: "approved" | "pending" | "hidden";
  photoUrl?: string;
  adminReply?: string;
  helpfulCount: number;
}

const DEFAULT_REVIEWS: Review[] = [
  {
    id: "rev-1",
    customerName: "Aarav Sharma",
    customerEmail: "aarav.s@gmail.com",
    productName: "Vintage Heavyweight Oversized Tee",
    rating: 5,
    date: "15 Oct 2026",
    title: "Best fabric quality in India!",
    comment:
      "The 240 GSM feel is genuinely heavyweight, print is super crisp and didn't fade even after 2 machine washes. Delivered in Jaipur in just 3 days.",
    verifiedBuyer: true,
    status: "approved",
    photoUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=400&auto=format&fit=crop",
    adminReply: "Thank you so much Aarav! We use premium combed cotton for long-lasting prints. ❤️ - Team Rooh Vastr",
    helpfulCount: 14,
  },
  {
    id: "rev-2",
    customerName: "Pooja Verma",
    customerEmail: "pooja.v@outlook.com",
    productName: "Magic Heat-Sensitive Photo Mug",
    rating: 5,
    date: "14 Oct 2026",
    title: "Magical anniversary surprise!",
    comment:
      "When my husband poured hot tea, our photo slowly revealed! He was so shocked and happy. Super fast WhatsApp proof approval.",
    verifiedBuyer: true,
    status: "approved",
    photoUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=400&auto=format&fit=crop",
    helpfulCount: 22,
  },
  {
    id: "rev-3",
    customerName: "Rohan Kulkarni",
    customerEmail: "rohan.k@techcorp.in",
    productName: "Premium Memory Floating Frame",
    rating: 4,
    date: "12 Oct 2026",
    title: "Great packaging and clear glass",
    comment:
      "Packing was bulletproof with bubblewrap and wooden protection. Beautiful frame. Took 1 extra day to reach Bengaluru but well worth it.",
    verifiedBuyer: true,
    status: "approved",
    helpfulCount: 6,
  },
  {
    id: "rev-4",
    customerName: "Karan Johar",
    customerEmail: "karan@spam.com",
    productName: "Custom Hoodie",
    rating: 2,
    date: "10 Oct 2026",
    title: "Size was slightly large",
    comment: "I usually wear M but this oversized M fits like an L. Want replacement.",
    verifiedBuyer: false,
    status: "pending",
    adminReply: "Hello Karan, oversized fits are designed loose! We have already initiated a free exchange for size S.",
    helpfulCount: 1,
  },
];

export default function ReviewsAdminPage() {
  const [reviews, setReviews] = useState<Review[]>(DEFAULT_REVIEWS);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [replyInputs, setReplyInputs] = useState<Record<string, string>>({});

  // Sync with localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("rooh_reviews");
      if (saved) setReviews(JSON.parse(saved));
    } catch {
      // ignore
    }
  }, []);

  const saveReviews = (updated: Review[]) => {
    setReviews(updated);
    try {
      localStorage.setItem("rooh_reviews", JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const updateStatus = (id: string, status: Review["status"]) => {
    const updated = reviews.map((r) => (r.id === id ? { ...r, status } : r));
    saveReviews(updated);
  };

  const handleSendReply = (id: string) => {
    const replyText = replyInputs[id];
    if (!replyText?.trim()) return;
    const updated = reviews.map((r) =>
      r.id === id ? { ...r, adminReply: replyText.trim() } : r
    );
    saveReviews(updated);
    setReplyInputs({ ...replyInputs, [id]: "" });
  };

  const deleteReview = (id: string) => {
    const updated = reviews.filter((r) => r.id !== id);
    saveReviews(updated);
  };

  const filteredReviews = reviews.filter((r) => {
    const matchesSearch =
      r.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.comment.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "ALL" || r.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const avgRating = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1)
  ).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700">
            <Star className="w-4 h-4" />
            Social Proof &amp; Buyer Feedback
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif font-bold text-stone-900 mt-1">
            Customer Reviews &amp; Ratings Moderation
          </h1>
          <p className="text-sm text-stone-600">
            Approve verified buyer reviews, showcase photo testimonials on your storefront, and reply directly as Rooh Vastr.
          </p>
        </div>
      </div>

      {/* Ratings Overview Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-sm flex items-center gap-4">
          <div className="text-4xl font-serif font-bold text-amber-900">{avgRating}</div>
          <div>
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500" />
              ))}
            </div>
            <p className="text-xs text-stone-500 mt-1">
              Based on {reviews.length} authentic customer ratings
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-sm">
          <span className="text-xs font-medium text-stone-500">Approved &amp; Live</span>
          <p className="text-2xl font-bold font-serif text-emerald-700 mt-1">
            {reviews.filter((r) => r.status === "approved").length}
          </p>
          <p className="text-[11px] text-stone-500 mt-1">Visible on product pages</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-sm">
          <span className="text-xs font-medium text-stone-500">Pending Approval</span>
          <p className="text-2xl font-bold font-serif text-amber-700 mt-1">
            {reviews.filter((r) => r.status === "pending").length}
          </p>
          <p className="text-[11px] text-amber-600 font-medium mt-1">Awaiting moderation</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-sm">
          <span className="text-xs font-medium text-stone-500">Photo Reviews</span>
          <p className="text-2xl font-bold font-serif text-stone-900 mt-1">
            {reviews.filter((r) => r.photoUrl).length}
          </p>
          <p className="text-[11px] text-stone-500 mt-1">Includes unboxing photos</p>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search reviews by customer name, product, or keywords..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-amber-700"
          />
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-xs text-stone-500 font-medium mr-1">Status:</span>
          {["ALL", "approved", "pending", "hidden"].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition ${
                filterStatus === st
                  ? "bg-amber-900 text-white shadow-xs"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Review Cards Stream */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-stone-200 text-center text-stone-500">
            No reviews found matching &quot;{searchQuery}&quot;
          </div>
        ) : (
          filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-sm space-y-3.5 hover:border-amber-300 transition"
            >
              {/* Review Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-stone-100 text-stone-700 font-bold flex items-center justify-center text-xs">
                    {rev.customerName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-stone-900 text-sm flex items-center gap-1.5">
                      {rev.customerName}
                      {rev.verifiedBuyer && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium border border-emerald-200">
                          <ShieldCheck className="w-3 h-3" /> Verified Buyer
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-stone-500 flex items-center gap-2 mt-0.5">
                      <span>Product: <strong className="text-stone-700">{rev.productName}</strong></span>
                      <span>•</span>
                      <span>{rev.date}</span>
                    </div>
                  </div>
                </div>

                {/* Rating Stars & Status Badge */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rev.rating ? "fill-amber-500" : "text-stone-200"
                        }`}
                      />
                    ))}
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${
                      rev.status === "approved"
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        : rev.status === "pending"
                        ? "bg-amber-100 text-amber-800 border border-amber-300"
                        : "bg-stone-200 text-stone-600"
                    }`}
                  >
                    {rev.status}
                  </span>
                </div>
              </div>

              {/* Review Text & Photo */}
              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="flex-1 space-y-1.5">
                  <h4 className="font-bold text-stone-900 text-sm">{rev.title}</h4>
                  <p className="text-stone-700 text-xs leading-relaxed">{rev.comment}</p>
                </div>

                {rev.photoUrl && (
                  <div className="w-20 h-20 rounded-xl overflow-hidden relative border border-stone-200 shrink-0">
                    <Image
                      src={rev.photoUrl}
                      alt={rev.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Official Store Reply (if any) */}
              {rev.adminReply && (
                <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs space-y-1">
                  <div className="font-bold text-amber-950 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-amber-700" />
                    Rooh Vastr Response:
                  </div>
                  <p className="text-stone-700 pl-5">{rev.adminReply}</p>
                </div>
              )}

              {/* Action Controls & Reply Input */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-stone-100">
                <div className="flex items-center gap-2">
                  {rev.status !== "approved" && (
                    <button
                      type="button"
                      onClick={() => updateStatus(rev.id, "approved")}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1 shadow-xs transition"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Approve &amp; Show Live
                    </button>
                  )}
                  {rev.status !== "hidden" && (
                    <button
                      type="button"
                      onClick={() => updateStatus(rev.id, "hidden")}
                      className="px-3 py-1.5 rounded-lg border border-stone-200 hover:bg-stone-100 text-stone-600 text-xs font-semibold flex items-center gap-1 transition"
                    >
                      <EyeOff className="w-3.5 h-3.5" /> Hide from Store
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => deleteReview(rev.id)}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 transition"
                    title="Delete permanently"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Inline Reply Box */}
                {!rev.adminReply && (
                  <div className="flex items-center gap-2 flex-1 max-w-md">
                    <input
                      type="text"
                      placeholder="Write official store reply..."
                      value={replyInputs[rev.id] || ""}
                      onChange={(e) =>
                        setReplyInputs({ ...replyInputs, [rev.id]: e.target.value })
                      }
                      className="w-full px-3 py-1 rounded-lg border border-stone-200 text-xs focus:outline-none focus:border-amber-700"
                    />
                    <button
                      type="button"
                      onClick={() => handleSendReply(rev.id)}
                      className="px-3 py-1 rounded-lg bg-amber-900 hover:bg-amber-950 text-white text-xs font-semibold flex items-center gap-1 shrink-0 transition"
                    >
                      <Send className="w-3 h-3" /> Reply
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
