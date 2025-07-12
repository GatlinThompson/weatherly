"use client";

import React, { useEffect, useState } from "react";
import { useWeather } from "../../../context/WeatherContext";

const CloudCover = () => {
  const { weather } = useWeather();
  const [cloudCover, setCloudCover] = useState<number>(0);
  const [tempCloudCover, setTempCloudCover] = useState<number>(0);
  //animation
  const duration = 1000; // 1 second
  const maxSteps = 10; // minimum number of steps for smooth animation

  useEffect(() => {
    setCloudCover(weather?.cloudCover ?? 0);
  }, [weather]);

  useEffect(() => {
    setTempCloudCover(0);

    const steps = Math.max(maxSteps, cloudCover);
    const stepDuration = duration / steps;

    const timer = setInterval(() => {
      setTempCloudCover((prevTempCloudCover) => {
        if (prevTempCloudCover >= cloudCover) {
          clearInterval(timer);
          return cloudCover;
        }
        return prevTempCloudCover + 1;
      });
    }, stepDuration);

    return () => {
      clearInterval(timer);
    };
  }, [cloudCover]);

  return <>{tempCloudCover}%</>;
};

export default CloudCover;
