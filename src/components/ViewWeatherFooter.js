import React from "react";
import { FiNavigation } from "react-icons/fi";
import "../css/ViewWeatherFooter.css";

const ViewWeatherFooter = ({ val }) => {
  return (
    <div className="view-weather-footer-row">
      <div className="view-weather-footer-row-coloumn">
        <p>Pressure:{val.main ? val.main.pressure : null}hpa</p>
        <p>Humidity: {val.main ? val.main.humidity : null}%</p>
        <p>Visibility: {val.visibility / 1000.0}km</p>
      </div>
      <div className="view-weather-divider" />

      <div className="view-weather-footer-row-coloumn">
        <FiNavigation />
        <p>
          {" "}
          {val.wind ? val.wind.speed : null} m/s{" "}
          {val.wind ? val.wind.deg : null} Degree
        </p>
      </div>
      <div className="view-weather-divider" />

      <div className="view-weather-footer-row-coloumn">
        <p>
          Sunrise:{" "}
          {val.sys
            ? new Date(val.sys.sunrise)
                .toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })
                .toLowerCase()
            : null}
        </p>
        <p>
          Sunset:{" "}
          {val.sys
            ? new Date(val.sys.sunset)
                .toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })
                .toLowerCase()
            : null}
        </p>
      </div>
    </div>
  );
};

export default ViewWeatherFooter;
