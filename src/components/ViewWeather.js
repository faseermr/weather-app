import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ViewWeatherFooter from "./ViewWeatherFooter";
import ViewWeatherHeader from "./ViewWeatherHeader";
import { weatherServices } from "../services/http";
import cities from "../resources/cities.json";

const ViewWeather = () => {
  const { id } = useParams();
  const [weatherData, setWeatherData] = useState([]);
  const [cacheData, setCacheData] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  // Function to add our data into cache
  const addDataIntoCache = (url, response, city) => {
    // Converting our response into Actual Response form
    const data = new Response(JSON.stringify(response));

    if ("caches" in window) {
      // Opening given cache and putting our data into it
      caches.open(city.CityCode).then((cache) => {
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
      }, city.expire_time * 1000);
    }
  };

  useEffect(() => {
    if (weatherData.length != 0 && cacheData == true) {
      let c = cities.List.find((val) => val.CityCode == weatherData.id);

      addDataIntoCache("https://localhost:3000", weatherData, c);
    }
  }, [weatherData, cacheData]);

  useEffect(() => {
    GetWeatherData(id);
  }, [id]);

  const GetWeatherData = async (city_id) => {
    let names = await caches.keys();

    // check cache wheather weather cache exists or not
    if (names.includes(city_id)) {
      const cacheStorage = await caches.open(city_id);
      const cachedResponse = await cacheStorage.match("https://localhost:3000");
      cachedResponse.json().then(async (item) => {
        // check wheather cache data same or not

        setWeatherData(item);
        setCacheData(false);
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
