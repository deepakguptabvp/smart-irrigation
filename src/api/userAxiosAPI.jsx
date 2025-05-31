import axios from "axios";
import Cookies from "js-cookie";
const UserAxiosAPI = () => {
  const token = Cookies.get("SIUserToken");
  return axios.create({
    baseURL: "https://map-backend-nine.vercel.app/api",
    // window.location.hostname === "localhost"
    // ? "http://localhost:5000/api" // Local development URL
    //   : ,
    // ,,
    headers: {
      Authorization: `Bearer ${token ? `${token}` : ""}`,
    },
  });
};

export default UserAxiosAPI;
