import MeterBox from "../../meter-box/MeterBox";
import UVHigh from "./UVHigh";
import UVNow from "./UVNow";
import UVLow from "./UVLow";
import UVHourlyGraph from "./UVHourlyGraph";

const UVIndex = () => {
  return (
    <MeterBox title="UV Index">
      <div className="flex flex-row gap-2">
        <div className="flex-grow flex flex-col justify-center align-center">
          <p className="text-4xl font-bold mt-4 text-center ">
            <UVNow />
          </p>
          <div className="flex flex-row gap-4 justify-center mt-3">
            <p className="text-lg text-center">High: {<UVHigh />}</p>
            <p className="text-lg text-center">Low: {<UVLow />}</p>
          </div>
        </div>
        <div className="flex-grow w-50">
          <UVHourlyGraph />
        </div>
      </div>
    </MeterBox>
  );
};

export default UVIndex;
