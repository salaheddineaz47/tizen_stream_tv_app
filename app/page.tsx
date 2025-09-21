"use client";

import { useEffect } from "react";
import { useTVNavigation } from "@/hooks/use-tv-navigation";
import { useRouter } from "next/navigation";
import { TVLayout } from "@/components/tv-layout";
import { WeatherWidget } from "@/components/weather-widget";
import { CategoryCard } from "@/components/category-card";
import { tvNavigation } from "@/lib/navigation";
import { Tv, Film, MonitorPlay, RotateCcw, Search, User } from "lucide-react";
import Logo from "@/components/Logo";
import SearchCta from "@/components/SearchCta";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Set up navigation grid for the main dashboard
    tvNavigation.setGrid([
      ["search", "profile"], // Header row for buttons
      ["live-tv", "movies", "series", "replay"], // Main category row
    ]);
  }, []);

  const handleCategorySelect = (category: string) => {
    router.push(`/${category}`);
  };

  const handleSearch = () => {
    router.push("/search");
  };

  const handleProfile = () => {
    router.push("/profile");
  };

  // Register search and profile buttons for TV navigation
  const searchRef = useTVNavigation({
    id: "search",
    onSelect: handleSearch,
    autoFocus: true,
  });
  const profileRef = useTVNavigation({
    id: "profile",
    onSelect: handleProfile,
  });

  return (
    <TVLayout backgroundImage="/cinematic-dark-streaming-background.jpg">
      {/* Header with Weather Widget */}
      <header className="flex justify-between items-center px-8 pt-10 pb-4">
        {/* Logo Section */}
        <Logo />
        <div className="flex items-center gap-4">
          <Button
            id="search"
            ref={searchRef}
            variant="ghost"
            size="lg"
            className="text-white hover:bg-white/10 border border-white/20 px-6 focus:ring-4 focus:ring-primary/50"
            onClick={handleSearch}
            tabIndex={-1}
          >
            <Search className="w-5 h-5 mr-3" />
            Search
          </Button>

          <Button
            id="profile"
            ref={profileRef}
            variant="ghost"
            size="lg"
            className="text-white hover:bg-white/10 border border-white/20 px-6 focus:ring-4 focus:ring-primary/50"
            onClick={handleProfile}
            tabIndex={-1}
          >
            <User className="w-5 h-5 mr-3" />
            Profile
          </Button>
        </div>

        {/* Weather Widget */}
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
