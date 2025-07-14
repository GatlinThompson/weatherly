"use client";

import { useEffect, useState } from "react";
import { useWeather } from "../../../context/WeatherContext";

const UVHigh = () => {
  const { weather } = useWeather();
  const [uvHigh, setUVHigh] = useState<number>(0);
  const [tempUVHigh, setTempUVHigh] = useState<number>(0);

  useEffect(() => {
    setUVHigh(weather?.uvIndex?.max ?? 0); // Set uvHigh to the max value from weather.uvIndex.max.
  }, [weather]);

  //animation
  const duration = 500; // 1 second
  const maxSteps = 5; // minimum number of steps for smooth animation

  useEffect(() => {
    setTempUVHigh(0); // Start from 0 for animation effect.
    const steps = Math.max(maxSteps, uvHigh); // Calculate the number of steps based on the maxSteps and uvHigh.
    const stepDuration = duration / steps; // Calculate the duration of each step.

    const timer = setInterval(() => {
      setTempUVHigh((prevTempUVHigh) => {
        // Set the new value of tempUVHigh.
        if (prevTempUVHigh >= uvHigh) {
          // Check if the animation is complete by comparing the current value with the target value (uvHigh) and clearInterval if it's complete.
          clearInterval(timer); // Stop the animation if it's complete.
          return uvHigh; // Return the target value (uvHigh) to avoid any further animation.
        }
        return Math.round(prevTempUVHigh + 1); // Increment the current value by 1 and return it.
      });
    }, stepDuration);

    return () => {
      clearInterval(timer);
    };
  }, [uvHigh]); // Pass uvHigh as a dependency to useEffect so that it runs only when uvHigh changes.

  return <>{tempUVHigh}</>; // Return the animated value of uvHigh.
};

export default UVHigh;
