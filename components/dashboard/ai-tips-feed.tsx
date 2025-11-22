"use client"

import { useState } from "react"
import { X, Lightbulb } from "lucide-react"

interface Tip {
  id: number
  text: string
  dismissed: boolean
}

const initialTips: Tip[] = [
  {
    id: 1,
    text: 'Use quantifiable results in project descriptions. Example: "Improved load time by 40%"',
    dismissed: false,
  },
  {
    id: 2,
    text: "Practice the STAR method (Situation, Task, Action, Result) for behavioral questions.",
    dismissed: false,
  },
  {
    id: 3,
    text: "Research the company and team before interviews. Mention specific projects or values.",
    dismissed: false,
  },
]

export default function AITipsFeed() {
  const [tips, setTips] = useState(initialTips)

  const dismissTip = (id: number) => {
    setTips(tips.map((t) => (t.id === id ? { ...t, dismissed: true } : t)))
  }

  const activeTips = tips.filter((t) => !t.dismissed)

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-foreground">AI Career Tips</h3>

      {activeTips.map((tip) => (
        <div key={tip.id} className="glass rounded-lg p-4 border border-accent/20 flex gap-3 items-start">
          <Lightbulb size={18} className="text-accent flex-shrink-0 mt-0.5" />
          <p className="text-sm text-foreground flex-1">{tip.text}</p>
          <button
            onClick={() => dismissTip(tip.id)}
            className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  )
}
