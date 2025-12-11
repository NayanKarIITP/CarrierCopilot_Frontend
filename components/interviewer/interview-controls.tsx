// "use client"

// import { Button } from "@/components/ui/button"
// import { SkipForward, StopCircle } from "lucide-react"
// import { useState } from "react"

// export default function InterviewControls() {
//   const [isInterviewing, setIsInterviewing] = useState(true)

//   const handleEndInterview = () => {
//     setIsInterviewing(false)
//     // Redirect to performance dashboard
//     window.location.href = "/performance"
//   }

//   return (
//     <div className="flex gap-3">
//       <Button variant="outline" className="flex-1 gap-2 bg-transparent">
//         <SkipForward size={18} />
//         Next Question
//       </Button>
//       <Button
//         onClick={handleEndInterview}
//         className="flex-1 gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/50"
//       >
//         <StopCircle size={18} />
//         End Interview
//       </Button>
//     </div>
//   )
// }






// "use client";

// import { Button } from "@/components/ui/button";
// import { SkipForward, StopCircle, Loader2 } from "lucide-react";
// import { useState } from "react";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";

// interface QuestionData {
//   text: string;
//   follow_up: string;
//   difficulty?: string;
// }

// interface Props {
//   sessionId: string | null;
//   role: string;
//   level: string;
//   onNextQuestion: (q: QuestionData) => void;
//   onEndInterview?: () => void;
// }

// export default function InterviewControls({ 
//   sessionId, 
//   role, 
//   level, 
//   onNextQuestion, 
//   onEndInterview 
// }: Props) {
  
//   const [loading, setLoading] = useState(false);

//   const handleNextQuestion = async () => {
//     if (!sessionId) return;
//     try {
//       setLoading(true);
//       const token = localStorage.getItem("token");
//       const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

//       const res = await fetch(`${API_URL}/interview/next-question`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token || ""}`
//         },
//         body: JSON.stringify({ sessionId, role, level })
//       });

//       const data = await res.json();
//       if (data.success && data.question) {
//         onNextQuestion({
//           text: data.question.text, 
//           follow_up: data.question.follow_up || "", 
//           difficulty: data.question.difficulty
//         });
//       }
//     } catch (err) {
//       console.error("Network Error:", err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   const handleEnd = () => {
//     if (onEndInterview) onEndInterview();
//     if (sessionId) {
//         window.location.href = `/performance?session=${sessionId}`;
//     } else {
//         window.location.href = "/dashboard";
//     }
//   }

//   return (
//     <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full">
//       {/* Next Question Button */}
//       <Button
//         variant="outline"
//         className="flex-1 gap-2 bg-white hover:bg-indigo-50 text-gray-700 border-gray-200 shadow-sm transition-all h-14 text-base font-semibold"
//         onClick={handleNextQuestion}
//         disabled={loading || !sessionId}
//       >
//         {loading ? <Loader2 className="animate-spin" size={20} /> : <SkipForward size={20} />}
//         {loading ? "Generating..." : "Next Question"}
//       </Button>

//       {/* End Interview Button with Safety Modal */}
//       <AlertDialog>
//         <AlertDialogTrigger asChild>
//           <Button
//             className="flex-1 sm:flex-none sm:w-48 gap-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 shadow-sm transition-all h-14 font-medium"
//             variant="ghost"
//             disabled={!sessionId}
//           >
//             <StopCircle size={20} />
//             End Session
//           </Button>
//         </AlertDialogTrigger>
//         <AlertDialogContent className="bg-white">
//           <AlertDialogHeader>
//             <AlertDialogTitle>End Interview?</AlertDialogTitle>
//             <AlertDialogDescription>
//               This will calculate your final score and generate a feedback report. This action cannot be undone.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Cancel</AlertDialogCancel>
//             <AlertDialogAction onClick={handleEnd} className="bg-red-600 hover:bg-red-700 text-white">
//               Yes, Finish
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   );
// }






"use client";

import { Button } from "@/components/ui/button";
import { SkipForward, StopCircle, Loader2 } from "lucide-react";
import { useState } from "react";

// Matches the data structure expected by the parent component
interface QuestionData {
  text: string;
  follow_up: string;
  difficulty?: string;
}

interface Props {
  sessionId: string | null;
  role: string;
  level: string;
  onNextQuestion: (q: QuestionData) => void;
  onEndInterview?: () => void;
}

export default function InterviewControls({ 
  sessionId, 
  role, 
  level, 
  onNextQuestion, 
  onEndInterview 
}: Props) {
  
  const [loading, setLoading] = useState(false);

  const handleNextQuestion = async () => {
    if (!sessionId) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      // ✅ Updated to Port 8000 (Standard Python/FastAPI port)
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

      const res = await fetch(`${API_URL}/interview/next-question`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token || ""}`
        },
        body: JSON.stringify({
          sessionId,
          role,
          level
        })
      });

      const data = await res.json();

      if (data.success && data.question) {
        // Map backend response to Frontend Interface
        onNextQuestion({
          text: data.question.text, 
          follow_up: data.question.followUp || data.question.follow_up || "", 
          difficulty: data.question.difficulty
        });
      } else {
        console.warn("API Error:", data.message || "Failed to fetch question");
      }
    } catch (err) {
      console.error("Network Error:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleEnd = () => {
    if (onEndInterview) onEndInterview();
    
    // Redirect logic
    if (sessionId) {
        window.location.href = `/performance?session=${sessionId}`;
    } else {
        // Fallback if session failed to start
        window.location.href = "/dashboard";
    }
  }

  return (
    <div className="flex gap-3 mt-4 w-full">
      {/* Next Question Button */}
      <Button
        variant="outline"
        className="flex-1 gap-2 bg-white hover:bg-gray-50 text-gray-700 border-gray-300 shadow-sm transition-all h-12"
        onClick={handleNextQuestion}
        disabled={loading || !sessionId}
      >
        {loading ? <Loader2 className="animate-spin" size={18} /> : <SkipForward size={18} />}
        {loading ? "Generating..." : "Next Question"}
      </Button>

      {/* End Interview Button */}
      <Button
        onClick={handleEnd}
        className="flex-1 gap-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 shadow-sm transition-all h-12"
        variant="ghost"
      >
        <StopCircle size={18} />
        End Interview
      </Button>
    </div>
  );
}