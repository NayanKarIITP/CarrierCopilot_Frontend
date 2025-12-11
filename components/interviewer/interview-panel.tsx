// "use client";

// import { useState, useRef, useEffect } from "react";
// import VideoFeed from "./video-feed";
// import LiveFeedback from "./live-feedback";
// import QuestionDisplay from "./question-display";
// import SpeechInput from "./speech-input";

// export default function InterviewPanel() {
//   // -------------------------
//   // STATE
//   // -------------------------
//   const [question, setQuestion] = useState("Loading...");
//   const [followUp, setFollowUp] = useState("");
//   const [latestTranscriptAnalysis, setLatestTranscriptAnalysis] = useState(null);

//   const [metrics, setMetrics] = useState<any>({
//     confidence: 0,
//     eye_contact: 0,
//     clarity: 0,
//     emotion: "neutral",
//     emotion_confidence: 0,
//     raw_emotions: {},
//     filler_words_count: {},
//     head_pose: { pitch: 0, yaw: 0, roll: 0 },
//   });

//   const videoRef = useRef<HTMLVideoElement>(null);

//   // -------------------------
//   // LOAD FIRST QUESTION
//   // -------------------------
//   useEffect(() => {
//     const loadQuestion = async () => {
//       try {
//         const res = await fetch("http://localhost:8000/interview/question");
//         const data = await res.json();

//         if (data.success && data.question) {
//           setQuestion(data.question.question);
//           setFollowUp(data.question.follow_up);
//         }
//       } catch (err) {
//         console.error("Failed to load question:", err);
//       }
//     };

//     loadQuestion();
//   }, []);

//   // -------------------------------------------------------
//   // 🎤 HANDLE TRANSCRIPT → PYTHON
//   // -------------------------------------------------------
//   const handleFinalTranscript = async (text: string) => {
//     try {
//       const res = await fetch("http://localhost:8000/interview", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ answer: text }),
//       });

//       const data = await res.json();
//       if (!data.success) return;

//       const analysis = data.analysis;
//       setLatestTranscriptAnalysis(analysis);

//       setMetrics((prev: any) => ({
//         ...prev,
//         clarity: analysis.clarity_score,
//         filler_words_count: analysis.filler_words_count,
//         confidence: analysis.confidence_estimate,
//       }));
//     } catch (err) {
//       console.error("Transcript analysis error:", err);
//     }
//   };

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
      
//       {/* LEFT: VIDEO + SPEECH */}
//       <div className="lg:col-span-8 space-y-4">
//         <VideoFeed
//           isStreaming={true}
//           videoRef={videoRef}
//           onMetrics={(incoming) =>
//             setMetrics((prev: any) => ({ ...prev, ...incoming }))
//           }
//         />
//         <SpeechInput onFinalAnswer={handleFinalTranscript} />
//       </div>

//       {/* RIGHT: METRICS + QUESTION */}
//       <div className="lg:col-span-4 space-y-4">
//         <LiveFeedback
//           metrics={metrics}
//           latestTranscriptAnalysis={latestTranscriptAnalysis}
//         />
//         <QuestionDisplay question={question} followUp={followUp} />
//       </div>
//     </div>
//   );
// }




// "use client";

// import { useState, useRef, useEffect } from "react";
// import VideoFeed from "./video-feed";
// import LiveFeedback from "./live-feedback";
// import QuestionDisplay from "./question-display";
// import SpeechInput from "./speech-input";
// import InterviewControls from "./interview-controls";
// import { Loader2, PlayCircle, Settings2, Mic } from "lucide-react";

// export default function InterviewPanel() {
//   const [session, setSession] = useState<{ id: string | null; isActive: boolean }>({ id: null, isActive: false });
//   const [loading, setLoading] = useState(false);
//   const [config, setConfig] = useState({ role: "Full Stack Developer", level: "Mid-Level" });
  
//   const [questionData, setQuestionData] = useState({ text: "Waiting to start...", followUp: "", difficulty: "Medium" });
//   const [transcript, setTranscript] = useState("");
//   const [latestAnalysis, setLatestAnalysis] = useState(null);
  
//   // Real-time metrics state
//   const [metrics, setMetrics] = useState<any>({
//     visual_confidence: 0,
//     eye_contact: 0,
//     emotion: "Neutral",
//     angles: { pitch: 0, yaw: 0, roll: 0 }
//   });

//   const videoRef = useRef<HTMLVideoElement>(null);
//   const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

