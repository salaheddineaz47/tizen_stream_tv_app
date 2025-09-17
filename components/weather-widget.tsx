"use client"

import { useState, useEffect } from "react"
import { Sun, Cloud, CloudRain } from "lucide-react"

interface WeatherData {
  location: string
  temperature: number
  condition: "sunny" | "cloudy" | "rainy"
  date: string
  time: string
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData>({
    location: "Giza, Egypt",
    temperature: 22,
    condition: "sunny",
    date: "Mon. 03 Feb 2025",
    time: "03:41 PM",
  })

  useEffect(() => {
    // Update time every minute
    const interval = setInterval(() => {
      const now = new Date()
      setWeather((prev) => ({
        ...prev,
        time: now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        date: now.toLocaleDateString("en-US", {
          weekday: "short",
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      }))
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  const WeatherIcon = () => {
    switch (weather.condition) {
      case "sunny":
        return <Sun className="w-8 h-8 text-yellow-400" />
      case "cloudy":
        return <Cloud className="w-8 h-8 text-gray-300" />
      case "rainy":
        return <CloudRain className="w-8 h-8 text-blue-400" />
      default:
        return <Sun className="w-8 h-8 text-yellow-400" />
    }
  }

  return (
    <div className="glassmorphism rounded-2xl p-6 min-w-[300px]">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-foreground">{weather.location}</h3>
          <p className="text-muted-foreground text-sm">{weather.date}</p>
          <p className="text-2xl font-bold text-foreground mt-1">{weather.time}</p>
        </div>
        <div className="flex items-center gap-3">
          <WeatherIcon />
          <span className="text-3xl font-bold text-foreground">{weather.temperature}°</span>
        </div>
      </div>
    </div>
  )
}
