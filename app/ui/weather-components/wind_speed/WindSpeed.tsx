import MeterBox from "../../meter-box/MeterBox";
import WindMPH from "./WindMPH";
import WindMeter from "./WindMeter";
import WindDirection from "./WindDirection";
import WindGust from "./WindGust";

const WindSpeed = () => {
  return (
    <MeterBox title="Wind Speed">
      <div className="flex flex-row">
        <div className="w-50 mt-8 flex flex-col justify-center">
          <div className="text-4xl font-bold">
            <span>
              <WindMPH /> MPH
            </span>
          </div>
          <div className="flex flex-col flex-grow justify-end">
            <p className="text-md font-reg mb-0">
              Direction: <WindDirection />
            </p>
            <p className="text-md font-reg mb-0">
              Wind Gust: <WindGust /> mph
            </p>
          </div>
        </div>

        <div className="flex-grow w-50">
          <WindMeter />
        </div>
      </div>
    </MeterBox>
  );
};

export default WindSpeed;
