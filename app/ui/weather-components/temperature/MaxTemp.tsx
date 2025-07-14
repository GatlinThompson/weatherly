"use client";

import { useWeather } from "../../../context/WeatherContext";
import React, { useEffect, useState } from "react";

const MaxTemp = () => {
  const { weather } = useWeather();
  const [temp, setTemp] = useState<number>(0);
  const [tempMaxTemp, setTempMaxTemp] = useState<number>(0);

  useEffect(() => {
    setTemp(weather?.temperature?.max ?? 0);
  }, [weather]);

  //animation
  const duration = 500; // 1 second
  const maxSteps = 5; // minimum number of steps for smooth animation

  useEffect(() => {
    setTempMaxTemp(0); // Start from 0 for animation effect

    const steps = Math.max(maxSteps, temp);
    const stepDuration = duration / steps;

    const timer = setInterval(() => {
      setTempMaxTemp((prevTempMaxTemp) => {
        if (prevTempMaxTemp >= temp) {
          clearInterval(timer);
          return temp;
        }
        return Math.round(prevTempMaxTemp + 1);
      });
    }, stepDuration);

    return () => {
      clearInterval(timer);
    };
  }, [temp]);

  return <>{tempMaxTemp}</>;
};

export default MaxTemp;
