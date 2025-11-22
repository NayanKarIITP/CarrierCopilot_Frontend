"use client"

import { useEffect, useState } from "react"
import { ThemeToggle } from "@/components/ui/theme-toggle"
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

export default function Navbar() {
  const [user, setUser] = useState<{ name: string; email: string; image?: string } | null>(null)

  // ✅ Fetch user data (simulate reading from localStorage or API)
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        console.warn("Invalid user data in localStorage")
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
    window.location.href = "/login"
  }

  return (
    <header className="sticky top-0 left z-30 flex w-full items-center justify-between border-b border-border bg-background/70 backdrop-blur-md px-6 py-3 shadow-sm">
      {/* Left Section */}
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-semibold text-foreground tracking-tight">
          NK Dashboard
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Separator orientation="vertical" className="h-6" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 cursor-pointer rounded-md px-2 py-1 hover:bg-accent hover:text-accent-foreground transition">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.image || "/avatars/default-user.png"} alt="User" />
                <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-foreground hidden sm:inline-block">
                {user?.name || "Guest User"}
              </span>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>
              <p className="text-sm font-semibold text-muted-foreground">Signed in as</p>
              <p className="text-sm font-medium truncate">{user?.email || "Not logged in"}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {user ? (
              <>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Help & Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600 hover:bg-red-100 dark:hover:bg-red-900/40 cursor-pointer transition"
                >
                  Log out
                </DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem
                onClick={() => (window.location.href = "/login")}
                className="cursor-pointer"
              >
                Log in
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
