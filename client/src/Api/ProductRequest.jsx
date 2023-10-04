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
export const getAllReviews = (id) =>
  API.get(`getallreviews/${id}`, { withCredentials: true });
export const deleteProduct = (id) =>
  API.delete(`/product/${id}`, { withCredentials: true });
export const updateProduct = async (id, formData) => {
  return API.put(`/product/${id}`, formData, { withCredentials: true });
};
