import TemperatureNum from "./TemperatureNum";
import WeatherText from "./WeatherText";

const Temperature = () => {
  return (
    <div className="flex flex-col justify-center align-center w-full">
      <p className="text-6xl font-md text-center">
        <TemperatureNum />
      </p>
      <hr className="border-t-2 border-foreground w-1/2 mx-auto mt-3" />
      <p className="text-3xl font-md text-center mt-3">
        <WeatherText />
      </p>
    </div>
  );
};

export default Temperature;
