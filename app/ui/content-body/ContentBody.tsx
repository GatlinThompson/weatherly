import WindSpeed from "../weather-components/wind_speed/WindSpeed";
import styles from "./ContentBody.module.css";
import Humidity from "../weather-components/humidity/Humidity";
import Precipitation from "../weather-components/precipitation/Precipitation";
import UVIndex from "../weather-components/uv_index/UVIndex";
import HourlyWeather from "../weather-components/hourly/HourlyWeather";
import Temperature from "../weather-components/temperature/Temperature";
import BasicWeather from "../weather-components/basic/BasicWeather";
import WeeklyForecast from "../weather-components/weekly/WeeklyForecast";

export default function ContentBody() {
  return (
    <section className={`${styles.content_body} flex flex-col flex-1`}>
      <div
        className={`${styles.content_body} flex flex-col pb-20 gap-10 md:grid md:grid-cols-3`}
      >
        <div className="relative z-2 flex flex-col gap-10 lg:pt-12">
          <div className="bg-secondary-landing h-50  absolute top-0 left-0 m min-w-full -z-1"></div>
          <div className=" container mx-auto grid grid-cols-1 md:grid-cols-7 md:gap-x-4 md:gap-y-10 gap-10 lg:gap-x-4">
            <div className=" mx-auto flex flex-col gap-5 col-span-1 w-full px-4 md:col-span-5 md:col-start-2 lg:col-start-1 lg:col-span-3">
              <Temperature />
            </div>

            <div className="w-full md:col-span-7 lg:px-4 lg:col-span-4">
              <HourlyWeather />
            </div>
            <div className="w-full md:col-span-7 lg:px-4 lg:col-span-4 lg:col-start-4">
              <WeeklyForecast />
            </div>
            <div
              className=" lg:col-span-3 lg:col-start-1
            lg:row-start-2 flex flex-col items-stretch flex-auto hidden lg:flex px-4"
            >
              <BasicWeather />
            </div>

            <div className=" flex flex-row gap-5 px-4 md:col-span-3 lg:col-span-3  lg:-mt-24 xl:-mt-34">
              <UVIndex />
            </div>
            <div className="w-full md:col-span-4 lg:col-span-3 px-4 ">
              <WindSpeed />
            </div>
            <div className="w-full md:col-span-4 md:col-start-1 lg:col-span-3 px-4 lg:flex xl:col-start-7 ">
              <div className=" flex flex-row gap-5  xl:flex-col ">
                <Humidity />
                <Precipitation />
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 xl:grid-cols-9 gap-5 lg:gap-6">
          {/*  <div className=" flex flex-row gap-5 lg-col-span-3 px-4">
            <SunMoon />
          </div> */}{" "}
        </div>
      </div>
    </section>
  );
}
