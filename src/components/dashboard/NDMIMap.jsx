import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Polygon,
  ImageOverlay
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { GoogleMap, StreetViewPanorama, LoadScript } from "@react-google-maps/api";
export default function NDMIMapWithStreetView({
  coordinates,
  ndmiBase64,
  ndmiBounds,
  legend,
  area_summary_ha
}) {
  const [showStreetView, setShowStreetView] = useState(false);
  const latLngs = coordinates.map(([lon, lat]) => [lat, lon]);
  const center = latLngs[0];

  function getDominantColor() {
    let maxLabel = null;
    let maxArea = -Infinity;
    for (const [label, area] of Object.entries(area_summary_ha)) {
      if (area > maxArea) {
        maxArea = area;
        maxLabel = label;
      }
    }
    const legendEntry = legend.find((l) => l.label === maxLabel);
    return legendEntry ? legendEntry.color : "#000000";
  }

  const dominantColor = getDominantColor();

  return (
    <div className="relative h-full max-h-[60vh] w-full rounded overflow-hidden mb-4">
      {/* <div className="flex justify-end mb-2">
        <button
          onClick={() => setShowStreetView(!showStreetView)}
          className="bg-blue-600 text-white px-3 py-1 rounded shadow"
        >
          {showStreetView ? "Show NDMI Map" : "View Street View"}
        </button>
      </div> */}

      {!showStreetView ? (
        <MapContainer
          center={center}
          zoom={18}
          style={{ height: "100%", width: "100%", zIndex:10 }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Polygon
            positions={latLngs}
            color={"red"}
            fillColor={dominantColor}
            fillOpacity={1}
          />
          {ndmiBase64 && ndmiBounds && (
            <ImageOverlay
              bounds={ndmiBounds}
              url={`data:image/png;base64,${ndmiBase64}`}
              opacity={0.5}
              interactive={false}
            />
          )}
        </MapContainer>
      ) : (
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
          <div style={{ height: "60vh", width: "100%" }}>
            <GoogleMap
              center={{ lat: center[0], lng: center[1] }}
              zoom={12}
              mapContainerStyle={{ height: "100%", width: "100%" }}
            >
              <StreetViewPanorama
                position={{ lat: center[0], lng: center[1] }}
                visible={true}
                options={{ pov: { heading: 100, pitch: 0 }, zoom: 1 }}
              />
            </GoogleMap>
          </div>
        </LoadScript>
      )}

      {/* NDMI Legend (Always visible) */}
      {!showStreetView && (
        <div style={{zIndex:200}} className="absolute top-8 right-2 bg-black/10 p-3 rounded shadow-md text-xs max-w-[200px] overflow-y-auto max-h-[90%]">
          <div className="font-semibold mb-1 text-center">NDMI Legend</div>
          <ul>
            {legend?.map(({ label, color }) => (
              <li key={label} className="flex items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block w-4 h-4 rounded"
                    style={{ backgroundColor: color }}
                  />
                  <span>{label}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
