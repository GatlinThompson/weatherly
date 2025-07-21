import WeatherForm from "./WeatherForm";
import styles from "./LandingBlock.module.css";

export default function LandingBlock() {
  return (
    <section className={`flex flex-col `}>
      <div
        className={`${styles.landing_block_content} flex flex-col p-4 lg:pb-10`}
      >
        <div className="container mx-auto flex flex-col gap-16 lg:gap-24 lg:py-24">
          <WeatherForm />
        </div>
      </div>
    </section>
  );
}
