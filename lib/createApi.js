import axios from "axios";
export const API = axios.create({
  baseURL: "https://backend-younesfilm.vercel.app/",
  withCredentials: true,
});
