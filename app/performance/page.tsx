import Navigation from "@/components/navigation"
import OverallScore from "@/components/performance/overall-score"
import PerformanceCategory from "@/components/performance/performance-category"
import NextSteps from "@/components/performance/next-steps"
import Navbar from "@/components/ui/navbar"

export default function PerformancePage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navigation />
      <Navbar/>

      <main className="md:ml-20 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="space-y-2 border-b border-border pb-6 mb-8">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">Interview Performance</h1>
            <p className="text-muted-foreground">
              Session completed. Review your performance and get AI recommendations.
            </p>
          </div>

          {/* Overall Score */}
          <div className="mb-12">
            <OverallScore score={78} />
          </div>

          {/* Performance Categories Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Technical Accuracy */}
            <PerformanceCategory
              title="Technical Accuracy"
              score={75}
              description="Your ability to solve technical problems correctly"
              items={[
                { label: "Strong DSA Fundamentals", type: "strength", value: "✓" },
                { label: "Explain Time Complexity Better", type: "improvement", value: "↗" },
              ]}
              chartType="line"
            />

            {/* Communication Clarity */}
            <PerformanceCategory
              title="Communication Clarity"
              score={82}
              description="How well you explained your thoughts and solutions"
              items={[
                { label: "Clear Problem Breakdown", type: "strength", value: "✓" },
                { label: "Use More Examples", type: "improvement", value: "↗" },
              ]}
              chartType="bar"
            />

            {/* Emotional Intelligence */}
            <PerformanceCategory
              title="Emotional Intelligence & Confidence"
              score={70}
              description="Your confidence level and ability to handle pressure"
              items={[
                { label: "Good Eye Contact", type: "strength", value: "70%" },
                { label: "Reduce Filler Words", type: "improvement", value: "↗" },
                { label: "Facial Expressions", type: "improvement", value: "Relax more" },
              ]}
              chartType="line"
            />

            {/* Overall Progress */}
            <PerformanceCategory
              title="Session Overview"
              score={78}
              description="Your overall performance trend across multiple sessions"
              items={[
                { label: "Previous Session", value: "72", type: "strength" },
                { label: "This Session", value: "78", type: "strength" },
                { label: "Improvement", value: "+6%", type: "strength" },
              ]}
              chartType="bar"
            />
          </div>

          {/* Next Steps */}
          <NextSteps />
        </div>
      </main>
    </div>
  )
}
