"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  UploadCloud,
  X,
  Plus,
  Minus,
  MessageCircle,
  HelpCircle,
  Layers,
  Award,
  Truck,
  Heart,
  Palette,
  Eye,
  Check,
} from "lucide-react";

// WhatsApp icon SVG component
function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.539 1.761.815 2.791.815 3.182 0 5.767-2.587 5.768-5.766 0-3.18-2.586-5.768-5.768-5.768zm9.969 5.767c0 5.508-4.472 9.98-9.969 9.98-1.724 0-3.344-.442-4.757-1.218l-5.274 1.381 1.408-5.143c-.879-1.488-1.377-3.228-1.377-5.08 0-5.509 4.471-9.98 9.969-9.98 5.498 0 9.97 4.471 9.97 9.98z" />
    </svg>
  );
}

// 8 Custom Printing Services
const SERVICES = [
  {
    id: "tshirts",
    title: "Custom T-Shirts",
    tagline: "Your design. Your style.",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
    badge: "Most Popular",
  },
  {
    id: "mugs",
    title: "Mugs & Cups",
    tagline: "Print your memories.",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    badge: "Trending",
  },
  {
    id: "cushions",
    title: "Cushions & Pillows",
    tagline: "Soft gifts for big feelings.",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80",
    badge: null,
  },
  {
    id: "keychains",
    title: "Keychains",
    tagline: "Small gifts. Big memories.",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80",
    badge: null,
  },
  {
    id: "frames",
    title: "Photo Frames",
    tagline: "Frame your special moments.",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80",
    badge: null,
  },
  {
    id: "phone-cases",
    title: "Phone Cases",
    tagline: "Carry your memories.",
    image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=600&q=80",
    badge: null,
  },
  {
    id: "bottles",
    title: "Bottles",
    tagline: "Stay hydrated in style.",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80",
    badge: null,
  },
  {
    id: "corporate",
    title: "Corporate Gifts",
    tagline: "Bulk orders for teams.",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
    badge: "Bulk Discounts",
  },
];

// 7 Custom Creations Showcase
const CREATIONS = [
  {
    id: 1,
    title: "Couple T-Shirt",
    caption: "Together Always ♡",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    title: "Ceramic Photo Mug",
    caption: "Together ♡",
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    title: "Velvet Memory Cushion",
    caption: "Home is wherever you are ♡",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    title: "Handcrafted Keychains",
    caption: "J & S Initials",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    title: "Engraved Wooden Frame",
    caption: "Our Story ♡",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    title: "Personalized Phone Case",
    caption: "Floral Garden Art",
    image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 7,
    title: "Custom Steel Bottle",
    caption: "Adventure Awaits",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80",
  },
];

// FAQs Data
const FAQS = [
  {
    q: "What products can be customized?",
    a: "We offer customization on T-shirts, hoodies, ceramic mugs, cushions, wooden and metal keychains, photo frames, phone cases, stainless steel water bottles, and corporate gift hampers. If you have another product in mind, simply ask us on WhatsApp!",
  },
  {
    q: "Can I get a design preview before printing?",
    a: "Yes, 100%! We never print without your written confirmation. Our design team creates a photorealistic 2D digital mockup and sends it to your WhatsApp for review and revisions until you are completely satisfied.",
  },
  {
    q: "Do you have a minimum order quantity?",
    a: "None at all! You can order just 1 single customized gift for a loved one. We also have high-capacity production lines for corporate, festival, and wedding bulk orders up to 5,000+ units with attractive tier pricing.",
  },
  {
    q: "What file formats do you accept?",
    a: "We accept JPG, PNG, PDF, AI, PSD, SVG, and high-resolution photos straight from your mobile camera. If your photo needs background cleanup or brightening, our designers handle it at zero extra charge.",
  },
  {
    q: "How long does it take to complete a custom order?",
    a: "Once you approve the digital design preview, your order is printed and dispatched within 24 to 48 hours. Express shipping delivers anywhere in India within 3 to 5 business days.",
  },
  {
    q: "Do you offer bulk or corporate orders?",
    a: "Yes! We specialize in bulk custom merchandise for startups, corporates, colleges, weddings, and brand events. Bulk orders include GST invoicing, volume discounts, and custom gift box packaging.",
  },
];

