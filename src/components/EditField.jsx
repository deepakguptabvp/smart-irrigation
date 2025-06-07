import { useContext, useEffect, useState } from "react";
import UserAxiosAPI from "../api/userAxiosAPI";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { webState } from "../App";
import MapWithDrawing from "./Maps";

export default function AddField({ existingField = null, isEdit = false }) {
  const { user } = useContext(webState);
  const axios = UserAxiosAPI();
  const navigate = useNavigate();

  const [coordinates, setCoordinates] = useState(null);
  const [fields, setFields] = useState([
    { cropType: "", sowingDate: "", pumpType: "", dischargeCapacity: "" }
  ]);

  // Prefill data in edit mode
  useEffect(() => {
    if (isEdit && existingField) {
      setFields([{
        cropType: existingField.cropType || "",
        sowingDate: existingField.sowingDate?.split("T")[0] || "",
        pumpType: existingField.pumpType || "",
        dischargeCapacity: existingField.dischargeCapacity || ""
      }]);
      setCoordinates(existingField.coordinates);
    }
  }, [isEdit, existingField]);

  const handleChange = (index, key, value) => {
    const updated = [...fields];
    updated[index][key] = value;
    setFields(updated);
  };

  const addNewField = () => {
    setFields([...fields, { cropType: "", sowingDate: "", pumpType: "", dischargeCapacity: "" }]);
  };

  const handleSubmit = async () => {
    if (!coordinates) {
      toast.error("Draw a polygon of your field!");
      return;
    }

    try {
      if (isEdit && existingField?._id) {
        await axios.put(`/fields/update-field/${existingField._id}`, {
          userId: user?._id,
          coordinates,
          ...fields[0]
        });
        toast.success("Field updated successfully!");
      } else {
        for (let field of fields) {
          await axios.post("/fields/add-field", {
            userId: user?._id,
            coordinates,
            ...field
          });
        }
        toast.success("Fields added successfully!");
      }

      navigate('/landingpage');
      window.location.reload();
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col justify-center items-center">
      <div className="w-full h-auto max-w-sm rounded-lg shadow-md py-4 p-2 md:p-4">
        <div className="flex items-center space-x-14 mb-4">
          <img
            src="https://www.smartlogger.tn/smart-irrigation-admin/assets/img/brand/logo-full.png"
            alt="Logo"
            className="w-14 h-14 relative left-0"
          />
          <h1 className="text-xl font-bold text-green-800">{isEdit ? "Edit Field" : "Add Field"}</h1>
        </div>

        {fields.map((field, index) => (
          <div key={index}>
            <div className="w-full rounded-md mb-4">
              <MapWithDrawing setCoordinates={setCoordinates} defaultCoordinates={coordinates} />
            </div>

            {/* Crop Details */}
            <div className="mb-4 mt-28">
              <h2 className="text-sm font-semibold text-gray-600 mb-2">Crop Details</h2>
              <div className="flex space-x-2">
                <div className="flex flex-col w-1/2">
                  <label htmlFor={`cropType-${index}`} className="text-xs text-gray-600 mb-1">Crop Type</label>
                  <select
                    id={`cropType-${index}`}
                    className="p-2 border rounded-md"
                    value={field.cropType}
                    onChange={(e) => handleChange(index, "cropType", e.target.value)}
                  >
                    <option>Crop</option>
                    <option>Wheat</option>
                    <option>Rice</option>
                    <option>Cotton</option>
                  </select>
                </div>
                <div className="flex flex-col w-1/2">
                  <label htmlFor={`sowingDate-${index}`} className="text-xs text-gray-600 mb-1">Sowing Date</label>
                  <input
                    id={`sowingDate-${index}`}
                    type="date"
                    className="p-2 border rounded-md"
                    value={field.sowingDate}
                    onChange={(e) => handleChange(index, "sowingDate", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Pump Details */}
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-gray-600 mb-2">Pump Details</h2>
              <div className="flex space-x-2">
                <div className="flex flex-col w-1/2">
                  <label htmlFor={`pumpType-${index}`} className="text-xs text-gray-600 mb-1">Pump Type</label>
                  <select
                    id={`pumpType-${index}`}
                    className="p-2 border rounded-md"
                    value={field.pumpType}
                    onChange={(e) => handleChange(index, "pumpType", e.target.value)}
                  >
                    <option>Pump Type</option>
                    <option>Submersible</option>
                    <option>Openwell</option>
                    <option>Diesel</option>
                  </select>
                </div>
                <div className="flex flex-col w-1/2">
                  <label htmlFor={`dischargeCapacity-${index}`} className="text-xs text-gray-600 mb-1">Discharge Capacity (LPM)</label>
                  <input
                    id={`dischargeCapacity-${index}`}
                    type="number"
                    placeholder="Discharge Capacity"
                    className="p-2 border rounded-md"
                    value={field.dischargeCapacity}
                    onChange={(e) => handleChange(index, "dischargeCapacity", e.target.value)}
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1 ml-1">Liters per Minute</p>
            </div>
          </div>
        ))}

        {/* Buttons */}
        <div className="flex justify-between items-center">
          {!isEdit && (
            <button
              onClick={addNewField}
              className="bg-white text-green-600 border border-green-600 rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold"
            >
              +
            </button>
          )}
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded-md w-full"
          >
            {isEdit ? "Update Field" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}
