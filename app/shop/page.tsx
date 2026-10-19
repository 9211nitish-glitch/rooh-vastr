"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { SEED_PRODUCTS } from "@/lib/data/store-data";
import ProductCard from "@/components/storefront/ProductCard";
import DualPromoBanners from "@/components/storefront/DualPromoBanners";
import { 
  SlidersHorizontal, 
  ChevronDown, 
  ChevronUp, 
  Gem, 
  ShieldCheck, 
  Truck, 
  ChevronLeft, 
  ChevronRight,
  Check,
  X,
  Menu
} from "lucide-react";

// Canonical Category Definitions
const CATEGORY_DEFINITIONS = [
  { id: "t-shirts", label: "T-Shirts" },
  { id: "mugs", label: "Mugs" },
  { id: "cushions", label: "Cushions" },
  { id: "keychains", label: "Keychains" },
  { id: "frames", label: "Photo Frames" },
  { id: "phone-cases", label: "Phone Cases" },
  { id: "bottles", label: "Bottles" },
  { id: "hoodies", label: "Hoodies" },
  { id: "corporate", label: "Corporate Gifts" },
];

export const normalizeCategory = (cat: string): string => {
  const c = cat.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (c.includes("tshirt") || c.includes("tee")) return "t-shirts";
  if (c.includes("mug")) return "mugs";
  if (c.includes("cushion") || c.includes("pillow")) return "cushions";
  if (c.includes("keychain") || c.includes("keyring")) return "keychains";
  if (c.includes("frame") || c.includes("poster") || c.includes("wallart")) return "frames";
  if (c.includes("case") || c.includes("phone")) return "phone-cases";
  if (c.includes("bottle") || c.includes("flask") || c.includes("sipper")) return "bottles";
  if (c.includes("hoodie") || c.includes("sweatshirt")) return "hoodies";
  if (c.includes("corporate") || c.includes("bulk") || c.includes("business")) return "corporate";
  return "other";
};

const OCCASIONS_LIST = [
  "Birthday",
  "Anniversary",
  "Valentine's Day",
  "Friendship Day",
  "Festivals",
  "Wedding",
  "Graduation",
  "Corporate",
  "Just Because",
];

const RECIPIENTS_LIST = [
  "For Him",
  "For Her",
  "For Kids",
  "For Friends",
  "For Family",
  "For Couple",
  "For Colleagues",
];

const COLOR_SWATCHES = [
  { name: "White", hex: "#FFFFFF", border: true },
  { name: "Black", hex: "#222222" },
  { name: "Grey", hex: "#7E7E7E" },
  { name: "Maroon", hex: "#5B132B" },
  { name: "Red", hex: "#E53E3E" },
  { name: "Blue", hex: "#38BDF8" },
  { name: "Yellow", hex: "#FBBF24" },
  { name: "Beige", hex: "#F5EBE1" },
];

const PRICE_CHIPS = [
  { label: "₹0 – ₹500", min: 0, max: 500 },
  { label: "₹500 – ₹1,000", min: 500, max: 1000 },
  { label: "₹1,000 – ₹2,000", min: 1000, max: 2000 },
  { label: "Above ₹2,000", min: 2000, max: 10000 },
];

