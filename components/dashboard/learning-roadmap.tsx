// "use client"

// import { useState } from "react"
// import { ChevronDown, CheckCircle2, Circle } from "lucide-react"

// interface Week {
//   id: number
//   title: string
//   completed: boolean
//   resources: string[]
//   expanded: boolean
// }

// const initialWeeks: Week[] = [
//   {
//     id: 1,
//     title: "Week 1: Master React Hooks",
//     completed: true,
//     resources: ["Advanced React Patterns", "React Docs - useCallback", "useReducer Deep Dive"],
//     expanded: false,
//   },
//   {
//     id: 2,
//     title: "Week 2: Learn State Management",
//     completed: true,
//     resources: ["Redux Fundamentals", "Context API Best Practices", "Zustand Tutorial"],
//     expanded: false,
//   },
//   {
//     id: 3,
//     title: "Week 3: System Design Basics",
//     completed: false,
//     resources: ["System Design Primer", "Designing Data-Intensive Applications", "Architecture Patterns"],
//     expanded: true,
//   },
//   {
//     id: 4,
//     title: "Week 4: Database Optimization",
//     completed: false,
//     resources: ["SQL Performance Tuning", "Database Indexing", "Query Optimization"],
//     expanded: false,
//   },
// ]

// export default function LearningRoadmap() {
//   const [weeks, setWeeks] = useState(initialWeeks)

//   const toggleWeek = (id: number) => {
//     setWeeks(weeks.map((w) => (w.id === id ? { ...w, expanded: !w.expanded } : w)))
//   }

//   return (
//     <div className="glass rounded-2xl p-6 border border-border">
//       <h3 className="text-lg font-semibold text-foreground mb-4">90-Day Learning Roadmap</h3>

//       <div className="space-y-2">
//         {weeks.map((week, index) => (
//           <div key={week.id} className="border border-border rounded-lg overflow-hidden">
//             <button
//               onClick={() => toggleWeek(week.id)}
//               className="w-full flex items-center gap-3 p-4 hover:bg-card/50 transition-colors text-left"
//             >
//               <div className="flex-shrink-0">
//                 {week.completed ? (
//                   <CheckCircle2 className="text-accent" size={20} />
//                 ) : (
//                   <Circle className="text-muted-foreground" size={20} />
//                 )}
//               </div>
//               <span
//                 className={`flex-1 font-medium ${week.completed ? "text-muted-foreground line-through" : "text-foreground"}`}
//               >
//                 {week.title}
//               </span>
//               <ChevronDown
//                 size={18}
//                 className={`text-muted-foreground transition-transform ${week.expanded ? "rotate-180" : ""}`}
//               />
//             </button>

//             {week.expanded && (
//               <div className="bg-card/30 px-4 py-3 border-t border-border">
//                 <p className="text-sm text-muted-foreground mb-3 font-semibold">Recommended Resources:</p>
//                 <ul className="space-y-2">
//                   {week.resources.map((resource, idx) => (
//                     <li key={idx} className="text-sm text-foreground flex items-start gap-2">
//                       <span className="text-accent mt-1">→</span>
//                       <a href="#" className="hover:text-accent transition-colors">
//                         {resource}
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }





// "use client";

// export default function LearningRoadmap({ roadmap }: any) {
//   if (!roadmap) {
//     return (
//       <div className="glass rounded-2xl p-6 border border-border">
//         <p className="text-muted-foreground">No roadmap generated yet.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="glass rounded-2xl p-6 border border-border">
//       <h3 className="text-lg font-semibold text-foreground mb-4">
//         90-Day Learning Roadmap
//       </h3>

//       <div className="space-y-2">
//         {roadmap.map((step: any, index: number) => (
//           <div
//             key={index}
//             className="border border-border rounded-lg p-4 bg-card/30"
//           >
//             <p className="text-foreground font-medium">{step.step}</p>

//             <ul className="mt-2 ml-4 list-disc text-sm text-muted-foreground">
//               {step.resources?.map((r: string, i: number) => (
//                 <li key={i}>{r}</li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }





"use client";

export default function LearningRoadmap({ roadmap }: any) {
  const steps = roadmap || [];

  if (!steps || steps.length === 0) {
    return (
      <div className="glass rounded-2xl p-6 border border-border">
        <p className="text-muted-foreground">
          No roadmap generated yet.
        </p>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-6 border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        90-Day Learning Roadmap
      </h3>

      <div className="space-y-4">
        {steps.map((step: any, index: number) => (
          <div
            key={index}
            className="border border-border rounded-lg p-4 bg-card/30"
          >
            <p className="text-lg font-medium text-foreground">{step.title}</p>
            <p className="text-sm text-muted-foreground">{step.subtitle}</p>

            {step.items && (
              <ul className="mt-2 ml-4 list-disc text-sm text-muted-foreground">
                {step.items.map((item: any, i: number) => (
                  <li key={i}>
                    {typeof item === "string" ? item : item.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
