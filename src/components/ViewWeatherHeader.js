import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { BsCloudy } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { monthNames } from "../resources";
import "../css/ViewWeatherHeader.css";

const ViewWeatherHeader = ({ val }) => {
  const navigate = useNavigate();

  return (
    <div className="view-weather-header">
      <div className="view-weather-back-arrow" onClick={() => navigate(`/`)}>
        <BiArrowBack />
      </div>
      <p className="view-weather-city">
        {" "}
        {val.name}, {val.sys ? val.sys.country : null}
      </p>
      <p className="view-weather-date">
        {" "}
        {new Date(val.dt)
          .toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })
          .toLowerCase()}
        , {monthNames[new Date(val.dt).getMonth()]} {new Date(val.dt).getDate()}
      </p>
      <div className="view-weather-header-last-row">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BsCloudy className="view-weather-cloud-icon" />
          <p className="view-weather-text">
            {val.weather ? val.weather[0].description : null}
          </p>
        </div>
        <div className="view-weather-divider" />
        <div>
          <p className="view-weather-temp">
            {val.main ? val.main.temp + "°" : null}
          </p>
          <p className="view-weather-text">
            Temp Min: {val.main ? val.main.temp_min + "°" : null}
          </p>
          <p className="view-weather-text">
            Temp Max: {val.main ? val.main.temp_max + "°" : null}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewWeatherHeader;
