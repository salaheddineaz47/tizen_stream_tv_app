"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CategoryPageLayout } from "@/components/category-page-layout";
import { ContentPoster } from "@/components/content-poster";
import { tvNavigation } from "@/lib/navigation";
import { mockMovies } from "@/lib/mock-data";
import type { VideoContent } from "@/types/content";

export default function MoviesPage() {
  const router = useRouter();

  useEffect(() => {
    // Create navigation grid for movies (3 columns)
    const grid = [];
    grid.push(["back-button"]); // Header row

    // Content rows (3 movies per row)
    const MOVIES_PER_ROW = 4;
    for (let i = 0; i < mockMovies.length; i += MOVIES_PER_ROW) {
      const row = [];
      for (let j = 0; j < MOVIES_PER_ROW && i + j < mockMovies.length; j++) {
        row.push(`movie-${i + j}`);
      }
      grid.push(row);
    }

    tvNavigation.setGrid(grid);
  }, []);

  const handleMovieSelect = (movie: VideoContent) => {
    const params = new URLSearchParams({
      url: movie.streamUrl,
      title: movie.title,
    });
    router.push(`/player?${params.toString()}`);
  };

  return (
    <CategoryPageLayout title="Movies">
      <div className="grid grid-cols-4 gap-8 max-w-7xl mx-auto">
        {mockMovies.map((movie, index) => (
          <ContentPoster
            key={movie.id}
            content={movie}
            onSelect={handleMovieSelect}
            navId={`movie-${index}`}
          />
        ))}
      </div>
    </CategoryPageLayout>
  );
}
