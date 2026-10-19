"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  IndianRupee,
  Users,
  Package,
  MessageSquare,
  AlertTriangle,
  ChevronDown,
  Calendar,
  Settings as SettingsIcon,
  Plus,
  Layers,
  Tag,
  SlidersHorizontal,
  PenTool,
  ArrowRight,
  MoreVertical,
  CheckCircle2,
  Clock,
  ExternalLink,
  Sparkles,
  Bot,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [dateRange, setDateRange] = useState("Oct 1, 2026 - Oct 15, 2026");
  const [salesRange, setSalesRange] = useState("Last 30 Days");
  const [orderStatusRange, setOrderStatusRange] = useState("This Month");

  // Chart data for Sales Overview
  const chartData = [
    { date: "16 Sep", rev: 18, orders: 15 },
    { date: "19 Sep", rev: 25, orders: 20 },
    { date: "22 Sep", rev: 32, orders: 28 },
    { date: "25 Sep", rev: 28, orders: 22 },
    { date: "28 Sep", rev: 35, orders: 30 },
    { date: "01 Oct", rev: 42, orders: 36 },
    { date: "04 Oct", rev: 38, orders: 32 },
    { date: "07 Oct", rev: 45, orders: 39 },
    { date: "10 Oct", rev: 40, orders: 35 },
    { date: "13 Oct", rev: 48, orders: 42 },
    { date: "15 Oct", rev: 52, orders: 46 },
  ];

  // Recent Orders Data matching screenshot
  const recentOrders = [
    {
      id: "#1248",
      customer: "Priya Sharma",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
      items: "2 items",
      amount: "₹998",
      payment: "Paid",
      status: "Delivered",
      date: "15 Oct 2026",
    },
    {
      id: "#1247",
      customer: "Rahul Mehta",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
      items: "1 item",
      amount: "₹499",
      payment: "Paid",
      status: "Shipped",
      date: "15 Oct 2026",
    },
    {
      id: "#1246",
      customer: "Neha Verma",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
      items: "3 items",
      amount: "₹1,299",
      payment: "Pending",
      status: "Processing",
      date: "14 Oct 2026",
    },
    {
      id: "#1245",
      customer: "Ankit Gupta",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
      items: "1 item",
      amount: "₹699",
      payment: "Paid",
      status: "Delivered",
      date: "14 Oct 2026",
    },
    {
      id: "#1244",
      customer: "Sneha Singh",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
      items: "2 items",
      amount: "₹1,198",
      payment: "Paid",
      status: "Shipped",
      date: "13 Oct 2026",
    },
  ];

  // Top Selling Products matching screenshot
  const topProducts = [
    {
      rank: 1,
      name: "Personalized Photo Mug",
      sold: "124 sold",
      amount: "₹49,276",
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=100&q=80",
    },
    {
      rank: 2,
      name: "Custom T-Shirt",
      sold: "96 sold",
      amount: "₹38,304",
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=100&q=80",
    },
    {
      rank: 3,
      name: "Personalized Cushion",
      sold: "72 sold",
      amount: "₹28,728",
      image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=100&q=80",
    },
    {
      rank: 4,
      name: "Keychain (Couple)",
      sold: "68 sold",
      amount: "₹20,332",
      image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&w=100&q=80",
    },
    {
      rank: 5,
      name: "Photo Frame",
      sold: "54 sold",
      amount: "₹18,846",
      image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=100&q=80",
    },
  ];

  // Custom Printing Requests matching screenshot
  const customRequests = [
    {
      name: "Rohan Agarwal",
      desc: "Custom T-shirt (10 qty)",
      badge: "New",
      badgeColor: "bg-purple-100 text-purple-700",
      time: "2 mins ago",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80",
    },
    {
      name: "Kavya Singh",
      desc: "Photo Cushion",
      badge: "In Discussion",
      badgeColor: "bg-amber-100 text-amber-700",
      time: "18 mins ago",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
    },
    {
      name: "Amit Malik",
      desc: "Corporate Mugs (50 qty)",
      badge: "Quote Sent",
      badgeColor: "bg-blue-100 text-blue-700",
      time: "1 hour ago",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&q=80",
    },
    {
      name: "Neha Tiwari",
      desc: "Couple T-shirts",
      badge: "Preview Pending",
      badgeColor: "bg-orange-100 text-orange-700",
      time: "3 hours ago",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80",
    },
    {
      name: "Deepak Sharma",
      desc: "Personalized Bottle",
      badge: "Awaiting Approval",
      badgeColor: "bg-rose-100 text-rose-700",
      time: "5 hours ago",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80",
    },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Header with Title & Date Range Picker */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 tracking-tight">Dashboard</h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Here&apos;s what&apos;s happening with your Rooh Vastr store today.
          </p>
        </div>

        {/* Date range picker pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-xs font-medium text-stone-700 shadow-2xs cursor-pointer hover:bg-stone-50">
          <Calendar className="w-3.5 h-3.5 text-stone-400" />
          <span>{dateRange}</span>
          <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
        </div>
      </div>

      {/* 2. Six Metric Cards Row matching attached image */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* Card 1: Total Orders */}
        <div className="bg-[#FDF2F4] p-4 rounded-xl border border-rose-100/80 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-rose-200/50 flex items-center justify-center text-rose-700">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <span className="text-[10px] text-stone-500 font-medium">Total Orders</span>
          </div>
          <div className="mt-3">
            <div className="text-xl font-bold text-stone-900 tracking-tight">248</div>
            <div className="text-[10px] font-semibold text-emerald-600 mt-0.5 flex items-center gap-0.5">
              <span>↑ +12%</span>
              <span className="text-stone-400 font-normal">from last month</span>
            </div>
          </div>
        </div>

        {/* Card 2: Total Revenue */}
        <div className="bg-[#F0FDF4] p-4 rounded-xl border border-emerald-100/80 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-emerald-200/50 flex items-center justify-center text-emerald-700">
              <IndianRupee className="w-4 h-4" />
            </div>
            <span className="text-[10px] text-stone-500 font-medium">Total Revenue</span>
          </div>
          <div className="mt-3">
            <div className="text-xl font-bold text-stone-900 tracking-tight">₹1,24,580</div>
            <div className="text-[10px] font-semibold text-emerald-600 mt-0.5 flex items-center gap-0.5">
              <span>↑ +18%</span>
              <span className="text-stone-400 font-normal">from last month</span>
            </div>
          </div>
        </div>

        {/* Card 3: New Customers */}
        <div className="bg-[#F0F7FF] p-4 rounded-xl border border-blue-100/80 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-blue-200/50 flex items-center justify-center text-blue-700">
              <Users className="w-4 h-4" />
            </div>
            <span className="text-[10px] text-stone-500 font-medium">New Customers</span>
          </div>
          <div className="mt-3">
            <div className="text-xl font-bold text-stone-900 tracking-tight">86</div>
            <div className="text-[10px] font-semibold text-emerald-600 mt-0.5 flex items-center gap-0.5">
              <span>↑ +24%</span>
              <span className="text-stone-400 font-normal">from last month</span>
            </div>
          </div>
        </div>

        {/* Card 4: Pending Orders */}
        <div className="bg-[#FFFBEB] p-4 rounded-xl border border-amber-100/80 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-amber-200/50 flex items-center justify-center text-amber-700">
              <Package className="w-4 h-4" />
            </div>
            <span className="text-[10px] text-stone-500 font-medium">Pending Orders</span>
          </div>
          <div className="mt-3">
            <div className="text-xl font-bold text-stone-900 tracking-tight">18</div>
            <div className="text-[10px] font-semibold text-rose-600 mt-0.5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
              <span>Action required</span>
            </div>
          </div>
        </div>

        {/* Card 5: Custom Requests */}
        <div className="bg-[#FAF5FF] p-4 rounded-xl border border-purple-100/80 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-purple-200/50 flex items-center justify-center text-purple-700">
              <MessageSquare className="w-4 h-4" />
            </div>
            <span className="text-[10px] text-stone-500 font-medium">Custom Requests</span>
          </div>
          <div className="mt-3">
            <div className="text-xl font-bold text-stone-900 tracking-tight">32</div>
            <div className="text-[10px] font-semibold text-emerald-600 mt-0.5 flex items-center gap-0.5">
              <span>↑ +6</span>
              <span className="text-stone-400 font-normal">new today</span>
            </div>
          </div>
        </div>

        {/* Card 6: Low Stock */}
        <div className="bg-[#FEF2F2] p-4 rounded-xl border border-red-100/80 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-red-200/50 flex items-center justify-center text-red-700">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <span className="text-[10px] text-stone-500 font-medium">Low Stock</span>
          </div>
          <div className="mt-3">
            <div className="text-xl font-bold text-stone-900 tracking-tight">7</div>
            <div className="text-[10px] font-semibold text-rose-600 mt-0.5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
              <span>Need attention</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Middle Row: Sales Overview, Order Status Donut, Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Sales Overview (6 cols) */}
        <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-bold text-stone-900">Sales Overview</h2>
              </div>
              <div className="flex items-center gap-4">
                {/* Legend */}
                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1.5 text-stone-600">
                    <span className="w-2.5 h-2.5 rounded bg-[#65152D]"></span> Revenue (₹)
                  </span>
                  <span className="flex items-center gap-1.5 text-stone-600">
                    <span className="w-2 h-2 rounded-full bg-rose-400"></span> Orders
                  </span>
                </div>
                {/* Dropdown */}
                <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-stone-50 border border-stone-200 rounded-md text-xs font-medium text-stone-600 cursor-pointer">
                  <span>{salesRange}</span>
                  <ChevronDown className="w-3 h-3 text-stone-400" />
                </div>
              </div>
            </div>

            {/* Custom Bar & Line Chart SVG */}
            <div className="h-56 w-full pt-4 relative">
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                <div className="border-b border-stone-100 flex items-center justify-between text-[10px] text-stone-400 font-mono">
                  <span>50K</span>
                </div>
                <div className="border-b border-stone-100 flex items-center justify-between text-[10px] text-stone-400 font-mono">
                  <span>40K</span>
                </div>
                <div className="border-b border-stone-100 flex items-center justify-between text-[10px] text-stone-400 font-mono">
                  <span>30K</span>
                </div>
                <div className="border-b border-stone-100 flex items-center justify-between text-[10px] text-stone-400 font-mono">
                  <span>20K</span>
                </div>
                <div className="border-b border-stone-100 flex items-center justify-between text-[10px] text-stone-400 font-mono">
                  <span>10K</span>
                </div>
                <div className="border-b border-stone-200 flex items-center justify-between text-[10px] text-stone-400 font-mono">
                  <span>0</span>
                </div>
              </div>

              {/* Bar and Line Render */}
              <div className="relative h-full flex items-end justify-between px-6 z-10 pt-2 pb-5">
                {chartData.map((d, i) => (
                  <div key={d.date} className="flex flex-col items-center gap-2 group cursor-pointer">
                    <div className="relative flex items-end justify-center w-5 h-44">
                      {/* Bar (Revenue) */}
                      <div
                        style={{ height: `${(d.rev / 55) * 100}%` }}
                        className="w-3 rounded-t bg-[#65152D] group-hover:bg-[#8C2346] transition-all"
                      />
                      {/* Line Dot (Orders) */}
                      <div
                        style={{ bottom: `${(d.orders / 55) * 100}%` }}
                        className="absolute w-2 h-2 rounded-full bg-rose-400 border-2 border-white shadow-xs"
                      />
                    </div>
                    <span className="text-[10px] text-stone-400 group-hover:text-stone-700 font-medium">
                      {d.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Order Status Donut (3 cols) */}
        <div className="lg:col-span-3 bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-bold text-stone-900">Order Status</h2>
              <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-stone-50 border border-stone-200 rounded-md text-xs font-medium text-stone-600 cursor-pointer">
                <span>{orderStatusRange}</span>
                <ChevronDown className="w-3 h-3 text-stone-400" />
              </div>
            </div>

            {/* Circular Donut Visual */}
            <div className="flex flex-col items-center justify-center my-4">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  {/* Delivered: 57% -> 283 circumference approx */}
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#22C55E" strokeWidth="12" strokeDasharray="136 240" strokeDashoffset="0" />
                  {/* Processing: 19% */}
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#65152D" strokeWidth="12" strokeDasharray="45 240" strokeDashoffset="-136" />
                  {/* Shipped: 13% */}
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#F472B6" strokeWidth="12" strokeDasharray="31 240" strokeDashoffset="-181" />
                  {/* Pending: 7% */}
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#F59E0B" strokeWidth="12" strokeDasharray="17 240" strokeDashoffset="-212" />
                  {/* Cancelled: 3% */}
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#94A3B8" strokeWidth="12" strokeDasharray="8 240" strokeDashoffset="-229" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold text-stone-900">248</span>
                  <span className="text-[10px] text-stone-400 font-medium">Orders</span>
                </div>
              </div>
            </div>

            {/* Legend Breakdown */}
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-stone-600">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]"></span> Delivered
                </span>
                <span className="font-semibold text-stone-900">142 (57%)</span>
              </div>
              <div className="flex items-center justify-between text-stone-600">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#65152D]"></span> Processing
                </span>
                <span className="font-semibold text-stone-900">48 (19%)</span>
              </div>
              <div className="flex items-center justify-between text-stone-600">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F472B6]"></span> Shipped
                </span>
                <span className="font-semibold text-stone-900">32 (13%)</span>
              </div>
              <div className="flex items-center justify-between text-stone-600">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></span> Pending
                </span>
                <span className="font-semibold text-stone-900">18 (7%)</span>
              </div>
              <div className="flex items-center justify-between text-stone-600">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#94A3B8]"></span> Cancelled
                </span>
                <span className="font-semibold text-stone-900">8 (3%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions (3 cols) */}
        <div className="lg:col-span-3 bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-stone-900">Quick Actions</h2>
              <SettingsIcon className="w-4 h-4 text-stone-400 cursor-pointer hover:text-stone-700" />
            </div>

            <div className="space-y-1.5">
              <Link
                href="/admin/products"
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl border border-stone-100 hover:border-stone-300 hover:bg-stone-50/70 transition-all text-xs font-medium text-stone-700 group"
              >
                <div className="flex items-center gap-2.5">
                  <Plus className="w-4 h-4 text-stone-500 group-hover:text-stone-900" />
                  <span>Add New Product</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="/admin/categories"
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl border border-stone-100 hover:border-stone-300 hover:bg-stone-50/70 transition-all text-xs font-medium text-stone-700 group"
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-stone-500 group-hover:text-stone-900" />
                  <span>Add Category</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="/admin/coupons"
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl border border-stone-100 hover:border-stone-300 hover:bg-stone-50/70 transition-all text-xs font-medium text-stone-700 group"
              >
                <div className="flex items-center gap-2.5">
                  <Tag className="w-4 h-4 text-stone-500 group-hover:text-stone-900" />
                  <span>Create Coupon</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="/admin/banners"
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl border border-stone-100 hover:border-stone-300 hover:bg-stone-50/70 transition-all text-xs font-medium text-stone-700 group"
              >
                <div className="flex items-center gap-2.5">
                  <SlidersHorizontal className="w-4 h-4 text-stone-500 group-hover:text-stone-900" />
                  <span>Upload Banner</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="/admin/ai-blog"
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl border border-stone-100 hover:border-stone-300 hover:bg-stone-50/70 transition-all text-xs font-medium text-stone-700 group"
              >
                <div className="flex items-center gap-2.5">
                  <PenTool className="w-4 h-4 text-stone-500 group-hover:text-stone-900" />
                  <span>Write a Blog Post</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="/admin/leads"
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl border border-stone-100 hover:border-purple-300 hover:bg-purple-50/50 transition-all text-xs font-medium text-stone-700 group"
              >
                <div className="flex items-center gap-2.5">
                  <Bot className="w-4 h-4 text-purple-600 group-hover:text-purple-800" />
                  <span className="font-semibold text-stone-900">AI Chat Leads & Inquiries</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-blue-100 text-blue-700">Live</span>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>

              <Link
                href="/admin/orders"
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl border border-stone-100 hover:border-stone-300 hover:bg-stone-50/70 transition-all text-xs font-medium text-stone-700 group"
              >
                <div className="flex items-center gap-2.5">
                  <Package className="w-4 h-4 text-stone-500 group-hover:text-stone-900" />
                  <span>View All Orders</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Row 3: Recent Orders, Top Selling Products, Custom Printing Requests */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Recent Orders (6 cols) */}
        <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-stone-900">Recent Orders</h2>
            <Link
              href="/admin/orders"
              className="text-xs font-semibold text-[#65152D] hover:underline flex items-center gap-1"
            >
              <span>View All Orders</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-stone-100 text-[10px] uppercase font-semibold text-stone-400 tracking-wider">
                  <th className="pb-2 font-medium">#</th>
                  <th className="pb-2 font-medium">Customer</th>
                  <th className="pb-2 font-medium">Items</th>
                  <th className="pb-2 font-medium">Amount</th>
                  <th className="pb-2 font-medium">Payment</th>
                  <th className="pb-2 font-medium">Status</th>
                  <th className="pb-2 font-medium">Date</th>
                  <th className="pb-2 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {recentOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-2.5 font-bold text-[#65152D]">{o.id}</td>
                    <td className="py-2.5">
                      <div className="flex items-center gap-2">
                        <img
                          src={o.avatar}
                          alt={o.customer}
                          className="w-6 h-6 rounded-full object-cover border border-stone-200"
                        />
                        <span className="font-medium text-stone-900">{o.customer}</span>
                      </div>
                    </td>
                    <td className="py-2.5 text-stone-500">{o.items}</td>
                    <td className="py-2.5 font-bold text-stone-900">{o.amount}</td>
                    <td className="py-2.5">
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                          o.payment === "Paid"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {o.payment}
                      </span>
                    </td>
                    <td className="py-2.5">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          o.status === "Delivered"
                            ? "bg-emerald-100 text-emerald-800"
                            : o.status === "Shipped"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td className="py-2.5 text-stone-400 text-[11px]">{o.date}</td>
                    <td className="py-2.5 text-right">
                      <button className="text-stone-400 hover:text-stone-700 p-1">
                        <MoreVertical className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Selling Products (3 cols) */}
        <div className="lg:col-span-3 bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-stone-900">Top Selling Products</h2>
            <Link
              href="/admin/products"
              className="text-xs font-semibold text-[#65152D] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {topProducts.map((p) => (
              <div key={p.rank} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-[11px] font-bold text-stone-400 w-3">{p.rank}</span>
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-9 h-9 rounded-lg object-cover border border-stone-200 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="font-medium text-stone-900 truncate">{p.name}</div>
                    <div className="text-[10px] text-stone-400">{p.sold}</div>
                  </div>
                </div>
                <span className="font-bold text-stone-900 shrink-0 ml-2">{p.amount}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Printing Requests (3 cols) */}
        <div className="lg:col-span-3 bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-stone-900">Custom Printing Requests</h2>
            <Link
              href="/admin/custom-orders"
              className="text-xs font-semibold text-[#65152D] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {customRequests.map((c, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <img
                    src={c.avatar}
                    alt={c.name}
                    className="w-8 h-8 rounded-full object-cover border border-stone-200 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="font-semibold text-stone-900 truncate">{c.name}</div>
                    <div className="text-[10px] text-stone-500 truncate">{c.desc}</div>
                  </div>
                </div>
                <div className="text-right shrink-0 ml-2">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${c.badgeColor}`}>
                    {c.badge}
                  </span>
                  <div className="text-[9px] text-stone-400 mt-0.5">{c.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Bottom 3 Promotional & Support Cards */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Festive Season Card (5 cols) */}
        <div className="md:col-span-5 bg-gradient-to-r from-[#4A0F1F] via-[#5F1428] to-[#6D1835] text-white p-5 rounded-2xl flex items-center justify-between relative overflow-hidden shadow-xs">
          <div className="z-10 max-w-xs">
            <h3 className="font-serif text-lg font-bold">Festive Season is Here!</h3>
            <p className="text-xs text-rose-200/90 mt-1">
              Update your banners and offers for Diwali, Christmas &amp; New Year.
            </p>
            <Link
              href="/admin/banners"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 mt-3 rounded-lg bg-white text-[#541223] text-xs font-bold hover:bg-rose-50 transition-colors shadow-xs"
            >
              <span>Manage Banners</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          {/* Festive Gift Ribbon Visual Element */}
          <div className="hidden sm:block text-5xl">🎁</div>
        </div>

        {/* AI Blog Writer (4 cols) */}
        <div className="md:col-span-4 bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-purple-100 text-purple-700 flex items-center justify-center">
                <PenTool className="w-3.5 h-3.5" />
              </span>
              <h4 className="text-xs font-bold text-stone-900">AI Blog Writer</h4>
            </div>
            <p className="text-xs text-stone-500 mt-1.5">
              Generate SEO blogs automatically (Up to 4 drafts per day)
            </p>
          </div>
          <div className="mt-4">
            <Link
              href="/admin/ai-blog"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#541223] hover:bg-[#6D1835] text-white rounded-lg text-xs font-bold transition-colors shadow-2xs"
            >
              <span>Generate New Draft</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Need Support? Card (3 cols) */}
        <div className="md:col-span-3 bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <MessageSquare className="w-3.5 h-3.5" />
              </span>
              <h4 className="text-xs font-bold text-stone-900">Need Support?</h4>
            </div>
            <p className="text-xs text-stone-500 mt-1.5">
              Get help on WhatsApp or check documentation.
            </p>
          </div>
          <div className="mt-4">
            <Link
              href="/admin/whatsapp"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#541223] hover:bg-[#6D1835] text-white rounded-lg text-xs font-bold transition-colors shadow-2xs w-full justify-center"
            >
              <span>Chat on WhatsApp</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
