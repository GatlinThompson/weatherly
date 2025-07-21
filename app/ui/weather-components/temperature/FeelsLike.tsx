"use client";

import { useWeather } from "../../../context/WeatherContext";
import React, { useEffect, useState } from "react";

const FeelsLike = () => {
  const { weather } = useWeather();
  const [temp, setTemp] = useState<number>(0);
  const [tempFeelsLike, setTempFeelsLike] = useState<number>(0);

  useEffect(() => {
    setTemp(Math.round(weather?.temperature?.apparent ?? 0));
  }, [weather]);

  //animation
  const duration = 500; // 1 second

  useEffect(() => {
    setTempFeelsLike(0);

    const steps = Math.max(5, temp);
    const stepDuration = duration / steps;

    const timer = setInterval(() => {
      setTempFeelsLike((prevTempFeelsLike) => {
        if (prevTempFeelsLike >= temp) {
          clearInterval(timer);
          return temp;
        }
        return Math.round(prevTempFeelsLike + 1);
      });
    }, stepDuration);

    return () => {
      clearInterval(timer);
    };
  }, [temp]);

  return <>{tempFeelsLike}</>;
};

export default FeelsLike;
