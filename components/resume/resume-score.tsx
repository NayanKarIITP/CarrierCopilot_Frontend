

"use client"

import { Zap, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"

interface ResumeScoreProps {
  score: number; // 0 to 100
  loading?: boolean;
}

export default function ResumeScore({ score, loading = false }: ResumeScoreProps) {
  
  // Determine color based on score (Dark mode aware)
  const getColor = (s: number) => {
    if (s >= 80) return "text-emerald-500 dark:text-emerald-400";
    if (s >= 50) return "text-yellow-500 dark:text-yellow-400";
    return "text-red-500 dark:text-red-400";
  };

  const getLabel = (s: number) => {
    if (s >= 80) return { text: "Excellent", icon: CheckCircle, color: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30" };
    if (s >= 50) return { text: "Average", icon: TrendingUp, color: "text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30" };
    return { text: "Needs Work", icon: AlertTriangle, color: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30" };
  };

  const status = getLabel(score);
  
  // SVG Circle Calculation
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  if (loading) {
      return (
          <div className="bg-white dark:bg-card rounded-2xl p-6 border border-gray-200 dark:border-border shadow-sm animate-pulse flex items-center gap-4">
              <div className="h-16 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
              <div className="flex-1 space-y-2">
                  <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
          </div>
      )
  }

  return (
    <div className="bg-white dark:bg-card rounded-2xl p-6 border border-gray-200 dark:border-border shadow-sm flex flex-col md:flex-row items-center gap-6 md:gap-8 hover:shadow-md transition-shadow">
      
      {/* Circular Progress */}
      <div className="relative h-24 w-24 flex items-center justify-center">
        {/* Background Circle */}
        <svg className="transform -rotate-90 w-24 h-24">
            <circle
                className="text-gray-100 dark:text-gray-700"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r={radius}
                cx="48"
                cy="48"
            />
            {/* Progress Circle */}
            <circle
                className={`${getColor(score).split(' ')[0]} transition-all duration-1000 ease-out`}
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r={radius}
                cx="48"
                cy="48"
            />
        </svg>
        <div className="absolute flex flex-col items-center">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">{score}</span>
        </div>
      </div>

      {/* Text Info */}
      <div className="flex-1 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Resume Score</h3>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                {status.text}
            </span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            {score >= 80 
                ? "Your resume is strong! It's well-optimized for ATS systems."
                : score >= 50
                ? "Good start. Focus on quantifying your achievements to boost your score."
                : "Your resume needs significant improvements to pass automated screenings."
            }
        </p>
      </div>
    </div>
  )
}