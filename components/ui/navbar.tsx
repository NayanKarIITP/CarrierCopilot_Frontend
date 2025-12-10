// "use client"

// import { useEffect, useState } from "react"
// import { ThemeToggle } from "@/components/ui/theme-toggle"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Separator } from "@/components/ui/separator"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"

// /**
//  * Navbar component
//  * 
//  * This component renders the top navigation bar of the application.
//  * It displays the user's name and email, and provides a dropdown menu
//  * with links to the profile, settings, and help & support pages.
//  * If the user is not logged in, it displays a "Log in" button instead.
//  * 
//  * @returns {JSX.Element} The navbar component
//  */
// export default function Navbar() {
//   const [user, setUser] = useState<{ name: string; email: string; image?: string } | null>(null)

//   // ✅ Fetch user data (simulate reading from localStorage or API)
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user")
//     if (storedUser) {
//       try {
//         setUser(JSON.parse(storedUser))
//       } catch {
//         console.warn("Invalid user data in localStorage")
//       }
//     }
//   }, [])

//   const handleLogout = () => {
//     localStorage.removeItem("user")
//     setUser(null)
//     window.location.href = "/login"
//   }

//   return (
//     <header className="sticky top-0 left z-30 flex w-full items-center justify-between border-b border-border bg-background/70 backdrop-blur-md px-6 py-3 shadow-sm">
//       {/* Left Section */}
//       <div className="flex items-center gap-2">
//         <h1 className="text-xl font-semibold text-foreground tracking-tight">
//           NK Dashboard
//         </h1>
//       </div>

//       {/* Right Section */}
//       <div className="flex items-center gap-4">
//         <ThemeToggle />
//         <Separator orientation="vertical" className="h-6" />

//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <button className="flex items-center gap-2 cursor-pointer rounded-md px-2 py-1 hover:bg-accent hover:text-accent-foreground transition">
//               <Avatar className="h-8 w-8">
//                 <AvatarImage src={user?.image || "/avatars/default-user.png"} alt="User" />
//                 <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
//               </Avatar>
//               <span className="text-sm font-medium text-foreground hidden sm:inline-block">
//                 {user?.name || "Guest User"}
//               </span>
//             </button>
//           </DropdownMenuTrigger>

//           <DropdownMenuContent align="end" className="w-48">
//             <DropdownMenuLabel>
//               <p className="text-sm font-semibold text-muted-foreground">Signed in as</p>
//               <p className="text-sm font-medium truncate">{user?.email || "Not logged in"}</p>
//             </DropdownMenuLabel>
//             <DropdownMenuSeparator />

//             {user ? (
//               <>
//                 <DropdownMenuItem>Profile</DropdownMenuItem>
//                 <DropdownMenuItem>Settings</DropdownMenuItem>
//                 <DropdownMenuItem>Help & Support</DropdownMenuItem>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem
//                   onClick={handleLogout}
//                   className="text-red-600 hover:bg-red-100 dark:hover:bg-red-900/40 cursor-pointer transition"
//                 >
//                   Log out
//                 </DropdownMenuItem>
//               </>
//             ) : (
//               <DropdownMenuItem
//                 onClick={() => (window.location.href = "/login")}
//                 className="cursor-pointer"
//               >
//                 Log in
//               </DropdownMenuItem>
//             )}
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//     </header>
//   )
// }








"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { 
  LayoutGrid, FileText, Mic, Map, TrendingUp, Settings, 
  Menu, Command, LogOut, Sparkles, X, Sun, Moon
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet"

// --- NAVIGATION CONFIG ---
const mainNav = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutGrid },
  { title: "Resume", url: "/resume", icon: FileText },
  { title: "Interview", url: "/interviewer", icon: Mic },
  { title: "Roadmap", url: "/roadmap", icon: Map },
  { title: "Trends", url: "/market-trends", icon: TrendingUp },
]

export default function Navbar() {
  const [user, setUser] = React.useState<{ name: string; email: string; image?: string } | null>(null)
  const pathname = usePathname()
  const { setTheme, theme } = useTheme()

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        try { setUser(JSON.parse(storedUser)) } catch {}
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    setUser(null)
    window.location.href = "/login"
  }

  // Helper for checking active state
  const isActive = (url: string) => pathname === url || pathname.startsWith(`${url}/`)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 md:px-6">
        
        {/* --- 1. MOBILE MENU (Left) --- */}
        <div className="md:hidden mr-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] sm:w-[350px]">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">
                    NK
                  </div>
                  CareerCopilot
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-2 mt-6">
                {mainNav.map((item) => (
                  <SheetClose key={item.url} asChild>
                    <Link
                      href={item.url}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive(item.url) 
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" 
                          : "text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.title}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* --- 2. LOGO (Left) --- */}
        <div className="flex items-center gap-2 mr-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold shadow-sm">
              CC
            </div>
            <span className="hidden font-bold sm:inline-block">CareerCopilot</span>
          </Link>
        </div>

        {/* --- 3. DESKTOP NAVIGATION (Center) --- */}
        <nav className="hidden md:flex items-center gap-1 mx-6">
          {mainNav.map((item) => (
            <Link
              key={item.url}
              href={item.url}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                isActive(item.url)
                  ? "bg-secondary text-secondary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </nav>

        {/* --- 4. RIGHT ACTIONS (Theme & Profile) --- */}
        <div className="flex flex-1 items-center justify-end gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="rounded-full"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9 border border-border/50">
                  <AvatarImage src={user?.image} alt={user?.name || "User"} />
                  <AvatarFallback className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200">
                    {user?.name?.[0] || "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name || "Guest"}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email || "guest@example.com"}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer gap-2">
                <Sparkles className="h-4 w-4 text-blue-500" />
                <span>Upgrade to Pro</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer gap-2" onClick={() => window.location.href = "/settings"}>
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer gap-2 text-red-600 focus:bg-red-50 focus:text-red-700 dark:focus:bg-red-900/20" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}