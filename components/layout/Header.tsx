"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  Sparkles, 
  MessageCircle,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Heart,
  User,
  Building2,
  HelpCircle
} from "lucide-react";
import { useCart } from "@/lib/context/CartContext";
import { useWishlist } from "@/lib/context/WishlistContext";
import { formatPrice } from "@/lib/utils";
import GiftFinderModal from "@/components/ai/GiftFinderModal";

export default function Header() {
  const pathname = usePathname();
  const { items, itemCount, subtotal, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart } = useCart();
  const { wishlistCount } = useWishlist();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const categoriesNav = [
    { name: "Shop All", href: "/shop" },
    { name: "T-Shirts", href: "/shop?category=t-shirts" },
    { name: "Mugs", href: "/shop?category=mugs" },
    { name: "Cushions", href: "/shop?category=cushions" },
    { name: "Keychains", href: "/shop?category=keychains" },
    { name: "Photo Frames", href: "/shop?category=frames" },
    { name: "Gifts by Occasion", href: "/#occasions" },
    { name: "Custom Printing", href: "/custom-printing" },
    { name: "Bulk Orders", href: "/bulk-orders" },
    { name: "Blog", href: "/blog" },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      {/* 1. Top Announcement Bar */}
      <div className="bg-[#6D1835] text-white text-[10px] sm:text-xs py-1.5 px-3 sm:px-4 transition-all overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 font-medium truncate">
            <span className="truncate">Free delivery on orders above ₹499</span>
          </div>
          <div className="hidden sm:flex items-center justify-center text-center gap-1.5 font-medium shrink-0">
            <span className="opacity-80">❤</span>
            <span>Your Ideas. Our Prints. Made with Meaning.</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] sm:text-[11px] shrink-0">
            <a 
              href="https://wa.me/919654861504" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1 hover:text-amber-200 transition-colors"
            >
              <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-300" />
              <span className="hidden xs:inline">Custom Orders</span>
              <span className="xs:hidden">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Header Bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-stone-200 shadow-[0_2px_10px_rgba(0,0,0,0.03)] transition-all">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
            {/* Mobile menu trigger */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-1.5 -ml-1 rounded-md text-[#242124] hover:text-[#6D1835] focus:outline-none"
                aria-label="Toggle Navigation"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
            </div>

            {/* Brand Logo & Tagline */}
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0 text-left">
              <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-[#D4AF37]/60 shadow-xs shrink-0 bg-[#FAF7F2]">
                <Image
                  src="/images/brand/logo.jpg"
                  alt="Rooh Vastr Logo"
                  width={44}
                  height={44}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-[#6D1835] group-hover:text-[#4F1026] transition-colors leading-none">
                  ROOH VASTR
                </span>
                <span className="text-[7.5px] sm:text-[9px] uppercase tracking-[0.16em] sm:tracking-[0.22em] text-[#C98F9F] font-semibold mt-0.5 sm:mt-1 truncate max-w-[190px] sm:max-w-none">
                  Wear Your Story, Gift Your Feelings
                </span>
              </div>
            </Link>

            {/* Centered Search Bar (Desktop) */}
            <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center flex-1 max-w-xl mx-4">
              <div className="relative w-full flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for personalized gifts, T-shirts, mugs and more..."
                  className="w-full text-xs text-stone-800 bg-[#FAF7F2] border border-stone-300 rounded-l-full py-2.5 pl-4 pr-3 focus:outline-none focus:border-[#6D1835] focus:bg-white transition-all placeholder:text-stone-400"
                />
                <button
                  type="submit"
                  className="h-[38px] px-5 bg-[#6D1835] text-white rounded-r-full flex items-center justify-center hover:bg-[#56132a] transition-colors shrink-0 shadow-xs cursor-pointer"
                  title="Search"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Right Action Icons (Wishlist, Account, Cart) */}
            <div className="flex items-center space-x-1.5 sm:space-x-4">
              {/* AI Gift Finder Button */}
              <button
                type="button"
                onClick={() => setIsGiftModalOpen(true)}
                className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#FAF7F2] text-[#6D1835] border border-[#6D1835]/30 hover:bg-[#6D1835] hover:text-white transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>AI Gift Finder</span>
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="flex items-center gap-1 text-stone-700 hover:text-[#6D1835] transition-colors p-1"
                title="Wishlist"
              >
                <div className="relative">
                  <Heart className="w-5 h-5 text-stone-700" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#6D1835] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </div>
                <span className="text-xs font-medium hidden sm:inline">Wishlist</span>
              </Link>

              {/* Account */}
              <Link
                href="/account"
                className="flex items-center gap-1 text-stone-700 hover:text-[#6D1835] transition-colors p-1"
                title="Account"
              >
                <User className="w-5 h-5 text-stone-700" />
                <span className="text-xs font-medium hidden sm:inline">Account</span>
              </Link>

              {/* Shopping Bag */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-1 text-stone-700 hover:text-[#6D1835] transition-colors p-1 cursor-pointer"
                aria-label="View shopping bag"
              >
                <div className="relative">
                  <ShoppingBag className="w-5 h-5 text-stone-700" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#6D1835] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </div>
                <div className="hidden sm:flex flex-col text-left text-xs leading-none">
                  <span className="font-semibold text-stone-900">Cart</span>
                  {subtotal > 0 && (
                    <span className="text-[10px] text-stone-500 font-mono mt-0.5">{formatPrice(subtotal)}</span>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* 3. Sub-Navbar for Categories & Need Help link */}
        <div className="border-t border-stone-200 bg-white">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between text-xs font-medium text-stone-700 py-2 sm:py-2.5 overflow-x-auto scrollbar-none overscroll-x-contain">
              <nav className="flex items-center space-x-4 sm:space-x-7 shrink-0 pr-2">
                {categoriesNav.map((cat) => {
                  const isActive =
                    pathname === cat.href ||
                    (cat.href === "/shop" && (pathname === "/" || pathname === "/shop"));
                  return (
                    <Link
                      key={cat.name}
                      href={cat.href}
                      className={`whitespace-nowrap transition-colors pb-1 text-[11px] sm:text-xs ${
                        isActive
                          ? "font-bold text-[#6D1835] border-b-2 border-[#6D1835]"
                          : "text-stone-700 hover:text-[#6D1835]"
                      }`}
                    >
                      {cat.name}
                    </Link>
                  );
                })}
              </nav>

              <div className="hidden lg:flex items-center gap-1.5 text-stone-600 hover:text-[#6D1835] transition-colors shrink-0 ml-6 pl-4 border-l border-stone-200">
                <HelpCircle className="w-4 h-4 text-[#6D1835]" />
                <Link href="/faq" className="whitespace-nowrap font-medium text-xs">Need Help?</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar (under header on small screens) */}
        <div className="md:hidden px-3 py-2 bg-stone-50/90 backdrop-blur-xs border-t border-stone-200">
          <form onSubmit={handleSearchSubmit} className="flex items-center w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search gifts, tees, mugs..."
              className="w-full text-xs text-stone-800 bg-white border border-stone-300 rounded-l-full py-2 pl-3.5 pr-2 focus:outline-none focus:border-[#6D1835] shadow-2xs"
            />
            <button
              type="submit"
              className="h-[34px] px-3.5 bg-[#6D1835] hover:bg-[#56132a] text-white rounded-r-full flex items-center justify-center shrink-0 cursor-pointer shadow-2xs"
              aria-label="Search"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-[#EAE0D5] bg-[#FAF7F2] px-4 pt-3 pb-6 space-y-3">
            {categoriesNav.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 text-sm font-medium text-[#242124] hover:text-[#6D1835] border-b border-[#EAE0D5]/60"
              >
                <span>{link.name}</span>
              </Link>
            ))}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsGiftModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold bg-[#6D1835] text-white"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Launch AI Gift Finder</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Cart Slide-out Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[60] overflow-hidden">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsCartOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#FAF7F2] shadow-2xl flex flex-col border-l border-[#EAE0D5]">
              {/* Drawer Header */}
              <div className="p-5 border-b border-[#EAE0D5] flex items-center justify-between bg-white/60">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#6D1835]" />
                  <h2 className="font-serif text-lg font-bold text-[#242124]">Your Bag ({itemCount})</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 rounded-md text-gray-500 hover:text-gray-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-[#EAE0D5]/50 flex items-center justify-center text-gray-400 mb-4">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <p className="font-serif text-lg font-semibold text-[#242124]">Your bag is empty</p>
                    <p className="text-xs text-gray-500 max-w-xs mt-1">
                      Explore our premium apparel and thoughtful personalized gifts.
                    </p>
                    <Link
                      href="/shop"
                      onClick={() => setIsCartOpen(false)}
                      className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-[#6D1835] text-white rounded-full text-xs font-semibold hover:bg-[#4F1026] transition-colors"
                    >
                      Start Shopping <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="flex gap-4 p-3 bg-white rounded-xl border border-[#EAE0D5] shadow-xs">
                      <div className="w-20 h-20 bg-[#EAE0D5]/40 rounded-lg overflow-hidden shrink-0 relative">
                        <img
                          src={item.product.primary_image || "/placeholder.jpg"}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-xs text-[#242124] line-clamp-1">{item.product.name}</h3>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-400 hover:text-rose-600 transition-colors p-0.5"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-gray-500 mt-1">
                            {item.selected_size && <span>Size: {item.selected_size}</span>}
                            {item.selected_color && <span>• {item.selected_color}</span>}
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-[#EAE0D5] rounded-md bg-[#FAF7F2]">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:text-[#6D1835]"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-semibold">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:text-[#6D1835]"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="font-semibold text-xs text-[#6D1835]">
                            {formatPrice(item.item_total)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer */}
              {items.length > 0 && (
                <div className="p-5 border-t border-[#EAE0D5] bg-white space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-serif font-bold text-base text-[#242124]">{formatPrice(subtotal)}</span>
                  </div>
                  <p className="text-[11px] text-gray-500">Shipping & taxes calculated at checkout.</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/cart"
                      onClick={() => setIsCartOpen(false)}
                      className="py-2.5 px-4 text-center rounded-xl border border-[#6D1835] text-[#6D1835] text-xs font-semibold hover:bg-[#6D1835]/5 transition-colors"
                    >
                      View Cart
                    </Link>
                    <Link
                      href="/checkout"
                      onClick={() => setIsCartOpen(false)}
                      className="py-2.5 px-4 text-center rounded-xl bg-[#6D1835] text-white text-xs font-semibold hover:bg-[#4F1026] shadow-md transition-colors"
                    >
                      Checkout
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* AI Gift Finder Modal */}
      {isGiftModalOpen && (
        <GiftFinderModal isOpen={isGiftModalOpen} onClose={() => setIsGiftModalOpen(false)} />
      )}
    </>
  );
}
