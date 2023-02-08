import React, { useState, useEffect } from "react";
import cities from "../resources/cities.json";
import { FiNavigation } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { monthNames } from "../resources";

let cityCodeArr = [];
cities.List.map((val, idx) => {
  cityCodeArr.push(val.CityCode);
});

const Dashboard = ({ weatherData }) => {
  const navigate = useNavigate();

  return (
    <div style={{ width: "70%" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
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

      <div style={{ display: "flex", flexWrap: "wrap", cursor: "pointer" }}>
        {weatherData.map((val, idx) => {
          return (
            <div
              key={idx}
              className="box-size"
              style={{ minHeight: "252px" }}
              onClick={() => navigate(`/view-weather/${val.id}`)}
            >
              <div
                style={{
                  height: "50%",
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
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
              <div style={{ height: "50%" }}>
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
