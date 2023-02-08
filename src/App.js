import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import cities from "./resources/cities.json";
import "./App.css";
import Dashboard from "./components/Dashboard";
import ViewWeather from "./components/ViewWeather";
import Logo from "./components/Logo";
import { weatherServices } from "./services/http";

let cityCodeArr = [];
cities.List.map((val, idx) => {
  cityCodeArr.push(val.CityCode);
});

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const GetWeatherData = (city_id) => {
    weatherServices(city_id).then((result) => {
      setWeatherData((prev) => [...prev, result.data]);
    });
  };

  const GetWeatherDataByCityCode = () => {
    // console.log(cityCodeArr);
    for (let city of cityCodeArr) {
      GetWeatherData(city);
    }
  };

  useEffect(() => {
    GetWeatherDataByCityCode();
  }, []);

  return (
    <div className="container">
      <Logo />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard weatherData={weatherData} />} />
          <Route path="/view-weather/:id" element={<ViewWeather />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
