import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

export const createNewOrder = (formData) =>
  API.post("/order/new", formData, { withCredentials: true });
export const getMyOrders = () =>
  API.get("/order/me", { withCredentials: true });
