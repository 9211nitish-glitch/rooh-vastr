"use client";

import React, { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  IndianRupee,
  ShoppingBag,
  CreditCard,
  Users,
  Download,
  Calendar,
  ArrowUpRight,
  ShieldCheck,
  Package,
} from "lucide-react";

const MONTHLY_DATA = [
  { month: "May", revenue: 84500, orders: 86 },
  { month: "Jun", revenue: 112000, orders: 118 },
  { month: "Jul", revenue: 145000, orders: 154 },
  { month: "Aug", revenue: 198000, orders: 204 },
  { month: "Sep", revenue: 265000, orders: 275 },
  { month: "Oct (MTD)", revenue: 348250, orders: 362 },
];

const BEST_SELLERS = [
  { name: "Heavyweight Oversized Anime Tee", category: "T-Shirts", units: 142, revenue: 141858, growth: "+28%" },
  { name: "Color-Changing Magic Heat Mug", category: "Mugs", units: 98, revenue: 34202, growth: "+42%" },
  { name: "Personalized Couple Photo Cushion", category: "Cushions", units: 64, revenue: 38336, growth: "+15%" },
  { name: "Floating Glass Memory Frame", category: "Frames", units: 51, revenue: 40749, growth: "+19%" },
  { name: "Custom Corporate Sipper Bottle", category: "Corporate", units: 45, revenue: 31455, growth: "+65%" },
];

