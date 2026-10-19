"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  MessageCircle,
  Clock,
  CheckCircle,
  Eye,
  FileImage,
  ExternalLink,
  Search,
  Filter,
  DollarSign,
  ChevronDown,
  User,
  Phone,
  Calendar,
  Send,
  AlertCircle
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { CustomOrderRequest } from "@/lib/types";
import ImageUploadField from "@/components/admin/ImageUploadField";

const STATUS_OPTIONS: Array<{
  value: CustomOrderRequest["status"];
  label: string;
  badgeClass: string;
}> = [
  { value: "new", label: "New Request", badgeClass: "bg-blue-100 text-blue-800" },
  { value: "in_discussion", label: "In Discussion", badgeClass: "bg-sky-100 text-sky-800" },
  { value: "quote_sent", label: "Quote Sent", badgeClass: "bg-indigo-100 text-indigo-800" },
  { value: "preview_pending", label: "2D Proof Pending", badgeClass: "bg-amber-100 text-amber-800" },
  { value: "preview_sent", label: "Proof Sent to Customer", badgeClass: "bg-purple-100 text-purple-800" },
  { value: "revision_requested", label: "Revision Requested", badgeClass: "bg-rose-100 text-rose-800" },
  { value: "approved", label: "Proof Approved by Customer", badgeClass: "bg-emerald-100 text-emerald-800" },
  { value: "in_production", label: "Printing / Production", badgeClass: "bg-orange-100 text-orange-800" },
  { value: "shipped", label: "Shipped & Dispatched", badgeClass: "bg-teal-100 text-teal-800" },
  { value: "completed", label: "Delivered / Completed", badgeClass: "bg-stone-200 text-stone-800" },
  { value: "cancelled", label: "Cancelled", badgeClass: "bg-gray-100 text-gray-500" },
];

const DEFAULT_SAMPLE_POD: CustomOrderRequest[] = [
  {
    id: "RV-POD-928194",
    customer_name: "Vikram Rathore",
    customer_phone: "+91 98290 11223",
    customer_email: "vikram.rathore@techcorp.in",
    product_type: "Combed Cotton T-Shirts",
    quantity: 25,
    sizes_colors: "Black (10L, 10M, 5XL)",
    design_instructions: "Corporate Hackathon 2026. Embroidered chest crest with back typographic print in gold foil.",
    estimated_budget: 18000,
    quoted_price: 16250,
    status: "quote_sent",
    preview_image_url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
    created_at: "2026-10-15T09:30:00Z",
  },
  {
    id: "RV-POD-381920",
    customer_name: "Deepika Joshi",
    customer_phone: "+91 99887 76655",
    customer_email: "deepika.j@gmail.com",
    product_type: "Ceramic & Magic Mugs",
    quantity: 2,
    sizes_colors: "Glossy Black Magic Mug (11oz)",
    design_instructions: "Anniversary photo collage with date '14-02-2021'. Revealing couple portrait upon hot water contact.",
    estimated_budget: 1200,
    quoted_price: 998,
    status: "preview_pending",
    preview_image_url: "",
    created_at: "2026-10-16T14:15:00Z",
  },
  {
    id: "RV-POD-554210",
    customer_name: "Arjun & Tanya",
    customer_phone: "+91 97112 33445",
    customer_email: "arjun.tanya@gmail.com",
    product_type: "Custom Embroidered Hoodies",
    quantity: 2,
    sizes_colors: "Burgundy (M) & Charcoal (L)",
    design_instructions: "Roman numeral anniversary date 'IV. XII. MMXXIV' on cuffs, subtle heart monogram on left chest.",
    estimated_budget: 4500,
    quoted_price: 3998,
    status: "approved",
    preview_image_url: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
    created_at: "2026-10-14T11:20:00Z",
  },
];

