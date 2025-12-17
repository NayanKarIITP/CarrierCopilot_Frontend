import axios from "axios";

const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://carriercopilot-nk.onrender.com/api";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach Token
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// --- Auth Functions ---

export const loginUser = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};

// Note: Backend expects "fullName", but frontend might send "name"
export const registerUser = async (fullName: string, email: string, password: string) => {
  const res = await api.post("/auth/signup", { fullName, email, password });
  return res.data;
};

export default api;

// Add this new function at the bottom
export const googleLoginBackend = async (email: string, fullName: string, googleId: string, photoURL: string) => {
  // This talks to your backend controller 'exports.googleAuth'
  const res = await api.post("/auth/google", { 
    email, 
    fullName, 
    googleId, 
    photoURL 
  });
  return res.data;
};
