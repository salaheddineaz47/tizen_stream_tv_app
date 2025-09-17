"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CategoryPageLayout } from "@/components/category-page-layout";
import { ChannelItem } from "@/components/channel-item";
import { tvNavigation } from "@/lib/navigation";
import { mockTVChannels } from "@/lib/mock-data";
import type { TVChannel } from "@/types/content";

export default function LiveTVPage() {
  const router = useRouter();
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(
    null
  );

  useEffect(() => {
    // Create navigation grid for channels (single column)
    const grid = [];
    grid.push(["back-button"]); // Header row

    // Channel rows (one channel per row)
    mockTVChannels.forEach((_, index) => {
      grid.push([`channel-${index}`]);
    });

    tvNavigation.setGrid(grid);
  }, []);

  const handleChannelSelect = (channel: TVChannel) => {
    setSelectedChannelId(channel.id);

    // Navigate to player after a short delay to show selection
    setTimeout(() => {
      const params = new URLSearchParams({
        url: channel.streamUrl,
        title: `${channel.name} - Live TV`,
      });
      router.push(`/player?${params.toString()}`);
    }, 300);
  };

  return (
    <CategoryPageLayout title="Live TV">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="mb-8">
          <p className="text-muted-foreground text-lg">
            Select a channel to start watching live television
          </p>
        </div>

        <div className="space-y-3">
          {mockTVChannels.map((channel, index) => (
            <ChannelItem
              key={channel.id}
              channel={channel}
              onSelect={handleChannelSelect}
              navId={`channel-${index}`}
              isSelected={selectedChannelId === channel.id}
            />
          ))}
        </div>
      </div>
    </CategoryPageLayout>
  );
}
