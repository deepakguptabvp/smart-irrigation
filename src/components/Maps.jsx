import React, { useState } from "react";
import {
    GoogleMap,
    LoadScript,
    DrawingManager,
} from "@react-google-maps/api";
import axios from "axios";

const containerStyle = {
    width: "100%",
    height: "90vh",
};

const center = {
    lat: 20.5937,
    lng: 78.9629,
};

const MapWithDrawing = () => {
    const [polygonPath, setPolygonPath] = useState([]);
    const [kmlData, setKmlData] = useState("");

    const handlePolygonComplete = (polygon) => {
        const path = polygon.getPath().getArray().map((latLng) => ({
            lat: latLng.lat(),
            lng: latLng.lng(),
        }));
        setPolygonPath(path);
    };

    const convertToKML = async () => {
        try {
            const response = await axios.post("https://map-backend-nine.vercel.app/api/convert-to-kml", {
                coordinates: polygonPath,
            });
            setKmlData(response.data.kml);
        } catch (error) {
            console.error("Error converting to KML", error);
        }
    };

    return (
        <div>
            <LoadScript googleMapsApiKey="AIzaSyDkxwT1OheCGFd0Y4618qX9AIYsopibBRk" libraries={["drawing"]}>
                <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={5}>
                    <DrawingManager
                        onPolygonComplete={handlePolygonComplete}
                        options={{
                            drawingControl: true,
                            drawingControlOptions: {
                                drawingModes: ["polygon"],
                            },
                            polygonOptions: {
                                fillColor: "#00FF00",
                                fillOpacity: 0.2,
                                strokeWeight: 2,
                                clickable: false,
                                editable: false,
                                zIndex: 1,
                            },
                        }}
                    />
                </GoogleMap>
            </LoadScript>
            <div className="mt-4 space-y-4">
                <button
                    onClick={convertToKML}
                    disabled={polygonPath.length === 0}
                    className={`px-6 py-2 rounded-md text-white font-medium shadow-md transition ${polygonPath.length === 0
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                >
                    Convert to KML
                </button>

                {kmlData && (
                    <textarea
                        value={kmlData}
                        readOnly
                        rows={10}
                        className="w-full p-4 text-sm font-mono bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none resize-none"
                    />
                )}
            </div>

        </div>
    );
};

export default MapWithDrawing;
