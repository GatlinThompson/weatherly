import MeterBox from "../../meter-box/MeterBox";
import CityName from "./CityName";
import MaxTemp from "./MaxTemp";
import MinTemp from "./MinTemp";
import TemperatureNum from "./TemperatureNum";
import WeatherText from "./WeatherText";
import WeatherNowImage from "./WeatherNowImage";
import FeelsLike from "./FeelsLike";

const Temperature = () => {
  return (
    <MeterBox>
      <h2 className="text-xl font-bold  mb-5">
        <CityName />
      </h2>
      <div className="flex flex-row justify-center align-center gap-4 mt-2">
        <WeatherNowImage />

        <div className="flex flex-col justify-center align-center">
          <div className="flex flex-row">
            <p className="text-7xl font-semibold">
              <TemperatureNum />
            </p>
            <span className="text-6xl font-semibold ">&deg;F</span>
          </div>

          <p className="text-xl text-foreground font-semibold mt">
            <WeatherText />
          </p>
        </div>
      </div>

      <p className="text-md text-foreground font-semibold mt-5">
        Feels Like: <FeelsLike /> &deg;F
      </p>

      <div className="flex flex-row justify-stretch align-center gap-4 mt-3">
        <p className="text-md text-foreground font-semibold text-center">
          High:{" "}
          <span className="font-md">
            <MaxTemp />
            &deg;F
          </span>
        </p>
        <div className="h-5 w-0.5 bg-foreground align-self-center" />
        <p className="text-md text-foreground font-semibold text-center">
          Low:{" "}
          <span className="font-md">
            <MinTemp />
            &deg;F
          </span>
        </p>
      </div>
    </MeterBox>
  );
};

export default Temperature;
