import { Outlet } from "react-router-dom";

const UserLayout = () => {
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
