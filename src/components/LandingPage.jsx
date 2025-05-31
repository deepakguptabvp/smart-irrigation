import { useState } from "react";
import { MdEditNote, MdSensors } from "react-icons/md";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { PiNotebookFill } from "react-icons/pi";
import { GrSatellite } from "react-icons/gr";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";

import PumpCalculator from "./PumpCalculator";
import EditField from "./EditField";
import SatelliteData from "./SatelliteData";
import SoilSensors from "./SoilSensors";
import WeatherForecast from "./WeatherForecast";
import AboutUs from "./AboutUs";
import AddField from "./AddField";
import MapWithDrawing from "./Maps";
import { FaMapMarkedAlt } from "react-icons/fa";

const LandingPage = ({user, setUser}) => {
  const [activeSection, setActiveSection] = useState("addfield");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case "addfield":
        return <AddField />;
      case "pump-calculator":
        return <PumpCalculator />;
      case "satellite-data":
        return <SatelliteData />;
      case "soil-sensors":
        return <SoilSensors />;
      case "map-polygon":
        return <MapWithDrawing />;
      case "weather-forecast":
        return <WeatherForecast />;
      case "about-us":
        return <AboutUs />;
      default:
        return (
          <div className="text-center text-gray-500 mt-10">
            Select an option from the menu.
          </div>
        );
    }
  };

  const MenuButton = ({ label, icon: Icon, value }) => (
    <button
      onClick={() => {
        setActiveSection(value);
        setSidebarOpen(false); // Close sidebar on mobile
      }}
      className={`flex items-center px-4 py-2 rounded-md w-full text-left hover:bg-green-100 ${
        activeSection === value ? "bg-green-200 font-semibold" : ""
      }`}
    >
      <Icon className="mr-2" size={20} />
      {label}
    </button>
  );

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "block" : "hidden"
        } fixed z-30 md:static md:block top-0 left-0 md:w-64 w-4/5 h-[100vh] bg-white shadow-lg p-3 transition-all duration-300 ease-in-out`}
      >
        {/* Sidebar Profile */}
        <div className="h-40 bg-green-100 rounded-xl flex flex-col items-center justify-center space-y-2">
          <CgProfile size={48} className="text-green-700" />
          <span className="text-lg font-semibold text-green-800">
            {user?.name||"User"}
          </span>
        </div>

        <MenuButton icon={MdEditNote} label="Edit Field" value="addfield" />
        <MenuButton
          icon={() => <span className="text-md cursor-pointer mr-2">💧</span>}
          label="Pump Calculator"
          value="pump-calculator"
        />
        <MenuButton
          icon={GrSatellite}
          label="Satellite Data"
          value="satellite-data"
        />
        <MenuButton
          icon={MdSensors}
          label="Soil Sensors"
          value="soil-sensors"
        />
        <MenuButton
          icon={FaMapMarkedAlt}
          label="Map Polygon"
          value="map-polygon"
        />
        <MenuButton
          icon={TiWeatherPartlySunny}
          label="Weather Forecast"
          value="weather-forecast"
        />
        <MenuButton icon={PiNotebookFill} label="About Us" value="about-us" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Topbar for mobile only */}
        <div className="md:hidden flex items-center justify-between px-4 py-2 bg-white shadow">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-green-700"
          >
            <HiOutlineMenuAlt3 size={28} />
          </button>
          <h1 className="text-lg font-bold text-green-700">Farmer Dashboard</h1>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-4">{renderContent()}</div>
      </div>
    </div>
  );
};

export default LandingPage;
