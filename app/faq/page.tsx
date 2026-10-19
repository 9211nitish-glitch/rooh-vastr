'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  HelpCircle, 
  ChevronDown, 
  Sparkles, 
  Truck, 
  ShieldCheck, 
  RefreshCw, 
  CreditCard,
  MessageCircle,
  Search
} from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
  category: 'ordering' | 'custom' | 'shipping' | 'payments' | 'returns';
}

const faqs: FAQItem[] = [
  // Customization & Ordering
  {
    category: 'custom',
    q: 'How does the bespoke print-on-demand workflow operate at Rooh Vastr?',
    a: 'Unlike automated print shops that print low-res files blindly, our process is artisan-assisted. When you order a bespoke item, our design studio reviews your artwork, optimizes resolution and color profiles, and renders a realistic 2D digital mockup. We share this with you via WhatsApp or email for your explicit sign-off before a single drop of ink touches fabric.',
  },
  {
    category: 'custom',
    q: 'What artwork formats can I upload for personalized printing?',
    a: 'We accept high-resolution PNG, JPG, JPEG, PDF, SVG, AI, and PSD files. For best print fidelity on apparel and mugs, we recommend a resolution of 300 DPI with RGB or CMYK color profiling and transparent backgrounds for logos and typography.',
  },
  {
    category: 'custom',
    q: 'Can I request multiple design revisions before printing begins?',
    a: 'Absolutely. We offer up to 2 complimentary digital proof revisions. You can adjust text placement, font styling, scaling, and contrast during the WhatsApp artisan consultation.',
  },
  // Ordering
  {
    category: 'ordering',
    q: 'Can I send gifts directly to the recipient with a personalized handwritten note?',
    a: 'Yes! During checkout, simply enter your recipient’s address as the shipping address and enter your personal message in the "Gift Note" field. We will tuck an elegant, handwritten wax-sealed card inside the luxury Rooh Vastr packaging with zero price tags visible.',
  },
  {
    category: 'ordering',
    q: 'What is the difference between Ready-to-Wear and Bespoke Print items?',
    a: 'Ready-to-Wear items are pre-curated signature designs that ship immediately from our atelier within 24-48 hours. Bespoke Print items are crafted on demand around your custom photographs, poetry, or corporate logos and require digital proof sign-off.',
  },
  // Shipping
  {
    category: 'shipping',
    q: 'How many days will my order take to reach me?',
    a: 'Ready-to-wear orders are dispatched within 24-48 hours and arrive in 3-5 business days across Indian metros. Bespoke personalized orders take 2-3 business days for artisan crafting & proof approval, followed by 3-5 business days courier transit. Overall turnaround is typically 5-7 business days.',
  },
  {
    category: 'shipping',
    q: 'Do you deliver to Tier 2 and Tier 3 cities across India?',
    a: 'Yes, Rooh Vastr delivers across 19,000+ PIN codes in India through our premier courier partnerships with Blue Dart, Delhivery, and DTDC. Free standard shipping applies to all prepaid orders exceeding ₹999.',
  },
  {
    category: 'shipping',
    q: 'How can I track my live parcel location?',
    a: 'Once your package is dispatched, we send you an SMS and WhatsApp alert containing your Airway Bill (AWB) number and live tracking link. You can also visit our dedicated /track-order page anytime to check real-time courier milestones.',
  },
  // Payments
  {
    category: 'payments',
    q: 'Which payment methods do you support?',
    a: 'We accept all major Indian payment gateways: UPI (Google Pay, PhonePe, Paytm, CRED), Credit/Debit Cards (Visa, Mastercard, RuPay, Amex), Net Banking across 50+ banks, and Cash on Delivery (COD) for eligible pin codes.',
  },
  {
    category: 'payments',
    q: 'How do discount coupons like ROOHFIRST work?',
    a: 'On the Checkout page, enter the promo code into the coupon field and click "Apply". Valid coupon codes include ROOHFIRST (15% off first order), MEMORIES100 (Flat ₹100 off on ₹999+), and STAYGIFT50 (Flat ₹50 off). Only one coupon can be applied per order.',
  },
  // Returns & Cancellations
  {
    category: 'returns',
    q: 'Can I return or exchange a personalized/customized item?',
    a: 'Because customized and bespoke items are permanently manufactured specifically for you, they cannot be returned or restocked for change of mind. However, if your item arrives damaged, flawed, or differs from the approved digital proof, we issue an instant, no-questions-asked free remake or 100% refund.',
  },
  {
    category: 'returns',
    q: 'What should I do if a ceramic mug or photo frame arrives broken in transit?',
    a: 'While our 5-ply reinforced crash-tested boxes prevent 99.8% of transit breakage, accidents occasionally happen. Simply WhatsApp our support desk (+91 96548 61504) within 48 hours of delivery with a quick unboxing photo or video, and our team will dispatch a replacement priority order within 24 hours.',
  },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndices, setOpenIndices] = useState<number[]>([0, 1]); // first two open by default

  const toggleIndex = (idx: number) => {
    if (openIndices.includes(idx)) {
      setOpenIndices(openIndices.filter((i) => i !== idx));
    } else {
      setOpenIndices([...openIndices, idx]);
    }
  };

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCat = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = 
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#6D1835]/10 text-[#6D1835] text-xs font-semibold tracking-widest uppercase mb-4">
            <HelpCircle className="w-3.5 h-3.5" /> Frequently Asked Questions
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#242124] font-medium tracking-tight mb-4">
            Questions & Answers
          </h1>
          <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto font-light">
            Everything you need to know about our bespoke printing atelier, luxury packaging, proof approvals, and pan-India express courier.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8 max-w-lg mx-auto">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search keywords (e.g. proof, shipping, return, sizes)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs sm:text-sm pl-11 pr-4 py-3.5 rounded-full border border-stone-200 bg-white shadow-sm focus:outline-none focus:border-[#6D1835] transition-all"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'All Questions' },
            { id: 'custom', label: 'Bespoke & Proofs' },
            { id: 'ordering', label: 'Ordering & Gifting' },
            { id: 'shipping', label: 'Shipping & Delivery' },
            { id: 'payments', label: 'Payments & COD' },
            { id: 'returns', label: 'Returns & Damages' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`text-xs px-4 py-2 rounded-full font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#6D1835] text-white shadow-sm'
                  : 'bg-white border border-stone-200/90 text-stone-600 hover:border-[#6D1835] hover:text-[#6D1835]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion FAQ list */}
        <div className="space-y-4 mb-16">
          {filteredFaqs.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-stone-200">
              <p className="text-stone-500 text-sm mb-3">No matching questions found for &ldquo;{searchQuery}&rdquo;.</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                className="text-xs font-semibold text-[#6D1835] underline uppercase tracking-wider"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndices.includes(idx);
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs transition-all hover:border-stone-300"
                >
                  <button
                    onClick={() => toggleIndex(idx)}
                    className="w-full py-4.5 px-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-serif text-base sm:text-lg text-[#242124] font-medium">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#6D1835] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 font-light">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still Have Questions Box */}
        <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm text-center">
          <div className="w-12 h-12 rounded-full bg-[#25D366]/10 text-[#25D366] mx-auto flex items-center justify-center mb-4">
            <MessageCircle className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl text-[#242124] mb-2">Still have questions?</h3>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto mb-6 leading-relaxed font-light">
            Our atelier support artisans are online Monday to Saturday, 9:00 AM – 8:00 PM IST to assist with bespoke artwork queries, urgent delivery dates, or custom orders.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://wa.me/919654861504?text=Hi%20Rooh%20Vastr,%20I%20have%20a%20question%20about%20my%20order."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white text-xs font-semibold uppercase tracking-wider px-6 py-3.5 rounded-full hover:bg-[#20ba59] transition-all shadow-md"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp Support
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-[#242124]/20 bg-white text-[#242124] text-xs font-semibold uppercase tracking-wider px-6 py-3.5 rounded-full hover:border-[#6D1835] hover:text-[#6D1835] transition-all"
            >
              Contact Atelier
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
