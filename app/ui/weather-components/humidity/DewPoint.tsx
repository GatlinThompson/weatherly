"use client";

import React, { useEffect, useState } from "react";
import { useWeather } from "../../../context/WeatherContext";

function calculateDewPoint(temp: number, humidity: number) {
  // Magnus formula
  const a = 17.62;
  const b = 243.12;
  const alpha = (a * temp) / (b + temp) + Math.log(humidity / 100);
  const dewPoint = (b * alpha) / (a - alpha);
  return Math.round(dewPoint * 10) / 10;
}

const DewPoint = () => {
  const [tempDewPoint, setTempDewPoint] = useState<number>(0);
  const { weather } = useWeather();
  const [dewPointValue, setDewPointValue] = useState<number>(0);

  //animation
  const duration = 1000; // 1 second
  const maxSteps = 10; // minimum number of steps for smooth animation

  useEffect(() => {
    const temp = weather?.temperature ?? 0;
    const humidity = weather?.humidity ?? 0;

    // Convert Kelvin to Celsius for dew point calculation

    const dewPoint = calculateDewPoint(temp, humidity);
    // Convert Celsius to Fahrenheit

    // Set to 0 if NaN
    setDewPointValue(isNaN(dewPoint) ? 0 : dewPoint);
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
