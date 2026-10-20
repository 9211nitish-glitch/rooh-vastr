import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Print Studio | Design Your Own Apparel & Gifts | ROOH VASTR",
  description: "Upload your photos, designs, or anniversary dates. We craft bespoke 220 GSM bio-washed tees, magic mugs, photo frames, and customized keepsakes with live proofing.",
  openGraph: {
    title: "Custom Print Studio | ROOH VASTR",
    description: "Design your personalized t-shirts, hoodies, mugs, and photo keepsakes with live designer support.",
    images: [{ url: "/images/brand/og-share-1200x630.jpg", width: 1200, height: 630, alt: "ROOH VASTR Custom Print Studio" }],
  },
};

export default function CustomPrintingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
