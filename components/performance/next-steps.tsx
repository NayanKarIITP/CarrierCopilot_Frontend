
"use client"

import { Button } from "@/components/ui/button"
import { BookOpen, RotateCcw } from "lucide-react"

interface NextStepsProps {
  topics?: string[]
}

export default function NextSteps({
  topics = ["Dynamic Programming", "System Design Patterns", "Behavioral Communication", "Advanced React Patterns"],
}: NextStepsProps) {
  return (
    <div className="bg-white dark:bg-card rounded-2xl border border-gray-200 dark:border-border p-6 space-y-6 shadow-sm">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recommended Topics for Next Session</h3>
        <div className="space-y-2">
          {topics.map((topic, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-muted/30 border border-gray-100 dark:border-border hover:bg-gray-100 dark:hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <BookOpen size={18} className="text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
              <span className="text-gray-700 dark:text-gray-200">{topic}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <Button className="flex-1 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white border-0 shadow-md shadow-indigo-500/20">
          <RotateCcw size={18} className="mr-2" />
          Schedule Next Mock Interview
        </Button>
      </div>
    </div>
  )
}