import axios from "axios";
import Cookies from "js-cookie";
const UserAxiosAPI = () => {
  const token = Cookies.get("SIUserToken");
  return axios.create({
    baseURL: window.location.hostname === "localhost"
  ? "http://localhost:5000/api" // Local development URL
  : window.location.hostname.includes("vercel")?"https://map-backend-nine.vercel.app/api":"/api", 
    headers: {
      Authorization: `Bearer ${token ? `${token}` : ""}`,
    },
  });
};

export default UserAxiosAPI;
