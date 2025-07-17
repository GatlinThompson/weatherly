"use client";

import { useEffect, useState } from "react";
import { useWeather } from "../../../context/WeatherContext";

const SunRiseText = () => {
  const { weather } = useWeather();
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const riseStr = weather?.sun?.rise;
    const riseDate = riseStr ? new Date(riseStr) : new Date();
    setTime(
      riseDate.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
    );
  }, [weather]);

  return <>{time}</>;
};

export default SunRiseText;
