"use client"

import Navigation from "@/components/navigation"
import { Card } from "@/components/ui/card"
import Navbar from "@/components/ui/navbar"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export default function MarketTrends() {
  const skillsData = [
    { skill: "React", demand: 95 },
    { skill: "Python", demand: 92 },
    { skill: "Kubernetes", demand: 88 },
    { skill: "GraphQL", demand: 75 },
    { skill: "AWS", demand: 90 },
    { skill: "Node.js", demand: 87 },
  ]

  const trendsData = [
    { month: "Jan", hiring: 120, salaries: 165 },
    { month: "Feb", hiring: 140, salaries: 168 },
    { month: "Mar", hiring: 165, salaries: 172 },
    { month: "Apr", hiring: 155, salaries: 170 },
    { month: "May", hiring: 180, salaries: 175 },
    { month: "Jun", hiring: 195, salaries: 180 },
  ]

  const salaryData = [
    { role: "Junior Dev", salary: 85 },
    { role: "Mid-Level", salary: 130 },
    { role: "Senior Dev", salary: 170 },
    { role: "Tech Lead", salary: 200 },
    { role: "Manager", salary: 220 },
  ]

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navigation />
      <Navbar />

      {/* FULLY RESPONSIVE MAIN WRAPPER */}
      <main className="ml-0 md:ml-20 p-4 md:p-8">
        <div className="max-w-7xl mx-auto w-full space-y-10">

          {/* Header Section */}
          <div className="space-y-2 border-b border-border pb-6 mb-6 px-1 md:px-0">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              In-Demand Skills & Trends
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Stay informed about market trends and salary insights
            </p>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Top Skills */}
            <Card className="p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-bold mb-4">Top In-Demand Skills</h2>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={skillsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="skill" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="demand" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Hiring Trends */}
            <Card className="p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-bold mb-4">Hiring & Salary Trends</h2>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={trendsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="hiring" stroke="#3B82F6" strokeWidth={2} />
                  <Line type="monotone" dataKey="salaries" stroke="#60A5FA" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Salary Role Chart */}
            <Card className="p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-bold mb-4">Average Salaries by Role</h2>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={salaryData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="role" type="category" width={100} />
                  <Tooltip formatter={(value) => `$${value}K`} />
                  <Bar dataKey="salary" fill="#2563EB" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Insights Block */}
            <Card className="p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-bold mb-4">Market Insights</h2>
              <div className="space-y-4 text-sm md:text-base">
                <div className="flex justify-between pb-3 border-b">
                  <span className="font-medium">Growing Markets</span>
                  <span className="text-primary font-bold">+18%</span>
                </div>
                <div className="flex justify-between pb-3 border-b">
                  <span className="font-medium">AI/ML Opportunities</span>
                  <span className="text-primary font-bold">+45%</span>
                </div>
                <div className="flex justify-between pb-3 border-b">
                  <span className="font-medium">Remote Positions</span>
                  <span className="text-primary font-bold">62%</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Avg. Salary Growth</span>
                  <span className="text-accent font-bold">+8% YoY</span>
                </div>
              </div>
            </Card>

          </div>
        </div>
      </main>
    </div>
  )
}
