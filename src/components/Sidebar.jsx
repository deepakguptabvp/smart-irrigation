import { MdEditNote, MdSensors } from "react-icons/md";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { PiNotebookFill } from "react-icons/pi";
import { GrSatellite } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { FaMapMarkedAlt, FaSignOutAlt } from "react-icons/fa";
import { HiX } from "react-icons/hi";
import { useContext } from "react";
import { webState } from "../App";

const Sidebar = ({

  activeSection,
  setActiveSection,
  sidebarOpen,
  setSidebarOpen,
}) => {
  // const [showModal, setShowModal] = useState(false);

  // const handleLogout = () => {
  //   // Perform post-logout logic (redirect, toast, etc.)
  //   console.log("Logged out");
  //   setShowModal(false);
  // };
  const { user } = useContext(webState)
  const MenuButton = ({ label, icon: Icon, value }) => (
    <button
      onClick={() => {
        setActiveSection(value);
        setSidebarOpen(false); // Close on selection
      }}
      className={`flex items-center px-4 py-2 rounded-md w-full text-left hover:bg-green-100 ${activeSection === value ? "bg-green-200 font-semibold" : ""
        }`}
    >
      <Icon className="mr-2" size={20} />
      {label}
    </button>
  );
  return (
    <div style={{zIndex:250}} 
      className={`${sidebarOpen ? "block" : "hidden"
        } fixed z-30 min-h-[100vh] md:static md:block top-0 left-0 md:w-64 w-4/5  bg-white shadow-lg p-3 transition-all duration-300 ease-in-out`}
    >
      {/* Close Button (Mobile only) */}
      <div className="md:hidden flex justify-end mb-2">
        <button
          onClick={() => setSidebarOpen(false)}
          className="text-green-700 hover:text-green-900"
        >
          <HiX size={28} />
        </button>
      </div>

      {/* Profile Block */}
      <div className="h-40 bg-green-100 rounded-xl flex flex-col items-center justify-center space-y-2 mb-4">
        <CgProfile size={48} className="text-green-700" />
        <span className="text-lg font-semibold text-green-800">
          {user?.name || "User"}
        </span>
      </div>

      {/* Menu Items */}
      <MenuButton icon={MdEditNote} label="Dashboard" value="dashboard" />
      <MenuButton icon={MdEditNote} label="Add New Field" value="addfield" />
      <MenuButton icon={() => <span className="text-md mr-2">💧</span>} label="Pump Calculator" value="pump-calculator" />
      <MenuButton icon={GrSatellite} label="Satellite Data" value="satellite-data" />
      <MenuButton icon={MdSensors} label="Soil Sensors" value="soil-sensors" />
      {/* <MenuButton icon={FaMapMarkedAlt} label="Map Polygon" value="map-polygon" /> */}
      <MenuButton icon={TiWeatherPartlySunny} label="Weather Forecast" value="weather-forecast" />
      {/* <MenuButton icon={PiNotebookFill} label="About Us" value="about-us" /> */}
      <MenuButton icon={FaSignOutAlt} label="Log Out" value="logout" />
    </div>
  );
};

export default Sidebar;
