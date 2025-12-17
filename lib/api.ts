import axios from "axios";

/**
 * We MUST NOT access `window` at the top level in Next.js
 * because this file is imported during SSR.
 */
const getBaseURL = () => {
  if (typeof window === "undefined") {
    // Server-side (not really used for browser API calls)
    return "https://carriercopilot-nk.onrender.com/api";
  }

  // Client-side
  return window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://carriercopilot-nk.onrender.com/api";
};

const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// ✅ Attach JWT token automatically
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;

// -------------------- AUTH APIs --------------------

export const loginUser = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};

export const registerUser = async (
  fullName: string,
  email: string,
  password: string
) => {
  const res = await api.post("/auth/signup", {
    fullName,
    email,
    password,
  });
  return res.data;
};

export const googleLoginBackend = async (
  email: string,
  fullName: string,
  googleId: string,
  photoURL: string
) => {
  const res = await api.post("/auth/google", {
    email,
    fullName,
    googleId,
    photoURL,
  });
  return res.data;
};
