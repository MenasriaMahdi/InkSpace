import axios from "axios";

// 1. Create configured axios instance
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 2. Add JWT token to EVERY request automatically
api.interceptors.request.use((config) => {
  // Get token from localStorage (set during login)
  const token = localStorage.getItem("accessToken");

  if (token) {
    // Backend expects: Authorization: Bearer <token>
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}); 

// 3. Handle 401 errors (expired token) globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired → clear localStorage
      localStorage.removeItem("accessToken");
      // Redirect to login (we'll add this later)
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
