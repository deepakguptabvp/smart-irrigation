import React, { useState, useEffect } from "react";
import { PiDropThin } from "react-icons/pi";
import { FaArrowUpFromWaterPump } from "react-icons/fa6";
import { TbDropletOff } from "react-icons/tb";
import { TfiAlarmClock } from "react-icons/tfi";

const irrigationSchedule = [
  { week: 0, description: "Pre-sowing", inches: 3, liters: 308370 },
  { week: 1, description: "Emergence", inches: 1, liters: 102790 },
  { week: 2, description: "Seedling", inches: 1, liters: 102790 },
  { week: 3, description: "Seedling", inches: 2, liters: 205580 },
  { week: 4, description: "Early Veg.", inches: 2, liters: 205580 },
  { week: 5, description: "Veg. Growth", inches: 2, liters: 205580 },
  { week: 6, description: "Veg. Growth", inches: 2, liters: 205580 },
  { week: 7, description: "Square Init.", inches: 2, liters: 205580 },
  { week: 8, description: "Squaring", inches: 2, liters: 205580 },
  { week: 9, description: "Flowering", inches: 2, liters: 205580 },
  { week: 10, description: "Peak Flower", inches: 2, liters: 205580 },
  { week: 11, description: "Boll Form.", inches: 2, liters: 205580 },
  { week: 12, description: "Boll Dev.", inches: 2, liters: 205580 },
  { week: 13, description: "Boll Dev.", inches: 2, liters: 205580 },
  { week: 14, description: "Maturity", inches: 1.25, liters: 128000 },
  { week: 15, description: "Maturity", inches: 0.5, liters: 50000 },
  { week: 16, description: "Maturity", inches: 0, liters: 0 },
];

const IrrigationTabs = ({ tab, sowingDate }) => {
  // const [tab, setTab] = useState("today");
  const [currentDay, setCurrentDay] = useState(0);

  useEffect(() => {
    const sowDate = new Date(sowingDate);
    const today = new Date();
    const days = Math.floor((today - sowDate) / (1000 * 60 * 60 * 24)) + 1; // +1 for next day
    setCurrentDay(days);
  }, [sowingDate]);

  const currentWeek = Math.floor(currentDay / 7);
  const getIrrigation = (day) => {
    const week = Math.floor(day / 7);
    const data = irrigationSchedule[week] || { inches: 0, liters: 0 };
    let note = null;
    if (data.inches === 0) note = "No Irrigation";
    else if (data.inches <= 0.3) note = "Very Light";
    return { ...data, note };
  };



  const renderWaterDrops = (count) =>
    [...Array(Math.round(count))].map((_, i) => (
      <PiDropThin key={i} className="text-xl text-blue-400" />
    ));
  const getTime = (liters) => {
    const hours = liters / 308370;
    return hours < 1 ? `${Math.round(hours * 60)} min` : `${Math.round(hours)} hour`;
  };

  const timeFromLiters = (liters) => {
    if (liters === 0) return "0 min";
    const hours = liters / 308370;
    return hours < 1 ? `${Math.round(hours * 60)} min` : `${Math.round(hours)} hour`;
  };


  return (
    <div className="md:p-4">
      {/* <div className="flex justify-center mb-4">
        {["today", "weekly", "monthly"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`mx-2 px-4 py-2 rounded-full ${tab === t ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div> */}

      {tab === "today" && (() => {
        const todayData = getIrrigation(currentDay);
        return (
          <div className="mt-4 text-center flex justify-center space-y-3">
            {todayData.inches > 0 ? (
              <div className="flex flex-col justify-center my-8 gap-6">
                <div className="flex justify-between">
                  <p className="text-xs text-gray-500">Week {currentWeek+1}, Day {currentDay}</p>
                  <div className="mt-2 flex items-center justify-center gap-2 text-sm font-medium">
                    <FaArrowUpFromWaterPump className="text-3xl" />
                    <span>{getTime(todayData.liters)} today</span>
                  </div>
                  {/* Drops */}


                </div>

                <div className="flex justify-between">

                  {/* Liters and Time */}

                  <div className=" my-2">
                  <div className="flex justify-center my-2">
                    {[...Array(Math.round(todayData.inches))].map((_, i) => (
                      <PiDropThin key={i} className="text-blue-500 text-3xl" />
                    ))}
                  </div>
                     <div className="text-lg font-semibold">{todayData.inches} inches</div>
                  </div>

                 
                  {/* Timer Button */}
                  <div className="flex justify-center items-center font-bold text-xl">
                    <button className="flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-gray-800 mt-1">
                      <TfiAlarmClock className="text-4xl text-gray-800" />
                    </button>
                    Start Timer
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-red-500 flex flex-col items-center mt-6">
                <TbDropletOff className="text-4xl" />
                <p>{todayData.note}</p>
              </div>
            )}
          </div>
        );
      })()}

      {
        tab === "weekly" && (
          <div className="grid grid-cols-7 gap-0.5 md:gap-2 text-xs text-center mt-4">
            {[...Array(7)].map((_, i) => {
              const dayIndex = currentWeek * 7 + i + 1; // day numbers are 1-based
              const { inches, liters, note } = getIrrigation(dayIndex - 1); // 0-based
              const isToday = dayIndex === currentDay;
              return (
                <div key={i} className={`p-2 border rounded h-32 flex flex-col justify-center ${isToday ? "bg-green-100" : "bg-white"}`}>
                  <p className="font-semibold text-nowrap">Day {dayIndex}</p>
                  {inches > 0 ? (
                    <>
                      <div className="flex justify-center">
                        {[...Array(Math.round(inches))].map((_, j) => (
                          <PiDropThin key={j} className="text-blue-500 mt-2 text-lg" />
                        ))}
                      </div>
                      <p>{inches} in</p>
                      {/* <FaArrowUpFromWaterPump className="mx-auto mt-1 text-xl" /> */}
                      <p>{getTime(liters)}</p>
                      {note && <p className="text-yellow-500">{note}</p>}
                    </>
                  ) : (
                    <div className="text-red-500 flex flex-col items-center">
                      <TbDropletOff className="text-xl" />
                      <p>{note}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )
      }

      {
        tab === "monthly" && (
          <div className="grid grid-cols-7 gap-0.5 md:gap-2 text-xs text-center mt-4">
            {[...Array(30)].map((_, i) => {
              const dayNumber = i + 1;
              const { inches, liters, note } = getIrrigation(i);
              const isToday = dayNumber === currentDay;
              return (
                <div key={i} className={`p-2 border rounded h-32 flex flex-col justify-center ${isToday ? "bg-green-100" : note === "No Irrigation" ? "bg-red-50" : note === "Very Light" ? "bg-yellow-50" : "bg-white"}`}>
                  <p className="font-semibold text-nowrap">Day {dayNumber}</p>
                  {inches > 0 ? (
                    <>
                      <div className="flex justify-center">
                        {[...Array(Math.round(inches))].map((_, j) => (
                          <PiDropThin key={j} className="text-blue-500 mt-2 text-[1rem]" />
                        ))}
                      </div>
                      <p>{inches} in</p>
                      <FaArrowUpFromWaterPump className="mx-auto mt-1 text-xl" />
                      <p>{getTime(liters)}</p>
                      {note && <p className="text-yellow-500">{note}</p>}
                    </>
                  ) : (
                    <div className="text-red-500 flex flex-col items-center justify-center h-full">
                      <TbDropletOff className="text-xl" />
                      <p>{note}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )
      }

    </div >
  );
};

export default IrrigationTabs;
