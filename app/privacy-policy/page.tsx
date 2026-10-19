import React from "react";
import { Lock, Eye, FileText, Database } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | ROOH VASTR",
  description: "Learn how ROOH VASTR protects your personal data, custom photos, design artwork, and payment privacy.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#242124] py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <span className="text-xs font-bold tracking-widest uppercase text-[#6D1835] mb-2 block">
          Your Privacy Matters
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#242124] mb-4">
          Privacy Policy
        </h1>
        <p className="text-xs text-gray-500 mb-10">Effective Date: October 2026</p>

        <div className="space-y-8 text-xs sm:text-sm text-gray-700 leading-relaxed bg-white p-8 sm:p-12 rounded-3xl border border-[#EAE0D5] shadow-xs">
          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#6D1835] flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#6D1835]" />
              1. Information We Collect
            </h2>
            <p>
              When you visit ROOH VASTR or place an order, we collect information necessary to fulfill your purchases and customize your bespoke pieces:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
              <li><strong>Contact & Shipping Details:</strong> Name, delivery address, phone number, and email.</li>
              <li><strong>Personalization Assets:</strong> Custom text, dates, names, logos, and personal photographs submitted for custom printing.</li>
              <li><strong>Transaction Data:</strong> Razorpay payment identifiers, order histories, and coupon usages. (We never store raw credit card numbers or banking passwords).</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#6D1835] flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#6D1835]" />
              2. Protection of Personal Photos & Custom Designs
            </h2>
            <p>
              We treat your uploaded family portraits, couple photographs, and proprietary company logos with the utmost confidentiality:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
              <li>Your photos are used exclusively for manufacturing your custom merchandise and rendering your 2D proof.</li>
              <li>We <strong>never publish or showcase</strong> your personal customer photographs on social media or marketing materials without your explicit, written consent.</li>
              <li>Raw image files are automatically archived and scrubbed from our active print servers 60 days post-fulfillment.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#6D1835] flex items-center gap-2">
              <Database className="w-4 h-4 text-[#6D1835]" />
              3. Data Retention & Security
            </h2>
            <p>
              All customer records are transmitted over encrypted TLS 1.3 connections and stored in compliance with Indian IT Act rules and best security standards.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#6D1835] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#6D1835]" />
              4. Contact the Data Protection Officer
            </h2>
            <p>
              If you wish to view, update, or request deletion of your personal information from our systems, contact our studio privacy desk at <strong>privacy@roohvastr.com</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
