import MeterBox from "../../meter-box/MeterBox";
import HumidityPercent from "./HumidityPercent";
import DewPoint from "./DewPoint";

const Humidity = () => {
  return (
    <MeterBox title="Humidity">
      <div className="flex flex-col justify-center align-center">
        <p className="text-5xl font-bold mt-4 text-center">
          <HumidityPercent />
        </p>
        <p className="text-md text-center mt-3">
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
