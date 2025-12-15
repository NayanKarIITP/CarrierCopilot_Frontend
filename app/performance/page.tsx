// import Navigation from "@/components/navigation"
// import OverallScore from "@/components/performance/overall-score"
// import PerformanceCategory from "@/components/performance/performance-category"
// import NextSteps from "@/components/performance/next-steps"
// import Navbar from "@/components/ui/navbar"

// export default function PerformancePage() {
//   return (
//     <div className="bg-background text-foreground min-h-screen">
//       <Navigation />
//       <Navbar/>

//       <main className="md:ml-20 p-4 md:p-8">
//         <div className="max-w-7xl mx-auto">
//           {/* Header */}
//           <div className="space-y-2 border-b border-border pb-6 mb-8">
//             <h1 className="text-4xl font-bold tracking-tight text-foreground">Interview Performance</h1>
//             <p className="text-muted-foreground">
//               Session completed. Review your performance and get AI recommendations.
//             </p>
//           </div>

//           {/* Overall Score */}
//           <div className="mb-12">
//             <OverallScore score={78} />
//           </div>

//           {/* Performance Categories Grid */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//             {/* Technical Accuracy */}
//             <PerformanceCategory
//               title="Technical Accuracy"
//               score={75}
//               description="Your ability to solve technical problems correctly"
//               items={[
//                 { label: "Strong DSA Fundamentals", type: "strength", value: "✓" },
//                 { label: "Explain Time Complexity Better", type: "improvement", value: "↗" },
//               ]}
//               chartType="line"
//             />

//             {/* Communication Clarity */}
//             <PerformanceCategory
//               title="Communication Clarity"
//               score={82}
//               description="How well you explained your thoughts and solutions"
//               items={[
//                 { label: "Clear Problem Breakdown", type: "strength", value: "✓" },
//                 { label: "Use More Examples", type: "improvement", value: "↗" },
//               ]}
//               chartType="bar"
//             />

//             {/* Emotional Intelligence */}
//             <PerformanceCategory
//               title="Emotional Intelligence & Confidence"
//               score={70}
//               description="Your confidence level and ability to handle pressure"
//               items={[
//                 { label: "Good Eye Contact", type: "strength", value: "70%" },
//                 { label: "Reduce Filler Words", type: "improvement", value: "↗" },
//                 { label: "Facial Expressions", type: "improvement", value: "Relax more" },
//               ]}
//               chartType="line"
//             />

//             {/* Overall Progress */}
//             <PerformanceCategory
//               title="Session Overview"
//               score={78}
//               description="Your overall performance trend across multiple sessions"
//               items={[
//                 { label: "Previous Session", value: "72", type: "strength" },
//                 { label: "This Session", value: "78", type: "strength" },
//                 { label: "Improvement", value: "+6%", type: "strength" },
//               ]}
//               chartType="bar"
//             />
//           </div>

//           {/* Next Steps */}
//           <NextSteps />
//         </div>
//       </main>
//     </div>
//   )
// }









// "use client";

// import { useEffect, useState } from "react";
// import { Loader2 } from "lucide-react";

// // ✅ Fixed imports to use relative paths
// import Navigation from "@/components/navigation";
// import OverallScore from "@/components/performance/overall-score";
// import PerformanceCategory from "@/components/performance/performance-category";
// import NextSteps from "@/components/performance/next-steps";
// import Navbar from "@/components/ui/navbar";

// export default function PerformancePage() {
//   const [loading, setLoading] = useState(true);
//   const [sessionData, setSessionData] = useState<any>(null);

//   useEffect(() => {
//     // 1. Get sessionId from URL
//     // We use window.location to be safe against build errors
//     if (typeof window !== "undefined") {
//       const params = new URLSearchParams(window.location.search);
//       const sessionId = params.get("sessionId");

//       if (sessionId) {
//         fetchSessionData(sessionId);
//       } else {
//         setLoading(false); // No ID found, show empty/default state
//       }
//     }
//   }, []);

//   const fetchSessionData = async (id: string) => {
//     try {
//       const token = localStorage.getItem("token");
//       const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

