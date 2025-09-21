"use client";

import { useState, useEffect, useMemo } from "react";
import { useTVNavigation } from "@/hooks/use-tv-navigation";
import { useRouter } from "next/navigation";
import { TVLayout } from "@/components/tv-layout";
import { ContentPoster } from "@/components/content-poster";
import { SkeletonPoster } from "@/components/skeleton-poster";
import { Button } from "@/components/ui/button";
import { tvNavigation } from "@/lib/navigation";
import { personalization } from "@/lib/personalization";
import {
  mockMovies,
  mockSeries,
  mockReplayContent,
  mockTVChannels,
} from "@/lib/mock-data";
import { ArrowLeft, Search, X } from "lucide-react";
import type { VideoContent, TVChannel } from "@/types/content";

export default function SearchPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [pendingQuery, setPendingQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [searchResults, setSearchResults] = useState<{
    movies: VideoContent[];
    series: VideoContent[];
    replay: VideoContent[];
    channels: TVChannel[];
  }>({
    movies: [],
    series: [],
    replay: [],
    channels: [],
  });

  const categories = [
    { id: "all", label: "All" },
    { id: "movies", label: "Movies" },
    { id: "series", label: "Series" },
    { id: "replay", label: "Replay" },
    { id: "channels", label: "Live TV" },
  ];

  const sortOptions = [
    { id: "relevance", label: "Relevance" },
    { id: "title", label: "Title A-Z" },
    { id: "year", label: "Year" },
    { id: "rating", label: "Rating" },
    { id: "duration", label: "Duration" },
  ];

  // Only perform search when user clicks search or presses Enter
  const performSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults({
        movies: [],
        series: [],
        replay: [],
        channels: [],
      });
      return;
    }
    setIsSearching(true);
    setTimeout(() => {
      const q = query.toLowerCase();
      const searchInContent = (content: VideoContent[]) =>
        content.filter(
          (item) =>
            item.title.toLowerCase().includes(q) ||
            item.description?.toLowerCase().includes(q) ||
            item.genre?.toLowerCase().includes(q)
        );
      const searchInChannels = (channels: TVChannel[]) =>
        channels.filter(
          (channel) =>
            channel.name.toLowerCase().includes(q) ||
            channel.genre?.toLowerCase().includes(q)
        );
      setSearchResults({
        movies: searchInContent(mockMovies),
        series: searchInContent(mockSeries),
        replay: searchInContent(mockReplayContent),
        channels: searchInChannels(mockTVChannels),
      });
      setIsSearching(false);
    }, 300);
  };

  // Filter and sort results based on selected category and sort option
  const filteredResults = useMemo(() => {
    let results: any[] = [];

    if (selectedCategory === "all") {
      results = [
        ...searchResults.movies,
        ...searchResults.series,
        ...searchResults.replay,
        ...searchResults.channels.map((channel) => ({
          id: channel.id,
          title: channel.name,
          description: `Live ${channel.genre} channel`,
          thumbnail: channel.logo,
          duration: "Live",
          genre: channel.genre,
          year: new Date().getFullYear(),
          rating: "",
          streamUrl: channel.streamUrl,
          type: "channel" as const,
        })),
      ];
    } else {
      switch (selectedCategory) {
        case "movies":
          results = searchResults.movies;
          break;
        case "series":
          results = searchResults.series;
          break;
        case "replay":
          results = searchResults.replay;
          break;
        case "channels":
          results = searchResults.channels.map((channel) => ({
            id: channel.id,
            title: channel.name,
            description: `Live ${channel.genre} channel`,
            thumbnail: channel.logo,
            duration: "Live",
            genre: channel.genre,
            year: new Date().getFullYear(),
            rating: "",
            streamUrl: channel.streamUrl,
            type: "channel" as const,
          }));
          break;
        default:
          results = [];
      }
    }

    if (sortBy !== "relevance") {
      results.sort((a, b) => {
        switch (sortBy) {
          case "title":
            return a.title.localeCompare(b.title);
          case "year":
            return (b.year || 0) - (a.year || 0);
          case "rating":
            return (
              Number.parseFloat(b.rating || "0") -
              Number.parseFloat(a.rating || "0")
            );
          case "duration":
            if (a.duration === "Live" && b.duration !== "Live") return 1;
            if (b.duration === "Live" && a.duration !== "Live") return -1;
            return a.duration.localeCompare(b.duration);
          default:
            return 0;
        }
      });
    }

    return results;
  }, [searchResults, selectedCategory, sortBy]);

  useEffect(() => {
    // Set up navigation grid
    const grid = [];

    // Header row: back, search input, search button, clear (X)
    const headerRow = ["back-btn", "search-input"];
    if (pendingQuery) headerRow.push("search-btn");
    if (pendingQuery) headerRow.push("clear-search");
    grid.push(headerRow);

    // Category filter row
    const categoryRow = categories.map((cat) => `category-${cat.id}`);
    grid.push(categoryRow);

    // Results grid (3 columns)
    if (filteredResults.length > 0) {
      for (let i = 0; i < filteredResults.length; i += 3) {
        const row = [];
        for (let j = 0; j < 3 && i + j < filteredResults.length; j++) {
          row.push(`result-${i + j}`);
        }
        grid.push(row);
      }
    }

    tvNavigation.setGrid(grid);
  }, [filteredResults.length, categories.length, pendingQuery]);

  const handleBack = () => {
    personalization.setLastVisitedSection("home");
    router.back();
  };

  const handleContentSelect = (content: VideoContent | any) => {
    if (content.genre) {
      personalization.trackGenreInteraction(content.genre);
    }

    if (content.type === "channel") {
      router.push(`/live-tv?channel=${content.id}`);
    } else {
      router.push(`/player?content=${content.id}`);
    }
  };

  // Update pendingQuery as user types
  const handleInputChange = (query: string) => {
    setPendingQuery(query);
  };

  // When user clicks search or presses Enter, update searchQuery and perform search
  const handleSearch = () => {
    setSearchQuery(pendingQuery);
    performSearch(pendingQuery);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setPendingQuery("");
    setSearchResults({
      movies: [],
      series: [],
      replay: [],
      channels: [],
    });
    setSelectedCategory("all");
    setSortBy("relevance");
  };

  const handleVoiceSearch = () => {
    // Voice search would be implemented here
    console.log("Voice search activated");
  };

  const totalResults = Object.values(searchResults).reduce(
    (sum, results) => sum + results.length,
    0
  );

  // TV navigation refs for header controls
  const backBtnRef = useTVNavigation({
    id: "back-btn",
    onSelect: handleBack,
    autoFocus: true,
  }) as React.RefObject<HTMLButtonElement>;
  const searchInputRef = useTVNavigation({
    id: "search-input",
    onSelect: handleSearch,
  }) as React.RefObject<HTMLInputElement>;
  const searchBtnRef = useTVNavigation({
    id: "search-btn",
    onSelect: handleSearch,
  }) as React.RefObject<HTMLButtonElement>;
  const clearSearchRef = useTVNavigation({
    id: "clear-search",
    onSelect: handleClearSearch,
  }) as React.RefObject<HTMLButtonElement>;

  return (
    <TVLayout backgroundImage="/cinematic-dark-streaming-background.jpg">
      <header className="flex items-center gap-8 p-8 pt-12 relative z-10">
        <Button
          id="back-btn"
          ref={backBtnRef}
          variant="ghost"
          size="lg"
          className="text-white hover:bg-white/10 backdrop-blur-sm border border-white/20 px-6"
          onClick={handleBack}
          tabIndex={-1}
        >
          <ArrowLeft className="w-5 h-5 mr-3" />
          Back
        </Button>
        <div className="flex-1 max-w-3xl">
          <div className="relative">
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
            <input
              id="search-input"
              ref={searchInputRef}
              type="text"
              placeholder="Search movies, series, channels..."
              value={pendingQuery}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
                // Prevent TV navigation from stealing focus when typing
                e.stopPropagation();
              }}
              className="w-full glassmorphism text-white placeholder-white/60 rounded-xl pl-14 pr-14 py-5 text-lg font-light tracking-wide focus:outline-none focus:ring-2 focus:ring-primary/60 focus:bg-white/20 transition-all duration-300"
              tabIndex={-1}
              autoFocus
            />
            {pendingQuery && (
              <Button
                id="search-btn"
                ref={searchBtnRef}
                variant="ghost"
                size="sm"
                className="absolute right-12 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg"
                onClick={handleSearch}
                tabIndex={-1}
              >
                <Search className="w-4 h-4" />
              </Button>
            )}
            {pendingQuery && (
              <Button
                id="clear-search"
                ref={clearSearchRef}
                variant="ghost"
                size="sm"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg"
                onClick={handleClearSearch}
                tabIndex={-1}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-8 pb-8 relative z-10">
        <div className="flex gap-4 mb-10 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => {
            const ref = useTVNavigation({
              id: `category-${category.id}`,
              onSelect: () => setSelectedCategory(category.id),
            }) as React.RefObject<HTMLButtonElement>;
            return (
              <Button
                key={category.id}
                id={`category-${category.id}`}
                ref={ref}
                variant={
                  selectedCategory === category.id ? "default" : "secondary"
                }
                className={`
                  flex-shrink-0 px-8 py-3 text-sm font-light tracking-wide transition-all duration-300 rounded-full
                  ${
                    selectedCategory === category.id
                      ? "bg-primary text-primary-foreground shadow-xl scale-105 border-primary/40"
                      : "glassmorphism text-white hover:bg-white/10 focus:bg-white/10 border-white/20"
                  }
                  focus:scale-110 focus:ring-4 focus:ring-primary/40
                `}
                onClick={() => setSelectedCategory(category.id)}
                tabIndex={-1}
              >
                {category.label}
                {searchQuery && (
                  <span className="ml-3 bg-white/20 px-2 py-1 rounded-full text-xs font-medium">
                    {category.id === "all"
                      ? totalResults
                      : category.id === "movies"
                      ? searchResults.movies.length
                      : category.id === "series"
                      ? searchResults.series.length
                      : category.id === "replay"
                      ? searchResults.replay.length
                      : searchResults.channels.length}
                  </span>
                )}
              </Button>
            );
          })}
        </div>

        {showFilters && (
          <div className="glassmorphism rounded-xl p-6 mb-8 border border-white/20">
            <h3 className="text-white font-light text-lg mb-4 tracking-wide">
              Sort by
            </h3>
            <div className="flex gap-3 flex-wrap">
              {sortOptions.map((option) => (
                <Button
                  key={option.id}
                  variant={sortBy === option.id ? "default" : "secondary"}
                  size="sm"
                  className={`
                    px-4 py-2 text-sm font-light transition-all duration-200 rounded-lg
                    ${
                      sortBy === option.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }
                  `}
                  onClick={() => setSortBy(option.id)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {!searchQuery ? (
          <div className="text-center py-20">
            <div className="glassmorphism rounded-2xl p-12 max-w-md mx-auto">
              <Search className="w-20 h-20 text-white/30 mx-auto mb-6" />
              <h2 className="text-3xl font-light text-white mb-4 tracking-wide">
                Search for Content
              </h2>
              <p className="text-white/60 font-light leading-relaxed">
                Find movies, series, replay content, and live TV channels
              </p>
            </div>
          </div>
        ) : isSearching ? (
          <div className="grid grid-cols-3 gap-10 max-w-7xl mx-auto">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonPoster key={index} />
            ))}
          </div>
        ) : filteredResults.length > 0 ? (
          <div className="space-y-8">
            <div className="text-white/60 text-sm font-light tracking-wide">
              {filteredResults.length} result
              {filteredResults.length !== 1 ? "s" : ""} for "{searchQuery}"
              {selectedCategory !== "all" &&
                ` in ${
                  categories.find((c) => c.id === selectedCategory)?.label
                }`}
              {sortBy !== "relevance" &&
                ` • Sorted by ${
                  sortOptions.find((s) => s.id === sortBy)?.label
                }`}
            </div>

            <div className="grid grid-cols-3 gap-10 max-w-7xl mx-auto">
              {filteredResults.map((item, index) => (
                <ContentPoster
                  key={item.id}
                  content={item}
                  onSelect={handleContentSelect}
                  navId={`result-${index}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="glassmorphism rounded-2xl p-12 max-w-md mx-auto">
              <div className="text-white/40 text-2xl mb-6 font-light">
                No results found
              </div>
              <div className="text-white/30 font-light leading-relaxed">
                Try searching for different keywords or check your spelling
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="p-8 text-center relative z-10">
        <p className="text-muted-foreground text-sm font-light tracking-wide">
          Use arrow keys to navigate • Press Enter to select • Type to search •
          Press Escape to go back
        </p>
      </footer>
    </TVLayout>
  );
}
