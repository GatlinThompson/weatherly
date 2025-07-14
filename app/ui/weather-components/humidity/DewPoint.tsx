"use client";

import React, { useEffect, useState } from "react";
import { useWeather } from "../../../context/WeatherContext";

const DewPoint = () => {
  const [tempDewPoint, setTempDewPoint] = useState<number>(0);
  const { weather } = useWeather();
  const [dewPointValue, setDewPointValue] = useState<number>(0);

  //animation
  const duration = 1000; // 1 second
  const maxSteps = 10; // minimum number of steps for smooth animation

  useEffect(() => {
    setDewPointValue(weather?.dewPoint ?? 0);
  }, [weather]);

  useEffect(() => {
    setTempDewPoint(0);

    const steps = Math.max(maxSteps, Math.abs(dewPointValue));
    const stepDuration = duration / steps;
    const increment = dewPointValue / steps;

    const timer = setInterval(() => {
      setTempDewPoint((prevTempDewPoint) => {
        const nextValue = prevTempDewPoint + increment;
        if (
          (increment > 0 && nextValue >= dewPointValue) ||
          (increment < 0 && nextValue <= dewPointValue)
        ) {
          clearInterval(timer);
          return dewPointValue;
        }
        return Math.round(nextValue);
      });
    }, stepDuration);

    return () => {
      clearInterval(timer);
    };
  }, [dewPointValue]);

  return <>{tempDewPoint}&deg;F</>;
};

export default DewPoint;
