import WindSpeed from "../weather-components/wind_speed/WindSpeed";
import styles from "./ContentBody.module.css";
import Humidity from "../weather-components/humidity/Humidity";
import Precipitation from "../weather-components/precipitation/Precipitation";
import UVIndex from "../weather-components/uv_index/UVIndex";

export default function ContentBody() {
  return (
    <section className={`${styles.content_body} flex flex-col flex-1`}>
      <div className={`${styles.content_body} flex flex-col p-4 pt-6 pb-20`}>
        <div className="container mx-auto flex flex-col flex-wrap gap-5">
          <div className="w-full">
            <WindSpeed />
          </div>
          <div className=" flex flex-row gap-5">
            <Humidity />
            <Precipitation />
          </div>
          <div className=" flex flex-row gap-5">
            <UVIndex />
          </div>
        </div>
      </div>
    </section>
  );
}
