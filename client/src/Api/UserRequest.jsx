import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

export const updateUserProfile = (formData) =>
  API.put("/updateProfile", formData, { withCredentials: true });
export const updateUserPassword = (formData) =>
  API.put("/updatepassword", formData, { withCredentials: true });
export const getAllUsers = () =>
  API.get("/getusers", { withCredentials: true });
export const deleteUser = (id) => {
  return API.delete(`/deleteuser/${id}`, { withCredentials: true });
};
