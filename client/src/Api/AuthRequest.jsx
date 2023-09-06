import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

export const logInUser = (formData) => API.post("/login", formData);
export const registerUser = (formData) => API.post("/register", formData);
export const getMyProfile = () => API.get("/me");
export const logOut = () => API.get("/logout");
