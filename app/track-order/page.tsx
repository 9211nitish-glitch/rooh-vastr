"use client";

import React, { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  Sparkles,
  MessageCircle,
  HelpCircle,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("orderId") || "";

  const [query, setQuery] = useState(initialQuery);
  const [trackedResult, setTrackedResult] = useState<{
    id: string;
    type: "order" | "custom_order";
    customer_name?: string;
    product_name?: string;
    placed_at: string;
    status: string;
    carrier?: string;
    tracking_number?: string;
    estimated_delivery: string;
    current_step: number;
  } | null>(null);

  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setHasSearched(true);
    const q = query.trim().toUpperCase();

    // Check localStorage orders
    try {
      const orders = JSON.parse(localStorage.getItem("rooh_orders") || "[]");
      const foundOrder = orders.find(
        (o: { id: string; customer_phone?: string }) =>
          o.id.toUpperCase() === q || (o.customer_phone && o.customer_phone.includes(q))
      );

      if (foundOrder) {
        setTrackedResult({
          id: foundOrder.id,
          type: "order",
          customer_name: foundOrder.customer_name,
          product_name: `${foundOrder.items?.[0]?.name} ${
            foundOrder.items?.length > 1 ? `(+${foundOrder.items.length - 1} more)` : ""
          }`,
          placed_at: new Date(foundOrder.placed_at || Date.now()).toLocaleDateString("en-IN"),
          status: "In Studio Tailoring & Quality Inspection",
          carrier: "BlueDart Express Air",
          tracking_number: `BD-${Math.floor(10000000 + Math.random() * 90000000)}`,
          estimated_delivery: "Within 3-4 Business Days",
          current_step: 2,
        });
        return;
      }

      // Check custom POD orders
      const podOrders = JSON.parse(localStorage.getItem("rooh_custom_orders") || "[]");
      const foundPod = podOrders.find(
        (p: { id: string; customer_phone?: string }) =>
          p.id.toUpperCase() === q || (p.customer_phone && p.customer_phone.includes(q))
      );

      if (foundPod) {
        setTrackedResult({
          id: foundPod.id,
          type: "custom_order",
          customer_name: foundPod.customer_name || "Valued Patron",
          product_name: foundPod.product_name,
          placed_at: foundPod.date || "Today",
          status: "2D Mockup Preview in Preparation",
          carrier: "Express Direct Delivery",
          estimated_delivery: "Awaiting Mockup Approval",
          current_step: 1,
        });
        return;
      }
    } catch (err) {
      console.error(err);
    }

    // Default simulation for demo query
    if (q.startsWith("RV-ORD")) {
      setTrackedResult({
        id: q,
        type: "order",
        customer_name: "Valued Patron",
        product_name: "Signature Rooh Vastr Apparel",
        placed_at: "Recent",
        status: "In Quality Inspection & Hand Pressing",
        carrier: "BlueDart Express Air",
        tracking_number: `BD-89210492`,
        estimated_delivery: "3 Days",
        current_step: 2,
      });
    } else if (q.startsWith("RV-POD")) {
      setTrackedResult({
        id: q,
        type: "custom_order",
        customer_name: "Valued Patron",
        product_name: "Bespoke Custom Print Canvas",
        placed_at: "Recent",
        status: "Designer Reviewing Artwork",
        carrier: "Handcrafted Studio Dispatch",
        estimated_delivery: "Proof in 4 hours",
        current_step: 1,
      });
    } else {
      setTrackedResult(null);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      handleSearch();
    }
  }, [initialQuery]);

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-10 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb */}
        <div className="text-xs text-gray-500 flex items-center gap-2">
          <Link href="/" className="hover:text-[#6D1835]">Home</Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-[#242124] font-medium">Track Order & Custom Request</span>
        </div>

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6D1835]/10 text-[#6D1835] text-xs font-semibold">
            <Truck className="w-3.5 h-3.5" /> Live Studio & Courier Tracking
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#242124]">
            Track Your Rooh Vastr Journey
          </h1>
          <p className="text-stone-500 text-xs sm:text-sm">
            Enter your Order Number (e.g., <code className="bg-stone-200 px-1 py-0.5 rounded text-stone-800">RV-ORD-928194</code>) or Custom POD Reference (e.g., <code className="bg-stone-200 px-1 py-0.5 rounded text-stone-800">RV-POD-102938</code>).
          </p>
        </div>

        {/* Search Bar Form */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-stone-200/80 shadow-xs max-w-xl mx-auto">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter Order ID or WhatsApp Phone"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#FAF7F2] border border-stone-300 rounded-2xl text-xs font-mono font-bold text-[#242124] focus:outline-none focus:ring-2 focus:ring-[#6D1835]"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-[#6D1835] hover:bg-[#521327] text-white text-xs font-bold rounded-2xl shadow-sm transition-all"
            >
              Track
            </button>
          </form>
        </div>

        {/* Results Container */}
        {hasSearched && (
          <div>
            {trackedResult ? (
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-xs space-y-8">
                {/* Status Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-stone-100 pb-6">
                  <div>
                    <span className="text-xs uppercase font-bold text-[#6D1835] tracking-widest">
                      {trackedResult.type === "custom_order" ? "Custom POD Request" : "Ready-Made Order"}
                    </span>
                    <h2 className="font-serif text-2xl font-bold text-[#242124]">
                      {trackedResult.id}
                    </h2>
                    <p className="text-xs text-stone-500 mt-1">
                      {trackedResult.product_name} · Ordered on {trackedResult.placed_at}
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-[10px] text-stone-400 uppercase tracking-wide block">
                      Estimated Delivery
                    </span>
                    <span className="text-sm font-bold text-emerald-700">
                      {trackedResult.estimated_delivery}
                    </span>
                  </div>
                </div>

                {/* Stepper Timeline */}
                <div className="py-4">
                  {trackedResult.type === "custom_order" ? (
                    /* Custom POD Steps */
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                      {[
                        { step: 1, title: "Request Received", desc: "Studio team assigned" },
                        { step: 2, title: "2D Proof Prepared", desc: "Design sent for review" },
                        { step: 3, title: "Patron Approved", desc: "Ready for printing" },
                        { step: 4, title: "Printed & Shipped", desc: "Express delivery" },
                      ].map((s) => (
                        <div key={s.step} className="flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2">
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${
                              trackedResult.current_step >= s.step
                                ? "bg-[#6D1835] text-white"
                                : "bg-stone-100 text-stone-400"
                            }`}
                          >
                            {trackedResult.current_step > s.step ? (
                              <CheckCircle2 className="w-5 h-5 text-white" />
                            ) : (
                              s.step
                            )}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-[#242124]">{s.title}</p>
                            <p className="text-[11px] text-stone-400">{s.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Standard Order Steps */
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                      {[
                        { step: 1, title: "Order Confirmed", desc: "Payment verified" },
                        { step: 2, title: "Studio Tailoring", desc: "Packaging & quality check" },
                        { step: 3, title: "Dispatched", desc: trackedResult.carrier || "Air Courier" },
                        { step: 4, title: "Delivered", desc: "At your doorstep" },
                      ].map((s) => (
                        <div key={s.step} className="flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2">
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${
                              trackedResult.current_step >= s.step
                                ? "bg-[#6D1835] text-white"
                                : "bg-stone-100 text-stone-400"
                            }`}
                          >
                            {trackedResult.current_step > s.step ? (
                              <CheckCircle2 className="w-5 h-5 text-white" />
                            ) : (
                              s.step
                            )}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-[#242124]">{s.title}</p>
                            <p className="text-[11px] text-stone-400">{s.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Courier / Support Info */}
                <div className="p-4 bg-stone-50 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
                  <div className="flex items-center gap-2 text-stone-600">
                    <ShieldCheck className="w-4 h-4 text-[#6D1835]" />
                    <span>Courier AWB: <strong>{trackedResult.tracking_number || "In transit dispatch"}</strong></span>
                  </div>

                  <a
                    href={`https://wa.me/919654861504?text=${encodeURIComponent(
                      `Hi Rooh Vastr Support! I am inquiring about tracking for ${trackedResult.id}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-emerald-700 font-bold hover:underline"
                  >
                    <MessageCircle className="w-4 h-4" /> Chat with Concierge
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-8 text-center border border-stone-200/80 shadow-xs max-w-md mx-auto space-y-3">
                <HelpCircle className="w-10 h-10 text-stone-400 mx-auto" />
                <h3 className="font-serif text-lg font-bold text-[#242124]">
                  No Record Found
                </h3>
                <p className="text-xs text-stone-500 leading-relaxed">
                  We couldn&apos;t find an active order matching &quot;{query}&quot;. Please verify your ID or reach out to our studio on WhatsApp for instant manual lookup.
                </p>
                <div className="pt-2">
                  <a
                    href="https://wa.me/919654861504"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
                  >
                    <MessageCircle className="w-4 h-4" /> WhatsApp Support
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6D1835]" />
        </div>
      }
    >
      <TrackOrderContent />
    </Suspense>
  );
}
