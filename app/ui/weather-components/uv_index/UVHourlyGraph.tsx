"use client";

import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useWeather } from "../../../context/WeatherContext";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const UVHourlyGraph = () => {
  const { weather } = useWeather();
  // weather.uvIndex.hourly = [{ time: string, uvIndex: number }, ...]
  const hourly = weather?.uvIndex?.hourly ?? [];

  const labels = hourly.map((h) => h.time);
  const dataPoints = hourly.map((h) => h.uvIndex);

  const data = {
    labels,
    datasets: [
      {
        label: "UV Index",
        data: dataPoints,
        borderColor: "#ffff",
        backgroundColor: "rgba(221, 162, 11, 0.2)",
        tension: 0.2,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: { enabled: false },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          autoSkip: false,
          callback: function (
            tickValue: string | number,
            index: number,
            ticks: any
          ) {
            // Only show first, middle, and last label
            if (typeof index === "number" && ticks && Array.isArray(ticks)) {
              if (
                index === 0 ||
                index === Math.floor((ticks.length - 1) / 2) ||
                index === ticks.length - 1
              ) {
                // fallback to tickValue if label is missing
                return labels[index] || tickValue;
              }
            }
            return "";
          },
          color: "#fff",
          font: { size: 12 },
          maxRotation: 0,
          minRotation: 0,
        },
      },
      y: {
        beginAtZero: true,
        max: 12,
        grid: { display: false },
        ticks: { display: false },
      },
    },
    elements: {
      point: { radius: 0 },
      line: { borderWidth: 2 },
    },
  };

  if (!hourly.length) return <div className="text-center">Loading...</div>;

  return <Line data={data} options={options} />;
};

export default UVHourlyGraph;
