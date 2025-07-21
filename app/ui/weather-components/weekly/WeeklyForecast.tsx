import MeterBox from "../../meter-box/MeterBox";
import WeeklyChart from "./WeeklyChart";

const WeeklyForecast = () => {
  return (
    <MeterBox hide={true}>
      <div className="container mx-auto flex flex-col gap-1">
        <h2 className="text-xl font-bold px-4 lg:px-0">Weekly Forecast</h2>

        <div className={`flex flex-row  mt-3 relative`}>
          <WeeklyChart />
        </div>
      </div>
    </MeterBox>
  );
};

export default WeeklyForecast;
