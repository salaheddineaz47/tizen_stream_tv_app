"use client";

import { useTVNavigation } from "@/hooks/use-tv-navigation";
import type { VideoContent } from "@/types/content";
import { Play, Clock, Star } from "lucide-react";

interface ContentPosterProps {
  content: VideoContent;
  onSelect: (content: VideoContent) => void;
  navId: string;
}

export function ContentPoster({
  content,
  onSelect,
  navId,
}: ContentPosterProps) {
  const elementRef = useTVNavigation({
    id: navId,
    onSelect: () => onSelect(content),
  });

  return (
    <div
      ref={elementRef}
      className="relative group cursor-pointer transition-all duration-300  focus:ring-4 focus:ring-primary/50 rounded-xl overflow-hidden"
      tabIndex={-1}
    >
      {/* Poster Image */}
      <div className="aspect-[2/2] bg-muted rounded-xl overflow-hidden">
        <img
          src={content.thumbnail || "/placeholder.svg"}
          alt={content.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 group-focus:scale-110"
        />

        {/* Overlay on hover/focus */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Play className="w-16 h-16 text-white drop-shadow-lg mt-[-100px]" />
        </div>
      </div>

      {/* Content Info */}
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-foreground text-lg leading-tight line-clamp-2">
          {content.title}
        </h3>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {content.year && <span>{content.year}</span>}
          {content.duration && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{content.duration}</span>
            </div>
          )}
          {content.rating && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{content.rating}</span>
            </div>
          )}
        </div>

        {content.genre && (
          <div className="inline-block px-2 py-1 bg-primary/70 text-primary-foreground text-xs rounded-full">
            {content.genre}
          </div>
        )}
      </div>
    </div>
  );
}
