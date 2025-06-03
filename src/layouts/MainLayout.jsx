import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { webState } from "../App";
import UserAxiosAPI from "../api/userAxiosAPI";

const UserLayout = () => {
  const axios = UserAxiosAPI();
  const navigate = useNavigate();
  const { setUser, setField } = useContext(webState);
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/user/me");
  
        console.log("User data:", data);
        setUser(data);
        setField(data?.fields?.[0])
      } catch (error) {
        console.error("Error fetching user:", error.response?.data || error.message);
      }
    };
  
    useEffect(() => {
      fetchUser();
    }, []);
  return (
    <>
      <div>
        {/* sidebar */}
        <Outlet />
      </div>
    </>
  );
};

export default UserLayout;
