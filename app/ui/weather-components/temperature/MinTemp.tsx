"use client";

import { useWeather } from "../../../context/WeatherContext";
import React, { useEffect, useState } from "react";

const MinTemp = () => {
  const { weather } = useWeather();
  const [temp, setTemp] = useState<number>(0);
  const [tempMinTemp, setTempMinTemp] = useState<number>(0);

  useEffect(() => {
    setTemp(weather?.temperature?.min ?? 0);
  }, [weather]);

  //animation
  const duration = 500; // 1 second
  const maxSteps = 5; // minimum number of steps for smooth animation

  useEffect(() => {
    setTempMinTemp(0); // Start from 0 for animation effect

    const steps = Math.max(maxSteps, temp);
    const stepDuration = duration / steps;

    const timer = setInterval(() => {
      setTempMinTemp((prevTempMinTemp) => {
        if (prevTempMinTemp >= temp) {
          clearInterval(timer);
          return temp;
        }
        return Math.round(prevTempMinTemp + 1);
      });
    }, stepDuration);

    return () => {
      clearInterval(timer);
    };
  }, [temp]);

  return <>{tempMinTemp}</>;
};

export default MinTemp;
