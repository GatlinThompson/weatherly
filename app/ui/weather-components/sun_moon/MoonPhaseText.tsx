"use client";

import { useEffect, useState } from "react";
import { useWeather } from "../../../context/WeatherContext";

const MoonPhaseText = () => {
  const { weather } = useWeather();
  const [phase, setPhase] = useState<string>("");

  useEffect(() => {
    setPhase(weather?.moon?.phase ?? "New Moon");
  }, [weather]);

  return <>{phase}</>;
};

export default MoonPhaseText;
