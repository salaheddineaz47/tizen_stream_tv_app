"use client";

import { useTVNavigation } from "@/hooks/use-tv-navigation";
import type { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  id: string;
  title: string;
  icon: LucideIcon;
  backgroundImage?: string;
  onSelect: () => void;
  autoFocus?: boolean;
}

export function CategoryCard({
  id,
  title,
  icon: Icon,
  backgroundImage,
  onSelect,
  autoFocus = false,
}: CategoryCardProps) {
  const elementRef = useTVNavigation({
    id,
    onSelect,
    autoFocus,
  });

  return (
    <div
      ref={elementRef}
      className="relative h-96 w-72 rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 hover:scale-105 focus:scale-105 focus:ring-4 focus:ring-primary/50"
      tabIndex={-1}
    >
      {/* Background Image */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/60 to-primary/30" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
        <Icon className="w-16 h-16 mb-4 drop-shadow-lg" />
        <h3 className="text-2xl font-bold text-center drop-shadow-lg">
          {title}
        </h3>
      </div>

      {/* Focus indicator */}
      <div className="absolute inset-0 ring-0 ring-primary/0 transition-all duration-200 group-focus:ring-4 group-focus:ring-primary/50 rounded-2xl" />
    </div>
  );
}
