function WeatherCard({ rainForecast, temperature }) {
  return (
    <div className="flex justify-between items-center bg-white rounded-xl shadow p-4 mb-4">
      <div className="flex items-center gap-2">
        <div className="text-red-600 font-bold">⚠️ Heavy rains estimated</div>
        <div className="text-sm">DO NOT IRRIGATE</div>
      </div>
      <div className="text-xl font-bold">🌧 {temperature}°C</div>
    </div>
  );
}
