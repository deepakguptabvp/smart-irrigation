import React, { useContext, useEffect, useState } from "react";
// import { IoMdWarning } from "react-icons/io";
import { FaArrowUpFromWaterPump, FaDroplet, FaPlay } from "react-icons/fa6";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { fetchNDMI } from "../../api/satelite";
import { fetchWeather } from "../../api/weather";
import { PiDropThin } from "react-icons/pi";
import { TfiAlarmClock } from "react-icons/tfi";
import { TbDropletOff } from "react-icons/tb";
import NDMIMap from "./NDMIMap";
import { IoMdWarning } from "react-icons/io";
import { FaCloudSun, FaCloudRain, FaSun, FaCloud } from "react-icons/fa";
import { webState } from "../../App";
const schedule = [
    { "week": 1, "description": "Emergence", "inches": 1, "liters": 102790 },
    { "week": 2, "description": "Seedling", "inches": 1, "liters": 102790 },
    { "week": 3, "description": "Seedling", "inches": 2, "liters": 205580 },
    { "week": 4, "description": "Early Veg.", "inches": 2, "liters": 205580 },
    { "week": 5, "description": "Veg. Growth", "inches": 2, "liters": 205580 },
    { "week": 6, "description": "Veg. Growth", "inches": 2, "liters": 205580 },
    { "week": 7, "description": "Square Init.", "inches": 2, "liters": 205580 },
    { "week": 8, "description": "Squaring", "inches": 2, "liters": 205580 },
    { "week": 9, "description": "Flowering", "inches": 2, "liters": 205580 },
    { "week": 10, "description": "Peak Flower", "inches": 2, "liters": 205580 },
    { "week": 11, "description": "Boll Form.", "inches": 2, "liters": 205580 },
    { "week": 12, "description": "Boll Dev.", "inches": 2, "liters": 205580 },
    { "week": 13, "description": "Boll Dev.", "inches": 2, "liters": 205580 },
    { "week": 14, "description": "Maturity", "inches": 1.25, "liters": 128500 },
    { "week": 15, "description": "Maturity", "inches": 0.5, "liters": 51500 }
]

