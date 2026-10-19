import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { SEED_PRODUCTS, SEED_REVIEWS } from "@/lib/data/store-data";
import ProductDetailClient from "@/components/storefront/ProductDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export const instant = false;

export async function generateStaticParams() {
  return SEED_PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = SEED_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Product Not Found | Rooh Vastr",
    };
  }

  return {
    title: `${product.name} | Rooh Vastr`,
    description: product.short_description || product.description,
    openGraph: {
      title: `${product.name} | Rooh Vastr`,
      description: product.short_description || product.description,
      images: [
        {
          url: product.primary_image || product.images[0]?.image_url || "",
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = SEED_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Related products from same category or fallback
  const relatedProducts = SEED_PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category_id === product.category_id || p.product_type === product.product_type)
  ).slice(0, 4);

  // Reviews for this product or general sample
  const reviews = SEED_REVIEWS.filter((r) => r.product_id === product.id);
  const displayReviews = reviews.length > 0 ? reviews : SEED_REVIEWS.slice(0, 3);

  return (
    <ProductDetailClient
      product={product}
      relatedProducts={relatedProducts}
      reviews={displayReviews}
    />
  );
}
