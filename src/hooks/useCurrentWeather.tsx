// hooks/useWeatherByCoords.ts
import { useState, useEffect } from "react";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY!;
const BASE_URL = process.env.NEXT_PUBLIC_WEATHER_API_URL!;

export const useCurrentWeather = (lat: number | null, lon: number | null) => {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (lat === null || lon === null) return;

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        if (!res.ok) throw new Error("Failed to fetch weather");
        const data = await res.json();
        setWeather(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [lat, lon]);

  return { weather, loading, error };
};
