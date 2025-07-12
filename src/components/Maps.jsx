import React, { useState, useRef } from "react";
import {
    GoogleMap,
    LoadScript,
    DrawingManager,
    Autocomplete,
    Marker,
} from "@react-google-maps/api";
import { FaSearchLocation } from "react-icons/fa";
import { TbArrowBackUp } from "react-icons/tb";

const containerStyle = {
    width: "100%",
    height: "30vh",
};

const defaultCenter = {
    lat: 20.5937,
    lng: 78.9629,
};

const MapWithDrawing = ({ setCoordinates }) => {
    const [center, setCenter] = useState(defaultCenter);
    const [polygons, setPolygons] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [selectedLocation, setSelectedLocation] = useState(null);

    const mapRef = useRef(null);
    const autocompleteRef = useRef(null);

    const handlePolygonComplete = (polygon) => {
        const path = polygon
            .getPath()
            .getArray()
            .map((latLng) => ({
                lat: latLng.lat(),
                lng: latLng.lng(),
            }));

        setPolygons((prev) => [...prev, polygon]);

        const formattedCoordinates = [path.map((coord) => [coord.lng, coord.lat])];
        setCoordinates(formattedCoordinates);
    };

    const convertToKML = () => {
        if (polygons.length > 0) {
            const polygon = polygons[polygons.length - 1];
            const path = polygon
                .getPath()
                .getArray()
                .map((latLng) => ({
                    lat: latLng.lat(),
                    lng: latLng.lng(),
                }));

            const formattedCoordinates = [path.map((coord) => [coord.lng, coord.lat])];
            setCoordinates(formattedCoordinates);
        }
    };

    const handleUndo = () => {
        const lastPolygon = polygons[polygons.length - 1];
        if (lastPolygon) {
            lastPolygon.setMap(null); // remove from map
            setPolygons((prev) => prev.slice(0, -1)); // remove from state
        }
    };

    const onPlaceChanged = () => {
        if (autocompleteRef.current) {
            const place = autocompleteRef.current.getPlace();
            if (place?.geometry?.location) {
                const location = {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                };
                setCenter(location);
                setSelectedLocation(location);
                mapRef.current?.panTo(location);
            }
        }
    };

    const handleLatLngSubmit = (e) => {
        e.preventDefault();
        const [latStr, lngStr] = searchInput.split(",");
        const lat = parseFloat(latStr);
        const lng = parseFloat(lngStr);
        if (!isNaN(lat) && !isNaN(lng)) {
            const newCenter = { lat, lng };
            setCenter(newCenter);
            setSelectedLocation(newCenter);
            mapRef.current?.panTo(newCenter);
        } else {
            alert("Invalid latitude and longitude format.");
        }
    };
    const handleDrawingStart = () => {
        if (mapRef.current) {
            mapRef.current.setOptions({ gestureHandling: "none" }); // stop map movement
        }
    };

    const handleDrawingEnd = () => {
        if (mapRef.current) {
            mapRef.current.setOptions({ gestureHandling: "greedy" }); // allow interaction again
        }
    };
    return (
        <div className="w-full mb-10 max-h-[40vh]">
            {/* Navbar Filters */}
            <div className="bg-white shadow-md px-3 py-4 flex items-center gap-1.5 md:gap-2.5 justify-between">
                {/* Search by place */}
                <div className="flex items-center relative flex-1 min-w-[220px]">
                    <Autocomplete
                        onLoad={(ref) => (autocompleteRef.current = ref)}
                        onPlaceChanged={onPlaceChanged}
                    >
                        <input
                            type="text"
                            placeholder="Search location"
                            className="p-2 pr-10 w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-400"
                        />
                    </Autocomplete>
                    {/* <FaSearchLocation className="text-blue-600 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" /> */}
                </div>


                {/* Save Button */}
                <button
                    onClick={convertToKML}
                    disabled={polygons.length === 0}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium shadow transition ${polygons.length === 0
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                >
                    Save
                </button>

                {/* Undo Button */}
                <button
                    onClick={handleUndo}
                    disabled={polygons.length === 0}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium shadow transition ${polygons.length === 0
                        ? "bg-gray-100 text-white cursor-not-allowed"
                        : "bg-red-600 text-white hover:bg-red-700"
                        }`}
                >
                    <TbArrowBackUp className="text-lg text-black" />
                </button>

            </div>

            {/* Map */}
            <div className="max-h-[25vh] md:max-h-[40vh]">
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={12}
                    
                    mapTypeId="hybrid"
                    onLoad={(map) => {
                        mapRef.current = map;
                        map.setMapTypeId("hybrid"); // 👈 Enforces satellite mode again
                    }}
                    options={{ // Hide the map/satellite toggle
                        streetViewControl: false,  // 👈 disables all gestures (including 2-finger move)
                        draggable: true,
                        mapTypeControl: false,
                        draggable: true,                // 👈 Required for DrawingManager to work
                        scrollwheel: false,
                    }}
                >
                    {selectedLocation && <Marker position={selectedLocation} />}
                    <DrawingManager
                        onPolygonComplete={(polygon) => {
                            handlePolygonComplete(polygon);
                            handleDrawingEnd(); // gestureHandling back to normal
                        }}
                        onOverlayComplete={() => handleDrawingStart()} // disable map drag when starting
                        options={{
                            drawingControl: true,
                            drawingControlOptions: {
                                drawingModes: ["polygon"],
                            },
                            polygonOptions: {
                                fillColor: "#00FF00",
                                fillOpacity: 0.2,
                                strokeWeight: 2,
                                strokeColor: "#FF0000",
                                clickable: false,
                                editable: true,
                                draggable: true,
                                zIndex: 1,
                            },
                        }}
                    />

                </GoogleMap>
            </div>

        </div>
    );
};

export default MapWithDrawing;
