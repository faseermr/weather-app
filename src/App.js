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
  const [cacheData, setCacheData] = useState(false);

  // Function to add our data into cache
  const addDataIntoCache = (cacheName, url, response) => {
    // Converting our response into Actual Response form
    const data = new Response(JSON.stringify(response));

    if ("caches" in window) {
      // Opening given cache and putting our data into it
      caches.open(cacheName).then((cache) => {
        cache.put(url, data);
      });

      // to delete cache after 5 min
      setTimeout(() => {
        caches.keys().then((names) => {
          names.forEach((name) => {
            caches.delete(name);
          });
        });
        setCacheData(false);
      }, 5 * 60 * 1000);
    }
  };

  // To add weather datas from api call
  const GetWeatherData = async (city_id) => {
    let names = await caches.keys();

    // check cache wheather weather cache exists or not
    if (names.includes("WeatherAllCache")) {
      const cacheStorage = await caches.open("WeatherAllCache");
      const cachedResponse = await cacheStorage.match("https://localhost:3000");
      cachedResponse.json().then(async (item) => {
        setWeatherData(item);
        setCacheData(false);
      });
    } else {
      weatherServices(city_id)
        .then((result) => {
          setWeatherData((prev) => [...prev, result.data]);
          setCacheData(true);
        })
        .catch((err) => {
          setErrMessage(err.message);
        });
    }
  };

  const GetWeatherDataByCityCode = () => {
    for (let city of cityCodeArr) {
      GetWeatherData(city);
    }
  };

  useEffect(() => {
    if (weatherData.length != 0 && cacheData == true) {
      addDataIntoCache(
        "WeatherAllCache",
        "https://localhost:3000",
        weatherData
      );
    }
  }, [weatherData, cacheData]);

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
