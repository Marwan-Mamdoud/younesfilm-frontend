import axios from "axios";
export const API = axios.create({
  // baseURL: "https://backend-younesfilm.vercel.app/",
  baseURL: "http://localhost:4000/",
  withCredentials: true,
});
