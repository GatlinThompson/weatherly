import BasicInfo from "./BasicInfo";
import MeterBox from "../../meter-box/MeterBox";
import WindMPH from "../wind_speed/WindMPH";

import HumidityPercent from "../humidity/HumidityPercent";
import PrecipitationChance from "../precipitation/PreciptationChance";

const BasicWeather = () => {
  return (
    <MeterBox>
      <div className="flex flex-row gap-2 justify-between flex-wrap mt-5">
        <BasicInfo title="Wind">
          <span className="font-medium">
            <WindMPH /> mph
          </span>
        </BasicInfo>
        <BasicInfo title="Humidity">
          <span className="font-medium">
            <HumidityPercent />
          </span>
        </BasicInfo>
        <BasicInfo title="Precipitation">
          <span className="font-medium">
            <PrecipitationChance />
          </span>
        </BasicInfo>
      </div>
    </MeterBox>
  );
};

export default BasicWeather;
