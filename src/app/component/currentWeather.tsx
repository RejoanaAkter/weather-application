"use client";

import { useCurrentWeather } from "@/hooks/useCurrentWeather";
import { FaMapPin } from "react-icons/fa";
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";

interface DisplayWeatherProps {
  coords: {
    lat: number;
    lon: number;
  } | null;
}

const getWeatherIcon = (weatherMain: string) => {
  switch (weatherMain.toLowerCase()) {
    case "clear":
      return <WiDaySunny className="text-yellow-300 text-3xl" />;
    case "clouds":
      return <WiCloudy className="text-gray-300 text-3xl" />;
    case "rain":
      return <WiRain className="text-blue-400 text-3xl" />;
    case "snow":
      return <WiSnow className="text-white text-3xl" />;
    case "thunderstorm":
      return <WiThunderstorm className="text-yellow-500 text-3xl" />;
    default:
      return <WiDaySunny className="text-yellow-300 text-3xl" />;
  }
};

export const DisplayCurrentWeather = ({ coords }: DisplayWeatherProps) => {
  const { weather, loading, error } = useCurrentWeather(
    coords?.lat ?? null,
    coords?.lon ?? null
  );

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  if (!coords) {
    return (
      <div className="text-gray-400 mt-8">
        Search for a city to see the weather.
      </div>
    );
  }

  if (loading) {
    return (
        <div className="h-[35vh] relative bg-[#3A235E] p-6 rounded-2xl w-full  shadow-lg mt-6 text-gray-200 flex justify-center items-center">Loading...</div>
    );
  }

  if (error) {
    return <div className="text-red-400 mt-8">Error: {error}</div>;
  }

  if (!weather) return null;

  return (
    <div className="relative bg-gradient-to-br from-[#3B0D99] to-[#8145C7] p-6 rounded-2xl w-full  shadow-lg mt-6 text-gray-200">

      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">
            {weather.name}, {weather.sys.country}
          </h3>
          <p className="text-sm text-gray-300">{formattedDate}</p>
        </div>
        <div className=" text-red-400 text-sm">
          <FaMapPin size={20} />
        </div>
      </div>
      <div className="mt-6">{getWeatherIcon(weather.weather[0].main)}</div>

      <div className="text-4xl flex justify-end">
        {Math.round(weather.main.temp)}°
      </div>
    </div>
  );
};
