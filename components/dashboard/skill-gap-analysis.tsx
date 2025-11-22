"use client"

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const data = [
  { skill: "React", "Your Skills": 85, "Target Role": 90 },
  { skill: "TypeScript", "Your Skills": 78, "Target Role": 88 },
  { skill: "System Design", "Your Skills": 65, "Target Role": 85 },
  { skill: "Algorithms", "Your Skills": 72, "Target Role": 80 },
  { skill: "Communication", "Your Skills": 80, "Target Role": 85 },
  { skill: "Problem Solving", "Your Skills": 75, "Target Role": 88 },
]

export default function SkillGapAnalysis() {
  return (
    <div className="glass rounded-2xl p-6 border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4">Skill Gap Analysis</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={data}>
          <PolarGrid stroke="rgb(var(--color-border) / 0.3)" />
          <PolarAngleAxis dataKey="skill" stroke="rgb(var(--color-muted-foreground))" />
          <PolarRadiusAxis stroke="rgb(var(--color-muted-foreground))" />
          <Radar
            name="Your Skills"
            dataKey="Your Skills"
            stroke="hsl(var(--color-primary))"
            fill="hsl(var(--color-primary))"
            fillOpacity={0.25}
          />
          <Radar
            name="Target Role"
            dataKey="Target Role"
            stroke="hsl(var(--color-accent))"
            fill="hsl(var(--color-accent))"
            fillOpacity={0.15}
          />
          <Legend />
          <Tooltip contentStyle={{ backgroundColor: "rgb(var(--color-card))", border: "none", borderRadius: "8px" }} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
