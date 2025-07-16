"use client";

import React, { createContext, useContext, useState } from "react";

export type WeatherData = {
  temperature: {
    now: number;
    apparent: number;
    min: number;
    max: number;
  };
  wind: {
    speed: number;
    direction: number;
    gust: number;
  };
  uvIndex: {
    current: number;
    max: number;
    min: number;
    hourly: { time: string; uvIndex: number }[];
  };
  dewPoint: number;
  humidity: number;
  precipitation: number;
  cloudCover: number;
  weatherCode: number;
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
