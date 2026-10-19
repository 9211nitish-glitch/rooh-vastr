"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  Phone,
  Mail,
  MapPin,
  ShoppingBag,
  IndianRupee,
  Calendar,
  MessageCircle,
  ExternalLink,
  ChevronRight,
  Filter,
  UserCheck,
  Star,
  Download,
  ShieldCheck,
  X,
} from "lucide-react";

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  tier: "VIP" | "Regular" | "New";
  notes?: string;
}

const DEFAULT_CUSTOMERS: Customer[] = [
  {
    id: "CUST-101",
    name: "Aarav Sharma",
    phone: "+91 98765 43210",
    email: "aarav.sharma@gmail.com",
    city: "Jaipur",
    state: "Rajasthan",
    totalOrders: 4,
    totalSpent: 4890,
    lastOrderDate: "16 Oct 2026",
    tier: "VIP",
    notes: "Prefers oversized anime t-shirts. Always pays via UPI.",
  },
  {
    id: "CUST-102",
    name: "Pooja Verma",
    phone: "+91 98112 34567",
    email: "pooja.verma@outlook.com",
    city: "New Delhi",
    state: "Delhi",
    totalOrders: 2,
    totalSpent: 1798,
    lastOrderDate: "15 Oct 2026",
    tier: "Regular",
    notes: "Ordered customized couple magic mugs for anniversary.",
  },
  {
    id: "CUST-103",
    name: "Rohan Kulkarni",
    phone: "+91 97654 32198",
    email: "rohan.k@techcorp.in",
    city: "Bengaluru",
    state: "Karnataka",
    totalOrders: 6,
    totalSpent: 12450,
    lastOrderDate: "14 Oct 2026",
    tier: "VIP",
    notes: "Bulk corporate merchandise buyer for developer events.",
  },
  {
    id: "CUST-104",
    name: "Meera Sen",
    phone: "+91 99031 22334",
    email: "meera.sen@gmail.com",
    city: "Kolkata",
    state: "West Bengal",
    totalOrders: 1,
    totalSpent: 699,
    lastOrderDate: "12 Oct 2026",
    tier: "New",
  },
  {
    id: "CUST-105",
    name: "Vikram Singhania",
    phone: "+91 98200 87654",
    email: "vikram.s@singhania.co",
    city: "Mumbai",
    state: "Maharashtra",
    totalOrders: 3,
    totalSpent: 3597,
    lastOrderDate: "10 Oct 2026",
    tier: "Regular",
  },
  {
    id: "CUST-106",
    name: "Divya Nair",
    phone: "+91 94471 99887",
    email: "divya.nair@yahoo.com",
    city: "Kochi",
    state: "Kerala",
    totalOrders: 1,
    totalSpent: 499,
    lastOrderDate: "08 Oct 2026",
    tier: "New",
  },
];

