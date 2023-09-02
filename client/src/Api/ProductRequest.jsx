import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

// API.interceptors.request.use((req) => {
//   const token = JSON.parse(localStorage.getItem("token"));

//   if (token) {
//     req.headers.Authorization = `Bearer ${token.token}`;
//     return req;
//   }
// });

export const getAllProducts = () => API.get("/products");
export const getProductDetails = (id) => API.get(`/product/${id}`);
export const productReview = (formdata) => API.put("/createreview", formdata);
// export const getAllProducts = () => API.get("/products");
