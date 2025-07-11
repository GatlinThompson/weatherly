"use client";

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
  const { weather } = useWeather();
  const temp = weather?.temperature ?? 0;
  const humidity = weather?.humidity ?? 0;
  const dewPoint = calculateDewPoint(temp, humidity);
  // Convert Celsius to Fahrenheit
  const dewPointF = Math.round((dewPoint * 9) / 5 + 32);
  return <>{dewPointF ?? 0}&deg;F</>;
};

export default DewPoint;
