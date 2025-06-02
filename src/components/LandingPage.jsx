import { useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import PumpCalculator from "./PumpCalculator";
import SatelliteData from "./SatelliteData";
import SoilSensors from "./SoilSensors";
import WeatherForecast from "./WeatherForecast";
import AboutUs from "./AboutUs";
import AddField from "./AddField";
import MapWithDrawing from "./Maps";
import Sidebar from "./Sidebar";
import { FaCloudRain, FaDroplet, FaPlay } from "react-icons/fa6";
import { IoMdWarning } from "react-icons/io";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Dashboard from "./dashboard/Dashboard";

const LandingPage = ({ user }) => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tab, setTab] = useState("today");

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "addfield":
        return <AddField use={user} />;
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

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        user={user}
      />

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
        {/* <div className="p-4 space-y-4"> */}
        {!activeSection ? (
          <div className="p-4 space-y-4">
            {/* Header */}
            <div className="w-full flex justify-center">
              <button className="text-xl font-bold">My Field ▼</button>
            </div>

            {/* Alerts */}
            <div className="flex justify-between items-center space-x-2">
              <div className="w-3/4 flex-1 bg-white p-2 border rounded-lg flex items-center space-x-2">
                <IoMdWarning size={50} className="text-red-600 text-2xl" />
                <span className="text-xs font-semibold">
                  Heavy rains estimated for next week
                  <br />
                  DO NOT IRRIGATE
                </span>
              </div>
              <div className="w-1/4 bg-white p-2 border rounded-lg text-center">
                <FaCloudRain size={30} className="text-xl mx-auto" />
                <p className="text-sm">20°C</p>
              </div>
            </div>

            {/* Image slider */}
            <div className="relative">
              <img
                src="https://images.stockcake.com/public/b/1/9/b1946b22-59ae-4fb4-8046-569dbce5be7c_large/verdant-rice-fields-stockcake.jpg"
                alt="satellite"
                className="rounded-xl  w-full h-64 md:h-[500px]"
              />
              <button className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 rounded-full bg-white ">
                <MdKeyboardArrowLeft size={24} />
              </button>
              <button className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 rounded-full bg-white">
                <MdKeyboardArrowRight size={24} />
              </button>
            </div>

            {/* Label */}
            <div className="text-center text-sm font-semibold">
              Moisture maps (NDMI){" "}
              <span className="text-blue-500">stressed moisture</span>
            </div>

            {/* Irrigation Tracker */}
            <div className="w-auto justify-center">
              <h2 className="text-lg font-bold">Irrigation Tracker</h2>
              <div className="flex justify-around mt-2 text-sm font-medium border-b">
                {["today", "weekly", "monthly"].map((val) => (
                  <button
                    key={val}
                    className={`py-2 ${
                      tab === val ? "border-b-2 border-black" : ""
                    }`}
                    onClick={() => setTab(val)}
                  >
                    {val.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Tracker Content */}
              <div className="mt-4 text-center space-y-2">
                <p className="text-xs">12.2.25</p>
                <div className="flex justify-center gap-2">
                  <FaDroplet className="text-xl text-blue-500" />
                  <FaDroplet className="text-xl text-blue-500" />
                  <FaDroplet className="text-xl text-blue-500" />
                  <span className="text-sm">3 inches</span>
                </div>
                <p className="text-sm font-medium">
                  Run your pump for <span className="font-bold">1 hour</span>{" "}
                  today
                </p>
                <button className="flex items-center justify-center border rounded-full px-4 py-2 text-sm text-gray-800">
                  <FaPlay className="mr-2 text-gray-800" /> Start Timer
                </button>
              </div>
            </div>

            {/* Assist Buttons */}
            <div className="flex justify-around">
              <button className="border px-4 py-1 rounded-full text-xs">
                Voice Assistance
              </button>
              <button className="border px-4 py-1 rounded-full text-xs">
                Video Assistance
              </button>
            </div>
          </div>
        ) : (
          renderContent()
        )}
      </div>
    </div>
    // </div>
  );
};

export default LandingPage;
