

"use client"

import { useEffect, useState } from "react"
import { ThumbsUp } from "lucide-react"

interface OverallScoreProps {
  score?: number
}

export default function OverallScore({ score = 78 }: OverallScoreProps) {
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

  const circumference = 2 * Math.PI * 70
  const offset = circumference - (animatedScore / 100) * circumference

  const getMessage = (score: number) => {
    if (score >= 85) return "Excellent Performance!"
    if (score >= 70) return "Great Effort!"
    if (score >= 50) return "Room for Growth!"
    return "Keep Practicing!"
  }

  // Determine color based on score
  const getColorClass = (s: number) => {
      if (s >= 80) return "text-emerald-500 dark:text-emerald-400";
      if (s >= 60) return "text-indigo-500 dark:text-indigo-400";
      return "text-amber-500 dark:text-amber-400";
  };

  return (
    <div className="bg-white dark:bg-card rounded-2xl border border-gray-200 dark:border-border p-12 text-center shadow-sm relative overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 dark:from-indigo-900/10 to-transparent pointer-events-none" />

      <div className="relative w-56 h-56 mx-auto mb-8 z-10">
        <svg width="224" height="224" className="transform -rotate-90">
          {/* Background Circle */}
          <circle 
            cx="112" cy="112" r="70" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="12" 
            className="text-gray-100 dark:text-gray-800"
          />
          {/* Progress Circle */}
          <circle
            cx="112"
            cy="112"
            r="70"
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className={`${getColorClass(animatedScore)} transition-all duration-1000 ease-out`}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-6xl font-bold ${getColorClass(animatedScore)}`}>{animatedScore}</span>
          <span className="text-xl text-gray-400 dark:text-gray-500">%</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mb-4 relative z-10">
        <ThumbsUp className="text-amber-500 dark:text-amber-400" size={24} />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{getMessage(animatedScore)}</h2>
      </div>
      <p className="text-gray-500 dark:text-gray-400 relative z-10">
        {animatedScore >= 80
          ? "You demonstrated strong communication and technical knowledge."
          : "Focus on the areas below to improve your interview performance."}
      </p>
    </div>
  )
}