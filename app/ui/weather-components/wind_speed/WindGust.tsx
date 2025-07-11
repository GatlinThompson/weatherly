"use client";

import { useWeather } from "../../../context/WeatherContext";
import React, { useEffect, useState } from "react";

const WindGust = () => {
  const { weather } = useWeather();
  const [windGust, setWindGust] = useState<number>(0);

  useEffect(() => {
    setWindGust(Math.round(weather?.windGust ?? 0));
  }, [weather]);

  return <>{windGust}</>;
};

export default WindGust;
