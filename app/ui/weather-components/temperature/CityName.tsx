"use client";

import { useWeather } from "../../../context/WeatherContext";
import React, { useEffect, useState } from "react";

const CityName = () => {
  const { weather } = useWeather();
  const [city, setCity] = useState<string>("Salt Lake City, Utah, US");

  useEffect(() => {
    setCity(weather?.city ?? "Salt Lake City, Utah, US");
  }, [weather]);

  return <>{city}</>;
};

export default CityName;
