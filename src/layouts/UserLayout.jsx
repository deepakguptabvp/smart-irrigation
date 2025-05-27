import { Outlet } from "react-router-dom";


const UserLayout = () => {
  return (
    <>
      {/* <Navbar /> */}
      <div>
        {/* <Home/> */}
        <Outlet />
      </div>
    </>
  );
};

export default UserLayout;
