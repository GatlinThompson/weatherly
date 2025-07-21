"use client";
import { useWeather } from "../../../context/WeatherContext";
import WeatherIcon from "../icons/WeatherIcon";
import styles from "./WeatherNowImage.module.css";

const WeatherNowImage = () => {
  const { weather } = useWeather();
  return (
    <>
      <div
        className={`flex flex-col justify-center align-center items-center ${styles.weather_container}`}
      >
        <WeatherIcon code={weather?.weatherCode ?? 1000} />
      </div>
    </>
  );
};

export default WeatherNowImage;
