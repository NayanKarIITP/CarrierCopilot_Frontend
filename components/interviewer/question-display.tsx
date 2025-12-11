// import { Lightbulb } from "lucide-react"

// interface QuestionDisplayProps {
//   question?: string
//   followUp?: string
// }

// export default function QuestionDisplay({
//   question = "Tell me about a time you faced a conflict with a teammate. How did you resolve it?",
//   followUp = "What would you do differently next time?",
// }: QuestionDisplayProps) {
//   return (
//     <div className="glass rounded-2xl border border-primary/30 p-6">
//       <div className="flex items-start gap-3 mb-4">
//         <Lightbulb className="text-accent flex-shrink-0 mt-1" size={20} />
//         <div>
//           <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">Current Question</p>
//           <p className="text-lg text-foreground leading-relaxed">{question}</p>
//         </div>
//       </div>

//       {followUp && (
//         <div className="mt-4 pt-4 border-t border-border">
//           <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">Follow-up</p>
//           <p className="text-foreground text-sm">{followUp}</p>
//         </div>
//       )}
//     </div>
//   )
// }








// "use client";

// import { Loader2 } from "lucide-react";

// interface QuestionDisplayProps {
//   question: string;
//   followUp?: string;
//   loading?: boolean
// }

// const QuestionDisplay = ({ question, followUp, loading }: QuestionDisplayProps) => {
//   return (
//     <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4 transition-all duration-300 hover:shadow-md">
//       {/* Header */}
//       <div className="flex items-center gap-2 mb-2">
//         <div className="w-1 h-6 bg-primary rounded-full"></div>
//         <div className="text-xs font-bold text-primary uppercase tracking-wider">
//           Current Question
//         </div>
//       </div>

//       {/* Main Question Content */}
//       {loading ? (
//         <div className="h-24 flex flex-col items-center justify-center text-gray-400 gap-3 animate-pulse">
//           <Loader2 className="animate-spin text-primary/50" size={28} />
//           <span className="text-sm font-medium">Generating your next challenge...</span>
//         </div>
//       ) : (
//         <div className="text-xl font-medium text-gray-900 leading-relaxed">
//           {question || "Waiting for question..."}
//         </div>
//       )}

//       {/* Follow-Up Section */}
//       {followUp && !loading && (
//         <div className="mt-5 p-4 bg-blue-50/80 border border-blue-100 text-blue-800 rounded-lg text-sm flex gap-3 items-start animate-in fade-in slide-in-from-top-2 duration-500">
//           <div className="mt-1.5 min-w-[4px] h-[4px] rounded-full bg-blue-500"></div>
//           <div>
//             <strong className="block mb-1 text-blue-900 font-semibold uppercase text-xs tracking-wide">
//               Follow-up
//             </strong>
//             <p className="leading-relaxed text-blue-800/90">{followUp}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default QuestionDisplay;




// "use client";

// import { Loader2, MessageSquare, CornerDownRight, Sparkles } from "lucide-react";

// interface QuestionDisplayProps {
//   question: string;
//   followUp?: string;
//   loading?: boolean;
//   stage?: 'main' | 'followup';
// }

// const QuestionDisplay = ({ question, followUp, loading, stage = 'main' }: QuestionDisplayProps) => {
//   return (
//     <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4 transition-all duration-300 hover:shadow-md h-full flex flex-col relative overflow-hidden">
      
//       {/* Background decoration */}
//       <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
//         <MessageSquare size={120} />
//       </div>

//       {/* Header Badge */}
//       <div className="flex items-center justify-between mb-2 relative z-10">
//         <div className="flex items-center gap-2">
//           {stage === 'followup' ? (
//              <div className="bg-indigo-100 text-indigo-700 p-1.5 rounded-lg shadow-sm">
//                 <CornerDownRight size={18} />
//              </div>
//           ) : (
//              <div className="bg-blue-100 text-blue-700 p-1.5 rounded-lg shadow-sm">
//                 <MessageSquare size={18} />
//              </div>
//           )}
          
//           <div className={`text-xs font-bold uppercase tracking-wider ${stage === 'followup' ? 'text-indigo-600' : 'text-blue-600'}`}>
//             {stage === 'followup' ? "Deep Dive Follow-Up" : "Current Question"}
//           </div>
//         </div>

//         {/* AI Badge */}
//         {!loading && (
//             <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-200">
//                 <Sparkles size={12} className="text-amber-400" /> AI Generated
//             </div>
//         )}
//       </div>

