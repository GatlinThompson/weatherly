"use client";

import React, { useEffect, useState } from "react";
import { useWeather } from "../../../context/WeatherContext";

const WindMPH = () => {
  const [tempWind, setTempWind] = useState<number>(0);
  const { weather } = useWeather();
  const [windSpeed, setWindSpeed] = useState<number>(0);

  //animation
  const duration = 2000; // 2 seconds
  const maxSteps = 20; // minimum number of steps for smooth animation

  useEffect(() => {
    setWindSpeed(Math.round(weather?.windSpeed ?? 0));
  }, [weather]);

  useEffect(() => {
    setTempWind(0);

    const steps = Math.max(maxSteps, windSpeed);
    const stepDuration = duration / steps;

    const timer = setInterval(() => {
      setTempWind((prevTempWind) => {
        if (prevTempWind >= windSpeed) {
          clearInterval(timer);
          return windSpeed;
        }
        return prevTempWind + 1;
      });
    }, stepDuration);

    return () => {
      clearInterval(timer);
    };
  }, [windSpeed]);

  return <>{tempWind}</>;
};

export default WindMPH;
