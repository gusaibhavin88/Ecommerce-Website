import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

export const logInUser = (formData) =>
  API.post("/login", formData, { withCredentials: true }); //  { withCredentials: true }   Must Required
export const registerUser = (formData) => API.post("/register", formData);
export const getMyProfileAcc = () => API.get("/me", { withCredentials: true }); //  { withCredentials: true }   Must Required
export const logOut = () => API.get("/logout");
