"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Layers,
  Sparkles,
  SlidersHorizontal,
  FileText,
  ShoppingBag,
  ExternalLink,
  ShoppingCart,
  Users,
  MessageSquare,
  Image as ImageIcon,
  Tag,
  Star,
  Search,
  Globe,
  BarChart3,
  Settings,
  Shield,
  Menu,
  X,
  Boxes,
  Bell,
  Crown,
  ChevronDown,
  Megaphone,
  History,
  AlignLeft,
  Bot,
} from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: any;
  hasSubmenu?: boolean;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const NAV_ITEMS: NavItem[] = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/orders", label: "Orders", icon: ShoppingCart, hasSubmenu: true },
    { href: "/admin/products", label: "Products", icon: Package, hasSubmenu: true },
    { href: "/admin/categories", label: "Categories", icon: Layers },
    { href: "/admin/custom-orders", label: "Custom Printing", icon: Sparkles },
    { href: "/admin/customers", label: "Customers", icon: Users },
    { href: "/admin/reviews", label: "Reviews", icon: Star },
    {
      href: "/admin/marketing",
      label: "Marketing",
      icon: Megaphone,
      hasSubmenu: true,
    },
    { href: "/admin/ai-blog", label: "Blog & SEO", icon: FileText, hasSubmenu: true },
    { href: "/admin/banners", label: "Homepage", icon: LayoutDashboard, hasSubmenu: true },
    { href: "/admin/gallery", label: "Pages & Content", icon: FileText, hasSubmenu: true },
    { href: "/admin/analytics", label: "Reports & Analytics", icon: BarChart3, hasSubmenu: true },
    { href: "/admin/gallery", label: "Gallery / Creations", icon: ImageIcon },
    { href: "/admin/whatsapp", label: "WhatsApp Chatbot", icon: MessageSquare },
    { href: "/admin/settings", label: "Settings", icon: Settings, hasSubmenu: true },
    { href: "/admin/security", label: "Users & Roles", icon: Users },
  ];

  const MARKETING_SUBITEMS = [
    { href: "/admin/marketing", label: "Overview" },
    { href: "/admin/coupons", label: "Coupons & Offers" },
    { href: "/admin/banners", label: "Banners & Sliders" },
    { href: "/admin/marketing?tab=popup", label: "Popup / Exit Intent" },
    { href: "/admin/marketing?tab=email", label: "Email Campaigns" },
    { href: "/admin/whatsapp", label: "WhatsApp Campaigns" },
    { href: "/admin/marketing?tab=social", label: "Social Media" },
    { href: "/admin/coupons", label: "Discount Management" },
    { href: "/admin/marketing?tab=calendar", label: "Campaign Calendar" },
  ];

  const [marketingExpanded, setMarketingExpanded] = useState(true);

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col md:flex-row text-stone-800 antialiased selection:bg-[#581426]/20 selection:text-[#581426]">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-[#541223] text-white px-4 py-3 flex items-center justify-between border-b border-[#6B1834] sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="font-serif font-bold text-base tracking-wider">ROOH VASTR</span>
        </div>
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-1.5 rounded-lg bg-[#420E1C] text-stone-200 hover:text-white"
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Wine/Burgundy Sidebar matching image */}
      <aside
        className={`fixed md:sticky top-0 h-screen w-64 bg-[#541223] text-white flex-shrink-0 flex flex-col justify-between border-r border-[#420E1C] z-40 transition-transform duration-300 ease-in-out ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Logo Header */}
          <div className="pt-6 pb-4 px-5 shrink-0 flex items-start justify-between">
            <div>
              <h1 className="font-serif text-xl tracking-wider font-bold text-white uppercase leading-tight">
                ROOH VASTR
              </h1>
              <p className="text-[10px] text-rose-200/80 font-normal tracking-wide mt-0.5">
                Wear Your Story, Gift Your Feelings
              </p>
            </div>
            <button className="text-rose-200/70 hover:text-white p-1 rounded-md transition-colors mt-0.5">
              <AlignLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links List */}
          <div className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5 custom-scrollbar text-sm">
            {NAV_ITEMS.map((item, idx) => {
              const Icon = item.icon;
              const isMarketing = item.label === "Marketing";
              const isMarketingActive = pathname.startsWith("/admin/marketing");
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href) && item.label !== "Homepage";

              return (
                <div key={`${item.label}-${idx}`} className="space-y-0.5">
                  <Link
                    href={item.href}
                    onClick={() => {
                      if (isMarketing) {
                        setMarketingExpanded((prev) => !prev);
                      }
                      setIsMobileOpen(false);
                    }}
                    className={`flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                      isActive && (!isMarketing || !marketingExpanded)
                        ? "bg-[#781D33] text-white shadow-xs font-semibold"
                        : "text-rose-100/80 hover:text-white hover:bg-[#631629]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-rose-200/75"}`} />
                      <span className="tracking-wide">{item.label}</span>
                    </div>
                    {item.hasSubmenu && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-rose-300/60 transition-transform ${
                          isMarketing && marketingExpanded ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </Link>

                  {/* Render Marketing sub-menu matching the screenshot */}
                  {isMarketing && (marketingExpanded || isMarketingActive) && (
                    <div className="pl-6 pr-2 py-1 space-y-0.5 bg-[#420E1C]/40 rounded-xl my-0.5 border border-rose-900/20">
                      {MARKETING_SUBITEMS.map((sub) => {
                        const isSubActive =
                          sub.label === "Overview"
                            ? pathname === "/admin/marketing"
                            : pathname === sub.href;

                        return (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            onClick={() => setIsMobileOpen(false)}
                            className={`flex items-center gap-2.5 px-3 py-1.5 rounded-md text-[11px] font-medium transition-colors ${
                              isSubActive
                                ? "bg-[#781D33] text-white font-bold shadow-2xs"
                                : "text-rose-200/75 hover:text-white hover:bg-[#541223]"
                            }`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-400/60" />
                            <span className="truncate">{sub.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Badge: Rooh Vastr Admin Manage Your Store */}
          <div className="p-3.5 shrink-0">
            <div className="bg-[#420E1C]/90 rounded-2xl p-3 border border-rose-900/30 flex items-center gap-3 relative overflow-hidden">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 border border-amber-500/30">
                <Crown className="w-4 h-4 text-amber-300" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-white tracking-wide truncate">
                  Rooh Vastr Admin
                </div>
                <div className="text-[10px] text-rose-200/70 truncate">
                  Manage Your Store
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-xs"
        />
      )}

      {/* Main Content with Top Nav Bar */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar matching attached mockup */}
        <header className="h-16 bg-white border-b border-stone-200/90 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-20 shadow-xs">
          {/* Left search */}
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden text-stone-500 hover:text-stone-800 p-1 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative w-full">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search orders, products, customers, custom requests..."
                className="w-full pl-9 pr-14 py-2 bg-stone-50 border border-stone-200 rounded-full text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#541223]/20 focus:border-[#541223]"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-stone-400 font-mono bg-stone-200/70 px-1.5 py-0.5 rounded border border-stone-300">
                Ctrl K
              </span>
            </div>
          </div>

          {/* Right actions: Visit Website, Bell, Admin Profile */}
          <div className="flex items-center gap-4 sm:gap-6 ml-4">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-xs font-medium text-stone-700 hover:bg-stone-50 hover:text-stone-900 transition-colors shadow-2xs"
            >
              <span>Visit Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
            </Link>

            {/* Notification bell with badge 3 */}
            <div className="relative cursor-pointer p-1.5 text-stone-600 hover:text-stone-900 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[9px] font-bold flex items-center justify-center border-2 border-white">
                3
              </span>
            </div>

            {/* Admin Avatar & Role */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-stone-200">
              <div className="w-8 h-8 rounded-full bg-[#541223] text-white flex items-center justify-center font-bold text-xs tracking-wider shadow-xs">
                RV
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-stone-900 leading-tight">Admin</div>
                <div className="text-[10px] text-stone-400 font-medium leading-tight">Super Admin</div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Main Workspace */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
