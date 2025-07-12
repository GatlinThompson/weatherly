"use client";

import React, { useEffect, useState } from "react";
import { useWeather } from "../../../context/WeatherContext";

const PrecipitationChance = () => {
  const { weather } = useWeather();
  const [precipitationChance, setPrecipitationChance] = useState<number>(0);
  const [tempPrecipitationChance, setTempPrecipitationChance] =
    useState<number>(0);

  //animation
  const duration = 1000; // 1 second
  const maxSteps = 10; // minimum number of steps for smooth animation

  useEffect(() => {
    setPrecipitationChance(weather?.precipitation ?? 0);
  }, [weather]);

  useEffect(() => {
    setTempPrecipitationChance(0);

    const steps = Math.max(maxSteps, precipitationChance);
    const stepDuration = duration / steps;

    const timer = setInterval(() => {
      setTempPrecipitationChance((prevTempPrecipitationChance) => {
        if (prevTempPrecipitationChance >= precipitationChance) {
          clearInterval(timer);
          return precipitationChance;
        }
        return prevTempPrecipitationChance + 1;
      });
    }, stepDuration);

    return () => {
      clearInterval(timer);
    };
  }, [precipitationChance]);

  return <>{tempPrecipitationChance}%</>;
};

export default PrecipitationChance;
