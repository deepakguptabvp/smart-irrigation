import { useContext, useState } from "react";
// import axios from "axios";
import UserAxiosAPI from "../api/userAxiosAPI";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { webState } from "../App";
import MapWithDrawing from "./Maps";

export default function AddField({}) {
  const { user } = useContext(webState);
  const axios = UserAxiosAPI();
  const navigate = useNavigate();
  const [coordinates, setCoordinates] = useState(null)
  const [fields, setFields] = useState([
    { cropType: "", sowingDate: "", pumpType: "", dischargeCapacity: "" }
  ]);

  const handleChange = (index, key, value) => {
    const updated = [...fields];
    updated[index][key] = value;
    setFields(updated);
  };

  const addNewField = () => {
    setFields([...fields, { cropType: "", sowingDate: "", pumpType: "", dischargeCapacity: "" }]);
  };

  const handleSubmit = async () => {
    // const userId = ; // replace with actual userId
    if(!coordinates){
      toast.error("Draw a polygon of your field!");
      return;
    }
    for (let field of fields) {
      await axios.post("/fields/add-field", {
        userId:user?._id,coordinates,
        ...field
      });
    }
    toast.success("Fields added successfully!");
    navigate('/landingpage')
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col justify-center items-center">
      <div className="w-full h-auto max-w-sm rounded-lg shadow-md p-4">
        {/* ...header/logo as you already have... */}
        <div className="flex items-center space-x-14 mb-4">
          <img
            src="https://www.smartlogger.tn/smart-irrigation-admin/assets/img/brand/logo-full.png"
            alt="Logo"
            className="w-14 h-14 relative left-0"
          />
          <h1 className="text-xl font-bold text-green-800">Add Field</h1>
        </div>
        {fields.map((field, index) => (
          <div key={index}>
            <div
              src="https://st2.depositphotos.com/3418487/46994/i/450/depositphotos_469941170-stock-photo-land-plot-aerial-view-identify.jpg"
              alt="Field Map"
              className="w-full rounded-md mb-4"
            ><MapWithDrawing setCoordinates={setCoordinates}/></div>

            {/* Crop Details */}
            <div className="mb-4 mt-48">
              <h2 className="text-sm font-semibold text-gray-600 mb-2">Crop Details</h2>
              <div className="flex space-x-2">
                <select
                  className="w-1/2 p-2 border rounded-md"
                  value={field.cropType}
                  onChange={(e) => handleChange(index, "cropType", e.target.value)}
                >
                  <option>Crop</option>
                  <option>Wheat</option>
                  <option>Rice</option>
                  <option>Cotton</option>
                </select>
                <input
                  type="date"
                  className="w-1/2 p-2 border rounded-md"
                  value={field.sowingDate}
                  onChange={(e) => handleChange(index, "sowingDate", e.target.value)}
                />
              </div>
            </div>

            {/* Pump Details */}
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-gray-600 mb-2">Pump Details</h2>
              <div className="flex space-x-2">
                <select
                  className="w-1/2 p-2 border rounded-md"
                  value={field.pumpType}
                  onChange={(e) => handleChange(index, "pumpType", e.target.value)}
                >
                  <option>Pump Type</option>
                  <option>Submersible</option>
                  <option>Openwell</option>
                  <option>Diesel</option>
                </select>
                <input
                  type="number"
                  placeholder="Discharge Capacity"
                  className="w-1/2 p-2 border rounded-md"
                  value={field.dischargeCapacity}
                  onChange={(e) => handleChange(index, "dischargeCapacity", e.target.value)}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1 ml-1">Liters per Minute</p>
            </div>
          </div>
        ))}

        {/* Buttons */}
        <div className="flex justify-between items-center">
          <button className="bg-white border border-green-600 text-green-700 px-4 py-2 rounded-md w-1/3">
            Save
          </button>

          <button
            onClick={addNewField}
            className="bg-white text-green-600 border border-green-600 rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold"
          >
            +
          </button>

          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded-md w-1/3"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
