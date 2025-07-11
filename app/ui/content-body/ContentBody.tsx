import WindSpeed from "../weather-components/wind_speed/WindSpeed";
import styles from "./ContentBody.module.css";

export default function ContentBody() {
  return (
    <section className={`${styles.content_body} flex flex-col flex-1`}>
      <div className={`${styles.content_body} flex flex-col p-4 pt-6 pb-20`}>
        <div className="container mx-auto">
          <WindSpeed />
        </div>
      </div>
      <div></div>
    </section>
  );
}
