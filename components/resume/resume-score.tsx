"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { TrendingUp } from "lucide-react"

interface ResumeScoreProps {
  score?: number
}

export default function ResumeScore({ score = 88 }: ResumeScoreProps) {
  const [animatedScore, setAnimatedScore] = useState(0)

  useEffect(() => {
    let start = 0
    const timer = setInterval(() => {
      if (start < score) {
        start += 1
        setAnimatedScore(Math.min(start, score))
      } else {
        clearInterval(timer)
      }
    }, 15)
    return () => clearInterval(timer)
  }, [score])

  const circumference = 2 * Math.PI * 50
  const offset = circumference - (animatedScore / 100) * circumference

  return (
    <div className="glass rounded-2xl p-8 border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-6">Resume Score</h3>

      <div className="flex flex-col items-center gap-6">
        <div className="relative w-40 h-40">
          <svg width="160" height="160" className="transform -rotate-90">
            <circle cx="80" cy="80" r="50" fill="none" stroke="rgb(var(--color-border))" strokeWidth="10" />
            <circle
              cx="80"
              cy="80"
              r="50"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--color-primary))" />
                <stop offset="100%" stopColor="hsl(var(--color-accent))" />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-foreground">{animatedScore}</span>
            <span className="text-xs text-muted-foreground">/100</span>
          </div>
        </div>

        <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-foreground">
          <TrendingUp size={18} className="mr-2" />
          Improve Your Score
        </Button>
      </div>
    </div>
  )
}