//   const startInterview = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       const res = await fetch(`${API_URL}/interview/start`, {
//         method: "POST",
//         headers: { 
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}` 
//         },
//         body: JSON.stringify(config),
//       });

//       const data = await res.json();
//       if (data.success && data.question) {
//         setSession({ id: data.sessionId, isActive: true });
//         setQuestionData({ 
//             text: data.question.text, 
//             followUp: data.question.follow_up || "",
//             difficulty: data.question.difficulty 
//         });
//       } else {
//           alert("Failed to start session: " + data.message);
//       }
//     } catch (err) {
//       console.error("Start Error:", err);
//       alert("Could not connect to AI Engine. Is the Python backend running on Port 8000?");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFinalTranscript = async (text: string) => {
//     if (!text.trim() || !session.id) return;
//     setTranscript(text);

//     try {
//       const res = await fetch(`${API_URL}/interview/analyze`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ 
//             answer: text, 
//             question: questionData.text,
//             sessionId: session.id
//         }),
//       });

//       const data = await res.json();
//       if (data.success) {
//         setLatestAnalysis(data.data.analysis);
//       }
//     } catch (err) {
//       console.error("Analysis Error:", err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 font-sans text-gray-900">
      
//       <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        
//         {/* === LEFT COLUMN: INTERACTION (8 Cols) === */}
//         <div className="lg:col-span-8 flex flex-col gap-6 order-2 lg:order-1">
          
//           {/* Video Feed Container */}
//           <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800 aspect-video md:aspect-[16/9] lg:min-h-[480px]">
//              <VideoFeed 
//                 isStreaming={true} 
//                 onMetricsUpdate={setMetrics}
//                 sessionId={session.id}
//              />

//              {/* Setup Overlay (Only visible when not active) */}
//              {!session.isActive && (
//                 <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-20 p-4">
//                     <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl max-w-md w-full space-y-6 animate-in zoom-in-95 duration-300">
//                         <div className="text-center space-y-2">
//                             <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto text-blue-600">
//                                 <Settings2 size={24} />
//                             </div>
//                             <h2 className="text-2xl font-bold text-gray-900">Configure Session</h2>
//                             <p className="text-gray-500 text-sm">Customize your AI mock interview parameters</p>
//                         </div>
                        
//                         <div className="space-y-4">
//                             <div>
//                                 <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Target Role</label>
//                                 <input 
//                                     className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
//                                     value={config.role}
//                                     onChange={(e) => setConfig({...config, role: e.target.value})}
//                                     placeholder="e.g. Product Manager"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Experience Level</label>
//                                 <select 
//                                     className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
//                                     value={config.level}
//                                     onChange={(e) => setConfig({...config, level: e.target.value})}
//                                 >
//                                     <option value="Junior">Junior (0-2 Years)</option>
//                                     <option value="Mid-Level">Mid-Level (2-5 Years)</option>
//                                     <option value="Senior">Senior (5+ Years)</option>
//                                 </select>
//                             </div>
//                         </div>

//                         <button 
//                             onClick={startInterview}
//                             disabled={loading}
//                             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 disabled:opacity-50"
//                         >
//                             {loading ? <Loader2 className="animate-spin" /> : <PlayCircle />}
//                             Start Interview
//                         </button>
//                     </div>
//                 </div>
//              )}
//           </div>

//           {/* Question & Audio Controls */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//              <div className="md:col-span-2">
//                  <QuestionDisplay 
//                     question={questionData.text} 
//                     followUp={session.isActive ? questionData.followUp : ""}
//                     loading={loading}
//                  />
//              </div>
             
//              <div className="md:col-span-1 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center gap-4">
//                  {session.isActive ? (
//                     <>
//                         <SpeechInput onFinalAnswer={handleFinalTranscript} />
//                         <div className="text-xs text-gray-400 mt-2">
//                              Listening for answer...
//                         </div>
//                     </>
//                  ) : (
//                     <div className="opacity-50 flex flex-col items-center gap-2">
//                         <Mic size={32} />
//                         <p className="text-sm font-medium">Audio Inactive</p>
//                     </div>
//                  )}
//              </div>
//           </div>

//           {/* Controls Bar */}
//           <InterviewControls 
//              sessionId={session.id}
//              role={config.role}
//              level={config.level}
//              onNextQuestion={(q) => setQuestionData({...questionData, ...q})}
//              onEndInterview={() => setSession({ id: null, isActive: false })}
//           />

//           {/* Live Transcript Log */}
//           {session.isActive && transcript && (
//               <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm animate-in slide-in-from-bottom-2">
//                   <p className="text-xs font-bold text-gray-400 uppercase mb-2">Live Transcript</p>
//                   <p className="text-gray-700 leading-relaxed italic">"{transcript}"</p>
//               </div>
//           )}
//         </div>

//         {/* === RIGHT COLUMN: ANALYTICS (4 Cols) === */}
//         <div className="lg:col-span-4 order-1 lg:order-2 h-full">
//            <div className="sticky top-6 space-y-6">
//               <LiveFeedback 
//                  metrics={metrics}
//                  latestTranscriptAnalysis={latestAnalysis}
//               />
//            </div>
//         </div>

//       </div>
//     </div>
//   );
// }








"use client";

import { useState, useRef } from "react";
import VideoFeed from "./video-feed";
import LiveFeedback from "./live-feedback";
import QuestionDisplay from "./question-display";
import SpeechInput from "./speech-input";
import { Loader2, PlayCircle, ShieldCheck } from "lucide-react";

export default function InterviewPanel() {
  // State
  const [session, setSession] = useState<{ id: string | null; isActive: boolean }>({ id: null, isActive: false });
  const [loading, setLoading] = useState(false);
  
  // Config
  const [config, setConfig] = useState({ role: "Full Stack Developer", level: "Mid-Level" });
  
  // Content
  const [questionData, setQuestionData] = useState({ text: "Ready to start?", followUp: "" });
  const [transcript, setTranscript] = useState("");
  const [latestAnalysis, setLatestAnalysis] = useState(null);
  
  // Metrics (Default)
  const [metrics, setMetrics] = useState<any>({
    visual_confidence: 50,
    eye_contact: 0,
    emotion: "Neutral",
    head_pose: "Center",
    angles: { pitch: 0, yaw: 0, roll: 0 }
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  // 1. Start Session
  const startInterview = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/interview/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });

      const data = await res.json();

      if (data.success && data.question) {
        setSession({ id: data.sessionId, isActive: true });
        setQuestionData({ text: data.question.text, followUp: data.question.follow_up || "" });
      }
    } catch (err) {
      console.error("Start Error:", err);
      alert("Could not connect to AI Engine (Check Port 8000)");
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle Answer Analysis
  const handleFinalTranscript = async (text: string) => {
    if (!text.trim()) return;
    setTranscript(text); // Show what user said

    try {
      const res = await fetch(`${API_URL}/interview/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            answer: text,         // Mapping transcript -> answer
            question: questionData.text 
        }),
      });

      const data = await res.json();
      if (data.success) {
        setLatestAnalysis(data.data.analysis);
      }
    } catch (err) {
      console.error("Analysis Error:", err);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 h-[calc(100vh-80px)] max-w-[1800px] mx-auto">
      
      {/* LEFT: Interaction Zone (8 Cols) */}
      <div className="lg:col-span-8 flex flex-col gap-6 h-full">
        
        {/* Video Area */}
        <div className="relative flex-1 bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800 min-h-[400px]">
            <VideoFeed
                isStreaming={true} 
                videoRef={videoRef}
                onMetrics={setMetrics}
            />
            
            {/* Setup Overlay */}
            {!session.isActive && (
                <div className="absolute inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-20">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full space-y-6 animate-in zoom-in duration-300">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-gray-900">Interview Setup</h2>
                            <p className="text-gray-500 text-sm">Configure your AI interviewer</p>
                        </div>
                        
                        <div className="space-y-3">
                            <input 
                                className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                value={config.role}
                                onChange={(e) => setConfig({...config, role: e.target.value})}
                                placeholder="Target Role"
                            />
                            <select 
                                className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
                                value={config.level}
                                onChange={(e) => setConfig({...config, level: e.target.value})}
                            >
                                <option>Junior</option>
                                <option>Mid-Level</option>
                                <option>Senior</option>
                            </select>
                        </div>

                        <button 
                            onClick={startInterview}
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <PlayCircle />}
                            Start Interview
                        </button>
                    </div>
                </div>
            )}
        </div>

        {/* Question & Transcription */}
        <div className="h-auto min-h-[200px] flex flex-col gap-4">
            <QuestionDisplay 
                question={questionData.text} 
                followUp={session.isActive ? questionData.followUp : ""} 
            />
            
            {session.isActive && (
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                    <div className="shrink-0">
                        <SpeechInput onFinalAnswer={handleFinalTranscript} />
                    </div>
                    <div className="flex-1 h-full">
                        <p className="text-sm font-medium text-gray-400 uppercase mb-1">Live Transcript</p>
                        <p className="text-gray-700 text-lg leading-relaxed">
                            {transcript || "Speak clearly into the microphone..."}
                        </p>
                    </div>
                </div>
            )}
        </div>
      </div>

      {/* RIGHT: Live Analytics (4 Cols) */}
      <div className="lg:col-span-4 h-full overflow-y-auto pr-2 custom-scrollbar">
        <LiveFeedback
          metrics={metrics}
          latestTranscriptAnalysis={latestAnalysis}
        />
      </div>
    </div>
  );
}