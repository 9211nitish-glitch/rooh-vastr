"use client";

import React, { useState } from "react";
import { MessageCircle, Mail, MapPin, Phone, Clock, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Custom Order Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919654861504";

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#242124] py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-[#6D1835] mb-2 block">
            We Are Here For You
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#242124]">
            Connect With Our Studio
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-3 leading-relaxed">
            Have questions about a bespoke custom print, corporate bulk order, or tracking your delivery? Our friendly artisans and customer care team are ready to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Direct Channels */}
          <div className="space-y-6">
            <div className="p-8 rounded-3xl bg-white border border-[#EAE0D5] shadow-xs space-y-6">
              <h2 className="font-serif text-xl font-bold text-[#6D1835]">
                Direct Contacts
              </h2>

              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi Rooh Vastr! I would like to inquire about a personalized order.")}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200/60 text-emerald-900 hover:bg-emerald-100/60 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-xs">WhatsApp Concierge</h3>
                  <p className="text-[11px] text-emerald-700">Fastest response for custom proofs</p>
                </div>
              </a>

              <div className="space-y-4 pt-2 text-xs text-gray-600">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#6D1835] shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-semibold text-gray-900">Email</span>
                    <span>support@roohvastr.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#6D1835] shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-semibold text-gray-900">Phone Support</span>
                    <span>+91 96548 61504</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#6D1835] shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-semibold text-gray-900">Studio Hours</span>
                    <span>Monday – Saturday: 10:00 AM – 7:00 PM IST</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#6D1835] shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-semibold text-gray-900">Studio Headquarters</span>
                    <span>Rooh Vastr Creative Studio, South Extension, New Delhi 110049, India</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#EAE0D5] shadow-xs">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-gray-900">
                    Message Received With Gratitude
                  </h3>
                  <p className="text-xs text-gray-600 max-w-md mx-auto leading-relaxed">
                    Thank you, {formData.name}. Our studio team has received your message and will review it. You can expect a response within 2–4 business hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", phone: "", subject: "Custom Order Inquiry", message: "" });
                    }}
                    className="text-xs text-[#6D1835] font-semibold underline underline-offset-4 pt-2"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h2 className="font-serif text-2xl font-bold text-[#6D1835]">
                    Send Us a Message
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Aarav Sharma"
                        className="w-full text-xs rounded-xl border border-[#EAE0D5] bg-[#FAF7F2] p-3 focus:bg-white focus:border-[#6D1835] outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="aarav@example.com"
                        className="w-full text-xs rounded-xl border border-[#EAE0D5] bg-[#FAF7F2] p-3 focus:bg-white focus:border-[#6D1835] outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Phone / WhatsApp (Optional)
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full text-xs rounded-xl border border-[#EAE0D5] bg-[#FAF7F2] p-3 focus:bg-white focus:border-[#6D1835] outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Nature of Inquiry
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full text-xs rounded-xl border border-[#EAE0D5] bg-[#FAF7F2] p-3 focus:bg-white focus:border-[#6D1835] outline-none transition-colors"
                      >
                        <option>Custom Order Inquiry</option>
                        <option>Order Status & Tracking</option>
                        <option>Corporate & Bulk Gifting</option>
                        <option>Artwork & Proof Approval</option>
                        <option>General Feedback / Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Your Message or Custom Request Details *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us what you have in mind—text for embroidery, placement, quantity, or specific questions..."
                      className="w-full text-xs rounded-xl border border-[#EAE0D5] bg-[#FAF7F2] p-3 focus:bg-white focus:border-[#6D1835] outline-none transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#6D1835] text-white text-xs font-semibold hover:bg-[#4F1026] transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Send className="w-4 h-4" />
                    Submit Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
