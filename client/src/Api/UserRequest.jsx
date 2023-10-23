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
export const findUserData = (id) => {
  return API.get(`/getuser/${id}`, { withCredentials: true });
};
export const updateUserRole = (id, formData) => {
  return API.put(`/update/user/${id}`, formData, { withCredentials: true });
};
