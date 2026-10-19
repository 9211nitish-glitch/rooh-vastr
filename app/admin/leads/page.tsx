"use client";

import React, { useState, useEffect } from "react";
import {
  Bot,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ArrowRight,
  ExternalLink,
  Trash2,
  RefreshCw,
  ShoppingBag,
  DollarSign,
  User,
  Eye,
  X,
  Send,
  MessageCircle,
  Copy,
  ChevronDown
} from "lucide-react";
import { ChatLead, ChatMessage } from "@/lib/types";

const STATUS_CONFIG: Record<
  ChatLead["status"],
  { label: string; bg: string; text: string; border: string }
> = {
  new: {
    label: "New Inquiry",
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
  },
  contacted: {
    label: "Contacted",
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
  },
  in_discussion: {
    label: "In Discussion",
    bg: "bg-purple-50",
    text: "text-purple-700",
    border: "border-purple-200",
  },
  quote_sent: {
    label: "Quote Sent",
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    border: "border-indigo-200",
  },
  converted: {
    label: "Converted to Order",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
  },
  cancelled: {
    label: "Cancelled",
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
  },
  closed: {
    label: "Closed / Lost",
    bg: "bg-stone-100",
    text: "text-stone-600",
    border: "border-stone-200",
  },
};

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<ChatLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedLead, setSelectedLead] = useState<ChatLead | null>(null);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  // Fetch leads from API
  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/leads");
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads || []);
      }
    } catch (err) {
      console.error("Failed to fetch leads:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Update lead status
  const handleStatusChange = async (leadId: string, newStatus: ChatLead["status"]) => {
    try {
      setIsUpdating(leadId);
      const res = await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: leadId, status: newStatus }),
      });

      if (res.ok) {
        setLeads((prev) =>
          prev.map((lead) => (lead.id === leadId ? { ...lead, status: newStatus } : lead))
        );
        if (selectedLead && selectedLead.id === leadId) {
          setSelectedLead({ ...selectedLead, status: newStatus });
        }
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setIsUpdating(null);
    }
  };

  // Delete lead
  const handleDeleteLead = async (leadId: string) => {
    if (!confirm("Are you sure you want to delete this lead record?")) return;
    try {
      const res = await fetch(`/api/leads?id=${leadId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setLeads((prev) => prev.filter((lead) => lead.id !== leadId));
        if (selectedLead?.id === leadId) {
          setSelectedLead(null);
        }
      }
    } catch (err) {
      console.error("Failed to delete lead:", err);
    }
  };

  // Filtered leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.customer_phone.includes(searchQuery) ||
      (lead.product_name && lead.product_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (lead.notes && lead.notes.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (lead.city && lead.city.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate stats
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === "new").length;
  const inProgressLeads = leads.filter(
    (l) => l.status === "contacted" || l.status === "in_discussion" || l.status === "quote_sent"
  ).length;
  const convertedLeads = leads.filter((l) => l.status === "converted").length;
  const conversionRate = totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0;

  // Clean phone number for WhatsApp URL
  const getWhatsAppLink = (phone: string, name: string, product?: string) => {
    const cleanNumber = phone.replace(/[^0-9]/g, "");
    const formattedNumber = cleanNumber.startsWith("91")
      ? cleanNumber
      : cleanNumber.length === 10
      ? `91${cleanNumber}`
      : cleanNumber;

    const message = `Namaste ${name}! 🙏 We received your customized gift inquiry for "${product || "Personalized Gift"}" through our Rooh Vastr AI Assistant. We would love to share free 3D design mockups with you!`;

    return `https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`;
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPhone(id);
    setTimeout(() => setCopiedPhone(null), 2000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-[#541223] text-white flex items-center justify-center shadow-md">
              <Bot className="w-6 h-6 text-amber-200" />
            </div>
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                AI Chat Leads & Inquiries
              </h1>
              <p className="text-xs sm:text-sm text-stone-500">
                Customer leads captured 24/7 via Storefront AI Concierge & Gift Recommendation Chat
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchLeads}
            disabled={loading}
            className="px-3.5 py-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-xs font-semibold text-stone-700 flex items-center gap-1.5 transition-all shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-[#541223]" : ""}`} />
            <span>Refresh Leads</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center shrink-0">
            <MessageSquare className="w-5 h-5 text-[#541223]" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
              Total Inquiries
            </span>
            <span className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
              {totalLeads}
            </span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-blue-100 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 block">
              New Leads
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl font-serif font-bold text-blue-900">
                {newLeads}
              </span>
              {newLeads > 0 && (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-600 text-white">
                  Action Required
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-purple-100 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600 block">
              In Discussion
            </span>
            <span className="text-xl sm:text-2xl font-serif font-bold text-purple-900">
              {inProgressLeads}
            </span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-emerald-100 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 block">
              Converted ({conversionRate}%)
            </span>
            <span className="text-xl sm:text-2xl font-serif font-bold text-emerald-900">
              {convertedLeads} Orders
            </span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search by customer name, phone, product requested, or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#FAF7F2] border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#541223] text-stone-800"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Status Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                statusFilter === "all"
                  ? "bg-[#541223] text-white shadow-xs"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              All ({leads.length})
            </button>
            <button
              onClick={() => setStatusFilter("new")}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                statusFilter === "new"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-blue-50 text-blue-700 hover:bg-blue-100"
              }`}
            >
              New ({newLeads})
            </button>
            <button
              onClick={() => setStatusFilter("contacted")}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                statusFilter === "contacted"
                  ? "bg-amber-600 text-white shadow-xs"
                  : "bg-amber-50 text-amber-700 hover:bg-amber-100"
              }`}
            >
              Contacted
            </button>
            <button
              onClick={() => setStatusFilter("in_discussion")}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                statusFilter === "in_discussion"
                  ? "bg-purple-600 text-white shadow-xs"
                  : "bg-purple-50 text-purple-700 hover:bg-purple-100"
              }`}
            >
              In Discussion
            </button>
            <button
              onClick={() => setStatusFilter("converted")}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                statusFilter === "converted"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
              }`}
            >
              Converted ({convertedLeads})
            </button>
          </div>
        </div>
      </div>

      {/* Leads Table / List */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-stone-400 space-y-3">
            <RefreshCw className="w-8 h-8 mx-auto animate-spin text-[#541223]" />
            <p className="text-sm">Fetching real-time AI leads...</p>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="p-12 text-center text-stone-400 space-y-3">
            <Bot className="w-12 h-12 mx-auto text-stone-300" />
            <p className="text-base font-semibold text-stone-700">No leads found</p>
            <p className="text-xs text-stone-400 max-w-sm mx-auto">
              {searchQuery
                ? `No inquiries matching "${searchQuery}". Try clearing search.`
                : "New customer inquiries initiated in the storefront chatbot will appear here in real-time."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FAF7F2] border-b border-stone-200 text-[11px] font-bold uppercase tracking-wider text-stone-500">
                  <th className="py-3.5 px-4 sm:px-6">Customer & Contact</th>
                  <th className="py-3.5 px-4">Product / Inquiry</th>
                  <th className="py-3.5 px-4">Custom Details</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Captured</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-xs sm:text-sm text-stone-700">
                {filteredLeads.map((lead) => {
                  const statusInfo = STATUS_CONFIG[lead.status] || STATUS_CONFIG.new;
                  return (
                    <tr
                      key={lead.id}
                      className="hover:bg-[#FCFAF8] transition-colors group"
                    >
                      {/* Customer Info */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="space-y-1">
                          <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                            <span>{lead.customer_name}</span>
                            {lead.status === "new" && (
                              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                            )}
                          </div>

                          <div className="flex items-center gap-1.5 text-xs text-stone-600">
                            <Phone className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                            <span className="font-mono">{lead.customer_phone}</span>
                            <button
                              onClick={() => copyToClipboard(lead.customer_phone, lead.id)}
                              title="Copy Phone"
                              className="text-stone-400 hover:text-stone-700"
                            >
                              <Copy className="w-3 h-3" />
                            </button>
                            {copiedPhone === lead.id && (
                              <span className="text-[10px] text-emerald-600 font-medium">Copied!</span>
                            )}
                          </div>

                          {lead.customer_email && (
                            <div className="flex items-center gap-1.5 text-xs text-stone-500">
                              <Mail className="w-3 h-3 text-stone-400 shrink-0" />
                              <span className="truncate max-w-[160px]">{lead.customer_email}</span>
                            </div>
                          )}

                          {lead.city && (
                            <div className="flex items-center gap-1.5 text-[11px] text-stone-400">
                              <MapPin className="w-3 h-3 shrink-0" />
                              <span>{lead.city}</span>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Product Requested */}
                      <td className="py-4 px-4 align-top">
                        <div className="space-y-1">
                          <div className="font-medium text-stone-900 flex items-center gap-1.5">
                            <ShoppingBag className="w-3.5 h-3.5 text-[#541223] shrink-0" />
                            <span>{lead.product_name || "Custom Personalized Gift"}</span>
                          </div>
                          {lead.budget && (
                            <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-[#FAF4EE] text-[#541223] border border-[#EFE5DB]">
                              Budget: {lead.budget}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Notes / Inquiries */}
                      <td className="py-4 px-4 align-top max-w-xs">
                        <p className="text-xs text-stone-600 line-clamp-2 italic">
                          "{lead.notes || "Requested details via AI chat"}"
                        </p>
                        {lead.conversation_transcript && lead.conversation_transcript.length > 0 && (
                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="mt-1.5 text-[11px] font-semibold text-[#541223] hover:underline flex items-center gap-1"
                          >
                            <MessageCircle className="w-3 h-3" />
                            <span>Read Chat ({lead.conversation_transcript.length} msgs)</span>
                          </button>
                        )}
                      </td>

                      {/* Status Toggle */}
                      <td className="py-4 px-4 align-top">
                        <div className="relative inline-block">
                          <select
                            value={lead.status}
                            disabled={isUpdating === lead.id}
                            onChange={(e) =>
                              handleStatusChange(lead.id, e.target.value as ChatLead["status"])
                            }
                            className={`px-2.5 py-1 rounded-full text-xs font-bold border cursor-pointer focus:outline-none transition-all ${statusInfo.bg} ${statusInfo.text} ${statusInfo.border}`}
                          >
                            <option value="new">New Inquiry</option>
                            <option value="contacted">Contacted</option>
                            <option value="in_discussion">In Discussion</option>
                            <option value="quote_sent">Quote Sent</option>
                            <option value="converted">Converted to Order</option>
                            <option value="closed">Closed / Lost</option>
                          </select>
                        </div>
                      </td>

                      {/* Captured At */}
                      <td className="py-4 px-4 align-top text-xs text-stone-500 whitespace-nowrap">
                        <div className="flex items-center gap-1 text-[11px]">
                          <Calendar className="w-3 h-3 text-stone-400" />
                          <span>{new Date(lead.created_at).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric"
                          })}</span>
                        </div>
                        <span className="text-[10px] text-stone-400 block mt-0.5">
                          {new Date(lead.created_at).toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit"
                          })}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 sm:px-6 align-top text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* 1-Click WhatsApp Button */}
                          <a
                            href={getWhatsAppLink(lead.customer_phone, lead.customer_name, lead.product_name)}
                            target="_blank"
                            rel="noreferrer"
                            className="px-2.5 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold flex items-center gap-1 shadow-xs transition-all hover:scale-105"
                            title="Chat with Customer on WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5 fill-white text-[#25D366]" />
                            <span className="hidden sm:inline">WhatsApp</span>
                          </a>

                          {/* View Transcript modal button */}
                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-100 text-stone-600 transition-colors"
                            title="Inspect Chat Transcript"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            className="p-1.5 rounded-lg border border-transparent hover:border-red-200 hover:bg-red-50 text-stone-400 hover:text-red-600 transition-colors"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Full Conversation Transcript Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-[#541223] to-[#6D1835] text-white flex items-center justify-between border-b border-[#7B1B3C]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                  <Bot className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base sm:text-lg">
                    {selectedLead.customer_name} &bull; Lead #{selectedLead.id}
                  </h3>
                  <p className="text-xs text-stone-200">
                    Product: <span className="font-bold">{selectedLead.product_name || "General Gift"}</span> &bull; {selectedLead.customer_phone}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedLead(null)}
                className="p-1.5 rounded-full hover:bg-white/10 text-stone-200 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer Summary Strip */}
            <div className="px-5 py-3 bg-[#FAF7F2] border-b border-stone-200 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div>
                <span className="text-[10px] text-stone-400 font-bold uppercase block">Phone</span>
                <span className="font-semibold text-stone-800">{selectedLead.customer_phone}</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 font-bold uppercase block">City</span>
                <span className="font-semibold text-stone-800">{selectedLead.city || "Not provided"}</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 font-bold uppercase block">Budget</span>
                <span className="font-semibold text-stone-800">{selectedLead.budget || "Standard"}</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 font-bold uppercase block">Current Status</span>
                <span className="font-bold text-[#541223] uppercase text-[11px]">{selectedLead.status}</span>
              </div>
            </div>

            {/* Conversation Messages */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-3.5 bg-[#F9F7F5]">
              <div className="text-center my-2">
                <span className="px-3 py-1 rounded-full bg-white text-[11px] font-semibold text-stone-400 border border-stone-200 shadow-2xs">
                  Transcript Captured from Storefront Chatbot
                </span>
              </div>

              {selectedLead.conversation_transcript && selectedLead.conversation_transcript.length > 0 ? (
                selectedLead.conversation_transcript.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${
                      msg.sender === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 px-1 text-[11px] text-stone-400 font-medium">
                      {msg.sender === "user" ? (
                        <>
                          <span>Customer ({selectedLead.customer_name})</span>
                          <User className="w-3 h-3 text-stone-500" />
                        </>
                      ) : (
                        <>
                          <Bot className="w-3 h-3 text-[#541223]" />
                          <span>Rooh AI Stylist</span>
                        </>
                      )}
                      <span>&bull;</span>
                      <span>{msg.time}</span>
                    </div>

                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm whitespace-pre-wrap leading-relaxed shadow-xs ${
                        msg.sender === "user"
                          ? "bg-[#541223] text-white rounded-tr-xs"
                          : "bg-white text-stone-800 rounded-tl-xs border border-stone-200"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-stone-400">
                  <p className="text-sm">No transcript recorded for this lead.</p>
                  <p className="text-xs text-stone-400 mt-1">
                    Customer request notes: "{selectedLead.notes}"
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer / WhatsApp Direct Action */}
            <div className="p-4 bg-white border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-stone-600">Update Lead:</span>
                <select
                  value={selectedLead.status}
                  onChange={(e) =>
                    handleStatusChange(selectedLead.id, e.target.value as ChatLead["status"])
                  }
                  className="px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-stone-300 focus:outline-none focus:border-[#541223]"
                >
                  <option value="new">New Inquiry</option>
                  <option value="contacted">Contacted</option>
                  <option value="in_discussion">In Discussion</option>
                  <option value="quote_sent">Quote Sent</option>
                  <option value="converted">Converted to Order</option>
                  <option value="closed">Closed / Lost</option>
                </select>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href={getWhatsAppLink(selectedLead.customer_phone, selectedLead.customer_name, selectedLead.product_name)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                  <span>Send Design Mockup on WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setSelectedLead(null)}
                  className="px-4 py-2 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-50 font-semibold text-xs"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
