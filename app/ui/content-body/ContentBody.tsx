import WindSpeed from "../weather-components/wind_speed/WindSpeed";
import styles from "./ContentBody.module.css";
import Humidity from "../weather-components/humidity/Humidity";
import Precipitation from "../weather-components/precipitation/Precipitation";
import UVIndex from "../weather-components/uv_index/UVIndex";
import SunMoon from "../weather-components/sun_moon/SunMoon";
import HourlyWeather from "../weather-components/hourly/HourlyWeather";

export default function ContentBody() {
  return (
    <section className={`${styles.content_body} flex flex-col flex-1`}>
      <div
        className={`${styles.content_body} flex flex-col p-4 pt-6 pb-20 gap-5`}
      >
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 xl:px-20">
          <div className="w-full md:col-span-2">
            <HourlyWeather />
          </div>
          <div className="w-full md:col-span-1 lg:col-span-1 ">
            <WindSpeed />
          </div>
          <div className=" flex flex-row gap-5 lg:row-start-1 lg:col-start-3">
            <Humidity />
            <Precipitation />
          </div>
          <div className=" flex flex-row gap-5">
            <UVIndex />
          </div>
          <div className=" flex flex-row gap-5">
            <SunMoon />
          </div>
        </div>
      </div>
    </section>
  );
}
