"use client";

import { useEffect, useRef, useState } from "react";
import { useWeather } from "../../../context/WeatherContext";
import MeterBox from "../../meter-box/MeterBox";
import styles from "../hourly/HourlyChart.module.css";
import WeatherIcon from "../icons/WeatherIcon";

const WeeklyChart = () => {
  const { weather } = useWeather();
  const [hourly, setHourly] = useState(weather?.daily ?? []);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollStep = 210;

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    setHourly(weather?.daily ?? []);
  }, [weather]);

  const updateScrollButtons = () => {
    const el = containerRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
  };

  useEffect(() => {
    updateScrollButtons(); // Run once after mount or hourly update
    // Also update after a short delay to catch scroll animation completion
    const handle = setTimeout(updateScrollButtons, 350);
    return () => clearTimeout(handle);
  }, [hourly]);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -scrollStep, behavior: "smooth" });
      setTimeout(updateScrollButtons, 350);
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: scrollStep, behavior: "smooth" });
      setTimeout(updateScrollButtons, 350);
    }
  };

  return (
    <>
      <div className="flex justify-between lg:mt-0 items-center">
        {canScrollLeft && (
          <button
            onClick={scrollLeft}
            className={`bg-secondary-landing shadow-lg px-2 py-1 rounded text-2xl text-foreground hidden lg:block z-2 ${styles.scroll_button} flex items-center justify-center align-center hover:scale-105 duration-300 ease-in`}
          >
            <span className="text-primary font-bold">&lt;</span>
          </button>
        )}
      </div>

      <div className="absolute top-0 left-0 -z-0 bg-linear-to-l from-tertiary to-transparent w-5 h-full hidden lg:block"></div>

      <div
        ref={containerRef}
        onScroll={updateScrollButtons}
        className={`flex flex-row overflow-x-auto scrollbar-hide snap-x snap-proximity ${styles.hourly_chart} gap-3 px-4`}
      >
        {hourly.length ? (
          hourly.map((h) => (
            <div className="snap-center" key={h.date}>
              <MeterBox>
                <div
                  className={`flex flex-col justify-center align-center ${styles.hourly_object} p-1 gap-1`}
                >
                  <p className="text-lg font-bold text-center mb-2">
                    {h.date === weather?.daily[0].date ? (
                      <>Today</>
                    ) : (
                      new Date(h.date).toLocaleDateString([], {
                        weekday: "long",
                      })
                    )}
                  </p>
                  <WeatherIcon code={h.weatherCode} />

                  <div className="flex flex-row gap-0 justify-center">
                    <p className="text-xl font-bold text-center">
                      {Math.round(h.temperature)}
                    </p>
                    <span className="text-lg font-bold">&deg;F</span>
                  </div>
                </div>
              </MeterBox>
            </div>
          ))
        ) : (
          <div className="text-center w-full">
            <p className="text-lg font-bold text-align-center mb-2 lg:min-h-[178px] text-center px-5">
              Loading...
            </p>
          </div>
        )}
      </div>

      <div className="absolute top-0 right-0 -z-0 bg-linear-to-l from-tertiary to-transparent w-15 h-full hidden lg:block"></div>
      <div className="flex justify-between mt-2 lg:mt-0 z-2 items-center">
        {canScrollRight && (
          <button
            onClick={scrollRight}
            className={`bg-secondary-landing shadow-lg px-2 py-1 rounded text-2xl text-foreground hidden lg:block z-2 ${styles.scroll_button} flex items-center justify-center align-center hover:scale-105 duration-300 ease-in`}
          >
            <span className="text-primary font-bold">&gt;</span>
          </button>
        )}
      </div>
    </>
  );
};

export default WeeklyChart;
