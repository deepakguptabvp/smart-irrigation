const SatelliteData = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Satellite Data Overview</h2>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Example Image */}
        <img
          src="https://via.placeholder.com/800x400.png?text=Satellite+Imagery"
          alt="Satellite data"
          className="w-full h-auto object-cover"
        />

        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">NDVI Crop Health</h3>
          <p className="text-sm text-gray-600">
            This map shows NDVI data (Normalized Difference Vegetation Index), which indicates crop
            health across your farmland. Dark green areas are healthier crops, while yellow to red
            indicates stress or poor vegetation.
          </p>
        </div>
      </div>

      {/* Optional: Add a refresh or update data button */}
      <div className="mt-4 text-right">
        <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
          Refresh Data
        </button>
      </div>
    </div>
  );
};

export default SatelliteData;
