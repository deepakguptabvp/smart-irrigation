import axios from "axios";

export const fetchGoogleWeather = async (lat, lon) => {
  const apiKey = "AIzaSyDkxwT1OheCGFd0Y4618qX9AIYsopibBRk"; // Replace with your actual key
  const res = await axios.post(
    `https://weather.googleapis.com/v1/currentConditions:lookup?key=${apiKey}&location.latitude=29.471397&location.longitude=77.696732`,
    {
      location: {
        latitude: '29.471397',
        longitude: '77.696732'
      },
      units: "METRIC"
    }
  );

  return res.data;
};
