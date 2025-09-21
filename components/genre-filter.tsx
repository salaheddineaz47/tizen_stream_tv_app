"use client";
import { Button } from "@/components/ui/button";
import { useTVNavigation } from "@/hooks/use-tv-navigation";

interface GenreFilterProps {
  genres: string[];
  selectedGenre: string | null;
  onGenreSelect: (genre: string | null) => void;
}

export function GenreFilter({
  genres,
  selectedGenre,
  onGenreSelect,
}: GenreFilterProps) {
  const allGenres = ["All", ...genres];
  const genreRefs = allGenres.map(() => null); // Initialize refs array

  const genreRefsHook = allGenres.map((genre) =>
    useTVNavigation({
      id: `filter-${genre.toLowerCase()}`,
      onSelect: () => onGenreSelect(genre === "All" ? null : genre),
    })
  );

  // Assign hooks to refs array
  genreRefs.forEach((_, index) => {
    genreRefs[index] = genreRefsHook[index];
  });

  return (
    <div className="flex gap-4 mb-10 overflow-x-auto pb-2 scrollbar-hide">
      {allGenres.map((genre, index) => {
        const isSelected =
          (genre === "All" && !selectedGenre) || genre === selectedGenre;
        const elementRef = genreRefs[index];

        return (
          <Button
            key={genre}
            ref={elementRef}
            variant={isSelected ? "default" : "secondary"}
            className={`
              flex-shrink-0 px-8 py-3 text-sm font-light tracking-wide transition-all duration-300 rounded-full
              ${
                isSelected
                  ? "bg-primary text-primary-foreground shadow-xl scale-105 border-primary/40"
                  : "glassmorphism text-white hover:bg-white/10 focus:bg-white/10 border-white/20"
              }
              focus:scale-110 focus:ring-4 focus:ring-primary/40
            `}
            tabIndex={-1}
          >
            {genre}
          </Button>
        );
      })}
    </div>
  );
}
