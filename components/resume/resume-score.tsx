// "use client"

// import { useEffect, useState } from "react"
// import { Button } from "@/components/ui/button"
// import { TrendingUp } from "lucide-react"

// interface ResumeScoreProps {
//   score?: number
// }

// export default function ResumeScore({ score = 88 }: ResumeScoreProps) {
//   const [animatedScore, setAnimatedScore] = useState(0)

//   useEffect(() => {
//     let start = 0
//     const timer = setInterval(() => {
//       if (start < score) {
//         start += 1
//         setAnimatedScore(Math.min(start, score))
//       } else {
//         clearInterval(timer)
//       }
//     }, 15)
//     return () => clearInterval(timer)
//   }, [score])

//   const circumference = 2 * Math.PI * 50
//   const offset = circumference - (animatedScore / 100) * circumference

//   return (
//     <div className="glass rounded-2xl p-8 border border-border">
//       <h3 className="text-lg font-semibold text-foreground mb-6">Resume Score</h3>

//       <div className="flex flex-col items-center gap-6">
//         <div className="relative w-40 h-40">
//           <svg width="160" height="160" className="transform -rotate-90">
//             <circle cx="80" cy="80" r="50" fill="none" stroke="rgb(var(--color-border))" strokeWidth="10" />
//             <circle
//               cx="80"
//               cy="80"
//               r="50"
//               fill="none"
//               stroke="url(#gradient)"
//               strokeWidth="10"
//               strokeDasharray={circumference}
//               strokeDashoffset={offset}
//               strokeLinecap="round"
//               className="transition-all duration-1000"
//             />
//             <defs>
//               <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
//                 <stop offset="0%" stopColor="hsl(var(--color-primary))" />
//                 <stop offset="100%" stopColor="hsl(var(--color-accent))" />
//               </linearGradient>
//             </defs>
//           </svg>

//           <div className="absolute inset-0 flex flex-col items-center justify-center">
//             <span className="text-4xl font-bold text-foreground">{animatedScore}</span>
//             <span className="text-xs text-muted-foreground">/100</span>
//           </div>
//         </div>

//         <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-foreground">
//           <TrendingUp size={18} className="mr-2" />
//           Improve Your Score
//         </Button>
//       </div>
//     </div>
//   )
// }





"use client";

import { useEffect, useState } from "react";
import { TrendingUp, CheckCircle, AlertTriangle, AlertCircle } from "lucide-react";

interface ResumeScoreProps {
  score?: number;
  loading?: boolean;
}

export default function ResumeScore({ score = 0, loading = false }: ResumeScoreProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  // Animation Logic
  useEffect(() => {
    if (loading) return;
    let start = 0;
    const duration = 1000; // 1 second animation
    const incrementTime = 15;
    const steps = duration / incrementTime;
    const incrementValue = score / steps;

    const timer = setInterval(() => {
      start += incrementValue;
      if (start >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.round(start));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [score, loading]);

  // Visual Logic based on Score
  let colorClass = "text-red-500";
  let strokeColor = "#ef4444"; // red-500
  let statusText = "Needs Improvement";
  let StatusIcon = AlertCircle;

  if (score >= 80) {
    colorClass = "text-green-600";
    strokeColor = "#16a34a"; // green-600
    statusText = "Excellent";
    StatusIcon = CheckCircle;
  } else if (score >= 60) {
    colorClass = "text-orange-500";
    strokeColor = "#f97316"; // orange-500
    statusText = "Good Start";
    StatusIcon = AlertTriangle;
  }

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedScore / 100) * circumference;

  if (loading) {
     return <div className="h-[300px] w-full bg-gray-100 animate-pulse rounded-2xl"></div>;
  }

  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm flex flex-col items-center justify-between h-full relative overflow-hidden">
      
      {/* Background Decor */}
      <div className={`absolute top-0 left-0 w-full h-2 ${score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-orange-500' : 'bg-red-500'}`} />

      <div className="text-center space-y-1 z-10">
        <h3 className="text-lg font-bold text-gray-800">ATS Score</h3>
        <p className="text-xs text-gray-500 uppercase tracking-wider">Automated Check</p>
      </div>

      {/* SVG Circle */}
      <div className="relative w-48 h-48 my-6">
        <svg width="192" height="192" className="transform -rotate-90">
          {/* Background Ring */}
          <circle
            cx="96" cy="96" r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
          />
          {/* Progress Ring */}
          <circle
            cx="96" cy="96" r={radius}
            fill="none"
            stroke={strokeColor}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-5xl font-black ${colorClass}`}>
            {animatedScore}
          </span>
          <span className="text-sm text-gray-400 font-medium">/ 100</span>
        </div>
      </div>

      {/* Status Badge */}
      <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${
          score >= 80 ? 'bg-green-50 border-green-200 text-green-700' : 
          score >= 60 ? 'bg-orange-50 border-orange-200 text-orange-700' : 
          'bg-red-50 border-red-200 text-red-700'
      }`}>
        <StatusIcon size={18} />
        <span className="font-bold text-sm">{statusText}</span>
      </div>

    </div>
  );
}