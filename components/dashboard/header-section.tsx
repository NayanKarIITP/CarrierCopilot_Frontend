import { Lightbulb } from "lucide-react"

export default function HeaderSection() {
  return (
    <div className="space-y-2 border-b border-border pb-6">
      <h1 className="text-4xl font-bold tracking-tight text-foreground">Welcome back, Sarah 👋</h1>
      <p className="text-muted-foreground flex items-center gap-2">
        <Lightbulb size={16} className="text-accent" />
        Your AI mentor is ready to guide your next career step.
      </p>
    </div>
  )
}
