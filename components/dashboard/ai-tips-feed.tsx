// "use client"

// import { useState } from "react"
// import { X, Lightbulb } from "lucide-react"

// interface Tip {
//   id: number
//   text: string
//   dismissed: boolean
// }

// const initialTips: Tip[] = [
//   {
//     id: 1,
//     text: 'Use quantifiable results in project descriptions. Example: "Improved load time by 40%"',
//     dismissed: false,
//   },
//   {
//     id: 2,
//     text: "Practice the STAR method (Situation, Task, Action, Result) for behavioral questions.",
//     dismissed: false,
//   },
//   {
//     id: 3,
//     text: "Research the company and team before interviews. Mention specific projects or values.",
//     dismissed: false,
//   },
// ]

// export default function AITipsFeed() {
//   const [tips, setTips] = useState(initialTips)

//   const dismissTip = (id: number) => {
//     setTips(tips.map((t) => (t.id === id ? { ...t, dismissed: true } : t)))
//   }

//   const activeTips = tips.filter((t) => !t.dismissed)

//   return (
//     <div className="space-y-3">
//       <h3 className="text-lg font-semibold text-foreground">AI Career Tips</h3>

//       {activeTips.map((tip) => (
//         <div key={tip.id} className="glass rounded-lg p-4 border border-accent/20 flex gap-3 items-start">
//           <Lightbulb size={18} className="text-accent flex-shrink-0 mt-0.5" />
//           <p className="text-sm text-foreground flex-1">{tip.text}</p>
//           <button
//             onClick={() => dismissTip(tip.id)}
//             className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
//           >
//             <X size={16} />
//           </button>
//         </div>
//       ))}
//     </div>
//   )
// }





// "use client";

// export default function AITipsFeed({ tips = [] }: any) {
//   return (
//     <div className="space-y-3">
//       <h3 className="text-lg font-semibold text-foreground">AI Career Tips</h3>

//       {tips.length === 0 && (
//         <p className="text-muted-foreground text-sm">No tips available</p>
//       )}

//       {tips.map((tip: string, i: number) => (
//         <div key={i} className="glass rounded-lg p-4 border border-accent/20">
//           <p className="text-sm text-foreground">{tip}</p>
//         </div>
//       ))}
//     </div>
//   );
// }






"use client";

export default function AITipsFeed({ tips = [] }: any) {
  return (
    <div className="glass rounded-2xl p-6 border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        AI Career Suggestions
      </h3>

      {tips.length === 0 && (
        <p className="text-muted-foreground text-sm">
          No suggestions yet. Upload your resume to receive AI feedback 📄
        </p>
      )}

      <div className="space-y-3">
        {tips.map((tip: string, i: number) => (
          <div
            key={i}
            className="bg-card/40 border border-accent/30 rounded-lg p-4"
          >
            <p className="text-sm font-medium text-primary">Suggestion #{i + 1}</p>
            <p className="text-sm text-foreground mt-1">{tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
