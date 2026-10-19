"use client";

import React, { useState, useEffect } from "react";
import {
  Tag,
  Plus,
  Trash2,
  CheckCircle2,
  Save,
  Clock,
  Percent,
  IndianRupee,
  Calendar,
  Sparkles,
  Search,
  Copy,
  Users,
  Mail,
  Download,
} from "lucide-react";

interface Coupon {
  id: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minOrderValue: number;
  maxDiscountCap?: number;
  expiryDate: string;
  usageCount: number;
  maxUsageLimit: number;
  active: boolean;
  notes?: string;
}

interface NewsletterSub {
  email: string;
  date: string;
  source: string;
}

const DEFAULT_COUPONS: Coupon[] = [
  {
    id: "coup-1",
    code: "ROOHFIRST",
    discountType: "percentage",
    discountValue: 15,
    minOrderValue: 499,
    maxDiscountCap: 300,
    expiryDate: "2026-12-31",
    usageCount: 142,
    maxUsageLimit: 1000,
    active: true,
    notes: "Flat 15% discount for first time registered buyers.",
  },
  {
    id: "coup-2",
    code: "DIWALI200",
    discountType: "fixed",
    discountValue: 200,
    minOrderValue: 999,
    expiryDate: "2026-11-15",
    usageCount: 89,
    maxUsageLimit: 500,
    active: true,
    notes: "Festival special ₹200 off on festive gifts and hampers.",
  },
  {
    id: "coup-3",
    code: "CORP25",
    discountType: "percentage",
    discountValue: 25,
    minOrderValue: 4999,
    maxDiscountCap: 2500,
    expiryDate: "2026-12-31",
    usageCount: 18,
    maxUsageLimit: 100,
    active: true,
    notes: "Bulk corporate merchandise discount.",
  },
  {
    id: "coup-4",
    code: "MAGIC50",
    discountType: "fixed",
    discountValue: 50,
    minOrderValue: 349,
    expiryDate: "2026-10-31",
    usageCount: 64,
    maxUsageLimit: 200,
    active: false,
    notes: "Promo on photo mugs and ceramic bottles.",
  },
];

const DEFAULT_SUBS: NewsletterSub[] = [
  { email: "aarav.sharma@gmail.com", date: "16 Oct 2026", source: "Footer Form" },
  { email: "priya.mehta@tech.co", date: "15 Oct 2026", source: "Welcome Popup" },
  { email: "rohan.kulkarni@gmail.com", date: "14 Oct 2026", source: "Checkout Opt-in" },
  { email: "deepika.rao@yahoo.in", date: "12 Oct 2026", source: "Footer Form" },
  { email: "kabir.khan@rediffmail.com", date: "10 Oct 2026", source: "Welcome Popup" },
];

