"use client";

import { useEffect, useRef, useState } from "react";
import { useWeather } from "../../../context/WeatherContext";
import MeterBox from "../../meter-box/MeterBox";
import styles from "./HourlyChart.module.css";
import WeatherIcon from "../icons/WeatherIcon";

const HourlyChart = () => {
  const { weather } = useWeather();
  const [hourly, setHourly] = useState(weather?.hourly ?? []);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollStep = 210;

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    setHourly(weather?.hourly ?? []);
  }, [weather]);

  const updateScrollButtons = () => {
    const el = containerRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  useEffect(() => {
    updateScrollButtons(); // Run once after mount or hourly update
  }, [hourly]);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -scrollStep, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: scrollStep, behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="flex justify-between mt-2 lg:mt-0">
        {canScrollLeft ? (
          <button
            onClick={scrollLeft}
            className="bg-foreground border-foreground border px-2 py-1 rounded text-2xl text-quaternary"
          >
            &lt;
          </button>
        ) : (
          <div />
        )}
      </div>

      <div
        ref={containerRef}
        onScroll={updateScrollButtons}
        className={`flex flex-row overflow-x-auto scrollbar-hide snap-x snap-proximity ${styles.hourly_chart} gap-3 mb-1 mt-2 lg:mb-0 lg:mt-0 px-4`}
      >
        {hourly.length ? (
          hourly.map((h) => (
            <div className="snap-center" key={h.time}>
              <MeterBox weather={true}>
                <div
                  className={`flex flex-col justify-center align-center ${styles.hourly_object} p-1 gap-1`}
                >
                  <p className="text-lg font-bold text-center mb-2">
                    {h.time === weather?.hourly[0].time ? (
                      <>Now</>
                    ) : (
                      new Date(h.time).toLocaleTimeString([], {
                        hour: "numeric",
                        hour12: true,
                      })
                    )}
                  </p>
                  <WeatherIcon code={h.weatherCode} />

                  <p className="text-xl font-bold text-center">
                    {h.temperature}&deg;F
                  </p>
                </div>
              </MeterBox>
            </div>
          ))
        ) : (
          <div className="text-center w-full">
            <p className="text-lg font-bold text-align-center mb-2">
              Loading...
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-2 lg:mt-0">
        {canScrollRight ? (
          <button
            onClick={scrollRight}
            className="bg-foreground border-foreground border px-2 py-1 rounded text-2xl text-quaternary"
          >
            &gt;
          </button>
        ) : (
          <div />
        )}
      </div>
    </>
  );
};

export default HourlyChart;
