import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us & Design Concierge | ROOH VASTR",
  description: "Have questions about custom printing, urgent delivery, or bulk orders? Connect directly with our design artisans via WhatsApp or email.",
  openGraph: {
    title: "Contact Us | ROOH VASTR",
    description: "Connect directly with our design artisans for customized gifting inquiries.",
    images: [{ url: "/images/brand/og-share-1200x630.jpg", width: 1200, height: 630, alt: "ROOH VASTR Contact" }],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
