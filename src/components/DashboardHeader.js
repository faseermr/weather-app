import React from "react";
import { monthNames } from "../resources";

const DashboardHeader = ({ val }) => {
  return (
    <div className="weather-data-header">
      <div>
        <p className="dashboard-city">
          {val.name}, {val.sys.country}
        </p>
        <p>
          {new Date(val.dt)
            .toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })
            .toLowerCase()}
          , {monthNames[new Date(val.dt).getMonth()]}{" "}
          {new Date(val.dt).getDate()}
        </p>

        <p>{val.weather[0].description}</p>
      </div>
      <div>
        <p className="dashboard-temp">{val.main.temp}°</p>
        <p>Temp Min: {val.main.temp_min}°</p>
        <p>Temp Max: {val.main.temp_max}°</p>
      </div>
    </div>
  );
};

export default DashboardHeader;
