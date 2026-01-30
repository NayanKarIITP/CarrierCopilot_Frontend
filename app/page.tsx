// app/page.tsx
"use client";

import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Sparkles } from "lucide-react";

export default function Home() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        router.push("/dashboard"); // 👈 Redirects to the ONE true dashboard
      } else {
        router.push("/login");
      }
    }
  }, [user, isLoading, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-background">
      <div className="flex flex-col items-center gap-4">
        <Sparkles className="h-10 w-10 animate-spin text-indigo-600" />
      </div>
    </div>
  );
}





// "use client"

// import { useAuth } from "@/contexts/auth-context"
// import { useRouter } from "next/navigation"
// import { useEffect } from "react"
// // ❌ Removed Navigation & Navbar imports (Handled globally in layout.tsx)
// import HeaderSection from "@/components/dashboard/header-section"
// import PrimaryActionCard from "@/components/dashboard/primary-action-card"
// import SkillGapAnalysis from "@/components/dashboard/skill-gap-analysis"
// import LearningRoadmap from "@/components/dashboard/learning-roadmap"
// import ReadinessGauge from "@/components/dashboard/readiness-gauge"
// import ResumeQualityCard from "@/components/dashboard/resume-quality-card"
// import AITipsFeed from "@/components/dashboard/ai-tips-feed"

// export default function Home() {
//   const { user, isLoading } = useAuth()
//   const router = useRouter()

//   useEffect(() => {
//     if (!isLoading && !user) {
//       router.push("/login")
//     }
//   }, [user, isLoading, router])

//   if (isLoading || !user) {
//     return (
//       <div className="min-h-[50vh] flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-muted-foreground animate-pulse">Loading...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     // ✅ Cleaned up: Removed <Navbar>, <main>, and padding wrappers.
//     // layout.tsx now handles the container, so we just focus on the grid.
//     <div className="space-y-8">
//       {/* Header */}
//       <HeaderSection />

//       {/* Main Grid Layout */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Left Column - Main Content */}
//         <div className="lg:col-span-2 space-y-8">
//           {/* Primary Action Card */}
//           <PrimaryActionCard />

//           {/* Skill Gap Analysis */}
//           <SkillGapAnalysis />

//           {/* Learning Roadmap */}
//           <LearningRoadmap />
//         </div>

//         {/* Right Sidebar - Analytics & Tips */}
//         <div className="space-y-8">
//           {/* Readiness Gauge */}
//           <ReadinessGauge score={78} />

//           {/* Resume Quality */}
//           <ResumeQualityCard grade="B+" score={78} />

//           {/* AI Tips Feed */}
//           <AITipsFeed />
//         </div>
//       </div>
//     </div>
//   )
// }