export default function CouponsAdminPage() {
  const [coupons, setCoupons] = useState<Coupon[]>(DEFAULT_COUPONS);
  const [subscribers, setSubscribers] = useState<NewsletterSub[]>(DEFAULT_SUBS);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newCoupon, setNewCoupon] = useState<Partial<Coupon>>({
    code: "",
    discountType: "percentage",
    discountValue: 10,
    minOrderValue: 499,
    maxDiscountCap: 200,
    expiryDate: "2026-12-31",
    maxUsageLimit: 500,
    active: true,
    notes: "",
  });

  // Sync with localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("rooh_coupons");
      if (saved) setCoupons(JSON.parse(saved));
      const savedSubs = localStorage.getItem("rooh_subscribers");
      if (savedSubs) setSubscribers(JSON.parse(savedSubs));
    } catch {
      // ignore
    }
  }, []);

  const saveCouponsToStorage = (updated: Coupon[]) => {
    setCoupons(updated);
    try {
      localStorage.setItem("rooh_coupons", JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const toggleCouponStatus = (id: string) => {
    const updated = coupons.map((c) => (c.id === id ? { ...c, active: !c.active } : c));
    saveCouponsToStorage(updated);
  };

  const deleteCoupon = (id: string) => {
    const updated = coupons.filter((c) => c.id !== id);
    saveCouponsToStorage(updated);
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCoupon.code?.trim()) return;

    const created: Coupon = {
      id: `coup-${Date.now()}`,
      code: newCoupon.code.toUpperCase().replace(/\s+/g, ""),
      discountType: newCoupon.discountType || "percentage",
      discountValue: Number(newCoupon.discountValue) || 10,
      minOrderValue: Number(newCoupon.minOrderValue) || 0,
      maxDiscountCap: newCoupon.maxDiscountCap ? Number(newCoupon.maxDiscountCap) : undefined,
      expiryDate: newCoupon.expiryDate || "2026-12-31",
      usageCount: 0,
      maxUsageLimit: Number(newCoupon.maxUsageLimit) || 100,
      active: true,
      notes: newCoupon.notes || "",
    };

    saveCouponsToStorage([created, ...coupons]);
    setIsCreating(false);
    setNewCoupon({
      code: "",
      discountType: "percentage",
      discountValue: 10,
      minOrderValue: 499,
      maxDiscountCap: 200,
      expiryDate: "2026-12-31",
      maxUsageLimit: 500,
      active: true,
      notes: "",
    });
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const exportSubscribersCSV = () => {
    const headers = ["Email,DateSubscribed,Source"];
    const rows = subscribers.map((s) => `"${s.email}","${s.date}","${s.source}"`);
    const blob = new Blob([[...headers, ...rows].join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `RoohVastr_Subscribers_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  const filteredCoupons = coupons.filter(
    (c) =>
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.notes?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700">
            <Tag className="w-4 h-4" />
            Promotions &amp; Discounts Engine
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif font-bold text-stone-900 mt-1">
            Coupons, Offers &amp; Newsletter Audience
          </h1>
          <p className="text-sm text-stone-600">
            Create percentage discounts, flat cart deductions, festival discount vouchers, and manage your marketing subscribers.
          </p>
        </div>

        <button
          onClick={() => setIsCreating(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-900 hover:bg-amber-950 text-white text-sm font-semibold transition shadow-md"
        >
          <Plus className="w-4 h-4" /> Create New Coupon
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-sm">
          <p className="text-xs font-medium text-stone-500">Active Promo Codes</p>
          <p className="text-2xl font-bold font-serif text-stone-900 mt-1">
            {coupons.filter((c) => c.active).length}
          </p>
          <p className="text-[11px] text-emerald-600 font-medium mt-1">Live at checkout</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-sm">
          <p className="text-xs font-medium text-stone-500">Total Times Redeemed</p>
          <p className="text-2xl font-bold font-serif text-stone-900 mt-1">
            {coupons.reduce((a, c) => a + c.usageCount, 0)}
          </p>
          <p className="text-[11px] text-stone-500 mt-1">Across all orders</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-sm">
          <p className="text-xs font-medium text-stone-500">Avg. Discount Given</p>
          <p className="text-2xl font-bold font-serif text-amber-800 mt-1">16.4%</p>
          <p className="text-[11px] text-stone-500 mt-1">Cart conversion boost</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-sm">
          <p className="text-xs font-medium text-stone-500">Email Subscribers</p>
          <p className="text-2xl font-bold font-serif text-stone-900 mt-1">{subscribers.length}</p>
          <p className="text-[11px] text-stone-500 mt-1">Opted in for promos</p>
        </div>
      </div>

      {/* Create Coupon Modal Form */}
      {isCreating && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="text-lg font-bold font-serif text-stone-900">Create New Coupon Code</h3>
              <button
                onClick={() => setIsCreating(false)}
                className="text-stone-400 hover:text-stone-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCoupon} className="space-y-4 py-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Coupon Code (e.g. ROOHFESTIVE)
                </label>
                <input
                  type="text"
                  required
                  value={newCoupon.code}
                  onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                  placeholder="DIWALI25"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 font-mono text-sm uppercase font-bold focus:border-amber-800 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Discount Type
                  </label>
                  <select
                    value={newCoupon.discountType}
                    onChange={(e) =>
                      setNewCoupon({
                        ...newCoupon,
                        discountType: e.target.value as "percentage" | "fixed",
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm bg-white focus:outline-none"
                  >
                    <option value="percentage">Percentage (%) Off</option>
                    <option value="fixed">Flat Amount (₹) Off</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Discount Value {newCoupon.discountType === "percentage" ? "(%)" : "(₹)"}
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={newCoupon.discountValue}
                    onChange={(e) => setNewCoupon({ ...newCoupon, discountValue: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Minimum Cart Value (₹)
                  </label>
                  <input
                    type="number"
                    value={newCoupon.minOrderValue}
                    onChange={(e) => setNewCoupon({ ...newCoupon, minOrderValue: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Max Discount Cap (₹)
                  </label>
                  <input
                    type="number"
                    value={newCoupon.maxDiscountCap || ""}
                    onChange={(e) => setNewCoupon({ ...newCoupon, maxDiscountCap: Number(e.target.value) })}
                    placeholder="Optional limit"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    value={newCoupon.expiryDate}
                    onChange={(e) => setNewCoupon({ ...newCoupon, expiryDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Total Uses Limit
                  </label>
                  <input
                    type="number"
                    value={newCoupon.maxUsageLimit}
                    onChange={(e) => setNewCoupon({ ...newCoupon, maxUsageLimit: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Campaign Description
                </label>
                <input
                  type="text"
                  value={newCoupon.notes}
                  onChange={(e) => setNewCoupon({ ...newCoupon, notes: e.target.value })}
                  placeholder="e.g. Holi Special Flat 20% discount"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 rounded-xl border border-stone-300 text-stone-700 text-sm font-semibold hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-900 hover:bg-amber-950 text-white text-sm font-semibold shadow-sm"
                >
                  Save &amp; Activate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Coupons List */}
      <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-stone-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search coupon code or campaign notes..."
              className="w-full pl-9 pr-4 py-1.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-amber-700"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-stone-700">
            <thead className="bg-stone-50 border-b border-stone-200/80 text-xs font-semibold uppercase text-stone-500 tracking-wider">
              <tr>
                <th className="py-3 px-4">Coupon Code</th>
                <th className="py-3 px-4">Discount</th>
                <th className="py-3 px-4">Min. Cart Value</th>
                <th className="py-3 px-4">Usage / Limit</th>
                <th className="py-3 px-4">Expiry</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredCoupons.map((coupon) => (
                <tr key={coupon.id} className="hover:bg-amber-50/20 transition">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-stone-900 bg-stone-100 px-2.5 py-1 rounded-md border border-stone-200 text-xs">
                        {coupon.code}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(coupon.code)}
                        className="text-stone-400 hover:text-stone-700 text-xs"
                        title="Copy Code"
                      >
                        {copiedCode === coupon.code ? (
                          <span className="text-[10px] text-emerald-600 font-bold">Copied!</span>
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                    {coupon.notes && (
                      <p className="text-[11px] text-stone-500 mt-1 max-w-xs truncate">
                        {coupon.notes}
                      </p>
                    )}
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-bold text-amber-800 text-sm">
                      {coupon.discountType === "percentage"
                        ? `${coupon.discountValue}% OFF`
                        : `₹${coupon.discountValue} FLAT OFF`}
                    </div>
                    {coupon.maxDiscountCap && (
                      <div className="text-[10px] text-stone-500">
                        Up to ₹{coupon.maxDiscountCap}
                      </div>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-xs font-medium text-stone-800">
                    ₹{coupon.minOrderValue}
                  </td>

                  <td className="py-3.5 px-4 text-xs text-stone-600">
                    <span className="font-bold text-stone-900">{coupon.usageCount}</span> /{" "}
                    {coupon.maxUsageLimit}
                  </td>

                  <td className="py-3.5 px-4 text-xs text-stone-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-stone-400" />
                      {coupon.expiryDate}
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <button
                      type="button"
                      onClick={() => toggleCouponStatus(coupon.id)}
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold transition ${
                        coupon.active
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          : "bg-stone-200 text-stone-600"
                      }`}
                    >
                      {coupon.active ? "Active" : "Paused"}
                    </button>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => deleteCoupon(coupon.id)}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition"
                      title="Delete Coupon"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Newsletter Subscribers Section */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-amber-700" />
            <h2 className="text-base font-bold text-stone-900">
              Newsletter &amp; Marketing Subscribers ({subscribers.length})
            </h2>
          </div>
          <button
            onClick={exportSubscribersCSV}
            className="px-3 py-1.5 rounded-lg border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Download className="w-3.5 h-3.5" /> Export Subscribers (.CSV)
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {subscribers.map((sub, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl border border-stone-200 bg-stone-50/50 flex items-center justify-between text-xs"
            >
              <div>
                <p className="font-semibold text-stone-900">{sub.email}</p>
                <p className="text-[10px] text-stone-400 mt-0.5">
                  {sub.source} • {sub.date}
                </p>
              </div>
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
