import React from "react";
import { RotateCcw, AlertCircle, CheckCircle, ShieldAlert } from "lucide-react";

export const metadata = {
  title: "Returns & Exchanges Policy | ROOH VASTR",
  description: "Understand our 7-day hassle-free return policy for ready-to-wear pieces and replacement guarantees for damaged bespoke orders.",
};

export default function ReturnsRefundsPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#242124] py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <span className="text-xs font-bold tracking-widest uppercase text-[#6D1835] mb-2 block">
          Customer Protection
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#242124] mb-4">
          Returns & Refunds Policy
        </h1>
        <p className="text-xs text-gray-500 mb-10">Last updated: October 2026</p>

        <div className="space-y-10 text-xs sm:text-sm text-gray-700 leading-relaxed bg-white p-8 sm:p-12 rounded-3xl border border-[#EAE0D5] shadow-xs">
          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#6D1835] flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-[#6D1835]" />
              1. Ready-to-Wear Products (Standard Apparel & Catalog Items)
            </h2>
            <p>
              We offer a straightforward <strong>7-Day Return & Size Exchange Window</strong> for all standard ready-to-wear catalog merchandise (non-customized apparel).
            </p>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Item must be unused, unwashed, and in its original condition with all brand tags intact.</li>
              <li>Return request must be initiated within 7 calendar days of delivery.</li>
              <li>Free reverse pickup will be arranged at your doorstep once verified.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#6D1835] flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#6D1835]" />
              2. Bespoke Custom Print & Personalized Items (POD)
            </h2>
            <p>
              Due to the unique nature of custom-made merchandise featuring personal names, private photographs, custom dates, or company logos, personalized pieces <strong>cannot be returned or exchanged for a change of mind or buyer sizing error</strong>.
            </p>
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs">
              <p className="font-semibold mb-1 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
                Our Pre-Production Proof Guarantee:
              </p>
              We eliminate surprises by requiring customer verification of the 2D digital mockup via WhatsApp prior to printing. Production only begins once you approve the layout.
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#6D1835] flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#6D1835]" />
              3. Damaged or Defective Items Guarantee
            </h2>
            <p>
              If your order arrives damaged in transit, shows printing defects, or suffers from manufacturing flaws, ROOH VASTR provides an <strong>immediate 100% free reprint replacement or full refund</strong>.
            </p>
            <p>
              Please notify our WhatsApp support at <strong>+91 99999 99999</strong> or email <strong>support@roohvastr.com</strong> within 48 hours of delivery with clear photographs/video of the unboxing and defect.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#6D1835]">
              4. Refund Timelines
            </h2>
            <p>
              Once an approved return is picked up and passes inspection at our studio:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li><strong>Prepaid Orders (UPI/Cards):</strong> Refund credited back to original payment method within 3–5 business days.</li>
              <li><strong>COD Orders:</strong> Transferred directly to your designated bank account via secure NEFT/IMPS within 48 hours.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
