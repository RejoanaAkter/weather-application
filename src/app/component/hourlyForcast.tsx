"use client";

import { useState } from "react";
import { useHourlyForecasts } from "@/hooks/useHourlyForecast";

interface Props {
  coords: { lat: number; lon: number } | null;
}

export const HourlyForecast = ({ coords }: Props) => {
  const { forecast, loading, error } = useHourlyForecasts(
    coords?.lat ?? null,
    coords?.lon ?? null
  );

  const today = new Date();
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i);
    return d.toLocaleDateString("en-US", { weekday: "long" });
  });

  const [selectedDay, setSelectedDay] = useState(days[0]);

  if (!coords) return <div className="text-gray-400">Search for a city...</div>;
  if (loading)
    return (
      <div className="text-gray-400">
        <HourForecastLoading forecast={forecast} />
      </div>
    );
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!forecast || forecast.length === 0)
    return <div className="text-gray-400">No forecast available.</div>;

  return (
    <div className="bg-[#38225B] rounded-2xl shadow-md p-4 w-full mt-6 h-full">
      <div className="flex justify-between text-sm">
        <p className="text-white mb-2">Hourly Forecast</p>
        <select
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
          className="bg-gray-700 rounded-md w-28 h-7 text-center text-white text-sm border border-gray-600 focus:outline-none focus:ring-0 focus:border-gray-500 cursor-pointer"
        >
          {days.map((day) => (
            <option
              key={day}
              value={day}
              className="bg-gray-700 text-white hover:bg-gray-600"
            >
              {day}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        {forecast.map((hour, hIx) => (
          <div
            key={hour.dt}
            className={`grid grid-cols-4 p-2 ${
              forecast?.length - 1 !== hIx && "border-b border-gray-700"
            }`}
          >
            <div className="col-span-3">
              <div className="flex gap-4">
                <img
                  src={`https://openweathermap.org/img/wn/${hour.icon}@2x.png`}
                  alt={hour.description}
                  className="w-6 h-6 "
                />

                <p className="text-xs text-gray-300">
                  {new Date(hour.dt_txt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
            <div className="col-span-1 text-gray-300">
              <p className="text-xs">{Math.round(hour.temp)}°C</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const HourForecastLoading = ({ forecast }) => {
  return (
    <>
      <div className="bg-[#38225B] rounded-2xl shadow-md p-4 w-full mt-6 h-full">
        <div className="flex justify-between text-sm">
          <p className="text-white mb-2">Hourly Forecast</p>
          <p className="bg-gray-700 rounded w-28 h-6 text-center ">-</p>
        </div>

        <div className="mt-4">
          {forecast.map((hour, hIx) => (
            <div
              key={hour.dt}
              className={`h-8 bg-gray-600 rounded-md grid grid-cols-4 p-2 my-4 ${
                forecast?.length - 1 !== hIx && "border-b border-gray-700"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
};
