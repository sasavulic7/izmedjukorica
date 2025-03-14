import axios from "axios";

// Kreiranje instance axios-a sa baseURL za API zahteve
const API_URL = "https://izmedjukorica.vercel.app/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor za dodavanje auth tokena na svaki zahtev
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
