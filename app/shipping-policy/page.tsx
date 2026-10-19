import React from "react";
import { Truck, Clock, ShieldCheck, MapPin } from "lucide-react";

export const metadata = {
  title: "Shipping & Delivery Policy | ROOH VASTR",
  description: "Learn about ROOH VASTR's domestic shipping timelines, bespoke order production intervals, and packaging standards.",
};

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#242124] py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <span className="text-xs font-bold tracking-widest uppercase text-[#6D1835] mb-2 block">
          Transparency & Care
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#242124] mb-4">
          Shipping & Delivery Policy
        </h1>
        <p className="text-xs text-gray-500 mb-10">Last updated: October 2026</p>

        <div className="space-y-10 text-xs sm:text-sm text-gray-700 leading-relaxed bg-white p-8 sm:p-12 rounded-3xl border border-[#EAE0D5] shadow-xs">
          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#6D1835] flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#6D1835]" />
              1. Delivery Coverage & Shipping Charges
            </h2>
            <p>
              ROOH VASTR delivers to over 26,000 pincodes across India through premier courier partners including Blue Dart, Delhivery, and DTDC.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
              <li><strong>Orders ₹999 and above:</strong> Complimentary Free Standard Express Delivery across India.</li>
              <li><strong>Orders below ₹999:</strong> A nominal flat shipping charge of ₹99 applies at checkout.</li>
              <li><strong>Cash on Delivery (COD):</strong> An additional ₹49 convenience and carrier verification fee applies for COD shipments.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#6D1835] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#6D1835]" />
              2. Processing & Production Timelines
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE0D5]">
                <h3 className="font-semibold text-xs text-gray-900 mb-1">Ready-to-Wear Products</h3>
                <p className="text-xs text-gray-600">Dispatched from our central studio within 24–48 business hours after order confirmation.</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE0D5]">
                <h3 className="font-semibold text-xs text-gray-900 mb-1">Bespoke Custom Prints (POD)</h3>
                <p className="text-xs text-gray-600">2–4 business days for artisan design proof verification and precision printing prior to dispatch.</p>
              </div>
            </div>
            <p>
              Transit typically takes 3–5 business days for major metropolitan areas (Delhi NCR, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata, Pune) and 5–7 business days for other regional destinations.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#6D1835] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#6D1835]" />
              3. Packaging & Gift Presentation
            </h2>
            <p>
              Every garment and personalized keepsake is wrapped in acid-free tissue paper, accompanied by our signature authenticity care card, and delivered in weather-resistant luxury rigid boxes to ensure your feelings arrive undamaged.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#6D1835] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#6D1835]" />
              4. Order Tracking
            </h2>
            <p>
              Once your shipment is handed over to the logistics partner, an automated tracking link and AWB number are sent via WhatsApp and Email. You can also track status live anytime on our <a href="/track-order" className="text-[#6D1835] font-semibold underline underline-offset-2">Order Tracking Page</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
