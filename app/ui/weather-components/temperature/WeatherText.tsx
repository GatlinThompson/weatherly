"use client";

import { useEffect, useState } from "react";
import { useWeather } from "../../../context/WeatherContext";
import { weatherCode } from "../../../utils/WeatherCodes";

const WeatherText = () => {
  const [text, setText] = useState<string>("Clear");
  const { weather } = useWeather();

  useEffect(() => {
    const code = weather?.weatherCode?.toString() ?? "1000";
    const description =
      (weatherCode as Record<string, string>)[code] || "Unknown";
    setText(description);
  }, [weather]);

  return <>{text}</>;
};

export default WeatherText;
