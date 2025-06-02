import { useState } from "react";
const irrigationSchedule = {
  0: "3 inches",
  1: "—",
  2: "1 inch",
  3: "1 inch",
  4: "2 inches",
  5: "2 inches",
  6: "2 inches",
  7: "2 inches",
  8: "2 inches",
  9: "2 inches",
  10: "2 inches",
  11: "2 inches",
  12: "2 inches",
  13: "2 inches",
  14: "1–1.5 inch",
  15: "0–1 inch",
  16: "—",
  17: "—"
};

export default function IrrigationTabs({ week = 0, rain = 0 }) {
  const [tab, setTab] = useState('today');

  const recommendation = rain > 5 ? "Do not irrigate (Rain expected)" : (irrigationSchedule[week] || "—");

  return (
    <div>
      {/* Tabs */}
      <div className="flex justify-center mt-4 mb-2">
        {['today', 'weekly', 'monthly'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 font-semibold rounded-full mx-1 ${
              tab === t ? 'bg-black text-white' : 'bg-gray-200'
            }`}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow p-4">
        {tab === 'today' && (
          <div className="text-center space-y-4">
            <div className="text-lg font-medium">💧 {recommendation}</div>
            {rain <= 5 && (
              <>
                <div className="text-gray-700">Run your pump for <strong>1 hour</strong> today</div>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-full">Start Timer</button>
              </>
            )}
          </div>
        )}

        {tab === 'weekly' && (
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="text-center bg-gray-100 rounded p-3">
                <div className="font-semibold">Day {i + 1}</div>
                <div>💧 {irrigationSchedule[week + i] || "—"}</div>
                <div className="text-sm text-gray-600">45 mins</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'monthly' && (
          <div className="grid grid-cols-4 gap-2 text-center text-sm">
            {Object.entries(irrigationSchedule).map(([weekNum, value]) => (
              <div key={weekNum} className="bg-gray-50 border p-2 rounded">
                <div className="font-semibold">Week {weekNum}</div>
                <div>{value}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-center mt-4 gap-4">
        <button className="border px-4 py-2 rounded-full">🎙 Voice Assistance</button>
        <button className="border px-4 py-2 rounded-full">🎥 Video Assistance</button>
      </div>
    </div>
  );
}
