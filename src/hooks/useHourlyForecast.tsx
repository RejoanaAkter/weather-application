"use client";
import { useState, useEffect } from "react";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY!;
const BASE_URL = process.env.NEXT_PUBLIC_WEATHER_API_URL!;

export interface HourlyForecast {
  dt: number;
  dt_txt: string;
  temp: number;
  icon: string;
  description: string;
}

export const useHourlyForecasts = (lat: number | null, lon: number | null) => {
  const [forecast, setForecast] = useState<HourlyForecast[]>([]);
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

        const hourly: HourlyForecast[] = data.list.slice(0, 8).map((item: any) => ({
          dt: item.dt,
          dt_txt: item.dt_txt,
          temp: item.main.temp,
          icon: item.weather?.[0]?.icon ?? "01d",
          description: item.weather?.[0]?.description ?? "Clear",
        }));

        setForecast(hourly);
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
