"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useRef } from "react";
import { useWeather } from "../../../context/WeatherContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const UVHourlyGraph = () => {
  const chartRef = useRef<any>(null);
  const { weather } = useWeather();

  const hourly = weather?.uvIndex?.hourly ?? [];

  if (!hourly.length) return <div className="text-center">Loading...</div>;

  const labels = hourly.map((h) => {
    const date = new Date(h.time);
    return date.toLocaleTimeString([], {
      hour: "numeric",
      hour12: true,
    });
  });
  const dataPoints = hourly.map((h) => h.uvIndex);

  const data = {
    labels,
    datasets: [
      {
        label: "UV Index",
        data: dataPoints,
        borderColor: (ctx: any) => {
          const chart = ctx.chart;
          const { ctx: canvasCtx, chartArea } = chart;

          if (!chartArea) return "red"; // avoid undefined on first render

          const gradient = canvasCtx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );
          gradient.addColorStop(0, "red");
          gradient.addColorStop(0.5, "yellow");
          gradient.addColorStop(1, "limegreen");
          return gradient;
        },
        backgroundColor: "rgba(255, 255, 0, 0.2)",
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
          callback: function (tickValue: any, index: number, ticks: any) {
            if (
              index === 0 ||
              index === Math.floor((ticks.length - 1) / 2) ||
              index === ticks.length - 1
            ) {
              return labels[index];
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

  return <Line ref={chartRef} data={data} options={options} />;
};

export default UVHourlyGraph;
