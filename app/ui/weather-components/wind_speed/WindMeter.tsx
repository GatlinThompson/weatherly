"use client";

import styles from "./WindMeter.module.css";
import { useWeather } from "../../../context/WeatherContext";
import { useEffect, useState } from "react";

export default function WindMeter() {
  const { weather } = useWeather();
  const [windSpeed, setWindSpeed] = useState(0);

  useEffect(() => {
    setWindSpeed(Math.round(weather?.wind.speed ?? 0));
  }, [weather]);

  // Calculate needle rotation (0-60 mph range, -135 to 135 degrees, then up to 270)
  const maxSpeed = 60;
  const clampedSpeed = Math.min(windSpeed, maxSpeed);
  // -135deg (0 mph) to 270deg (max)
  const needleRotation = (clampedSpeed / maxSpeed) * 270 - 135;

  // Generate speed marks with 5 mph increments (0-60 mph)
  const speedMarks = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

  return (
    <div className={styles.wind_meter}>
      {/* Speed lines/marks */}
      <div className={styles.marks}>
        {/* Return the mark element for each speed mark in the array */}
        {speedMarks.map((speed) => {
          const markRotation = (speed / maxSpeed) * 270 - 135;

          return (
            <div
              key={speed}
              className={styles.mark}
              style={{
                transform: `rotate(${markRotation}deg)`,
              }}
            >
              <div className={styles.mark_label}>
                <span
                  className={`${styles.mark_text} ${
                    speed % 10 !== 0 ? styles.mark_text_half : ""
                  }`}
                >
                  {speed}
                </span>
                <div className={styles.mark_stick}></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.needle}>
        <div className={styles.needle_circle}></div>
        <div
          className={styles.needle_line}
          style={{
            transform: `rotate(${needleRotation}deg)`,
          }}
        ></div>
      </div>
      <div className="absolute bottom-0">
        <span className="text-md font-bold">MPH</span>
      </div>
    </div>
  );
}