export default function AnalyticsAdminPage() {
  const [timeRange, setTimeRange] = useState<"30D" | "90D" | "1Y">("30D");

  const totalRevenue = MONTHLY_DATA.reduce((acc, m) => acc + m.revenue, 0);
  const totalOrders = MONTHLY_DATA.reduce((acc, m) => acc + m.orders, 0);
  const maxRevenue = Math.max(...MONTHLY_DATA.map((m) => m.revenue));

  const exportReport = () => {
    const headers = ["Month,Revenue,Orders"];
    const rows = MONTHLY_DATA.map((m) => `"${m.month}",${m.revenue},${m.orders}`);
    const blob = new Blob([[...headers, ...rows].join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `RoohVastr_Financial_Report_${timeRange}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700">
            <BarChart3 className="w-4 h-4" />
            Executive Business Intelligence
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif font-bold text-stone-900 mt-1">
            Sales Reports &amp; Financial Analytics
          </h1>
          <p className="text-sm text-stone-600">
            Real-time tracking of revenue velocity, customer acquisition funnel, product margins, and payment method share.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="bg-white rounded-xl border border-stone-200 p-1 flex items-center shadow-xs">
            {(["30D", "90D", "1Y"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                  timeRange === r
                    ? "bg-amber-900 text-white shadow-xs"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                {r === "30D" ? "Last 30 Days" : r === "90D" ? "Past Quarter" : "Past Year"}
              </button>
            ))}
          </div>

          <button
            onClick={exportReport}
            className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold transition shadow-sm"
          >
            <Download className="w-3.5 h-3.5" /> Export Report (.CSV)
          </button>
        </div>
      </div>

      {/* Metric Highline Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-sm">
          <span className="text-xs font-medium text-stone-500">Gross Sales Revenue</span>
          <p className="text-2xl font-bold font-serif text-stone-900 mt-1">
            ₹{totalRevenue.toLocaleString("en-IN")}
          </p>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold mt-1">
            <TrendingUp className="w-3.5 h-3.5" /> +32.4% vs last period
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-sm">
          <span className="text-xs font-medium text-stone-500">Total Units Dispatched</span>
          <p className="text-2xl font-bold font-serif text-stone-900 mt-1">
            {totalOrders.toLocaleString("en-IN")}
          </p>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold mt-1">
            <TrendingUp className="w-3.5 h-3.5" /> +24.8% volume growth
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-sm">
          <span className="text-xs font-medium text-stone-500">Average Order Value (AOV)</span>
          <p className="text-2xl font-bold font-serif text-amber-800 mt-1">
            ₹{Math.round(totalRevenue / (totalOrders || 1))}
          </p>
          <p className="text-[11px] text-stone-500 mt-1">Above apparel benchmark</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-sm">
          <span className="text-xs font-medium text-stone-500">Store Conversion Rate</span>
          <p className="text-2xl font-bold font-serif text-emerald-700 mt-1">3.85%</p>
          <p className="text-[11px] text-stone-500 mt-1">Top tier e-commerce metric</p>
        </div>
      </div>

      {/* Revenue Velocity Bar Chart */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-stone-900">
              Monthly Revenue &amp; Dispatch Growth
            </h2>
            <p className="text-xs text-stone-500">Gross revenue trend over active months in INR.</p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            Consistently Accelerating
          </span>
        </div>

        <div className="pt-4 pb-2">
          <div className="h-48 flex items-end gap-4 sm:gap-8 justify-between">
            {MONTHLY_DATA.map((item) => {
              const heightPct = Math.round((item.revenue / maxRevenue) * 100);
              return (
                <div key={item.month} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] font-bold text-stone-500 opacity-0 group-hover:opacity-100 transition">
                    ₹{(item.revenue / 1000).toFixed(0)}k
                  </span>
                  <div className="w-full bg-stone-100 rounded-t-xl h-full flex items-end overflow-hidden p-1">
                    <div
                      style={{ height: `${heightPct}%` }}
                      className="w-full bg-gradient-to-t from-amber-950 via-amber-800 to-rose-900 rounded-t-lg group-hover:brightness-110 transition duration-300"
                    />
                  </div>
                  <span className="text-xs font-semibold text-stone-700 text-center">
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2-Col Grid: Payment Share & Conversion Funnel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Payment Methods */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-stone-900 border-b border-stone-100 pb-2 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-amber-700" />
            Payment Gateway Share (Razorpay &amp; COD)
          </h3>

          <div className="space-y-3 pt-1">
            <div>
              <div className="flex justify-between text-xs font-semibold text-stone-800 mb-1">
                <span>Instant UPI (GPay, PhonePe, Paytm)</span>
                <span className="text-emerald-700">68%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                <div className="w-[68%] h-full bg-emerald-600 rounded-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-stone-800 mb-1">
                <span>Debit / Credit Cards &amp; NetBanking</span>
                <span className="text-amber-800">18%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                <div className="w-[18%] h-full bg-amber-700 rounded-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-stone-800 mb-1">
                <span>Cash on Delivery (COD)</span>
                <span className="text-stone-600">14%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                <div className="w-[14%] h-full bg-stone-400 rounded-full" />
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/80 text-[11px] text-emerald-800 leading-relaxed">
            <strong>Prepaid Ratio: 86%</strong> — High UPI prepaid adoption reduces COD RTO return rates to under 4.2%.
          </div>
        </div>

        {/* E-Commerce Funnel */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-stone-900 border-b border-stone-100 pb-2 flex items-center gap-2">
            <Users className="w-4 h-4 text-amber-700" />
            Storefront Conversion Funnel
          </h3>

          <div className="space-y-3 pt-1 text-xs">
            <div className="flex items-center justify-between p-2 rounded-lg bg-stone-50">
              <span className="text-stone-600">1. Unique Site Visitors</span>
              <span className="font-bold font-serif text-stone-900">18,420</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-stone-50">
              <span className="text-stone-600">2. Added Product to Cart</span>
              <span className="font-bold font-serif text-stone-900">2,140 (11.6%)</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-stone-50">
              <span className="text-stone-600">3. Reached Checkout Stage</span>
              <span className="font-bold font-serif text-stone-900">1,020 (5.5%)</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50 border border-emerald-200">
              <span className="font-semibold text-emerald-900">4. Successful Orders Placed</span>
              <span className="font-bold font-serif text-emerald-900">710 (3.85%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Best Sellers Table */}
      <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-stone-100">
          <h2 className="text-base font-bold text-stone-900">Top Performing Products</h2>
          <p className="text-xs text-stone-500">Highest grossing items by units sold and revenue contribution.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-stone-700">
            <thead className="bg-stone-50 border-b border-stone-200/80 text-xs font-semibold uppercase text-stone-500 tracking-wider">
              <tr>
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Units Dispatched</th>
                <th className="py-3 px-4">Total Revenue</th>
                <th className="py-3 px-4">Growth Velocity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {BEST_SELLERS.map((item, idx) => (
                <tr key={idx} className="hover:bg-amber-50/20 transition">
                  <td className="py-3.5 px-4 font-semibold text-stone-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-stone-100 text-stone-600 text-xs flex items-center justify-center font-mono">
                      {idx + 1}
                    </span>
                    {item.name}
                  </td>
                  <td className="py-3.5 px-4 text-xs text-stone-500">{item.category}</td>
                  <td className="py-3.5 px-4 font-bold text-stone-800">{item.units} pcs</td>
                  <td className="py-3.5 px-4 font-serif font-bold text-stone-900">
                    ₹{item.revenue.toLocaleString("en-IN")}
                  </td>
                  <td className="py-3.5 px-4 text-xs font-bold text-emerald-600 flex items-center gap-0.5">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    {item.growth}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
