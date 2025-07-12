"use client";

import { useWeather } from "../../../context/WeatherContext";

const Precipitation = () => {
  const { weather } = useWeather();
  // If precipitation is not available, fallback to 0
  const precipitation = weather?.precipitation ?? 0;
  return <>{precipitation} mm</>;
};

export default Precipitation;