//       {/* Main Question Content */}
//       <div className="flex-1 flex items-center relative z-10">
//         {loading ? (
//             <div className="w-full py-8 flex flex-col items-center justify-center text-gray-400 gap-4 animate-pulse">
//                 <div className="bg-blue-50 p-3 rounded-full">
//                     <Loader2 className="animate-spin text-blue-500" size={24} />
//                 </div>
//                 <span className="text-sm font-medium tracking-wide">Analyzing your response & generating next step...</span>
//             </div>
//         ) : (
//             <div className="w-full animate-in fade-in slide-in-from-bottom-2 duration-500">
//                 <p className={`font-medium text-gray-900 leading-relaxed ${stage === 'followup' ? 'text-lg italic text-gray-700' : 'text-xl'}`}>
//                     "{question || "Waiting for question..."}"
//                 </p>
//             </div>
//         )}
//       </div>

//       {/* Static Follow-Up Preview (Only shown if specifically requested) */}
//       {followUp && stage !== 'followup' && !loading && (
//         <div className="mt-4 p-4 bg-indigo-50/50 border-l-4 border-indigo-300 rounded-r-lg text-sm animate-in fade-in slide-in-from-top-2 relative z-10">
//           <strong className="block mb-1 text-indigo-900 font-semibold uppercase text-xs tracking-wide flex items-center gap-1">
//             <CornerDownRight size={12}/> Coming Up Next
//           </strong>
//           <p className="text-gray-600 italic">"{followUp}"</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default QuestionDisplay;







"use client";

import { Loader2, MessageSquare, CornerDownRight, Sparkles } from "lucide-react";

interface QuestionDisplayProps {
  question: string;
  followUp?: string;
  loading?: boolean;
  stage?: 'main' | 'followup';
}

const QuestionDisplay = ({ question, followUp, loading, stage = 'main' }: QuestionDisplayProps) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4 transition-all duration-300 hover:shadow-md h-full flex flex-col relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <MessageSquare size={120} />
      </div>

      {/* Header Badge */}
      <div className="flex items-center justify-between mb-2 relative z-10">
        <div className="flex items-center gap-2">
          {stage === 'followup' ? (
             <div className="bg-indigo-100 text-indigo-700 p-1.5 rounded-lg shadow-sm">
                <CornerDownRight size={18} />
             </div>
          ) : (
             <div className="bg-blue-100 text-blue-700 p-1.5 rounded-lg shadow-sm">
                <MessageSquare size={18} />
             </div>
          )}
          
          <div className={`text-xs font-bold uppercase tracking-wider ${stage === 'followup' ? 'text-indigo-600' : 'text-blue-600'}`}>
            {stage === 'followup' ? "Deep Dive Follow-Up" : "Current Question"}
          </div>
        </div>

        {/* AI Badge */}
        {!loading && (
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-200">
                <Sparkles size={12} className="text-amber-400" /> AI Generated
            </div>
        )}
      </div>

      {/* Main Question Content */}
      <div className="flex-1 flex items-center relative z-10">
        {loading ? (
            <div className="w-full py-8 flex flex-col items-center justify-center text-gray-400 gap-4 animate-pulse">
                <div className="bg-blue-50 p-3 rounded-full">
                    <Loader2 className="animate-spin text-blue-500" size={24} />
                </div>
                <span className="text-sm font-medium tracking-wide">Analyzing your response & generating next step...</span>
            </div>
        ) : (
            <div className="w-full animate-in fade-in slide-in-from-bottom-2 duration-500">
                <p className={`font-medium text-gray-900 leading-relaxed ${stage === 'followup' ? 'text-lg italic text-gray-700' : 'text-xl'}`}>
                    "{question || "Waiting for question..."}"
                </p>
            </div>
        )}
      </div>

      {/* Static Follow-Up Preview (Only shown if specifically requested) */}
      {followUp && stage !== 'followup' && !loading && (
        <div className="mt-4 p-4 bg-indigo-50/50 border-l-4 border-indigo-300 rounded-r-lg text-sm animate-in fade-in slide-in-from-top-2 relative z-10">
          <strong className="block mb-1 text-indigo-900 font-semibold uppercase text-xs tracking-wide flex items-center gap-1">
            <CornerDownRight size={12}/> Coming Up Next
          </strong>
          <p className="text-gray-600 italic">"{followUp}"</p>
        </div>
      )}
    </div>
  );
};

export default QuestionDisplay;