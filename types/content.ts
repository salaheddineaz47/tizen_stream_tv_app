export interface VideoContent {
  id: string
  title: string
  description?: string
  thumbnail: string
  duration?: string
  genre?: string
  year?: number
  rating?: string
  streamUrl: string
}

export interface TVChannel {
  id: string
  name: string
  logo: string
  genre: string
  streamUrl: string
  isLive: boolean
}

export interface ContentCategory {
  id: string
  name: string
  items: VideoContent[]
}
