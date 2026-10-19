"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Megaphone,
  TrendingUp,
  Users,
  ShoppingCart,
  Ticket,
  Mail,
  MessageCircle,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Plus,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Edit2,
  Share2,
  Eye,
  SlidersHorizontal,
  BarChart2,
  Gift,
  CheckCircle2,
  Clock,
  AlertCircle,
  X,
} from "lucide-react";

// Mock Data for Campaign Performance Chart (1 Oct to 15 Oct)
const PERFORMANCE_DATA = [
  { day: "1 Oct", revenue: 4200, orders: 18, visitors: 320 },
  { day: "3 Oct", revenue: 7800, orders: 28, visitors: 490 },
  { day: "5 Oct", revenue: 6400, orders: 24, visitors: 420 },
  { day: "7 Oct", revenue: 11200, orders: 42, visitors: 680 },
  { day: "9 Oct", revenue: 16800, orders: 62, visitors: 940 },
  { day: "11 Oct", revenue: 9500, orders: 36, visitors: 580 },
  { day: "13 Oct", revenue: 18400, orders: 74, visitors: 1120 },
  { day: "15 Oct", revenue: 13900, orders: 55, visitors: 890 },
];

interface Campaign {
  id: string;
  name: string;
  type: "Banner" | "Coupon" | "Email" | "WhatsApp";
  startDate: string;
  endDate: string;
  reach: string;
  orders: number;
  revenue?: string;
  status: "Active" | "Scheduled" | "Expired";
}

const TOP_CAMPAIGNS = [
  {
    rank: 1,
    name: "Diwali Special Offer",
    type: "Banner",
    orders: 124,
    revenue: "₹42,890",
    status: "Active",
  },
  {
    rank: 2,
    name: "Custom T-Shirt Sale",
    type: "Coupon",
    orders: 98,
    revenue: "₹31,760",
    status: "Active",
  },
  {
    rank: 3,
    name: "Personalized Gifts",
    type: "Email",
    orders: 76,
    revenue: "₹25,430",
    status: "Active",
  },
  {
    rank: 4,
    name: "WhatsApp Offer",
    type: "WhatsApp",
    orders: 64,
    revenue: "₹18,990",
    status: "Active",
  },
  {
    rank: 5,
    name: "Festive Combo",
    type: "Banner",
    orders: 52,
    revenue: "₹12,560",
    status: "Scheduled",
  },
];

const INITIAL_RECENT_CAMPAIGNS: Campaign[] = [
  {
    id: "camp-1",
    name: "Diwali Special Offer",
    type: "Banner",
    startDate: "10 Oct 2026",
    endDate: "05 Nov 2026",
    reach: "12,340",
    orders: 124,
    status: "Active",
  },
  {
    id: "camp-2",
    name: "Valentine's Gift Ideas",
    type: "Banner",
    startDate: "01 Feb 2026",
    endDate: "15 Feb 2026",
    reach: "8,920",
    orders: 98,
    status: "Active",
  },
  {
    id: "camp-3",
    name: "Custom T-Shirt Sale",
    type: "Coupon",
    startDate: "15 Sep 2026",
    endDate: "30 Sep 2026",
    reach: "6,780",
    orders: 76,
    status: "Expired",
  },
  {
    id: "camp-4",
    name: "Birthday Gifts",
    type: "Email",
    startDate: "01 Oct 2026",
    endDate: "31 Oct 2026",
    reach: "5,430",
    orders: 64,
    status: "Active",
  },
  {
    id: "camp-5",
    name: "WhatsApp Offer",
    type: "WhatsApp",
    startDate: "20 Sep 2026",
    endDate: "30 Sep 2026",
    reach: "4,210",
    orders: 52,
    status: "Active",
  },
];

const BANNERS_DATA = [
  {
    id: "b1",
    title: "Diwali Special",
    subtitle: "Personalized Gifts",
    offer: "Flat 20% OFF",
    bgGradient: "from-amber-900 via-rose-950 to-stone-900",
    theme: "diwali",
  },
  {
    id: "b2",
    title: "Valentine's Day",
    subtitle: "Gifts from the Heart",
    offer: "Special Couple Sets",
    bgGradient: "from-rose-500 via-pink-600 to-rose-700",
    theme: "valentine",
  },
  {
    id: "b3",
    title: "Make Birthdays",
    subtitle: "Extra Special",
    offer: "Photo Mugs & Cushions",
    bgGradient: "from-amber-100 via-orange-100 to-amber-200",
    theme: "birthday",
  },
];

