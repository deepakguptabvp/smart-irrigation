import {
  GoogleMap,
  Polygon,
  GroundOverlay,
  LoadScript,
} from "@react-google-maps/api";

export default function NDMIMapSatelliteView({
  coordinates,
  ndmiBase64,
  ndmiBounds,
  legend,
  area_summary_ha,
}) {
  const latLngs = coordinates.map(([lon, lat]) => ({ lat, lng: lon }));
  const center = latLngs[0];

  function getDominantWeatherAndColor() {
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
      weather: maxLabel || "Unknown",
    };
  }

  const dominantColor = getDominantWeatherAndColor().color;

  const groundBounds = {
    north: ndmiBounds?.[1]?.[0],
    south: ndmiBounds?.[0]?.[0],
    east: ndmiBounds?.[1]?.[1],
    west: ndmiBounds?.[0]?.[1],
  };

  return (
    // <LoadScript googleMapsApiKey="AIzaSyDkxwT1OheCGFd0Y4618qX9AIYsopibBRk">
      <div className="relative h-full max-h-[60vh] w-full rounded overflow-hidden mb-4">
        <GoogleMap
          center={center}
          zoom={18}
          mapTypeId="satellite"
          mapContainerStyle={{ height: "60vh", width: "100%" }}
        >
          <Polygon
            paths={latLngs}
            options={{
              strokeColor: "red",
              strokeOpacity: 1,
              strokeWeight: 2,
              fillColor: dominantColor,
              fillOpacity: 0.6,
            }}
          />

          {ndmiBase64 && ndmiBounds && (
            <GroundOverlay
              url={`data:image/png;base64,${ndmiBase64}`}
              bounds={groundBounds}
              opacity={0.5}
            />
          )}
        </GoogleMap>

        {/* NDMI Legend */}
        <div
          style={{ zIndex: 200 }}
          className="absolute top-8 right-2 bg-black/60 text-white p-3 rounded shadow-md text-xs max-w-[200px] overflow-y-auto max-h-[90%]"
        >
          <div className="font-semibold mb-1 text-center">NDMI Legend</div>
          <ul>
            {legend?.map(({ label, color }) => (
              <li
                key={label}
                className="flex items-center justify-between gap-2 mb-1"
              >
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
      </div>
    // </LoadScript>
  );
}
