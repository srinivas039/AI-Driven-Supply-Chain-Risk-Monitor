import { useState } from "react";
import { createShipment } from "../services/api";

function CreateShipment({ onCreated }) {
  const [form, setForm] = useState({
    supplierName: "",
    origin: "",
    destination: "",
    transportMode: "Air"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createShipment(form);
    onCreated();
    setForm({ supplierName: "", origin: "", destination: "", transportMode: "Air" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="supplierName" placeholder="Supplier Name" onChange={handleChange} required />
      <input name="origin" placeholder="Origin (Country)" onChange={handleChange} required />
      <input name="destination" placeholder="Destination (Country)" onChange={handleChange} required />

      <select name="transportMode" onChange={handleChange}>
        <option value="Air">Air</option>
        <option value="Sea">Sea</option>
        <option value="Road">Road</option>
      </select>

      <button type="submit">Create Shipment</button>
    </form>
  );
}

export default CreateShipment;