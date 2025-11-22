// "use client"

// import type React from "react"
// import { createContext, useContext, useEffect, useState } from "react"

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
//     // Load user from localStorage on mount
//     const savedUser = localStorage.getItem("user")
//     if (savedUser) {
//       setUser(JSON.parse(savedUser))
//     }
//     setIsLoading(false)
//   }, [])

//   const login = async (email: string, password: string) => {
//     // Mock login - in production, call your auth API
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
//     // Mock signup - in production, call your auth API
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
//     // Mock Google login - in production, integrate with OAuth provider
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








"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const mockUser: User = {
      id: "1",
      email,
      name: email.split("@")[0],
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    }
    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))
  }

  const signup = async (email: string, password: string, name: string) => {
    const mockUser: User = {
      id: Math.random().toString(),
      email,
      name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    }
    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const loginWithGoogle = async () => {
    const mockUser: User = {
      id: Math.random().toString(),
      email: "user@gmail.com",
      name: "Google User",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=google`,
    }
    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, loginWithGoogle }}>
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
