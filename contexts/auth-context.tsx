
// "use client"

// import React, { createContext, useContext, useEffect, useState } from "react"

// interface User {
//   id: string
//   email: string
//   name: string
//   avatar?: string
// }

// interface AuthContextType {
//   user: User | null
//   isLoading: boolean
//   login: (email: string, password: string) => Promise<void>
//   signup: (email: string, password: string, name: string) => Promise<void>
//   logout: () => void
//   loginWithGoogle: () => Promise<void>
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined)

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null)
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     const savedUser = localStorage.getItem("user")
//     if (savedUser) {
//       setUser(JSON.parse(savedUser))
//     }
//     setIsLoading(false)
//   }, [])

//   const login = async (email: string, password: string) => {
//     const mockUser: User = {
//       id: "1",
//       email,
//       name: email.split("@")[0],
//       avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
//     }
//     setUser(mockUser)
//     localStorage.setItem("user", JSON.stringify(mockUser))
//   }

//   const signup = async (email: string, password: string, name: string) => {
//     const mockUser: User = {
//       id: Math.random().toString(),
//       email,
//       name,
//       avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
//     }
//     setUser(mockUser)
//     localStorage.setItem("user", JSON.stringify(mockUser))
//   }

//   const logout = () => {
//     setUser(null)
//     localStorage.removeItem("user")
//   }

//   const loginWithGoogle = async () => {
//     const mockUser: User = {
//       id: Math.random().toString(),
//       email: "user@gmail.com",
//       name: "Google User",
//       avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=google`,
//     }
//     setUser(mockUser)
//     localStorage.setItem("user", JSON.stringify(mockUser))
//   }

//   return (
//     <AuthContext.Provider value={{ user, isLoading, login, signup, logout, loginWithGoogle }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export function useAuth() {
//   const context = useContext(AuthContext)
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider")
//   }
//   return context
// }




// "use client"

// import React, { createContext, useContext, useEffect, useState } from "react"

// interface User {
//   id: string
//   email: string
//   name: string
//   avatar?: string
// }

// interface AuthContextType {
//   user: User | null
//   isLoading: boolean
//   login: (email: string, password: string) => Promise<void>
//   signup: (email: string, password: string, name: string) => Promise<void>
//   logout: () => void
//   loginWithGoogle: () => Promise<void>
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined)

// // Get API URL from environment variable
// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null)
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     // Check if user is logged in on mount
//     const savedUser = localStorage.getItem("user")
//     const savedToken = localStorage.getItem("token")
    
//     if (savedUser && savedToken) {
//       setUser(JSON.parse(savedUser))
//     }
//     setIsLoading(false)
//   }, [])

//   const login = async (email: string, password: string) => {
//     try {
//       const response = await fetch(`${API_URL}/auth/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       })

//       if (!response.ok) {
//         const error = await response.json()
//         throw new Error(error.message || "Login failed")
//       }

//       const data = await response.json()

//       // Store user and token
//       const userData: User = {
//         id: data.user.id,
//         email: data.user.email,
//         name: data.user.fullName, // Backend returns fullName
//         avatar: data.user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.user.email}`,
//       }

//       setUser(userData)
//       localStorage.setItem("user", JSON.stringify(userData))
//       localStorage.setItem("token", data.token) // Store the JWT token
//     } catch (error) {
//       console.error("Login error:", error)
//       throw error
//     }
//   }

//   const signup = async (email: string, password: string, name: string) => {
//     try {
//       const response = await fetch(`${API_URL}/auth/register`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password, fullName: name }),
//       })

//       if (!response.ok) {
//         const error = await response.json()
//         throw new Error(error.message || "Signup failed")
//       }

//       const data = await response.json()

//       // Store user and token
//       const userData: User = {
//         id: data.user.id,
//         email: data.user.email,
//         name: data.user.fullName, // Backend returns fullName
//         avatar: data.user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.user.email}`,
//       }

//       setUser(userData)
//       localStorage.setItem("user", JSON.stringify(userData))
//       localStorage.setItem("token", data.token) // Store the JWT token
//     } catch (error) {
//       console.error("Signup error:", error)
//       throw error
//     }
//   }

