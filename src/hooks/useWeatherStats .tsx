"use client";
import { useState, useEffect } from "react";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY!;
const BASE_URL = process.env.NEXT_PUBLIC_WEATHER_API_URL!;


interface WeatherStats {
  feelsLike: number;
  humidity: number;
  wind: number; // km/h
  precipitation: number; // mm in last hour
}

export const useWeatherStats = (lat: number | null, lon: number | null) => {
  const [stats, setStats] = useState<WeatherStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!lat || !lon) {
      setStats(null);
      setError(null);
      setLoading(false);
      return;
    }

    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );

        if (!res.ok) throw new Error("Failed to fetch weather stats");

        const data = await res.json();

        setStats({
          feelsLike: Math.round(data.main.feels_like),
          humidity: data.main.humidity,
          wind: Math.round(data.wind.speed * 3.6), // m/s → km/h
          precipitation: data.rain?.["1h"] || data.snow?.["1h"] || 0,
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [lat, lon]);

  return { stats, loading, error };
};
