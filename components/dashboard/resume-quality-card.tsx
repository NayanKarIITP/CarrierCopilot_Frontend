import { ArrowRight } from "lucide-react"

interface ResumeQualityCardProps {
  grade?: string
  score?: number
}

export default function ResumeQualityCard({ grade = "B+", score = 78 }: ResumeQualityCardProps) {
  return (
    <div className="glass rounded-2xl p-6 border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4">Resume Quality</h3>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-4xl font-bold text-primary mb-1">{grade}</p>
          <p className="text-sm text-muted-foreground">{score}/100</p>
        </div>
      </div>

      <button className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-card hover:bg-card/80 text-foreground transition-colors text-sm font-medium">
        View Full Report
        <ArrowRight size={16} />
      </button>
    </div>
  )
}
