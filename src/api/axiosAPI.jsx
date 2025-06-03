import axios from "axios";

const axiosAPI = () => {
  const token =  localStorage.getItem("SIAdminToken");
  return axios.create({
    baseURL: window.location.hostname === "localhost"
  ? "http://localhost:5000/api" // Local development URL
  : window.location.hostname.includes("vercel")?"https://map-backend-wz2x.vercel.app/api":"/api", 
    headers: {
      Authorization: `Bearer ${token ? `${token}` : ""}`,
    },
  });
};

export default axiosAPI;
