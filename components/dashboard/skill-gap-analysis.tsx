
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
      <Card className="shadow-sm"> {/* removed h-full */}
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
    <Card className="shadow-sm"> {/*  removed h-full */}
      <CardHeader className="px-4 pt-4 pb-1">
        <CardTitle className="flex items-center gap-2 text-lg">
          <AlertCircle className="w-5 h-5 text-amber-500" />
          Critical Missing Skills
        </CardTitle>
      </CardHeader>

      <CardContent className="px-4 pb-2 pt-1">
        <div className="h-[160px] w-full"> {/*  reduced height */}
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
