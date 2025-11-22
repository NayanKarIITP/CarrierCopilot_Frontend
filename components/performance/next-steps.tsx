import { Button } from "@/components/ui/button"
import { BookOpen, RotateCcw } from "lucide-react"

interface NextStepsProps {
  topics?: string[]
}

export default function NextSteps({
  topics = ["Dynamic Programming", "System Design Patterns", "Behavioral Communication", "Advanced React Patterns"],
}: NextStepsProps) {
  return (
    <div className="glass rounded-2xl border border-border p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Recommended Topics for Next Session</h3>
        <div className="space-y-2">
          {topics.map((topic, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-border hover:bg-card/80 transition-colors cursor-pointer"
            >
              <BookOpen size={18} className="text-primary flex-shrink-0" />
              <span className="text-foreground">{topic}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <Button className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-foreground">
          <RotateCcw size={18} className="mr-2" />
          Schedule Next Mock Interview
        </Button>
      </div>
    </div>
  )
}
