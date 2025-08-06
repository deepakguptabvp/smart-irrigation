import { useContext } from "react";
import { useState, useEffect } from "react";
import { webState } from "../App";
import { getAreaOfPolygon } from 'geolib';
const pumpDischargeMap = {
  submersible: 50,     // Example values (liters/min)
  booster: 40,
  surface: 35,
  turbine: 60,
  irrigation: 55,
  agriculture: 70,
  jet: 45,
};

const PumpCalculator = () => {
  const [selectedPump, setSelectedPump] = useState("");
  const [dischargeCapacity, setDischargeCapacity] = useState("");
  const [area, setArea] = useState("");
  const [litreSqM, setLitreSqM] = useState('');
  const [timeLeft, setTimeLeft] = useState(15); // Default 15 minutes
  const [timerRunning, setTimerRunning] = useState(false);
  const { user } = useContext(webState);
  const fields = user?.fields;
  // Auto-fill discharge when pump is selected
  useEffect(() => {
    if (selectedPump) {
      const key = selectedPump.toLowerCase();
      setDischargeCapacity(pumpDischargeMap[key] || "");
    } else {
      setDischargeCapacity("");
    }
  }, [selectedPump]);

  // Timer effect
  useEffect(() => {
    let interval;

    if (timerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 60000); // 1 minute
    }

    if (timeLeft === 0) {
      setTimerRunning(false);
    }

    return () => clearInterval(interval);
  }, [timerRunning, timeLeft]);

  const handleStartTimer = () => {
    if (!timerRunning && timeLeft > 0) {
      setTimerRunning(true);
    }
  };

  const handleReset = () => {
    setTimeLeft(15);
    setTimerRunning(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Pump Calculator</h2>

        {/* Pump Selector */}
        <select
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
          value={selectedPump}
          onChange={(e) => {
            const selectedField = JSON.parse(e.target.value);
            setSelectedPump(selectedField.pumpType);
            // console.log(selectedField)
            setDischargeCapacity(selectedField.dischargeCapacity);
            const coords = selectedField.coordinates[0].map(([lng, lat]) => ({ latitude: lat, longitude: lng }));
            const areaSqMeters = getAreaOfPolygon(coords).toFixed(2);
            setArea(areaSqMeters);
            // console.log(selectedField); // Optional
          }}
        >
          <option value="">Select Pump</option>
          {fields?.map((field, i) => {
            return <option key={i} value={JSON.stringify(field)}>{field.pumpType} ({`field-${i + 1}`})</option>
          })}
        </select>

        {/* Discharge Capacity */}
        <input
          type="text"
          placeholder="Pump Discharge Capacity (Auto-filled)"
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
          value={dischargeCapacity}
          readOnly
          onChange={(e) => setDischargeCapacity(e.target.value)}
        />
        {/* Discharge Capacity */}
        <input
          inputMode="numeric"
          placeholder="Litre req. per sqm."
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
          value={litreSqM}
          onChange={(e) => {
            setLitreSqM(e.target.value)
            const totalLiters = area * Number(e.target.value);
            const timeInSeconds = totalLiters / dischargeCapacity;
            const timeInMinutes = (timeInSeconds / 60).toFixed(2);

            setTimeLeft(timeInMinutes);
          }}
            
        />

        {/* Area Input */}
        <input
          type="text"
          placeholder="Area (sq. m)"
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
          value={area}
          readOnly
          onChange={(e) => setArea(e.target.value)}
        />

        {/* Time Left Display */}
        <input
          type="text"
          placeholder="Time Required"
          className="w-full border border-gray-300 rounded-md p-2 text-center font-medium text-xl text-gray-500 mb-6"
          value={`${timeLeft} min`}
          readOnly
        />

        {/* Timer Circle */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full border-4 border-black flex flex-col justify-center items-center text-black">
            <span className="text-3xl font-bold">{timeLeft}</span>
            <span className="text-sm -mt-1">min</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleStartTimer}
            disabled={timerRunning || timeLeft === 0}
            className={`flex-1 border border-black text-black rounded-full py-2 font-semibold transition ${timerRunning || timeLeft === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "hover:bg-black hover:text-white"
              }`}
          >
            {timeLeft === 0 ? "Done" : timerRunning ? "Running..." : "Start Timer"}
          </button>

          <button
            onClick={handleReset}
            className="flex-1 border border-red-500 text-red-500 rounded-full py-2 font-semibold hover:bg-red-500 hover:text-white transition"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default PumpCalculator;
