import React from "react";
import { FiNavigation } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { monthNames } from "../resources";
import "../css/Dashboard.css";

const Dashboard = ({ weatherData }) => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <div className="add-city-input-box">
        <input
          className="add-city-input"
          type="text"
          placeholder="Enter a city"
        />
        <button className="add-city-btn" type="submit">
          {" "}
          Add City
        </button>
      </div>

      <div className="weather-data-box">
        {weatherData.map((val, idx) => {
          return (
            <div
              key={idx}
              className="box-size"
              onClick={() => navigate(`/view-weather/${val.id}`)}
            >
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
              <div className="view-weather-footer-base">
                <div
                  className="view-weather-footer-row"
                  style={{ width: "100%" }}
                >
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
