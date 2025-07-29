import { useState, useEffect, useContext } from "react";
import { fetchWeather } from "../api/weather";
import { FiRefreshCw } from "react-icons/fi";
import { WiHumidity, WiStrongWind, WiDaySunny, WiRain, WiCloud } from "react-icons/wi";
import { webState } from "../App";

// Map Open-Meteo weather codes to readable conditions
const getConditionFromCode = (code) => {
  if ([0, 1].includes(code)) return "Sunny";
  if ([2, 3].includes(code)) return "Cloudy";
  if ([61, 63, 65, 80, 81, 82].includes(code)) return "Rainy";
  return "Cloudy"; // fallback
};

// const iconMap = {
//   Sunny: <WiDaySunny className="text-yellow-400 text-4xl" />,
//   Cloudy: <WiCloud className="text-gray-400 text-4xl" />,
//   Rainy: <WiRain className="text-blue-500 text-4xl" />,
// };
const iconMap = {
  0: <WiDaySunny className="text-yellow-400 text-4xl" />,     // Clear
  1: <WiDaySunny className="text-yellow-400 text-4xl" />,
  2: <WiCloud className="text-gray-400 text-4xl" />,           // Partly cloudy
  3: <WiCloud className="text-gray-500 text-4xl" />,
  80: <WiRain className="text-blue-500 text-4xl" />,           // Showers
  95: <WiRain className="text-blue-600 text-4xl" />,           // Thunderstorm
  96: <WiRain className="text-blue-700 text-4xl" />,
};

const WeatherForeCast = () => {
  const [weather, setWeather] = useState(null);
  const { field } = useContext(webState);

  const getWeather = async () => {
    if (!field?.coordinates?.[0]?.[0]) return;
    const lat = field.coordinates[0][0][1];
    const lon = field.coordinates[0][0][0];
    const data = await fetchWeather(lat, lon);
    setWeather(data);
  };

  useEffect(() => {
    getWeather();
  }, []);

  if (!weather) return <p className="text-center py-10">Loading weather data...</p>;

  const condition = getConditionFromCode(weather.current.weathercode);
  const forecast = weather.daily.time.slice(1, 4).map((date, i) => ({
    day: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
    date: new Date(date).toLocaleDateString("en-US", { day:'2-digit', month:'short', year:'numeric' }),
    temp: `${weather.daily.temperature_2m_max[i + 1]}°C`,
    condition: getConditionFromCode(weather.daily.weathercode[i + 1]),
    icon: iconMap[weather.daily.weathercode[i + 1]],
  }));

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">🌾 Weather Forecast</h2>

      {/* Current Weather */}
      <div className="bg-gradient-to-r from-green-100 to-white rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Farm</h3>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center">
            {iconMap[weather.current.weathercode]}
            <p className="text-4xl font-bold text-yellow-500">{weather.current.temperature}°C</p>
            <p className="text-gray-600">{condition}</p>
          </div>
          <div className="text-sm text-gray-600 space-y-2">
            <p className="flex items-center gap-2">
              {iconMap[weather.current.weathercode]} {getConditionFromCode(weather.current.weathercode)}
            </p>
            <p className="flex items-center gap-2">
              <WiStrongWind className="text-gray-500 text-xl" /> Wind: {weather.current.windspeed} km/h
            </p>
          </div>
        </div>
      </div>

      {/* Upcoming Forecast */}
      <h4 className="text-xl font-semibold text-gray-700 mb-4">🔮 Next 3 Days</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {forecast.map((day, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-lg shadow text-center hover:shadow-lg transition"
          >
            <p className="text-lg font-semibold text-gray-700 mb-1">{day.day}</p>
            <div className="flex justify-center mb-1">{day.icon}</div>
            <p className="text-gray-500">{day.condition}</p>
            <p className="text-2xl font-bold text-blue-600">{day.temp}</p>
            <div className="flex justify-center mb-1">{day.date}</div>
          </div>
        ))}
      </div>

      {/* Refresh Button */}
      <div className="text-center mt-10">
        <button
          onClick={getWeather}
          className="inline-flex items-center gap-2 px-5 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all shadow-lg"
        >
          <FiRefreshCw className="text-lg" />
          Refresh Forecast
        </button>
      </div>
    </div>
  );
};

export default WeatherForeCast;
