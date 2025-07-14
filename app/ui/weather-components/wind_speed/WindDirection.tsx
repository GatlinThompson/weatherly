"use client";

import { useWeather } from "../../../context/WeatherContext";
import React, { useEffect, useState } from "react";

const WindDirection = () => {
  const { weather } = useWeather();
  const [compassDirection, setCompassDirection] = useState<string>("N");

  // Function to convert degrees to compass direction
  const degreesToCompass = (degrees: number): string => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

    // Normalize degrees to 0-360 range
    const normalizedDegrees = ((degrees % 360) + 360) % 360;

    // Each direction covers 45 degrees (360/8)
    const index = Math.round(normalizedDegrees / 45) % 8;

    return directions[index];
  };

  useEffect(() => {
    const degrees = Math.round(weather?.wind.direction ?? 0);
    setCompassDirection(degreesToCompass(degrees));
  }, [weather]);

  return <>{compassDirection}</>;
};

export default WindDirection;