//   const logout = () => {
//     setUser(null)
//     localStorage.removeItem("user")
//     localStorage.removeItem("token") // Remove token on logout
//   }

//   const loginWithGoogle = async () => {
//     // Implement Google OAuth flow here
//     // For now, throwing an error to remind you to implement it
//     throw new Error("Google login not yet implemented. Please set up Google OAuth.")
    
//     // When you implement Google OAuth, it should look something like:
//     // 1. Redirect to Google OAuth
//     // 2. Get callback with code
//     // 3. Send code to your backend
//     // 4. Backend validates and returns user + token
//     // 5. Store user and token like in login()
//   }

//   return (
//     <AuthContext.Provider value={{ user, isLoading, login, signup, logout, loginWithGoogle }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export function useAuth() {
//   const context = useContext(AuthContext)
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider")
//   }
//   return context
// }

// // Helper function to get the token (export this to use in other files)
// export function getToken(): string | null {
//   return localStorage.getItem("token")
// }








// "use client"

// import React, { createContext, useContext, useEffect, useState } from "react"
// import { useRouter } from "next/navigation"
// import { loginUser, registerUser, googleLoginBackend } from "@/lib/api" // ✅ Added googleLoginBackend
// import { auth, googleProvider } from "@/lib/firebase" // ✅ Import Firebase config
// import { signInWithPopup } from "firebase/auth" // ✅ Import Firebase Auth

// // 1. Define User Type (Matches Backend Response)
// interface User {
//   id: string
//   email: string
//   name: string // Mapped from backend 'fullName'
//   avatar?: string // Mapped from backend 'photoURL'
// }

// interface AuthContextType {
//   user: User | null
//   isLoading: boolean
//   login: (email: string, password: string) => Promise<void>
//   signup: (email: string, password: string, name: string) => Promise<void>
//   logout: () => void
//   loginWithGoogle: () => Promise<void>
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined)

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const router = useRouter()

//   // 2. Load User from LocalStorage on Mount
//   useEffect(() => {
//     const savedUser = localStorage.getItem("user")
//     const savedToken = localStorage.getItem("token")
    
//     if (savedUser && savedToken) {
//       try {
//         setUser(JSON.parse(savedUser))
//       } catch (e) {
//         console.error("Failed to parse user data", e)
//         logout()
//       }
//     }
//     setIsLoading(false)
//   }, [])

//   // 3. Login Function (Email/Pass)
//   const login = async (email: string, password: string) => {
//     try {
//       const data = await loginUser(email, password)

//       if (data.user) {
//         const userData: User = {
//           id: data.user.id,
//           email: data.user.email,
//           name: data.user.fullName, 
//           avatar: data.user.photoURL,
//         }

//         setUser(userData)
//         localStorage.setItem("user", JSON.stringify(userData))
//         localStorage.setItem("token", data.token)
//       }
//     } catch (error: any) {
//       console.error("Login error:", error)
//       throw new Error(error.response?.data?.message || "Login failed")
//     }
//   }

//   // 4. Signup Function (Email/Pass)
//   const signup = async (email: string, password: string, name: string) => {
//     try {
//       const data = await registerUser(name, email, password)

//       if (data.user) {
//         const userData: User = {
//           id: data.user.id,
//           email: data.user.email,
//           name: data.user.fullName,
//           avatar: data.user.photoURL,
//         }

//         setUser(userData)
//         localStorage.setItem("user", JSON.stringify(userData))
//         localStorage.setItem("token", data.token)
//       }
//     } catch (error: any) {
//       console.error("Signup error:", error)
//       throw new Error(error.response?.data?.message || "Signup failed")
//     }
//   }

//   // 5. Logout
//   const logout = () => {
//     setUser(null)
//     localStorage.removeItem("user")
//     localStorage.removeItem("token")
//     router.push("/login")
//   }

//   // 6. ✅ REAL Google Login Logic
//   const loginWithGoogle = async () => {
//     try {
//       // A. Open Google Popup (Firebase handles security)
//       const result = await signInWithPopup(auth, googleProvider)
//       const googleUser = result.user

