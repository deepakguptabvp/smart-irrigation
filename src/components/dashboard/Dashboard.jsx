import React, { useContext, useEffect, useState } from "react";
import { IoMdWarning } from "react-icons/io";
import { FaArrowUpFromWaterPump, FaCloudRain, FaDroplet, FaPlay } from "react-icons/fa6";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { fetchNDMI } from "../../api/satelite";
import { fetchGoogleWeather } from "../../api/weather";
import { PiDropThin } from "react-icons/pi";
import { TfiAlarmClock } from "react-icons/tfi";
import { TbDropletOff } from "react-icons/tb";
import NDMIMap from "./NDMIMap";
import MoistureMapWithLegend from "./Test";
import { webState } from "../../App";
const Dashboard = () => {

    const { user } = useContext(webState);
    const [tab, setTab] = useState("today");
    const [weather, setWeather] = useState(null);
    const [ndmiImage, setNdmiImage] = useState("");
    const [ndmi, setNdmi] = useState("");
    const fetchData = async () => {
        try {
            console.log(user);
            const geometry = user?.fields[0]?.coordinates;

            const ndmi = await fetchNDMI(geometry);
            setNdmiImage(ndmi.image_base64);
            setNdmi(ndmi);
        } catch (err) {
            console.error("Failed to fetch data", err);
        }
    };
    useEffect(() => {
        if (user) {
            console.log(user)
            fetchData();
        }
    }, [user]);
    return (
        <div className="p-4 space-y-4">
            {/* Header */}
            <div className="w-full flex justify-center">
                <button className="text-xl font-bold">My Field ▼</button>
            </div>

            {/* Alerts */}
            <div className="flex justify-between items-center space-x-2">
                <div className="w-3/4 flex-1 bg-white p-2 border rounded-lg flex items-center space-x-2">
                    <IoMdWarning size={50} className="text-red-600 text-2xl" />
                    <span className="text-xs font-semibold">
                        Heavy rains estimated for next week
                        <br />
                        DO NOT IRRIGATE
                    </span>
                </div>
                <div className="w-1/4 bg-white p-2 border rounded-lg text-center">
                    <FaCloudRain size={30} className="text-xl mx-auto" />
                    <p className="text-sm">
                        {!weather ? `39°C` : "Loading..."}
                    </p>
                </div>
            </div>
            {ndmi ? <NDMIMap coordinates={user?.fields[0]?.coordinates?.[0]} legend={ndmi?.legend} area_summary_ha={ndmi?.area_summary_ha} ndmiBase64={ndmiImage} ndmiBounds={user?.fields[0]?.coordinates} /> : <div className="flex justify-center my-6">Please Wait...</div>}
            {/* <MoistureMapWithLegend img={ndmiImage} /> */}
            {/* Satellite Image */}
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
                <span className="text-blue-500">stressed moisture</span>
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
                {tab === "today" && (
                    <div className="mt-4 text-center flex justify-around space-y-3">
                        <div className="flex flex-col justify-around my-8 gap-6">
                            <p className="text-xs text-gray-500">12.2.25</p>
                            <div>
                                <div className="flex justify-center gap-1">
                                    {[...Array(3)].map((_, i) => (
                                        <PiDropThin key={i} className=" text-4xl" />
                                    ))}
                                </div>
                                <div className="text-lg font-semibold">3 inches</div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-around my-8 gap-6">
                            <div className="flex justify-center items-center gap-2 text-sm">
                                <FaArrowUpFromWaterPump className="text-5xl"
                                />
                                <span className="font-bold">1 hour</span> today
                            </div>
                            <div className="flex justify-center items-center font-bold text-xl">
                                <button className="flex items-center justify-center  rounded-full px-4 py-2 text-sm font-medium text-gray-800 mt-1">
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
                            { day: "Wednesday", inches: 2, mins: 30 },
                            { day: "Thursday", inches: 1, mins: 15 },
                            { day: "Friday", inches: 0, mins: 0, note: "No Irrigation" },
                            { day: "Saturday", inches: 2, mins: 60, hr: 1 },
                        ].map((d, i) => (
                            <div key={i} className="flex flex-col border-l items-center space-y-1">
                                {/* Day Name (Top Row) */}
                                <p className="font-semibold border-b text-lg">{d.day}</p>

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
                                            <TbDropletOff className=" text-[1rem]" />
                                            <p className="text-red-500 flex justify-center items-center text-[16px]">{d.note}</p>
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
                            { day: "Wednesday", inches: 2, mins: 30 },
                            { day: "Thursday", inches: 1, mins: 15 },
                            { day: "Friday", inches: 0, mins: 0, note: "No Irrigation" },
                            { day: "Saturday", inches: 2, mins: 60, hr: 1 },
                        ].map((d, i) => (
                            <p className="font-semibold border text-lg">{d.day}</p>))}
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
                                                <TbDropletOff className="text-[1rem]" />
                                                <p className="text-red-500 text-[16px]">{note}</p>
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
        </div>
    );
};

export default Dashboard;
