import { Lightbulb } from "lucide-react"

interface QuestionDisplayProps {
  question?: string
  followUp?: string
}

export default function QuestionDisplay({
  question = "Tell me about a time you faced a conflict with a teammate. How did you resolve it?",
  followUp = "What would you do differently next time?",
}: QuestionDisplayProps) {
  return (
    <div className="glass rounded-2xl border border-primary/30 p-6">
      <div className="flex items-start gap-3 mb-4">
        <Lightbulb className="text-accent flex-shrink-0 mt-1" size={20} />
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">Current Question</p>
          <p className="text-lg text-foreground leading-relaxed">{question}</p>
        </div>
      </div>

      {followUp && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">Follow-up</p>
          <p className="text-foreground text-sm">{followUp}</p>
        </div>
      )}
    </div>
  )
}
