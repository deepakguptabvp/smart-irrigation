import React, { useState, useRef } from "react";
import {
    GoogleMap,
    LoadScript,
    DrawingManager,
    Autocomplete,
    Marker,
} from "@react-google-maps/api";
import { FaSearchLocation } from "react-icons/fa";

const containerStyle = {
    width: "100%",
    height: "35vh",
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

    return (
        <div className="w-full max-h-60 h-auto">
            {/* Navbar Filters */}
            <div className="bg-white shadow-md px-3 py-4 flex flex-wrap items-center gap-4 justify-between">
                {/* Search by place */}
                <div className="flex items-center gap-2 flex-1 min-w-[220px]">
                    <FaSearchLocation className="text-blue-600" />
                    <Autocomplete
                        onLoad={(ref) => (autocompleteRef.current = ref)}
                        onPlaceChanged={onPlaceChanged}
                    >
                        <input
                            type="text"
                            placeholder="Search location"
                            className="p-2 w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-400"
                        />
                    </Autocomplete>
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

            </div>

            {/* Map */}
            <div className="max-h-[40vh]">
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={8}
                    mapTypeId="satellite"
                    onLoad={(map) => (mapRef.current = map)}
                    options={{
                        mapTypeControl: false, // Hide the map/satellite toggle
                        streetViewControl: false,  // 👈 disables all gestures (including 2-finger move)
                        draggable: true,
                        gestureHandling: "cooperative", // 👈 Allows gestures only with 2 fingers
                        draggable: true,                // 👈 Required for DrawingManager to work
                        scrollwheel: false,
                    }}
                >
                    {selectedLocation && <Marker position={selectedLocation} />}
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
            <button
                onClick={handleUndo}
                disabled={polygons.length === 0}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium shadow transition ${polygons.length === 0
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-red-600 text-white hover:bg-red-700"
                    }`}
            >
                Undo
            </button>
        </div>
    );
};

export default MapWithDrawing;
