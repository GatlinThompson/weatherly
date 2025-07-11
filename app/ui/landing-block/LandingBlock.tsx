import WeatherForm from "./WeatherForm";
import styles from "./LandingBlock.module.css";

export default function LandingBlock() {
  return (
    <section className={`flex flex-col`}>
      <div></div>
      <div className={`${styles.landing_block_content} flex flex-col p-4`}>
        <div className="container mx-auto">
          <WeatherForm />
        </div>
      </div>
    </section>
  );
}
