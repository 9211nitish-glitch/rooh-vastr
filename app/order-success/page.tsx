"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Package,
  Truck,
  MessageCircle,
  ArrowRight,
  MapPin,
  Calendar,
  Sparkles,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface StoredOrder {
  id: string;
  customer_name: string;
  customer_email?: string;
  customer_phone?: string;
  shipping_address: string;
  items: Array<{
    name: string;
    quantity: number;
    size?: string;
    color?: string;
    price: number;
    item_total: number;
  }>;
  grand_total: number;
  payment_method: string;
  payment_status: string;
  status: string;
  placed_at: string;
}

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "RV-ORD-928194";
  const [order, setOrder] = useState<StoredOrder | null>(null);

  useEffect(() => {
    try {
      const orders = JSON.parse(localStorage.getItem("rooh_orders") || "[]");
      const found = orders.find((o: StoredOrder) => o.id === orderId);
      if (found) {
        setOrder(found);
      }
    } catch (e) {
      console.error(e);
    }
  }, [orderId]);

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 md:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Success Card Header */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-stone-200/80 shadow-xs space-y-4">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div className="space-y-1">
            <p className="text-xs uppercase tracking-widest text-[#6D1835] font-bold">
              Order Confirmed & Secured
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#242124]">
              Thank You for Your Order!
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 max-w-lg mx-auto leading-relaxed pt-1">
              Your garments are being prepared with care in our Jaipur & Surat studios. Wear your story, gift your feelings.
            </p>
          </div>

          <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl max-w-sm mx-auto flex items-center justify-between">
            <span className="text-xs text-stone-500">Order Reference:</span>
            <span className="font-mono text-sm font-bold text-[#6D1835]">{orderId}</span>
          </div>
        </div>

        {/* Order Details Breakdown */}
        {order && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6">
            <h2 className="font-serif text-lg font-bold text-[#242124] border-b border-stone-100 pb-3">
              Order Breakdown
            </h2>

            <div className="divide-y divide-stone-100">
              {order.items.map((it, idx) => (
                <div key={idx} className="py-3 flex justify-between items-center text-xs">
                  <div>
                    <p className="font-bold text-[#242124]">{it.name}</p>
                    <p className="text-stone-400">
                      Qty: {it.quantity} {it.size ? `· Size ${it.size}` : ""} {it.color ? `· ${it.color}` : ""}
                    </p>
                  </div>
                  <span className="font-bold text-stone-900">{formatPrice(it.item_total)}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-stone-200 space-y-2 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Shipping Destination:</span>
                <span className="font-medium text-stone-900 text-right max-w-xs">{order.shipping_address}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Method:</span>
                <span className="font-semibold uppercase text-[#6D1835]">
                  {order.payment_method === "cod" ? "Cash on Delivery" : "Online Prepaid (Razorpay)"}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#242124] pt-2 border-t border-stone-100">
                <span>Total Paid / Due:</span>
                <span className="text-xl text-[#6D1835] font-serif">{formatPrice(order.grand_total)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={`/track-order?orderId=${orderId}`}
            className="py-3.5 px-6 rounded-2xl bg-[#6D1835] hover:bg-[#521327] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Truck className="w-4 h-4" />
            <span>Track Order Status</span>
          </Link>

          <a
            href={`https://wa.me/919654861504?text=${encodeURIComponent(
              `Hi Rooh Vastr Team! I just placed order ${orderId}. Please keep me updated with tracking details.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Receive WhatsApp Updates</span>
          </a>

          <Link
            href="/shop"
            className="py-3.5 px-6 rounded-2xl border border-stone-300 text-stone-700 font-bold text-xs hover:bg-stone-50 transition-all flex items-center justify-center gap-2"
          >
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6D1835]" />
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
