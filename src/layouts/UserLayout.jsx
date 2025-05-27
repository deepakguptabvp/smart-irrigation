// import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <>
      {/* <Navbar /> */}
      <div>
        
        <Outlet />
      </div>
    </>
  );
};

export default UserLayout;