export default function MarketingAdminPage() {
  const [activeTab, setActiveTab] = useState<string>("Overview");
  const [chartRange, setChartRange] = useState<string>("Last 15 Days");
  const [activeBannerIndex, setActiveBannerIndex] = useState<number>(0);
  const [hoveredDataPoint, setHoveredDataPoint] = useState<number | null>(null);

  // New Campaign Form State
  const [campaignTitle, setCampaignTitle] = useState("");
  const [campaignType, setCampaignType] = useState<"Banner" | "Coupon" | "Email" | "WhatsApp">("Banner");
  const [startDate, setStartDate] = useState("2026-10-18");
  const [endDate, setEndDate] = useState("2026-11-05");
  const [campaignsList, setCampaignsList] = useState<Campaign[]>(INITIAL_RECENT_CAMPAIGNS);
  const [formSuccessMessage, setFormSuccessMessage] = useState<string | null>(null);

  // Quick Action Modal State
  const [activeModalAction, setActiveModalAction] = useState<string | null>(null);

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!campaignTitle.trim()) return;

    const newCamp: Campaign = {
      id: `camp-${Date.now()}`,
      name: campaignTitle.trim(),
      type: campaignType,
      startDate: new Date(startDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      endDate: new Date(endDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      reach: "0",
      orders: 0,
      status: "Active",
    };

    setCampaignsList((prev) => [newCamp, ...prev]);
    setCampaignTitle("");
    setFormSuccessMessage(`Campaign "${newCamp.name}" successfully created!`);
    setTimeout(() => setFormSuccessMessage(null), 4000);
  };

  const getTypeBadgeStyle = (type: string) => {
    switch (type) {
      case "Banner":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "Coupon":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Email":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "WhatsApp":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      default:
        return "bg-stone-50 text-stone-700 border-stone-200";
    }
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-emerald-100/70 text-emerald-800";
      case "Scheduled":
        return "bg-amber-100/70 text-amber-800";
      case "Expired":
        return "bg-rose-100/70 text-rose-800";
      default:
        return "bg-stone-100 text-stone-700";
    }
  };

  // SVG Area Chart points calculation
  const chartWidth = 560;
  const chartHeight = 170;
  const maxRevenue = 20000;
  const maxOrders = 100;

  const revenuePoints = PERFORMANCE_DATA.map((d, i) => {
    const x = (i / (PERFORMANCE_DATA.length - 1)) * (chartWidth - 60) + 40;
    const y = chartHeight - (d.revenue / maxRevenue) * (chartHeight - 30) - 15;
    return `${x},${y}`;
  });

  const ordersPoints = PERFORMANCE_DATA.map((d, i) => {
    const x = (i / (PERFORMANCE_DATA.length - 1)) * (chartWidth - 60) + 40;
    const y = chartHeight - (d.orders / maxOrders) * (chartHeight - 40) - 15;
    return `${x},${y}`;
  });

  const visitorsPoints = PERFORMANCE_DATA.map((d, i) => {
    const x = (i / (PERFORMANCE_DATA.length - 1)) * (chartWidth - 60) + 40;
    const y = chartHeight - ((d.visitors / 1200) * (chartHeight - 60)) - 15;
    return `${x},${y}`;
  });

  const revenuePath = `M ${revenuePoints.join(" L ")}`;
  const revenueArea = `M ${revenuePoints[0]} L ${revenuePoints.join(" L ")} L ${chartWidth - 20},${chartHeight} L 40,${chartHeight} Z`;

  const ordersPath = `M ${ordersPoints.join(" L ")}`;
  const ordersArea = `M ${ordersPoints[0]} L ${ordersPoints.join(" L ")} L ${chartWidth - 20},${chartHeight} L 40,${chartHeight} Z`;

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Header with Title & Date Range Picker */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#242124] tracking-tight">
            Marketing
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Grow your Rooh Vastr brand with campaigns, offers, social media and more.
          </p>
        </div>

        {/* Date Filter Pill matching screenshot */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-[#EAE0D5] rounded-lg shadow-2xs text-xs font-semibold text-stone-700 hover:border-[#5B132B] transition-colors cursor-pointer self-start sm:self-auto">
          <Calendar className="w-4 h-4 text-[#5B132B]" />
          <span>Oct 1, 2026 - Oct 15, 2026</span>
          <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
        </div>
      </div>

      {/* 2. Top Metric Cards (6 cards in a grid) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Card 1: Total Campaigns */}
        <div className="bg-white rounded-2xl p-4 border border-[#EAE0D5] shadow-2xs flex flex-col justify-between hover:border-[#5B132B]/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-stone-500">Total Campaigns</span>
            <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <Megaphone className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2.5">
            <div className="text-xl sm:text-2xl font-bold text-[#242124]">12</div>
            <div className="text-[11px] font-medium text-emerald-600 flex items-center gap-1 mt-0.5">
              <span>↑ 3 active</span>
            </div>
          </div>
        </div>

        {/* Card 2: Campaign Reach */}
        <div className="bg-white rounded-2xl p-4 border border-[#EAE0D5] shadow-2xs flex flex-col justify-between hover:border-[#5B132B]/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-stone-500">Campaign Reach</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Users className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2.5">
            <div className="text-xl sm:text-2xl font-bold text-[#242124]">24,680</div>
            <div className="text-[11px] font-medium text-emerald-600 flex items-center gap-1 mt-0.5">
              <span>↑ 28% from last month</span>
            </div>
          </div>
        </div>

        {/* Card 3: Campaign Sales */}
        <div className="bg-white rounded-2xl p-4 border border-[#EAE0D5] shadow-2xs flex flex-col justify-between hover:border-[#5B132B]/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-stone-500">Campaign Sales</span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShoppingCart className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2.5">
            <div className="text-xl sm:text-2xl font-bold text-[#242124]">₹1,42,350</div>
            <div className="text-[11px] font-medium text-emerald-600 flex items-center gap-1 mt-0.5">
              <span>↑ 42% from last month</span>
            </div>
          </div>
        </div>

        {/* Card 4: Coupon Redemptions */}
        <div className="bg-white rounded-2xl p-4 border border-[#EAE0D5] shadow-2xs flex flex-col justify-between hover:border-[#5B132B]/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-stone-500">Coupon Redemptions</span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Ticket className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2.5">
            <div className="text-xl sm:text-2xl font-bold text-[#242124]">368</div>
            <div className="text-[11px] font-medium text-emerald-600 flex items-center gap-1 mt-0.5">
              <span>↑ 18% from last month</span>
            </div>
          </div>
        </div>

        {/* Card 5: Emails Sent */}
        <div className="bg-white rounded-2xl p-4 border border-[#EAE0D5] shadow-2xs flex flex-col justify-between hover:border-[#5B132B]/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-stone-500">Emails Sent</span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Mail className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2.5">
            <div className="text-xl sm:text-2xl font-bold text-[#242124]">8,420</div>
            <div className="text-[11px] font-medium text-emerald-600 flex items-center gap-1 mt-0.5">
              <span>↑ 35% open rate</span>
            </div>
          </div>
        </div>

        {/* Card 6: WhatsApp Clicks */}
        <div className="bg-white rounded-2xl p-4 border border-[#EAE0D5] shadow-2xs flex flex-col justify-between hover:border-[#5B132B]/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-stone-500">WhatsApp Clicks</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <MessageCircle className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2.5">
            <div className="text-xl sm:text-2xl font-bold text-[#242124]">1,126</div>
            <div className="text-[11px] font-medium text-emerald-600 flex items-center gap-1 mt-0.5">
              <span>↑ 52% from last month</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Horizontal Tab Bar matching screenshot */}
      <div className="border-b border-[#EAE0D5] overflow-x-auto custom-scrollbar">
        <nav className="flex space-x-6 min-w-max text-xs font-semibold">
          {[
            "Overview",
            "Coupons & Offers",
            "Banners & Sliders",
            "Popup / Exit Intent",
            "Email Campaigns",
            "WhatsApp Campaigns",
            "Social Media",
            "Campaign Calendar",
          ].map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`pb-3.5 relative transition-colors cursor-pointer ${
                  isActive
                    ? "text-[#5B132B] font-bold"
                    : "text-stone-500 hover:text-stone-800"
                }`}
              >
                <span>{tab}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5B132B] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* 4. Middle Grid: Campaign Performance Chart + Top Performing Campaigns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left (7 cols): Campaign Performance Area Chart */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-[#EAE0D5] shadow-2xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-serif text-sm font-bold text-[#242124]">
              Campaign Performance
            </h2>

            <div className="flex items-center gap-4 text-xs">
              {/* Legend matching mockup */}
              <div className="hidden sm:flex items-center gap-3 text-[11px] font-medium">
                <span className="flex items-center gap-1 text-stone-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#5B132B]" /> Revenue
                </span>
                <span className="flex items-center gap-1 text-stone-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C85270]" /> Orders
                </span>
                <span className="flex items-center gap-1 text-stone-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D1D5DB]" /> Visitors
                </span>
              </div>

              {/* Time Range Selector */}
              <select
                value={chartRange}
                onChange={(e) => setChartRange(e.target.value)}
                className="bg-white border border-[#EAE0D5] rounded-lg px-2.5 py-1 text-xs font-semibold text-stone-700 outline-none cursor-pointer hover:border-[#5B132B]"
              >
                <option value="Last 15 Days">Last 15 Days</option>
                <option value="Last 30 Days">Last 30 Days</option>
                <option value="This Month">This Month</option>
              </select>
            </div>
          </div>

          {/* Responsive SVG Chart with smooth gradients */}
          <div className="relative pt-2">
            <div className="w-full overflow-x-auto">
              <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight + 30}`}
                className="w-full h-48 sm:h-56 select-none"
              >
                <defs>
                  {/* Revenue Gradient */}
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5B132B" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#5B132B" stopOpacity="0.0" />
                  </linearGradient>

                  {/* Orders Gradient */}
                  <linearGradient id="ordersGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C85270" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#C85270" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Y-axis Horizontal Grid Lines */}
                {[0, 5000, 10000, 15000, 20000].map((val, idx) => {
                  const y = chartHeight - (val / maxRevenue) * (chartHeight - 30) - 15;
                  return (
                    <g key={val}>
                      <line
                        x1="35"
                        y1={y}
                        x2={chartWidth - 10}
                        y2={y}
                        stroke="#F3EDE6"
                        strokeDasharray={idx === 0 ? "none" : "3 3"}
                        strokeWidth="1"
                      />
                      <text
                        x="30"
                        y={y + 3}
                        fontSize="9"
                        fill="#A8A29E"
                        textAnchor="end"
                        fontFamily="sans-serif"
                      >
                        {val === 0 ? "0" : `${val / 1000}K`}
                      </text>
                    </g>
                  );
                })}

                {/* Gradient Area Fills */}
                <path d={revenueArea} fill="url(#revenueGrad)" />
                <path d={ordersArea} fill="url(#ordersGrad)" />

                {/* Smooth Curve Lines */}
                <path
                  d={revenuePath}
                  fill="none"
                  stroke="#5B132B"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <path
                  d={ordersPath}
                  fill="none"
                  stroke="#C85270"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <path
                  d={`M ${visitorsPoints.join(" L ")}`}
                  fill="none"
                  stroke="#D1D5DB"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />

                {/* Interactive Points on Revenue */}
                {PERFORMANCE_DATA.map((d, i) => {
                  const x = (i / (PERFORMANCE_DATA.length - 1)) * (chartWidth - 60) + 40;
                  const y = chartHeight - (d.revenue / maxRevenue) * (chartHeight - 30) - 15;
                  const isHovered = hoveredDataPoint === i;

                  return (
                    <g
                      key={d.day}
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredDataPoint(i)}
                      onMouseLeave={() => setHoveredDataPoint(null)}
                    >
                      <circle
                        cx={x}
                        cy={y}
                        r={isHovered ? 5.5 : 3.5}
                        fill="#FFFFFF"
                        stroke="#5B132B"
                        strokeWidth="2"
                        className="transition-all duration-200"
                      />

                      {/* X-axis label */}
                      <text
                        x={x}
                        y={chartHeight + 18}
                        fontSize="9.5"
                        fill="#78716C"
                        textAnchor="middle"
                        fontFamily="sans-serif"
                        fontWeight="500"
                      >
                        {d.day}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Hover Tooltip when cursor is over a point */}
            {hoveredDataPoint !== null && (
              <div className="absolute top-4 right-6 bg-[#242124] text-white p-2.5 rounded-xl shadow-lg text-xs space-y-1 animate-in fade-in duration-150">
                <div className="font-bold text-rose-300">
                  {PERFORMANCE_DATA[hoveredDataPoint].day}
                </div>
                <div className="flex justify-between gap-4 text-[11px]">
                  <span className="text-stone-300">Revenue:</span>
                  <span className="font-bold">
                    ₹{PERFORMANCE_DATA[hoveredDataPoint].revenue.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between gap-4 text-[11px]">
                  <span className="text-stone-300">Orders:</span>
                  <span className="font-bold">
                    {PERFORMANCE_DATA[hoveredDataPoint].orders}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right (5 cols): Top Performing Campaigns */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-[#EAE0D5] shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-sm font-bold text-[#242124]">
              Top Performing Campaigns
            </h2>
            <Link
              href="#recent-campaigns"
              className="text-xs font-semibold text-[#5B132B] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#EAE0D5] text-[11px] text-stone-500 font-semibold">
                  <th className="pb-2.5 w-6">#</th>
                  <th className="pb-2.5">Campaign</th>
                  <th className="pb-2.5">Type</th>
                  <th className="pb-2.5 text-right">Orders</th>
                  <th className="pb-2.5 text-right">Revenue</th>
                  <th className="pb-2.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5EDE6]">
                {TOP_CAMPAIGNS.map((camp) => (
                  <tr key={camp.rank} className="hover:bg-[#FAF7F2] transition-colors">
                    <td className="py-2.5 font-bold text-stone-400">{camp.rank}</td>
                    <td className="py-2.5 font-semibold text-stone-800 pr-2 max-w-[130px] truncate">
                      {camp.name}
                    </td>
                    <td className="py-2.5">
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border ${getTypeBadgeStyle(
                          camp.type
                        )}`}
                      >
                        {camp.type}
                      </span>
                    </td>
                    <td className="py-2.5 text-right font-medium text-stone-700">
                      {camp.orders}
                    </td>
                    <td className="py-2.5 text-right font-bold text-[#242124]">
                      {camp.revenue}
                    </td>
                    <td className="py-2.5 text-right">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${getStatusBadgeStyle(
                          camp.status
                        )}`}
                      >
                        {camp.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 5. Second Grid: Active Banners & Sliders + Quick Marketing Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left (6 cols): Active Banners & Sliders Carousel */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 border border-[#EAE0D5] shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-sm font-bold text-[#242124]">
              Active Banners & Sliders
            </h2>
            <div className="flex items-center gap-2">
              <Link
                href="/admin/banners"
                className="text-xs font-semibold text-[#5B132B] hover:underline mr-1"
              >
                View All →
              </Link>
              <button
                type="button"
                onClick={() =>
                  setActiveBannerIndex((prev) => (prev > 0 ? prev - 1 : BANNERS_DATA.length - 1))
                }
                className="w-6 h-6 rounded-full border border-[#EAE0D5] bg-white flex items-center justify-center text-stone-600 hover:bg-[#FAF4EE] cursor-pointer"
                aria-label="Previous Banner"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setActiveBannerIndex((prev) => (prev < BANNERS_DATA.length - 1 ? prev + 1 : 0))
                }
                className="w-6 h-6 rounded-full border border-[#EAE0D5] bg-white flex items-center justify-center text-stone-600 hover:bg-[#FAF4EE] cursor-pointer"
                aria-label="Next Banner"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 3 Banner Mini Cards matching screenshot preview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {BANNERS_DATA.map((banner, index) => {
              const isSelected = activeBannerIndex === index;
              return (
                <div
                  key={banner.id}
                  onClick={() => setActiveBannerIndex(index)}
                  className={`relative rounded-xl overflow-hidden p-3.5 flex flex-col justify-between h-32 shadow-xs cursor-pointer transition-all border ${
                    isSelected
                      ? "ring-2 ring-[#5B132B] border-transparent"
                      : "border-[#EAE0D5] hover:opacity-90"
                  } ${
                    banner.theme === "diwali"
                      ? "bg-gradient-to-br from-[#3b0b14] via-[#5B132B] to-[#1c0409] text-white"
                      : banner.theme === "valentine"
                      ? "bg-gradient-to-br from-rose-500 via-rose-600 to-pink-700 text-white"
                      : "bg-gradient-to-br from-[#FFF3E3] via-[#F8E7D1] to-[#E8D1B5] text-[#242124]"
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-bold tracking-wider uppercase opacity-80">
                      {banner.theme === "diwali" ? "Diwali Special" : banner.theme === "valentine" ? "Valentine's Day" : "Make"}
                    </span>
                    <h3 className="font-serif text-xs font-bold leading-tight">
                      {banner.subtitle}
                    </h3>
                    {banner.offer && (
                      <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-amber-400 text-stone-900">
                        {banner.offer}
                      </span>
                    )}
                  </div>

                  <div className="pt-2">
                    <Link
                      href="/admin/banners"
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold shadow-xs transition-colors ${
                        banner.theme === "birthday"
                          ? "bg-[#5B132B] text-white hover:bg-[#430b1e]"
                          : "bg-white text-stone-900 hover:bg-stone-100"
                      }`}
                    >
                      <Edit2 className="w-2.5 h-2.5" />
                      <span>Edit</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-1.5 pt-1">
            {BANNERS_DATA.map((_, idx) => (
              <span
                key={idx}
                className={`w-2 h-2 rounded-full transition-all ${
                  activeBannerIndex === idx ? "bg-[#5B132B] w-5" : "bg-stone-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right (6 cols): Quick Marketing Actions */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 border border-[#EAE0D5] shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-sm font-bold text-[#242124]">
              Quick Marketing Actions
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
            {/* Action 1 */}
            <button
              type="button"
              onClick={() => setActiveModalAction("create-campaign")}
              className="flex items-center gap-2 p-2.5 rounded-xl border border-[#EAE0D5] hover:border-[#5B132B] hover:bg-[#FAF4EE] transition-all text-left text-stone-800 font-semibold cursor-pointer group"
            >
              <Plus className="w-4 h-4 text-[#5B132B] shrink-0 group-hover:scale-110 transition-transform" />
              <span className="truncate">Create New Campaign</span>
            </button>

            {/* Action 2 */}
            <Link
              href="/admin/coupons"
              className="flex items-center gap-2 p-2.5 rounded-xl border border-[#EAE0D5] hover:border-[#5B132B] hover:bg-[#FAF4EE] transition-all text-left text-stone-800 font-semibold cursor-pointer group"
            >
              <Ticket className="w-4 h-4 text-[#5B132B] shrink-0 group-hover:scale-110 transition-transform" />
              <span className="truncate">Create Coupon Code</span>
            </Link>

            {/* Action 3 */}
            <Link
              href="/admin/banners"
              className="flex items-center gap-2 p-2.5 rounded-xl border border-[#EAE0D5] hover:border-[#5B132B] hover:bg-[#FAF4EE] transition-all text-left text-stone-800 font-semibold cursor-pointer group"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#5B132B] shrink-0 group-hover:scale-110 transition-transform" />
              <span className="truncate">Upload Banner / Slider</span>
            </Link>

            {/* Action 4 */}
            <button
              type="button"
              onClick={() => setActiveModalAction("send-email")}
              className="flex items-center gap-2 p-2.5 rounded-xl border border-[#EAE0D5] hover:border-[#5B132B] hover:bg-[#FAF4EE] transition-all text-left text-stone-800 font-semibold cursor-pointer group"
            >
              <Mail className="w-4 h-4 text-[#5B132B] shrink-0 group-hover:scale-110 transition-transform" />
              <span className="truncate">Send Email Campaign</span>
            </button>

            {/* Action 5 */}
            <Link
              href="/admin/whatsapp"
              className="flex items-center gap-2 p-2.5 rounded-xl border border-[#EAE0D5] hover:border-[#5B132B] hover:bg-[#FAF4EE] transition-all text-left text-stone-800 font-semibold cursor-pointer group"
            >
              <MessageCircle className="w-4 h-4 text-[#5B132B] shrink-0 group-hover:scale-110 transition-transform" />
              <span className="truncate">Send WhatsApp Campaign</span>
            </Link>

            {/* Action 6 */}
            <button
              type="button"
              onClick={() => setActiveModalAction("create-popup")}
              className="flex items-center gap-2 p-2.5 rounded-xl border border-[#EAE0D5] hover:border-[#5B132B] hover:bg-[#FAF4EE] transition-all text-left text-stone-800 font-semibold cursor-pointer group"
            >
              <ExternalLink className="w-4 h-4 text-[#5B132B] shrink-0 group-hover:scale-110 transition-transform" />
              <span className="truncate">Create Popup Offer</span>
            </button>

            {/* Action 7 */}
            <button
              type="button"
              onClick={() => setActiveModalAction("schedule-social")}
              className="flex items-center gap-2 p-2.5 rounded-xl border border-[#EAE0D5] hover:border-[#5B132B] hover:bg-[#FAF4EE] transition-all text-left text-stone-800 font-semibold cursor-pointer group"
            >
              <Share2 className="w-4 h-4 text-[#5B132B] shrink-0 group-hover:scale-110 transition-transform" />
              <span className="truncate">Schedule Social Media</span>
            </button>

            {/* Action 8 */}
            <button
              type="button"
              onClick={() => setActiveTab("Campaign Calendar")}
              className="flex items-center gap-2 p-2.5 rounded-xl border border-[#EAE0D5] hover:border-[#5B132B] hover:bg-[#FAF4EE] transition-all text-left text-stone-800 font-semibold cursor-pointer group"
            >
              <Calendar className="w-4 h-4 text-[#5B132B] shrink-0 group-hover:scale-110 transition-transform" />
              <span className="truncate">View Campaign Calendar</span>
            </button>

            {/* Action 9 */}
            <Link
              href="/admin/analytics"
              className="flex items-center gap-2 p-2.5 rounded-xl border border-[#EAE0D5] hover:border-[#5B132B] hover:bg-[#FAF4EE] transition-all text-left text-stone-800 font-semibold cursor-pointer group"
            >
              <BarChart2 className="w-4 h-4 text-[#5B132B] shrink-0 group-hover:scale-110 transition-transform" />
              <span className="truncate">Campaign Reports</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 6. Third Grid: Recent Campaigns Table + Create New Campaign Quick Form */}
      <div id="recent-campaigns" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left (8 cols): Recent Campaigns Table */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-5 border border-[#EAE0D5] shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-sm font-bold text-[#242124]">
              Recent Campaigns
            </h2>
            <Link
              href="#recent-campaigns"
              className="text-xs font-semibold text-[#5B132B] hover:underline"
            >
              View All →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#EAE0D5] text-[11px] text-stone-500 font-semibold">
                  <th className="pb-2.5">Campaign Name</th>
                  <th className="pb-2.5">Type</th>
                  <th className="pb-2.5">Start Date</th>
                  <th className="pb-2.5">End Date</th>
                  <th className="pb-2.5">Reach</th>
                  <th className="pb-2.5">Orders</th>
                  <th className="pb-2.5">Status</th>
                  <th className="pb-2.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5EDE6]">
                {campaignsList.map((camp) => (
                  <tr key={camp.id} className="hover:bg-[#FAF7F2] transition-colors">
                    <td className="py-3 font-semibold text-stone-800">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-rose-500" />
                        <span>{camp.name}</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border ${getTypeBadgeStyle(
                          camp.type
                        )}`}
                      >
                        {camp.type}
                      </span>
                    </td>
                    <td className="py-3 text-stone-600 font-medium">{camp.startDate}</td>
                    <td className="py-3 text-stone-600 font-medium">{camp.endDate}</td>
                    <td className="py-3 text-stone-700 font-medium">{camp.reach}</td>
                    <td className="py-3 font-bold text-stone-800">{camp.orders}</td>
                    <td className="py-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${getStatusBadgeStyle(
                          camp.status
                        )}`}
                      >
                        {camp.status}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        type="button"
                        className="p-1 rounded text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
                        aria-label="Options"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right (4 cols): Create New Campaign Quick Form matching screenshot */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-[#EAE0D5] shadow-2xs space-y-4">
          <h2 className="font-serif text-sm font-bold text-[#242124]">
            Create New Campaign
          </h2>

          {formSuccessMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{formSuccessMessage}</span>
            </div>
          )}

          <div className="flex items-center justify-center p-3 bg-rose-50/60 rounded-xl border border-rose-100">
            {/* Pink Gift Box Illustration matching screenshot */}
            <div className="relative flex items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-400 to-pink-500 shadow-md flex items-center justify-center text-white text-2xl font-black">
                %
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-amber-400 text-stone-900 text-xs flex items-center justify-center font-bold shadow-xs">
                ✨
              </div>
            </div>
          </div>

          <form onSubmit={handleCreateCampaign} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-stone-700 font-semibold mb-1">
                Campaign Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={campaignTitle}
                onChange={(e) => setCampaignTitle(e.target.value)}
                placeholder="e.g. Diwali Special Offer"
                className="w-full px-3 py-2 bg-stone-50 border border-[#EAE0D5] rounded-xl text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#5B132B] focus:ring-1 focus:ring-[#5B132B]"
              />
            </div>

            <div>
              <label className="block text-stone-700 font-semibold mb-1">
                Campaign Type <span className="text-rose-500">*</span>
              </label>
              <select
                value={campaignType}
                onChange={(e) => setCampaignType(e.target.value as any)}
                className="w-full px-3 py-2 bg-stone-50 border border-[#EAE0D5] rounded-xl text-stone-800 focus:outline-none focus:border-[#5B132B] focus:ring-1 focus:ring-[#5B132B] cursor-pointer"
              >
                <option value="Banner">Banner</option>
                <option value="Coupon">Coupon</option>
                <option value="Email">Email</option>
                <option value="WhatsApp">WhatsApp</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Start Date <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-stone-50 border border-[#EAE0D5] rounded-xl text-stone-800 text-[11px] focus:outline-none focus:border-[#5B132B]"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  End Date <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-stone-50 border border-[#EAE0D5] rounded-xl text-stone-800 text-[11px] focus:outline-none focus:border-[#5B132B]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-[#5B132B] hover:bg-[#430b1e] text-white font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>Create Campaign</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Quick Action Modal dialog */}
      {activeModalAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-[#EAE0D5] shadow-2xl relative space-y-4">
            <button
              onClick={() => setActiveModalAction(null)}
              className="absolute top-4 right-4 p-1 text-stone-400 hover:text-stone-700 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#5B132B] flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-[#242124]">
                  {activeModalAction === "create-campaign" && "Quick Campaign Builder"}
                  {activeModalAction === "send-email" && "Send Email Blast"}
                  {activeModalAction === "create-popup" && "Configure Exit-Intent Popup"}
                  {activeModalAction === "schedule-social" && "Schedule Social Media Post"}
                </h3>
                <p className="text-xs text-stone-500">
                  Ready to launch to your Rooh Vastr customer base.
                </p>
              </div>
            </div>

            <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EAE0D5] text-xs text-stone-600 space-y-2">
              <p>
                Aap is feature se directly personalized banners, WhatsApp alerts aur discount coupons automate kar sakte hain.
              </p>
              <div className="text-[11px] text-stone-400">
                Audience: <strong>24,680 reach</strong> across Instagram & WhatsApp
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setActiveModalAction(null)}
                className="px-4 py-2 border border-stone-200 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-50 cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  alert("Marketing action scheduled successfully!");
                  setActiveModalAction(null);
                }}
                className="px-4 py-2 bg-[#5B132B] text-white rounded-xl text-xs font-bold hover:bg-[#430b1e] cursor-pointer"
              >
                Confirm & Launch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
