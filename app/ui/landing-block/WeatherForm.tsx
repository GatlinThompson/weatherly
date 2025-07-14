"use client";

import React, { useEffect, useState, useRef } from "react";
import { useWeather } from "../../context/WeatherContext";
import { MapPinIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface CityOption {
  name: string;
  country: string;
  state?: string;
  lat?: number;
  lon?: number;
}

const WeatherForm = () => {
  const [city, setCity] = useState("Salt Lake City, Utah, US");
  const [suggestions, setSuggestions] = useState<CityOption[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { setWeather } = useWeather();

  useEffect(() => {
    // On mount, get lat/lon for Salt Lake City and call weather backend
    const fetchLatLonAndWeather = async () => {
      try {
        const geoRes = await fetch(
          `/api/cities?query=Salt%20Lake%20City%2C%20Utah%2C%20US`
        );
        if (!geoRes.ok) throw new Error("Failed to get lat/lon");
        const geoDataArr = await geoRes.json();

        console.log(geoDataArr);
        if (!geoDataArr || geoDataArr.length === 0)
          throw new Error("No lat/lon found");
        const geoData = geoDataArr[0];
        await getWeather({
          name: "Salt Lake City, Utah, US",
          country: geoData.country ?? "",
          state: geoData.state ?? "",
          lat: geoData.lat,
          lon: geoData.lon,
        });
      } catch (err) {
        console.error("Error getting lat/lon for Salt Lake City:", err);
      }
    };
    fetchLatLonAndWeather();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  const searchCities = async (query: string): Promise<void> => {
    if (query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `/api/cities?query=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} asd`);
      }

      const data = await response.json();

      console.log(data);

      const cityOptions: CityOption[] = data.map(
        (item: {
          name: string;
          country: string;
          state: string;
          lat: number;
          lon: number;
        }) => ({
          name: item.name,
          country: item.country,
          state: item.state,
          lat: item.lat,
          lon: item.lon,
        })
      );

      setSuggestions(cityOptions);
      setShowSuggestions(cityOptions.length > 0);
    } catch (error) {
      console.error("Error searching cities:", error);
      setSuggestions([]);
      setShowSuggestions(false);
    } finally {
      setIsSearching(false);
    }
  };

  const debouncedSearch = (query: string): void => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      searchCities(query);
    }, 300);
  };

  const getWeather = async (inputCity: CityOption): Promise<void> => {
    try {
      const response = await fetch(
        "/api/weather?lat=" +
          encodeURIComponent(inputCity.lat ?? "") +
          "&lon=" +
          encodeURIComponent(inputCity.lon ?? "")
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const weatherData = await response.json();

      if (weatherData.cod === "404") {
        console.warn(`City not found: ${inputCity}`);
        setWeather(null);
        return;
      }

      console.log(weatherData);

      if (!weatherData) {
        throw new Error("Invalid weather data received");
      }

      const uvIndexData = weatherData.forecast.hourly.map(
        (item: { time: string; values: { uvIndex: number } }) => ({
          time: new Date(item.time),
          uvIndex: item.values.uvIndex,
        })
      );

      const today = weatherData.current;

      console.log(weatherData.current);

      setWeather(weatherData.current);
    } catch (error) {
      console.error("Error fetching weather:", error);
      // Could add user-facing error handling here
      setWeather(null);
    }
  };

  const handleCitySelect = (selectedCity: CityOption): void => {
    const cityName = selectedCity.state
      ? `${selectedCity.name}, ${selectedCity.state}, ${selectedCity.country}`
      : `${selectedCity.name}, ${selectedCity.country}`;

    setCity(cityName);
    setShowSuggestions(false);
    setSuggestions([]);
    getWeather(selectedCity);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setCity(value);
    debouncedSearch(value);
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setShowSuggestions(false);
    // Try to find lat/lon for the current city string
    try {
      const geoRes = await fetch(
        `/api/cities?query=${encodeURIComponent(city)}`
      );
      if (!geoRes.ok) throw new Error("Failed to get lat/lon");
      const geoDataArr = await geoRes.json();
      if (!geoDataArr || geoDataArr.length === 0)
        throw new Error("No lat/lon found");
      const geoData = geoDataArr[0];
      await getWeather({
        name: city,
        country: geoData.country ?? "",
        state: geoData.state ?? "",
        lat: geoData.lat,
        lon: geoData.lon,
      });
    } catch (err) {
      console.error("Error getting lat/lon for city:", err);
    }
  };

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit}
        className="flex flex-row gap-4 w-full lg:w-1/2 md:w-3/4 mx-auto"
      >
        <div className="flex flex-row gap-2 bg-foreground rounded-xl text-primary p-4 shadow-lg flex-1 w-full">
          <MapPinIcon className="h-6 w-6 text-primary md:h-8 md:w-8" />
          <input
            type="text"
            name="city"
            placeholder="City..."
            aria-label="City"
            value={city}
            className="text-xl outline-none flex-grow md:text-2xl bg-transparent"
            onChange={handleInputChange}
            onFocus={() =>
              city.length >= 2 &&
              suggestions.length > 0 &&
              setShowSuggestions(true)
            }
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
          {isSearching && (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          )}
          <button type="submit" className="text-primary" aria-label="Search">
            <ChevronRightIcon className="h-6 w-6 text-primary md:h-8 md:w-8" />
          </button>
        </div>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <div
              key={`${suggestion.name}-${suggestion.country}-${index}`}
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
              onClick={() => handleCitySelect(suggestion)}
            >
              <div className="flex items-center gap-2">
                <MapPinIcon className="h-4 w-4 text-gray-500" />
                <div>
                  <div className="font-medium text-gray-900">
                    {suggestion.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {suggestion.state ? `${suggestion.state}, ` : ""}
                    {suggestion.country}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherForm;
