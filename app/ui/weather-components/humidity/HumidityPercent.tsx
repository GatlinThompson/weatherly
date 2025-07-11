"use client";

import { useWeather } from "../../../context/WeatherContext";

const HumidityPercent = () => {
  const { weather } = useWeather();

  return <>{weather?.humidity ?? 0}%</>;
};

export default HumidityPercent;
