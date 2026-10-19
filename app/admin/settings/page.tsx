"use client";

import React, { useState, useEffect } from "react";
import {
  Settings,
  Save,
  CheckCircle2,
  Store,
  CreditCard,
  Truck,
  Receipt,
  Phone,
  ShieldCheck,
  Building,
  Mail,
  HelpCircle,
} from "lucide-react";

interface StoreSettings {
  // General
  brandName: string;
  tagline: string;
  supportEmail: string;
  supportPhone: string;
  studioAddress: string;
  gstNumber: string;

  // Payments
  razorpayKeyId: string;
  razorpayKeySecret: string;
  paymentMode: "test" | "live";
  enableCod: boolean;
  codFee: number;

  // Shipping
  freeShippingThreshold: number;
  flatShippingFee: number;
  expressShippingFee: number;
  serviceableStates: string;

  // Taxes
  gstApparelRate: number;
  gstGiftsRate: number;
  pricesIncludeGst: boolean;
}

const DEFAULT_SETTINGS: StoreSettings = {
  brandName: "Rooh Vastr",
  tagline: "Wear Your Story. Gift Your Feelings.",
  supportEmail: "care@roohvastr.com",
  supportPhone: "+91 96548 61504",
  studioAddress: "Plot 42, Hawa Mahal Creative Zone, Badi Chaupar, Jaipur, Rajasthan 302002",
  gstNumber: "08AAAAA0000A1Z5",

  razorpayKeyId: "rzp_live_98374829103847",
  razorpayKeySecret: "sec_live_983247923847923",
  paymentMode: "live",
  enableCod: true,
  codFee: 49,

  freeShippingThreshold: 999,
  flatShippingFee: 99,
  expressShippingFee: 199,
  serviceableStates: "All India (28 States & 8 Union Territories)",

  gstApparelRate: 5,
  gstGiftsRate: 18,
  pricesIncludeGst: true,
};

