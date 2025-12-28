import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const getShipments = () =>
  axios.get(`${BASE_URL}/shipments`);

export const createShipment = (data) =>
  axios.post(`${BASE_URL}/shipments`, data);

export const analyzeRisk = (id, data) =>
  axios.post(`${BASE_URL}/risk/${id}`, data);

// export const createShipment = async (data) => {
//   const res = await fetch("http://localhost:5000/api/shipments", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data)
//   });

//   if (!res.ok) {
//     throw new Error("Failed to create shipment");
//   }

//   return res.json();
// };