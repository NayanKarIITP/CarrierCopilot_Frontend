"use client"

import Link from "next/link"
import { useState } from "react"
import {
  LayoutDashboard,
  FileText,
  Microscope as Microphone,
  Map,
  TrendingUp,
  Settings,
  Menu,
  X,
} from "lucide-react"

const navItems = [
  { name: "Dashboard", href: "/", icon: <LayoutDashboard size={22} /> },
  { name: "Resume", href: "/resume", icon: <FileText size={22} /> },
  { name: "Interviewer", href: "/interviewer", icon: <Microphone size={22} /> },
  { name: "Roadmap", href: "/roadmap", icon: <Map size={22} /> },
  { name: "Market Trends", href: "/market-trends", icon: <TrendingUp size={22} /> },
  { name: "Settings", href: "/settings", icon: <Settings size={22} /> },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="hidden md:fixed md:left-0 md:top-0 md:h-screen md:w-20 md:flex md:flex-col md:items-center md:bg-sidebar md:border-r md:border-sidebar-border md:py-8 md:gap-4">
        {/* Sidebar Logo */}
        <div className="flex items-center justify-center mb-6 mt-2">
          
        </div>

        {/* Navigation Icons */}
        <div className="flex flex-col gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group relative flex h-12 w-12 items-center justify-center rounded-lg transition-colors duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              title={item.name}
            >
              <div className="text-sidebar-foreground group-hover:text-sidebar-accent-foreground transition-colors">
                {item.icon}
              </div>
              <span className="absolute left-20 hidden whitespace-nowrap rounded-md bg-sidebar px-2 py-1 text-xs font-medium text-sidebar-foreground group-hover:block">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg bg-card text-foreground hover:bg-card/80 transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden fixed inset-0 top-16 bg-background border-r border-border z-40 flex flex-col gap-2 p-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 hover:bg-card text-foreground"
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      )}
    </>
  )
}
