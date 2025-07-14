"use client";

import { useEffect, useState } from "react";
import { useWeather } from "../../../context/WeatherContext";

const UVNow = () => {
  const { weather } = useWeather();
  const [uvIndex, setUVIndex] = useState<number>(0);
  const [tempUVIndex, setTempUVIndex] = useState<number>(0);

  useEffect(() => {
    setUVIndex(weather?.uvIndex?.current ?? 0);
  }, [weather]);

  //animation
  const duration = 500; // 1 second
  const maxSteps = 5; // minimum number of steps for smooth animation

  useEffect(() => {
    setTempUVIndex(0);

    const steps = Math.max(maxSteps, uvIndex);
    const stepDuration = duration / steps;

    const timer = setInterval(() => {
      setTempUVIndex((prevTempUVIndex) => {
        if (prevTempUVIndex >= uvIndex) {
          // Check if the animation is complete by comparing the current value with the target value (uvIndex) and clearInterval if it's complete.
          clearInterval(timer); // Stop the animation if it's complete.
          return uvIndex; // Return the target value (uvIndex) to avoid any further animation.
        }
        return Math.round(prevTempUVIndex + 1); // Increment the current value by 1 and return it.
      }); // Set the new value of tempUVIndex.
    }, stepDuration); // Set the interval to run every stepDuration.
  }, [uvIndex]); // Pass uvIndex as a dependency to useEffect so that it runs only when uvIndex changes.

  return <>{tempUVIndex}</>; // Return the animated value of uvIndex.
};

export default UVNow;
