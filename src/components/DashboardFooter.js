import React from "react";
import { FiNavigation } from "react-icons/fi";

const DashboardFooter = ({ val }) => {
  return (
    <div className="view-weather-footer-base">
      <div className="view-weather-footer-row" style={{ width: "100%" }}>
        <div className="view-weather-footer-row-coloumn">
          <p>Pressure: {val.main.pressure}hpa</p>
          <p>Humidity: {val.main.humidity}%</p>
          <p>Visibility: {val.visibility / 1000.0}km</p>
        </div>
        <div className="view-weather-divider" />

        <div className="view-weather-footer-row-coloumn">
          <FiNavigation />
          <p>
            {val.wind.speed} m/s {val.wind.deg} Degree
          </p>
        </div>
        <div className="view-weather-divider" />

        <div className="view-weather-footer-row-coloumn">
          <p>
            Sunrise:{" "}
            {new Date(val.sys.sunrise)
              .toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })
              .toLowerCase()}
          </p>
          <p>
            Sunset:{" "}
            {new Date(val.sys.sunset)
              .toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })
              .toLowerCase()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardFooter;
