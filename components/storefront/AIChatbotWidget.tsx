"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Sparkles,
  MessageSquare,
  X,
  Send,
  Phone,
  CheckCircle2,
  Package,
  HelpCircle,
  Gift,
  ExternalLink,
  Bot,
  User,
  ShoppingBag,
  RefreshCw,
  Clock,
  ArrowRight
} from "lucide-react";
import { ChatLead, ChatMessage } from "@/lib/types";

const WHATSAPP_NUM = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919654861504";

// Helper to render chat message cleanly without raw markdown ** stars
function renderFormattedMessage(text: string, isUser: boolean) {
  if (!text) return null;
  const lines = text.split("\n");

  return lines.map((line, lineIdx) => {
    const trimmed = line.trim();
    if (!trimmed) {
      return <div key={lineIdx} className="h-1.5" />;
    }

    const isBullet = trimmed.startsWith("• ") || trimmed.startsWith("- ") || trimmed.startsWith("* ");
    const cleanLine = isBullet ? trimmed.replace(/^([•\-\*]\s*)/, "") : line;

    // Parse **bold text**
    const segments = cleanLine.split(/(\*\*.*?\*\*)/g);

    const formattedContent = segments.map((seg, segIdx) => {
      if (seg.startsWith("**") && seg.endsWith("**") && seg.length > 4) {
        const inner = seg.slice(2, -2);
        return (
          <strong
            key={segIdx}
            className={`font-semibold ${isUser ? "text-white" : "text-stone-950 font-bold"}`}
          >
            {inner}
          </strong>
        );
      }
      return <span key={segIdx}>{seg}</span>;
    });

    if (isBullet) {
      return (
        <div key={lineIdx} className="flex items-start gap-1.5 my-1">
          <span className={`text-[11px] leading-tight mt-0.5 ${isUser ? "text-stone-200" : "text-[#541223] font-bold"}`}>•</span>
          <div className="flex-1">{formattedContent}</div>
        </div>
      );
    }

    return (
      <div key={lineIdx} className={lineIdx > 0 ? "mt-1" : ""}>
        {formattedContent}
      </div>
    );
  });
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "msg-welcome-1",
    sender: "bot",
    text: "Namaste! 🙏 Rooh Vastr AI Assistant me aapka swagat hai. Personalized gifts, live rates ya custom orders ke liye batayein!",
    time: "Just now",
    quickActions: [
      "Suggest a Gift 🎁",
      "Custom T-Shirt (₹499) 👕",
      "Magic Photo Mug (₹499) ☕",
      "Delivery & COD 🚚",
      "Place Custom Order 📝",
    ],
    products: [
      {
        id: "prod-mug-1",
        name: "Personalized Photo Mug",
        slug: "personalized-photo-mug",
        price: 399,
        regular_price: 599,
        primary_image: "/images/products/photo-mug.jpg",
        category_name: "Mugs",
      },
      {
        id: "prod-tshirt-1",
        name: "Classic Custom Cotton T-Shirt",
        slug: "custom-tshirt",
        price: 499,
        regular_price: 799,
        primary_image: "/images/products/custom-tshirt.jpg",
        category_name: "Apparel",
      },
      {
        id: "prod-hoodie-1",
        name: "Custom Winter Hoodie",
        slug: "custom-hoodie",
        price: 999,
        regular_price: 1499,
        primary_image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80",
        category_name: "Apparel",
      },
    ],
  },
];

