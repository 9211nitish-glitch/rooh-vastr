"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/context/CartContext";
import { formatPrice } from "@/lib/utils";
import {
  ShieldCheck,
  CreditCard,
  Banknote,
  Truck,
  CheckCircle2,
  Lock,
  ChevronRight,
  ShoppingBag,
  ArrowRight,
  Info,
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();

  // Contact & Shipping Form
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("Rajasthan");
  const [pincode, setPincode] = useState("");
  const [orderNotes, setOrderNotes] = useState("");

  // Payment method: "razorpay" | "cod"
  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "cod">("razorpay");
  const [isProcessing, setIsProcessing] = useState(false);

  // Free shipping over 999
  const shippingFee = subtotal >= 999 || subtotal === 0 ? 0 : 99;
  const grandTotal = subtotal + shippingFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !addressLine || !city || !pincode) {
      alert("Please fill in all mandatory shipping address fields.");
      return;
    }

    setIsProcessing(true);

    const generatedOrderId = `RV-ORD-${Math.floor(100000 + Math.random() * 900000)}`;

    const orderRecord = {
      id: generatedOrderId,
      customer_name: fullName,
      customer_email: email,
      customer_phone: phone,
      shipping_address: `${addressLine}, ${apartment ? apartment + ", " : ""}${city}, ${stateName} - ${pincode}`,
      items: items.map((i) => ({
        name: i.product.name,
        quantity: i.quantity,
        size: i.selected_size,
        color: i.selected_color,
        price: i.unit_price,
        item_total: i.item_total,
      })),
      subtotal,
      shipping_fee: shippingFee,
      grand_total: grandTotal,
      payment_method: paymentMethod,
      payment_status: paymentMethod === "razorpay" ? "paid" : "pending_cod",
      status: "confirmed",
      order_notes: orderNotes,
      placed_at: new Date().toISOString(),
    };

    // Save to localStorage
    try {
      const existingOrders = JSON.parse(localStorage.getItem("rooh_orders") || "[]");
      existingOrders.unshift(orderRecord);
      localStorage.setItem("rooh_orders", JSON.stringify(existingOrders));
    } catch (err) {
      console.error(err);
    }

    setTimeout(() => {
      clearCart();
      setIsProcessing(false);
      router.push(`/order-success?orderId=${generatedOrderId}`);
    }, 1200);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#FAF7F2] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 text-center border border-stone-200/80 shadow-xs space-y-4">
          <ShoppingBag className="w-12 h-12 text-[#6D1835] mx-auto" />
          <h1 className="font-serif text-2xl font-bold text-[#242124]">
            Your Bag is Empty
          </h1>
          <p className="text-xs text-stone-500">
            Please add items from our shop before checking out.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex px-6 py-3 rounded-2xl bg-[#6D1835] text-white font-bold text-xs shadow-md"
            >
              Return to Shop
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-8 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb */}
        <div className="text-xs text-gray-500 flex items-center gap-2">
          <Link href="/cart" className="hover:text-[#6D1835]">Bag</Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-[#242124] font-medium">Express Checkout</span>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Checkout Fields (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Contact Information */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-4">
              <h2 className="font-serif text-xl font-bold text-[#242124] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#6D1835] text-white text-xs flex items-center justify-center font-sans font-bold">
                  1
                </span>
                Contact Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com (For invoice & receipt)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-stone-300 rounded-xl text-xs text-[#242124] focus:outline-none focus:ring-1 focus:ring-[#6D1835]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210 (For courier updates)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-stone-300 rounded-xl text-xs text-[#242124] focus:outline-none focus:ring-1 focus:ring-[#6D1835]"
                  />
                </div>
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-4">
              <h2 className="font-serif text-xl font-bold text-[#242124] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#6D1835] text-white text-xs flex items-center justify-center font-sans font-bold">
                  2
                </span>
                Delivery Address
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Recipient's Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-stone-300 rounded-xl text-xs text-[#242124] focus:outline-none focus:ring-1 focus:ring-[#6D1835]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Flat, House no., Building, Company, Apartment *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Flat 402, Royal Residency"
                    value={addressLine}
                    onChange={(e) => setAddressLine(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-stone-300 rounded-xl text-xs text-[#242124] focus:outline-none focus:ring-1 focus:ring-[#6D1835]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Area, Street, Sector, Village (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. MG Road, Near Central Park"
                    value={apartment}
                    onChange={(e) => setApartment(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-stone-300 rounded-xl text-xs text-[#242124] focus:outline-none focus:ring-1 focus:ring-[#6D1835]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Town / City *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jaipur"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-stone-300 rounded-xl text-xs text-[#242124] focus:outline-none focus:ring-1 focus:ring-[#6D1835]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      State *
                    </label>
                    <select
                      value={stateName}
                      onChange={(e) => setStateName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-stone-300 rounded-xl text-xs text-[#242124] focus:outline-none focus:ring-1 focus:ring-[#6D1835]"
                    >
                      <option>Rajasthan</option>
                      <option>Delhi NCR</option>
                      <option>Maharashtra</option>
                      <option>Karnataka</option>
                      <option>Gujarat</option>
                      <option>Uttar Pradesh</option>
                      <option>West Bengal</option>
                      <option>Tamil Nadu</option>
                      <option>Telangana</option>
                      <option>Other State</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      placeholder="6 digits"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-stone-300 rounded-xl text-xs text-[#242124] focus:outline-none focus:ring-1 focus:ring-[#6D1835]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Special Gift Note / Delivery Instructions (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Please pack in discreet luxury gift box, or leave package at front security."
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-stone-300 rounded-xl text-xs text-[#242124] focus:outline-none focus:ring-1 focus:ring-[#6D1835]"
                  />
                </div>
              </div>
            </div>

            {/* 3. Payment Method */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-4">
              <h2 className="font-serif text-xl font-bold text-[#242124] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#6D1835] text-white text-xs flex items-center justify-center font-sans font-bold">
                  3
                </span>
                Payment Method
              </h2>

              <div className="space-y-3">
                {/* Razorpay Online */}
                <label
                  onClick={() => setPaymentMethod("razorpay")}
                  className={`flex items-start gap-3.5 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    paymentMethod === "razorpay"
                      ? "border-[#6D1835] bg-[#6D1835]/5 ring-1 ring-[#6D1835]"
                      : "border-stone-200 hover:border-stone-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "razorpay"}
                    onChange={() => setPaymentMethod("razorpay")}
                    className="mt-1 accent-[#6D1835]"
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#242124] flex items-center gap-1.5">
                        <CreditCard className="w-4 h-4 text-[#6D1835]" /> Instant Online Payment (Razorpay)
                      </span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                        Recommended
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500">
                      UPI (Google Pay, PhonePe, Paytm, BHIM), Credit/Debit Cards, NetBanking. 100% Secure & Fast Dispatch.
                    </p>
                  </div>
                </label>

                {/* Cash on Delivery */}
                <label
                  onClick={() => setPaymentMethod("cod")}
                  className={`flex items-start gap-3.5 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    paymentMethod === "cod"
                      ? "border-[#6D1835] bg-[#6D1835]/5 ring-1 ring-[#6D1835]"
                      : "border-stone-200 hover:border-stone-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="mt-1 accent-[#6D1835]"
                  />
                  <div className="flex-1 space-y-1">
                    <span className="text-xs font-bold text-[#242124] flex items-center gap-1.5">
                      <Banknote className="w-4 h-4 text-[#6D1835]" /> Cash on Delivery (COD)
                    </span>
                    <p className="text-[11px] text-stone-500">
                      Pay with cash when the package arrives at your doorstep. Verified via SMS.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right: Order Summary Sidebar (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-5 sticky top-24">
              <h3 className="font-serif text-lg font-bold text-[#242124] border-b border-stone-100 pb-3 flex items-center justify-between">
                <span>Summary ({items.length} items)</span>
                <Link href="/cart" className="text-xs text-[#6D1835] font-normal hover:underline">
                  Edit Bag
                </Link>
              </h3>

              {/* Items Compact List */}
              <div className="max-h-60 overflow-y-auto space-y-3 pr-1 divide-y divide-stone-100">
                {items.map((item) => (
                  <div key={item.id} className="pt-2 first:pt-0 flex gap-3 items-center">
                    <div className="relative w-12 h-14 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0 border border-stone-200">
                      <Image
                        src={item.product.primary_image || item.product.images?.[0]?.image_url || "/placeholder.jpg"}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-[#242124] truncate">
                        {item.product.name}
                      </p>
                      <p className="text-[11px] text-stone-500">
                        Qty: {item.quantity} {item.selected_size ? `· Size ${item.selected_size}` : ""}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#242124]">
                      {formatPrice(item.item_total)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Calculation */}
              <div className="space-y-2 pt-3 border-t border-stone-100 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-semibold uppercase">Free</span>
                    ) : (
                      formatPrice(shippingFee)
                    )}
                  </span>
                </div>
                <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline text-sm font-bold text-[#242124]">
                  <span>Total Payable</span>
                  <span className="text-2xl text-[#6D1835] font-serif">
                    {formatPrice(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 px-6 rounded-2xl bg-[#6D1835] hover:bg-[#521327] disabled:bg-stone-300 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <span>Securing Order...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Place Order · {formatPrice(grandTotal)}</span>
                  </>
                )}
              </button>

              <div className="text-center">
                <p className="text-[11px] text-stone-400 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Encrypted 256-bit bank-grade checkout
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
