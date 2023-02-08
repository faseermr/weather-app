import Axios from "axios";

export const weatherServices = (city_id) =>
  Axios.get(
    `https://api.openweathermap.org/data/2.5/weather?id=${city_id}&units=metric&&appid=${process.env.REACT_APP_API_KEY}`
  );