//       // 2. Fetch real data from Backend
//       const res = await fetch(`${API_URL}/interview/session/${id}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       const data = await res.json();
//       if (data.success) {
//         setSessionData(data.data);
//       } else {
//         console.error("Error fetching session:", data.message);
//       }
//     } catch (error) {
//       console.error("Failed to load performance:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex h-screen items-center justify-center bg-background">
//         <div className="flex flex-col items-center gap-4">
//           <Loader2 className="animate-spin text-primary" size={48} />
//           <p className="text-muted-foreground font-medium">Generating your performance report...</p>
//         </div>
//       </div>
//     );
//   }

//   // 3. Process Data for UI
//   // If no session data, we default to 0 to prevent crashes
//   const analysis = sessionData?.analysis || {};

//   // Ensure score is a number
//   const score = analysis.clarity_score || 0;

//   // Arrays for feedback
//   const strengths = Array.isArray(analysis.strengths) ? analysis.strengths : [];
//   const improvements = Array.isArray(analysis.improvements) ? analysis.improvements : [];

//   // Calculate filler words
//   const fillerCount = analysis.filler_words_count 
//     ? Object.values(analysis.filler_words_count).reduce((a:any, b:any) => a + b, 0) 
//     : 0;

//   return (
//     <div className="bg-background text-foreground min-h-screen">
//       {/* <Navigation />
//       <Navbar /> */}

//       <main className="md:ml-20 p-4 md:p-8">
//         <div className="max-w-7xl mx-auto">
//           {/* Header */}
//           <div className="space-y-2 border-b border-border pb-6 mb-8">
//             <h1 className="text-4xl font-bold tracking-tight text-foreground">Interview Performance</h1>
//             <p className="text-muted-foreground">
//               {sessionData 
//                 ? "Here is the AI analysis of your recent session." 
//                 : "No session data found."}
//             </p>
//           </div>

//           {sessionData ? (
//             <>
//               {/* Overall Score */}
//               <div className="mb-12">
//                 <OverallScore score={score} />
//               </div>

//               {/* Performance Categories Grid */}
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

//                 {/* 1. Strengths (Technical Accuracy) */}
//                 <PerformanceCategory
//                   title="Key Strengths"
//                   score={score > 80 ? 90 : 75}
//                   description="Areas where you demonstrated competence."
//                   items={strengths.length > 0 ? strengths.map((str: string) => ({
//                       label: str,
//                       type: "strength",
//                       value: "✓"
//                   })) : [{ label: "No specific strengths detected", type: "neutral", value: "-" }]}
//                   chartType="line"
//                 />

//                 {/* 2. Improvements (Communication) */}
//                 <PerformanceCategory
//                   title="Areas for Improvement"
//                   score={score > 80 ? 85 : 60}
//                   description="Actionable advice to improve your answers."
//                   items={improvements.length > 0 ? improvements.map((imp: string) => ({
//                       label: imp,
//                       type: "improvement",
//                       value: "↗"
//                   })) : [{ label: "No specific improvements detected", type: "neutral", value: "-" }]}
//                   chartType="bar"
//                 />

//                 {/* 3. Delivery & Confidence */}
//                 <PerformanceCategory
//                   title="Delivery & Confidence"
//                   score={analysis.confidence_estimate || 70}
//                   description="Analysis of your speech patterns and confidence."
//                   items={[
//                     { label: "Confidence Score", type: "strength", value: `${analysis.confidence_estimate || 70}%` },
//                     { label: "Filler Words Used", type: Number(fillerCount) > 3 ? "improvement" : "strength", value: `${fillerCount}` },
//                   ]}
//                   chartType="line"
//                 />

//                 {/* 4. Session Overview */}
//                 <PerformanceCategory
//                   title="Session Overview"
//                   score={score}
//                   description="Context for this specific interview session."
//                   items={[
//                     { label: "Question Asked", value: sessionData.question || "N/A", type: "neutral" },
//                     { label: "Answer Length", value: sessionData.transcript?.length ? `${sessionData.transcript.length} chars` : "N/A", type: "neutral" },
//                   ]}
//                   chartType="bar"
//                 />
//               </div>

