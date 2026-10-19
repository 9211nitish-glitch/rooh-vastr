import React from "react";
import { Scale, CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Terms of Service | ROOH VASTR",
  description: "Terms and conditions governing the purchase of personalized gifts, custom printing services, and ready-to-wear apparel on ROOH VASTR.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#242124] py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <span className="text-xs font-bold tracking-widest uppercase text-[#6D1835] mb-2 block">
          Legal Agreement
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#242124] mb-4">
          Terms of Service
        </h1>
        <p className="text-xs text-gray-500 mb-10">Last updated: October 2026</p>

        <div className="space-y-8 text-xs sm:text-sm text-gray-700 leading-relaxed bg-white p-8 sm:p-12 rounded-3xl border border-[#EAE0D5] shadow-xs">
          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#6D1835] flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#6D1835]" />
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing the ROOH VASTR website or submitting orders for ready-to-wear or bespoke personalized merchandise, you agree to comply with and be bound by these Terms of Service and all applicable laws of India.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#6D1835] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#6D1835]" />
              2. Custom Artwork & Intellectual Property Rights
            </h2>
            <p>
              When uploading photographs, corporate logos, or custom graphics for bespoke printing:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
              <li>You warrant that you own or possess legal rights/licenses to reproduce the submitted materials.</li>
              <li>You agree not to submit unlawful, infringing, obscene, or defamatory content. ROOH VASTR reserves the absolute right to decline production of offensive material.</li>
              <li>ROOH VASTR retains all copyright in its proprietary brand typography, site layouts, original graphic lines, and catalog designs.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#6D1835] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#6D1835]" />
              3. Proof Approvals & Manufacturing Tolerance
            </h2>
            <p>
              For bespoke print orders, production proceeds only upon digital approval of the 2D mockup sent via WhatsApp or email. Due to differences in monitor color calibration (RGB) versus physical garment textile inks (CMYK), slight color variances within commercial industry tolerances (±5%) are normal and acceptable.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#6D1835] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#6D1835]" />
              4. Governing Law & Jurisdiction
            </h2>
            <p>
              These terms are governed by and construed in accordance with the laws of India. Any disputes arising in connection with orders shall be subject to the exclusive jurisdiction of the competent courts in New Delhi, India.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
