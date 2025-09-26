"use client";

import { useDailyForecastHook } from "@/hooks/useDailyForecast";
import Image from "next/image";

interface ForecastItem {
  day: string;
  icon: string;
  maxTemp: string | number;
  minTemp: string | number;
}

interface Props {
  coords: { lat: number; lon: number } | null;
}

interface LoadingProps {
  forecast: ForecastItem[];
}

export const DisplayForecast = ({ coords }: Props) => {
  const { forecast, loading, error } = useDailyForecastHook(
    coords?.lat ?? null,
    coords?.lon ?? null
  );

  if (!coords) return <div className="text-gray-400">Search for a city...</div>;
  if (loading)
    return (
      <div className="text-gray-400">
        <DailyForecastLoading forecast={forecast} />
      </div>
    );
  if (error) return <div className="text-red-400">Error: {error}</div>;

  return (
    <div className="mt-6 w-full">
      <p className="text-gray-200 mb-2">Daily Forecast</p>
      <div className="grid 2xl:grid-cols-7 xl:grid-cols-7 lg:grid-cols-5 md:grid-cols-5 grid-cols-2 w-full gap-2 text-center">
        {forecast.map((foreCastItem, idx) => (
          <div key={idx} className="col-span-1 bg-[#36235A] p-4 rounded-lg">
            <p className="text-sm text-gray-300">{foreCastItem?.day}</p>
            <div className="flex justify-center">
              <Image
                src={`https://openweathermap.org/img/wn/${foreCastItem?.icon}@2x.png`}
                alt={foreCastItem.day}
                width={48}
                height={48}
                className="h-6 w-6"
              />
            </div>
            <p className="text-sm mt-4">{foreCastItem?.maxTemp}</p>
            <p className="text-[12px] text-gray-400">{foreCastItem?.minTemp}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const DailyForecastLoading = ({ forecast }: LoadingProps) => {
  return (
    <div className="mt-6 w-full">
      <p className="text-gray-200 mb-2">Daily Forecast</p>
      <div className="grid 2xl:grid-cols-7 xl:grid-cols-7 lg:grid-cols-5 md:grid-cols-5 grid-cols-2 w-full gap-2 text-center">
        {forecast.map((_, idx) => (
          <div
            key={idx}
            className="col-span-1 bg-[#36235A] p-4 rounded-lg h-[20vh]"
          ></div>
        ))}
      </div>
    </div>
  );
};
