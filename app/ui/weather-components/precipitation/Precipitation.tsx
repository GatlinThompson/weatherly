import MeterBox from "../../meter-box/MeterBox";
import PrecipitationChance from "./PreciptationChance";
import CloudCover from "./CloudCover";

const Precipitation = () => {
  return (
    <MeterBox title="Precipitation">
      <div className="flex flex-col justify-center align-center">
        <p className="text-5xl font-bold mt-4 text-center">
          <PrecipitationChance />
        </p>
        <p className="text-md text-center mt-3">
          Cloud Cover:{" "}
          <span className="font-bold">
            {" "}
            <CloudCover />
          </span>
        </p>
      </div>
    </MeterBox>
  );
};

export default Precipitation;
