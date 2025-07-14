import MeterBox from "../../meter-box/MeterBox";
import UVHigh from "./UVHigh";
import UVNow from "./UVNow";
import UVLow from "./UVLow";

const UVIndex = () => {
  return (
    <>
      <MeterBox title="UV Index">
        <div className="flex flex-row">
          <div className="flex-grow flex flex-col justify-center align-center">
            <p className="text-4xl font-bold mt-4 text-center ">
              <UVNow />
            </p>
            <p className="text-lg text-center mt-4">
              Today's High: {<UVHigh />}
            </p>
            <p className="text-lg text-center mt-1">Today's Low: {<UVLow />}</p>
          </div>
          <div className="flex-grow w-50">TO BE WORKED ON</div>
        </div>
      </MeterBox>
    </>
  );
};

export default UVIndex;
