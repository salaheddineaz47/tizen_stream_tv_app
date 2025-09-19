"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { TVLayout } from "@/components/tv-layout";
import { WeatherWidget } from "@/components/weather-widget";
import { CategoryCard } from "@/components/category-card";
import { tvNavigation } from "@/lib/navigation";
import { Tv, Film, MonitorPlay, RotateCcw } from "lucide-react";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Set up navigation grid for the main dashboard
    tvNavigation.setGrid([
      ["live-tv", "movies", "series", "replay"], // Main category row
    ]);
  }, []);

  const handleCategorySelect = (category: string) => {
    router.push(`/${category}`);
  };

  return (
    <TVLayout backgroundImage="/modern-living-room-with-tv.jpg">
      {/* Header with Weather Widget */}
      <header className="flex justify-between items-start p-8 pt-12">
        <div className="flex items-center gap-4">
          <div className="text-3xl font-bold text-white">
            <span className="text-primary">Tv</span>
            <span className="text-xs align-super">APP</span>
          </div>
        </div>
        <WeatherWidget />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-8">
        <div className="grid grid-cols-4 gap-14 max-w-6xl">
          <CategoryCard
            id="live-tv"
            title="Live TV"
            icon={Tv}
            backgroundImage="/live-television-broadcast.jpg"
            onSelect={() => handleCategorySelect("live-tv")}
            autoFocus
          />
          <CategoryCard
            id="movies"
            title="Movies"
            icon={Film}
            backgroundImage="/classic-movie-theater.png"
            onSelect={() => handleCategorySelect("movies")}
          />
          <CategoryCard
            id="series"
            title="Series"
            icon={MonitorPlay}
            backgroundImage="/tv-series-episodes.jpg"
            onSelect={() => handleCategorySelect("series")}
          />
          <CategoryCard
            id="replay"
            title="Replay"
            icon={RotateCcw}
            backgroundImage="/replay-catch-up-tv.jpg"
            onSelect={() => handleCategorySelect("replay")}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="p-8 text-center">
        <p className="text-muted-foreground text-sm">
          Use arrow keys to navigate • Press Enter to select • Press Escape to
          go back
        </p>
      </footer>
    </TVLayout>
  );
}
