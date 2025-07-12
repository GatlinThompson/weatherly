"use client";

import React, { createContext, useContext, useState } from "react";

export type WeatherData = {
  DewPoint: number;
  temperature: number;
  windSpeed: number;
  windDirection: number;
  windGust: number;
  humidity: number;
  weather: number;
  maxTemp: number;
  minTemp: number;
  feelsLike: number;
  precipitation?: number;
  cloudCover?: number;
};

interface WeatherContextType {
  weather: WeatherData | null;
  setWeather: (data: WeatherData | null) => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  return (
    <WeatherContext.Provider value={{ weather, setWeather }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};
