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
  trend?: number[]
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
    <div className="glass rounded-2xl border border-border p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
            {title}
            {score >= 80 && <TrendingUp size={20} className="text-green-500" />}
          </h3>
          <span className="text-3xl font-bold text-primary">{score}</span>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      {trendData.length > 0 && (
        <div className="mb-6 h-[200px]">
          {chartType === "line" ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid stroke="rgb(var(--color-border) / 0.3)" vertical={false} />
                <XAxis dataKey="session" stroke="rgb(var(--color-muted-foreground))" height={30} />
                <YAxis stroke="rgb(var(--color-muted-foreground))" domain={[0, 100]} width={35} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgb(var(--color-card))",
                    border: "none",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="hsl(var(--color-primary))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--color-accent))", r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData}>
                <CartesianGrid stroke="rgb(var(--color-border) / 0.3)" vertical={false} />
                <XAxis dataKey="session" stroke="rgb(var(--color-muted-foreground))" height={30} />
                <YAxis stroke="rgb(var(--color-muted-foreground))" domain={[0, 100]} width={35} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgb(var(--color-card))",
                    border: "none",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="score" radius={4}>
                  {trendData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === trendData.length - 1 ? "hsl(var(--color-accent))" : "hsl(var(--color-primary))"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      )}

      {items.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-semibold text-foreground">Key Insights:</p>
          <div className="space-y-2">
            {items.map((item, idx) => (
              <div
                key={idx}
                className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
                  item.type === "strength"
                    ? "bg-green-500/10 text-green-400 border border-green-500/30"
                    : item.type === "improvement"
                      ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                      : "bg-blue-500/10 text-blue-400 border border-blue-500/30"
                }`}
              >
                <span>{item.type === "strength" ? "✓" : item.type === "improvement" ? "↗" : "○"}</span>
                <span>
                  {item.label}: <strong>{item.value}</strong>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
