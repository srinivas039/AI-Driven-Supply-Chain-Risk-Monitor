import { useState } from "react";
import { analyzeRisk } from "../services/api";

function ShipmentTable({ shipments, refresh }) {
  const [loadingId, setLoadingId] = useState(null);

  const runRiskAnalysis = async (id) => {
    setLoadingId(id);
    try {
      await analyzeRisk(id);
      refresh(); // re-fetch shipments after backend update
    } catch {
      alert("Risk analysis failed");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <table border="1" cellPadding="8" cellSpacing="0" width="100%">
      <thead>
        <tr>
          <th>Supplier</th>
          <th>Route</th>
          <th>Transport</th>
          <th>Distance (km)</th>
          <th>Base ETA (days)</th>
          <th>Delay (days)</th>
          <th>Total ETA</th>
          <th>Risk</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {shipments.map((s) => (
          <tr key={s._id}>
            <td>{s.supplierName}</td>

            <td>
              {s.origin} → {s.destination}
            </td>

            <td>{s.transportMode || "-"}</td>

            <td>{s.distanceKm ?? "-"}</td>

            <td>{s.estimatedDays ?? "-"}</td>

            <td>{s.delayDays ?? "-"}</td>

            <td>
              {s.totalETA ? <strong>{s.totalETA}</strong> : "-"}
            </td>

            <td>
              <span
                style={{
                  fontWeight: "bold",
                  color:
                    s.riskLevel === "High"
                      ? "red"
                      : s.riskLevel === "Medium"
                      ? "orange"
                      : s.riskLevel === "Low"
                      ? "green"
                      : "gray"
                }}
              >
                {s.riskLevel || "N/A"}
              </span>
            </td>

            <td>
              <button
                onClick={() => runRiskAnalysis(s._id)}
                disabled={loadingId === s._id}
              >
                {loadingId === s._id ? "Analyzing..." : "Analyze Risk"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ShipmentTable;