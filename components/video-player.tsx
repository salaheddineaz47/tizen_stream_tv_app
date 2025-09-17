"use client"

import { useEffect, useRef, useState } from "react"
import { useTVNavigation } from "@/hooks/use-tv-navigation"
import { tvNavigation } from "@/lib/navigation"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Maximize, ArrowLeft } from "lucide-react"

interface VideoPlayerProps {
  streamUrl: string
  title: string
  onBack: () => void
}

export function VideoPlayer({ streamUrl, title, onBack }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [hlsInstance, setHlsInstance] = useState<any>(null)

  // Control refs for navigation
  const backRef = useTVNavigation({
    id: "back-btn",
    onSelect: onBack,
    autoFocus: true,
  })

  const playPauseRef = useTVNavigation({
    id: "play-pause-btn",
    onSelect: togglePlayPause,
  })

  const rewindRef = useTVNavigation({
    id: "rewind-btn",
    onSelect: () => seekRelative(-10),
  })

  const forwardRef = useTVNavigation({
    id: "forward-btn",
    onSelect: () => seekRelative(10),
  })

  const muteRef = useTVNavigation({
    id: "mute-btn",
    onSelect: toggleMute,
  })

  const fullscreenRef = useTVNavigation({
    id: "fullscreen-btn",
    onSelect: toggleFullscreen,
  })

  useEffect(() => {
    // Set up navigation grid for player controls
    tvNavigation.setGrid([["back-btn", "play-pause-btn", "rewind-btn", "forward-btn", "mute-btn", "fullscreen-btn"]])

    // Auto-hide controls after 3 seconds
    const hideControlsTimer = setTimeout(() => {
      setShowControls(false)
    }, 3000)

    // Show controls on any key press
    const showControlsOnKey = () => {
      setShowControls(true)
      clearTimeout(hideControlsTimer)
      setTimeout(() => setShowControls(false), 3000)
    }

    document.addEventListener("keydown", showControlsOnKey)

    return () => {
      clearTimeout(hideControlsTimer)
      document.removeEventListener("keydown", showControlsOnKey)
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Initialize HLS.js for .m3u8 streams
    const initializeHLS = async () => {
      if (streamUrl.includes(".m3u8")) {
        try {
          const Hls = (await import("hls.js")).default
          if (Hls.isSupported()) {
            const hls = new Hls({
              enableWorker: true,
              lowLatencyMode: true,
            })
            hls.loadSource(streamUrl)
            hls.attachMedia(video)
            setHlsInstance(hls)

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
              console.log("HLS manifest loaded")
            })

            hls.on(Hls.Events.ERROR, (event, data) => {
              console.error("HLS error:", data)
            })
          } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            // Native HLS support (Safari)
            video.src = streamUrl
          }
        } catch (error) {
          console.error("Failed to load HLS.js:", error)
          video.src = streamUrl // Fallback to native video
        }
      } else {
        video.src = streamUrl
      }
    }

    initializeHLS()

    // Video event listeners
    const handleTimeUpdate = () => setCurrentTime(video.currentTime)
    const handleDurationChange = () => setDuration(video.duration)
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("durationchange", handleDurationChange)
    video.addEventListener("play", handlePlay)
    video.addEventListener("pause", handlePause)

    return () => {
      if (hlsInstance) {
        hlsInstance.destroy()
      }
      video.removeEventListener("timeupdate", handleTimeUpdate)
      video.removeEventListener("durationchange", handleDurationChange)
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("pause", handlePause)
    }
  }, [streamUrl, hlsInstance])

  function togglePlayPause() {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
  }

  function seekRelative(seconds: number) {
    const video = videoRef.current
    if (!video) return

    video.currentTime = Math.max(0, Math.min(video.duration, video.currentTime + seconds))
  }

  function toggleMute() {
    const video = videoRef.current
    if (!video) return

    video.muted = !video.muted
    setIsMuted(video.muted)
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  function formatTime(time: number): string {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = Math.floor(time % 60)

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    }
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Video Element */}
      <video ref={videoRef} className="w-full h-full object-contain" playsInline preload="metadata" />

      {/* Controls Overlay */}
      {showControls && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40">
          {/* Top Bar */}
          <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between">
            <button
              ref={backRef}
              className="flex items-center gap-3 text-white hover:text-primary transition-colors focus:text-primary focus:scale-110"
              tabIndex={-1}
            >
              <ArrowLeft className="w-6 h-6" />
              <span className="text-lg font-medium">Back</span>
            </button>
            <h1 className="text-xl font-semibold text-white text-center flex-1 mx-8 truncate">{title}</h1>
            <div className="w-20" /> {/* Spacer for centering */}
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center gap-4 text-white text-sm mb-2">
                <span>{formatTime(currentTime)}</span>
                <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-200"
                    style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                  />
                </div>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-center gap-8">
              <button
                ref={rewindRef}
                className="text-white hover:text-primary transition-colors focus:text-primary focus:scale-110"
                tabIndex={-1}
              >
                <SkipBack className="w-8 h-8" />
              </button>

              <button
                ref={playPauseRef}
                className="text-white hover:text-primary transition-colors focus:text-primary focus:scale-110"
                tabIndex={-1}
              >
                {isPlaying ? <Pause className="w-12 h-12" /> : <Play className="w-12 h-12" />}
              </button>

              <button
                ref={forwardRef}
                className="text-white hover:text-primary transition-colors focus:text-primary focus:scale-110"
                tabIndex={-1}
              >
                <SkipForward className="w-8 h-8" />
              </button>

              <button
                ref={muteRef}
                className="text-white hover:text-primary transition-colors focus:text-primary focus:scale-110"
                tabIndex={-1}
              >
                {isMuted ? <VolumeX className="w-8 h-8" /> : <Volume2 className="w-8 h-8" />}
              </button>

              <button
                ref={fullscreenRef}
                className="text-white hover:text-primary transition-colors focus:text-primary focus:scale-110"
                tabIndex={-1}
              >
                <Maximize className="w-8 h-8" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Indicator */}
      {!duration && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      )}
    </div>
  )
}
