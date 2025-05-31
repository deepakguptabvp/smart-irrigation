import { useState, useEffect } from "react";
import { FiMenu } from "react-icons/fi";

const PumpCalculator = () => {
  const [selectedPump, setSelectedPump] = useState("");
  const [dischargeCapacity, setDischargeCapacity] = useState("");
  const [area, setArea] = useState("");
  const [timeLeft, setTimeLeft] = useState(15); // Default 15 minutes
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (timerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 60000); // 1 minute interval
    }

    if (timeLeft === 0) {
      clearInterval(interval);
      setTimerRunning(false);
    }

    return () => clearInterval(interval);
  }, [timerRunning, timeLeft]);

  const handleStartTimer = () => {
    if (!timerRunning && timeLeft > 0) {
      setTimerRunning(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">

      {/* Form */}
      <div className="w-full max-w-md bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Pump Calculator</h2>

        <select
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
          value={selectedPump}
          onChange={(e) => setSelectedPump(e.target.value)}
        >
          <option value="">Select Pump</option>
          <option value="pump1">Submersible Pump</option>
          <option value="pump2">Booster Pump</option>
          <option value="pump2">Surface Pump</option>
          <option value="pump2">Turbine Pump</option>
          <option value="pump2">Irrigation Pump</option>
          <option value="pump2">Agriculture Pump</option>
          <option value="pump2">Jet Pump</option>
        </select>

        <input
          type="text"
          placeholder="Pump Discharge Capacity (Autofill)"
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
          value={dischargeCapacity}
          onChange={(e) => setDischargeCapacity(e.target.value)}
        />

        <input
          type="text"
          placeholder="Area (Autofill)"
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />

        <input
          type="text"
          placeholder="Time Required"
          className="w-full border border-gray-300 rounded-md p-2 text-center font-medium text-xl text-gray-500 mb-6"
          value={`${timeLeft} min`}
          readOnly
        />

        {/* Timer Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full border-4 border-black flex flex-col justify-center items-center text-black">
            <span className="text-3xl font-bold">{timeLeft}</span>
            <span className="text-sm -mt-1">min</span>
          </div>
        </div>

        {/* Start Timer Button */}
        <button
          onClick={handleStartTimer}
          disabled={timerRunning || timeLeft === 0}
          className={`w-full border border-black text-black rounded-full py-2 font-semibold transition ${
            timerRunning || timeLeft === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "hover:bg-black hover:text-white"
          }`}
        >
          {timeLeft === 0 ? "Done" : timerRunning ? "Running..." : "Start Timer"}
        </button>
      </div>
    </div>
  );
};

export default PumpCalculator;
