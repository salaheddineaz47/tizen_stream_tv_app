"use client";

import type React from "react";

import { useRouter } from "next/navigation";
import { TVLayout } from "@/components/tv-layout";
import { ArrowLeft } from "lucide-react";
import { useTVNavigation } from "@/hooks/use-tv-navigation";

interface CategoryPageLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function CategoryPageLayout({
  title,
  children,
}: CategoryPageLayoutProps) {
  const router = useRouter();

  const backRef = useTVNavigation({
    id: "back-button",
    onSelect: () => router.back(),
    autoFocus: true,
  });

  return (
    <TVLayout backgroundImage="/modern-living-room-with-tv.jpg">
      {/* Header */}
      <header className="flex items-center gap-6 p-8 pt-12">
        <button
          ref={backRef}
          className="flex items-center gap-3 text-white hover:text-primary transition-colors focus:text-primary focus:scale-110 glassmorphism px-4 py-2 rounded-xl"
          tabIndex={-1}
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="text-lg font-medium">Back</span>
        </button>
        <h1 className="text-4xl font-bold text-white">{title}</h1>
      </header>

      {/* Content */}
      <main className="flex-1 px-8 pb-8 ">{children}</main>
    </TVLayout>
  );
}
