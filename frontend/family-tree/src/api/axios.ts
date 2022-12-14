import axios from "axios";
const BASE_URL: string =
  (import.meta.env.API_URL as string) || "https://localhost:5000/";

export default axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
