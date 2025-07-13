"use client";

import { useEffect, useState } from "react";
import { useWeather } from "../../../context/WeatherContext";
import { weatherCode } from "../../../../utils/weatherCodes";

const WeatherText = () => {
  const [text, setText] = useState<string>("Clear");

  const { weather } = useWeather();

  useEffect(() => {
    setText(weatherCode[weather?.weather.toString() ?? "1000"]);
  }, [weather]);

  //   useEffect(() => {
  //     setText(weatherCode[weatherText]);
  //   }, [weatherText]);

  return <>{text}</>;
};

export default WeatherText;