export default function WebsiteSettingsAdminPage() {
  const [settings, setSettings] = useState<StoreSettings>(DEFAULT_SETTINGS);
  const [saved, setSaved] = useState(false);

  // Sync with localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("rooh_store_settings");
      if (stored) setSettings(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem("rooh_store_settings", JSON.stringify(settings));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700">
            <Settings className="w-4 h-4" />
            Global Platform Configuration
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif font-bold text-stone-900 mt-1">
            Website, Payment &amp; Logistics Settings
          </h1>
          <p className="text-sm text-stone-600">
            Configure your brand identity, Razorpay live payment gateway, shipping delivery thresholds, GST compliance, and studio contact points.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-900 hover:bg-amber-950 text-white text-sm font-semibold transition shadow-md"
        >
          {saved ? (
            <>
              <CheckCircle2 className="w-4 h-4" /> Settings Saved!
            </>
          ) : (
            <>
              <Save className="w-4 h-4" /> Save All Configurations
            </>
          )}
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Brand & Studio Contact */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <Store className="w-4 h-4 text-amber-700" />
            <h2 className="text-base font-bold text-stone-900">
              Store Identity &amp; Studio Presence
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Brand Name</label>
              <input
                type="text"
                value={settings.brandName}
                onChange={(e) => setSettings({ ...settings, brandName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:border-amber-800 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Official Brand Tagline
              </label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:border-amber-800 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Support Email (Customer Facing)
              </label>
              <input
                type="email"
                value={settings.supportEmail}
                onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:border-amber-800 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Support WhatsApp &amp; Phone Helpline
              </label>
              <input
                type="text"
                value={settings.supportPhone}
                onChange={(e) => setSettings({ ...settings, supportPhone: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:border-amber-800 focus:outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Studio Workshop &amp; Warehouse Address
              </label>
              <input
                type="text"
                value={settings.studioAddress}
                onChange={(e) => setSettings({ ...settings, studioAddress: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:border-amber-800 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Payments & Razorpay */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-emerald-700" />
              <h2 className="text-base font-bold text-stone-900">
                Payment Gateway &amp; Razorpay Integration
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-500 font-medium">Gateway Mode:</span>
              <button
                type="button"
                onClick={() =>
                  setSettings({
                    ...settings,
                    paymentMode: settings.paymentMode === "live" ? "test" : "live",
                  })
                }
                className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                  settings.paymentMode === "live"
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                    : "bg-amber-100 text-amber-800 border border-amber-300"
                }`}
              >
                {settings.paymentMode === "live" ? "● LIVE PRODUCTION" : "○ TEST SANDBOX"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Razorpay Key ID
              </label>
              <input
                type="text"
                value={settings.razorpayKeyId}
                onChange={(e) => setSettings({ ...settings, razorpayKeyId: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm font-mono focus:border-emerald-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Razorpay Key Secret
              </label>
              <input
                type="password"
                value={settings.razorpayKeySecret}
                onChange={(e) => setSettings({ ...settings, razorpayKeySecret: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm font-mono focus:border-emerald-600 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="codCheck"
                checked={settings.enableCod}
                onChange={(e) => setSettings({ ...settings, enableCod: e.target.checked })}
                className="w-4 h-4 rounded text-emerald-700 focus:ring-emerald-600"
              />
              <label htmlFor="codCheck" className="text-xs font-semibold text-stone-800">
                Allow Cash on Delivery (COD) at checkout
              </label>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                COD Handling Surcharge (₹)
              </label>
              <input
                type="number"
                value={settings.codFee}
                onChange={(e) => setSettings({ ...settings, codFee: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Shipping & Logistics */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <Truck className="w-4 h-4 text-amber-700" />
            <h2 className="text-base font-bold text-stone-900">
              Shipping Rates &amp; Free Delivery Thresholds
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Free Delivery Cart Minimum (₹)
              </label>
              <input
                type="number"
                value={settings.freeShippingThreshold}
                onChange={(e) =>
                  setSettings({ ...settings, freeShippingThreshold: Number(e.target.value) })
                }
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none"
              />
              <p className="text-[11px] text-stone-500 mt-1">Carts above this amount get free shipping</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Standard Shipping Fee (₹)
              </label>
              <input
                type="number"
                value={settings.flatShippingFee}
                onChange={(e) =>
                  setSettings({ ...settings, flatShippingFee: Number(e.target.value) })
                }
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none"
              />
              <p className="text-[11px] text-stone-500 mt-1">Applied when cart is below threshold</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Express Air Dispatch Surcharge (₹)
              </label>
              <input
                type="number"
                value={settings.expressShippingFee}
                onChange={(e) =>
                  setSettings({ ...settings, expressShippingFee: Number(e.target.value) })
                }
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none"
              />
              <p className="text-[11px] text-stone-500 mt-1">For urgent birthday/event deliveries</p>
            </div>
          </div>
        </div>

        {/* Section 4: GST & Taxes */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <Receipt className="w-4 h-4 text-amber-700" />
            <h2 className="text-base font-bold text-stone-900">
              GSTIN &amp; Tax Compliance (India)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Registered GSTIN
              </label>
              <input
                type="text"
                value={settings.gstNumber}
                onChange={(e) => setSettings({ ...settings, gstNumber: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm font-mono focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Apparel &amp; T-Shirts GST Rate (%)
              </label>
              <input
                type="number"
                value={settings.gstApparelRate}
                onChange={(e) =>
                  setSettings({ ...settings, gstApparelRate: Number(e.target.value) })
                }
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Mugs, Frames &amp; Corporate Gifts GST (%)
              </label>
              <input
                type="number"
                value={settings.gstGiftsRate}
                onChange={(e) =>
                  setSettings({ ...settings, gstGiftsRate: Number(e.target.value) })
                }
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="taxIncCheck"
              checked={settings.pricesIncludeGst}
              onChange={(e) => setSettings({ ...settings, pricesIncludeGst: e.target.checked })}
              className="w-4 h-4 rounded text-amber-900 focus:ring-amber-800"
            />
            <label htmlFor="taxIncCheck" className="text-xs font-semibold text-stone-800">
              All product prices on storefront are inclusive of GST (recommended for B2C customer trust)
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}
