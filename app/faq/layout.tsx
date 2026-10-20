import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | ROOH VASTR",
  description: "Everything you need to know about our custom printing techniques, delivery timelines, size guides, and return policies.",
  openGraph: {
    title: "Frequently Asked Questions | ROOH VASTR",
    description: "Everything you need to know about our custom printing techniques, delivery timelines, size guides, and return policies.",
    images: [{ url: "/images/brand/og-share-1200x630.jpg", width: 1200, height: 630, alt: "ROOH VASTR FAQ" }],
  },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
