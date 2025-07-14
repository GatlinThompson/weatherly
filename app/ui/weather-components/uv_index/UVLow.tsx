"use client";

import { useEffect, useState } from "react";
import { useWeather } from "../../../context/WeatherContext";

const UVLow = () => {
  const { weather } = useWeather();
  const [uvLow, setUVLow] = useState<number>(0);
  const [tempUVLow, setTempUVLow] = useState<number>(0);

  useEffect(() => {
    setUVLow(weather?.uvIndex?.min ?? 0);
  }, [weather]);

  //animation
  const duration = 500; // 1 second
  const maxSteps = 5; // minimum number of steps for smooth animation

  useEffect(() => {
    setTempUVLow(0);
    const steps = Math.max(maxSteps, uvLow);
    const stepDuration = duration / steps;

    const timer = setInterval(() => {
      setTempUVLow((prevTempUVLow) => {
        if (prevTempUVLow >= uvLow) {
          clearInterval(timer);
          return uvLow;
        }
        return Math.round(prevTempUVLow + 1);
      });
    }, stepDuration);

    return () => {
      clearInterval(timer);
    };
  }, [uvLow]);

  return <>{tempUVLow}</>;
};

export default UVLow;
