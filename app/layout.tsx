import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/context/CartContext";
import { WishlistProvider } from "@/lib/context/WishlistContext";
import StoreLayoutShell from "@/components/layout/StoreLayoutShell";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#4F1026",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://roohvastr.vercel.app"),
  title: "ROOH VASTR | Wear Your Story. Gift Your Feelings.",
  description: "India's boutique emotional gifting & premium apparel brand. Discover ready-to-wear luxury collections and customized personalized print-on-demand gifts crafted with soul.",
  keywords: ["custom apparel india", "personalized gifts", "custom t-shirts", "custom mugs", "hoodies customized", "emotional gifting", "rooh vastr"],
  openGraph: {
    title: "ROOH VASTR | Wear Your Story. Gift Your Feelings.",
    description: "Premium apparel & emotional personalized gifting platform with bespoke print craft.",
    type: "website",
    locale: "en_IN",
    siteName: "ROOH VASTR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#FAF7F2] text-[#242124] selection:bg-[#C98F9F]/30 selection:text-[#4F1026] overflow-x-hidden">
        <CartProvider>
          <WishlistProvider>
            <StoreLayoutShell>{children}</StoreLayoutShell>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
