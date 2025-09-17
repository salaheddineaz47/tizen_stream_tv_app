"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { CategoryPageLayout } from "@/components/category-page-layout"
import { ContentPoster } from "@/components/content-poster"
import { tvNavigation } from "@/lib/navigation"
import { mockReplayContent } from "@/lib/mock-data"
import type { VideoContent } from "@/types/content"

export default function ReplayPage() {
  const router = useRouter()

  useEffect(() => {
    // Create navigation grid for replay content (3 columns)
    const grid = []
    grid.push(["back-button"]) // Header row

    // Content rows (3 items per row)
    for (let i = 0; i < mockReplayContent.length; i += 3) {
      const row = []
      for (let j = 0; j < 3 && i + j < mockReplayContent.length; j++) {
        row.push(`replay-${i + j}`)
      }
      grid.push(row)
    }

    tvNavigation.setGrid(grid)
  }, [])

  const handleReplaySelect = (content: VideoContent) => {
    const params = new URLSearchParams({
      url: content.streamUrl,
      title: content.title,
    })
    router.push(`/player?${params.toString()}`)
  }

  return (
    <CategoryPageLayout title="Replay">
      <div className="grid grid-cols-3 gap-8 max-w-6xl mx-auto">
        {mockReplayContent.map((content, index) => (
          <ContentPoster key={content.id} content={content} onSelect={handleReplaySelect} navId={`replay-${index}`} />
        ))}
      </div>
    </CategoryPageLayout>
  )
}
