"use client";
import { useState } from "react";
import { DisplayCurrentWeather } from "./component/currentWeather";
import { StatisticsWeather } from "./component/statisticsWeather";
import { SearchWeatherInput } from "./component/searchWeather";
import { HourlyForecast } from "./component/hourlyForcast";
import { DisplayForecast } from "./component/dailyForcast";
import { TbSearch } from "react-icons/tb";
import { ErrorMessage } from "./component/errorMessage";


export default function WeatherHome() {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [error, setError] = useState("");
  const [errorType, setErrorType] = useState<"city" | "network" | "">("");

  return (
    <main
      className="min-h-screen bg-gradient-to-br from-[#2C0066] to-[#6B00A2] text-white
     2xl:p-20 xl:p-20 lg:p-14 md:p-6 p-4 font-sans"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-xl font-semibold flex items-center gap-2">
          ☀️ Weather Now
        </h1>
        <button className="bg-[#342257] text-sm px-3 py-1 rounded">
          🌡️ Units ▾
        </button>
      </div>

      <h2 className="text-center text-xl mb-6 text-gray-300">
        How the sky looking today?
      </h2>

      {/* Search */}
      <div className="flex justify-center w-2/3 w-full">
        <SearchWeatherInput
          onSelectCity={(city, errorMsg, type) => {
            if (!city) {
              setError(errorMsg);
              setErrorType(type || "city");
              setCoords(null);
            } else {
              setCoords({ lat: city.lat, lon: city.lon });
              setError("");
              setErrorType("");
            }
          }}
        />
      </div>


      {error && !coords && <ErrorMessage type={errorType as "city" | "network"} message={error} />}

      {!error && coords && (
        <div className="grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 grid-cols-1 gap-4 w-full">
          {/* Left column */}
          <div className="col-span-2 w-full flex flex-col gap-4">
            <DisplayCurrentWeather coords={coords} />
            <StatisticsWeather coords={coords} />
            <DisplayForecast coords={coords} />
          </div>

          {/* Right column */}
          <div className="col-span-1 w-full h-full">
            <HourlyForecast coords={coords} />
          </div>
        </div>
      )}

      {/* Placeholder when no coords & no error */}
      {!error && !coords && (
        <div className="text-gray-400 mt-16">
          <div className="flex justify-center items-center">
            <TbSearch size={30} color="#110404ff" />
          </div>
          <div className="flex justify-center items-center mt-2">
            Search for a city to see the weather information.
          </div>
        </div>
      )}
    </main>
  );
}
