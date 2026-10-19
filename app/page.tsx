import React from "react";
import HeroBanner from "@/components/storefront/HeroBanner";
import CategoryCard from "@/components/storefront/CategoryCard";
import DualPromoBanners from "@/components/storefront/DualPromoBanners";
import OccasionsSection from "@/components/storefront/OccasionsSection";
import BestsellingProductsSection from "@/components/storefront/BestsellingProductsSection";
import AiGiftFinderBanner from "@/components/storefront/AiGiftFinderBanner";
import CustomerReviewsSection from "@/components/storefront/CustomerReviewsSection";
import BlogSection from "@/components/storefront/BlogSection";
import NewsletterBar from "@/components/storefront/NewsletterBar";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { 
  SEED_CATEGORIES, 
  SEED_PRODUCTS, 
  SEED_REVIEWS, 
  SEED_BLOGS 
} from "@/lib/data/store-data";

export default function HomePage() {
  const categories = SEED_CATEGORIES;
  const products = SEED_PRODUCTS;
  const reviews = SEED_REVIEWS;
  const blogs = SEED_BLOGS;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Hero Banner with trust badges & montage */}
      <HeroBanner />

      {/* 2. Shop by Category */}
      <section className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#242124]">
            Shop by Category
          </h2>
          <Link
            href="/shop"
            className="text-xs font-bold text-[#5B132B] hover:underline flex items-center gap-1 group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {categories.slice(0, 8).map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* 3. Dual Promo Banners (Custom Printing + Bulk & Corporate) */}
      <DualPromoBanners />

      {/* 4. Gifts by Occasion */}
      <OccasionsSection />

      {/* 5. Bestselling Products with Filter Tabs */}
      <BestsellingProductsSection products={products} />

      {/* 6. AI Gift Finder Banner */}
      <AiGiftFinderBanner />

      {/* 7. What Our Customers Say */}
      <CustomerReviewsSection reviews={reviews} />

      {/* 8. Latest from Our Blog */}
      <BlogSection blogs={blogs} />

      {/* 9. Join Our Gifting Community Newsletter Bar */}
      <NewsletterBar />
    </div>
  );
}
