// import Navigation from "@/components/navigation"
// import HeaderSection from "@/components/dashboard/header-section"
// import PrimaryActionCard from "@/components/dashboard/primary-action-card"
// import SkillGapAnalysis from "@/components/dashboard/skill-gap-analysis"
// import LearningRoadmap from "@/components/dashboard/learning-roadmap"
// import ReadinessGauge from "@/components/dashboard/readiness-gauge"
// import ResumeQualityCard from "@/components/dashboard/resume-quality-card"
// import AITipsFeed from "@/components/dashboard/ai-tips-feed"

// export default function Home() {
//   return (
//     <div className="bg-background text-foreground min-h-screen">
//       <Navigation />

//       <main className="md:ml-20 p-4 md:p-8">
//         <div className="max-w-7xl mx-auto">
//           {/* Header */}
//           <HeaderSection />

//           {/* Main Grid Layout */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
//             {/* Left Column - Main Content */}
//             <div className="lg:col-span-2 space-y-6">
//               {/* Primary Action Card */}
//               <PrimaryActionCard />

//               {/* Skill Gap Analysis */}
//               <SkillGapAnalysis />

//               {/* Learning Roadmap */}
//               <LearningRoadmap />
//             </div>

//             {/* Right Sidebar - Analytics & Tips */}
//             <div className="space-y-6">
//               {/* Readiness Gauge */}
//               <ReadinessGauge score={78} />

//               {/* Resume Quality */}
//               <ResumeQualityCard grade="B+" score={78} />

//               {/* AI Tips Feed */}
//               <AITipsFeed />
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }










"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
// ❌ Removed Navigation & Navbar imports (Handled globally in layout.tsx)
import HeaderSection from "@/components/dashboard/header-section"
import PrimaryActionCard from "@/components/dashboard/primary-action-card"
import SkillGapAnalysis from "@/components/dashboard/skill-gap-analysis"
import LearningRoadmap from "@/components/dashboard/learning-roadmap"
import ReadinessGauge from "@/components/dashboard/readiness-gauge"
import ResumeQualityCard from "@/components/dashboard/resume-quality-card"
import AITipsFeed from "@/components/dashboard/ai-tips-feed"

export default function Home() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground animate-pulse">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    // ✅ Cleaned up: Removed <Navbar>, <main>, and padding wrappers.
    // layout.tsx now handles the container, so we just focus on the grid.
    <div className="space-y-8">
      {/* Header */}
      <HeaderSection />

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Primary Action Card */}
          <PrimaryActionCard />

          {/* Skill Gap Analysis */}
          <SkillGapAnalysis />

          {/* Learning Roadmap */}
          <LearningRoadmap />
        </div>

        {/* Right Sidebar - Analytics & Tips */}
        <div className="space-y-8">
          {/* Readiness Gauge */}
          <ReadinessGauge score={78} />

          {/* Resume Quality */}
          <ResumeQualityCard grade="B+" score={78} />

          {/* AI Tips Feed */}
          <AITipsFeed />
        </div>
      </div>
    </div>
  )
}