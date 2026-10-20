import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corporate & Bulk Gifting | Custom Merch for Teams | ROOH VASTR",
  description: "Premium corporate swag, employee onboarding kits, wedding favors, and college fest merchandise with tiered volume discounts and rapid pan-India dispatch.",
  openGraph: {
    title: "Corporate & Bulk Gifting | ROOH VASTR",
    description: "Premium custom merchandise and bulk gifting kits for modern enterprises and startups across India.",
    images: [{ url: "/images/brand/og-share-1200x630.jpg", width: 1200, height: 630, alt: "ROOH VASTR Bulk Gifting" }],
  },
};

export default function BulkOrdersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