//       // B. Send Google Data to YOUR Backend (MongoDB)
//       const data = await googleLoginBackend(
//         googleUser.email!,
//         googleUser.displayName || "Google User",
//         googleUser.uid,
//         googleUser.photoURL || ""
//       )

//       // C. Save YOUR App's Token
//       if (data.token) {
//         const userData: User = {
//           id: data.user.id,
//           email: data.user.email,
//           name: data.user.fullName,
//           avatar: data.user.photoURL,
//         }

//         setUser(userData)
//         localStorage.setItem("user", JSON.stringify(userData))
//         localStorage.setItem("token", data.token) // Your JWT
        
//         router.push("/") // Redirect to home/dashboard
//       }
//     } catch (error: any) {
//       console.error("Google Auth Error:", error)
//       // Provide a clean error message
//       throw new Error("Google Login Failed. Please try again.")
//     }
//   }

//   return (
//     <AuthContext.Provider value={{ user, isLoading, login, signup, logout, loginWithGoogle }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export function useAuth() {
//   const context = useContext(AuthContext)
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider")
//   }
//   return context
// }






"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { loginUser, registerUser, googleLoginBackend } from "@/lib/api"
import { auth, googleProvider } from "@/lib/firebase"
import { signInWithPopup } from "firebase/auth"

// 1. Define User Type
interface User {
  id: string
  email: string
  name: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  loginWithGoogle: () => Promise<void>
  updateUser: (updates: Partial<User>) => void // 👈 NEW: Type definition
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // 2. Load User from LocalStorage on Mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    const savedToken = localStorage.getItem("token")
    
    if (savedUser && savedToken) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (e) {
        console.error("Failed to parse user data", e)
        logout()
      }
    }
    setIsLoading(false)
  }, [])

  // 3. Login Function
  const login = async (email: string, password: string) => {
    try {
      const data = await loginUser(email, password)

      if (data.user) {
        const userData: User = {
          id: data.user.id,
          email: data.user.email,
          name: data.user.fullName, 
          avatar: data.user.photoURL,
        }

        setUser(userData)
        localStorage.setItem("user", JSON.stringify(userData))
        localStorage.setItem("token", data.token)
      }
    } catch (error: any) {
      console.error("Login error:", error)
      throw new Error(error.response?.data?.message || "Login failed")
    }
  }

  // 4. Signup Function
  const signup = async (email: string, password: string, name: string) => {
    try {
      const data = await registerUser(name, email, password)

      if (data.user) {
        const userData: User = {
          id: data.user.id,
          email: data.user.email,
          name: data.user.fullName,
          avatar: data.user.photoURL,
        }

        setUser(userData)
        localStorage.setItem("user", JSON.stringify(userData))
        localStorage.setItem("token", data.token)
      }
    } catch (error: any) {
      console.error("Signup error:", error)
      throw new Error(error.response?.data?.message || "Signup failed")
    }
  }

  // 5. Logout
  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    router.push("/login")
  }

  // 6. Google Login
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const googleUser = result.user

      const data = await googleLoginBackend(
        googleUser.email!,
        googleUser.displayName || "Google User",
        googleUser.uid,
        googleUser.photoURL || ""
      )

      if (data.token) {
        const userData: User = {
          id: data.user.id,
          email: data.user.email,
          name: data.user.fullName,
          avatar: data.user.photoURL,
        }

        setUser(userData)
        localStorage.setItem("user", JSON.stringify(userData))
        localStorage.setItem("token", data.token)
        
        router.push("/")
      }
    } catch (error: any) {
      console.error("Google Auth Error:", error)
      throw new Error("Google Login Failed. Please try again.")
    }
  }

  // 7. ✅ NEW: Update User Function (For Settings Page)
  const updateUser = (updates: Partial<User>) => {
    if (!user) return

    // Merge existing user data with the new updates
    const updatedUser = { ...user, ...updates }
    
    // Update State (React)
    setUser(updatedUser)
    
    // Update Local Storage (Persistence)
    localStorage.setItem("user", JSON.stringify(updatedUser))
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, loginWithGoogle, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}