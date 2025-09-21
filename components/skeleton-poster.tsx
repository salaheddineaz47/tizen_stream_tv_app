export function SkeletonPoster() {
  return (
    <div className="relative group cursor-pointer transition-all duration-300 rounded-xl overflow-hidden">
      {/* Poster Image Skeleton */}
      <div className="aspect-[2/3] bg-muted/20 rounded-xl overflow-hidden animate-pulse">
        <div className="w-full h-full bg-gradient-to-br from-muted/30 to-muted/10" />
      </div>

      {/* Content Info Skeleton */}
      <div className="p-4 space-y-2">
        <div className="h-6 bg-muted/20 rounded animate-pulse" />
        <div className="h-4 bg-muted/10 rounded w-3/4 animate-pulse" />
        <div className="h-6 bg-muted/10 rounded w-1/2 animate-pulse" />
      </div>
    </div>
  );
}
