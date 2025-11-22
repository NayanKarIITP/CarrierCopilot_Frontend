// "use client"

// import React from "react"
// import { usePathname } from "next/navigation"
// import { AuthProvider } from "@/contexts/auth-context"
// import { ThemeProvider } from "@/contexts/theme-context"
// import ProtectedRoute from "@/components/protected-route"

// export default function Providers({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname()
//   const publicRoutes = ["/login", "/signup"]
//   const isPublic = publicRoutes.includes(pathname)

//   return (
//     <AuthProvider>
//       <ThemeProvider>
//         {isPublic ? children : <ProtectedRoute>{children}</ProtectedRoute>}
//       </ThemeProvider>
//     </AuthProvider>
//   )
// }






"use client";

import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/auth-context";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </AuthProvider>
  );
}
