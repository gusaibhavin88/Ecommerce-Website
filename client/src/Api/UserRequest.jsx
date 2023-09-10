import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

export const updateUserProfile = (formData) =>
  API.put("/updateProfile", formData, { withCredentials: true });
