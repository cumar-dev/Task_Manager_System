import axios from "axios";
// import { useAuthStore } from "../store/authStore";
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
      // const token = useAuthStore.getState().token;
    const token = localStorage.getItem("token");
    console.log("Token being sent:", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("401 - Token expired or invalid");
    }
    return Promise.reject(error);
  }
);