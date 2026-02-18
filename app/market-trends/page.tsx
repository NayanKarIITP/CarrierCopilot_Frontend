
"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts"

interface InsightData {
  growing_market: string
  ai_opportunity: string
  remote_jobs: string
  salary_growth: string
}

interface MarketData {
  skills: { skill: string; demand: number }[]
  trends: { month: string; hiring: number; salaries: number }[]
  salaries: { role: string; salary: number }[]
  insights: InsightData
}

export default function MarketTrends() {
  const [data, setData] = useState<MarketData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/trends")
        const result = await response.json()
        
        if (result.success && result.data) {
          setData(result.data)
        } else {
          setData(result) 
        }
      } catch (err) {
        console.error("Failed to fetch trends:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-muted-foreground">Gathering Real-Time Market Data...</p>
        </div>
      </div>
    )
  }

  if (!data || !data.skills) return <div className="p-10 text-center">No data available. Check Backend.</div>

  return (
    <div className="bg-background text-foreground min-h-screen">
      <main className="ml-0 md:ml-20 p-4 md:p-8">
        <div className="max-w-7xl mx-auto w-full space-y-10">

          <div className="space-y-2 border-b border-border pb-6 mb-6 px-1 md:px-0">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">2025 Market Intelligence</h1>
            <p className="text-muted-foreground text-sm md:text-base">Real-time insights powered by Google Gemini AI</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <Card className="p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-bold mb-4">Top Boom Skills (2025)</h2>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={data.skills} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis dataKey="skill" type="category" width={150} tick={{fontSize: 12}} />
                  <Tooltip />
                  <Bar dataKey="demand" fill="#3B82F6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-bold mb-4">Hiring Momentum</h2>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={data.trends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="hiring" stroke="#10B981" strokeWidth={2} name="Hiring Index" />
                  <Line type="monotone" dataKey="salaries" stroke="#6366F1" strokeWidth={2} name="Comp Index" />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-bold mb-4">Avg. Salary Ranges (k$)</h2>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={data.salaries} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="role" type="category" width={140} tick={{fontSize: 11}} />
                  <Tooltip formatter={(value) => `$${value}k`} />
                  <Bar dataKey="salary" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* SAFE INSIGHTS BLOCK - PREVENTS CRASHES */}
            <Card className="p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-bold mb-4">AI Market Analysis</h2>
              <div className="space-y-4 text-sm md:text-base">
                <div className="flex justify-between pb-3 border-b">
                  <span className="font-medium">Market Growth</span>
                  <span className="text-green-500 font-bold">{data.insights?.growing_market || "N/A"}</span>
                </div>
                <div className="flex justify-between pb-3 border-b">
                  <span className="font-medium">AI Opportunities</span>
                  <span className="text-blue-500 font-bold">{data.insights?.ai_opportunity || "N/A"}</span>
                </div>
                <div className="flex justify-between pb-3 border-b">
                  <span className="font-medium">Remote Work</span>
                  <span className="text-purple-500 font-bold">{data.insights?.remote_jobs || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">YoY Salary Growth</span>
                  <span className="text-orange-500 font-bold">{data.insights?.salary_growth || "N/A"}</span>
                </div>
              </div>
            </Card>

          </div>
        </div>
      </main>
    </div>
  )
}