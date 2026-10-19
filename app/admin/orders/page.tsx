"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  Eye,
  Edit,
  Download,
  Printer,
  ChevronRight,
  User,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Banknote,
  Send,
  MessageCircle,
  FileText,
  AlertCircle,
  X,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface OrderItem {
  name: string;
  quantity: number;
  size?: string;
  color?: string;
  price: number;
  item_total?: number;
}

interface Order {
  id: string;
  customer_name: string;
  customer_email?: string;
  customer_phone: string;
  shipping_address: string;
  items: OrderItem[];
  subtotal?: number;
  shipping_fee?: number;
  grand_total: number;
  payment_method: "razorpay" | "cod";
  payment_status: "paid" | "pending_cod" | "refunded" | "failed";
  status: "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";
  placed_at: string;
  courier_name?: string;
  tracking_id?: string;
  order_notes?: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [courierInput, setCourierInput] = useState("");
  const [trackingInput, setTrackingInput] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("rooh_orders");
      if (stored) {
        setOrders(JSON.parse(stored));
      } else {
        const demoOrders: Order[] = [
          {
            id: "RV-ORD-948201",
            customer_name: "Aarav Sharma",
            customer_email: "aarav.sharma@gmail.com",
            customer_phone: "+91 98234 11223",
            shipping_address: "B-402, Lotus Heights, Malviya Nagar, Jaipur, Rajasthan - 302017",
            items: [
              { name: "Customized Couple Heart T-Shirt", quantity: 2, size: "L", color: "Maroon", price: 999 },
            ],
            subtotal: 1998,
            shipping_fee: 0,
            grand_total: 1998,
            payment_method: "razorpay",
            payment_status: "paid",
            status: "processing",
            placed_at: new Date(Date.now() - 3600000 * 2).toISOString(),
            order_notes: "Please write 'Always Yours, Aarav' on the gift card.",
          },
          {
            id: "RV-ORD-948199",
            customer_name: "Pooja Deshmukh",
            customer_email: "pooja.d@yahoo.com",
            customer_phone: "+91 99881 22334",
            shipping_address: "Flat 12, Sunrise Residency, Viman Nagar, Pune, Maharashtra - 411014",
            items: [
              { name: "Personalized Magic Color Changing Mug", quantity: 1, size: "Standard", color: "Black", price: 449 },
            ],
            subtotal: 449,
            shipping_fee: 99,
            grand_total: 548,
            payment_method: "cod",
            payment_status: "pending_cod",
            status: "confirmed",
            placed_at: new Date(Date.now() - 3600000 * 5).toISOString(),
          },
          {
            id: "RV-ORD-948185",
            customer_name: "Vikram Singhania",
            customer_email: "vikram.singh@outlook.com",
            customer_phone: "+91 97110 55443",
            shipping_address: "C-14, Hauz Khas Enclave, New Delhi, Delhi - 110016",
            items: [
              { name: "Custom Spotify Song Plaque with Wooden Stand", quantity: 1, size: "A4", color: "Clear", price: 799 },
            ],
            subtotal: 799,
            shipping_fee: 0,
            grand_total: 799,
            payment_method: "razorpay",
            payment_status: "paid",
            status: "shipped",
            courier_name: "BlueDart Express",
            tracking_id: "BLU-8829104",
            placed_at: new Date(Date.now() - 86400000).toISOString(),
          },
          {
            id: "RV-ORD-948150",
            customer_name: "Neha Sundaram",
            customer_email: "neha.sun@gmail.com",
            customer_phone: "+91 94441 88990",
            shipping_address: "18, 4th Cross, Indiranagar, Bengaluru, Karnataka - 560038",
            items: [
              { name: "Bespoke Memory Photo Collage Cushion", quantity: 2, size: "16x16 inch", color: "Off-White", price: 699 },
            ],
            subtotal: 1398,
            shipping_fee: 0,
            grand_total: 1398,
            payment_method: "razorpay",
            payment_status: "paid",
            status: "delivered",
            courier_name: "Delhivery Surface",
            tracking_id: "DLH-9921827",
            placed_at: new Date(Date.now() - 86400000 * 2).toISOString(),
          },
        ];
        setOrders(demoOrders);
        localStorage.setItem("rooh_orders", JSON.stringify(demoOrders));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const saveOrders = (updated: Order[]) => {
    setOrders(updated);
    try {
      localStorage.setItem("rooh_orders", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateStatus = (orderId: string, newStatus: Order["status"]) => {
    const updated = orders.map((o) => {
      if (o.id === orderId) {
        return {
          ...o,
          status: newStatus,
          courier_name: courierInput.trim() || o.courier_name,
          tracking_id: trackingInput.trim() || o.tracking_id,
        };
      }
      return o;
    });
    saveOrders(updated);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({
        ...selectedOrder,
        status: newStatus,
        courier_name: courierInput.trim() || selectedOrder.courier_name,
        tracking_id: trackingInput.trim() || selectedOrder.tracking_id,
      });
    }
    setIsUpdatingStatus(false);
  };

  const handleUpdatePayment = (orderId: string, newPaymentStatus: Order["payment_status"]) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, payment_status: newPaymentStatus } : o));
    saveOrders(updated);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, payment_status: newPaymentStatus });
    }
  };

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = statusFilter === "all" || o.status === statusFilter;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      o.id.toLowerCase().includes(query) ||
      o.customer_name.toLowerCase().includes(query) ||
      o.customer_phone.includes(query) ||
      o.shipping_address.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  const statusColors: Record<string, string> = {
    confirmed: "bg-blue-50 text-blue-700 border-blue-200",
    processing: "bg-amber-50 text-amber-700 border-amber-200",
    shipped: "bg-purple-50 text-purple-700 border-purple-200",
    delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
    cancelled: "bg-rose-50 text-rose-700 border-rose-200",
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-6 rounded-3xl border border-stone-200/90 shadow-xs">
        <div>
          <span className="text-xs uppercase font-bold text-[#6D1835] tracking-widest">
            Fulfillment & Logistics
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#242124] mt-1">
            Order Management & Shipping
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Track customer orders, manage processing status, add courier tracking IDs, and handle payments.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const csvContent =
                "data:text/csv;charset=utf-8," +
                ["Order ID,Customer,Phone,Total,Payment,Status,Placed At"]
                  .concat(
                    orders.map(
                      (o) =>
                        `"${o.id}","${o.customer_name}","${o.customer_phone}","${o.grand_total}","${o.payment_method}","${o.status}","${o.placed_at}"`
                    )
                  )
                  .join("\n");
              const encodedUri = encodeURI(csvContent);
              const link = document.createElement("a");
              link.setAttribute("href", encodedUri);
              link.setAttribute("download", `rooh_vastr_orders_${new Date().toISOString().split("T")[0]}.csv`);
              document.body.appendChild(link);
              link.click();
            }}
            className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {(["all", "confirmed", "processing", "shipped", "delivered", "cancelled"] as const).map((tab) => {
            const count = tab === "all" ? orders.length : orders.filter((o) => o.status === tab).length;
            return (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  statusFilter === tab
                    ? "bg-[#6D1835] text-white shadow-xs"
                    : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                }`}
              >
                <span>{tab}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    statusFilter === tab ? "bg-white/20 text-white" : "bg-stone-200 text-stone-600"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search order #, customer, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-9 pr-4 py-2 rounded-xl border border-stone-200 bg-[#FAF7F2]/40 focus:outline-none focus:border-[#6D1835] transition-all"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-stone-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-4">Order ID</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Date & Time</th>
                <th className="py-3.5 px-4">Items</th>
                <th className="py-3.5 px-4">Total</th>
                <th className="py-3.5 px-4">Payment</th>
                <th className="py-3.5 px-4">Fulfillment</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-stone-400">
                    No orders match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#6D1835]">
                      {order.id}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-[#242124]">{order.customer_name}</div>
                      <div className="text-[11px] text-stone-500 flex items-center gap-1">
                        <Phone className="w-3 h-3 text-stone-400" /> {order.customer_phone}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-stone-500 whitespace-nowrap">
                      {new Date(order.placed_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                      <div className="text-[10px] text-stone-400">
                        {new Date(order.placed_at).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-stone-600 max-w-[200px] truncate">
                      {order.items?.map((i) => `${i.name} (x${i.quantity})`).join(", ")}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#242124]">
                      {formatPrice(order.grand_total)}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-col gap-1">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider w-fit ${
                            order.payment_method === "razorpay"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-stone-100 text-stone-700 border border-stone-200"
                          }`}
                        >
                          {order.payment_method === "razorpay" ? "Prepaid" : "COD"}
                        </span>
                        <span
                          className={`text-[10px] font-semibold capitalize ${
                            order.payment_status === "paid" ? "text-emerald-600" : "text-amber-600"
                          }`}
                        >
                          {order.payment_status === "paid" ? "● Paid" : "● Payment Pending"}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          statusColors[order.status] || "bg-stone-100 text-stone-600"
                        }`}
                      >
                        {order.status}
                      </span>
                      {order.tracking_id && (
                        <div className="text-[10px] text-purple-700 font-mono mt-1">
                          {order.tracking_id}
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setCourierInput(order.courier_name || "");
                          setTrackingInput(order.tracking_id || "");
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#6D1835]/10 hover:bg-[#6D1835] text-[#6D1835] hover:text-white transition-colors text-xs font-semibold inline-flex items-center gap-1"
                      >
                        Manage <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-stone-200 shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-[#6D1835]">
                  {selectedOrder.id}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#242124]">
                  Order Fulfillment Details
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer & Address Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-stone-50 p-4 rounded-2xl border border-stone-200">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                  Customer
                </span>
                <div className="font-bold text-sm text-[#242124]">{selectedOrder.customer_name}</div>
                <div className="text-xs text-stone-600">{selectedOrder.customer_phone}</div>
                {selectedOrder.customer_email && (
                  <div className="text-xs text-stone-500">{selectedOrder.customer_email}</div>
                )}
                <a
                  href={`https://wa.me/${selectedOrder.customer_phone.replace(/[^0-9]/g, "")}?text=Hi%20${encodeURIComponent(
                    selectedOrder.customer_name
                  )},%20update%20regarding%20your%20Rooh%20Vastr%20order%20${selectedOrder.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 hover:underline pt-1"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Customer
                </a>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                  Shipping Address
                </span>
                <div className="text-xs text-stone-700 leading-relaxed font-medium">
                  {selectedOrder.shipping_address}
                </div>
                {selectedOrder.order_notes && (
                  <div className="mt-2 text-[11px] bg-amber-50 border border-amber-200 text-amber-800 p-2 rounded-lg">
                    <strong>Note:</strong> {selectedOrder.order_notes}
                  </div>
                )}
              </div>
            </div>

            {/* Items List */}
            <div className="space-y-3">
              <h4 className="font-serif text-sm font-bold text-[#242124] uppercase tracking-wider">
                Order Items ({selectedOrder.items?.length || 0})
              </h4>
              <div className="border border-stone-200 rounded-2xl divide-y divide-stone-100 overflow-hidden">
                {selectedOrder.items?.map((item, idx) => (
                  <div key={idx} className="p-3.5 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-[#242124]">{item.name}</div>
                      <div className="text-stone-500 text-[11px]">
                        Qty: {item.quantity} {item.size && `• Size: ${item.size}`}{" "}
                        {item.color && `• Color: ${item.color}`}
                      </div>
                    </div>
                    <div className="font-bold text-[#242124]">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
                <div className="p-3.5 bg-stone-50 flex items-center justify-between text-xs font-bold text-[#242124]">
                  <span>Grand Total</span>
                  <span className="text-base font-serif text-[#6D1835]">
                    {formatPrice(selectedOrder.grand_total)}
                  </span>
                </div>
              </div>
            </div>

            {/* Status & Courier Update Section */}
            <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-stone-200 space-y-4">
              <h4 className="font-serif text-sm font-bold text-[#242124] uppercase tracking-wider">
                Update Fulfillment & Dispatch
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">
                    Courier Partner
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. BlueDart / Delhivery / Shiprocket"
                    value={courierInput}
                    onChange={(e) => setCourierInput(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-stone-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">
                    Tracking / AWB Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. BLU-8829104"
                    value={trackingInput}
                    onChange={(e) => setTrackingInput(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-stone-300 bg-white"
                  />
                </div>
              </div>

              {/* Status Action Buttons */}
              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={() => handleUpdateStatus(selectedOrder.id, "processing")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedOrder.status === "processing"
                      ? "bg-amber-600 text-white"
                      : "bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100"
                  }`}
                >
                  Mark as Processing
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedOrder.id, "shipped")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedOrder.status === "shipped"
                      ? "bg-purple-600 text-white"
                      : "bg-purple-50 text-purple-800 border border-purple-200 hover:bg-purple-100"
                  }`}
                >
                  Mark as Shipped
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedOrder.id, "delivered")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedOrder.status === "delivered"
                      ? "bg-emerald-600 text-white"
                      : "bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100"
                  }`}
                >
                  Mark as Delivered
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedOrder.id, "cancelled")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedOrder.status === "cancelled"
                      ? "bg-rose-600 text-white"
                      : "bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100"
                  }`}
                >
                  Cancel Order
                </button>
              </div>

              {/* Payment Status Switcher */}
              <div className="pt-2 flex items-center justify-between border-t border-stone-200/80 text-xs">
                <span className="font-semibold text-stone-600">Payment Status:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdatePayment(selectedOrder.id, "paid")}
                    className={`px-2.5 py-1 rounded-lg font-bold text-[11px] ${
                      selectedOrder.payment_status === "paid"
                        ? "bg-emerald-600 text-white"
                        : "bg-stone-200 text-stone-700"
                    }`}
                  >
                    Paid
                  </button>
                  <button
                    onClick={() => handleUpdatePayment(selectedOrder.id, "pending_cod")}
                    className={`px-2.5 py-1 rounded-lg font-bold text-[11px] ${
                      selectedOrder.payment_status === "pending_cod"
                        ? "bg-amber-600 text-white"
                        : "bg-stone-200 text-stone-700"
                    }`}
                  >
                    Pending COD
                  </button>
                  <button
                    onClick={() => handleUpdatePayment(selectedOrder.id, "refunded")}
                    className={`px-2.5 py-1 rounded-lg font-bold text-[11px] ${
                      selectedOrder.payment_status === "refunded"
                        ? "bg-rose-600 text-white"
                        : "bg-stone-200 text-stone-700"
                    }`}
                  >
                    Refunded
                  </button>
                </div>
              </div>
            </div>

            {/* Print Slip & Close */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" /> Print Invoice & Packing Slip
              </button>
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2 rounded-xl bg-[#6D1835] hover:bg-[#521327] text-white text-xs font-bold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
