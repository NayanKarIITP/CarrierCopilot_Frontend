
// lib/api.ts
import axios from "axios";

/*  AXIOS INSTANCE  */

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ??
    "https://carriercopilot-nk.onrender.com/api",
});

/*  TOKEN INTERCEPTOR  */

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

/*  DEFAULT EXPORT  */
export default api;

/* AUTH APIS */

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
