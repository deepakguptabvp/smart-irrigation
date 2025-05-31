import { useState } from "react";

const EditField = () => {
  const [fieldData, setFieldData] = useState({
    fieldName: "",
    area: "",
    cropType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFieldData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here (e.g., send to backend or save to state)
    console.log("Submitted:", fieldData);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold text-green-700 mb-4">Edit Field Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Field Name */}
        <div>
          <label htmlFor="fieldName" className="block text-sm font-medium text-gray-700">
            Field Name
          </label>
          <input
            type="text"
            id="fieldName"
            name="fieldName"
            value={fieldData.fieldName}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            placeholder="e.g., South Plot"
          />
        </div>

        {/* Area */}
        <div>
          <label htmlFor="area" className="block text-sm font-medium text-gray-700">
            Area (in acres)
          </label>
          <input
            type="number"
            id="area"
            name="area"
            value={fieldData.area}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            placeholder="e.g., 2.5"
          />
        </div>

        {/* Crop Type */}
        <div>
          <label htmlFor="cropType" className="block text-sm font-medium text-gray-700">
            Crop Type
          </label>
          <input
            type="text"
            id="cropType"
            name="cropType"
            value={fieldData.cropType}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            placeholder="e.g., Wheat"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          Save Field
        </button>
      </form>
    </div>
  );
};

export default EditField;
