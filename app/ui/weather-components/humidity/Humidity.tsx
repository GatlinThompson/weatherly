import MeterBox from "../../meter-box/MeterBox";
import HumidityPercent from "./HumidityPercent";
import DewPoint from "./DewPoint";

const Humidity = () => {
  return (
    <MeterBox title="Humidity">
      <div className="flex flex-col justify-center align-center">
        <p className="text-4xl font-bold mt-4 text-center md:text-5xl lg:text-3xl">
          <HumidityPercent />
        </p>
        <p className="text-md text-center mt-4 md:text-xl  lg:text-md">
          Dew Point:{" "}
          <span className="font-bold">
            <DewPoint />
          </span>
        </p>
      </div>
    </MeterBox>
  );
};

export default Humidity;