export default function AdminCustomOrdersPage() {
  const [requests, setRequests] = useState<CustomOrderRequest[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<CustomOrderRequest | null>(null);
  const [previewInputUrl, setPreviewInputUrl] = useState("");
  const [quotedPriceInput, setQuotedPriceInput] = useState<number | "">("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("rooh_custom_orders");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setRequests(parsed);
          setSelectedOrder(parsed[0]);
          setPreviewInputUrl(parsed[0].preview_image_url || "");
          setQuotedPriceInput(parsed[0].quoted_price || "");
          return;
        }
      }
      setRequests(DEFAULT_SAMPLE_POD);
      setSelectedOrder(DEFAULT_SAMPLE_POD[0]);
      setPreviewInputUrl(DEFAULT_SAMPLE_POD[0].preview_image_url || "");
      setQuotedPriceInput(DEFAULT_SAMPLE_POD[0].quoted_price || "");
      localStorage.setItem("rooh_custom_orders", JSON.stringify(DEFAULT_SAMPLE_POD));
    } catch (e) {
      console.error(e);
      setRequests(DEFAULT_SAMPLE_POD);
      setSelectedOrder(DEFAULT_SAMPLE_POD[0]);
    }
  }, []);

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSelectOrder = (order: CustomOrderRequest) => {
    setSelectedOrder(order);
    setPreviewInputUrl(order.preview_image_url || "");
    setQuotedPriceInput(order.quoted_price || "");
  };

  const handleUpdateStatus = (newStatus: CustomOrderRequest["status"]) => {
    if (!selectedOrder) return;
    const updated = requests.map((item) =>
      item.id === selectedOrder.id ? { ...item, status: newStatus } : item
    );
    setRequests(updated);
    setSelectedOrder({ ...selectedOrder, status: newStatus });
    localStorage.setItem("rooh_custom_orders", JSON.stringify(updated));
    showNotification(`Status updated to "${newStatus.replace("_", " ")}"`);
  };

  const handleSaveProofAndPrice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;

    const updated = requests.map((item) => {
      if (item.id === selectedOrder.id) {
        return {
          ...item,
          preview_image_url: previewInputUrl,
          quoted_price: quotedPriceInput === "" ? undefined : Number(quotedPriceInput),
          status:
            previewInputUrl && item.status === "preview_pending"
              ? "preview_sent"
              : item.status,
        };
      }
      return item;
    });

    setRequests(updated);
    setSelectedOrder((prev) =>
      prev
        ? {
            ...prev,
            preview_image_url: previewInputUrl,
            quoted_price: quotedPriceInput === "" ? undefined : Number(quotedPriceInput),
            status:
              previewInputUrl && prev.status === "preview_pending"
                ? "preview_sent"
                : prev.status,
          }
        : null
    );
    localStorage.setItem("rooh_custom_orders", JSON.stringify(updated));
    showNotification("2D Mockup preview URL & Quote saved!");
  };

  const filteredRequests = requests.filter((r) => {
    const matchesSearch =
      r.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.customer_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.product_type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.customer_phone?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
          <span className="text-xs uppercase font-bold text-[#6D1835] tracking-widest">
            Print on Demand & Bespoke Orders
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#242124]">
            Custom Proof Review & Approvals
          </h1>
          <p className="text-xs text-stone-600 mt-1">
            Review design briefs, attach designer 2D digital proofs, quote pricing, and coordinate WhatsApp approvals.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs bg-[#6D1835]/10 text-[#6D1835] font-bold px-3 py-1.5 rounded-xl border border-[#6D1835]/20">
            {requests.length} Total Inquiries
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search by ID, customer name, phone, or canvas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white pl-10 pr-4 py-2.5 rounded-2xl border border-stone-200 text-xs focus:outline-none focus:border-[#6D1835]"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-white px-4 py-2.5 rounded-2xl border border-stone-200 text-xs text-stone-700 font-semibold focus:outline-none focus:border-[#6D1835]"
        >
          <option value="all">All Statuses ({requests.length})</option>
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Master Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Requests List (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-stone-200/80 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-stone-100 flex justify-between items-center bg-[#FAF7F2]">
            <span className="text-xs font-bold text-[#242124] uppercase tracking-wider">
              Inquiry Queue
            </span>
            <span className="text-[11px] text-stone-500 font-medium">
              {filteredRequests.length} matching
            </span>
          </div>

          <div className="divide-y divide-stone-100 max-h-[700px] overflow-y-auto">
            {filteredRequests.length === 0 ? (
              <div className="p-8 text-center text-stone-400 text-xs">
                No custom POD inquiries found.
              </div>
            ) : (
              filteredRequests.map((req) => {
                const isSelected = selectedOrder?.id === req.id;
                const statusMeta =
                  STATUS_OPTIONS.find((s) => s.value === req.status) ||
                  STATUS_OPTIONS[0];

                return (
                  <button
                    key={req.id}
                    onClick={() => handleSelectOrder(req)}
                    className={`w-full text-left p-4.5 transition-all flex flex-col gap-2 ${
                      isSelected
                        ? "bg-[#6D1835]/5 border-l-4 border-[#6D1835]"
                        : "hover:bg-stone-50"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-mono font-bold text-xs text-[#6D1835]">
                        {req.id}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusMeta.badgeClass}`}
                      >
                        {statusMeta.label}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-bold text-xs text-[#242124]">
                        {req.product_type}
                      </h4>
                      <p className="text-[11px] text-stone-500">
                        {req.customer_name} · Qty: {req.quantity}
                      </p>
                    </div>

                    <p className="text-[11px] text-stone-600 line-clamp-1 italic">
                      &quot;{req.design_instructions}&quot;
                    </p>

                    <div className="flex justify-between items-center text-[10px] text-stone-400 pt-1">
                      <span>{req.quoted_price ? formatPrice(req.quoted_price) : "Quote Pending"}</span>
                      <span>
                        {req.created_at
                          ? new Date(req.created_at).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                            })
                          : "Recent"}
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Detail & Designer Studio Actions (7 cols) */}
        {selectedOrder ? (
          <div className="lg:col-span-7 space-y-6">
            {/* Top Card: Request Context & Customer Info */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs space-y-5">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-stone-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-base font-bold text-[#6D1835]">
                      {selectedOrder.id}
                    </span>
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        STATUS_OPTIONS.find((s) => s.value === selectedOrder.status)
                          ?.badgeClass || "bg-stone-100"
                      }`}
                    >
                      {STATUS_OPTIONS.find((s) => s.value === selectedOrder.status)
                        ?.label || selectedOrder.status}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#242124] mt-0.5">
                    {selectedOrder.product_type}
                  </h3>
                </div>

                {/* WhatsApp Direct Action Button */}
                <a
                  href={`https://wa.me/${(selectedOrder.customer_phone || "").replace(
                    /[^0-9]/g,
                    ""
                  )}?text=${encodeURIComponent(
                    `Namaste ${selectedOrder.customer_name}! This is the Rooh Vastr Bespoke Studio regarding your custom order (${selectedOrder.id}). ${
                      selectedOrder.preview_image_url
                        ? `Here is your digital 2D preview proof: ${selectedOrder.preview_image_url}`
                        : "We are finalizing your custom design mockup."
                    } ${
                      selectedOrder.quoted_price
                        ? `Quoted Total: ₹${selectedOrder.quoted_price}.`
                        : ""
                    } Please let us know if you approve this proof so we can start production!`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Message on WhatsApp</span>
                </a>
              </div>

              {/* Customer & Spec Metadata */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-[#FAF7F2] text-xs">
                <div>
                  <span className="text-[10px] text-stone-500 font-semibold block uppercase">
                    Customer
                  </span>
                  <span className="font-bold text-[#242124] block mt-0.5">
                    {selectedOrder.customer_name}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-500 font-semibold block uppercase">
                    Phone
                  </span>
                  <span className="font-bold text-[#242124] block mt-0.5 font-mono">
                    {selectedOrder.customer_phone}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-500 font-semibold block uppercase">
                    Quantity
                  </span>
                  <span className="font-bold text-[#242124] block mt-0.5">
                    {selectedOrder.quantity} units
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-500 font-semibold block uppercase">
                    Estimated Budget
                  </span>
                  <span className="font-bold text-[#242124] block mt-0.5">
                    {selectedOrder.estimated_budget
                      ? formatPrice(selectedOrder.estimated_budget)
                      : "Open"}
                  </span>
                </div>
              </div>

              {/* Design Brief Description */}
              <div className="space-y-1.5 text-xs">
                <span className="text-[11px] font-bold text-[#6D1835] uppercase tracking-wider block">
                  Customer Instructions & Placement Notes
                </span>
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 text-stone-800 leading-relaxed font-sans">
                  {selectedOrder.design_instructions || "No specific instructions provided."}
                </div>
                {selectedOrder.sizes_colors && (
                  <p className="text-[11px] text-stone-500 mt-1">
                    <strong className="text-stone-700">Sizes / Colors:</strong>{" "}
                    {selectedOrder.sizes_colors}
                  </p>
                )}
              </div>

              {/* Status Update Quick Select */}
              <div className="pt-2 border-t border-stone-100 space-y-2">
                <span className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block">
                  Update Workflow Status
                </span>
                <div className="flex flex-wrap gap-2">
                  {STATUS_OPTIONS.map((st) => (
                    <button
                      key={st.value}
                      onClick={() => handleUpdateStatus(st.value)}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all ${
                        selectedOrder.status === st.value
                          ? "bg-[#6D1835] text-white shadow-xs"
                          : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Card: 2D Digital Proof & Quoted Pricing */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs space-y-5">
              <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
                <FileImage className="w-4 h-4 text-[#6D1835]" />
                <h3 className="font-serif text-base font-bold text-[#242124]">
                  Designer 2D Digital Mockup & Commercial Quote
                </h3>
              </div>

              {/* Visual Preview if Available */}
              {selectedOrder.preview_image_url ? (
                <div className="rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 p-2 flex flex-col items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedOrder.preview_image_url}
                    alt="Custom Print Proof"
                    className="max-h-80 w-auto rounded-xl object-contain shadow-xs"
                  />
                  <div className="w-full flex justify-between items-center px-2 pt-2 text-[11px] text-stone-500">
                    <span className="font-semibold text-emerald-700 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> 2D Proof Active
                    </span>
                    <a
                      href={selectedOrder.preview_image_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#6D1835] font-bold flex items-center gap-1 hover:underline"
                    >
                      Full Size <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ) : (
                <div className="p-8 rounded-2xl border-2 border-dashed border-stone-200 bg-stone-50 text-center space-y-1">
                  <FileImage className="w-8 h-8 mx-auto text-stone-300" />
                  <p className="text-xs font-bold text-stone-600">
                    No 2D Mockup Proof Attached Yet
                  </p>
                  <p className="text-[11px] text-stone-400">
                    Paste an image URL below to provide the customer with their digital proof for WhatsApp approval.
                  </p>
                </div>
              )}

              {/* Form to attach proof and set quote */}
              <form onSubmit={handleSaveProofAndPrice} className="space-y-4 text-xs">
                <div className="space-y-4">
                  <ImageUploadField
                    label="2D Digital Proof / Mockup Image"
                    value={previewInputUrl}
                    onChange={setPreviewInputUrl}
                    folder="proofs"
                    aspectRatio="square"
                    helperText="Upload 2D preview mockup from your device or paste an image link."
                  />

                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">
                      Final Quoted Price (₹ Total)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 1999"
                      value={quotedPriceInput}
                      onChange={(e) =>
                        setQuotedPriceInput(
                          e.target.value === "" ? "" : Number(e.target.value)
                        )
                      }
                      className="w-full bg-[#FAF7F2] px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-800 focus:outline-none focus:border-[#6D1835]"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#6D1835] hover:bg-[#521327] text-white font-bold rounded-xl shadow-xs transition-colors"
                  >
                    Save Proof & Quote
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-7 p-12 bg-white rounded-3xl border border-stone-200/80 text-center text-stone-400">
            Select a custom order request from the left column to view its details.
          </div>
        )}
      </div>
    </div>
  );
}
