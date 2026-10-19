"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/context/CartContext";
import { formatPrice } from "@/lib/utils";
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Tag,
  Check,
  Truck,
  RotateCcw,
  ChevronRight,
  Gift,
} from "lucide-react";

const VALID_COUPONS: Record<string, { discountType: "percent" | "fixed"; value: number; label: string }> = {
  ROOHFIRST: { discountType: "percent", value: 15, label: "15% Welcome Discount" },
  MEMORIES100: { discountType: "fixed", value: 100, label: "₹100 Flat Festive Off" },
  STAYGIFT50: { discountType: "fixed", value: 50, label: "₹50 Exit Gift Discount" },
};

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, subtotal, clearCart } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  // Free shipping threshold
  const freeShippingThreshold = 999;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  // Calculate discount
  let discountAmount = 0;
  if (appliedCoupon && VALID_COUPONS[appliedCoupon]) {
    const c = VALID_COUPONS[appliedCoupon];
    if (c.discountType === "percent") {
      discountAmount = Math.round((subtotal * c.value) / 100);
    } else {
      discountAmount = Math.min(subtotal, c.value);
    }
  }

  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 99;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    const cleaned = couponCode.trim().toUpperCase();

    if (VALID_COUPONS[cleaned]) {
      setAppliedCoupon(cleaned);
      setCouponCode("");
    } else {
      setCouponError("Invalid coupon code. Try ROOHFIRST or MEMORIES100.");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#FAF7F2] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 text-center border border-stone-200/80 shadow-xs space-y-5">
          <div className="w-20 h-20 bg-[#6D1835]/10 rounded-full flex items-center justify-center mx-auto text-[#6D1835]">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#242124]">
            Your Shopping Bag is Empty
          </h1>
          <p className="text-stone-500 text-xs sm:text-sm leading-relaxed">
            Discover our curated organic cotton apparel, personalized keepsakes, and custom print offerings.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#6D1835] hover:bg-[#521327] text-white font-bold text-sm shadow-md transition-all"
            >
              <span>Explore Collections</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb */}
        <div className="text-xs text-gray-500 flex items-center gap-2">
          <Link href="/" className="hover:text-[#6D1835]">Home</Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <Link href="/shop" className="hover:text-[#6D1835]">Shop</Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-[#242124] font-medium">Your Shopping Bag ({items.length})</span>
        </div>

        {/* Free Shipping Alert Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-[#242124]">
            <span className="flex items-center gap-2 text-[#6D1835]">
              <Truck className="w-4 h-4" />
              {amountToFreeShipping === 0 ? (
                <span className="text-emerald-700 font-bold">
                  Hooray! You&apos;ve unlocked FREE Express Delivery!
                </span>
              ) : (
                <span>
                  Add <strong>{formatPrice(amountToFreeShipping)}</strong> more to get <strong>FREE Delivery</strong>
                </span>
              )}
            </span>
            <span>{Math.round(progressPercent)}%</span>
          </div>
          <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-[#6D1835] h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Items List (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#242124]">
                Items in Bag ({items.length})
              </h2>
              <button
                type="button"
                onClick={clearCart}
                className="text-xs text-stone-400 hover:text-rose-600 transition-colors"
              >
                Clear all
              </button>
            </div>

            <div className="divide-y divide-stone-100">
              {items.map((item) => {
                const img =
                  item.product.primary_image ||
                  item.product.images?.[0]?.image_url ||
                  "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80";

                return (
                  <div key={item.id} className="py-6 first:pt-2 last:pb-2 flex gap-4 sm:gap-6">
                    {/* Thumbnail */}
                    <div className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-2xl overflow-hidden bg-stone-100 flex-shrink-0 border border-stone-200">
                      <Image
                        src={img}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        <div className="flex justify-between items-start gap-2">
                          <Link
                            href={`/product/${item.product.slug}`}
                            className="font-serif text-sm sm:text-base font-bold text-[#242124] hover:text-[#6D1835] transition-colors line-clamp-2"
                          >
                            {item.product.name}
                          </Link>
                          <span className="font-bold text-sm sm:text-base text-[#242124]">
                            {formatPrice(item.item_total)}
                          </span>
                        </div>

                        {/* Variants */}
                        <div className="flex flex-wrap gap-2 pt-1 text-xs text-stone-500">
                          {item.selected_size && (
                            <span className="bg-stone-100 px-2.5 py-0.5 rounded-md font-medium text-stone-700">
                              Size: {item.selected_size}
                            </span>
                          )}
                          {item.selected_color && (
                            <span className="bg-stone-100 px-2.5 py-0.5 rounded-md font-medium text-stone-700">
                              Color: {item.selected_color}
                            </span>
                          )}
                          <span className="text-stone-400">
                            ({formatPrice(item.unit_price)} each)
                          </span>
                        </div>
                      </div>

                      {/* Quantity & Delete Actions */}
                      <div className="flex items-center justify-between pt-3">
                        <div className="flex items-center border border-stone-300 rounded-xl bg-[#FAF7F2] px-2 py-1">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-md text-stone-600 hover:bg-stone-200 flex items-center justify-center font-bold text-sm"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-[#242124]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-md text-stone-600 hover:bg-stone-200 flex items-center justify-center font-bold text-sm"
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Order Summary & Coupon (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Coupon Code Card */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs space-y-3">
              <span className="text-xs font-bold text-[#242124] uppercase tracking-wide flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-[#6D1835]" /> Apply Promo Code
              </span>

              {appliedCoupon ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <div>
                      <p className="text-xs font-bold text-emerald-800">{appliedCoupon}</p>
                      <p className="text-[11px] text-emerald-600">
                        {VALID_COUPONS[appliedCoupon].label}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveCoupon}
                    className="text-xs text-stone-400 hover:text-rose-600 underline font-medium"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. ROOHFIRST"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 px-3.5 py-2.5 bg-[#FAF7F2] border border-stone-300 rounded-xl text-xs uppercase font-mono font-bold text-[#242124] focus:outline-none focus:ring-1 focus:ring-[#6D1835]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-[#242124] hover:bg-[#383438] text-white text-xs font-bold rounded-xl transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-[11px] text-rose-600 font-medium">{couponError}</p>
                  )}
                  <div className="pt-1 flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() => setCouponCode("ROOHFIRST")}
                      className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md hover:bg-stone-200"
                    >
                      Use &quot;ROOHFIRST&quot; (15% Off)
                    </button>
                    <button
                      type="button"
                      onClick={() => setCouponCode("MEMORIES100")}
                      className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md hover:bg-stone-200"
                    >
                      &quot;MEMORIES100&quot; (₹100 Off)
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Price Breakdown Card */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#242124] border-b border-stone-100 pb-3">
                Order Summary
              </h3>

              <div className="space-y-2.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-stone-900">{formatPrice(subtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Coupon Discount</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span>
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-semibold uppercase">Free</span>
                    ) : (
                      formatPrice(shippingFee)
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-[11px] text-stone-400">
                  <span>Estimated GST (Included)</span>
                  <span>18% Inclusive</span>
                </div>

                <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline text-sm font-bold text-[#242124]">
                  <span>Total Amount</span>
                  <span className="text-2xl text-[#6D1835] font-serif">
                    {formatPrice(finalTotal)}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <div className="pt-2">
                <Link
                  href="/checkout"
                  className="w-full py-4 px-6 rounded-2xl bg-[#6D1835] hover:bg-[#521327] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-3 border-t border-stone-100 grid grid-cols-2 gap-2 text-[11px] text-stone-500">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#6D1835]" /> 256-Bit SSL Secure
                </span>
                <span className="flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5 text-[#6D1835]" /> 7-Day Easy Returns
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
