"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CategoryPageLayout } from "@/components/category-page-layout";
import { ContentPoster } from "@/components/content-poster";
import { tvNavigation } from "@/lib/navigation";
import { mockSeries } from "@/lib/mock-data";
import type { VideoContent } from "@/types/content";

export default function SeriesPage() {
  const router = useRouter();

  useEffect(() => {
    // Create navigation grid for series (4 columns)
    const grid = [];
    grid.push(["back-button"]); // Header row

    const ITEMS_PER_ROW = 4;
    for (let i = 0; i < mockSeries.length; i += ITEMS_PER_ROW) {
      const row = [];
      for (let j = 0; j < ITEMS_PER_ROW && i + j < mockSeries.length; j++) {
        row.push(`series-${i + j}`);
      }
      grid.push(row);
    }

    tvNavigation.setGrid(grid);
  }, []);

  const handleSeriesSelect = (series: VideoContent) => {
    const params = new URLSearchParams({
      url: series.streamUrl,
      title: series.title,
    });
    router.push(`/player?${params.toString()}`);
  };

  return (
    <CategoryPageLayout title="Series">
      <div className="grid grid-cols-4 gap-8 max-w-6xl mx-auto">
        {mockSeries.map((series, index) => (
          <ContentPoster
            key={series.id}
            content={series}
            onSelect={handleSeriesSelect}
            navId={`series-${index}`}
          />
        ))}
      </div>
    </CategoryPageLayout>
  );
}
