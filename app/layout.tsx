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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://roohvastr.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "ROOH VASTR | Wear Your Story. Gift Your Feelings.",
  description: "India's boutique emotional gifting & premium apparel brand. Discover ready-to-wear luxury collections and customized personalized print-on-demand gifts crafted with soul.",
  keywords: ["custom apparel india", "personalized gifts", "custom t-shirts", "custom mugs", "hoodies customized", "emotional gifting", "rooh vastr"],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    title: "ROOH VASTR",
    statusBarStyle: "default",
    capable: true,
  },
  openGraph: {
    title: "ROOH VASTR | Wear Your Story. Gift Your Feelings.",
    description: "India's boutique emotional gifting & premium customized apparel brand. Discover handcrafted gifts made with soul.",
    url: siteUrl,
    type: "website",
    locale: "en_IN",
    siteName: "ROOH VASTR",
    images: [
      {
        url: "/images/brand/og-share-1200x630.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "ROOH VASTR - Wear Your Story. Gift Your Feelings.",
      },
      {
        url: "/images/brand/whatsapp-preview-square.jpg",
        width: 600,
        height: 600,
        type: "image/jpeg",
        alt: "ROOH VASTR Boutique Gifting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ROOH VASTR | Wear Your Story. Gift Your Feelings.",
    description: "India's boutique emotional gifting & premium apparel brand.",
    images: ["/images/brand/og-share-1200x630.jpg"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ROOH VASTR",
  alternateName: "Rooh Vastr",
  url: siteUrl,
  logo: `${siteUrl}/images/brand/og-share-1200x630.jpg`,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+919654861504",
    contactType: "customer service",
    areaServed: "IN",
    availableLanguage: ["en", "hi"],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ROOH VASTR",
  url: siteUrl,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link
          rel="preload"
          as="image"
          href="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80"
          fetchPriority="high"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
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