//               {/* Next Steps */}
//               <NextSteps />
//             </>
//           ) : (
//             <div className="p-12 text-center border-2 border-dashed border-gray-200 rounded-xl">
//               <p className="text-gray-500">No interview data found. Start a new session to see results.</p>
//               <a href="/interviewer" className="mt-4 inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
//                 Start Interview
//               </a>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }






"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Loader2, CheckCircle2, AlertCircle, Share2, Download,
  RotateCcw, Trophy, BrainCircuit, Mic
} from "lucide-react";
import Link from "next/link";

// Assuming you have a basic Navbar, otherwise remove this import
import Navbar from "@/components/ui/navbar";

// --- Types ---
interface Analysis {
  strengths: string[];
  improvements: string[];
  clarity_score: number;
  confidence_estimate: number;
  filler_words_count?: Record<string, number>;
  feedback_summary?: string; // AI generated summary
}

interface SessionData {
  _id: string;
  role: string;
  level: string;
  question: string;
  transcript: string;
  analysis: Analysis;
  createdAt: string;
}

export default function PerformancePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<SessionData | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);

      // ✅ FIX: Check for 'session' (used by redirect) OR 'sessionId' (used by backend)
      const sessionId = params.get("session") || params.get("sessionId");

      if (sessionId) {
        fetchSessionData(sessionId);
      } else {
        console.warn("No Session ID found in URL parameters");
        setLoading(false);
      }
    }
  }, []);

  const fetchSessionData = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

      const res = await fetch(`${API_URL}/interview/session/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();
      if (data.success) {
        setSession(data.data); // Backend should return the full session object
      }
    } catch (error) {
      console.error("Failed to load report:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- Helper: Calculate Rating ---
  const getRating = (score: number) => {
    if (score >= 85) return { label: "Excellent", color: "text-green-600 bg-green-50 border-green-200" };
    if (score >= 70) return { label: "Good", color: "text-blue-600 bg-blue-50 border-blue-200" };
    if (score >= 50) return { label: "Average", color: "text-yellow-600 bg-yellow-50 border-yellow-200" };
    return { label: "Needs Improvement", color: "text-red-600 bg-red-50 border-red-200" };
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <Loader2 className="animate-spin text-indigo-600 mx-auto" size={48} />
          <h2 className="text-xl font-semibold text-gray-700">Generating Performance Report...</h2>
          <p className="text-gray-500 text-sm">Analyzing your speech, confidence, and technical accuracy.</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-gray-50 gap-6">
        <AlertCircle size={64} className="text-gray-300" />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">No Session Found</h1>
          <p className="text-gray-500 mt-2">We couldn't find the interview data you requested.</p>
        </div>
        <button onClick={() => router.push('/interviewer')} className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
          Start New Interview
        </button>
      </div>
    );
  }

  // --- Process Data ---
  const { analysis, role, level, createdAt } = session;
  const score = analysis.clarity_score || 0;
  const confidence = analysis.confidence_estimate || 0;
  const rating = getRating(score);
  const dateStr = new Date(createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans text-gray-900 pb-20">
      {/* <Navbar /> */}

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* 1. Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">Interview Report</h1>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wide ${rating.color}`}>
                {rating.label}
              </span>
            </div>
            <p className="text-gray-500 flex items-center gap-2 text-sm">
              <span>{role} ({level})</span>
              <span className="w-1 h-1 bg-gray-300 rounded-full" />
              <span>{dateStr}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium shadow-sm">
              <Download size={16} /> Export PDF
            </button> */}
            <button onClick={() => router.push('/interviewer')} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium shadow-md shadow-indigo-100">
              <RotateCcw size={16} /> Retry Session
            </button>
          </div>
        </div>

        {/* 2. Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Overall Score Card */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-6 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-32 h-32 bg-indigo-50 rounded-full -mr-10 -mt-10 blur-2xl opacity-50" />

            <div className="relative z-10 w-20 h-20 flex items-center justify-center rounded-full bg-indigo-50 border-4 border-indigo-100">
              <span className="text-2xl font-bold text-indigo-600">{score}</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Overall Score</p>
              <h3 className="text-xl font-semibold text-gray-900">Solid Performance</h3>
              <p className="text-xs text-gray-400 mt-1">Based on technical accuracy & clarity.</p>
            </div>
          </div>

          {/* Communication Stats */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center">
            <div className="flex justify-between items-end mb-2">
              <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                <Mic size={16} className="text-purple-500" /> Confidence
              </div>
              <span className="text-xl font-bold text-gray-900">{confidence}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${confidence}%` }} />
            </div>
            <p className="text-xs text-gray-400 mt-3">
              Detected tone consistency and flow.
            </p>
          </div>

          {/* Knowledge Gap */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                <BrainCircuit size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Technical Depth</p>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  You used relevant keywords for <strong>{role}</strong>, but missed some advanced concepts in system design.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Detailed Feedback Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Feedback (2/3) */}
          <div className="lg:col-span-2 space-y-6">

            {/* Strengths */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-50 bg-gray-50/50 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-green-600" />
                <h3 className="font-semibold text-gray-900">Areas of Excellence</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  {analysis.strengths && analysis.strengths.length > 0 ? (
                    analysis.strengths.map((str, i) => (
                      <li key={i} className="flex gap-3 text-gray-600 text-sm leading-relaxed">
                        <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-green-500 mt-2" />
                        {str}
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-400 italic text-sm">No specific strengths detected.</li>
                  )}
                </ul>
              </div>
            </div>

            {/* Improvements */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-50 bg-gray-50/50 flex items-center gap-2">
                <Trophy size={18} className="text-amber-500" />
                <h3 className="font-semibold text-gray-900">Opportunities for Growth</h3>
              </div>
              <div className="p-6 bg-amber-50/10">
                <ul className="space-y-4">
                  {analysis.improvements && analysis.improvements.length > 0 ? (
                    analysis.improvements.map((imp, i) => (
                      <li key={i} className="flex gap-3 text-gray-600 text-sm leading-relaxed">
                        <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-amber-500 mt-2" />
                        {imp}
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-400 italic text-sm">Great job! No major improvements needed.</li>
                  )}
                </ul>
              </div>
            </div>

            {/* Transcript Preview (Optional) */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 opacity-75">
              <h3 className="font-bold text-gray-900 text-sm mb-2">Transcript Snippet</h3>
              <p className="text-gray-500 text-sm italic border-l-2 border-indigo-200 pl-4 py-1">
                "{session.transcript ? session.transcript.slice(0, 150) : "No audio recorded..."}..."
              </p>
            </div>

          </div>

          {/* Sidebar Recommendations (1/3) */}
          <div className="space-y-6">

            {/* AI Recommendation */}
            <div className="bg-indigo-900 text-white rounded-2xl p-6 shadow-xl shadow-indigo-200 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="font-bold text-lg mb-2">AI Verdict</h3>
                <p className="text-indigo-100 text-sm leading-relaxed">
                  Based on this session, you are showing strong potential for a <strong>{level}</strong> role. Focus on structured problem solving to reach Senior level.
                </p>
                <div className="mt-6">
                  <Link href="/roadmap" className="w-full block">
                    <button className="w-full py-2.5 bg-white text-indigo-900 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-indigo-50 transition-colors">
                      View Learning Roadmap
                    </button>
                  </Link>
                </div>
              </div>

              {/* Decorative Circle */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-700 rounded-full opacity-50 blur-3xl" />
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-bold text-gray-900 text-sm mb-4">Speaking Analytics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Pace</span>
                  <span className="font-medium text-gray-900">140 words/min</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Filler Words</span>
                  <span className="font-medium text-red-500">
                    {analysis.filler_words_count ? Object.values(analysis.filler_words_count).reduce((a, b) => a + b, 0) : 0} detected
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Clarity</span>
                  <span className="font-medium text-green-600">High</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}