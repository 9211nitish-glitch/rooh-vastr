"use client";

import React, { useState, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product, Review } from "@/lib/types";
import { useCart } from "@/lib/context/CartContext";
import { useWishlist } from "@/lib/context/WishlistContext";
import { formatPrice } from "@/lib/utils";
import ProductCard from "./ProductCard";
import {
  Star,
  Heart,
  ChevronLeft,
  ChevronRight,
  UploadCloud,
  Trash2,
  Play,
  Truck,
  MapPin,
  RotateCcw,
  ShieldCheck,
  Gift,
  MessageCircle,
  ZoomIn,
  CheckCircle2,
  Sparkles,
  ShoppingBag,
  Zap,
} from "lucide-react";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
  reviews: Review[];
}

// 4 Mug Types for Mug category products
const MUG_TYPES = [
  {
    id: "standard",
    name: "Standard Mug",
    price: 399,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "magic",
    name: "Magic Mug",
    price: 499,
    image: "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "inner-color",
    name: "Inner Color Mug",
    price: 449,
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "heart-handle",
    name: "Heart Handle Mug",
    price: 499,
    image: "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=300&q=80",
  },
];

export default function ProductDetailClient({
  product,
  relatedProducts,
  reviews,
}: ProductDetailClientProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addToCart, setIsCartOpen } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  // Category determination
  const isMug =
    product.category_id === "cat-mugs" ||
    product.name.toLowerCase().includes("mug");
  const isApparel =
    product.category_id === "cat-tshirts" ||
    product.category_id === "cat-hoodies" ||
    product.name.toLowerCase().includes("t-shirt") ||
    product.name.toLowerCase().includes("tshirt") ||
    product.name.toLowerCase().includes("hoodie");
  const isCushion =
    product.category_id === "cat-cushions" ||
    product.name.toLowerCase().includes("cushion");
  const isFrame =
    product.category_id === "cat-frames" ||
    product.name.toLowerCase().includes("frame") ||
    product.name.toLowerCase().includes("poster");

  // Dynamic Gallery Images from product's actual images
  const galleryImages = useMemo(() => {
    if (product.images && product.images.length > 0) {
      return product.images.map((img) => img.image_url);
    }
    return [
      product.primary_image ||
        (isApparel
          ? "/images/products/custom-tshirt.jpg"
          : "/images/products/photo-mug.jpg"),
    ];
  }, [product, isApparel]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Apparel Size State
  const availableSizes =
    product.available_sizes && product.available_sizes.length > 0
      ? product.available_sizes
      : ["S", "M", "L", "XL", "2XL"];
  const [selectedSize, setSelectedSize] = useState<string>(
    availableSizes[1] || availableSizes[0] || "M"
  );

  // Customization States
  const [selectedMugType, setSelectedMugType] = useState<string>("standard");
  const [customText, setCustomText] = useState(
    isApparel ? "Better Together ❤" : isMug ? "Together Always ❤" : "Forever & Always ❤"
  );
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState<string | null>(
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=400&q=80"
  );
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("110001");
  const [isChangingPincode, setIsChangingPincode] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "description" | "specifications" | "shipping" | "returns" | "reviews" | "faqs"
  >("description");

  // Dynamic Pricing Calculation
  const currentMugType = MUG_TYPES.find((m) => m.id === selectedMugType) || MUG_TYPES[0];
  const price = isMug
    ? currentMugType.price
    : product.selling_price || product.sale_price || product.regular_price || 499;
  const regularPrice = isMug
    ? 699
    : product.regular_price || product.compare_at_price || Math.round(price * 1.45);
  const discountPercent = Math.max(5, Math.round(((regularPrice - price) / regularPrice) * 100));

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedPhotoUrl(url);
    }
  };

  const selectedVariant = isApparel
    ? `Size: ${selectedSize}`
    : isMug
    ? `Style: ${currentMugType.name}`
    : "Standard";

  const handleAddToCart = () => {
    addToCart(
      {
        ...product,
        selling_price: price,
      },
      quantity,
      selectedVariant,
      customText
    );
    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    addToCart(
      {
        ...product,
        selling_price: price,
      },
      quantity,
      selectedVariant,
      customText
    );
    router.push("/checkout");
  };

  const categorySlug = product.category_id ? product.category_id.replace("cat-", "") : "all";

  return (
    <div className="bg-[#FCF9F6] min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* 1. Dynamic Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
          <Link href="/" className="hover:text-[#5B132B]">
            Home
          </Link>
          <span>&gt;</span>
          <Link href={`/shop?category=${categorySlug}`} className="hover:text-[#5B132B]">
            {product.category_name || "Products"}
          </Link>
          <span>&gt;</span>
          <span className="text-[#5B132B] font-semibold truncate max-w-xs sm:max-w-none">
            {product.name}
          </span>
        </nav>

        {/* 2. Main Product Grid: Left Gallery + Right Personalization Studio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex gap-4">
              {/* Vertical Thumbnail Rail (only if multiple images exist) */}
              {galleryImages.length > 1 && (
                <div className="flex flex-col gap-2.5 w-16 shrink-0">
                  {galleryImages.slice(0, 5).map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImageIndex === idx
                          ? "border-[#5B132B] shadow-xs"
                          : "border-[#EAE0D5] opacity-75 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} view ${idx + 1}`}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                  {galleryImages.length > 5 && (
                    <button
                      type="button"
                      className="w-16 h-8 rounded-xl bg-white border border-[#EAE0D5] text-[10px] font-bold text-gray-600 hover:text-[#5B132B] flex items-center justify-center cursor-pointer"
                    >
                      +{galleryImages.length - 5} More
                    </button>
                  )}
                </div>
              )}

              {/* Main Product Showcase Photo */}
              <div className="relative flex-1 aspect-square rounded-2xl overflow-hidden bg-white border border-[#EAE0D5] shadow-xs group">
                <Image
                  src={galleryImages[activeImageIndex] || galleryImages[0]}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />

                {/* Top Left Bestseller Badge */}
                {product.is_bestseller && (
                  <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#5B132B] text-white shadow-xs">
                    Bestseller
                  </span>
                )}

                {/* Top Right Wishlist Heart */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  aria-label="Save to Wishlist"
                  className={`absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/95 backdrop-blur-xs shadow-xs flex items-center justify-center transition-all hover:scale-110 cursor-pointer ${
                    isWishlisted ? "text-[#5B132B]" : "text-gray-400 hover:text-[#5B132B]"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? "fill-[#5B132B]" : ""}`} />
                </button>

                {/* Carousel Left/Right Controls (if multiple images) */}
                {galleryImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveImageIndex((prev) =>
                          prev === 0 ? galleryImages.length - 1 : prev - 1
                        )
                      }
                      aria-label="Previous Image"
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 shadow-xs flex items-center justify-center text-gray-700 hover:text-black cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveImageIndex((prev) =>
                          prev === galleryImages.length - 1 ? 0 : prev + 1
                        )
                      }
                      aria-label="Next Image"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 shadow-xs flex items-center justify-center text-gray-700 hover:text-black cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}

                {/* Bottom Right Tap to Zoom Pill */}
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-bold text-gray-700 shadow-xs flex items-center gap-1">
                  <ZoomIn className="w-3 h-3" />
                  <span>Tap to zoom</span>
                </div>
              </div>
            </div>

            {/* 4 Feature Highlights Row */}
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-3 bg-white rounded-xl border border-[#F0E6DD] shadow-2xs">
                <div className="w-8 h-8 rounded-full bg-[#FDEEE9] text-[#5B132B] flex items-center justify-center mx-auto mb-1.5">
                  <UploadCloud className="w-4 h-4" />
                </div>
                <div className="text-[11px] font-bold text-[#242124]">Upload Your Photo</div>
                <div className="text-[9px] text-gray-400">Add your favorite memory</div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#F0E6DD] shadow-2xs">
                <div className="w-8 h-8 rounded-full bg-[#FDEEE9] text-[#5B132B] flex items-center justify-center mx-auto mb-1.5 font-serif font-bold text-xs">
                  &quot;A&quot;
                </div>
                <div className="text-[11px] font-bold text-[#242124]">Custom Text</div>
                <div className="text-[9px] text-gray-400">Names, quotes &amp; dates</div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#F0E6DD] shadow-2xs">
                <div className="w-8 h-8 rounded-full bg-[#FDEEE9] text-[#5B132B] flex items-center justify-center mx-auto mb-1.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-[11px] font-bold text-[#242124]">High-Quality Print</div>
                <div className="text-[9px] text-gray-400">Vibrant &amp; long-lasting</div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#F0E6DD] shadow-2xs">
                <div className="w-8 h-8 rounded-full bg-[#FDEEE9] text-[#5B132B] flex items-center justify-center mx-auto mb-1.5">
                  <Gift className="w-4 h-4" />
                </div>
                <div className="text-[11px] font-bold text-[#242124]">Perfect Gift</div>
                <div className="text-[9px] text-gray-400">For every occasion</div>
              </div>
            </div>

            {/* Video / Preview Card */}
            <div className="relative aspect-16/7 rounded-2xl overflow-hidden border border-[#EAE0D5] bg-[#FAF4EE] shadow-xs group">
              <Image
                src={
                  isApparel
                    ? "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80"
                    : galleryImages[0]
                }
                alt={`${product.name} video preview`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/95 text-[#5B132B] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
              </div>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[11px] font-bold text-gray-800 shadow-xs flex items-center gap-1.5">
                <Play className="w-3 h-3 fill-current text-[#5B132B]" />
                <span>Watch Product Video</span>
              </div>
            </div>
          </div>

          {/* Right Column (6 Cols) */}
          <div className="lg:col-span-6 space-y-5">
            {/* Title & Subtitle */}
            <div className="space-y-1">
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#242124] tracking-tight">
                {product.name}
              </h1>
              <p className="text-sm text-gray-600 font-medium">
                {product.short_description || product.name}
              </p>
            </div>

            {/* Star Rating Line */}
            <div className="flex items-center gap-2 text-xs">
              <div className="flex items-center text-[#F59E0B]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                ))}
              </div>
              <span className="font-bold text-gray-800">4.8</span>
              <span className="text-gray-500">(120 reviews)</span>
              <span className="text-gray-300">|</span>
              <span className="text-gray-600 font-medium">1.2K+ sold</span>
            </div>

            {/* Price Line */}
            <div className="flex items-center gap-3">
              <span className="font-serif text-3xl font-bold text-[#242124]">
                {formatPrice(price)}
              </span>
              <span className="text-base text-gray-400 line-through">
                {formatPrice(regularPrice)}
              </span>
              <span className="px-2 py-0.5 rounded bg-[#FFF2E6] text-[#C05A18] text-xs font-bold">
                {discountPercent}% OFF
              </span>
            </div>

            {/* Product Summary */}
            <p className="text-xs text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* 3 Trust Badges (Category Adaptive) */}
            <div className="grid grid-cols-3 gap-3 pt-1">
              <div className="p-2.5 rounded-xl bg-white border border-[#F0E6DD] flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#FAF4EE] text-[#5B132B] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-gray-800 leading-tight">
                    {isApparel
                      ? "100% Bio-Washed"
                      : isMug
                      ? "Premium Ceramic"
                      : isCushion
                      ? "Duchess Satin"
                      : "Premium Material"}
                  </div>
                  <div className="text-[9px] text-gray-400">
                    {isApparel
                      ? "240 GSM Combed Cotton"
                      : isMug
                      ? "Durable & Glossy"
                      : isCushion
                      ? "Plush Soft Feel"
                      : "Guaranteed Quality"}
                  </div>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-[#F0E6DD] flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#FAF4EE] text-[#5B132B] flex items-center justify-center shrink-0">
                  <Heart className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-gray-800 leading-tight">
                    {isApparel
                      ? "HD Direct Print"
                      : isMug
                      ? "High-Quality Print"
                      : isCushion
                      ? "HD Sublimation"
                      : "Precision Craft"}
                  </div>
                  <div className="text-[9px] text-gray-400">
                    {isApparel
                      ? "50+ Washes Colorfast"
                      : isMug
                      ? "Vibrant & Fade-Proof"
                      : isCushion
                      ? "Fade-Proof Colors"
                      : "Laser & HD Detail"}
                  </div>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-[#F0E6DD] flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#FAF4EE] text-[#5B132B] flex items-center justify-center shrink-0">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-gray-800 leading-tight">
                    {isApparel
                      ? "Pre-Shrunk Fit"
                      : isMug
                      ? "Microwave Safe"
                      : isCushion
                      ? "Microfiber Fill"
                      : "Secure Packaging"}
                  </div>
                  <div className="text-[9px] text-gray-400">
                    {isApparel
                      ? "Ultra-soft on skin"
                      : isMug
                      ? "Dishwasher Safe"
                      : isCushion
                      ? "Hypoallergenic"
                      : "Safe Transit"}
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Personalization Studio Box */}
            <div className="p-5 rounded-2xl bg-[#FFFBF8] border border-[#F0D5CD] space-y-4 shadow-2xs">
              <div>
                <h3 className="font-serif text-base font-bold text-[#5B132B]">
                  Personalize Your {isApparel ? "T-Shirt" : isMug ? "Mug" : isCushion ? "Cushion" : isFrame ? "Photo Frame" : product.name}
                </h3>
                <p className="text-[11px] text-gray-500">
                  {isApparel
                    ? "Select your size, upload your photo/graphic and add custom text."
                    : isMug
                    ? "Upload your photo, add text and choose your mug style."
                    : "Upload your photo and add custom text for a one-of-a-kind keepsake."}
                </p>
              </div>

              {/* 1. Size Selection (If Apparel) */}
              {isApparel && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#242124] flex items-center gap-1">
                      <span>1. Choose Size</span>
                      <span className="text-rose-500">*</span>
                    </label>
                    <span className="text-[10px] text-gray-500 bg-[#F5EBE1] px-2 py-0.5 rounded-full font-medium">
                      Regular Comfort Fit (Unisex)
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {availableSizes.map((sz) => {
                      const isSelected = selectedSize === sz;
                      return (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => setSelectedSize(sz)}
                          className={`w-12 h-10 rounded-xl font-bold text-xs flex items-center justify-center transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#5B132B] text-white shadow-xs scale-105"
                              : "bg-white text-gray-700 border border-[#EAE0D5] hover:border-[#5B132B]"
                          }`}
                        >
                          {sz}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Photo Upload Step */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#242124] flex items-center gap-1">
                  <span>{isApparel ? "2. Upload Photo / Artwork" : "1. Upload Photo"}</span>
                  <span className="text-rose-500">*</span>
                </label>

                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />

                  {/* Dropzone Area */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 border-2 border-dashed border-[#EAE0D5] hover:border-[#5B132B] rounded-xl p-4 text-center cursor-pointer transition-colors bg-white/70"
                  >
                    <UploadCloud className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                    <div className="text-xs font-bold text-gray-800">Click to upload photo</div>
                    <div className="text-[10px] text-gray-400">JPG, PNG up to 10MB</div>
                  </div>

                  {/* Thumbnail Preview on Right if uploaded */}
                  {uploadedPhotoUrl && (
                    <div className="relative w-24 h-20 rounded-xl overflow-hidden border border-[#EAE0D5] bg-white shrink-0 group">
                      <Image
                        src={uploadedPhotoUrl}
                        alt="Uploaded preview"
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setUploadedPhotoUrl(null)}
                        className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/60 text-white text-[9px] flex items-center gap-1 hover:bg-rose-600 cursor-pointer"
                      >
                        <Trash2 className="w-2.5 h-2.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Custom Text Step */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-bold text-[#242124]">
                  <span>{isApparel ? "3. Custom Text / Name / Quote (Optional)" : "2. Add Text (Optional)"}</span>
                  <span className="text-[10px] font-normal text-gray-400">
                    {customText.length}/50
                  </span>
                </div>
                <input
                  type="text"
                  maxLength={50}
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder={
                    isApparel
                      ? "e.g. Better Together / Custom Name"
                      : isMug
                      ? "e.g. Together Always ❤"
                      : "e.g. Happy Anniversary / Special Date"
                  }
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#EAE0D5] bg-white outline-none focus:border-[#5B132B]"
                />
              </div>

              {/* Mug Type Selector (ONLY shown for Mugs!) */}
              {isMug && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#242124]">3. Choose Mug Type</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {MUG_TYPES.map((type) => {
                      const isSelected = selectedMugType === type.id;
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setSelectedMugType(type.id)}
                          className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                            isSelected
                              ? "border-2 border-[#5B132B] bg-white shadow-xs"
                              : "border-[#EAE0D5] bg-white/70 hover:border-gray-400"
                          }`}
                        >
                          <div className="relative w-12 h-12 mx-auto mb-1">
                            <Image
                              src={type.image}
                              alt={type.name}
                              fill
                              sizes="48px"
                              className="object-contain"
                            />
                          </div>
                          <div className="text-[10px] font-bold text-gray-800 leading-tight">
                            {type.name}
                          </div>
                          <div className="text-[10px] text-gray-500 font-semibold mt-0.5">
                            ₹{type.price}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Apparel Special Note */}
              {isApparel && (
                <div className="text-[10px] text-[#5B132B] bg-[#FDEEE9] p-2.5 rounded-xl font-medium flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>High-definition Direct-to-Film (DTF) chest print • Free 3D WhatsApp preview before printing</span>
                </div>
              )}
            </div>

            {/* Quantity Stepper & Dual CTA Buttons */}
            <div className="flex items-center gap-3 pt-2">
              {/* Stepper */}
              <div className="flex items-center rounded-xl border border-[#EAE0D5] bg-white h-11 px-2">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-black font-bold cursor-pointer"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-bold text-gray-800">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-black font-bold cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 h-11 rounded-xl bg-[#5B132B] hover:bg-[#470e21] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              {/* Buy Now Button */}
              <button
                type="button"
                onClick={handleBuyNow}
                className="flex-1 h-11 rounded-xl bg-[#FDEEE9] hover:bg-[#fad8ce] text-[#5B132B] text-xs font-bold flex items-center justify-center gap-2 border border-[#F0D5CD] shadow-xs transition-colors cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Buy Now</span>
              </button>
            </div>

            {/* Delivery Information Box */}
            <div className="p-4 rounded-xl bg-[#FAF4EE] border border-[#EAE0D5] space-y-2 text-xs">
              <div className="flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-[#5B132B] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-gray-800">Delivery Information</span>
                  <div className="text-[11px] text-gray-500 mt-0.5">
                    Estimated delivery: 3-5 business days • Free delivery on orders above ₹499
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-1 border-t border-[#EAE0D5]">
                <MapPin className="w-4 h-4 text-[#5B132B] shrink-0 mt-0.5" />
                <div className="flex-1 flex items-center justify-between">
                  <div className="text-[11px] text-gray-700">
                    Delivering to{" "}
                    {isChangingPincode ? (
                      <input
                        type="text"
                        maxLength={6}
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        onBlur={() => setIsChangingPincode(false)}
                        autoFocus
                        className="w-16 px-1 border border-gray-300 rounded text-[11px]"
                      />
                    ) : (
                      <span className="font-bold underline">{pincode}</span>
                    )}
                    <span className="text-gray-400 ml-2">• Cash on Delivery available</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsChangingPincode(!isChangingPincode)}
                    className="text-[11px] font-bold text-[#5B132B] hover:underline cursor-pointer"
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>

            {/* 4 Guarantees Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] text-gray-600 font-medium pt-1">
              <div className="flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5 text-[#5B132B] shrink-0" />
                <span>7-Day Easy Returns</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#5B132B] shrink-0" />
                <span>Secure Payments</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Gift className="w-3.5 h-3.5 text-[#5B132B] shrink-0" />
                <span>Custom Packaging</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5 text-[#5B132B] shrink-0" />
                <span>Support on WhatsApp</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Product Tabs & Specifications Section */}
        <section className="pt-8 border-t border-[#EAE0D5]">
          {/* Tab Headers */}
          <div className="flex items-center gap-6 border-b border-[#EAE0D5] pb-2 text-xs font-bold overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab("description")}
              className={`pb-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "description"
                  ? "border-[#5B132B] text-[#5B132B]"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              Description
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("specifications")}
              className={`pb-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "specifications"
                  ? "border-[#5B132B] text-[#5B132B]"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              Specifications
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("shipping")}
              className={`pb-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "shipping"
                  ? "border-[#5B132B] text-[#5B132B]"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              Shipping &amp; Delivery
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("returns")}
              className={`pb-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "returns"
                  ? "border-[#5B132B] text-[#5B132B]"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              Returns &amp; Refunds
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("reviews")}
              className={`pb-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "reviews"
                  ? "border-[#5B132B] text-[#5B132B]"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              Reviews ({reviews.length > 0 ? reviews.length : 120})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("faqs")}
              className={`pb-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "faqs"
                  ? "border-[#5B132B] text-[#5B132B]"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              FAQs
            </button>
          </div>

          {/* Tab Content: Description + Specs Table */}
          <div className="py-6">
            {activeTab === "description" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Description and Bullet Points */}
                <div className="lg:col-span-7 space-y-4">
                  <h3 className="font-serif text-lg font-bold text-[#242124]">
                    Product Description
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    {isApparel ? (
                      <>
                        <div className="flex items-center gap-2 text-xs text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-[#5B132B] shrink-0" />
                          <span>100% Combed Organic Bio-Washed Cotton (240 GSM)</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-[#5B132B] shrink-0" />
                          <span>Vibrant Direct-to-Film (DTF) print tested for 50+ washes</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-[#5B132B] shrink-0" />
                          <span>Pre-shrunk fabric with reinforced double-needle hem</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-[#5B132B] shrink-0" />
                          <span>Customizable with photo, couple quotes, or typography</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-[#5B132B] shrink-0" />
                          <span>Unisex regular comfort fit for all body types</span>
                        </div>
                      </>
                    ) : isMug ? (
                      <>
                        <div className="flex items-center gap-2 text-xs text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-[#5B132B] shrink-0" />
                          <span>High-quality glossy ceramic mug (325ml / 11oz)</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-[#5B132B] shrink-0" />
                          <span>Vibrant, long-lasting dye sublimation print</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-[#5B132B] shrink-0" />
                          <span>Microwave and dishwasher safe (top rack)</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-[#5B132B] shrink-0" />
                          <span>Customizable with photo and heartfelt message</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-[#5B132B] shrink-0" />
                          <span>Perfect for birthdays, anniversaries, and morning coffee</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-2 text-xs text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-[#5B132B] shrink-0" />
                          <span>Handcrafted with premium materials &amp; attention to detail</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-[#5B132B] shrink-0" />
                          <span>Vivid, crystal-clear personalized photo &amp; text printing</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-[#5B132B] shrink-0" />
                          <span>Durable &amp; long-lasting keepsake gift</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-[#5B132B] shrink-0" />
                          <span>Specially inspected for defect-free perfection before dispatch</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-[#5B132B] shrink-0" />
                          <span>Delivered in secure protective bubble &amp; gift box packaging</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Right Specification Table */}
                <div className="lg:col-span-5 bg-white rounded-xl border border-[#EAE0D5] overflow-hidden text-xs">
                  <div className="divide-y divide-[#EAE0D5]">
                    <div className="flex py-2.5 px-4">
                      <span className="w-40 font-semibold text-gray-500">Material</span>
                      <span className="text-gray-800">
                        {product.material || (isApparel ? "100% Bio-Washed Combed Cotton" : isMug ? "Premium Ceramic" : "High-Grade Quality")}
                      </span>
                    </div>
                    <div className="flex py-2.5 px-4 bg-[#FCF9F6]">
                      <span className="w-40 font-semibold text-gray-500">
                        {isApparel ? "Available Sizes" : isMug ? "Capacity" : "Dimensions"}
                      </span>
                      <span className="text-gray-800">
                        {product.dimensions || (isApparel ? "XS, S, M, L, XL, 2XL" : isMug ? "325 ml (11 oz)" : "Standard Size")}
                      </span>
                    </div>
                    <div className="flex py-2.5 px-4">
                      <span className="w-40 font-semibold text-gray-500">Print Type</span>
                      <span className="text-gray-800">
                        {isApparel ? "Direct-to-Film (DTF) HD" : isMug ? "High-Quality Sublimation" : "HD UV / Precision Print"}
                      </span>
                    </div>
                    <div className="flex py-2.5 px-4 bg-[#FCF9F6]">
                      <span className="w-40 font-semibold text-gray-500">Weight</span>
                      <span className="text-gray-800">
                        {product.weight_grams ? `Approx. ${product.weight_grams} g` : isApparel ? "Approx. 240 g" : "Approx. 350 g"}
                      </span>
                    </div>
                    <div className="flex py-2.5 px-4">
                      <span className="w-40 font-semibold text-gray-500">Care Instructions</span>
                      <span className="text-gray-800">
                        {isApparel
                          ? "Machine wash cold inside-out, do not iron on print"
                          : isMug
                          ? "Dishwasher safe (top rack), microwave safe"
                          : "Wipe clean with a soft dry cloth"}
                      </span>
                    </div>
                    <div className="flex py-2.5 px-4 bg-[#FCF9F6]">
                      <span className="w-40 font-semibold text-gray-500">Packaging</span>
                      <span className="text-gray-800">Safe &amp; Premium Rooh Vastr Gift Packaging</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="max-w-2xl bg-white rounded-xl border border-[#EAE0D5] p-5 text-xs space-y-3">
                <h4 className="font-bold text-gray-800">Technical &amp; Quality Details</h4>
                <p className="text-gray-600 leading-relaxed">
                  {isApparel
                    ? "Crafted from 240 GSM heavyweight combed cotton that has undergone bio-washing to remove loose fibers and minimize pilling. The Direct-to-Film (DTF) print uses OEKO-TEX certified skin-friendly inks that stretch with the fabric without cracking."
                    : isMug
                    ? "Every ceramic mug is fired at 1200°C for maximum structural integrity. The sublimation coating ensures that heat, detergent, and microwave exposure will not peel or fade the color spectrum."
                    : `${product.name} is meticulously handcrafted and inspected for flawless print alignment, color richness, and long-term durability.`}
                </p>
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="max-w-2xl bg-white rounded-xl border border-[#EAE0D5] p-5 text-xs space-y-3 text-gray-600 leading-relaxed">
                <p><strong>Dispatch:</strong> Custom printed within 24-48 hours of order confirmation.</p>
                <p><strong>Delivery:</strong> 3-5 business days across metro cities; 5-7 days for rest of India.</p>
                <p><strong>Tracking:</strong> Real-time tracking link sent via SMS and WhatsApp once shipped.</p>
              </div>
            )}

            {activeTab === "returns" && (
              <div className="max-w-2xl bg-white rounded-xl border border-[#EAE0D5] p-5 text-xs space-y-3 text-gray-600 leading-relaxed">
                <p>Since this item is personalized with custom photos/text, returns are only accepted in cases of transit damage or manufacturing defects.</p>
                <p>In case of damage, simply share an unboxing photo on WhatsApp (+91 96548 61504) within 48 hours for an instant free reprint.</p>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-4 max-w-3xl">
                {reviews.map((rev) => (
                  <div key={rev.id} className="p-4 bg-white rounded-xl border border-[#EAE0D5] text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-800">{rev.customer_name}</span>
                      <div className="flex items-center text-[#F59E0B]">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600">{rev.comment}</p>
                    <span className="text-[10px] text-gray-400">{rev.created_at}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "faqs" && (
              <div className="max-w-2xl space-y-2 text-xs">
                {isApparel ? (
                  <>
                    <div className="p-3.5 bg-white rounded-xl border border-[#EAE0D5]">
                      <div className="font-bold text-gray-800 mb-1">How does the sizing fit?</div>
                      <div className="text-gray-600">Our t-shirts are true-to-size unisex comfort fit. If you prefer a loose oversized look, we recommend sizing up one size.</div>
                    </div>
                    <div className="p-3.5 bg-white rounded-xl border border-[#EAE0D5]">
                      <div className="font-bold text-gray-800 mb-1">Will the print fade after washing?</div>
                      <div className="text-gray-600">No! We use premium DTF printing. Just wash inside out in cold water and avoid direct ironing on the print.</div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-3.5 bg-white rounded-xl border border-[#EAE0D5]">
                      <div className="font-bold text-gray-800 mb-1">Will the photo wash off in the dishwasher?</div>
                      <div className="text-gray-600">No! We use permanent dye-sublimation heat transfer that embeds into the ceramic glaze.</div>
                    </div>
                    <div className="p-3.5 bg-white rounded-xl border border-[#EAE0D5]">
                      <div className="font-bold text-gray-800 mb-1">Can I see a design preview before printing?</div>
                      <div className="text-gray-600">Yes! If requested, our design team will WhatsApp you a digital mockup before printing.</div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </section>

        {/* 4. Related Products Section */}
        <section className="pt-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl font-bold text-[#242124]">
              Related Products
            </h2>
            <Link
              href={`/shop?category=${categorySlug}`}
              className="text-xs font-bold text-[#5B132B] hover:underline flex items-center gap-1 group"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {relatedProducts.slice(0, 6).map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
