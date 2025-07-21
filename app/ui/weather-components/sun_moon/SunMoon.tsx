import MeterBox from "../../meter-box/MeterBox";
import SunRiseText from "./SunRiseText";
import SunSetText from "./SunSetText";

import MoonRiseText from "./MoonRiseText";

const SunMoon = () => {
  return (
    <MeterBox title="Sun & Moon">
      <div className="flex flex-row gap-2">
        <div className="flex flex-col gap-1 mt-3">
          <p className="text-md">
            Next Sunrise: <SunRiseText />
          </p>
          <p className="text-md">
            Next Sunset: <SunSetText />
          </p>
          <hr className="mt-1 mb-1" />
          <p className="text-md">
            Next Moonrise: <MoonRiseText />
          </p>
        </div>
      </div>
    </MeterBox>
  );
};

export default SunMoon;
