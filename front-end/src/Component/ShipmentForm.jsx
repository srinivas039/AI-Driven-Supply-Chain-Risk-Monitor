import { useState } from "react";
import { createShipment } from "../services/api";
import "./ShipmentForm.css";

function ShipmentForm({ onCreated, onClose }) {
  const [form, setForm] = useState({
    supplierName: "",
    origin: "",
    destination: "",
    transportMode: "Sea"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createShipment(form);
    onCreated();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Create Shipment</h2>

        <form onSubmit={handleSubmit}>
          <label>Supplier Name</label>
          <input
            name="supplierName"
            value={form.supplierName}
            onChange={handleChange}
            required
          />

          <label>Origin Country</label>
          <input
            name="origin"
            value={form.origin}
            onChange={handleChange}
            required
          />

          <label>Destination Country</label>
          <input
            name="destination"
            value={form.destination}
            onChange={handleChange}
            required
          />

          <label>Transport Mode</label>
          <select
            name="transportMode"
            value={form.transportMode}
            onChange={handleChange}
          >
            <option value="Air">Air</option>
            <option value="Sea">Sea</option>
            <option value="Road">Road</option>
          </select>

          <div className="modal-actions">
            <button type="submit" className="primary-btn">
              Create Shipment
            </button>
            <button type="button" className="secondary-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ShipmentForm;