export interface WatchProgress {
  contentId: string;
  title: string;
  thumbnail: string;
  progress: number; // 0-100
  duration: string;
  lastWatched: number; // timestamp
  type: "movie" | "series" | "replay";
}

export interface UserPreferences {
  lastVisitedSection: string;
  continueWatching: WatchProgress[];
  favoriteGenres: string[];
}

class PersonalizationManager {
  private storageKey = "tv-app-preferences";

  getPreferences(): UserPreferences {
    if (typeof window === "undefined") {
      return {
        lastVisitedSection: "home",
        continueWatching: [],
        favoriteGenres: [],
      };
    }

    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error("Failed to load preferences:", error);
    }

    return {
      lastVisitedSection: "home",
      continueWatching: [],
      favoriteGenres: [],
    };
  }

  savePreferences(preferences: UserPreferences): void {
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem(this.storageKey, JSON.stringify(preferences));
    } catch (error) {
      console.error("Failed to save preferences:", error);
    }
  }

  addToWatchHistory(
    content: {
      id: string;
      title: string;
      thumbnail: string;
      duration: string;
      type: "movie" | "series" | "replay";
    },
    progress: number
  ): void {
    const preferences = this.getPreferences();

    // Remove existing entry if it exists
    preferences.continueWatching = preferences.continueWatching.filter(
      (item) => item.contentId !== content.id
    );

    // Add new entry (only if progress is meaningful)
    if (progress > 5 && progress < 95) {
      preferences.continueWatching.unshift({
        contentId: content.id,
        title: content.title,
        thumbnail: content.thumbnail,
        progress,
        duration: content.duration,
        lastWatched: Date.now(),
        type: content.type,
      });

      // Keep only the 10 most recent items
      preferences.continueWatching = preferences.continueWatching.slice(0, 10);
    }

    this.savePreferences(preferences);
  }

  setLastVisitedSection(section: string): void {
    const preferences = this.getPreferences();
    preferences.lastVisitedSection = section;
    this.savePreferences(preferences);
  }

  getContinueWatching(): WatchProgress[] {
    return this.getPreferences().continueWatching;
  }

  trackGenreInteraction(genre: string): void {
    const preferences = this.getPreferences();

    // Add or move genre to front of favorites
    preferences.favoriteGenres = preferences.favoriteGenres.filter(
      (g) => g !== genre
    );
    preferences.favoriteGenres.unshift(genre);

    // Keep only top 5 favorite genres
    preferences.favoriteGenres = preferences.favoriteGenres.slice(0, 5);

    this.savePreferences(preferences);
  }

  getPersonalizedRecommendations<
    T extends { genre: string; rating?: string; year: number }
  >(content: T[], limit = 8): T[] {
    const preferences = this.getPreferences();
    const watchedIds = new Set(
      preferences.continueWatching.map((item) => item.contentId)
    );

    // Filter out already watched content
    const unwatched = content.filter(
      (item) => !watchedIds.has((item as any).id)
    );

    // Score content based on preferences
    const scored = unwatched.map((item) => {
      let score = 0;

      // Favorite genre bonus
      const genreIndex = preferences.favoriteGenres.indexOf(item.genre);
      if (genreIndex !== -1) {
        score += (5 - genreIndex) * 10; // Higher score for more preferred genres
      }

      // Recent content bonus
      const currentYear = new Date().getFullYear();
      const yearDiff = currentYear - item.year;
      if (yearDiff <= 5) {
        score += (5 - yearDiff) * 2;
      }

      // High rating bonus
      if (item.rating) {
        const rating = Number.parseFloat(item.rating);
        if (rating >= 8.0) score += 5;
        else if (rating >= 7.0) score += 3;
      }

      return { item, score };
    });

    // Sort by score and return top items
    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(({ item }) => item);
  }

  getLastVisitedSection(): string {
    return this.getPreferences().lastVisitedSection;
  }

  getFavoriteGenres(): string[] {
    return this.getPreferences().favoriteGenres;
  }

  shouldAutoResume(contentId: string): {
    shouldResume: boolean;
    progress: number;
  } {
    const continueWatching = this.getContinueWatching();
    const item = continueWatching.find((item) => item.contentId === contentId);

    if (item && item.progress > 10 && item.progress < 90) {
      // Auto-resume if watched within last 7 days
      const daysSinceWatched =
        (Date.now() - item.lastWatched) / (1000 * 60 * 60 * 24);
      return {
        shouldResume: daysSinceWatched <= 7,
        progress: item.progress,
      };
    }

    return { shouldResume: false, progress: 0 };
  }

  clearWatchHistory(): void {
    const preferences = this.getPreferences();
    preferences.continueWatching = [];
    this.savePreferences(preferences);
  }

  removeFromContinueWatching(contentId: string): void {
    const preferences = this.getPreferences();
    preferences.continueWatching = preferences.continueWatching.filter(
      (item) => item.contentId !== contentId
    );
    this.savePreferences(preferences);
  }
}

export const personalization = new PersonalizationManager();
