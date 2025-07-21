"use client";

import { useWeather } from "../../../context/WeatherContext";
import React, { useEffect, useState } from "react";

const TemperatureNum = () => {
  const { weather } = useWeather();
  const [temp, setTemp] = useState<number>(0);
  const [tempTemperature, setTempTemperature] = useState<number>(0);
  const [previousTemp, setPreviousTemp] = useState<number>(0);

  //animation
  const duration = 500; // 1 second
  const maxSteps = 5; // minimum number of steps for smooth animation

  useEffect(() => {
    setTemp(Math.round(weather?.temperature?.now ?? 0));
    setPreviousTemp(temp);
  }, [weather]);

  useEffect(() => {
    setTempTemperature(previousTemp); // Start from the previous value

    const steps = Math.max(maxSteps, temp);
    const stepDuration = duration / steps;

    const timer = setInterval(() => {
      setTempTemperature((prevTempTemperature) => {
        if (prevTempTemperature >= temp) {
          clearInterval(timer);
          return temp;
        }
        return Math.round(prevTempTemperature + 1);
      });
    }, stepDuration);

    return () => {
      clearInterval(timer);
    };
  }, [temp, previousTemp]); // Add previousTemp to the dependency array

  return <>{tempTemperature}</>;
};

export default TemperatureNum;
