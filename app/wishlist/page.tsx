'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import { useWishlist } from '@/lib/context/WishlistContext';
import { useCart } from '@/lib/context/CartContext';
import { formatCurrency } from '@/lib/utils';

export default function WishlistPage() {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product: any) => {
    addToCart(product, 1, product.available_sizes?.[0], product.available_colors?.[0]?.name);
    removeFromWishlist(product.id);
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-8 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6D1835]/10 text-[#6D1835] text-xs font-semibold tracking-widest uppercase mb-3">
              <Heart className="w-3.5 h-3.5 fill-current" /> Personal Vault
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#242124] font-medium tracking-tight">
              Your Saved Keepsakes
            </h1>
          </div>
          <div className="text-xs text-stone-500 uppercase tracking-widest font-semibold">
            {items.length} {items.length === 1 ? 'Treasure' : 'Treasures'} Saved
          </div>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 md:p-16 text-center border border-stone-200/90 shadow-sm max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#6D1835]/10 text-[#6D1835] flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-2xl md:text-3xl text-[#242124] mb-3">Your Wishlist is Empty</h2>
            <p className="text-sm text-stone-600 mb-8 max-w-md mx-auto leading-relaxed font-light">
              Save the garments, mugs, frames, and cushions that speak to your heart. They will wait right here whenever you&apos;re ready to gift or wear them.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/shop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#6D1835] text-white px-7 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#56132a] transition-all shadow-md"
              >
                <ShoppingBag className="w-4 h-4" /> Explore Shop
              </Link>
              <Link
                href="/custom-printing"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-stone-200 bg-white text-[#242124] px-7 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:border-[#6D1835] hover:text-[#6D1835] transition-all"
              >
                <Sparkles className="w-4 h-4 text-[#6D1835]" /> Create Bespoke Print
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
              >
                {/* Image container */}
                <div className="relative aspect-square overflow-hidden bg-stone-100">
                  <Image
                    src={product.primary_image || product.images?.[0]?.image_url || '/placeholder.jpg'}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs text-stone-500 hover:text-red-600 flex items-center justify-center shadow-sm transition-all"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  {product.sale_price && (
                    <span className="absolute top-3 left-3 bg-[#6D1835] text-white text-[10px] font-bold uppercase tracking-wider py-1 px-2.5 rounded-full">
                      Sale
                    </span>
                  )}
                </div>

                {/* Info container */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-semibold tracking-widest text-[#6D1835] uppercase block mb-1">
                      {product.category_name || 'Exclusive'}
                    </span>
                    <Link
                      href={`/product/${product.slug}`}
                      className="font-serif text-lg font-medium text-[#242124] hover:text-[#6D1835] transition-colors line-clamp-1 mb-2 block"
                    >
                      {product.name}
                    </Link>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="font-semibold text-stone-900 text-sm">
                        {formatCurrency(product.sale_price || product.regular_price)}
                      </span>
                      {product.sale_price && (
                        <span className="text-xs text-stone-400 line-through">
                          {formatCurrency(product.regular_price)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-stone-100">
                    <button
                      onClick={() => handleMoveToCart(product)}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#6D1835] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#56132a] transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" /> Move to Bag
                    </button>
                    <Link
                      href={`/product/${product.slug}`}
                      className="w-full py-2 px-4 rounded-xl border border-stone-200 text-stone-700 text-xs font-semibold uppercase tracking-wider hover:border-[#6D1835] hover:text-[#6D1835] transition-all flex items-center justify-center gap-1.5"
                    >
                      View Details &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
