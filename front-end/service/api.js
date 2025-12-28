import axios from "axios";

const BASE_URL = "REACT_APP_API_URL";

export const getShipments = () => {
  return axios.get(`${BASE_URL}/shipments`);
};

export const createShipment = (data) => {
  return axios.post(`${BASE_URL}/shipments`, data);
};

export const analyzeRisk = (id) => {
  return axios.post(`${BASE_URL}/risk/${id}`);
};