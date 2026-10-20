import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Personalized Gifts & Luxury Apparel | ROOH VASTR",
  description: "Browse custom printed t-shirts, personalized ceramic mugs, custom hoodies, satin pillows, and corporate gift hampers with artisanal craftsmanship.",
  openGraph: {
    title: "Shop Personalized Gifts & Luxury Apparel | ROOH VASTR",
    description: "Browse custom printed t-shirts, personalized ceramic mugs, custom hoodies, satin pillows, and corporate gift hampers.",
    images: [{ url: "/images/brand/og-share-1200x630.jpg", width: 1200, height: 630, alt: "ROOH VASTR Shop" }],
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
