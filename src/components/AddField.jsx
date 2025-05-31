
export default function AddField() {
  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-sm rounded-lg shadow-md p-4">
        {/* Logo + Title */}
        <div className="flex items-center space-x-14 mb-4">
          <img
            src="https://www.smartlogger.tn/smart-irrigation-admin/assets/img/brand/logo-full.png"
            alt="Logo"
            className="w-14 h-14 relative left-0"
          />
          <h1 className="text-xl font-bold text-green-800">Add Field</h1>
        </div>

        {/* Map/Image Placeholder */}
        <img
           src="https://st2.depositphotos.com/3418487/46994/i/450/depositphotos_469941170-stock-photo-land-plot-aerial-view-identify.jpg" // Replace with your map image
          alt="Field Map"
          className="w-full h-40 object-cover rounded-md mb-4"
        />

        {/* Crop Details */}
        <div className="mb-4">
          <h2 className="text-sm font-semibold text-gray-600 mb-2">Crop Details</h2>
          <div className="flex space-x-2">
            <select className="w-1/2 p-2 border rounded-md">
              <option>Crop</option>
              <option>Wheat</option>
              <option>Rice</option>
              <option>Cotton</option>
            </select>
            <input
              type="date"
              className="w-1/2 p-2 border rounded-md"
              placeholder="Sowing Date"
            />
          </div>
        </div>

        {/* Pump Details */}
        <div className="mb-4">
          <h2 className="text-sm font-semibold text-gray-600 mb-2">Pump Details</h2>
          <div className="flex space-x-2">
            <select className="w-1/2 p-2 border rounded-md">
              <option>Pump Type</option>
              <option>Submersible</option>
              <option>Openwell</option>
              <option>Diesel</option>
            </select>
            <input
              type="number"
              placeholder="Discharge Capacity"
              className="w-1/2 p-2 border rounded-md"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1 ml-1">Liters per Minute</p>
        </div>

        {/* Add Field Label */}
        <div className="text-center text-gray-600 mb-4">Add Field</div>

        {/* Buttons */}
        <div className="flex justify-between items-center">
          <button className="bg-white border border-green-600 text-green-700 px-4 py-2 rounded-md w-1/3">
            Save
          </button>

          <button className="bg-white text-green-600 border border-green-600 rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold">
            +
          </button>

          <button className="bg-green-600 text-white px-4 py-2 rounded-md w-1/3">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
