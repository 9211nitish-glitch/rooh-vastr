"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { Star, Heart, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/context/CartContext";
import { useWishlist } from "@/lib/context/WishlistContext";

interface ProductCardProps {
  product: Product;
  showAddToCart?: boolean;
}

export default function ProductCard({ product, showAddToCart = true }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  const price = product.selling_price ?? product.sale_price ?? product.regular_price;
  const regularPrice = product.compare_at_price ?? product.regular_price;
  const discountPercent =
    regularPrice > price
      ? Math.round(((regularPrice - price) / regularPrice) * 100)
      : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, product.available_sizes?.[0], product.available_colors?.[0]?.name);
  };

  return (
    <div className="group rounded-2xl bg-white border border-[#E8DFD8] p-3 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
      <Link href={`/product/${product.slug}`} className="block">
        {/* Product Image & Badges */}
        <div className="aspect-square sm:aspect-4/5 rounded-xl overflow-hidden bg-[#FAF7F2] relative">
          <Image
            src={product.primary_image || product.images?.[0]?.image_url || "/placeholder.jpg"}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            loading="lazy"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Top-Left Bestseller Badge */}
          {product.is_bestseller && (
            <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#5B132B] text-white shadow-xs">
              Bestseller
            </span>
          )}

          {/* Top-Right Wishlist Heart Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product);
            }}
            aria-label="Save to Wishlist"
            className={`absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs shadow-xs flex items-center justify-center transition-all hover:scale-110 cursor-pointer ${
              isWishlisted ? "text-[#6D1835]" : "text-stone-400 hover:text-[#6D1835]"
            }`}
            title={isWishlisted ? "Remove from Wishlist" : "Save to Wishlist"}
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? "fill-[#6D1835]" : ""}`} />
          </button>
        </div>

        {/* Product Details */}
        <div className="pt-3 px-1">
          <h3 className="font-medium text-xs sm:text-sm text-stone-900 group-hover:text-[#6D1835] transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Star Rating */}
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="flex items-center text-amber-500">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            </div>
            <span className="text-[11px] font-semibold text-stone-700">4.8</span>
            <span className="text-[10px] text-stone-600 font-medium">(120)</span>
          </div>

          {/* Price & Discount Row */}
          <div className="flex items-center gap-2 mt-2">
            <span className="font-bold text-sm sm:text-base text-stone-900">
              {formatPrice(price)}
            </span>
            {regularPrice > price && (
              <span className="text-xs text-stone-600 line-through">
                {formatPrice(regularPrice)}
              </span>
            )}
            {discountPercent && (
              <span className="px-1.5 py-0.5 rounded bg-[#FFF0E6] text-[#8C3204] text-[10px] font-bold">
                {discountPercent}% OFF
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Solid Maroon Add to Cart Button */}
      {showAddToCart && (
        <div className="pt-3 mt-1">
          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full py-2 px-3 rounded-lg bg-[#5B132B] hover:bg-[#480F22] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>
        </div>
      )}
    </div>
  );
}
