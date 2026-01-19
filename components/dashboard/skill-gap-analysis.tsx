// "use client"

// import {
//   RadarChart,
//   PolarGrid,
//   PolarAngleAxis,
//   PolarRadiusAxis,
//   Radar,
//   Legend,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts"

// const data = [
//   { skill: "React", "Your Skills": 85, "Target Role": 90 },
//   { skill: "TypeScript", "Your Skills": 78, "Target Role": 88 },
//   { skill: "System Design", "Your Skills": 65, "Target Role": 85 },
//   { skill: "Algorithms", "Your Skills": 72, "Target Role": 80 },
//   { skill: "Communication", "Your Skills": 80, "Target Role": 85 },
//   { skill: "Problem Solving", "Your Skills": 75, "Target Role": 88 },
// ]

// export default function SkillGapAnalysis() {
//   return (
//     <div className="glass rounded-2xl p-6 border border-border">
//       <h3 className="text-lg font-semibold text-foreground mb-4">Skill Gap Analysis</h3>
//       <ResponsiveContainer width="100%" height={300}>
//         <RadarChart data={data}>
//           <PolarGrid stroke="rgb(var(--color-border) / 0.3)" />
//           <PolarAngleAxis dataKey="skill" stroke="rgb(var(--color-muted-foreground))" />
//           <PolarRadiusAxis stroke="rgb(var(--color-muted-foreground))" />
//           <Radar
//             name="Your Skills"
//             dataKey="Your Skills"
//             stroke="hsl(var(--color-primary))"
//             fill="hsl(var(--color-primary))"
//             fillOpacity={0.25}
//           />
//           <Radar
//             name="Target Role"
//             dataKey="Target Role"
//             stroke="hsl(var(--color-accent))"
//             fill="hsl(var(--color-accent))"
//             fillOpacity={0.15}
//           />
//           <Legend />
//           <Tooltip contentStyle={{ backgroundColor: "rgb(var(--color-card))", border: "none", borderRadius: "8px" }} />
//         </RadarChart>
//       </ResponsiveContainer>
//     </div>
//   )
// }





// "use client";

// import {
//   RadarChart,
//   PolarGrid,
//   PolarAngleAxis,
//   PolarRadiusAxis,
//   Radar,
//   ResponsiveContainer,
// } from "recharts";

// export default function SkillGapAnalysis({ skills = [], gaps = [] }) {
//   const data = skills.map((s: string, i: number) => ({
//     skill: s,
//     you: 80,
//     target: gaps[i] ? 100 : 90
//   }));

//   return (
//     <div className="glass rounded-2xl p-6 border border-border">
//       <h3 className="text-lg font-semibold text-foreground mb-4">
//         Skill Gap Analysis
//       </h3>

//       <ResponsiveContainer width="100%" height={300}>
//         <RadarChart data={data}>
//           <PolarGrid stroke="rgb(var(--color-border) / 0.3)" />
//           <PolarAngleAxis dataKey="skill" stroke="rgb(var(--color-muted-foreground))" />
//           <PolarRadiusAxis stroke="rgb(var(--color-muted-foreground))" />
//           <Radar
//             name="Your Skills"
//             dataKey="you"
//             stroke="hsl(var(--color-primary))"
//             fill="hsl(var(--color-primary))"
//             fillOpacity={0.25}
//           />
//           <Radar
//             name="Target Role"
//             dataKey="target"
//             stroke="hsl(var(--color-accent))"
//             fill="hsl(var(--color-accent))"
//             fillOpacity={0.15}
//           />
//         </RadarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }




"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";
import { AlertCircle } from "lucide-react";

interface SkillGapProps {
  skills?: string[];
  gaps?: any[];
}

export default function SkillGapAnalysis({ gaps = [] }: SkillGapProps) {

  if (!gaps || gaps.length === 0) {
    return (
      <Card className="shadow-sm"> {/* ✅ removed h-full */}
        <CardHeader className="px-4 pt-4 pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            Skill Gap Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[160px] text-gray-500 px-4 pb-4 pt-0">
          <p>No major skill gaps found!</p>
        </CardContent>
      </Card>
    );
  }

  const chartData = gaps.map((g) =>
    typeof g === "string" ? { name: g, val: 50 } : { name: g.skill, val: g.importance }
  );

  return (
    <Card className="shadow-sm"> {/* ✅ removed h-full */}
      <CardHeader className="px-4 pt-4 pb-1">
        <CardTitle className="flex items-center gap-2 text-lg">
          <AlertCircle className="w-5 h-5 text-amber-500" />
          Critical Missing Skills
        </CardTitle>
      </CardHeader>

      <CardContent className="px-4 pb-2 pt-1">
        <div className="h-[160px] w-full"> {/* ✅ reduced height */}
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ left: 0, right: 10, top: 5, bottom: 0 }}
            >
              <XAxis type="number" hide domain={[0, 100]} />
              <YAxis
                dataKey="name"
                type="category"
                width={120}
                tick={{ fontSize: 12, fill: "#6b7280", fontWeight: 600 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip cursor={{ fill: "transparent" }} />
              <Bar
                dataKey="val"
                radius={[0, 4, 4, 0]}
                barSize={22}
                background={{ fill: "#f3f4f6" }}
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={entry.val > 80 ? "#ef4444" : "#f59e0b"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <p className="text-xs text-center text-muted-foreground mt-1">
          Higher score = Higher market demand
        </p>
      </CardContent>
    </Card>
  );
}
