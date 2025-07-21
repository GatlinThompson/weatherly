import MeterBox from "../../meter-box/MeterBox";
import UVHigh from "./UVHigh";
import UVNow from "./UVNow";
import UVLow from "./UVLow";
import UVHourlyGraph from "./UVHourlyGraph";
import styles from "./UVIndex.module.css";

const UVIndex = () => {
  return (
    <MeterBox title="UV Index">
      <div className="flex flex-row gap-2 md:flex-col">
        <div className="flex-grow flex flex-col justify-center align-center">
          <p className="text-4xl font-bold mt-4 text-center lg:text-5xl xl:text-6xl">
            <UVNow />
          </p>
          <div className="flex flex-row gap-3 justify-center mt-3">
            <p className="text-medium text-center lg:text-xl">
              High: {<UVHigh />}
            </p>
            <p className="text-medium text-center lg:text-xl">
              Low: {<UVLow />}
            </p>
          </div>
        </div>
        <div
          className={`flex-grow w-1/2 md:w-full ${styles.uv_graph} lg:min-h-[176px]`}
        >
          <UVHourlyGraph />
        </div>
      </div>
    </MeterBox>
  );
};

export default UVIndex;
