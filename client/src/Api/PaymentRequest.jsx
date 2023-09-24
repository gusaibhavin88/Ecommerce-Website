import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

export const paymentRequest = (formData) =>
  API.post(
    "/process/payment",
    formData,
    // {
    //   headers: {
    //     "Contant-Type": "application/json",
    //   },
    // },
    { withCredentials: true }
  );
export const getStripapikey = () =>
  API.get("/stripapikey", { withCredentials: true });
