import { useEffect, useState } from "react";
import { getShipments } from "../services/api";
import ShipmentForm from "./ShipmentForm";
import ShipmentTable from "./ShipmentTable";
import RiskMap from "./RiskMap";

function Dashboard() {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const loadShipments = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await getShipments();
      setShipments(res.data);
    } catch {
      setError("Failed to load shipments. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadShipments();
  }, []);

  return (
    <div className="container">
      <h1>AI Supply Chain Risk Monitor</h1>

      <button className="primary-btn" onClick={() => setShowForm(true)}>
        Create Shipment
      </button>

      {showForm && (
        <ShipmentForm
          onCreated={() => {
            loadShipments();
            setShowForm(false);
          }}
          onClose={() => setShowForm(false)}
        />
      )}

      {loading && <p className="info">Loading shipments...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <>
          <ShipmentTable shipments={shipments} refresh={loadShipments} />
          <RiskMap shipments={shipments} />
        </>
      )}
    </div>
  );
}

export default Dashboard;