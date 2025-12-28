import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const getShipments = () =>
  axios.get(`${BASE_URL}/shipments`);

export const createShipment = (data) =>
  axios.post(`${BASE_URL}/shipments`, data);

export const analyzeRisk = (id, data) =>
  axios.post(`${BASE_URL}/risk/${id}`, data);