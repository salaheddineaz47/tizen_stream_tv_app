"use client";

import type React from "react";

import { useRouter } from "next/navigation";
import { TVLayout } from "@/components/tv-layout";
import { ArrowLeft } from "lucide-react";
import { useTVNavigation } from "@/hooks/use-tv-navigation";
import { BackButton } from "./BackButton";

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
        <BackButton ref={backRef} />
        <h1 className="text-4xl font-bold text-white">{title}</h1>
      </header>

      {/* Content */}
      <main className="flex-1 px-8 pb-8 ">{children}</main>
    </TVLayout>
  );
}
