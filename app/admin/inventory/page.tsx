"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Boxes,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Plus,
  Minus,
  Save,
  ArrowRight,
  TrendingDown,
  RefreshCw,
  Package,
} from "lucide-react";
import { SEED_PRODUCTS } from "@/lib/data/store-data";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

export default function AdminInventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [stockFilter, setStockFilter] = useState<"all" | "low" | "out" | "normal">("all");
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("rooh_products");
      if (stored) {
        setProducts(JSON.parse(stored));
      } else {
        setProducts(SEED_PRODUCTS);
        localStorage.setItem("rooh_products", JSON.stringify(SEED_PRODUCTS));
      }
    } catch (e) {
      console.error(e);
      setProducts(SEED_PRODUCTS);
    }
  }, []);

  const saveProducts = (prods: Product[]) => {
    setProducts(prods);
    try {
      localStorage.setItem("rooh_products", JSON.stringify(prods));
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAdjustStock = (id: string, amount: number) => {
    const updated = products.map((p) => {
      if (p.id === id) {
        const currentQty = p.stock_quantity ?? 0;
        const newQty = Math.max(0, currentQty + amount);
        return {
          ...p,
          stock_quantity: newQty,
          is_active: newQty > 0,
        };
      }
      return p;
    });
    saveProducts(updated);
  };

  const handleSetExactStock = (id: string, qty: number) => {
    const validQty = Math.max(0, isNaN(qty) ? 0 : qty);
    const updated = products.map((p) =>
      p.id === id ? { ...p, stock_quantity: validQty, is_active: validQty > 0 } : p
    );
    saveProducts(updated);
  };

  const toggleInStock = (id: string) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, is_active: !p.is_active } : p
    );
    saveProducts(updated);
  };

  const lowStockThreshold = 15;
  const lowStockCount = products.filter((p) => (p.stock_quantity ?? 0) > 0 && (p.stock_quantity ?? 0) <= lowStockThreshold).length;
  const outOfStockCount = products.filter((p) => (p.stock_quantity ?? 0) === 0 || !p.is_active).length;

  const filteredProducts = products.filter((p) => {
    const categoryName = p.category_name || p.category_id || "";
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      categoryName.toLowerCase().includes(searchQuery.toLowerCase());

    const stock = p.stock_quantity ?? 0;
    if (!matchesSearch) return false;
    if (stockFilter === "low") return stock > 0 && stock <= lowStockThreshold;
    if (stockFilter === "out") return stock === 0 || !p.is_active;
    if (stockFilter === "normal") return stock > lowStockThreshold && p.is_active;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-6 rounded-3xl border border-stone-200/90 shadow-xs">
        <div>
          <span className="text-xs uppercase font-bold text-[#6D1835] tracking-widest">
            Inventory & Warehouse Management
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#242124] mt-1">
            Real-Time Stock Matrix
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Monitor blank apparel stock, mug ceramics, plaque acrylic blanks, and adjust inventory thresholds.
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
            <CheckCircle2 className="w-4 h-4" /> Stock Updated!
          </div>
        )}
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
              Total Catalog SKUs
            </span>
            <div className="font-serif text-2xl font-bold text-[#242124] mt-1">
              {products.length} Items
            </div>
            <span className="text-[10px] text-stone-400">Tracked in local master ledger</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-600 flex items-center justify-center">
            <Boxes className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-amber-200/80 shadow-xs flex items-center justify-between bg-amber-50/20">
          <div>
            <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
              Low Stock Warnings
            </span>
            <div className="font-serif text-2xl font-bold text-amber-950 mt-1">
              {lowStockCount} SKUs
            </div>
            <span className="text-[10px] text-amber-700">Less than {lowStockThreshold} units left</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-rose-200/80 shadow-xs flex items-center justify-between bg-rose-50/20">
          <div>
            <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wider block">
              Out of Stock
            </span>
            <div className="font-serif text-2xl font-bold text-rose-950 mt-1">
              {outOfStockCount} SKUs
            </div>
            <span className="text-[10px] text-rose-700">Hidden or disabled on store</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
            <XCircle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-xs flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {[
            { id: "all", label: "All Items", count: products.length },
            { id: "low", label: "Low Stock", count: lowStockCount },
            { id: "out", label: "Out of Stock", count: outOfStockCount },
            { id: "normal", label: "Healthy Stock", count: products.length - lowStockCount - outOfStockCount },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStockFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                stockFilter === tab.id
                  ? "bg-[#6D1835] text-white shadow-xs"
                  : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 rounded-full ${
                  stockFilter === tab.id ? "bg-white/20 text-white" : "bg-stone-200 text-stone-600"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, SKU, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-9 pr-4 py-2 rounded-xl border border-stone-200 bg-[#FAF7F2]/40 focus:outline-none focus:border-[#6D1835]"
          />
        </div>
      </div>

      {/* Stock Table */}
      <div className="bg-white rounded-3xl border border-stone-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-4">Product Details</th>
                <th className="py-3.5 px-4">SKU</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Current Stock</th>
                <th className="py-3.5 px-4">Quick Adjust</th>
                <th className="py-3.5 px-4 text-right">Visibility</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredProducts.map((p) => {
                const stock = p.stock_quantity ?? 0;
                const isLow = stock > 0 && stock <= lowStockThreshold;
                const isOut = stock === 0 || !p.is_active;
                const imgUrl = p.primary_image || (typeof p.images?.[0] === "string" ? p.images[0] : p.images?.[0]?.image_url) || "/placeholder.jpg";
                const displayPrice = p.selling_price || p.regular_price || 0;
                const categoryDisplay = p.category_name || p.category_id || "Rooh Vastr";

                return (
                  <tr key={p.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={imgUrl}
                          alt={p.name}
                          className="w-10 h-10 rounded-lg object-cover bg-stone-100 border border-stone-200"
                        />
                        <div>
                          <div className="font-semibold text-[#242124] line-clamp-1">{p.name}</div>
                          <div className="text-[10px] text-stone-400">ID: {p.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-stone-600">{p.sku}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 text-[10px] font-semibold">
                        {categoryDisplay}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-[#242124]">{formatPrice(displayPrice)}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={stock}
                          onChange={(e) => handleSetExactStock(p.id, parseInt(e.target.value))}
                          className={`w-16 px-2 py-1 rounded-lg border text-center font-bold font-mono text-xs ${
                            isOut
                              ? "border-rose-300 bg-rose-50 text-rose-700"
                              : isLow
                              ? "border-amber-300 bg-amber-50 text-amber-800"
                              : "border-stone-200 bg-white text-stone-900"
                          }`}
                        />
                        {isOut ? (
                          <span className="text-[10px] font-bold text-rose-600">Out</span>
                        ) : isLow ? (
                          <span className="text-[10px] font-bold text-amber-600">Low</span>
                        ) : (
                          <span className="text-[10px] font-semibold text-emerald-600">Good</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleAdjustStock(p.id, -5)}
                          className="p-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-bold px-1.5"
                          title="Reduce 5"
                        >
                          -5
                        </button>
                        <button
                          onClick={() => handleAdjustStock(p.id, -1)}
                          className="p-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-bold px-1.5"
                          title="Reduce 1"
                        >
                          -1
                        </button>
                        <button
                          onClick={() => handleAdjustStock(p.id, 1)}
                          className="p-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-bold px-1.5"
                          title="Add 1"
                        >
                          +1
                        </button>
                        <button
                          onClick={() => handleAdjustStock(p.id, 10)}
                          className="p-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-bold px-1.5"
                          title="Restock +10"
                        >
                          +10
                        </button>
                        <button
                          onClick={() => handleAdjustStock(p.id, 50)}
                          className="p-1 rounded bg-[#6D1835]/10 hover:bg-[#6D1835] text-[#6D1835] hover:text-white text-[11px] font-bold px-2 rounded-lg transition-colors"
                          title="Batch Restock +50"
                        >
                          +50
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => toggleInStock(p.id)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-colors ${
                          p.is_active && (p.stock_quantity ?? 0) > 0
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                            : "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100"
                        }`}
                      >
                        {p.is_active && (p.stock_quantity ?? 0) > 0 ? "Visible" : "Hidden"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
