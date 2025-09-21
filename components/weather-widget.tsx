"use client";

import { useState, useEffect } from "react";
import { Sun, Cloud, CloudRain } from "lucide-react";

interface WeatherData {
  location: string;
  temperature: number;
  condition: "sunny" | "cloudy" | "rainy";
  date: string;
  time: string;
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData>({
    location: "Loading...",
    temperature: 0,
    condition: "sunny",
    date: "",
    time: "",
  });

  // Get date + time every minute
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
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
      }));
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Get location + weather once on mount
  useEffect(() => {
    async function fetchWeather() {
      try {
        // Get user's approximate location using free IP API
        const locRes = await fetch("https://ipapi.co/json/");
        const locData = await locRes.json();
        const city = locData.city;
        const country = locData.country_name;

        // Fetch weather (using Open-Meteo free API - no key required)
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${locData.latitude}&longitude=${locData.longitude}&current_weather=true`
        );
        const weatherJson = await weatherRes.json();

        const temp = Math.round(weatherJson.current_weather.temperature);
        const weatherCode = weatherJson.current_weather.weathercode;

        let condition: WeatherData["condition"] = "sunny";
        if ([1, 2, 3].includes(weatherCode)) condition = "cloudy";
        if ([51, 61, 63, 65, 80, 81, 82].includes(weatherCode))
          condition = "rainy";

        setWeather((prev) => ({
          ...prev,
          location: `${city}, ${country}`,
          temperature: temp,
          condition,
        }));
      } catch (err) {
        console.error("Failed to fetch location/weather", err);
        setWeather((prev) => ({
          ...prev,
          location: "Unknown Location",
          temperature: 22,
          condition: "sunny",
        }));
      }
    }

    fetchWeather();
  }, []);

  const WeatherIcon = () => {
    switch (weather.condition) {
      case "sunny":
        return <Sun className="w-8 h-8 text-yellow-400" />;
      case "cloudy":
        return <Cloud className="w-8 h-8 text-gray-300" />;
      case "rainy":
        return <CloudRain className="w-8 h-8 text-blue-400" />;
      default:
        return <Sun className="w-8 h-8 text-yellow-400" />;
    }
  };

  return (
    <div className="glassmorphism rounded-2xl p-6 min-w-[320px]">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-foreground">
            {weather.location}
          </h3>
          <p className="text-muted-foreground text-sm">{weather.date}</p>
          <p className="text-2xl font-bold text-foreground mt-1">
            {weather.time}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <WeatherIcon />
          <span className="text-3xl font-bold text-foreground">
            {weather.temperature}°
          </span>
        </div>
      </div>
    </div>
  );
}
