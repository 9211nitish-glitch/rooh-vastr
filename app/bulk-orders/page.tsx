'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Package, 
  Clock, 
  ShieldCheck, 
  Award, 
  ArrowRight,
  MessageCircle,
  Truck
} from 'lucide-react';

export default function BulkOrdersPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    productCategory: 'Apparel (T-Shirts / Hoodies)',
    estimatedQuantity: '50-100 pcs',
    deliveryDate: '',
    specifications: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Rooh Vastr Team! We are looking for a bulk/corporate order quote.\n` +
    `Company: ${formData.companyName || 'Corporate Inquiry'}\n` +
    `Quantity: ${formData.estimatedQuantity}\n` +
    `Category: ${formData.productCategory}`
  );

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#6D1835]/10 text-[#6D1835] text-xs font-semibold tracking-widest uppercase mb-4">
            <Building2 className="w-3.5 h-3.5" /> Corporate Gifting & Bulk Atelier
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#242124] font-medium tracking-tight mb-6">
            Elevate Your Brand With Soulful Merch
          </h1>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-light">
            From luxury employee onboarding kits and executive milestone gifts to college fest apparel and high-density custom embroidered hoodies. Custom craft, volume pricing, and white-glove doorstep delivery.
          </p>
        </div>

        {/* Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-[#6D1835]/10 text-[#6D1835] flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-[#242124] mb-2">Heritage Fabrics</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              220-280 GSM super-combed bio-washed cotton, heavy French terry, and anti-shrink ring-spun fibers.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-[#6D1835]/10 text-[#6D1835] flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-[#242124] mb-2">Pantone Precision</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              HD DTF, screen printing, gold foil accents, and high-density Japanese thread embroidery matching your exact brand guidelines.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-[#6D1835]/10 text-[#6D1835] flex items-center justify-center mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-[#242124] mb-2">24h Digital Proofs</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Receive 2D/3D mockups and pre-production physical swatches before full run commitment.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-[#6D1835]/10 text-[#6D1835] flex items-center justify-center mb-4">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-[#242124] mb-2">Pan-India Dispatch</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Multi-address direct dispatch to employee homes or single consolidated delivery with insured freight.
            </p>
          </div>
        </div>

        {/* Tier Pricing Cards */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-stone-200 shadow-sm mb-16">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#6D1835] block mb-2">Transparent Tiers</span>
            <h2 className="font-serif text-3xl text-[#242124]">Volume Tier Savings</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-stone-200 rounded-2xl p-6 bg-stone-50/50 hover:border-[#6D1835]/40 transition-all">
              <div className="text-xs uppercase font-semibold text-stone-500 mb-1">Starter Batch</div>
              <div className="font-serif text-2xl text-[#242124] font-medium mb-1">25 – 49 Units</div>
              <div className="text-sm font-semibold text-[#6D1835] mb-4">Up to 15% Off Retail</div>
              <ul className="text-xs text-stone-600 space-y-2 mb-6">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Free 2D Digital Mockup</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Custom individual recipient names</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Standard 5-7 day dispatch</li>
              </ul>
              <a
                href={`https://wa.me/919654861504?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-[#242124]/20 text-xs font-semibold uppercase tracking-wider text-[#242124] hover:bg-[#6D1835] hover:text-white hover:border-[#6D1835] transition-all"
              >
                Inquire Tier
              </a>
            </div>

            <div className="border-2 border-[#6D1835] rounded-2xl p-6 bg-white relative shadow-lg">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#6D1835] text-white text-[10px] font-bold uppercase tracking-widest py-1 px-3 rounded-full">
                Most Popular
              </div>
              <div className="text-xs uppercase font-semibold text-stone-500 mb-1">Scale & Teams</div>
              <div className="font-serif text-2xl text-[#242124] font-medium mb-1">50 – 199 Units</div>
              <div className="text-sm font-semibold text-[#6D1835] mb-4">Up to 25% Off Retail</div>
              <ul className="text-xs text-stone-600 space-y-2 mb-6">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Free Physical Fabric Sample</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Custom Luxury Box Packing</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Dedicated Key Account Manager</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Express 3-5 day dispatch option</li>
              </ul>
              <a
                href={`https://wa.me/919654861504?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#6D1835] text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#56132a] transition-all shadow-md"
              >
                Inquire Tier
              </a>
            </div>

            <div className="border border-stone-200 rounded-2xl p-6 bg-stone-50/50 hover:border-[#6D1835]/40 transition-all">
              <div className="text-xs uppercase font-semibold text-stone-500 mb-1">Enterprise & Fests</div>
              <div className="font-serif text-2xl text-[#242124] font-medium mb-1">200+ Units</div>
              <div className="text-sm font-semibold text-[#6D1835] mb-4">Wholesale Direct Contract</div>
              <ul className="text-xs text-stone-600 space-y-2 mb-6">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Custom Garment Pattern & Dyeing</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Multi-location individual courier</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Priority production slot</li>
              </ul>
              <a
                href={`https://wa.me/919654861504?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-[#242124]/20 text-xs font-semibold uppercase tracking-wider text-[#242124] hover:bg-[#6D1835] hover:text-white hover:border-[#6D1835] transition-all"
              >
                Inquire Tier
              </a>
            </div>
          </div>
        </div>

        {/* Interactive Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-serif text-3xl text-[#242124]">Request a Rapid Quotation</h2>
            <p className="text-sm text-stone-600 leading-relaxed font-light">
              Submit your project scope, product choices, and timeline. Our dedicated corporate curator will revert within 2 business hours with itemized pricing, swatch options, and digital proofs.
            </p>

            <div className="bg-[#6D1835]/5 border border-[#6D1835]/20 rounded-2xl p-6">
              <h4 className="font-serif text-lg text-[#6D1835] font-semibold mb-2 flex items-center gap-2">
                <MessageCircle className="w-5 h-5" /> Need an instant response?
              </h4>
              <p className="text-xs text-stone-600 mb-4 leading-relaxed">
                Connect directly with our Lead Atelier Specialist on WhatsApp for instant pricing questions or urgent event deadlines.
              </p>
              <a
                href="https://wa.me/919654861504?text=Hi%20Rooh%20Vastr,%20I%20have%20an%20urgent%20corporate/bulk%20order%20inquiry."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white text-xs font-semibold tracking-wider uppercase px-5 py-3 rounded-full hover:bg-[#20ba59] transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4" /> Chat on WhatsApp Now
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200/90 shadow-lg">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#242124]">Inquiry Received with Gratitude</h3>
                  <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-semibold text-[#242124]">{formData.contactPerson || 'Valued Partner'}</span>. Your corporate inquiry has been logged in our master ledger. Our senior curator will reach out at <span className="font-semibold text-[#6D1835]">{formData.email}</span> within 2 business hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="inline-block mt-4 text-xs font-semibold text-[#6D1835] underline uppercase tracking-wider hover:opacity-80"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Acme Corp / IIT Delhi"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full text-xs px-4 py-3 rounded-xl border border-stone-200 bg-[#FAF7F2]/40 focus:outline-none focus:border-[#6D1835] transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                        Contact Person Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ananya Sharma"
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                        className="w-full text-xs px-4 py-3 rounded-xl border border-stone-200 bg-[#FAF7F2]/40 focus:outline-none focus:border-[#6D1835] transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                        Work Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="ananya@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full text-xs px-4 py-3 rounded-xl border border-stone-200 bg-[#FAF7F2]/40 focus:outline-none focus:border-[#6D1835] transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                        WhatsApp / Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 96548 61504"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full text-xs px-4 py-3 rounded-xl border border-stone-200 bg-[#FAF7F2]/40 focus:outline-none focus:border-[#6D1835] transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                        Product of Interest
                      </label>
                      <select
                        value={formData.productCategory}
                        onChange={(e) => setFormData({ ...formData, productCategory: e.target.value })}
                        className="w-full text-xs px-4 py-3 rounded-xl border border-stone-200 bg-[#FAF7F2]/40 focus:outline-none focus:border-[#6D1835] transition-all"
                      >
                        <option>Apparel (T-Shirts / Polos / Hoodies)</option>
                        <option>Drinkware (Ceramic Mugs / Insulated Bottles)</option>
                        <option>Desk & Keepsake (Acrylic Frames / Coasters)</option>
                        <option>Curated Welcome & Swag Kits</option>
                        <option>Custom Mix & Match Gifting</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                        Estimated Quantity
                      </label>
                      <select
                        value={formData.estimatedQuantity}
                        onChange={(e) => setFormData({ ...formData, estimatedQuantity: e.target.value })}
                        className="w-full text-xs px-4 py-3 rounded-xl border border-stone-200 bg-[#FAF7F2]/40 focus:outline-none focus:border-[#6D1835] transition-all"
                      >
                        <option>25 – 49 Units</option>
                        <option>50 – 99 Units</option>
                        <option>100 – 249 Units</option>
                        <option>250 – 500 Units</option>
                        <option>500+ Units (Enterprise)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Required By Date (Optional)
                    </label>
                    <input
                      type="date"
                      value={formData.deliveryDate}
                      onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                      className="w-full text-xs px-4 py-3 rounded-xl border border-stone-200 bg-[#FAF7F2]/40 focus:outline-none focus:border-[#6D1835] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Customization Details & Branding Notes
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about your logo placement, packaging needs, or specific fabric requirements..."
                      value={formData.specifications}
                      onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
                      className="w-full text-xs px-4 py-3 rounded-xl border border-stone-200 bg-[#FAF7F2]/40 focus:outline-none focus:border-[#6D1835] transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-full bg-[#6D1835] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#56132a] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <Send className="w-4 h-4" /> Submit For Free Quote & Digital Mockup
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
