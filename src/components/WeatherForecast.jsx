const WeatherForeCast = () => {
  const weatherData = {
    location: "Your Farm, India",
    current: {
      temperature: "30°C",
      condition: "Sunny",
      wind: "12 km/h",
      humidity: "58%",
    },
    forecast: [
      { day: "Tue", condition: "Cloudy", temp: "28°C" },
      { day: "Wed", condition: "Rainy", temp: "25°C" },
      { day: "Thu", condition: "Sunny", temp: "31°C" },
    ],
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Weather Forecast</h2>

      {/* Current Weather */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{weatherData.location}</h3>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center">
            <p className="text-4xl font-bold text-yellow-500">{weatherData.current.temperature}</p>
            <p className="text-gray-600">{weatherData.current.condition}</p>
          </div>
          <div className="text-sm text-gray-600 space-y-1">
            <p>💧 Humidity: {weatherData.current.humidity}</p>
            <p>🌬️ Wind: {weatherData.current.wind}</p>
          </div>
        </div>
      </div>

      {/* Upcoming Forecast */}
      <h4 className="text-lg font-semibold text-gray-700 mb-2">Next 3 Days</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {weatherData.forecast.map((day, index) => (
          <div key={index} className="bg-white p-4 rounded shadow text-center">
            <p className="font-semibold text-gray-700">{day.day}</p>
            <p className="text-sm text-gray-500">{day.condition}</p>
            <p className="text-xl font-bold text-blue-500">{day.temp}</p>
          </div>
        ))}
      </div>

      {/* Refresh Button */}
      <div className="text-center mt-6">
        <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
          Refresh Forecast
        </button>
      </div>
    </div>
  );
};

export default WeatherForeCast;
