const SoilSensors = () => {
  const sensorData = {
    moisture: "32%",
    temperature: "27°C",
    pH: "6.5",
    lastUpdated: "May 27, 2025, 10:30 AM"
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Soil Sensor Data</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Moisture Card */}
        <div className="bg-white shadow rounded-lg p-4 flex flex-col items-center">
          <p className="text-lg font-medium text-gray-700 mb-2">Soil Moisture</p>
          <p className="text-3xl font-bold text-blue-600">{sensorData.moisture}</p>
        </div>

        {/* Temperature Card */}
        <div className="bg-white shadow rounded-lg p-4 flex flex-col items-center">
          <p className="text-lg font-medium text-gray-700 mb-2">Temperature</p>
          <p className="text-3xl font-bold text-red-600">{sensorData.temperature}</p>
        </div>

        {/* pH Level Card */}
        <div className="bg-white shadow rounded-lg p-4 flex flex-col items-center">
          <p className="text-lg font-medium text-gray-700 mb-2">Soil pH</p>
          <p className="text-3xl font-bold text-green-600">{sensorData.pH}</p>
        </div>
      </div>

      {/* Last Updated Info */}
      <p className="mt-6 text-sm text-gray-500 text-center">
        Last updated: {sensorData.lastUpdated}
      </p>

      {/* Refresh Button */}
      <div className="text-center mt-4">
        <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
          Refresh Data
        </button>
      </div>
    </div>
  );
};

export default SoilSensors;