const Dashboard = () => {
    const [advice, setAdvice] = useState("");
    const { user, setField, field } = useContext(webState);
    const [tab, setTab] = useState("today");
    const [weather, setWeather] = useState(null);
    const [ndmiImage, setNdmiImage] = useState("");
    const [loading, setLoading] = useState(true);
    const [dominantWeather, setDominantWeather] = useState("");
    const [ndmi, setNdmi] = useState("");
    const [valid, setValid] = useState(true);

    const getAdvice = (code, temp) => {
        if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
            // Rainy or drizzle
            return "Heavy rains expected — DO NOT IRRIGATE";
        }
        if ([95, 96, 99].includes(code)) {
            // Thunderstorm
            return "Thunderstorms ahead — DO NOT IRRIGATE";
        }
        if ([71, 73, 75, 77].includes(code)) {
            return "Snow conditions — irrigation not needed";
        }
        if (code === 0) {
            // Clear sky
            if (temp > 35) {
                return "Heatwave detected — irrigate carefully, avoid daytime watering";
            } else if (temp > 25) {
                return "Warm sunny day — normal irrigation recommended";
            } else {
                return "Cool clear weather — moderate irrigation";
            }
        }
        if ([1, 2, 3].includes(code)) {
            return "Cloudy or overcast — reduce irrigation slightly";
        }
        if ([45, 48].includes(code)) {
            return "Foggy conditions — moderate irrigation";
        }

        return "Weather stable — use your usual irrigation schedule";
    };
    const fetchData = async () => {
        try {
            console.log(field);
            const geometry = field?.coordinates;

            const ndmi = await fetchNDMI(geometry, field?.sowingDate);
            setNdmiImage(ndmi.image_base64);
            setNdmi(ndmi);
            const waether = await fetchWeather(field?.coordinates?.[0]?.[0]?.[1], field?.coordinates?.[0]?.[0]?.[0]);
            setWeather(waether);
            const current = waether.current_weather;
            setAdvice(getAdvice(current?.weathercode, current?.temperature));
            console.log(waether, current)
        } catch (err) {
            console.error("Failed to fetch data", err);
        } finally {
            setLoading(false);
        }
    };
    const getIcon = () => {
        if (!weather) return null;
        const code = weather.weathercode;
        if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
            return <FaCloudRain size={30} className="text-blue-600 mx-auto" />;
        }
        if ([95, 96, 99].includes(code)) {
            return <IoMdWarning size={30} className="text-red-600 mx-auto" />;
        }
        if ([0].includes(code)) {
            return <FaSun size={30} className="text-yellow-500 mx-auto" />;
        }
        if ([1, 2, 3, 45, 48].includes(code)) {
            return <FaCloud size={30} className="text-gray-500 mx-auto" />;
        }
        return <FaCloudSun size={30} className="mx-auto" />;
    };
    const sowingDate = field?.sowingDate ? new Date(field.sowingDate) : null;
    const today = new Date();

    const [daysSinceSowing, setDaysSinceSowing] = useState(0);
    const [currentWeek, setCurrentWeek] = useState(0);
    const [irrigationData, setIrrigationData] = useState(null);
    useEffect(() => {
        if (field) {
            const sowingDate = new Date(field.sowingDate);
            const today = new Date();

            if (!isNaN(sowingDate)) {
                if (sowingDate > today) {
                    setValid(false);
                    setDaysSinceSowing(null);
                    setCurrentWeek(null);
                    setIrrigationData(null);
                    return;
                } else {
                    setValid(true);
                }

                const days = Math.floor((today - sowingDate) / (1000 * 60 * 60 * 24));
                const week = Math.floor(days / 7) + 1;
                setDaysSinceSowing(days);
                setCurrentWeek(week);

                const matchedData = schedule.find(item => item.week === week);
                setIrrigationData(matchedData || null);
                // console.log(field?.sowingDate)
            }
        }
    }, [field]);
    useEffect(() => {
        if (user && field) {
            console.log(field)
            fetchData();
        }
    }, [user, field]);
    function getDominantWeatherAndColor(area_summary_ha, legend) {
        let maxLabel = null;
        let maxArea = -Infinity;

        for (const [label, area] of Object.entries(area_summary_ha)) {
            if (area > maxArea) {
                maxArea = area;
                maxLabel = label;
            }
        }

        const legendEntry = legend.find((l) => l.label === maxLabel);

        return {
            color: legendEntry ? legendEntry.color : "#000000",
            weather: maxLabel || "Unknown"
        };
    }

    useEffect(() => {
        if (ndmi) {
            const wther = getDominantWeatherAndColor(ndmi?.area_summary_ha, ndmi?.legend);
            setDominantWeather(wther);
        }
    }, [ndmi])
    // console.log(field?.length>0)
    return (
        <div className="md:p-4 space-y-4">
            <div className="w-full flex justify-center">
                <select
                    className="text-xl font-bold p-2 rounded border border-gray-300"
                    value={JSON.stringify(field)} // <-- stringify for comparison
                    onChange={(e) => setField(JSON.parse(e.target.value))} // <-- parse to store full object
                >
                    <option value="" disabled>
                        My Field ▼
                    </option>
                    {user?.fields?.map((fieldItem, index) => (
                        <option key={index} value={JSON.stringify(fieldItem)}>
                            field-{index + 1}
                        </option>
                    ))}
                </select>
            </div>

            {/* Header */}
            {!field ? <div className="flex justify-between items-center space-x-2">
                <div className="w-3/4 flex-1 flex border border-gray-500 p-3 rounded-md items-center space-x-2">
                    No field selected
                </div>
            </div> :
                !valid ? <div className="flex justify-between items-center h-full space-x-2">
                    <div className="w-3/4 flex-1 flex border border-gray-500 p-3 rounded-md items-center space-x-2">
                        Selected Field date is in future
                    </div>
                </div> : <>



                    {/* Alerts */}
                    {field && <div className="flex justify-between items-center space-x-2">
                        <div className="w-3/4 flex-1 flex border border-gray-500 p-3 rounded-md items-center space-x-2">
                            <IoMdWarning size={50} className="text-red-600" />
                            <span className="text-sm font-semibold">{loading ? "Loading advice..." : advice}</span>
                        </div>

                        <div className="w-1/4 text-center p-2 border rounded-lg bg-white">
                            {loading ? "..." : getIcon()}
                            <p className="text-lg mt-1">{loading ? "" : `${weather?.temperature}°C`}</p>
                        </div>
                    </div>}

                    {ndmi ? <NDMIMap coordinates={user?.fields[0]?.coordinates?.[0]} legend={ndmi?.legend} area_summary_ha={ndmi?.area_summary_ha} ndmiBase64={ndmiImage} ndmiBounds={user?.fields[0]?.coordinates} /> : <div className="flex justify-center my-6">Please Wait...</div>}
                    {/* <MoistureMapWithLegend img={ndmiImage} /> */}
                    {/* Satellite Image */}
                    {/* 78.6800480473868, 20.47719919671666,78.68043249745475, 20.477961387625218,78.68120139693579, 20.477777121886653,78.68094211716758, 20.47688091778385 */}
                    {/* <div className="relative">
                <img
                    src={
                        ndmiImage
                            ? `data:image/jpeg;base64,${ndmiImage}`
                            : "https://images.stockcake.com/public/b/1/9/b1946b22-59ae-4fb4-8046-569dbce5be7c_large/verdant-rice-fields-stockcake.jpg"
                    }
                    alt="satellite"
                    className="rounded-xl w-full h-64 md:h-[500px]"
                />
                <button className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 rounded-full bg-white ">
                    <MdKeyboardArrowLeft size={24} />
                </button>
                <button className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 rounded-full bg-white">
                    <MdKeyboardArrowRight size={24} />
                </button>
            </div> */}

                    {/* Label */}
                    <div className="text-center text-sm font-semibold">
                        Moisture maps (NDMI){" "}
                        <span className={`text-blue-500`}>{dominantWeather.weather}</span>
                    </div>

                    {/* Irrigation Tracker */}
                    <div className="w-auto justify-center">
                        <h2 className="text-lg font-bold">Irrigation Tracker</h2>
                        <div className="flex justify-around mt-2 text-sm font-medium border-b">
                            {["today", "weekly", "monthly"].map((val) => (
                                <button
                                    key={val}
                                    className={`py-2 ${tab === val ? "border-b-2 border-black" : ""
                                        }`}
                                    onClick={() => setTab(val)}
                                >
                                    {val.toUpperCase()}
                                </button>
                            ))}
                        </div>

                        {/* Tracker Content */}
                        {/* Tracker Content */}
                        {tab === "today" && irrigationData && (
                            <div className="mt-4 text-center flex justify-around space-y-3">
                                <div className="flex flex-col justify-around my-8 gap-6">
                                    <p className="text-xs text-gray-500">Week {currentWeek}, Day {daysSinceSowing}</p>
                                    <div>
                                        <div className="flex justify-center gap-1">
                                            {[...Array(irrigationData)].map((_, i) => (
                                                <PiDropThin key={i} className="text-4xl" />
                                            ))}
                                        </div>
                                        <div className="text-lg font-semibold">{irrigationData.inches} inches</div>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-around my-8 gap-6">
                                    <div className="flex justify-center items-center gap-2 text-sm">
                                        <FaArrowUpFromWaterPump className="text-5xl" />
                                        <span className="font-bold">
                                            ~
                                            {(() => {
                                                const hours = irrigationData.liters / 308370;
                                                if (hours < 1) {
                                                    return `${Math.round(hours * 60)} min`;
                                                }
                                                return `${Math.round(hours)} hour`;
                                            })()}
                                        </span>{' '}
                                        today
                                    </div>
                                    <div className="flex justify-center items-center font-bold text-xl">
                                        <button className="flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-gray-800 mt-1">
                                            <TfiAlarmClock className="text-4xl text-gray-800" />
                                        </button>
                                        Start Timer
                                    </div>
                                </div>
                            </div>
                        )}

                        {tab === "weekly" && (
                            <div className="grid grid-cols-7 gap-[6px] text-[10px] mt-4 text-center">
                                {[
                                    { day: "Sunday", inches: 3, mins: 60, hr: 1 },
                                    { day: "Monday", inches: 2, mins: 45 },
                                    { day: "Tuesday", inches: 2, mins: 45 },
                                    { day: "Wed.day", inches: 2, mins: 30 },
                                    { day: "Thursday", inches: 1, mins: 15 },
                                    { day: "Friday", inches: 0, mins: 0, note: "No Irrigation" },
                                    { day: "Saturday", inches: 2, mins: 60, hr: 1 },
                                ].map((d, i) => (
                                    <div key={i} className="flex flex-col w-auto border-l items-center space-1">
                                        {/* Day Name (Top Row) */}
                                        <p className="font-semibold border-b  text-xs md:text-lg">{d.day}</p>

                                        {/* Box with Data (Bottom Row) */}
                                        <div className="bg-white p-1 w-full text-sm space-y-[2px]">
                                            {d.inches > 0 ? (
                                                <>
                                                    <div className="flex justify-center gap-[1px] flex-wrap">
                                                        {[...Array(d.inches)].map((_, j) => (
                                                            <PiDropThin key={j} className=" text-[1rem]" />
                                                        ))}
                                                    </div>
                                                    <p>{d.inches} in</p>
                                                    <div className="mt-4 flex flex-col items-center">
                                                        <FaArrowUpFromWaterPump className="text-3xl" />
                                                        <p>{d.mins} mins</p>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="bg-white p-1 flex items-center justify-center w-full space-y-[2px]">
                                                    <TbDropletOff className=" md:text-[1rem]" />
                                                    <p className="text-red-500 flex justify-center items-center text-[9px] md:text-[16px]">{d.note}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}


                        {tab === "monthly" && (
                            <div className="grid grid-cols-7 gap-[6px] text-[10px] mt-4 text-center">
                                {[
                                    { day: "Sunday", inches: 3, mins: 60, hr: 1 },
                                    { day: "Monday", inches: 2, mins: 45 },
                                    { day: "Tuesday", inches: 2, mins: 45 },
                                    { day: "Wed-day", inches: 2, mins: 30 },
                                    { day: "Thursday", inches: 1, mins: 15 },
                                    { day: "Friday", inches: 0, mins: 0, note: "No Irrigation" },
                                    { day: "Saturday", inches: 2, mins: 60, hr: 1 },
                                ].map((d, i) => (
                                    <p className="font-semibold border md:text-lg">{d.day}</p>))}
                                {Array.from({ length: 30 }, (_, i) => {
                                    const dayNumber = i + 1;
                                    // Example data generator — customize this logic as needed
                                    const inches = dayNumber % 5 === 0 ? 0 : Math.floor(Math.random() * 3) + 1;
                                    const mins = inches > 0 ? inches * 15 : 0;
                                    const note = inches === 0 ? "No Irrigation" : null;

                                    return (
                                        <div key={i} className="flex flex-col justify-center border-l items-center space-y-1">
                                            {/* Day Number */}
                                            {/* <p className="font-semibold border text-lg">Day {dayNumber}</p> */}

                                            {/* Box with Data */}
                                            <div className="bg-white p-1 w-full border text-sm space-y-[2px]">
                                                {inches > 0 ? (
                                                    <div className="h-32 flex flex-col justify-center">
                                                        <div className="flex justify-center  gap-[1px] flex-wrap">
                                                            {[...Array(inches)].map((_, j) => (
                                                                <PiDropThin key={j} className="text-[1rem]" />
                                                            ))}
                                                        </div>
                                                        <p>{inches} in</p>
                                                        <div className="mt-4 flex flex-col items-center">
                                                            <FaArrowUpFromWaterPump className="text-3xl" />
                                                            <p>{mins} mins</p>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="bg-white p-1 flex h-32 items-center justify-center w-full space-y-[2px]">
                                                        <TbDropletOff className="" />
                                                        <p className="text-red-500 text-[9px] md:text-[16px]">{note}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}


                    </div>

                    {/* Assist Buttons */}
                    <div className="flex justify-around">
                        <button className="border px-4 py-1 rounded-full text-xs">
                            Voice Assistance
                        </button>
                        <button className="border px-4 py-1 rounded-full text-xs">
                            Video Assistance
                        </button>
                    </div>
                </>}
        </div>
    );
};

export default Dashboard;
