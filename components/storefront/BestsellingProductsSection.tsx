"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Product } from "@/lib/types";
import ProductCard from "./ProductCard";

interface BestsellingProductsSectionProps {
  products: Product[];
}

export default function BestsellingProductsSection({ products }: BestsellingProductsSectionProps) {
  const [activeTab, setActiveTab] = useState<"bestsellers" | "new" | "sale">("bestsellers");

  // Filter based on active tab
  const displayedProducts = React.useMemo(() => {
    if (activeTab === "bestsellers") {
      // First 6 products match the 6 bestselling items in Image 1
      return products.slice(0, 6);
    } else if (activeTab === "new") {
      // Rotate or take new products
      return [...products].reverse().slice(0, 6);
    } else {
      // On sale products (with highest discount)
      return products.filter((p) => p.selling_price !== undefined && p.regular_price > p.selling_price).slice(0, 6);
    }
  }, [activeTab, products]);

  return (
    <section className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#242124]">
            Bestselling Products
          </h2>
        </div>

        {/* Tabs and View All Link */}
        <div className="flex items-center gap-6 self-start sm:self-auto border-b sm:border-b-0 border-gray-200 w-full sm:w-auto pb-2 sm:pb-0 overflow-x-auto">
          <div className="flex items-center gap-4 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab("bestsellers")}
              className={`pb-1 transition-all cursor-pointer ${
                activeTab === "bestsellers"
                  ? "text-[#5B132B] border-b-2 border-[#5B132B] font-bold"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Best Sellers
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("new")}
              className={`pb-1 transition-all cursor-pointer ${
                activeTab === "new"
                  ? "text-[#5B132B] border-b-2 border-[#5B132B] font-bold"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              New Arrivals
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("sale")}
              className={`pb-1 transition-all cursor-pointer ${
                activeTab === "sale"
                  ? "text-[#5B132B] border-b-2 border-[#5B132B] font-bold"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              On Sale
            </button>
          </div>

          <Link
            href="/shop"
            className="text-xs font-bold text-[#5B132B] hover:underline flex items-center gap-1 group ml-auto sm:ml-0 shrink-0"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* 6 Products Grid matching Image 1 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {displayedProducts.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </section>
  );
}
