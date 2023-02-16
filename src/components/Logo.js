import React from "react";
import { BsFillCloudSunFill } from "react-icons/bs";
import "../css/Logo.css";

const Logo = () => {
  return (
    <div className="weather-app-logo">
      <div>
        <BsFillCloudSunFill className="weather-app-logo-icon" />
      </div>
      <h1 className="header-app">Weather App</h1>
    </div>
  );
};

export default Logo;
