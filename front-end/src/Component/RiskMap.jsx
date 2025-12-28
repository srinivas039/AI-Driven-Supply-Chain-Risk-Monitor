import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  Polyline,
  useMap
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";
import { useEffect } from "react";
import HeatmapLegend from "./HeatmapLegend";

function HeatLayer({ shipments }) {
  const map = useMap();

  useEffect(() => {
    const heatPoints = shipments.flatMap(s => {
      const intensity =
        s.riskLevel === "High" ? 1 :
        s.riskLevel === "Medium" ? 0.6 : 0.3;

      return [
        [s.originCoords.lat, s.originCoords.lon, intensity],
        [s.destinationCoords.lat, s.destinationCoords.lon, intensity]
      ];
    });

    if (heatPoints.length === 0) return;

    const heatLayer = L.heatLayer(heatPoints, {
      radius: 25,
      blur: 15,
      maxZoom: 5
    });

    heatLayer.addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [shipments, map]);

  return null;
}

function RiskMap({ shipments }) {
  const mappedShipments = shipments.filter(
    s => s.originCoords && s.destinationCoords
  );

  if (mappedShipments.length === 0) {
    return <p>No analyzed shipments available for map</p>;
  }

  return (
    <div style={{ position: "relative", height: "450px", marginTop: "20px" }}>
      <MapContainer center={[20, 0]} zoom={2} style={{ height: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Heatmap (origin + destination) */}
        <HeatLayer shipments={mappedShipments} />

        {mappedShipments.map(s => {
          const origin = [s.originCoords.lat, s.originCoords.lon];
          const destination = [s.destinationCoords.lat, s.destinationCoords.lon];

          const color =
            s.riskLevel === "High"
              ? "red"
              : s.riskLevel === "Medium"
              ? "orange"
              : "green";

          return (
            <div key={s._id}>
              <Polyline
                positions={[origin, destination]}
                pathOptions={{ color, weight: 2, opacity: 0.7 }}
              />

              <CircleMarker center={origin} radius={7} color={color}>
                <Popup>
                  <strong>{s.supplierName}</strong><br />
                  Origin: {s.origin}<br />
                  Risk: {s.riskLevel}
                </Popup>
              </CircleMarker>

              <CircleMarker center={destination} radius={6} color={color}>
                <Popup>
                  Destination: {s.destination}
                </Popup>
              </CircleMarker>
            </div>
          );
        })}
      </MapContainer>

      <HeatmapLegend />
    </div>
  );
}

export default RiskMap;