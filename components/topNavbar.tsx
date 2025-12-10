"use client"

import { useEffect, useState } from "react"
import { Moon, Sun, User } from "lucide-react"
import { useTheme } from "next-themes" // Ensure you have next-themes installed
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

// Simple Theme Toggle Component if you don't have one separately
function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
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
  )
}

export default function Navbar() {
  const [user, setUser] = useState<{ name: string; email: string; image?: string } | null>(null)

  // Simulate fetching user data
  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser))
        } catch {
          console.warn("Invalid user data in localStorage")
        }
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    setUser(null)
    window.location.href = "/login"
  }

  return (
    <header className="sticky top-0 z-30 flex w-full items-center justify-between border-b border-border bg-background/95 backdrop-blur-sm px-6 py-3 shadow-sm">
      {/* Left Section: Breadcrumb or Page Title could go here */}
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-semibold text-foreground tracking-tight hidden md:block">
          NK Dashboard
        </h1>
      </div>

      {/* Right Section: Actions & Profile */}
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <Separator orientation="vertical" className="h-6 mx-1" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-auto gap-2 rounded-full px-2 hover:bg-accent">
              <Avatar className="h-8 w-8 border border-border">
                <AvatarImage src={user?.image} alt={user?.name || "User"} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {user?.name?.[0] || "N"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-sm hidden sm:flex">
                <span className="font-medium text-foreground">{user?.name || "Nayan Kar"}</span>
              </div>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <p className="text-sm font-medium">My Account</p>
              <p className="text-xs text-muted-foreground font-normal truncate">
                {user?.email || "nayan@example.com"}
              </p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Billing</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-900/20 cursor-pointer"
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}