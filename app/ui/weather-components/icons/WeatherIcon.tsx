"use client";

import Image from "next/image";

const weatherIcons = {
  sunny: [1000],
  "partly-cloudy": [1101, 1000, 1100],
  "mostly-cloudy": [1102],
  cloudy: [1001],
  fog: [2000, 2100],
  "light-rain": [4000, 4200],
  rain: [4001],
  "heavy-rain": [4201],
  "light-snow": [5100],
  snow: [5000, 5001],
  "heavy-snow": [5101],
  "freezing-rain": [6001, 6200, 6201, 6000, 7000, 7101, 7102],
  "thunder-storm": [8000],
};

const WeatherIcon = ({ code }: { code: number }) => {
  const icon = (
    Object.keys(weatherIcons) as Array<keyof typeof weatherIcons>
  ).find((key) => weatherIcons[key].includes(code));

  const iconPath = `/weather-icons/${icon}.svg`;

  const iconName = icon?.replace("-", " ");

  return (
    <div className="flex items-center justify-center w-full h-full">
      <Image
        src={iconPath}
        alt={iconName ?? "Weather Icon"}
        width={48}
        height={48}
      />
    </div>
  );
};

export default WeatherIcon;
