"use client";
import { useState, useEffect } from "react";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY!;
const BASE_URL = process.env.NEXT_PUBLIC_WEATHER_API_URL!;

export interface DailyForecast {
  day: string;
  maxTemp: string;
  minTemp: string;
  icon: string;
}

export const useDailyForecastHook = (lat: number | null, lon: number | null) => {
  const [forecast, setForecast] = useState<DailyForecast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!lat || !lon) {
      setForecast([]);
      setLoading(false);
      setError(null);
      return;
    }

    const fetchForecast = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );

        if (!res.ok) throw new Error("Failed to fetch forecast");

        const data = await res.json();
        if (!data.list) throw new Error("Invalid forecast response");

        const grouped: Record<string, { temps: number[]; icons: string[] }> = {};

        data.list.forEach((item: any) => {
          const date = item.dt_txt.split(" ")[0];
          if (!grouped[date]) grouped[date] = { temps: [], icons: [] };
          grouped[date].temps.push(item.main.temp);
          grouped[date].icons.push(item.weather[0].icon);
        });

        // Map daily min/max and icon
        const days = Object.entries(grouped).map(([date, { temps, icons }]) => {
          const d = new Date(date);
          const day = d.toLocaleDateString("en-US", { weekday: "short" });
          const icon = icons[Math.floor(icons.length / 2)];
          return {
            day,
            maxTemp: `${Math.round(Math.max(...temps))}°`,
            minTemp: `${Math.round(Math.min(...temps))}°`,
            icon,
          };
        });

        // Ensure 7 days (repeat last day if needed)
        while (days.length < 7) {
          const last = days[days.length - 1];
          const nextDay = new Date(new Date().getTime() + (days.length * 24 * 60 * 60 * 1000));
          days.push({
            day: nextDay.toLocaleDateString("en-US", { weekday: "short" }),
            maxTemp: last.maxTemp,
            minTemp: last.minTemp,
            icon: last.icon,
          });
        }

        setForecast(days.slice(0, 8));
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [lat, lon]);

  return { forecast, loading, error };
};
