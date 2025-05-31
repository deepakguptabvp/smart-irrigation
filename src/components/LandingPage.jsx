import { useState } from "react";
import { MdEditNote, MdSensors } from "react-icons/md";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { PiNotebookFill } from "react-icons/pi";
import { GrSatellite } from "react-icons/gr";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import PumpCalculator from "./PumpCalculator";
import EditField from "./EditField";
import SatelliteData from "./SatelliteData";
import SoilSensors from "./SoilSensors";
import WeatherForecast from "./WeatherForecast";
import AboutUs from "./AboutUs";
import { CgProfile } from "react-icons/cg";

const LandingPage = () => {
  const [activeSection, setActiveSection] = useState("pump-calculator");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case "edit-field":
        return <EditField />;
      case "pump-calculator":
        return <PumpCalculator />;
      case "satellite-data":
        return <SatelliteData />;
      case "soil-sensors":
        return <SoilSensors />;
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
        setSidebarOpen(false);
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
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Mobile Topbar */}
      <div className="md:hidden flex items-center justify-between px-4 py-2 bg-white shadow">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-green-700"
        >
          <HiOutlineMenuAlt3 size={28} />
        </button>
        <h1 className="text-lg font-bold text-green-700">Farmer Dashboard</h1>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "block" : "hidden"
        } absolute md:relative top-0 left-0 md:w-64 w-4/5 h-full bg-white shadow-lg p-3 z-20 transition-all duration-300 ease-in-out`}
      >
        {/* Sidebar Profile  */}
        <div className="h-40 bg-green-100 rounded-xl flex flex-col items-center justify-center space-y-2">
          {/* Large Profile Icon */}
          <CgProfile size={48} className="text-green-700" />

          {/* Username or Label */}
          <span className="text-lg font-semibold text-green-800">
            User Profile
          </span>
        </div>
        <MenuButton icon={MdEditNote} label="Edit Field" value="edit-field" />
        <MenuButton
          icon={() => <span className="text-md mr-2">💧</span>}
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
          icon={TiWeatherPartlySunny}
          label="Weather Forecast"
          value="weather-forecast"
        />
        <MenuButton icon={PiNotebookFill} label="About Us" value="about-us" />
      </div>

      {/* Main Content */}
      <div className="flex-1 z-0 md:mt-0">{renderContent()}</div>
    </div>
  );
};

export default LandingPage;
