import WeatherForm from "./WeatherForm";
import styles from "./LandingBlock.module.css";
import Temperature from "../weather-components/temperature/Temperature";

export default function LandingBlock() {
  return (
    <section className={`flex flex-col`}>
      <div></div>
      <div className={`${styles.landing_block_content} flex flex-col p-4`}>
        <div className="container mx-auto flex flex-col gap-16">
          <WeatherForm />

          <Temperature />
        </div>
      </div>
    </section>
  );
}