export default function CustomPrintingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("Custom T-Shirts");
  const [customerName, setCustomerName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [customNotes, setCustomNotes] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const handleStartOrder = (productName?: string) => {
    if (productName) {
      setSelectedProduct(productName);
    }
    setIsModalOpen(true);
  };

  const handleWhatsAppDirect = () => {
    const textLines = [
      `*ROOH VASTR - Custom Printing Inquiry*`,
      `Product: ${selectedProduct}`,
      `Quantity: ${quantity || 1}`,
      customerName ? `Name: ${customerName}` : "",
      whatsappNumber ? `WhatsApp: ${whatsappNumber}` : "",
      customNotes ? `Idea / Text: "${customNotes}"` : "",
      uploadedFileName ? `Attached File: ${uploadedFileName}` : "",
      `\nHello Rooh Vastr team, please share the price quote and 2D design preview!`,
    ].filter(Boolean);

    const message = encodeURIComponent(textLines.join("\n"));
    window.open(`https://wa.me/919654861504?text=${message}`, "_blank");
    setIsModalOpen(false);
  };

  const scrollToCreations = () => {
    const section = document.getElementById("creations-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#242124]">
      {/* 1. Breadcrumbs */}
      <div className="border-b border-stone-200/70 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-stone-500 flex items-center gap-2">
          <Link href="/" className="hover:text-[#5B132B] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-stone-400" />
          <span className="text-[#5B132B] font-medium">Custom Printing Services</span>
        </div>
      </div>

      {/* 2. Hero Section */}
      <section className="pt-8 pb-12 md:pt-12 md:pb-16 bg-[#FAF7F2] border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-[#242124] tracking-tight leading-[1.15]">
                  Custom Printing{" "}
                  <span className="text-[#5B132B] font-serif italic font-normal">
                    Services
                  </span>
                </h1>
                <p className="text-base sm:text-lg font-medium text-stone-800">
                  Turn your ideas into something meaningful.
                </p>
                <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-xl">
                  Personalized prints for every occasion. From custom T-shirts and mugs to
                  cushions, keychains and more — create gifts that truly speak from the heart.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <button
                  type="button"
                  onClick={() => handleStartOrder()}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#5B132B] hover:bg-[#430D1F] text-white font-medium text-sm shadow-md hover:shadow-lg transition-all"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-white" />
                  <span>Start Your Custom Order</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={scrollToCreations}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white border border-stone-300 hover:border-stone-400 text-stone-800 font-medium text-sm shadow-2xs hover:bg-stone-50 transition-all"
                >
                  <Eye className="w-4 h-4 text-stone-500" />
                  <span>View Our Work</span>
                </button>
              </div>

              {/* 4 Trust Features Strip */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-stone-200/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#5B132B]/10 text-[#5B132B] flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#242124] leading-tight">
                      High Quality Prints
                    </p>
                    <p className="text-[11px] text-stone-500">Vibrant & Long Lasting</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#5B132B]/10 text-[#5B132B] flex items-center justify-center shrink-0">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#242124] leading-tight">
                      Wide Product Range
                    </p>
                    <p className="text-[11px] text-stone-500">T-Shirts, Mugs & More</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#5B132B]/10 text-[#5B132B] flex items-center justify-center shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#242124] leading-tight">
                      No Minimum Hassle
                    </p>
                    <p className="text-[11px] text-stone-500">Single or Bulk Orders</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#5B132B]/10 text-[#5B132B] flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#242124] leading-tight">
                      Expert Support
                    </p>
                    <p className="text-[11px] text-stone-500">Design Help on WhatsApp</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Montage Graphic */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden bg-[#F4EDE6] border border-stone-200/80 shadow-lg p-6">
                <div className="relative aspect-4/3 sm:aspect-square w-full rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=80"
                    alt="Custom Printing Showcase Montage"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Subtle gradient vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                  {/* Overlay Badges replicating montage elements */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs text-[#242124] font-serif font-bold text-xs px-3 py-1.5 rounded-full shadow-md border border-stone-200 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Live Printing Studio
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl shadow-lg border border-stone-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#242124]">
                        Personalized Keepsakes
                      </p>
                      <p className="text-[11px] text-stone-500">
                        DTF Printing · Laser Engraving · Sublimation
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#5B132B] bg-[#5B132B]/10 px-2.5 py-1 rounded-md">
                      100% Cotton & Ceramic
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Section: "Our Custom Printing Services" */}
      <section className="py-12 md:py-16 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#242124]">
                Our Custom Printing Services
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Choose a product and start creating your own design.
              </p>
            </div>
            <button
              onClick={() => handleStartOrder()}
              className="text-xs font-semibold text-[#5B132B] hover:underline flex items-center gap-1 self-start sm:self-auto"
            >
              <span>View All Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 8 Product Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
            {SERVICES.map((srv) => (
              <div
                key={srv.id}
                onClick={() => handleStartOrder(srv.title)}
                className="group cursor-pointer rounded-2xl bg-white border border-stone-200/90 hover:border-[#5B132B]/40 p-2.5 sm:p-3 text-center transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 flex flex-col justify-between"
              >
                <div className="aspect-square w-full rounded-xl overflow-hidden bg-stone-100 relative mb-2.5">
                  <Image
                    src={srv.image}
                    alt={srv.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {srv.badge && (
                    <span className="absolute top-1.5 left-1.5 text-[9px] font-bold bg-[#5B132B] text-white px-1.5 py-0.5 rounded shadow-2xs">
                      {srv.badge}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xs sm:text-sm text-[#242124] group-hover:text-[#5B132B] transition-colors leading-tight">
                    {srv.title}
                  </h3>
                  <p className="text-[10px] text-stone-500 mt-0.5 leading-snug line-clamp-1">
                    {srv.tagline}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Section: "How Custom Printing Works" */}
      <section className="py-12 md:py-16 bg-[#F4EDE6] border-y border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#242124]">
              How Custom Printing Works
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              It&apos;s simple, quick and hassle-free.
            </p>
          </div>

          {/* 4 Circular Steps Container */}
          <div className="bg-white/80 backdrop-blur-xs rounded-3xl border border-stone-200/80 p-6 md:p-10 shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center space-y-3 relative">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-[#5B132B] text-white flex items-center justify-center text-lg font-bold shadow-md">
                    1
                  </div>
                  <div className="w-7 h-7 rounded-full bg-white border border-stone-200 shadow-2xs absolute -bottom-1 -right-1 flex items-center justify-center text-[#5B132B]">
                    <MessageCircle className="w-3.5 h-3.5 fill-[#5B132B]" />
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-sm sm:text-base text-[#242124]">
                    Share Your Idea
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed max-w-[220px]">
                    Tell us what you want, share your design or concept on WhatsApp.
                  </p>
                </div>
                {/* Arrow to next (Desktop only) */}
                <div className="hidden md:block absolute top-7 -right-3 text-stone-300 font-bold text-base">
                  →
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center space-y-3 relative">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-[#5B132B]/10 border-2 border-[#5B132B] text-[#5B132B] flex items-center justify-center text-lg font-bold shadow-xs">
                    2
                  </div>
                  <div className="w-7 h-7 rounded-full bg-white border border-stone-200 shadow-2xs absolute -bottom-1 -right-1 flex items-center justify-center text-[#5B132B]">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-sm sm:text-base text-[#242124]">
                    Get a Quote
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed max-w-[220px]">
                    We&apos;ll review your requirements and share the price, material and timeline.
                  </p>
                </div>
                <div className="hidden md:block absolute top-7 -right-3 text-stone-300 font-bold text-base">
                  →
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center space-y-3 relative">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-[#5B132B]/10 border-2 border-[#5B132B] text-[#5B132B] flex items-center justify-center text-lg font-bold shadow-xs">
                    3
                  </div>
                  <div className="w-7 h-7 rounded-full bg-white border border-stone-200 shadow-2xs absolute -bottom-1 -right-1 flex items-center justify-center text-[#5B132B]">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-sm sm:text-base text-[#242124]">
                    Approve the Preview
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed max-w-[220px]">
                    We create a design preview and send it for your approval.
                  </p>
                </div>
                <div className="hidden md:block absolute top-7 -right-3 text-stone-300 font-bold text-base">
                  →
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-[#5B132B]/10 border-2 border-[#5B132B] text-[#5B132B] flex items-center justify-center text-lg font-bold shadow-xs">
                    4
                  </div>
                  <div className="w-7 h-7 rounded-full bg-white border border-stone-200 shadow-2xs absolute -bottom-1 -right-1 flex items-center justify-center text-[#5B132B]">
                    <Truck className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-sm sm:text-base text-[#242124]">
                    Confirm & Get Delivered
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed max-w-[220px]">
                    Once approved, we print, pack and deliver it to your location.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Section: "Why Choose Rooh Vastr?" & "Have a specific requirement?" Card */}
      <section className="py-12 md:py-16 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 6-Benefit Grid */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#242124]">
                  Why Choose Rooh Vastr?
                </h2>
                <p className="text-xs sm:text-sm text-stone-500 mt-1">
                  Crafted with precision, quality materials, and personal care.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#5B132B]/10 text-[#5B132B] flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#242124]">
                      Premium Quality Printing
                    </h4>
                    <p className="text-[11px] text-stone-500 leading-snug">
                      Vibrant Oeko-Tex inks that resist 50+ wash cycles.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#5B132B]/10 text-[#5B132B] flex items-center justify-center shrink-0 mt-0.5">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#242124]">
                      Personalized Support
                    </h4>
                    <p className="text-[11px] text-stone-500 leading-snug">
                      1-on-1 WhatsApp assistance with our design team.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#5B132B]/10 text-[#5B132B] flex items-center justify-center shrink-0 mt-0.5">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#242124]">
                      Affordable Pricing
                    </h4>
                    <p className="text-[11px] text-stone-500 leading-snug">
                      Direct-from-studio prices without middleman markups.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#5B132B]/10 text-[#5B132B] flex items-center justify-center shrink-0 mt-0.5">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#242124]">
                      Bulk Order Available
                    </h4>
                    <p className="text-[11px] text-stone-500 leading-snug">
                      Volume tiers for corporate, wedding & festival merchandise.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#5B132B]/10 text-[#5B132B] flex items-center justify-center shrink-0 mt-0.5">
                    <Palette className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#242124]">
                      Perfect for Gifts & Branding
                    </h4>
                    <p className="text-[11px] text-stone-500 leading-snug">
                      Celebration keepsakes or sleek professional identity.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#5B132B]/10 text-[#5B132B] flex items-center justify-center shrink-0 mt-0.5">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#242124]">
                      Safe & Secure Delivery
                    </h4>
                    <p className="text-[11px] text-stone-500 leading-snug">
                      Express air couriers with damage-proof packaging.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Split Callout Card */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden shadow-xl border border-stone-200/80 grid grid-cols-1 sm:grid-cols-2">
                {/* Visual Image */}
                <div className="relative aspect-4/3 sm:aspect-auto min-h-[200px] bg-stone-100">
                  <Image
                    src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80"
                    alt="Stack of Custom Printed Story T-Shirts"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-4">
                    <span className="text-white text-xs font-serif font-bold italic">
                      &ldquo;Create Your Own Story&rdquo;
                    </span>
                  </div>
                </div>

                {/* Maroon Action Content */}
                <div className="bg-[#5B132B] text-white p-6 sm:p-8 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-lg sm:text-xl font-bold leading-snug">
                        Have a specific requirement?
                      </h3>
                      <Heart className="w-5 h-5 text-white/40 fill-white/20 shrink-0" />
                    </div>
                    <p className="text-xs text-white/80 leading-relaxed">
                      Discuss your idea with our team on WhatsApp and get expert suggestions, material guidance & instant quotes.
                    </p>
                  </div>

                  <a
                    href="https://wa.me/919654861504?text=Hi%20Rooh%20Vastr,%20I%20have%20a%20specific%20custom%20printing%20requirement."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white text-[#5B132B] hover:bg-stone-100 font-bold text-xs shadow-md transition-all self-start"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-emerald-600" />
                    <span>Chat on WhatsApp</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Section: "Some of Our Custom Creations" */}
      <section id="creations-section" className="py-12 md:py-16 bg-[#FAF7F2] border-t border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#242124]">
                Some of Our Custom Creations
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Real designs. Real people. Real happiness.
              </p>
            </div>
            <button
              onClick={() => handleStartOrder()}
              className="text-xs font-semibold text-[#5B132B] hover:underline flex items-center gap-1 self-start sm:self-auto"
            >
              <span>View More Creations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 7 Horizontal Photo Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
            {CREATIONS.map((c) => (
              <div
                key={c.id}
                onClick={() => handleStartOrder(c.title)}
                className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-stone-200/90 shadow-2xs hover:shadow-md transition-all duration-300"
              >
                <div className="aspect-square w-full relative bg-stone-100 overflow-hidden">
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-2 left-2 right-2 text-white">
                    <p className="text-[10px] font-semibold text-stone-200 line-clamp-1">
                      {c.title}
                    </p>
                    <p className="text-xs font-serif italic text-white line-clamp-1">
                      {c.caption}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Section: "Frequently Asked Questions" */}
      <section className="py-12 md:py-16 bg-[#FAF7F2] border-t border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#242124]">
                Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Find answers to common questions about our custom printing services.
              </p>
            </div>
            <Link
              href="/faq"
              className="text-xs font-semibold text-[#5B132B] hover:underline flex items-center gap-1 self-start sm:self-auto"
            >
              <span>View All FAQs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 2-Column Accordion Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="font-serif font-bold text-xs sm:text-sm text-[#242124]">
                      {faq.q}
                    </span>
                    <span className="w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 shrink-0">
                      {isOpen ? (
                        <Minus className="w-3.5 h-3.5 text-[#5B132B]" />
                      ) : (
                        <Plus className="w-3.5 h-3.5" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-xs text-stone-600 leading-relaxed border-t border-stone-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. Section: Bottom Deep Maroon CTA Banner */}
      <section className="bg-[#5B132B] text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Gift Box Photo */}
            <div className="md:col-span-3 flex justify-center md:justify-start">
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20">
                <Image
                  src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=500&q=80"
                  alt="Ready to Gift Wrapped Boxes"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Middle Copy */}
            <div className="md:col-span-6 text-center md:text-left space-y-2">
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                Ready to Create Something Special?
              </h2>
              <p className="text-xs sm:text-sm text-white/80 max-w-lg leading-relaxed">
                Let&apos;s bring your ideas to life. Share your requirements on WhatsApp and get started today.
              </p>
            </div>

            {/* Right Button */}
            <div className="md:col-span-3 flex justify-center md:justify-end">
              <button
                type="button"
                onClick={() => handleStartOrder()}
                className="inline-flex items-center gap-2.5 px-6 py-4 rounded-full bg-white text-[#5B132B] hover:bg-stone-100 font-bold text-xs sm:text-sm shadow-xl hover:shadow-2xl transition-all"
              >
                <WhatsAppIcon className="w-4 h-4 fill-emerald-600" />
                <span>Start Custom Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Interactive Custom Order Intake Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 text-stone-500 hover:text-stone-800 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#5B132B] bg-[#5B132B]/10 px-2 py-0.5 rounded-full">
                  Quick WhatsApp Handoff
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#242124] mt-1.5">
                  Start Your Custom Order
                </h3>
                <p className="text-xs text-stone-500">
                  Select your product and share your design concept. Our team will review and reply on WhatsApp with a digital 2D preview.
                </p>
              </div>

              <div className="space-y-3.5">
                {/* Select Canvas */}
                <div>
                  <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wide mb-1">
                    Product / Canvas
                  </label>
                  <select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-stone-300 rounded-xl text-xs font-medium text-[#242124] focus:outline-none focus:ring-2 focus:ring-[#5B132B]"
                  >
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wide mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-stone-300 rounded-xl text-xs text-[#242124] focus:outline-none focus:ring-2 focus:ring-[#5B132B]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wide mb-1">
                      Estimated Quantity
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="e.g. 1 or 50"
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-stone-300 rounded-xl text-xs text-[#242124] focus:outline-none focus:ring-2 focus:ring-[#5B132B]"
                    />
                  </div>
                </div>

                {/* File Upload Dropzone */}
                <div>
                  <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wide mb-1">
                    Attach Design / Photo
                  </label>
                  <label className="flex items-center justify-center gap-2 border border-dashed border-stone-300 rounded-xl p-3 bg-[#FAF7F2] cursor-pointer hover:bg-stone-100 transition-colors">
                    <UploadCloud className="w-4 h-4 text-[#5B132B]" />
                    <span className="text-xs text-stone-600 font-medium">
                      {uploadedFileName ? (
                        <span className="text-emerald-700 flex items-center gap-1 font-semibold">
                          <Check className="w-3.5 h-3.5" /> {uploadedFileName}
                        </span>
                      ) : (
                        "Upload image (or share directly on WhatsApp)"
                      )}
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setUploadedFileName(file.name);
                      }}
                    />
                  </label>
                </div>

                {/* Custom Notes */}
                <div>
                  <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wide mb-1">
                    Your Message / Custom Text
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Enter custom text, font style, placement, or occasion..."
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-stone-300 rounded-xl text-xs text-[#242124] focus:outline-none focus:ring-2 focus:ring-[#5B132B]"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="flex-1 py-3.5 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-white" />
                  <span>Send Request on WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="py-3 px-4 rounded-full border border-stone-300 text-stone-600 hover:bg-stone-50 text-xs font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
