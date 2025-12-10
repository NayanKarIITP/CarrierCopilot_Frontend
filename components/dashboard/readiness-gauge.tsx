// "use client"

// import { useEffect, useState } from "react"

// interface ReadinessGaugeProps {
//   score: number
// }

// export default function ReadinessGauge({ score = 78 }: ReadinessGaugeProps) {
//   const [animatedScore, setAnimatedScore] = useState(0)

//   useEffect(() => {
//     let start = 0
//     const timer = setInterval(() => {
//       if (start < score) {
//         start += 2
//         setAnimatedScore(Math.min(start, score))
//       } else {
//         clearInterval(timer)
//       }
//     }, 20)
//     return () => clearInterval(timer)
//   }, [score])

//   const circumference = 2 * Math.PI * 45
//   const offset = circumference - (animatedScore / 100) * circumference

//   return (
//     <div className="glass rounded-2xl p-6 border border-border flex flex-col items-center justify-center">
//       <h3 className="text-lg font-semibold text-foreground mb-6">Overall Readiness Score</h3>

//       <div className="relative w-32 h-32 mb-6">
//         <svg width="128" height="128" className="transform -rotate-90">
//           <circle cx="64" cy="64" r="45" fill="none" stroke="rgb(var(--color-border))" strokeWidth="8" />
//           <circle
//             cx="64"
//             cy="64"
//             r="45"
//             fill="none"
//             stroke="url(#gradient)"
//             strokeWidth="8"
//             strokeDasharray={circumference}
//             strokeDashoffset={offset}
//             strokeLinecap="round"
//             className="transition-all duration-1000"
//           />
//           <defs>
//             <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
//               <stop offset="0%" stopColor="hsl(var(--color-primary))" />
//               <stop offset="100%" stopColor="hsl(var(--color-accent))" />
//             </linearGradient>
//           </defs>
//         </svg>

//         <div className="absolute inset-0 flex items-center justify-center">
//           <span className="text-3xl font-bold text-foreground">{animatedScore}%</span>
//         </div>
//       </div>

//       <p className="text-sm text-muted-foreground text-center">
//         You're making great progress! Continue practicing to reach 85%+
//       </p>
//     </div>
//   )
// }






// "use client";

// import { useEffect, useState } from "react";

// export default function ReadinessGauge({ score = 78 }: { score?: number }) {
//   const [animatedScore, setAnimatedScore] = useState(0);

//   useEffect(() => {
//     let start = 0;
//     const timer = setInterval(() => {
//       if (start < (score ?? 0)) {
//         start += 2;
//         setAnimatedScore(Math.min(start, score ?? 0));
//       } else {
//         clearInterval(timer);
//       }
//     }, 20);
//     return () => clearInterval(timer);
//   }, [score]);

//   const circumference = 2 * Math.PI * 45;
//   const offset = circumference - ((animatedScore ?? 0) / 100) * circumference;

//   return (
//     <div className="glass rounded-2xl p-6 border border-border flex flex-col items-center justify-center">
//       <h3 className="text-lg font-semibold text-foreground mb-6">Overall Readiness Score</h3>

//       <div className="relative w-32 h-32 mb-6">
//         <svg width="128" height="128" className="transform -rotate-90">
//           <circle cx="64" cy="64" r="45" fill="none" stroke="rgb(var(--color-border))" strokeWidth="8" />
//           <circle
//             cx="64"
//             cy="64"
//             r="45"
//             fill="none"
//             stroke="url(#gradient)"
//             strokeWidth="8"
//             strokeDasharray={circumference}
//             strokeDashoffset={offset}
//             strokeLinecap="round"
//             className="transition-all duration-1000"
//           />
//           <defs>
//             <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
//               <stop offset="0%" stopColor="hsl(var(--color-primary))" />
//               <stop offset="100%" stopColor="hsl(var(--color-accent))" />
//             </linearGradient>
//           </defs>
//         </svg>

//         <div className="absolute inset-0 flex items-center justify-center">
//           <span className="text-3xl font-bold text-foreground">{animatedScore}%</span>
//         </div>
//       </div>

//       <p className="text-sm text-muted-foreground text-center">
//         You're making great progress! Continue practicing to reach 85%+
//       </p>
//     </div>
//   );
// }






"use client";

import { useEffect, useState } from "react";

export default function ReadinessGauge({ score = 0 }: { score?: number }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const timer = setInterval(() => {
      if (start < score) {
        start += 2;
        setAnimatedScore(Math.min(start, score));
      } else {
        clearInterval(timer);
      }
    }, 15);

    return () => clearInterval(timer);
  }, [score]);

  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (animatedScore / 100) * circumference;

  // Dynamic readiness text
  const readinessText =
    score >= 90
      ? "Outstanding! You're internship/placement-ready."
      : score >= 75
      ? "Great progress! Keep polishing your resume and skills."
      : score >= 60
      ? "Decent foundation — keep improving key skill areas."
      : "You need improvement. Focus on projects, skills, and profile.";

  return (
    <div className="glass rounded-2xl p-6 border border-border flex flex-col items-center justify-center">
      <h3 className="text-lg font-semibold text-foreground mb-6">
        Readiness Score
      </h3>

      <div className="relative w-32 h-32 mb-6">
        <svg width="128" height="128" className="transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="45"
            fill="none"
            stroke="rgb(var(--color-border))"
            strokeWidth="8"
          />

          <circle
            cx="64"
            cy="64"
            r="45"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />

          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--color-primary))" />
              <stop offset="100%" stopColor="hsl(var(--color-accent))" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold text-foreground">
            {animatedScore}%
          </span>
        </div>
      </div>

      <p className="text-sm text-muted-foreground text-center px-4">
        {readinessText}
      </p>
    </div>
  );
}
