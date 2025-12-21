

// import axios from "axios";

// /**
//  * Single source of truth for backend URL
//  * Works in:
//  * - Localhost
//  * - Vercel
//  * - SSR / CSR
//  */
// const API_URL =
//   process.env.NEXT_PUBLIC_API_URL ??
//   "https://carriercopilot-nk.onrender.com/api";

// const api = axios.create({
//   baseURL: API_URL,
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Attach JWT automatically
// api.interceptors.request.use((config) => {
//   if (typeof window !== "undefined") {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//   }
//   return config;
// });

// export default api;

// /* ---------- AUTH ---------- */

// export const loginUser = async (email: string, password: string) => {
//   const res = await api.post("/auth/login", { email, password });
//   return res.data;
// };

// export const registerUser = async (
//   fullName: string,
//   email: string,
//   password: string
// ) => {
//   const res = await api.post("/auth/signup", {
//     fullName,
//     email,
//     password,
//   });
//   return res.data;
// };

// export const googleLoginBackend = async (
//   email: string,
//   fullName: string,
//   googleId: string,
//   photoURL: string
// ) => {
//   const res = await api.post("/auth/google", {
//     email,
//     fullName,
//     googleId,
//     photoURL,
//   });
//   return res.data;
// };




// src/lib/api.ts

import axios from "axios";

/**
 * ✅ Single source of truth for backend URL
 * Works in:
 * - Localhost
 * - Vercel (Prod + Preview)
 */
const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "https://carriercopilot-nk.onrender.com/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ---------------------------------------------------
   ✅ ATTACH JWT TOKEN AUTOMATICALLY
--------------------------------------------------- */

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;

/* ---------------------------------------------------
   AUTH APIs
--------------------------------------------------- */

export const loginUser = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });

  // 🔐 Save JWT after login
  if (res.data?.token) {
    localStorage.setItem("token", res.data.token);
  }

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

  if (res.data?.token) {
    localStorage.setItem("token", res.data.token);
  }

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

  if (res.data?.token) {
    localStorage.setItem("token", res.data.token);
  }

  return res.data;
};
