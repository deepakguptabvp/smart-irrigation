import React, { useState, useRef } from "react";
import {
    GoogleMap,
    LoadScript,
    DrawingManager,
    Autocomplete,
    Marker,
} from "@react-google-maps/api";
import axios from "axios";
import { FaMapMarkerAlt, FaSearchLocation, FaDownload } from "react-icons/fa";

const containerStyle = {
    width: "100%",
    height: "35vh",
};

const defaultCenter = {
    lat: 20.5937,
    lng: 78.9629,
};

const MapWithDrawing = ({setCoordinates}) => {
    const [center, setCenter] = useState(defaultCenter);
    const [polygonPath, setPolygonPath] = useState([]);
    const [kmlData, setKmlData] = useState("");
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
        
        setPolygonPath(path);
    };

    const convertToKML = async () => {
        try {
            console.log(polygonPath)
            const formattedCoordinates = [
            polygonPath.map(coord => [coord.lng, coord.lat])
        ];
        // setKmlData(formattedCoordinates);
        setCoordinates(formattedCoordinates);
        } catch (error) {
            console.error("Error converting to KML", error);
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

                    {/* Lat, Lng search */}
                    {/* <form
                        onSubmit={handleLatLngSubmit}
                        className="flex items-center gap-2"
                    >
                        <FaMapMarkerAlt className="text-green-600" />
                        <input
                            type="text"
                            placeholder="Lat,Lng (e.g. 28.61,77.23)"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="p-2 w-48 border border-gray-300 rounded-md focus:ring focus:ring-green-400"
                        />
                    </form> */}

                    {/* KML Button */}
                    <button
                        onClick={convertToKML}
                        disabled={polygonPath.length === 0}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium shadow transition ${polygonPath.length === 0
                                ? "bg-gray-400 text-white cursor-not-allowed"
                                : "bg-blue-600 text-white hover:bg-blue-700"
                            }`}
                    >
                        {/* <FaDownload /> */}
                        Save
                    </button>
                </div>

                {/* Map */}
                <div className="max-h-[40vh]">
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={8}
                    onLoad={(map) => (mapRef.current = map)}
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
                                editable: false,
                                zIndex: 1,
                            },
                        }}
                    />
                </GoogleMap>
                </div>

            {/* KML Output */}
            {/* {kmlData && (
                <div className="p-6 bg-gray-100 border-t border-gray-300">
                    <h3 className="text-lg font-semibold mb-2 text-gray-700">KML Output:</h3>
                    <textarea
                        value={kmlData}
                        readOnly
                        rows={10}
                        className="w-full p-4 text-sm font-mono bg-white border border-gray-300 rounded shadow resize-none"
                    />
                </div>
            )} */}
        </div>
    );
};

export default MapWithDrawing;
