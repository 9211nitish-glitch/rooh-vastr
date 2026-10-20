import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gifting Journal & Design Guide | ROOH VASTR",
  description: "Inspiration, textile care tips, anniversary gift guides, and stories about emotional personalized gifting in India.",
  openGraph: {
    title: "Gifting Journal & Design Guide | ROOH VASTR",
    description: "Inspiration, textile care tips, anniversary gift guides, and stories about emotional personalized gifting in India.",
    images: [{ url: "/images/brand/og-share-1200x630.jpg", width: 1200, height: 630, alt: "ROOH VASTR Journal" }],
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
