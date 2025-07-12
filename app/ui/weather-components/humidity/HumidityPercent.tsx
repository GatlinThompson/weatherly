"use client";

import React, { useEffect, useState } from "react";
import { useWeather } from "../../../context/WeatherContext";

const HumidityPercent = () => {
  const [tempHumidity, setTempHumidity] = useState<number>(0);
  const { weather } = useWeather();
  const [humidity, setHumidity] = useState<number>(0);

  //animation
  const duration = 1000; // 1 second
  const maxSteps = 10; // minimum number of steps for smooth animation

  useEffect(() => {
    setHumidity(Math.round(weather?.humidity ?? 0));
  }, [weather]);

  useEffect(() => {
    setTempHumidity(0);

    const steps = Math.max(maxSteps, humidity);
    const stepDuration = duration / steps;

    const timer = setInterval(() => {
      setTempHumidity((prevTempHumidity) => {
        if (prevTempHumidity >= humidity) {
          clearInterval(timer);
          return humidity;
        }
        return prevTempHumidity + 1;
      });
    }, stepDuration);

    return () => {
      clearInterval(timer);
    };
  }, [humidity]);

  return <>{tempHumidity}%</>;
};

export default HumidityPercent;
