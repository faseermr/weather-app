import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import cities from "./resources/cities.json";
import "./App.css";
import Dashboard from "./components/Dashboard";
import ViewWeather from "./components/ViewWeather";
import Logo from "./components/Logo";
import { weatherServices } from "./services/http";

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [cityCodeArr, setCityCodeArr] = useState([]);
  const [errMessage, setErrMessage] = useState("");

  // To add weather datas from api call
  const GetWeatherData = (city_id) => {
    weatherServices(city_id)
      .then((result) => {
        setWeatherData((prev) => [...prev, result.data]);
      })
      .catch((err) => {
        setErrMessage(err.message);
      });
  };

  const GetWeatherDataByCityCode = () => {
    for (let city of cityCodeArr) {
      GetWeatherData(city);
    }
  };

  useEffect(() => {
    // extract city codes from cities.json
    cities.List.map((val) => {
      cityCodeArr.push(val.CityCode);
    });

    GetWeatherDataByCityCode();
  }, []);

  return (
    <div className="container">
      <Logo />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard weatherData={weatherData} errMessage={errMessage} />
            }
          />
          <Route path="/view-weather/:id" element={<ViewWeather />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