export default function CustomersAdminPage() {
  const [customers, setCustomers] = useState<Customer[]>(DEFAULT_CUSTOMERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [tierFilter, setTierFilter] = useState<string>("ALL");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Sync with localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("rooh_customers");
      if (saved) {
        setCustomers(JSON.parse(saved));
      } else {
        localStorage.setItem("rooh_customers", JSON.stringify(DEFAULT_CUSTOMERS));
      }
    } catch {
      // fallback
    }
  }, []);

  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier = tierFilter === "ALL" || c.tier === tierFilter;
    return matchesSearch && matchesTier;
  });

  const totalSpentAll = customers.reduce((acc, c) => acc + c.totalSpent, 0);
  const totalOrdersAll = customers.reduce((acc, c) => acc + c.totalOrders, 0);
  const vipCount = customers.filter((c) => c.tier === "VIP").length;

  const exportCSV = () => {
    const headers = ["ID,Name,Phone,Email,City,State,TotalOrders,TotalSpent,Tier,LastOrderDate"];
    const rows = filteredCustomers.map(
      (c) =>
        `"${c.id}","${c.name}","${c.phone}","${c.email}","${c.city}","${c.state}",${c.totalOrders},${c.totalSpent},"${c.tier}","${c.lastOrderDate}"`
    );
    const blob = new Blob([[...headers, ...rows].join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `RoohVastr_Customers_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700">
            <Users className="w-4 h-4" />
            CRM & Client Profiles
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif font-bold text-stone-900 mt-1">
            Customer Directory & Order History
          </h1>
          <p className="text-sm text-stone-600">
            Manage buyer profiles, customer lifetime value (LTV), repeat purchasers, and one-click WhatsApp outreach.
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-700 text-sm font-semibold hover:bg-stone-50 transition shadow-sm"
        >
          <Download className="w-4 h-4" />
          Export Customer Data (.CSV)
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-sm">
          <p className="text-xs font-medium text-stone-500">Total Buyers</p>
          <p className="text-2xl font-bold font-serif text-stone-900 mt-1">{customers.length}</p>
          <p className="text-[11px] text-emerald-600 font-medium mt-1">Verified phone profiles</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-sm">
          <p className="text-xs font-medium text-stone-500">Total Revenue Generated</p>
          <p className="text-2xl font-bold font-serif text-stone-900 mt-1">
            ₹{totalSpentAll.toLocaleString("en-IN")}
          </p>
          <p className="text-[11px] text-stone-500 mt-1">₹{Math.round(totalSpentAll / (customers.length || 1))} Avg. LTV</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-sm">
          <p className="text-xs font-medium text-stone-500">Total Completed Orders</p>
          <p className="text-2xl font-bold font-serif text-stone-900 mt-1">{totalOrdersAll}</p>
          <p className="text-[11px] text-stone-500 mt-1">~{(totalOrdersAll / (customers.length || 1)).toFixed(1)} orders/customer</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-sm">
          <p className="text-xs font-medium text-stone-500">VIP / Repeat Buyers</p>
          <p className="text-2xl font-bold font-serif text-amber-700 mt-1">{vipCount}</p>
          <p className="text-[11px] text-amber-600 font-medium mt-1">Highest lifetime value</p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by customer name, phone (+91), email, or city..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-stone-500 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Tier:
          </span>
          {["ALL", "VIP", "Regular", "New"].map((tier) => (
            <button
              key={tier}
              onClick={() => setTierFilter(tier)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                tierFilter === tier
                  ? "bg-amber-900 text-white shadow-sm"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      {/* Customer Table */}
      <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-stone-700">
            <thead className="bg-stone-50 border-b border-stone-200/80 text-xs font-semibold uppercase text-stone-500 tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Customer Details</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Orders & Lifetime Spend</th>
                <th className="py-3.5 px-4">Tier Status</th>
                <th className="py-3.5 px-4">Last Active</th>
                <th className="py-3.5 px-4 text-right">Quick Outreach</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-stone-500">
                    No customers found matching &quot;{searchQuery}&quot;
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((cust) => (
                  <tr key={cust.id} className="hover:bg-amber-50/30 transition">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-800 to-rose-900 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                          {cust.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                            {cust.name}
                            {cust.tier === "VIP" && (
                              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                            )}
                          </div>
                          <div className="text-xs text-stone-500 flex items-center gap-2 mt-0.5">
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3 text-stone-400" />
                              {cust.phone}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Mail className="w-3 h-3 text-stone-400" />
                              {cust.email}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-xs text-stone-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span className="font-medium text-stone-800">{cust.city}</span>, {cust.state}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-serif font-bold text-stone-900">
                        ₹{cust.totalSpent.toLocaleString("en-IN")}
                      </div>
                      <div className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                        <ShoppingBag className="w-3 h-3 text-stone-400" />
                        {cust.totalOrders} {cust.totalOrders === 1 ? "order" : "orders"}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          cust.tier === "VIP"
                            ? "bg-amber-100 text-amber-800 border border-amber-300"
                            : cust.tier === "Regular"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                            : "bg-stone-100 text-stone-700 border border-stone-200"
                        }`}
                      >
                        {cust.tier === "VIP" && <Star className="w-3 h-3 fill-amber-700" />}
                        {cust.tier}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-xs text-stone-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-stone-400" />
                        {cust.lastOrderDate}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={`https://wa.me/${cust.phone.replace(/[^0-9]/g, "")}?text=Namaste%20${encodeURIComponent(
                            cust.name
                          )}!%20Greeting%20from%20Rooh%20Vastr.`}
                          target="_blank"
                          rel="noreferrer"
                          title="Chat on WhatsApp"
                          className="p-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => setSelectedCustomer(cust)}
                          className="px-3 py-1.5 rounded-lg border border-stone-200 text-stone-700 hover:bg-stone-100 text-xs font-semibold flex items-center gap-1 transition"
                        >
                          Profile <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Detail Drawer / Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col p-6 overflow-y-auto animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                  Customer Profile
                </span>
                <h3 className="text-xl font-bold font-serif text-stone-900 mt-0.5">
                  {selectedCustomer.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-2 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 space-y-6">
              {/* Profile Card */}
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-stone-500 font-medium">Customer ID</span>
                  <span className="text-xs font-mono font-semibold text-stone-800">
                    {selectedCustomer.id}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-stone-500 font-medium">Buyer Tier</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                    {selectedCustomer.tier} Member
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-stone-500 font-medium">Contact Phone</span>
                  <a
                    href={`tel:${selectedCustomer.phone}`}
                    className="text-xs font-semibold text-stone-900 hover:text-amber-700"
                  >
                    {selectedCustomer.phone}
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-stone-500 font-medium">Email Address</span>
                  <span className="text-xs text-stone-800 font-medium">
                    {selectedCustomer.email}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-stone-500 font-medium">Delivery City</span>
                  <span className="text-xs text-stone-800 font-medium">
                    {selectedCustomer.city}, {selectedCustomer.state}
                  </span>
                </div>
              </div>

              {/* Spend Analytics */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl border border-stone-200 bg-white">
                  <span className="text-[11px] font-medium text-stone-500">Lifetime Spend</span>
                  <p className="text-lg font-serif font-bold text-stone-900 mt-1">
                    ₹{selectedCustomer.totalSpent.toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl border border-stone-200 bg-white">
                  <span className="text-[11px] font-medium text-stone-500">Total Orders</span>
                  <p className="text-lg font-serif font-bold text-stone-900 mt-1">
                    {selectedCustomer.totalOrders}
                  </p>
                </div>
              </div>

              {/* Internal Staff Notes */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2">
                  Staff Notes & Preferences
                </label>
                <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs text-stone-700 leading-relaxed">
                  {selectedCustomer.notes || "No special preferences or notes saved yet."}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 space-y-2.5">
                <a
                  href={`https://wa.me/${selectedCustomer.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition"
                >
                  <MessageCircle className="w-4 h-4" /> Message on WhatsApp
                </a>
                <Link
                  href={`/admin/orders?search=${encodeURIComponent(selectedCustomer.name)}`}
                  className="w-full py-2.5 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 font-semibold text-sm flex items-center justify-center gap-2 transition"
                >
                  <ShoppingBag className="w-4 h-4" /> View Customer Orders
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
