"use client"
import { ChevronDown, CheckCircle2, Clock, AlertCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface Phase {
  id: number
  title: string
  description: string
  progress: number
  status: "completed" | "in-progress" | "upcoming"
  milestones: string[]
  resources: string[]
  expanded: boolean
}

interface PhaseCardProps {
  phase: Phase
  onToggle: (id: number) => void
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle2 className="text-green-500" size={20} />
    case "in-progress":
      return <Clock className="text-accent animate-pulse" size={20} />
    case "upcoming":
      return <AlertCircle className="text-muted-foreground" size={20} />
    default:
      return null
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "from-green-500 to-emerald-500"
    case "in-progress":
      return "from-primary to-accent"
    case "upcoming":
      return "from-gray-600 to-gray-700"
    default:
      return ""
  }
}

export default function PhaseCard({ phase, onToggle }: PhaseCardProps) {
  return (
    <div className="glass rounded-xl border border-border overflow-hidden">
      <button
        onClick={() => onToggle(phase.id)}
        className="w-full flex items-center gap-4 p-6 hover:bg-card/50 transition-colors text-left"
      >
        <div className="flex-shrink-0">{getStatusIcon(phase.status)}</div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground mb-2">{phase.title}</h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{phase.description}</p>
          <div className="flex items-center gap-3">
            <Progress value={phase.progress} className="flex-1 h-1.5" />
            <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap">{phase.progress}%</span>
          </div>
        </div>

        <div className="flex-shrink-0">
          <ChevronDown
            size={20}
            className={`text-muted-foreground transition-transform ${phase.expanded ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {phase.expanded && (
        <div className="bg-card/30 px-6 py-4 border-t border-border space-y-4">
          <div>
            <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-2">Milestones</p>
            <ul className="space-y-2">
              {phase.milestones.map((milestone, idx) => (
                <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                  <span className="text-accent mt-1">✓</span>
                  <span>{milestone}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-2">
              Learning Resources
            </p>
            <ul className="space-y-2">
              {phase.resources.map((resource, idx) => (
                <li key={idx}>
                  <a href="#" className="text-sm text-primary hover:text-accent transition-colors underline">
                    {resource}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