function ShopCatalog() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const searchQueryParam = searchParams.get("search");

  // Dynamic Category Counts
  const categoriesList = useMemo(() => {
    return CATEGORY_DEFINITIONS.map((cat) => {
      const count = SEED_PRODUCTS.filter((p) => {
        const prodCat = normalizeCategory(
          `${p.category_id || ""} ${p.category_name || ""} ${p.slug || ""}`
        );
        return prodCat === cat.id;
      }).length;
      return { ...cat, count };
    });
  }, []);

  const initialCat = useMemo(() => {
    if (!categoryParam) return [];
    return [normalizeCategory(categoryParam)];
  }, [categoryParam]);

  // Filter States
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCat);
  const [selectedPriceRange, setSelectedPriceRange] = useState<number>(2000);
  const [activePriceChip, setActivePriceChip] = useState<string | null>(null);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Sync category param if URL changes
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategories([normalizeCategory(categoryParam)]);
    }
  }, [categoryParam]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedCategories,
    selectedPriceRange,
    activePriceChip,
    selectedOccasions,
    selectedRecipients,
    selectedColor,
    inStockOnly,
    sortBy,
  ]);

  // Lock body scroll when mobile filter is open
  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileFilterOpen]);

  const activeFilterCount = useMemo(() => {
    return (
      selectedCategories.length +
      (activePriceChip || selectedPriceRange < 2000 ? 1 : 0) +
      selectedOccasions.length +
      selectedRecipients.length +
      (selectedColor ? 1 : 0) +
      (inStockOnly ? 1 : 0)
    );
  }, [
    selectedCategories,
    activePriceChip,
    selectedPriceRange,
    selectedOccasions,
    selectedRecipients,
    selectedColor,
    inStockOnly,
  ]);

  // Accordion Toggles
  const [openSections, setOpenSections] = useState({
    category: true,
    price: true,
    occasion: true,
    recipient: true,
    color: true,
    availability: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedPriceRange(2000);
    setActivePriceChip(null);
    setSelectedOccasions([]);
    setSelectedRecipients([]);
    setSelectedColor(null);
    setInStockOnly(false);
  };

  const handleCategoryToggle = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleOccasionToggle = (occ: string) => {
    setSelectedOccasions((prev) =>
      prev.includes(occ) ? prev.filter((o) => o !== occ) : [...prev, occ]
    );
  };

  const handleRecipientToggle = (rec: string) => {
    setSelectedRecipients((prev) =>
      prev.includes(rec) ? prev.filter((r) => r !== rec) : [...prev, rec]
    );
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return SEED_PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategories.length > 0) {
        const prodCat = normalizeCategory(
          `${product.category_id || ""} ${product.category_name || ""} ${product.slug || ""}`
        );
        const matchesCategory = selectedCategories.some(
          (catId) => normalizeCategory(catId) === prodCat
        );
        if (!matchesCategory) return false;
      }

      // Occasion filter
      if (selectedOccasions.length > 0) {
        const text = `${product.name} ${product.description || ""} ${product.short_description || ""}`.toLowerCase();
        const matchesOccasion = selectedOccasions.some((occ) => {
          if (product.occasions && product.occasions.includes(occ)) return true;
          return text.includes(occ.toLowerCase());
        });
        if (!matchesOccasion) return false;
      }

      // Recipient filter
      if (selectedRecipients.length > 0) {
        const text = `${product.name} ${product.description || ""} ${product.short_description || ""}`.toLowerCase();
        const matchesRecipient = selectedRecipients.some((rec) => {
          if (product.recipients && product.recipients.includes(rec)) return true;
          if (rec === "For Him" && (text.includes("him") || text.includes("men") || text.includes("his") || text.includes("unisex"))) return true;
          if (rec === "For Her" && (text.includes("her") || text.includes("women") || text.includes("unisex"))) return true;
          if (rec === "For Couple" && (text.includes("couple") || text.includes("together") || text.includes("pair"))) return true;
          if (rec === "For Kids" && (text.includes("kid") || text.includes("baby") || text.includes("toddler"))) return true;
          if (rec === "For Friends" && (text.includes("friend") || text.includes("bestie"))) return true;
          if (rec === "For Family" && (text.includes("family") || text.includes("home"))) return true;
          if (rec === "For Colleagues" && (text.includes("corporate") || text.includes("colleague") || text.includes("desk"))) return true;
          return text.includes(rec.toLowerCase().replace("for ", ""));
        });
        if (!matchesRecipient) return false;
      }

      // Color filter
      if (selectedColor) {
        const colorLower = selectedColor.toLowerCase();
        const text = `${product.name} ${product.description || ""} ${product.short_description || ""} ${product.material || ""}`.toLowerCase();
        const hasColor = text.includes(colorLower) ||
          (colorLower === "white" && !text.includes("black only")) ||
          (colorLower === "black" && !text.includes("white only"));
        if (!hasColor) return false;
      }

      // Search keyword filter (e.g. from ?search=...)
      if (searchQueryParam) {
        const q = searchQueryParam.toLowerCase().trim();
        const text = `${product.name} ${product.category_name || ""} ${product.description || ""} ${product.short_description || ""}`.toLowerCase();
        if (!text.includes(q)) return false;
      }

      // Price Chip or Slider filter
      const price = product.selling_price || product.regular_price;
      if (activePriceChip) {
        const chip = PRICE_CHIPS.find((c) => c.label === activePriceChip);
        if (chip && (price < chip.min || price > chip.max)) return false;
      } else {
        if (price > selectedPriceRange) return false;
      }

      // In stock only filter
      if (inStockOnly && (product.stock_quantity ?? 0) <= 0) return false;

      return true;
    }).sort((a, b) => {
      const priceA = a.selling_price || a.regular_price;
      const priceB = b.selling_price || b.regular_price;
      if (sortBy === "price-low") return priceA - priceB;
      if (sortBy === "price-high") return priceB - priceA;
      if (sortBy === "rating") return -1;
      return 0; // featured default
    });
  }, [
    selectedCategories,
    selectedPriceRange,
    activePriceChip,
    selectedOccasions,
    selectedRecipients,
    selectedColor,
    inStockOnly,
    searchQueryParam,
    sortBy,
  ]);

  // Pagination calculation
  const ITEMS_PER_PAGE = 12;
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // Render reusable filter accordions
  const renderFilterAccordions = () => (
    <>
      {/* Accordion 1: Category */}
      <div className="space-y-3 pb-5 border-b border-[#EAE0D5]">
        <button
          type="button"
          onClick={() => toggleSection("category")}
          className="w-full flex items-center justify-between text-xs font-bold text-[#242124] uppercase tracking-wider cursor-pointer"
        >
          <span>Category</span>
          {openSections.category ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </button>

        {openSections.category && (
          <div className="space-y-2 pt-1 max-h-56 overflow-y-auto pr-1">
            {categoriesList.map((cat) => {
              const isChecked = selectedCategories.includes(cat.id);
              return (
                <label
                  key={cat.id}
                  className="flex items-center justify-between text-xs text-gray-700 hover:text-[#5B132B] cursor-pointer select-none"
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleCategoryToggle(cat.id)}
                      className="w-3.5 h-3.5 rounded border-gray-300 text-[#5B132B] focus:ring-[#5B132B]"
                    />
                    <span>{cat.label}</span>
                  </div>
                  <span className="text-[11px] text-gray-400">({cat.count})</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Accordion 2: Price Range */}
      <div className="space-y-3 pb-5 border-b border-[#EAE0D5]">
        <button
          type="button"
          onClick={() => toggleSection("price")}
          className="w-full flex items-center justify-between text-xs font-bold text-[#242124] uppercase tracking-wider cursor-pointer"
        >
          <span>Price Range</span>
          {openSections.price ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </button>

        {openSections.price && (
          <div className="space-y-3 pt-1">
            <div className="flex justify-between text-xs font-semibold text-gray-700">
              <span>₹0 – ₹{selectedPriceRange.toLocaleString()}</span>
            </div>

            <input
              type="range"
              min="300"
              max="2000"
              step="100"
              value={selectedPriceRange}
              onChange={(e) => {
                setSelectedPriceRange(Number(e.target.value));
                setActivePriceChip(null);
              }}
              className="w-full accent-[#5B132B] cursor-pointer"
            />

            {/* 4 Price Quick-Filter Chips */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              {PRICE_CHIPS.map((chip) => {
                const isActive = activePriceChip === chip.label;
                return (
                  <button
                    key={chip.label}
                    type="button"
                    onClick={() => {
                      if (isActive) {
                        setActivePriceChip(null);
                      } else {
                        setActivePriceChip(chip.label);
                        setSelectedPriceRange(chip.max);
                      }
                    }}
                    className={`px-2 py-1.5 rounded-lg border text-[11px] font-medium transition-colors cursor-pointer ${
                      isActive
                        ? "bg-[#5B132B] text-white border-[#5B132B]"
                        : "bg-[#FAF7F2] text-gray-700 border-[#EAE0D5] hover:border-[#5B132B]"
                    }`}
                  >
                    {chip.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Accordion 3: Occasion */}
      <div className="space-y-3 pb-5 border-b border-[#EAE0D5]">
        <button
          type="button"
          onClick={() => toggleSection("occasion")}
          className="w-full flex items-center justify-between text-xs font-bold text-[#242124] uppercase tracking-wider cursor-pointer"
        >
          <span>Occasion</span>
          {openSections.occasion ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </button>

        {openSections.occasion && (
          <div className="space-y-2 pt-1 max-h-48 overflow-y-auto pr-1">
            {OCCASIONS_LIST.map((occ) => {
              const isChecked = selectedOccasions.includes(occ);
              return (
                <label
                  key={occ}
                  className="flex items-center gap-2.5 text-xs text-gray-700 hover:text-[#5B132B] cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleOccasionToggle(occ)}
                    className="w-3.5 h-3.5 rounded border-gray-300 text-[#5B132B] focus:ring-[#5B132B]"
                  />
                  <span>{occ}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Accordion 4: Recipient */}
      <div className="space-y-3 pb-5 border-b border-[#EAE0D5]">
        <button
          type="button"
          onClick={() => toggleSection("recipient")}
          className="w-full flex items-center justify-between text-xs font-bold text-[#242124] uppercase tracking-wider cursor-pointer"
        >
          <span>Recipient</span>
          {openSections.recipient ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </button>

        {openSections.recipient && (
          <div className="space-y-2 pt-1">
            {RECIPIENTS_LIST.map((rec) => {
              const isChecked = selectedRecipients.includes(rec);
              return (
                <label
                  key={rec}
                  className="flex items-center gap-2.5 text-xs text-gray-700 hover:text-[#5B132B] cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleRecipientToggle(rec)}
                    className="w-3.5 h-3.5 rounded border-gray-300 text-[#5B132B] focus:ring-[#5B132B]"
                  />
                  <span>{rec}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Accordion 5: Color */}
      <div className="space-y-3 pb-5 border-b border-[#EAE0D5]">
        <button
          type="button"
          onClick={() => toggleSection("color")}
          className="w-full flex items-center justify-between text-xs font-bold text-[#242124] uppercase tracking-wider cursor-pointer"
        >
          <span>Color</span>
          {openSections.color ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </button>

        {openSections.color && (
          <div className="flex flex-wrap gap-2.5 pt-1">
            {COLOR_SWATCHES.map((swatch) => {
              const isSelected = selectedColor === swatch.name;
              return (
                <button
                  key={swatch.name}
                  type="button"
                  onClick={() =>
                    setSelectedColor(isSelected ? null : swatch.name)
                  }
                  title={swatch.name}
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform hover:scale-110 cursor-pointer ${
                    swatch.border ? "border border-gray-300" : ""
                  } ${isSelected ? "ring-2 ring-offset-2 ring-[#5B132B]" : ""}`}
                  style={{ backgroundColor: swatch.hex }}
                >
                  {isSelected && (
                    <Check
                      className={`w-3 h-3 ${
                        swatch.name === "White" || swatch.name === "Beige"
                          ? "text-gray-800"
                          : "text-white"
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Accordion 6: Availability */}
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => toggleSection("availability")}
          className="w-full flex items-center justify-between text-xs font-bold text-[#242124] uppercase tracking-wider cursor-pointer"
        >
          <span>Availability</span>
          {openSections.availability ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </button>

        {openSections.availability && (
          <label className="flex items-center gap-2.5 text-xs text-gray-700 hover:text-[#5B132B] cursor-pointer select-none pt-1">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="w-3.5 h-3.5 rounded border-gray-300 text-[#5B132B] focus:ring-[#5B132B]"
            />
            <span>In Stock Only</span>
          </label>
        )}
      </div>
    </>
  );

  return (
    <div className="bg-[#FCF9F6] min-h-screen">
      {/* 1. Header Banner with Montage & Trust Badges (Image 2) */}
      <section className="bg-gradient-to-r from-[#FAF4EE] via-[#F6ECE2] to-[#F1E4D6] border-b border-[#EAE0D5] py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Header Copy & Trust Badges */}
            <div className="lg:col-span-7 space-y-4">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                <Link href="/" className="hover:text-[#5B132B]">
                  Home
                </Link>
                <span>&gt;</span>
                <span className="text-[#5B132B] font-semibold">Shop All</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#242124] tracking-tight">
                Shop All Products
              </h1>

              <p className="text-xs sm:text-sm text-gray-600 max-w-xl leading-relaxed">
                Explore our complete collection of personalized gifts, custom prints and unique merchandise.
              </p>

              {/* 3 Trust Badges Row */}
              <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-gray-700 font-medium">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#5B132B] shadow-2xs border border-[#EAE0D5]">
                    <Gem className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-[#242124] text-[11px] leading-tight">Premium Quality</div>
                    <div className="text-[10px] text-gray-500">Long Lasting Prints</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#5B132B] shadow-2xs border border-[#EAE0D5]">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-[#242124] text-[11px] leading-tight">Safe &amp; Secure</div>
                    <div className="text-[10px] text-gray-500">Payments</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#5B132B] shadow-2xs border border-[#EAE0D5]">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-[#242124] text-[11px] leading-tight">Fast &amp; Reliable</div>
                    <div className="text-[10px] text-gray-500">Delivery</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Header Product Montage */}
            <div className="lg:col-span-5 hidden lg:flex justify-end">
              <div className="relative w-80 h-44 rounded-2xl overflow-hidden shadow-sm border border-white">
                <Image
                  src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80"
                  alt="Shop All Products Montage"
                  fill
                  sizes="320px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Catalog: Left Sidebar + Right Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar Filters (Desktop only) */}
          <aside className="hidden lg:block lg:col-span-3 bg-white rounded-2xl p-5 border border-[#EAE0D5] shadow-2xs space-y-6">
            {/* Filter Title & Clear All */}
            <div className="flex items-center justify-between pb-4 border-b border-[#EAE0D5]">
              <div className="flex items-center gap-2 font-bold text-sm text-[#242124]">
                <SlidersHorizontal className="w-4 h-4 text-[#5B132B]" />
                <span>Filters</span>
                {activeFilterCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-[#5B132B] text-white text-[10px] font-bold">
                    {activeFilterCount}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-xs font-semibold text-[#5B132B] hover:underline cursor-pointer"
              >
                Clear All
              </button>
            </div>

            {renderFilterAccordions()}
          </aside>

          {/* Right Product Grid Area (9 Cols on desktop, full on mobile) */}
          <main className="w-full lg:col-span-9 space-y-6">
            {/* Header Sorting Bar with Mobile 3-line Hamburger Filter Button */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#EAE0D5]">
              <div className="flex items-center gap-3">
                {/* 3-Line Hamburger Filter Trigger for Mobile / Tablet */}
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white border border-[#EAE0D5] text-[#242124] text-xs font-semibold shadow-2xs hover:border-[#5B132B] active:scale-95 transition-all cursor-pointer"
                  aria-label="Open filter drawer"
                >
                  <div className="flex flex-col gap-[3px] justify-center items-start">
                    <span className="w-4 h-[2px] bg-[#5B132B] rounded-full" />
                    <span className="w-2.5 h-[2px] bg-[#5B132B] rounded-full" />
                    <span className="w-3.5 h-[2px] bg-[#5B132B] rounded-full" />
                  </div>
                  <span>Filters</span>
                  {activeFilterCount > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full bg-[#5B132B] text-white text-[10px] font-bold">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                <span className="text-xs text-gray-600 font-medium">
                  Showing{" "}
                  {filteredProducts.length > 0
                    ? `${(currentPage - 1) * ITEMS_PER_PAGE + 1}–${Math.min(
                        currentPage * ITEMS_PER_PAGE,
                        filteredProducts.length
                      )}`
                    : "0"}{" "}
                  of {filteredProducts.length} products
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-500 font-medium hidden sm:inline">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-[#EAE0D5] rounded-lg px-3 py-1.5 text-xs font-medium text-gray-800 focus:border-[#5B132B] outline-none cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                </select>
              </div>
            </div>

            {/* 4-column Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-[#EAE0D5] p-8 space-y-3">
                <h3 className="font-serif text-lg font-bold text-[#242124]">
                  No products match your filters
                </h3>
                <p className="text-xs text-gray-500">
                  Try clearing some filter criteria to browse all personalized keepsakes.
                </p>
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="px-5 py-2 rounded-full bg-[#5B132B] text-white text-xs font-semibold hover:bg-[#450d20] cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {paginatedProducts.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            )}

            {/* Pagination Component */}
            {totalPages > 1 && (
              <div className="pt-8 flex items-center justify-center gap-1.5 text-xs font-semibold">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  aria-label="Previous Page"
                  className="w-8 h-8 rounded-lg border border-[#EAE0D5] bg-white text-gray-600 hover:bg-[#FAF4EE] flex items-center justify-center disabled:opacity-40 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      currentPage === page
                        ? "bg-[#5B132B] text-white"
                        : "bg-white border border-[#EAE0D5] text-gray-700 hover:bg-[#FAF4EE]"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  aria-label="Next Page"
                  className="w-8 h-8 rounded-lg border border-[#EAE0D5] bg-white text-gray-600 hover:bg-[#FAF4EE] flex items-center justify-center disabled:opacity-40 cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Bottom Dual Promo Banners from Image 2 */}
            <div className="pt-8">
              <DualPromoBanners />
            </div>
          </main>
        </div>
      </section>

      {/* 3. Mobile Slide-Out Filter Drawer (Modal Sheet) */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsMobileFilterOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <div className="relative w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-250">
            {/* Drawer Top Header */}
            <div className="p-4 border-b border-[#EAE0D5] flex items-center justify-between bg-[#FAF7F2]">
              <div className="flex items-center gap-2.5">
                <div className="flex flex-col gap-[3px] justify-center items-start">
                  <span className="w-4 h-[2px] bg-[#5B132B] rounded-full" />
                  <span className="w-2.5 h-[2px] bg-[#5B132B] rounded-full" />
                  <span className="w-3.5 h-[2px] bg-[#5B132B] rounded-full" />
                </div>
                <h2 className="font-serif text-base font-bold text-[#242124]">Filters</h2>
                {activeFilterCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-[#5B132B] text-white text-[11px] font-bold">
                    {activeFilterCount}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="text-xs font-semibold text-[#5B132B] hover:underline cursor-pointer"
                >
                  Clear All
                </button>
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-8 h-8 rounded-full bg-white border border-[#EAE0D5] flex items-center justify-center text-gray-500 hover:text-gray-900 cursor-pointer"
                  aria-label="Close filters"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Filter Accordions */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {renderFilterAccordions()}
            </div>

            {/* Sticky Drawer Bottom Footer */}
            <div className="p-4 border-t border-[#EAE0D5] bg-[#FAF7F2] flex items-center gap-3">
              <button
                type="button"
                onClick={clearAllFilters}
                className="flex-1 py-2.5 rounded-xl border border-[#EAE0D5] bg-white text-gray-700 text-xs font-bold hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-2 py-2.5 rounded-xl bg-[#5B132B] text-white text-xs font-bold hover:bg-[#450d20] shadow-sm transition-colors cursor-pointer"
              >
                View {filteredProducts.length} Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF7F2] p-12 text-center text-xs text-stone-500">
          Loading catalog...
        </div>
      }
    >
      <ShopCatalog />
    </Suspense>
  );
}
