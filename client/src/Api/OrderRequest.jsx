import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

export const createNewOrder = (formData) =>
  API.post("/order/new", formData, { withCredentials: true });
export const getMyOrders = () =>
  API.get("/order/me", { withCredentials: true });
export const getMyOrder = (id) =>
  API.get(`/order/${id}`, { withCredentials: true });
export const getDashboardData = () =>
  API.get("dashboard/data", { withCredentials: true });
export const deleteOrder = (id) =>
  API.delete(`/order/delete/${id}`, { withCredentials: true });
export const updateOrderStatus = (id, formData) =>
  API.post(`/updateOrderStatus/${id}`, formData, { withCredentials: true });
