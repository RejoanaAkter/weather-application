"use client";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY!;

type City = {
  name: string;
  country: string;
  lat: number;
  lon: number;
};

interface Props {
  onSelectCity: (city: City | null, error: string, type?: "city" | "network") => void;
}

export const SearchWeatherInput = ({ onSelectCity }: Props) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${API_KEY}`
      );

      if (!res.ok) {
        onSelectCity(null, "Network error, please try again.", "network");
        return;
      }

      const data = await res.json();

      if (data.length === 0) {
        onSelectCity(null, "No search result found. Please try again.", "city");
        return;
      }

      const city = {
        name: data[0].name,
        country: data[0].country,
        lat: data[0].lat,
        lon: data[0].lon,
      };

      onSelectCity(city, "");
      setQuery("");
    } catch (err) {
      onSelectCity(null, "Network error, please try again.", "network");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4">
      <div className="flex flex-col sm:flex-row gap-2">
        {/* Input with search icon */}
        <div className="relative flex-1 w-full">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <IoSearch color="#070c1bc7" size={20} />
          </span>

          <input
            type="text"
            placeholder="Search for a place..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2 bg-[#342257] rounded-md border border-gray-700 
              focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-white placeholder-gray-400"
          />
        </div>

        {/* Search button */}
        <button
          className="w-full sm:w-auto bg-blue-600 px-4  rounded-md hover:bg-blue-500 
          transition text-sm text-white h-8 mt-0.5"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
    </div>
  );
};
