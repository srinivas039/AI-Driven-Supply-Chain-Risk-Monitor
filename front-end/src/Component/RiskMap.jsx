import { MapContainer, TileLayer, CircleMarker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function RiskMap({ shipments }) {
  if (!shipments || shipments.length === 0) {
    return <p>No data for map</p>;
  }

  const mapShipments = shipments.filter(
    s => s.originCoords && s.destinationCoords
  );

  if (mapShipments.length === 0) {
    return <p>No analyzed shipments to display on map</p>;
  }

  const getColor = (risk) => {
    if (risk === "High") return "red";
    if (risk === "Medium") return "orange";
    return "green";
  };

  return (
    <div style={{ height: "400px" }}>
      <MapContainer center={[20, 0]} zoom={2} style={{ height: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {mapShipments.map(s => {
          const route = [
            [s.originCoords.lat, s.originCoords.lon],
            [s.destinationCoords.lat, s.destinationCoords.lon]
          ];

          const color = getColor(s.riskLevel);

          return (
            <div key={s._id}>
              {/* Route Line */}
              <Polyline
                positions={route}
                color={color}
                weight={3}
                opacity={0.8}
              />

              {/* Origin Marker */}
              <CircleMarker
                center={[s.originCoords.lat, s.originCoords.lon]}
                radius={8}
                color={color}
              >
                <Popup>
                  <strong>{s.supplierName}</strong><br />
                  Origin: {s.origin}<br />
                  Risk: {s.riskLevel}
                </Popup>
              </CircleMarker>

              {/* Destination Marker */}
              <CircleMarker
                center={[s.destinationCoords.lat, s.destinationCoords.lon]}
                radius={8}
                color={color}
              >
                <Popup>
                  Destination: {s.destination}<br />
                  ETA: {s.totalETA?.toFixed(2)} days
                </Popup>
              </CircleMarker>
            </div>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default RiskMap;