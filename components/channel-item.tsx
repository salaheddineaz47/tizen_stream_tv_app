"use client"

import { useTVNavigation } from "@/hooks/use-tv-navigation"
import type { TVChannel } from "@/types/content"
import { Radio } from "lucide-react"

interface ChannelItemProps {
  channel: TVChannel
  onSelect: (channel: TVChannel) => void
  navId: string
  isSelected?: boolean
}

export function ChannelItem({ channel, onSelect, navId, isSelected = false }: ChannelItemProps) {
  const elementRef = useTVNavigation({
    id: navId,
    onSelect: () => onSelect(channel),
  })

  return (
    <div
      ref={elementRef}
      className={`
        relative flex items-center gap-6 p-6 rounded-xl transition-all duration-300 cursor-pointer
        glassmorphism hover:bg-primary/20 focus:bg-primary/20 focus:ring-4 focus:ring-primary/50
        ${isSelected ? "bg-primary/30 ring-2 ring-primary" : ""}
      `}
      tabIndex={-1}
    >
      {/* Channel Logo */}
      <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
        <img src={channel.logo || "/placeholder.svg"} alt={channel.name} className="w-full h-full object-contain" />
      </div>

      {/* Channel Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-xl font-semibold text-foreground truncate">{channel.name}</h3>
          {channel.isLive && (
            <div className="flex items-center gap-1 px-2 py-1 bg-red-500 text-white text-xs rounded-full">
              <Radio className="w-3 h-3" />
              <span>LIVE</span>
            </div>
          )}
        </div>
        <p className="text-muted-foreground text-sm">{channel.genre}</p>
      </div>

      {/* Selection Indicator */}
      <div className="w-8 h-8 rounded-full border-2 border-primary/50 flex items-center justify-center">
        {isSelected && <div className="w-4 h-4 rounded-full bg-primary"></div>}
      </div>
    </div>
  )
}
