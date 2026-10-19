"use client";

import React from "react";
import { usePathname } from "next/navigation";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ExitIntentModal from "@/components/storefront/ExitIntentModal";
import AIChatbotWidget from "@/components/storefront/AIChatbotWidget";

export default function StoreLayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    // For admin pages: DO NOT render public header, announcement bar, footer, or exit intent popup!
    return <div className="min-h-screen bg-[#F8F9FA] text-[#1E293B]">{children}</div>;
  }

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <ExitIntentModal />
      <AIChatbotWidget />
    </>
  );
}
