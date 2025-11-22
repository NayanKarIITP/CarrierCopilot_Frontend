"use client"

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const fillerWordData = [
  { word: "Um", count: 3 },
  { word: "Uh", count: 1 },
  { word: "Like", count: 5 },
  { word: "You know", count: 2 },
]

const confidenceData = [
  { time: "0s", score: 65 },
  { time: "10s", score: 72 },
  { time: "20s", score: 78 },
  { time: "30s", score: 82 },
  { time: "40s", score: 75 },
]

const getGaugeScore = (score: number) => {
  if (score >= 80) return { color: "from-green-500 to-emerald-500", label: "Excellent" }
  if (score >= 60) return { color: "from-yellow-500 to-amber-500", label: "Good" }
  return { color: "from-red-500 to-orange-500", label: "Needs Work" }
}

export default function LiveFeedback() {
  const confidence = 75
  const eyeContact = 70
  const clarity = 82

  return (
    <div className="space-y-4 h-full">
      {/* Metric Gauges */}
      <div className="glass rounded-2xl border border-border p-6 space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Live Metrics</h3>

        <div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-semibold text-foreground">Confidence</p>
            <span className="text-2xl font-bold text-primary">{confidence}%</span>
          </div>
          <div className="w-full bg-card rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary to-accent h-full transition-all"
              style={{ width: `${confidence}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-semibold text-foreground">Eye Contact</p>
            <span className="text-2xl font-bold text-accent">{eyeContact}%</span>
          </div>
          <div className="w-full bg-card rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-accent to-primary h-full transition-all"
              style={{ width: `${eyeContact}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-semibold text-foreground">Clarity</p>
            <span className="text-2xl font-bold text-primary">{clarity}%</span>
          </div>
          <div className="w-full bg-card rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary to-accent h-full transition-all"
              style={{ width: `${clarity}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filler Words Chart */}
      <div className="glass rounded-2xl border border-border p-4">
        <h4 className="text-sm font-semibold text-foreground mb-3">Filler Words</h4>
        <ResponsiveContainer width="100%" height={120}>
          <BarChart data={fillerWordData}>
            <CartesianGrid stroke="rgb(var(--color-border) / 0.3)" vertical={false} />
            <XAxis dataKey="word" stroke="rgb(var(--color-muted-foreground))" height={30} />
            <YAxis stroke="rgb(var(--color-muted-foreground))" width={30} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgb(var(--color-card))",
                border: "none",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="count" fill="hsl(var(--color-accent))" radius={4} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Confidence Trend */}
      <div className="glass rounded-2xl border border-border p-4">
        <h4 className="text-sm font-semibold text-foreground mb-3">Confidence Trend</h4>
        <ResponsiveContainer width="100%" height={100}>
          <LineChart data={confidenceData}>
            <CartesianGrid stroke="rgb(var(--color-border) / 0.3)" vertical={false} />
            <XAxis dataKey="time" stroke="rgb(var(--color-muted-foreground))" height={25} />
            <YAxis stroke="rgb(var(--color-muted-foreground))" width={30} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgb(var(--color-card))",
                border: "none",
                borderRadius: "8px",
              }}
            />
            <Line type="monotone" dataKey="score" stroke="hsl(var(--color-primary))" dot={false} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
