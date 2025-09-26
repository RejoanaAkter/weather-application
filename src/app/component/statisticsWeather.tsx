"use client";

import { useWeatherStats } from "@/hooks/useWeatherStats ";

interface Props {
  coords: { lat: number; lon: number } | null;
}

export const StatisticsWeather = ({ coords }: Props) => {
  const { stats, loading, error } = useWeatherStats(
    coords?.lat ?? null,
    coords?.lon ?? null
  );

  if (!coords) return <div className="text-gray-400">Search for a city...</div>;
  if (loading) return <div className="text-gray-400"><StatisticsLoading /></div>;
  if (error) return <div className="text-red-400">Error: {error}</div>;
  if (!stats) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-start mt-6">
      <div className="bg-[#3A235E] p-3 rounded-lg">
        <p className="text-sm text-gray-300">Feels Like</p>
        <p className="text-lg">{stats.feelsLike}°</p>
      </div>
      <div className="bg-[#3A235E] p-4 rounded-lg">
        <p className="text-sm text-gray-300">Humidity</p>
        <p className="text-lg">{stats.humidity}%</p>
      </div>
      <div className="bg-[#3A235E] p-4 rounded-lg">
        <p className="text-sm text-gray-300">Wind</p>
        <p className="text-lg">{stats.wind} km/h</p>
      </div>
      <div className="bg-[#3A235E] p-4 rounded-lg">
        <p className="text-sm text-gray-300">Precipitation</p>
        <p className="text-lg">{stats.precipitation} mm</p>
      </div>
    </div>
  );
};

const StatisticsLoading = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-start mt-6">
      <div className="bg-[#3A235E] p-3 rounded-lg">
        <p className="text-sm text-gray-300">Feels Like</p>
        <p className="text-lg">--</p>
      </div>
      <div className="bg-[#3A235E] p-4 rounded-lg">
        <p className="text-sm text-gray-300">Humidity</p>
        <p className="text-lg">--</p>
      </div>
      <div className="bg-[#3A235E] p-4 rounded-lg">
        <p className="text-sm text-gray-300">Wind</p>
        <p className="text-lg">--</p>
      </div>
      <div className="bg-[#3A235E] p-4 rounded-lg">
        <p className="text-sm text-gray-300">Precipitation</p>
        <p className="text-lg">--</p>
      </div>
    </div>
  );
};