export default function AIChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [leadSuccess, setLeadSuccess] = useState<ChatLead | null>(null);

  // Quick Order/Lead Form State
  const [orderForm, setOrderForm] = useState({
    name: "",
    phone: "",
    email: "",
    product: "Personalized Photo Mug",
    notes: "",
    city: "",
  });
  const [formSubmitting, setFormSubmitting] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Load chat history and local leads from localStorage
  useEffect(() => {
    try {
      const savedMsgs = localStorage.getItem("rooh_chatbot_history");
      if (savedMsgs) {
        const parsed = JSON.parse(savedMsgs);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Save chat history
  const saveChatHistory = (newMsgs: ChatMessage[]) => {
    try {
      localStorage.setItem("rooh_chatbot_history", JSON.stringify(newMsgs.slice(-20)));
    } catch {
      // ignore
    }
  };

  // Send message
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    const timeNow = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text,
      time: timeNow,
    };

    const updatedMsgs = [...messages, userMsg];
    setMessages(updatedMsgs);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMsgs.map((m) => ({ sender: m.sender, text: m.text })),
          latestMessage: text,
        }),
      });

      const data = await res.json();
      const botReply = data.reply || "Aapka message note kar liya hai! Hum jald hi aapse WhatsApp par connect karenge.";

      const botMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: "bot",
        text: botReply,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        quickActions: data.quickActions || ["Suggest a Gift 🎁", "Place Order 📝", "Chat on WhatsApp 💬"],
        leadPrompt: data.leadPrompt || false,
        products: data.products || [],
      };

      const finalMsgs = [...updatedMsgs, botMsg];
      setMessages(finalMsgs);
      saveChatHistory(finalMsgs);

      // If lead was extracted from conversation (e.g. phone number detected)
      if (data.leadExtracted?.phone) {
        saveLeadDirectly({
          customer_name: orderForm.name || "Storefront Visitor",
          customer_phone: data.leadExtracted.phone,
          product_name: orderForm.product || "Chatbot Custom Inquiry",
          customization_notes: `Detected from message: "${text}"`,
          transcript: finalMsgs.map((m) => ({ sender: m.sender, text: m.text, time: m.time })),
        });
      }
    } catch (err) {
      console.error(err);
      const fallbackMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: "bot",
        text: "Hamare server se connect hone me samay lag raha hai, par aap hamari chief designer team se direct WhatsApp par bhi connect kar sakte hain!",
        time: "Just now",
        quickActions: ["Chat on WhatsApp 💬", "Try Again 🔄"],
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to save a lead to server + localStorage
  const saveLeadDirectly = async (leadPayload: {
    customer_name: string;
    customer_phone: string;
    customer_email?: string;
    product_name?: string;
    customization_notes?: string;
    budget?: string;
    city?: string;
    transcript?: Array<{ sender: "user" | "bot"; text: string; time?: string }>;
  }) => {
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...leadPayload,
          source: "AI Chatbot",
          inquiry_type: "order_request",
        }),
      });
      const data = await res.json();
      if (data.success && data.lead) {
        setLeadSuccess(data.lead);

        // Also save to localStorage for instant admin sync
        try {
          const current = localStorage.getItem("rooh_chatbot_leads");
          const parsed: ChatLead[] = current ? JSON.parse(current) : [];
          localStorage.setItem("rooh_chatbot_leads", JSON.stringify([data.lead, ...parsed]));
        } catch {
          // ignore
        }
      }
    } catch (e) {
      console.error("Failed to post lead", e);
    }
  };

  // Handle Quick Order Form Submit
  const handleOrderFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderForm.name || !orderForm.phone) return;

    setFormSubmitting(true);
    await saveLeadDirectly({
      customer_name: orderForm.name,
      customer_phone: orderForm.phone,
      customer_email: orderForm.email,
      product_name: orderForm.product,
      customization_notes: orderForm.notes,
      city: orderForm.city,
      transcript: messages.map((m) => ({ sender: m.sender, text: m.text, time: m.time })),
    });

    setFormSubmitting(false);
    setShowOrderModal(false);

    // Add confirmation in chat
    const confirmMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "bot",
      text: `🎉 **Order Inquiry Registered!**\n\nDhanyawad **${orderForm.name}** ji! Aapki **${orderForm.product}** ki custom inquiry hamare Admin CRM me successfully transmit ho gayi hai.\n\n📲 Hamari designer team **15 minutes ke andar** aapse **${orderForm.phone}** par contact karegi aur free 3D design preview dikhayegi.`,
      time: "Just now",
      quickActions: ["Chat on WhatsApp Now 💬", "Ask Another Question ❓", "View Shop 🛍️"],
    };
    const updated = [...messages, confirmMsg];
    setMessages(updated);
    saveChatHistory(updated);
  };

  const handleResetChat = () => {
    setMessages(INITIAL_MESSAGES);
    setLeadSuccess(null);
    try {
      localStorage.removeItem("rooh_chatbot_history");
    } catch {
      // ignore
    }
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-24 right-4 sm:bottom-20 sm:right-6 md:bottom-8 md:right-8 z-40 flex flex-col items-end gap-2.5">
        {/* Pulsing prompt chip when closed */}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#F0E6DD] text-xs font-semibold text-[#541223] shadow-md hover:shadow-lg transition-all hover:scale-105 animate-bounce"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Chat with AI & Order Gifts</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          </button>
        )}

        {/* Primary Launcher Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
          className={`w-13 h-13 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 ${
            isOpen
              ? "bg-[#242124] rotate-90"
              : "bg-gradient-to-tr from-[#541223] via-[#6D1835] to-[#8A1F44] hover:shadow-2xl border-2 border-[#D4AF37]/40 ring-4 ring-[#541223]/20"
          }`}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <div className="relative">
              <Bot className="w-7 h-7 text-amber-100" />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#541223]" />
            </div>
          )}
        </button>
      </div>

      {/* Floating Chat Modal / Drawer */}
      {isOpen && (
        <div className="fixed inset-x-3 bottom-24 sm:bottom-24 sm:right-6 sm:left-auto sm:w-[400px] h-[550px] sm:h-[580px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-stone-200 z-50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#541223] via-[#6D1835] to-[#541223] text-white px-4 py-3.5 flex items-center justify-between border-b border-[#7B1B3C]">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#541223]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif font-bold text-sm tracking-wide">Rooh AI Concierge</h3>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#D4AF37] text-[#242124]">
                    AI 24/7
                  </span>
                </div>
                <p className="text-[11px] text-stone-200 flex items-center gap-1">
                  <span>Gift Stylist & Order Desk</span>
                  <span>•</span>
                  <span className="text-emerald-300 font-medium">Online</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                title="Restart Chat"
                className="p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close Chat"
                className="p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Notice Banner */}
          <div className="bg-[#FAF4EE] px-3.5 py-1.5 border-b border-[#F0E6DD] flex items-center justify-between text-[11px] text-stone-700">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#541223]" />
              <span>Ask gift ideas, rates or place custom orders</span>
            </span>
            <button
              onClick={() => setShowOrderModal(true)}
              className="font-bold text-[#541223] hover:underline flex items-center gap-0.5"
            >
              <span>Place Order 📝</span>
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#FDFBF7]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-[13px] leading-relaxed shadow-sm ${
                    msg.sender === "user"
                      ? "bg-[#541223] text-white rounded-br-xs"
                      : "bg-white text-stone-800 border border-[#EFE5DB] rounded-bl-xs"
                  }`}
                >
                  <div className="leading-relaxed">
                    {renderFormattedMessage(msg.text, msg.sender === "user")}
                  </div>
                  {msg.time && (
                    <div
                      className={`text-[9px] mt-1 text-right ${
                        msg.sender === "user" ? "text-stone-300" : "text-stone-400"
                      }`}
                    >
                      {msg.time}
                    </div>
                  )}
                </div>

                {/* Interactive Product Cards if products are attached */}
                {msg.sender === "bot" && msg.products && msg.products.length > 0 && (
                  <div className="mt-2.5 w-full max-w-[95%] space-y-1.5">
                    <div className="flex items-center justify-between px-1">
                      <span className="text-[10px] font-bold text-stone-600 uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                        <span>Recommended Gifts</span>
                      </span>
                      <span className="text-[10px] text-stone-400">Click to view & customize</span>
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-1.5 pt-0.5 max-w-full scrollbar-thin scrollbar-thumb-stone-300">
                      {msg.products.map((prod) => (
                        <Link
                          key={prod.id}
                          href={`/product/${prod.slug}`}
                          onClick={() => setIsOpen(false)}
                          className="shrink-0 w-36 sm:w-40 bg-white hover:bg-stone-50 rounded-xl border border-stone-200/90 hover:border-[#541223] shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col group text-left"
                        >
                          <div className="relative w-full h-24 bg-stone-100 overflow-hidden">
                            {prod.primary_image ? (
                              <img
                                src={prod.primary_image}
                                alt={prod.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-stone-200 text-stone-400">
                                <Gift className="w-6 h-6" />
                              </div>
                            )}
                            {prod.category_name && (
                              <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded text-[8px] font-bold bg-[#541223]/90 text-white backdrop-blur-xs">
                                {prod.category_name}
                              </span>
                            )}
                          </div>
                          <div className="p-2 flex-1 flex flex-col justify-between">
                            <div>
                              <h5 className="font-semibold text-[11px] text-stone-900 line-clamp-1 group-hover:text-[#541223] transition-colors">
                                {prod.name}
                              </h5>
                              <div className="flex items-baseline gap-1 mt-0.5">
                                <span className="font-bold text-xs text-[#541223]">
                                  ₹{prod.price}
                                </span>
                                {prod.regular_price && prod.regular_price > prod.price && (
                                  <span className="text-[9px] text-stone-400 line-through">
                                    ₹{prod.regular_price}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="mt-2 pt-1.5 border-t border-stone-100 flex items-center justify-between text-[10px] font-semibold text-[#541223] group-hover:text-[#8A1F44]">
                              <span>View Product</span>
                              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Action Chips for bot messages */}
                {msg.sender === "bot" && msg.quickActions && msg.quickActions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[95%]">
                    {msg.quickActions.map((action, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          if (action.includes("Place") || action.includes("Order Details")) {
                            setShowOrderModal(true);
                          } else if (action.includes("WhatsApp")) {
                            window.open(
                              `https://wa.me/${WHATSAPP_NUM}?text=Hi%20Rooh%20Vastr%2C%20I%20am%20chatting%20with%20your%20AI%20Assistant%20and%20want%20to%20customize%20a%20gift!`,
                              "_blank"
                            );
                          } else {
                            handleSendMessage(action);
                          }
                        }}
                        className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-white hover:bg-[#FAF4EE] border border-[#EFE5DB] text-[#541223] hover:border-[#541223] transition-all shadow-xs"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex items-center gap-1.5 text-stone-500 bg-white border border-[#EFE5DB] rounded-2xl px-3.5 py-2 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-[#541223] animate-pulse" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#541223] animate-pulse delay-150" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#541223] animate-pulse delay-300" />
                <span className="text-[11px] text-stone-400 ml-1">Rooh AI is thinking...</span>
              </div>
            )}

            {/* Lead Success Banner in Chat */}
            {leadSuccess && (
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Lead Shared with Admin (#{leadSuccess.id})</span>
                </div>
                <p className="text-[11px] text-emerald-700">
                  Our chief designer will message you on WhatsApp at <b>{leadSuccess.customer_phone}</b>.
                </p>
                <a
                  href={`https://wa.me/${WHATSAPP_NUM}?text=Hi%20Rooh%20Vastr%2C%20I%20placed%20inquiry%20%23${leadSuccess.id}%20for%20${encodeURIComponent(
                    leadSuccess.product_name || "Gift"
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 hover:underline"
                >
                  <span>Open WhatsApp Directly</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Lead Capture Popup Modal if user clicks "Place Order" */}
          {showOrderModal && (
            <div className="absolute inset-x-2 bottom-14 top-14 bg-white/98 backdrop-blur-md border border-[#EFE5DB] rounded-2xl p-4 shadow-xl z-20 flex flex-col justify-between overflow-y-auto">
              <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                <div className="flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-[#541223]" />
                  <h4 className="font-serif font-bold text-xs text-[#242124]">
                    Place Order / Inquiry Request
                  </h4>
                </div>
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="text-stone-400 hover:text-stone-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleOrderFormSubmit} className="space-y-2.5 my-auto text-xs py-2">
                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-0.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={orderForm.name}
                    onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:border-[#541223]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-0.5">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 96548 61504"
                    value={orderForm.phone}
                    onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:border-[#541223]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-0.5">
                    Select Product
                  </label>
                  <select
                    value={orderForm.product}
                    onChange={(e) => setOrderForm({ ...orderForm, product: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:border-[#541223]"
                  >
                    <option value="Personalized Photo Mug">Personalized Photo Mug (₹399)</option>
                    <option value="Magic Heat-Reveal Mug">Magic Heat-Reveal Mug (₹499)</option>
                    <option value="Custom 240 GSM Oversized T-Shirt">Custom 240 GSM Oversized T-Shirt (₹699)</option>
                    <option value="Custom Winter Hoodie">Custom Winter Hoodie (₹1,299)</option>
                    <option value="Acrylic Spotify Scannable Plaque">Acrylic Spotify Scannable Plaque (₹599)</option>
                    <option value="Custom Memory Velvet Cushion">Custom Memory Velvet Cushion (₹499)</option>
                    <option value="Bulk / Corporate Order">Bulk / Corporate Order Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-0.5">
                    Customization Idea / Notes
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Photo printing details, anniversary quote, sizes, or special request..."
                    value={orderForm.notes}
                    onChange={(e) => setOrderForm({ ...orderForm, notes: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:border-[#541223]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-0.5">
                    City / Pincode
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mumbai, 400001"
                    value={orderForm.city}
                    onChange={(e) => setOrderForm({ ...orderForm, city: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:border-[#541223]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="w-full py-2 bg-[#541223] hover:bg-[#6D1835] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-md mt-2"
                >
                  {formSubmitting ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <>
                      <span>Submit Request to Admin Desk</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Chat Input Bar */}
          <div className="p-3 bg-white border-t border-stone-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask about gifts, prices, or share your number..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className="flex-1 bg-[#FAF7F2] border border-[#EFE5DB] rounded-full px-4 py-2 text-xs focus:outline-none focus:border-[#541223] text-stone-800 placeholder-stone-400"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-9 h-9 rounded-full bg-[#541223] hover:bg-[#6D1835] disabled:opacity-40 text-white flex items-center justify-center transition-all shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-stone-400">
              <span>Powered by Gemini & Rooh Studio</span>
              <a
                href={`https://wa.me/${WHATSAPP_NUM}`}
                target="_blank"
                rel="noreferrer"
                className="text-[#541223] font-semibold hover:underline flex items-center gap-0.5"
              >
                <span>WhatsApp Desk</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
