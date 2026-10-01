import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const path = window.location.pathname;

      // Public pages — do NOT force login redirect
      const isPublic =
        path === "/" ||
        path === "/login" ||
        path === "/register" ||
        path.startsWith("/u/");

      if (!isPublic) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;