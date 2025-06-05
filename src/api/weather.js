import axios from "axios";

export const fetchWeather = async (lat, lon) => {
  const res = await axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
  );
  return res.data.current_weather;
};
