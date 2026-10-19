"use client";

import React from "react";
import Link from "next/link";
import { Category } from "@/lib/types";
import { LayoutGrid } from "lucide-react";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const isMore = category.slug === "all" || category.name.toLowerCase() === "more";

  return (
    <Link
      href={isMore ? "/shop" : `/shop?category=${category.slug}`}
      className="group flex flex-col items-center text-center transition-all duration-300"
    >
      {/* Rounded Square Card with warm neutral background */}
      <div className="w-full aspect-square rounded-2xl bg-[#F4EDE6] hover:bg-[#EFE5DC] border border-[#E8DFD8] p-3 sm:p-4 flex items-center justify-center relative overflow-hidden transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1">
        {isMore ? (
          <div className="flex flex-col items-center justify-center text-stone-700 group-hover:text-[#6D1835] transition-colors">
            <LayoutGrid className="w-8 h-8 sm:w-10 sm:h-10 stroke-[1.5]" />
          </div>
        ) : (
          <img
            src={category.image_url || "/placeholder.jpg"}
            alt={category.name}
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-108 transition-transform duration-500"
          />
        )}
      </div>

      {/* Label below */}
      <span className="mt-2.5 text-xs sm:text-sm font-semibold text-stone-800 group-hover:text-[#6D1835] transition-colors">
        {category.name}
      </span>
    </Link>
  );
}
