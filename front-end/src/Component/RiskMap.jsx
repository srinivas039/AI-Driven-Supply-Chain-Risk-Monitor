import { MapContainer, TileLayer } from "react-leaflet";
import HeatmapLayer from "react-leaflet-heatmap-layer-v3";
import "leaflet/dist/leaflet.css";
import countryCoordinates from "../utils/countryCoordinates";

function RiskMap({ shipments }) {
  const heatmapData = shipments
    .filter(s => s.riskScore && countryCoordinates[s.origin])
    .map(s => {
      const coords = countryCoordinates[s.origin];
      return [
        coords.lat,
        coords.lon,
        s.riskScore * 10
      ];
    });

  return (
    <div style={{ height: "400px" }}>
      <MapContainer center={[20, 0]} zoom={2} style={{ height: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <HeatmapLayer
          fitBoundsOnLoad
          fitBoundsOnUpdate
          points={heatmapData}
          longitudeExtractor={m => m[1]}
          latitudeExtractor={m => m[0]}
          intensityExtractor={m => m[2]}
        />
      </MapContainer>
    </div>
  );
}

export default RiskMap;