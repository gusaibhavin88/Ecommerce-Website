import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

export const getAllProducts = () => API.get("/products");
export const getProductDetails = (id) => API.get(`/product/${id}`);
export const productReview = (formdata) =>
  API.put("/createreview", formdata, { withCredentials: true });
export const createProduct = (formData) =>
  API.post("product/new", formData, { withCredentials: true });
