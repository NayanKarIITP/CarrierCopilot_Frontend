

"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts"
import { TrendingUp } from "lucide-react"

interface PerformanceCategoryProps {
  title: string
  score: number
  description: string
  trend?: { session: string; score: number }[]
  items?: { label: string; value: string; type?: "strength" | "improvement" }[]
  chartType?: "line" | "bar"
}

export default function PerformanceCategory({
  title,
  score,
  description,
  trend = [
    { session: "S1", score: 65 },
    { session: "S2", score: 68 },
    { session: "S3", score: 72 },
    { session: "S4", score: 75 },
    { session: "S5", score: 78 },
  ],
  items = [],
  chartType = "line",
}: PerformanceCategoryProps) {
  const trendData = Array.isArray(trend) && trend.length > 0 ? trend : []

  return (
    <div className="bg-white dark:bg-card rounded-2xl border border-gray-200 dark:border-border p-6 shadow-sm">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            {title}
            {score >= 80 && <TrendingUp size={20} className="text-emerald-500 dark:text-emerald-400" />}
          </h3>
          <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{score}</span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>

      {trendData.length > 0 && (
        <div className="mb-6 h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "line" ? (
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} className="dark:stroke-gray-700" />
                <XAxis 
                    dataKey="session" 
                    stroke="#9ca3af" 
                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    height={30} 
                />
                <YAxis 
                    stroke="#9ca3af" 
                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    domain={[0, 100]} 
                    width={35} 
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--background)", // Uses CSS var or hardcoded
                    borderColor: "#e5e7eb",
                    borderRadius: "8px",
                    color: "#374151"
                  }}
                  itemStyle={{ color: "#4f46e5" }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#4f46e5"
                  strokeWidth={3}
                  dot={{ fill: "#4f46e5", r: 4, strokeWidth: 2, stroke: "#fff" }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            ) : (
              <BarChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} className="dark:stroke-gray-700" />
                <XAxis 
                    dataKey="session" 
                    stroke="#9ca3af" 
                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    height={30} 
                />
                <YAxis 
                    stroke="#9ca3af" 
                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    domain={[0, 100]} 
                    width={35} 
                />
                <Tooltip
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderColor: "#e5e7eb",
                    borderRadius: "8px",
                    color: "#374151"
                  }}
                />
                <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                  {trendData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === trendData.length - 1 ? "#4f46e5" : "#c7d2fe"}
                      className={index === trendData.length - 1 ? "dark:fill-indigo-500" : "dark:fill-indigo-900"}
                    />
                  ))}
                </Bar>
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      )}

      {items.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-200">Key Insights:</p>
          <div className="space-y-2">
            {items.map((item, idx) => (
              <div
                key={idx}
                className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
                  item.type === "strength"
                    ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800"
                    : item.type === "improvement"
                      ? "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border border-amber-100 dark:border-amber-800"
                      : "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-800"
                }`}
              >
                <span>{item.type === "strength" ? "✓" : item.type === "improvement" ? "↗" : "○"}</span>
                <span>
                  {item.label}: <strong className="font-bold">{item.value}</strong>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}