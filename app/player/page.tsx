"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { VideoPlayer } from "@/components/video-player";
import { Suspense } from "react";

function PlayerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const streamUrl = searchParams.get("url") || "";
  const title = searchParams.get("title") || "Video Player";

  const handleBack = () => {
    router.back();
  };

  if (!streamUrl) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No Stream URL Provided</h1>
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <VideoPlayer streamUrl={streamUrl} title={title} onBack={handleBack} />
  );
}

export default function PlayerPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen bg-black">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      }
    >
      <PlayerContent />
    </Suspense>
  );
}
