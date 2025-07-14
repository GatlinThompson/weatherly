import MaxTemp from "./MaxTemp";
import MinTemp from "./MinTemp";
import TemperatureNum from "./TemperatureNum";
import WeatherText from "./WeatherText";

const Temperature = () => {
  return (
    <div className="flex flex-col justify-center align-center w-full">
      <p className="text-6xl font-md text-center">
        <TemperatureNum />
      </p>
      <div className="flex flex-row justify-center align-center gap-4 mt-2">
        <p className="text-md font-md text-center">
          High:{" "}
          <span className="font-md">
            <MaxTemp />
            &deg;F
          </span>
        </p>
        <div className="h-5 w-0.5 bg-foreground align-self-center" />
        <p className="text-md font-md text-center">
          Low:{" "}
          <span className="font-md">
            <MinTemp />
            &deg;F
          </span>
        </p>
      </div>
      <p className="text-3xl font-md text-center mt-5">
        <WeatherText />
      </p>
    </div>
  );
};

export default Temperature;
