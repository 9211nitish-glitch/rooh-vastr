"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <>
      <footer className="bg-[#FAF4EE] text-[#4A4543] border-t border-[#EAE0D5] pt-14 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-[#EAE0D5]">
            {/* Col 1: Brand & Bio (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <Link href="/" className="inline-flex items-center gap-3 group">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#D4AF37]/50 shadow-xs shrink-0 bg-[#FAF7F2]">
                  <Image
                    src="/images/brand/logo.jpg"
                    alt="Rooh Vastr Logo"
                    width={44}
                    height={44}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <div className="font-serif text-2xl font-bold tracking-wider text-[#5B132B]">
                    ROOH VASTR
                  </div>
                  <div className="text-[10px] tracking-widest text-stone-700 font-sans mt-0.5 font-medium">
                    Wear Your Story, Gift Your Feelings.
                  </div>
                </div>
              </Link>

              <p className="text-xs text-stone-700 max-w-sm leading-relaxed">
                Premium personalized gifts and custom merchandise for every occasion. Made with love, just for you.
              </p>

              <div className="pt-2 text-[11px] text-stone-700 font-medium">
                © 2026 Rooh Vastr. All rights reserved.
              </div>
            </div>

            {/* Col 2: Quick Links (2 cols) */}
            <div className="lg:col-span-2">
              <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-[#242124] mb-3.5">
                Quick Links
              </h3>
              <ul className="space-y-2 text-xs text-stone-700 font-medium">
                <li>
                  <Link href="/shop" className="hover:text-[#5B132B] transition-colors">
                    Shop All
                  </Link>
                </li>
                <li>
                  <Link href="/custom-printing" className="hover:text-[#5B132B] transition-colors">
                    Custom Printing
                  </Link>
                </li>
                <li>
                  <Link href="/bulk-orders" className="hover:text-[#5B132B] transition-colors">
                    Bulk Orders
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-[#5B132B] transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/track-order" className="hover:text-[#5B132B] transition-colors">
                    Track Order
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Customer Care (2 cols) */}
            <div className="lg:col-span-2">
              <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-[#242124] mb-3.5">
                Customer Care
              </h3>
              <ul className="space-y-2 text-xs text-stone-700 font-medium">
                <li>
                  <Link href="/contact" className="hover:text-[#5B132B] transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-[#5B132B] transition-colors">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="/shipping-policy" className="hover:text-[#5B132B] transition-colors">
                    Shipping Policy
                  </Link>
                </li>
                <li>
                  <Link href="/returns-refunds" className="hover:text-[#5B132B] transition-colors">
                    Returns & Refunds
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="hover:text-[#5B132B] transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="hover:text-[#5B132B] transition-colors">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: Contact Us (2 cols) */}
            <div className="lg:col-span-2">
              <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-[#242124] mb-3.5">
                Contact Us
              </h3>
              <ul className="space-y-2.5 text-xs text-stone-700 font-medium">
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#5B132B] shrink-0" />
                  <span>+91 96548 61504</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#5B132B] shrink-0" />
                  <span>hello@roohvastr.in</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#5B132B] shrink-0" />
                  <span>New Delhi, India</span>
                </li>
              </ul>
            </div>

            {/* Col 5: We Accept Payment Methods (2 cols) */}
            <div className="lg:col-span-2">
              <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-[#242124] mb-3.5">
                We Accept
              </h3>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-1 rounded bg-white border border-[#E0D5CC] text-[10px] font-bold text-gray-700 shadow-2xs">
                  UPI
                </span>
                <span className="px-2 py-1 rounded bg-white border border-[#E0D5CC] text-[10px] font-bold text-[#1A1F71] shadow-2xs">
                  VISA
                </span>
                <span className="px-2 py-1 rounded bg-white border border-[#E0D5CC] text-[10px] font-bold text-[#EB001B] shadow-2xs">
                  Mastercard
                </span>
                <span className="px-2 py-1 rounded bg-white border border-[#E0D5CC] text-[10px] font-bold text-[#204987] shadow-2xs">
                  RuPay
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Sitemap & Compliance */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-700 font-medium gap-3">
            <p>© 2026 Rooh Vastr. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/sitemap" className="hover:text-[#5B132B] transition-colors">
                Sitemap
              </Link>
              <span>•</span>
              <Link href="/cookies" className="hover:text-[#5B132B] transition-colors">
                Cookies
              </Link>
              <span>•</span>
              <Link href="/accessibility" className="hover:text-[#5B132B] transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Quick Action Button - Stacked above AI Concierge button */}
      <a
        href="https://wa.me/919654861504?text=Hi%20Rooh%20Vastr%2C%20I%20would%20like%20to%20customize%20a%20gift!"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        title="Direct WhatsApp Desk"
        className="fixed bottom-40 right-4 sm:bottom-36 sm:right-6 md:bottom-24 md:right-8 z-40 w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-white text-[#25D366]" />
      </a>
    </>
  );
}
