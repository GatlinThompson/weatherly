import HourlyChart from "./HourlyChart";
import styles from "./HourlyWeather.module.css";

const HourlyWeather = () => {
  return (
    <div className={`flex flex-row  ${styles.hourly_weather} mt-3`}>
      <HourlyChart />
    </div>
  );
};

export default HourlyWeather;
