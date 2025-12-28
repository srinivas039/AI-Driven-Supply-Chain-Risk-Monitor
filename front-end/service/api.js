import axios from "axios";

const BASE_URL = "https://ai-driven-supply-chain-risk-monitor-3.onrender.com/api";

export const getShipments = () =>
  axios.get(`${BASE_URL}/shipments`);

export const createShipment = (data) =>
  axios.post(`${BASE_URL}/shipments`, data);

export const analyzeRisk = (id, data) =>
  axios.post(`${BASE_URL}/risk/${id}`, data);