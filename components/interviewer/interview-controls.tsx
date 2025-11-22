"use client"

import { Button } from "@/components/ui/button"
import { SkipForward, StopCircle } from "lucide-react"
import { useState } from "react"

export default function InterviewControls() {
  const [isInterviewing, setIsInterviewing] = useState(true)

  const handleEndInterview = () => {
    setIsInterviewing(false)
    // Redirect to performance dashboard
    window.location.href = "/performance"
  }

  return (
    <div className="flex gap-3">
      <Button variant="outline" className="flex-1 gap-2 bg-transparent">
        <SkipForward size={18} />
        Next Question
      </Button>
      <Button
        onClick={handleEndInterview}
        className="flex-1 gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/50"
      >
        <StopCircle size={18} />
        End Interview
      </Button>
    </div>
  )
}
