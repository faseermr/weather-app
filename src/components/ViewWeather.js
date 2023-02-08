import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import ViewWeatherFooter from "./ViewWeatherFooter";
import ViewWeatherHeader from "./ViewWeatherHeader";
import { weatherServices } from "../services/http";

const ViewWeather = () => {
  const { id } = useParams();
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    // console.log(id);
    GetWeatherData(id);
  }, [id]);

  const GetWeatherData = async (city_id) => {
    const res = await weatherServices(city_id);
    // console.log(res);
    setWeatherData(res.data);
    // console.log(weatherData);
  };

  return (
    <React.Fragment>
      <ViewWeatherHeader val={weatherData} />

      <ViewWeatherFooter val={weatherData} />
    </React.Fragment>
  );
};

export default ViewWeather;
