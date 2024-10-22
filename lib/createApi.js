import axios from "axios";
export const API = axios.create({
  baseURL: "https://younesfilm-backend.vercel.app",
  withCredentials: true,
});
