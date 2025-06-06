// import axios from "axios";
import UserAxiosAPI from "./userAxiosAPI";

export const fetchWeather = async (lat, lon) => {
  const axios = UserAxiosAPI();
  const res = await axios.post("https://map-backend-wz2x.vercel.app/proxy/weather", {
    lat,
    lon,
  });
  return res.data;
};
