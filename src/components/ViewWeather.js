import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ViewWeatherFooter from "./ViewWeatherFooter";
import ViewWeatherHeader from "./ViewWeatherHeader";
import { weatherServices } from "../services/http";

const ViewWeather = () => {
  const { id } = useParams();
  const [weatherData, setWeatherData] = useState([]);
  const [cacheData, setCacheData] = useState(false);
  const [errMessage, setErrMessage] = useState("");

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

  useEffect(() => {
    if (weatherData.length != 0 && cacheData == true) {
      addDataIntoCache("WeatherCache", "https://localhost:3000", weatherData);
    }
  }, [weatherData, cacheData]);

  useEffect(() => {
    GetWeatherData(id);
  }, [id]);

  const GetWeatherData = async (city_id) => {
    let names = await caches.keys();

    // check cache wheather weather cache exists or not
    if (names.includes("WeatherCache")) {
      const cacheStorage = await caches.open("WeatherCache");
      const cachedResponse = await cacheStorage.match("https://localhost:3000");
      cachedResponse.json().then(async (item) => {
        // check wheather cache data same or not
        if (item.id == id) {
          setWeatherData(item);
          setCacheData(false);
        } else {
          try {
            const res = await weatherServices(city_id);
            setWeatherData(res.data);
            setCacheData(true);
          } catch (err) {
            setErrMessage(err.message);
          }
        }
      });
    } else {
      try {
        const res = await weatherServices(city_id);
        setWeatherData(res.data);
        setCacheData(true);
      } catch (err) {
        setErrMessage(err.message);
      }
    }
  };

  return (
    <React.Fragment>
      {weatherData != 0 ? (
        <>
          <ViewWeatherHeader val={weatherData} />

          <ViewWeatherFooter val={weatherData} />
        </>
      ) : (
        <div className="error-message">{errMessage}</div>
      )}
    </React.Fragment>
  );
};

export default ViewWeather;
