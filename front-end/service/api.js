import axios from "axios";

const BASE_URL = "https://ai-driven-supply-chain-risk-monitor-3.onrender.com/api";

export const getShipments = () => {
  return axios.get(`${BASE_URL}/shipments`);
};

export const createShipment = (data) => {
  return axios.post(`${BASE_URL}/shipments`, data);
};

export const analyzeRisk = (id) => {
  return axios.post(`${BASE_URL}/risk/${id}`);
};