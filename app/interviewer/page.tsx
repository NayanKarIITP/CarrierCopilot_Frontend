
// "use client";

// import { useState, useEffect } from "react";
// import { Mic, MicOff, Send, Settings, XCircle, Loader2 } from "lucide-react";

// // --- INLINE COMPONENTS TO FIX BUILD ERRORS ---

// const Navbar = () => (
//   <nav className="border-b p-4 flex justify-between items-center bg-white sticky top-0 z-50">
//     <div className="font-bold text-xl text-primary">Career Copilot</div>
//     <div className="flex gap-4 text-sm font-medium text-gray-600">
//       <div className="cursor-pointer hover:text-primary">Dashboard</div>
//       <div className="text-primary cursor-pointer">Interview</div>
//       <div className="cursor-pointer hover:text-primary">Profile</div>
//     </div>
//   </nav>
// );

// const Navigation = () => <div className="hidden"></div>; // Placeholder to prevent import errors

// const VideoFeed = ({ isStreaming, onMetrics }: any) => (
//   <div className="bg-gray-900 rounded-xl aspect-video flex items-center justify-center relative overflow-hidden shadow-inner">
//     {isStreaming ? (
//       <div className="absolute inset-0 bg-gray-800">
//         <video 
//             className="w-full h-full object-cover opacity-50" 
//             autoPlay 
//             muted 
//             loop 
//             playsInline
//         />
//         <div className="absolute inset-0 flex items-center justify-center text-white/20 font-mono">
//             [Camera Feed Active]
//         </div>
//         <div className="absolute top-4 right-4 flex items-center gap-2">
//             <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
//             <span className="text-xs text-white/80 font-medium">LIVE</span>
//         </div>
//       </div>
//     ) : (
//       <div className="text-gray-500 flex flex-col items-center gap-2">
//         <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
//             <div className="w-8 h-1 bg-gray-700 rounded-full rotate-45"></div>
//         </div>
//         <span>[Camera Off]</span>
//       </div>
//     )}
//   </div>
// );

// const QuestionDisplay = ({ question, followUp, loading }: any) => (
//   <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
//     <div className="flex items-center gap-2">
//         <div className="w-1 h-6 bg-primary rounded-full"></div>
//         <div className="text-sm font-bold text-primary uppercase tracking-wider">Current Question</div>
//     </div>
    
//     {loading ? (
//         <div className="h-24 flex flex-col items-center justify-center text-gray-400 gap-2">
//             <Loader2 className="animate-spin" size={24} />
//             <span className="text-sm">Loading next question...</span>
//         </div>
//     ) : (
//         <div className="text-xl font-medium text-gray-900 leading-relaxed">{question}</div>
//     )}
    
//     {followUp && !loading && (
//         <div className="mt-4 p-4 bg-blue-50 border border-blue-100 text-blue-800 rounded-lg text-sm flex gap-3 items-start">
//             <div className="mt-0.5 min-w-[4px] h-[4px] rounded-full bg-blue-400"></div>
//             <div>
//                 <strong className="block mb-1 text-blue-900">Follow-up:</strong> 
//                 {followUp}
//             </div>
//         </div>
//     )}
//   </div>
// );

// const LiveFeedback = ({ metrics, feedback }: any) => (
//   <div className="space-y-4">
//     <div className="bg-white p-5 rounded-xl border shadow-sm">
//         <h3 className="font-bold mb-4 text-gray-800 border-b pb-2">Live Analysis</h3>
//         <div className="space-y-4">
//             <div>
//                 <div className="flex justify-between text-xs mb-1.5 font-medium text-gray-600">
//                     <span>Answer Clarity</span>
//                     <span>{feedback?.score || 0}%</span>
//                 </div>
//                 <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
//                     <div 
//                         className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-1000 ease-out" 
//                         style={{ width: `${feedback?.score || 0}%` }}
//                     />
//                 </div>
//             </div>
            
//             <div className="grid grid-cols-2 gap-3 pt-2">
//                 <div className="bg-gray-50 p-3 rounded-lg text-center">
//                     <div className="text-xs text-gray-500 mb-1">Pace</div>
//                     <div className="font-bold text-gray-700">Good</div>
//                 </div>
//                 <div className="bg-gray-50 p-3 rounded-lg text-center">
//                     <div className="text-xs text-gray-500 mb-1">Tone</div>
//                     <div className="font-bold text-gray-700">Neutral</div>
//                 </div>
//             </div>
//         </div>
//     </div>
    
//     {feedback?.message && (
//         <div className="bg-green-50 p-4 rounded-xl border border-green-100 text-sm text-green-800 shadow-sm animate-in fade-in slide-in-from-bottom-2">
//             <div className="flex items-center gap-2 mb-2 text-green-900 font-semibold">
//                 <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
//                 AI Feedback
//             </div>
//             {feedback.message}
//         </div>
//     )}
//   </div>
// );

// const InterviewControls = ({ onNextQuestion }: any) => null; 

// // --- MAIN PAGE ---

// // Types
// interface Question {
//   id: string;
//   text: string;
//   follow_up?: string;
// }

// interface Feedback {
//   message: string;
//   score?: number;
//   clarity_score?: number; 
// }

// const MAX_QUESTIONS = 5; 

// export default function InterviewerPage() {
//   const [metrics, setMetrics] = useState<any>(null);
//   const [loading, setLoading] = useState(false);
//   const [processing, setProcessing] = useState(false); 
//   const [sessionId, setSessionId] = useState<string | null>(null);
//   const [questionCount, setQuestionCount] = useState(0);
//   const [isInterviewOver, setIsInterviewOver] = useState(false);

//   // 🔄 Track Stage: Main vs Follow-up
//   const [interviewStage, setInterviewStage] = useState<'main' | 'followup'>('main');

//   // ⚙️ Setup State
//   const [targetRole, setTargetRole] = useState("Full Stack Developer");
//   const [experienceLevel, setExperienceLevel] = useState("Mid-Level");

//   // 🗣️ Speech Recognition State
//   const [isListening, setIsListening] = useState(false);
//   const [transcript, setTranscript] = useState("");
//   const [recognition, setRecognition] = useState<any>(null);

//   const [currentQuestion, setCurrentQuestion] = useState<Question>({
//     id: "init",
//     text: "Configure your session and click 'Start Interview' to begin.",
//     follow_up: ""
//   });

//   const [liveFeedback, setLiveFeedback] = useState<Feedback | null>(null);

//   // Initialize Speech Recognition
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       // @ts-ignore
//       const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//       if (SpeechRecognition) {
//         const rec = new SpeechRecognition();
//         rec.continuous = true;
//         rec.interimResults = true;
//         rec.lang = "en-US";

//         rec.onresult = (event: any) => {
//           let interimTranscript = "";
//           for (let i = event.resultIndex; i < event.results.length; i++) {
//             const transcriptPart = event.results[i][0].transcript;
//             if (event.results[i].isFinal) {
//               setTranscript((prev) => prev + " " + transcriptPart);
//             } else {
//               interimTranscript += transcriptPart;
//             }
//           }
//         };

//         rec.onerror = (event: any) => {
//           console.error("Speech error", event.error);
//           setIsListening(false);
//         };

//         setRecognition(rec);
//       }
//     }
//   }, []);

//   const toggleListening = () => {
//     if (!recognition) return alert("Browser does not support Speech Recognition.");
//     if (isListening) {
//       recognition.stop();
//       setIsListening(false);
//     } else {
//       recognition.start();
//       setIsListening(true);
//     }
//   };

//   const endSession = () => {
//     setIsInterviewOver(true);
//     if (sessionId) {
//       window.location.href = `/performance?sessionId=${sessionId}`;
//     } else {
//       window.location.href = '/performance';
//     }
//   };

//   // 1. Start Session
//   const startSession = async () => {
//     if (!targetRole.trim()) return alert("Please enter a target role.");
//     setLoading(true);
    
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return alert("Please log in.");

//       const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      
//       const res = await fetch(`${API_URL}/interview/start`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ role: targetRole, level: experienceLevel })
//       });

//       const data = await res.json();
//       if (data.success) {
//         setSessionId(data.sessionId);
//         setQuestionCount(0);
//         setIsInterviewOver(false);
//         setInterviewStage('main');
//         await fetchNextQuestion(data.sessionId, 0, targetRole, experienceLevel);
//       }
//     } catch (error) {
//       console.error("Start error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 2. Submit Answer & Next (FIXED LOGIC)
//   const submitAnswer = async () => {
//     if (!transcript.trim()) return alert("Please speak or type your answer.");
//     setProcessing(true);

//     try {
//       const token = localStorage.getItem("token");
//       const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

//       if (isListening) toggleListening();

//       const questionContext = interviewStage === 'main' ? currentQuestion.text : currentQuestion.follow_up;

//       const res = await fetch(`${API_URL}/interview/analyze`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ 
//           transcript: transcript,
//           question: questionContext
//         })
//       });

//       const data = await res.json();
      
//       if (data.success) {
//         // Show feedback
//         setLiveFeedback({
//           message: data.data.analysis.strengths?.[0] || "Good answer!",
//           score: data.data.analysis.clarity_score || 0
//         });

//         // ✅ AUTO-CLEAR & MOVE NEXT LOGIC
//         // This captures current state to know where to go next
//         const currentStage = interviewStage;
//         const hasFollowUp = !!currentQuestion.follow_up;
//         const nextQCount = questionCount + 1;

//         setTimeout(() => {
//             setProcessing(false);
//             setTranscript(""); // Clear the box
//             setLiveFeedback(null); // Clear feedback

//             // Logic: If Main -> Follow-up. If Follow-up -> Next Question.
//             if (currentStage === 'main' && hasFollowUp) {
//                 setInterviewStage('followup');
//             } else {
//                 // Move to next question
//                 if (sessionId) {
//                     fetchNextQuestion(sessionId, nextQCount);
//                 }
//             }
//         }, 2000); // 2-second delay to read feedback
//       } else {
//         setProcessing(false);
//         alert("Analysis failed. Please try again.");
//       }

//     } catch (err) {
//       console.error("Analysis error:", err);
//       setProcessing(false);
//     }
//   };

//   // 3. Fetch Next Question
//   const fetchNextQuestion = async (sessId: string, currentCount: number, role?: string, level?: string) => {
//     if (currentCount >= MAX_QUESTIONS) {
//       setIsInterviewOver(true);
//       window.location.href = `/performance?sessionId=${sessId}`;
//       return;
//     }

//     setLoading(true);
//     setTranscript(""); 
//     setLiveFeedback(null);
//     setInterviewStage('main'); 

//     try {
//       const token = localStorage.getItem("token");
//       const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

//       const res = await fetch(`${API_URL}/interview/next-question`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ 
//             sessionId: sessId,
//             role: role || targetRole,       
//             level: level || experienceLevel 
//         })
//       });

//       const data = await res.json();
//       if (data.success) {
//         setCurrentQuestion({
//           id: data.question._id || Date.now().toString(),
//           text: data.question.text,
//           follow_up: data.question.followUp || ""
//         });
//         setQuestionCount(currentCount); 
//       }
//     } catch (error) {
//       console.error("Fetch question error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-gray-50 text-gray-900 min-h-screen font-sans">
//       {/* <Navbar /> */}

//       <main className="md:ml-20 p-4 md:p-8">
//         <div className="max-w-7xl mx-auto">
          
//           {/* Header */}
//           <div className="flex justify-between items-center mb-6">
//             <h1 className="text-2xl font-bold tracking-tight">AI Mock Interview</h1>
//             {sessionId && !isInterviewOver && (
//               <div className="flex items-center gap-4">
//                 <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium border border-primary/20">
//                   Question {questionCount + 1} / {MAX_QUESTIONS}
//                 </span>
//                 <button 
//                     onClick={endSession}
//                     className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
//                 >
//                     <XCircle size={16} /> End Interview
//                 </button>
//               </div>
//             )}
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

//             <div className="lg:col-span-2 space-y-6">
              
//               <VideoFeed isStreaming={!isInterviewOver} onMetrics={setMetrics} />

//               <QuestionDisplay 
//                 question={
//                     interviewStage === 'followup' 
//                     ? `Follow-up: ${currentQuestion.follow_up}` 
//                     : currentQuestion.text
//                 }
//                 followUp={""} 
//                 loading={loading}
//               />

//               {/* Interaction Area */}
//               {sessionId && !isInterviewOver ? (
//                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm transition-all duration-300">
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="font-semibold flex items-center gap-2 text-gray-700">
//                         {interviewStage === 'main' ? "Answer the Main Question" : "Answer the Follow-up"}
//                         {processing && <span className="text-xs text-primary animate-pulse font-normal">(Analyzing...)</span>}
//                     </h3>
//                     <div className="flex gap-2">
//                       <button
//                         onClick={toggleListening}
//                         className={`p-3 rounded-full transition-all shadow-sm ${
//                           isListening ? "bg-red-500 text-white animate-pulse shadow-red-200" : "bg-gray-100 hover:bg-gray-200 text-gray-600"
//                         }`}
//                         title={isListening ? "Stop Recording" : "Start Recording"}
//                       >
//                         {isListening ? <MicOff size={20} /> : <Mic size={20} />}
//                       </button>
//                     </div>
//                   </div>

//                   <textarea
//                     value={transcript}
//                     onChange={(e) => setTranscript(e.target.value)}
//                     placeholder={isListening ? "Listening..." : "Type your answer here or click the mic to speak..."}
//                     className="w-full bg-gray-50 p-4 rounded-lg min-h-[140px] mb-4 text-sm border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary/50 outline-none resize-none transition-all"
//                     disabled={processing || loading}
//                   />

//                   <div className="flex gap-3">
//                     <button
//                       onClick={submitAnswer}
//                       disabled={!transcript.trim() || loading || processing}
//                       className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-2.5 rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm active:scale-95"
//                     >
//                       {processing ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
//                       {processing ? "Analyzing..." : (interviewStage === 'main' ? "Submit & Next" : "Submit & Finish")}
//                     </button>
                    
//                     <button 
//                       onClick={() => {
//                           setTranscript("");
//                           if (interviewStage === 'main' && currentQuestion.follow_up) {
//                               setInterviewStage('followup');
//                           } else {
//                               fetchNextQuestion(sessionId, questionCount + 1);
//                           }
//                       }}
//                       disabled={processing}
//                       className="px-6 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors disabled:opacity-50"
//                     >
//                       Skip
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="bg-white p-8 rounded-xl border border-gray-200 text-center space-y-6 shadow-sm">
//                     <div className="mx-auto w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-2">
//                         <Settings size={28} />
//                     </div>
//                     <div>
//                         <h2 className="text-xl font-bold text-gray-900">Configure Session</h2>
//                         <p className="text-gray-500 text-sm mt-1">Customize your AI mock interview experience</p>
//                     </div>
                    
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
//                         <div>
//                             <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Target Role</label>
//                             <input 
//                                 type="text" 
//                                 value={targetRole}
//                                 onChange={(e) => setTargetRole(e.target.value)}
//                                 className="w-full p-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary/50 outline-none transition-all"
//                                 placeholder="e.g. Product Manager"
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Experience Level</label>
//                             <div className="relative">
//                                 <select 
//                                     value={experienceLevel}
//                                     onChange={(e) => setExperienceLevel(e.target.value)}
//                                     className="w-full p-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary/50 outline-none appearance-none transition-all"
//                                 >
//                                     <option value="Junior">Junior / Entry</option>
//                                     <option value="Mid-Level">Mid-Level</option>
//                                     <option value="Senior">Senior / Lead</option>
//                                 </select>
//                                 <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
//                                     <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                         <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//                                     </svg>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <button
//                         onClick={startSession}
//                         disabled={loading}
//                         className="w-full bg-primary text-white py-3.5 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 active:scale-95 disabled:opacity-70"
//                     >
//                         {loading ? (
//                             <span className="flex items-center justify-center gap-2">
//                                 <Loader2 className="animate-spin" size={20} /> Starting...
//                             </span>
//                         ) : "Start Interview Session"}
//                     </button>
//                 </div>
//               )}
//             </div>

//             <div>
//               <LiveFeedback metrics={metrics} feedback={liveFeedback} />
//             </div>

//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }














// "use client";

// import { useState, useEffect } from "react";
// import Navigation from "@/components/navigation";
// import VideoFeed from "@/components/interviewer/video-feed";
// import QuestionDisplay from "@/components/interviewer/question-display";
// import LiveFeedback from "@/components/interviewer/live-feedback";
// import { Mic, MicOff, Send, Settings, XCircle, Loader2 } from "lucide-react";

// interface Question {
//   id: string;
//   text: string;
//   follow_up?: string;
// }

// interface Feedback {
//   message: string;
//   score?: number;
//   clarity_score?: number;
// }

// const MAX_QUESTIONS = 5;

// export default function InterviewerPage() {

//   // ------ States ------
//   const [metrics, setMetrics] = useState<any>(null);

//   const [sessionId, setSessionId] = useState<string | null>(null);
//   const [questionCount, setQuestionCount] = useState(0);
//   const [isInterviewOver, setIsInterviewOver] = useState(false);

//   const [interviewStage, setInterviewStage] = useState<'main' | 'followup'>('main');

//   const [targetRole, setTargetRole] = useState("Full Stack Developer");
//   const [experienceLevel, setExperienceLevel] = useState("Mid-Level");

//   const [isListening, setIsListening] = useState(false);
//   const [transcript, setTranscript] = useState("");
//   const [recognition, setRecognition] = useState<any>(null);

//   const [currentQuestion, setCurrentQuestion] = useState<Question>({
//     id: "",
//     text: "",
//     follow_up: ""
//   });

//   const [liveFeedback, setLiveFeedback] = useState<Feedback | null>(null);
//   const [processing, setProcessing] = useState(false);
//   const [loading, setLoading] = useState(false);


//   // ------ Speech Recognition Setup ------
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const SR =
//         (window as any).SpeechRecognition ||
//         (window as any).webkitSpeechRecognition;

//       if (SR) {
//         const rec = new SR();
//         rec.continuous = true;
//         rec.interimResults = true;
//         rec.lang = "en-US";

//         rec.onresult = (event: any) => {
//           let text = "";
//           for (let i = event.resultIndex; i < event.results.length; i++) {
//             const part = event.results[i][0].transcript;
//             if (event.results[i].isFinal) {
//               text += " " + part;
//             }
//           }
//           if (text.trim()) setTranscript((p) => p + text);
//         };

//         rec.onerror = () => setIsListening(false);
//         setRecognition(rec);
//       }
//     }
//   }, []);

//   const toggleListening = () => {
//     if (!recognition)
//       return alert("Speech Recognition not supported in browser.");

//     if (isListening) {
//       recognition.stop();
//       setIsListening(false);
//     } else {
//       recognition.start();
//       setIsListening(true);
//     }
//   };


//   // ------ Start Session ------
//   const startSession = async () => {
//     if (!targetRole.trim()) return alert("Enter a target role first!");

//     setLoading(true);

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return alert("Please log in.");

//       const API_URL =
//         process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

//       const res = await fetch(`${API_URL}/interview/start`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           role: targetRole,
//           level: experienceLevel,
//         }),
//       });

//       const data = await res.json();
//       if (!data.success) throw new Error(data.message);

//       setSessionId(data.sessionId);
//       setQuestionCount(1);
//       setIsInterviewOver(false);
//       setInterviewStage("main");

//       setCurrentQuestion({
//         id: data.question._id || Date.now().toString(),
//         text: data.question.text,
//         follow_up: data.question.followUp || "",
//       });

//     } catch (error: any) {
//       alert(error.message || "Failed to start interview.");
//     } finally {
//       setLoading(false);
//     }
//   };


//   // ------ Submit Answer ------
//   const submitAnswer = async () => {
//     if (!transcript.trim())
//       return alert("Speak or type your answer first.");

//     setProcessing(true);

//     try {
//       const token = localStorage.getItem("token");
//       const API_URL =
//         process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

//       if (isListening) toggleListening();

//       const questionContext =
//         interviewStage === "main"
//           ? currentQuestion.text
//           : currentQuestion.follow_up;

//       const res = await fetch(`${API_URL}/interview/analyze`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           transcript,
//           question: questionContext,
//         }),
//       });

//       const json = await res.json();
//       if (!json.success)
//         throw new Error(json.message || "Analysis failed");

//       setLiveFeedback({
//         message:
//           json.data.analysis?.strengths?.[0] || "Great explanation!",
//         score: json.data.analysis?.clarity_score || 0,
//       });

//       setTimeout(() => {
//         moveToNextStage();
//       }, 2000);

//     } catch (err: any) {
//       alert(err.message);
//     } finally {
//       setProcessing(false);
//     }
//   };


//   // ------ Stage & Next Question Logic ------
//   const moveToNextStage = async () => {
//     setTranscript("");
//     setLiveFeedback(null);

//     // If main & follow-up exists → go to follow-up
//     if (interviewStage === "main" && currentQuestion.follow_up) {
//       setInterviewStage("followup");
//       return;
//     }

//     // Otherwise → fetch next question
//     fetchNextQuestion();
//   };


//   const fetchNextQuestion = async () => {
//     if (!sessionId) return;

//     if (questionCount >= MAX_QUESTIONS) {
//       endSession();
//       return;
//     }

//     setLoading(true);

//     try {
//       const token = localStorage.getItem("token");
//       const API_URL =
//         process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

//       const res = await fetch(`${API_URL}/interview/next-question`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           sessionId,
//           role: targetRole,
//           level: experienceLevel,
//         }),
//       });

//       const data = await res.json();
//       if (!data.success) throw new Error(data.message);

//       setCurrentQuestion({
//         id: data.question._id || Date.now().toString(),
//         text: data.question.text,
//         follow_up: data.question.followUp || "",
//       });

//       setQuestionCount((p) => p + 1);
//       setInterviewStage("main");
//       setTranscript("");

//     } catch (err: any) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };


//   // ------ Force End ------
//   const endSession = () => {
//     setIsInterviewOver(true);

//     // Small delay for smoothness
//     setTimeout(() => {
//       window.location.href = `/performance?session=${sessionId}`;
//     }, 1200);
//   };


//   return (
//     <div className="bg-background text-foreground min-h-screen flex">
      
//       <Navigation />

//       <main className="flex-1 p-6 md:p-8 ml-[72px]">

//         <div className="max-w-7xl mx-auto space-y-6">

//           {/* Header */}
//           <div className="flex justify-between items-center">
//             <h1 className="text-2xl font-bold">AI Mock Interview</h1>

//             {sessionId && !isInterviewOver && (
//               <div className="flex items-center gap-4">
//                 <span className="px-3 py-1 rounded-full text-sm bg-primary/10 text-primary border border-primary/20">
//                   Question {questionCount} / {MAX_QUESTIONS}
//                 </span>

//                 <button
//                   onClick={endSession}
//                   className="text-red-500 hover:bg-red-50 border border-red-200 px-3 py-1 rounded-lg flex items-center gap-2"
//                 >
//                   <XCircle size={16} />
//                   End Interview
//                 </button>
//               </div>
//             )}
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

//             {/* Left Section */}
//             <div className="lg:col-span-2 space-y-6">

//               <VideoFeed
//                 isStreaming={!isInterviewOver}
//                 onMetrics={setMetrics}
//               />

//               {/* Question */}
//               {sessionId && !isInterviewOver && (
//                 <QuestionDisplay
//                   question={
//                     interviewStage === "followup"
//                       ? currentQuestion.follow_up
//                       : currentQuestion.text
//                   }
//                   loading={loading}
//                 />
//               )}

//               {/* Interaction */}
//               {!sessionId || isInterviewOver ? (
//                 /* Session Setup Card */
//                 <SessionConfigCard
//                   startSession={startSession}
//                   loading={loading}
//                   targetRole={targetRole}
//                   experienceLevel={experienceLevel}
//                   setTargetRole={setTargetRole}
//                   setExperienceLevel={setExperienceLevel}
//                 />
//               ) : (
//                 /* Active Input */
//                 <InteractionBlock
//                   processing={processing}
//                   isListening={isListening}
//                   toggleListening={toggleListening}
//                   transcript={transcript}
//                   setTranscript={setTranscript}
//                   submitAnswer={submitAnswer}
//                   interviewStage={interviewStage}
//                 />
//               )}
//             </div>

//             {/* Right Section */}
//             <div>
//               <LiveFeedback
//                 metrics={metrics}
//                 latestTranscriptAnalysis={liveFeedback}
//               />
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }


// // =========================
// // REUSABLE COMPONENTS
// // =========================

// function SessionConfigCard({ startSession, loading, targetRole, experienceLevel, setTargetRole, setExperienceLevel }: any) {
//   return (
//     <div className="glass p-8 rounded-xl border text-center space-y-6">
//       <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
//         <Settings size={24} />
//       </div>

//       <h2 className="text-xl font-semibold">Configure Session</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-medium mb-1.5">Target Role</label>
//           <input
//             type="text"
//             value={targetRole}
//             onChange={(e) => setTargetRole(e.target.value)}
//             className="w-full p-2.5 rounded-lg border"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1.5">Experience Level</label>
//           <select
//             value={experienceLevel}
//             onChange={(e) => setExperienceLevel(e.target.value)}
//             className="w-full p-2.5 rounded-lg border"
//           >
//             <option value="Junior">Junior</option>
//             <option value="Mid-Level">Mid-Level</option>
//             <option value="Senior">Senior</option>
//           </select>
//         </div>
//       </div>

//       <button
//         onClick={startSession}
//         disabled={loading}
//         className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold text-lg hover:bg-primary/90"
//       >
//         {loading ? (
//           <span className="flex items-center justify-center gap-2">
//             <Loader2 className="animate-spin" size={20} /> Starting...
//           </span>
//         ) : (
//           "Start Interview"
//         )}
//       </button>
//     </div>
//   );
// }


// function InteractionBlock({ transcript, setTranscript, isListening, toggleListening, submitAnswer, processing, interviewStage }: any) {
//   return (
//     <div className="glass p-6 rounded-xl border">

//       <div className="flex items-center justify-between mb-3">
//         <h3 className="font-semibold">
//           {interviewStage === "main" ? "Answer Main Question" : "Answer Follow-up"}
//         </h3>

//         <button
//           onClick={toggleListening}
//           className={`p-2 rounded-full transition-colors ${
//             isListening
//               ? "bg-red-500 text-white animate-pulse"
//               : "bg-secondary hover:bg-secondary/80"
//           }`}
//         >
//           {isListening ? <MicOff size={20} /> : <Mic size={20} />}
//         </button>
//       </div>

//       <textarea
//         value={transcript}
//         onChange={(e) => setTranscript(e.target.value)}
//         className="w-full bg-muted/20 p-4 rounded-lg min-h-[120px] mb-4 text-sm border resize-none"
//         placeholder={
//           isListening
//             ? "Listening..."
//             : "Type your answer or press the mic to speak..."
//         }
//         disabled={processing}
//       />

//       <button
//         onClick={submitAnswer}
//         disabled={!transcript.trim() || processing}
//         className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg flex gap-2 justify-center font-medium hover:bg-primary/90 disabled:opacity-50"
//       >
//         {processing ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
//         {processing ? "Analyzing..." : interviewStage === "main" ? "Submit & Continue" : "Submit & Next Question"}
//       </button>
//     </div>
//   );
// }










// "use client";

// import { useState, useEffect, useRef } from "react";
// import Navigation from "@/components/navigation";
// import VideoFeed from "@/components/interviewer/video-feed";
// import QuestionDisplay from "@/components/interviewer/question-display";
// import LiveFeedback from "@/components/interviewer/live-feedback";
// import { Settings, Loader2, Mic, MicOff, Send, XCircle, BarChart3 } from "lucide-react";

// interface Question {
//   id: string;
//   text: string;
//   follow_up?: string;
//   difficulty?: string;
// }

// export default function InterviewerPage() {
//   // --- Config State ---
//   const [sessionId, setSessionId] = useState<string | null>(null);
//   const [targetRole, setTargetRole] = useState("Full Stack Developer");
//   const [experienceLevel, setExperienceLevel] = useState("Mid-Level");
  
//   // --- Interview State ---
//   const [isInterviewActive, setIsInterviewActive] = useState(false);
//   const [questionCount, setQuestionCount] = useState(0);
//   const [currentQuestion, setCurrentQuestion] = useState<Question>({ id: "0", text: "", follow_up: "" });
//   const [interviewStage, setInterviewStage] = useState<'main' | 'followup'>('main');
//   const [loading, setLoading] = useState(false);

//   // --- Real-Time Data State ---
//   const [videoMetrics, setVideoMetrics] = useState<any>(null); // From VideoFeed
//   const [transcriptAnalysis, setTranscriptAnalysis] = useState<any>(null); // From Speech Analysis
  
//   // --- Speech State ---
//   const [transcript, setTranscript] = useState("");
//   const [isListening, setIsListening] = useState(false);
//   const [processing, setProcessing] = useState(false);
//   const recognitionRef = useRef<any>(null);

//   // --- 1. Init Speech Recognition ---
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
//       if (SR) {
//         const rec = new SR();
//         rec.continuous = true;
//         rec.interimResults = true;
//         rec.lang = "en-US";
//         rec.onresult = (event: any) => {
//           let text = "";
//           for (let i = event.resultIndex; i < event.results.length; i++) {
//             if (event.results[i].isFinal) text += event.results[i][0].transcript + " ";
//           }
//           if (text.trim()) setTranscript((prev) => prev + text);
//         };
//         recognitionRef.current = rec;
//       }
//     }
//   }, []);

//   const toggleListening = () => {
//     if (!recognitionRef.current) return alert("Browser does not support speech recognition.");
//     if (isListening) {
//       recognitionRef.current.stop();
//       setIsListening(false);
//     } else {
//       setTranscript("");
//       recognitionRef.current.start();
//       setIsListening(true);
//     }
//   };

//   // --- 2. Start Real-World Session ---
//   const startSession = async () => {
//     if (!targetRole) return alert("Please enter a target role.");
//     setLoading(true);

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return alert("Please log in.");

//       const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

//       // Call Backend to generate REAL question based on Role
//       const res = await fetch(`${API_URL}/interview/start`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ role: targetRole, level: experienceLevel }),
//       });

//       const data = await res.json();

//       if (data.success && data.question) {
//         setSessionId(data.sessionId);
//         setCurrentQuestion({
//           id: data.question._id || "1",
//           text: data.question.text,
//           follow_up: data.question.followUp,
//         });
//         setQuestionCount(1);
//         setIsInterviewActive(true);
//       } else {
//         throw new Error(data.message || "Failed to generate question.");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Failed to start session. Ensure Backend is running.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- 3. Analyze Answer ---
//   const submitAnswer = async () => {
//     if (!transcript.trim()) return;
//     setProcessing(true);
//     if (isListening) toggleListening();

//     try {
//       const token = localStorage.getItem("token");
//       const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

//       const res = await fetch(`${API_URL}/interview/analyze`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ transcript, question: currentQuestion.text }),
//       });

//       const data = await res.json();
//       if (data.success) {
//         // Update Feedback Panel
//         // Handle nested structure if needed
//         const analysis = data.data?.analysis || data.analysis;
//         setTranscriptAnalysis(analysis);
        
//         // Move to next stage after short delay
//         setTimeout(() => {
//             if (interviewStage === 'main' && currentQuestion.follow_up) {
//                 setInterviewStage('followup');
//                 setTranscript("");
//             } else {
//                 fetchNextQuestion();
//             }
//         }, 4000); // Give time to read feedback
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setProcessing(false);
//     }
//   };

//   const fetchNextQuestion = async () => {
//     setLoading(true);
//     setTranscript("");
//     setTranscriptAnalysis(null);
    
//     try {
//         const token = localStorage.getItem("token");
//         const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
//         const res = await fetch(`${API_URL}/interview/next-question`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//             body: JSON.stringify({ sessionId, role: targetRole, level: experienceLevel }),
//         });
//         const data = await res.json();
//         if (data.success) {
//             setCurrentQuestion({
//                 id: data.question._id,
//                 text: data.question.text,
//                 follow_up: data.question.followUp
//             });
//             setQuestionCount(prev => prev + 1);
//             setInterviewStage('main');
//         }
//     } catch (err) { console.error(err); }
//     finally { setLoading(false); }
//   };

//   return (
//     <div className="bg-gray-50 text-gray-900 min-h-screen flex">
//       {/* Navigation Sidebar */}
//       <Navigation /> 

//       {/* ✅ FIX: Wider Layout (max-w-[1800px]) */}
//       <main className="flex-1 p-4 md:p-6 lg:p-8 ml-[72px] lg:ml-[240px] overflow-hidden">
//         <div className="max-w-[1800px] mx-auto h-full flex flex-col gap-6">
          
//           {/* Header */}
//           <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
//             <div className="flex items-center gap-3">
//                 <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
//                     <BarChart3 size={24} />
//                 </div>
//                 <div>
//                     <h1 className="text-xl font-bold tracking-tight text-gray-900">AI Interview Coach</h1>
//                     <p className="text-gray-500 text-xs">Real-time emotion & technical analysis</p>
//                 </div>
//             </div>
            
//             {sessionId && !isInterviewActive && (
//               <div className="flex items-center gap-3">
//                 <div className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold border border-blue-100">
//                    Q{questionCount}
//                 </div>
//                 <button onClick={() => window.location.reload()} className="text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border border-transparent hover:border-red-100">
//                    End
//                 </button>
//               </div>
//             )}
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
            
//             {/* LEFT: Interaction (9 Cols - Wider) */}
//             <div className="lg:col-span-8 xl:col-span-9 flex flex-col gap-6">
                
//                 {/* 1. Video Feed - Always active */}
//                 <div className="relative flex-1 bg-black rounded-2xl overflow-hidden border border-gray-800 shadow-lg min-h-[400px]">
//                     <VideoFeed isStreaming={true} onMetrics={setVideoMetrics} />
                    
//                     {/* Live Emotion Badge Overlay */}
//                     {videoMetrics && (
//                         <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 border border-white/10">
//                              <div className={`w-2 h-2 rounded-full ${videoMetrics.visual_confidence > 70 ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-amber-500'}`}></div>
//                              {videoMetrics.emotion || "Calibrating..."} ({videoMetrics.emotion_confidence}%)
//                         </div>
//                     )}

//                     {/* Setup Overlay */}
//                     {!isInterviewActive && (
//                         <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-20">
//                             <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full space-y-6 text-center border border-gray-200">
//                                 <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto ring-4 ring-blue-50/50">
//                                     <Settings size={28} />
//                                 </div>
//                                 <h2 className="text-2xl font-bold text-gray-900">Session Setup</h2>
                                
//                                 <div className="space-y-4 text-left">
//                                     <div>
//                                         <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Target Role</label>
//                                         <input 
//                                             className="w-full p-3 border border-gray-200 rounded-xl mt-1 focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium" 
//                                             value={targetRole} 
//                                             onChange={e => setTargetRole(e.target.value)} 
//                                             placeholder="e.g. DevOps Engineer"
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Difficulty</label>
//                                         <div className="grid grid-cols-3 gap-2 mt-1">
//                                             {['Junior', 'Mid-Level', 'Senior'].map((lvl) => (
//                                                 <button
//                                                     key={lvl}
//                                                     onClick={() => setExperienceLevel(lvl)}
//                                                     className={`py-2 rounded-lg text-xs font-bold border transition-all ${experienceLevel === lvl ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'}`}
//                                                 >
//                                                     {lvl}
//                                                 </button>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <button onClick={startSession} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-bold transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20">
//                                     {loading ? <Loader2 className="animate-spin" size={18} /> : "Start Interview"}
//                                 </button>
//                             </div>
//                         </div>
//                     )}
//                 </div>

//                 {/* 2. Interaction Area (Only when active) */}
//                 {isInterviewActive && (
//                     <div className="grid grid-cols-1 gap-4 animate-in slide-in-from-bottom-4 duration-500">
//                         <QuestionDisplay 
//                             question={interviewStage === 'main' ? currentQuestion.text : currentQuestion.follow_up || "Follow up..."}
//                             loading={loading}
//                             stage={interviewStage}
//                         />
                        
//                         <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex gap-3 items-start">
//                             <textarea 
//                                 className="flex-1 p-3 bg-gray-50 border border-gray-200 rounded-lg resize-none min-h-[80px] focus:ring-2 focus:ring-blue-500 outline-none text-sm" 
//                                 placeholder="Speak your answer..."
//                                 value={transcript}
//                                 onChange={e => setTranscript(e.target.value)}
//                             />
//                             <div className="flex flex-col gap-2">
//                                 <button 
//                                     onClick={toggleListening} 
//                                     className={`p-3 rounded-lg transition-all ${isListening ? 'bg-red-500 text-white animate-pulse shadow-red-500/30 shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
//                                 >
//                                     {isListening ? <MicOff size={20}/> : <Mic size={20}/>}
//                                 </button>
//                                 <button 
//                                     onClick={submitAnswer} 
//                                     disabled={processing || !transcript} 
//                                     className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all shadow-blue-600/30 shadow-lg"
//                                 >
//                                     {processing ? <Loader2 className="animate-spin" size={20}/> : <Send size={20}/>}
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>

//             {/* RIGHT: Live Feedback (3 Cols - Narrower sidebar) */}
//             <div className="lg:col-span-4 xl:col-span-3 h-full overflow-y-auto pr-1">
//                 <LiveFeedback 
//                     metrics={videoMetrics} 
//                     latestTranscriptAnalysis={transcriptAnalysis} 
//                 />
//             </div>

//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }










// "use client";

// import { useState, useEffect, useRef } from "react";
// import { useRouter } from "next/navigation"; // ✅ Import router for redirection
// import Navigation from "@/components/navigation";
// import VideoFeed from "@/components/interviewer/video-feed";
// import QuestionDisplay from "@/components/interviewer/question-display";
// import LiveFeedback from "@/components/interviewer/live-feedback";
// import { Settings, Loader2, Mic, MicOff, Send, XCircle, BarChart3, CheckCircle } from "lucide-react";

// interface Question {
//   id: string;
//   text: string;
//   follow_up?: string;
//   difficulty?: string;
// }

// const MAX_QUESTIONS = 5; // ✅ Define Max Questions

// export default function InterviewerPage() {
//   const router = useRouter(); // ✅ Router hook

//   // --- Config State ---
//   const [sessionId, setSessionId] = useState<string | null>(null);
//   const [targetRole, setTargetRole] = useState("Full Stack Developer");
//   const [experienceLevel, setExperienceLevel] = useState("Mid-Level");
  
//   // --- Interview State ---
//   const [isInterviewActive, setIsInterviewActive] = useState(false);
//   const [isInterviewOver, setIsInterviewOver] = useState(false); // ✅ Track completion
//   const [questionCount, setQuestionCount] = useState(0);
//   const [currentQuestion, setCurrentQuestion] = useState<Question>({ id: "0", text: "", follow_up: "" });
//   const [interviewStage, setInterviewStage] = useState<'main' | 'followup'>('main');
//   const [loading, setLoading] = useState(false);

//   // --- Real-Time Data State ---
//   const [videoMetrics, setVideoMetrics] = useState<any>(null); 
//   const [transcriptAnalysis, setTranscriptAnalysis] = useState<any>(null); 
  
//   // --- Speech State ---
//   const [transcript, setTranscript] = useState("");
//   const [isListening, setIsListening] = useState(false);
//   const [processing, setProcessing] = useState(false);
//   const recognitionRef = useRef<any>(null);

//   // --- 1. Init Speech Recognition ---
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
//       if (SR) {
//         const rec = new SR();
//         rec.continuous = true;
//         rec.interimResults = true;
//         rec.lang = "en-US";
//         rec.onresult = (event: any) => {
//           let text = "";
//           for (let i = event.resultIndex; i < event.results.length; i++) {
//             if (event.results[i].isFinal) text += event.results[i][0].transcript + " ";
//           }
//           if (text.trim()) setTranscript((prev) => prev + text);
//         };
//         recognitionRef.current = rec;
//       }
//     }
//   }, []);

//   const toggleListening = () => {
//     if (!recognitionRef.current) return alert("Browser does not support speech recognition.");
//     if (isListening) {
//       recognitionRef.current.stop();
//       setIsListening(false);
//     } else {
//       setTranscript("");
//       recognitionRef.current.start();
//       setIsListening(true);
//     }
//   };

//   // --- 2. End Session & Redirect ---
//   const endSession = () => {
//     setIsInterviewOver(true);
//     setIsListening(false);
//     if (recognitionRef.current) recognitionRef.current.stop();

//     // Redirect after 3 seconds
//     setTimeout(() => {
//         router.push(`/performance?session=${sessionId}`);
//     }, 3000);
//   };

//   // --- 3. Start Session ---
//   const startSession = async () => {
//     if (!targetRole) return alert("Please enter a target role.");
//     setLoading(true);

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return alert("Please log in.");

//       const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

//       const res = await fetch(`${API_URL}/interview/start`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ role: targetRole, level: experienceLevel }),
//       });

//       const data = await res.json();

//       if (data.success && data.question) {
//         setSessionId(data.sessionId);
//         setCurrentQuestion({
//           id: data.question._id || "1",
//           text: data.question.text,
//           follow_up: data.question.followUp,
//         });
//         setQuestionCount(1);
//         setIsInterviewActive(true);
//       } else {
//         throw new Error(data.message || "Failed to generate question.");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Failed to start session. Ensure Backend is running.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- 4. Analyze Answer ---
//   const submitAnswer = async () => {
//     if (!transcript.trim()) return;
//     setProcessing(true);
//     if (isListening) toggleListening();

//     try {
//       const token = localStorage.getItem("token");
//       const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

//       const res = await fetch(`${API_URL}/interview/analyze`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ transcript, question: currentQuestion.text }),
//       });

//       const data = await res.json();
//       if (data.success) {
//         setTranscriptAnalysis(data.data.analysis);
        
//         setTimeout(() => {
//             if (interviewStage === 'main' && currentQuestion.follow_up) {
//                 setInterviewStage('followup');
//                 setTranscript("");
//             } else {
//                 fetchNextQuestion();
//             }
//         }, 4000); 
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setProcessing(false);
//     }
//   };

//   const fetchNextQuestion = async () => {
//     // ✅ Check if we reached the limit
//     if (questionCount >= MAX_QUESTIONS) {
//         endSession();
//         return;
//     }

//     setLoading(true);
//     setTranscript("");
//     setTranscriptAnalysis(null);
    
//     try {
//         const token = localStorage.getItem("token");
//         const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
//         const res = await fetch(`${API_URL}/interview/next-question`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//             body: JSON.stringify({ sessionId, role: targetRole, level: experienceLevel }),
//         });
//         const data = await res.json();
//         if (data.success) {
//             setCurrentQuestion({
//                 id: data.question._id,
//                 text: data.question.text,
//                 follow_up: data.question.followUp
//             });
//             setQuestionCount(prev => prev + 1);
//             setInterviewStage('main');
//         }
//     } catch (err) { console.error(err); }
//     finally { setLoading(false); }
//   };

//   return (
//     <div className="bg-gray-50 text-gray-900 min-h-screen flex">

//       {/* Main Content: Max Width 1800px for Ultra-Wide Feel */}
//       <main className="flex-1 p-4 lg:p-6 ml-[72px] lg:ml-[240px] overflow-hidden h-screen flex flex-col">
//         <div className="max-w-[1800px] w-full mx-auto flex flex-col gap-4 h-full">
          
//           {/* Header */}
//           <div className="flex justify-between items-center bg-white px-6 py-3 rounded-xl border border-gray-200 shadow-sm shrink-0">
//             <div className="flex items-center gap-3">
//                 <div className="p-2 bg-blue-600 rounded-lg text-white shadow-lg shadow-blue-200">
//                     <BarChart3 size={20} />
//                 </div>
//                 <div>
//                     <h1 className="text-lg font-bold tracking-tight text-gray-900">AI Interview Coach</h1>
//                     <p className="text-gray-400 text-xs font-medium">Real-time Analysis Active</p>
//                 </div>
//             </div>
            
//             {sessionId && !isInterviewOver && (
//               <div className="flex items-center gap-4">
//                 <div className="flex items-center gap-2 px-4 py-1.5 bg-gray-100 rounded-full border border-gray-200">
//                    <span className="text-xs font-bold text-gray-500 uppercase">Progress</span>
//                    <span className="text-sm font-bold text-blue-600">{questionCount} / {MAX_QUESTIONS}</span>
//                 </div>
//                 <button onClick={endSession} className="text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors">
//                    End Session
//                 </button>
//               </div>
//             )}
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full overflow-hidden pb-4">
            
//             {/* LEFT: Interaction (9 Cols) */}
//             <div className="lg:col-span-9 flex flex-col gap-4 h-full overflow-y-auto pr-1 custom-scrollbar">
                
//                 {/* 1. Video Feed */}
//                 <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden border border-gray-800 shadow-2xl shrink-0">
//                     <VideoFeed isStreaming={!isInterviewOver} onMetrics={setVideoMetrics} />
                    
//                     {/* Live Badge */}
//                     {videoMetrics && !isInterviewOver && (
//                         <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 border border-white/10 shadow-lg">
//                              <div className={`w-2 h-2 rounded-full ${videoMetrics.visual_confidence > 70 ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-amber-500'}`}></div>
//                              {videoMetrics.emotion || "Calibrating..."} ({videoMetrics.emotion_confidence}%)
//                         </div>
//                     )}

//                     {/* Setup Overlay */}
//                     {!isInterviewActive && !isInterviewOver && (
//                         <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-20 p-4">
//                             <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full space-y-6 text-center border border-gray-200 animate-in fade-in zoom-in duration-300">
//                                 <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
//                                     <Settings size={32} />
//                                 </div>
//                                 <h2 className="text-2xl font-bold text-gray-900">Session Setup</h2>
                                
//                                 <div className="space-y-4 text-left">
//                                     <div>
//                                         <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Target Role</label>
//                                         <input 
//                                             className="w-full p-3 border border-gray-200 rounded-xl mt-1 focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium transition-all" 
//                                             value={targetRole} 
//                                             onChange={e => setTargetRole(e.target.value)} 
//                                             placeholder="e.g. Senior DevOps Engineer"
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Difficulty</label>
//                                         <div className="grid grid-cols-3 gap-2 mt-1">
//                                             {['Junior', 'Mid-Level', 'Senior'].map((lvl) => (
//                                                 <button
//                                                     key={lvl}
//                                                     onClick={() => setExperienceLevel(lvl)}
//                                                     className={`py-2.5 rounded-lg text-xs font-bold border transition-all ${experienceLevel === lvl ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
//                                                 >
//                                                     {lvl}
//                                                 </button>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <button onClick={startSession} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-bold transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30">
//                                     {loading ? <Loader2 className="animate-spin" size={18} /> : "Start Interview"}
//                                 </button>
//                             </div>
//                         </div>
//                     )}

//                     {/* Completion Overlay */}
//                     {isInterviewOver && (
//                         <div className="absolute inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-30">
//                             <div className="text-center text-white space-y-4 animate-in fade-in zoom-in duration-500">
//                                 <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto ring-4 ring-green-500/10">
//                                     <CheckCircle size={48} />
//                                 </div>
//                                 <h2 className="text-3xl font-bold">Interview Completed!</h2>
//                                 <p className="text-gray-400">Generating your performance report...</p>
//                                 <Loader2 className="animate-spin mx-auto text-blue-500" size={32} />
//                             </div>
//                         </div>
//                     )}
//                 </div>

//                 {/* 2. Interaction Area */}
//                 {isInterviewActive && !isInterviewOver && (
//                     <div className="grid grid-cols-1 gap-4 animate-in slide-in-from-bottom-4 duration-500 pb-10">
//                         <QuestionDisplay 
//                             question={interviewStage === 'main' ? currentQuestion.text : currentQuestion.follow_up || "Follow up..."}
//                             loading={loading}
//                             stage={interviewStage}
//                         />
                        
//                         <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex gap-3 items-start transition-shadow hover:shadow-md">
//                             <textarea 
//                                 className="flex-1 p-3 bg-gray-50 border border-gray-200 rounded-lg resize-none min-h-[100px] focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all" 
//                                 placeholder="Type or speak your answer..."
//                                 value={transcript}
//                                 onChange={e => setTranscript(e.target.value)}
//                             />
//                             <div className="flex flex-col gap-2">
//                                 <button 
//                                     onClick={toggleListening} 
//                                     className={`p-3 rounded-lg transition-all ${isListening ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/30' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
//                                 >
//                                     {isListening ? <MicOff size={20}/> : <Mic size={20}/>}
//                                 </button>
//                                 <button 
//                                     onClick={submitAnswer} 
//                                     disabled={processing || !transcript} 
//                                     className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg shadow-blue-600/30"
//                                 >
//                                     {processing ? <Loader2 className="animate-spin" size={20}/> : <Send size={20}/>}
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>

//             {/* RIGHT: Live Feedback (3 Cols - Narrow Sidebar) */}
//             <div className="lg:col-span-3 h-full overflow-y-auto pr-1 custom-scrollbar">
//                 <LiveFeedback 
//                     metrics={videoMetrics} 
//                     latestTranscriptAnalysis={transcriptAnalysis} 
//                 />
//             </div>

//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }








// "use client";

// import { useState, useEffect, useRef, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import Navigation from "@/components/navigation";
// import VideoFeed from "@/components/interviewer/video-feed";
// import QuestionDisplay from "@/components/interviewer/question-display";
// import LiveFeedback from "@/components/interviewer/live-feedback";
// import { 
//   Settings, Loader2, Mic, MicOff, Send, 
//   BarChart3, CheckCircle, Volume2, VolumeX, ArrowRight 
// } from "lucide-react";

// // --- Types & Interfaces ---
// interface Question {
//   id: string;
//   text: string;
//   follow_up?: string;
// }

// interface AnalysisData {
//   strengths: string[];
//   improvements: string[];
//   clarity_score: number;
// }

// // Global definition for Speech API to satisfy TypeScript
// declare global {
//   interface Window {
//     SpeechRecognition: any;
//     webkitSpeechRecognition: any;
//   }
// }

// const MAX_QUESTIONS = 5;

// export default function InterviewerPage() {
//   const router = useRouter();
//   const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

  

//   // --- Configuration State ---
//   const [config, setConfig] = useState({
//     sessionId: null as string | null,
//     role: "Full Stack Developer",
//     level: "Mid-Level"
//   });

//   // --- Interview Flow State ---
//   const [status, setStatus] = useState<'setup' | 'active' | 'analyzing' | 'completed'>('setup');
//   const [questionCount, setQuestionCount] = useState(0);
//   const [currentQuestion, setCurrentQuestion] = useState<Question>({ id: "0", text: "", follow_up: "" });
//   const [interviewStage, setInterviewStage] = useState<'main' | 'followup'>('main');
//   const [loading, setLoading] = useState(false);
//   const [ttsEnabled, setTtsEnabled] = useState(true);

//   // --- Data State ---
//   const [videoMetrics, setVideoMetrics] = useState<any>(null);
//   const [transcriptAnalysis, setTranscriptAnalysis] = useState<AnalysisData | null>(null);
//   const [transcript, setTranscript] = useState("");
  
//   // --- Speech & Audio Refs ---
//   const [isListening, setIsListening] = useState(false);
//   const recognitionRef = useRef<any>(null);

//   // ------------------------------------------------------------------
//   // 🎤 SPEECH RECOGNITION SETUP
//   // ------------------------------------------------------------------
//   useEffect(() => {
//     if (typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition)) {
//       const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//       const recognition = new SpeechRecognition();
//       recognition.continuous = true;
//       recognition.interimResults = true;
//       recognition.lang = "en-US";

//       recognition.onresult = (event: any) => {
//         let interimTranscript = "";
//         let finalTranscript = "";

//         for (let i = event.resultIndex; i < event.results.length; i++) {
//           const transcriptText = event.results[i][0].transcript;
//           if (event.results[i].isFinal) {
//             finalTranscript += transcriptText + " ";
//           } else {
//             interimTranscript += transcriptText;
//           }
//         }
        
//         // Append final results to existing transcript
//         if (finalTranscript) {
//            setTranscript((prev) => prev + finalTranscript);
//         }
//       };

//       recognition.onerror = (event: any) => {
//         console.error("Speech recognition error", event.error);
//         setIsListening(false);
//       };

//       recognitionRef.current = recognition;
//     }
//   }, []);

//   const toggleListening = () => {
//     if (!recognitionRef.current) return alert("Browser does not support speech recognition.");
    
//     if (isListening) {
//       recognitionRef.current.stop();
//       setIsListening(false);
//     } else {
//       recognitionRef.current.start();
//       setIsListening(true);
//     }
//   };

//   // ------------------------------------------------------------------
//   // 🔊 TEXT-TO-SPEECH (The AI Interviewer Voice)
//   // ------------------------------------------------------------------
//   useEffect(() => {
//     if (status === 'active' && currentQuestion.text && ttsEnabled) {
//       const textToSpeak = interviewStage === 'main' ? currentQuestion.text : currentQuestion.follow_up;
//       if (!textToSpeak) return;

//       // Cancel previous speech to avoid overlapping
//       window.speechSynthesis.cancel();

//       const utterance = new SpeechSynthesisUtterance(textToSpeak);
//       utterance.rate = 1.0;
//       utterance.pitch = 1.0;
//       // utterance.voice = ... (Optional: Select a specific voice here)
      
//       window.speechSynthesis.speak(utterance);
//     }
//   }, [currentQuestion, interviewStage, status, ttsEnabled]);


//   // ------------------------------------------------------------------
//   // 🚀 API ACTIONS
//   // ------------------------------------------------------------------

//   const startSession = async () => {
//     if (!config.role) return alert("Please enter a target role.");
//     setLoading(true);

//     try {
//       // Simulating a token for now - replace with actual Auth logic
//       const token = localStorage.getItem("token") || "demo-token";

//       const res = await fetch(`${API_URL}/interview/start`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ role: config.role, level: config.level }),
//       });

//       const data = await res.json();

//       if (data.success && data.question) {
//         setConfig(prev => ({ ...prev, sessionId: data.sessionId }));
//         setCurrentQuestion({
//           id: data.question._id || "1",
//           text: data.question.text,
//           follow_up: data.question.follow_up, // Note: Python variable naming case
//         });
//         setQuestionCount(1);
//         setStatus('active');
//       } else {
//         throw new Error(data.message || "Failed to start.");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Could not connect to AI Engine. Is the backend running?");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const submitAnswer = async () => {
//     if (!transcript.trim()) return;
    
//     // Stop listening while analyzing
//     if (isListening) {
//       recognitionRef.current.stop();
//       setIsListening(false);
//     }

//     setStatus('analyzing'); // Show loading state on button

//     try {
//       const token = localStorage.getItem("token") || "demo-token";
//       const res = await fetch(`${API_URL}/interview/analyze`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ 
//           transcript: transcript, // Sending as 'answer' per updated backend
//           question: currentQuestion.text 
//         }),
//       });

//       const data = await res.json();
//       if (data.success) {
//         setTranscriptAnalysis(data.data.analysis);
        
//         // Auto-advance logic after 4 seconds IF it's not the last question
//         // You might prefer manual advance (User clicks 'Next') to let them read feedback
//         setTimeout(() => {
//             handleStageTransition();
//         }, 5000);
//       }
//     } catch (err) {
//       console.error(err);
//       setStatus('active'); // Revert on error
//     }
//   };

//   const handleStageTransition = () => {
//       // If we are in main stage and there is a follow up, go to follow up
//       if (interviewStage === 'main' && currentQuestion.follow_up) {
//           setInterviewStage('followup');
//           setTranscript("");
//           setTranscriptAnalysis(null);
//           setStatus('active');
//       } else {
//           // Otherwise get next question
//           fetchNextQuestion();
//       }
//   };

//   const fetchNextQuestion = async () => {
//     if (questionCount >= MAX_QUESTIONS) {
//         setStatus('completed');
//         setTimeout(() => router.push(`/performance?session=${config.sessionId}`), 3000);
//         return;
//     }

//     setLoading(true);
//     setTranscript("");
//     setTranscriptAnalysis(null);
    
//     try {
//         const token = localStorage.getItem("token") || "demo-token";
//         const res = await fetch(`${API_URL}/interview/next-question`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//             body: JSON.stringify({ sessionId: config.sessionId, role: config.role, level: config.level }),
//         });
//         const data = await res.json();
        
//         if (data.success) {
//             setCurrentQuestion({
//                 id: data.question._id,
//                 text: data.question.text,
//                 follow_up: data.question.follow_up
//             });
//             setQuestionCount(prev => prev + 1);
//             setInterviewStage('main');
//             setStatus('active');
//         }
//     } catch (err) { console.error(err); }
//     finally { setLoading(false); }
//   };

//   return (
//     <div className="bg-gray-50 text-gray-900 min-h-screen flex font-sans">
      
//       {/* NOTE: Assuming you have a Navigation/Sidebar component. 
//         Adjust margins (ml-[72px]) based on your actual Sidebar width.
//       */}
//       <main className="flex-1 p-4 lg:p-6 ml-[72px] lg:ml-[240px] overflow-hidden h-screen flex flex-col transition-all duration-300">
//         <div className="max-w-[1920px] w-full mx-auto flex flex-col gap-4 h-full">
          
//           {/* Header Bar */}
//           <header className="flex justify-between items-center bg-white px-6 py-4 rounded-xl border border-gray-200 shadow-sm shrink-0">
//             <div className="flex items-center gap-3">
//                 <div className="p-2.5 bg-indigo-600 rounded-lg text-white shadow-lg shadow-indigo-200">
//                     <BarChart3 size={20} />
//                 </div>
//                 <div>
//                     <h1 className="text-xl font-bold tracking-tight text-gray-900">AI Career Copilot</h1>
//                     <p className="text-gray-400 text-xs font-medium">Interview Session • {config.role}</p>
//                 </div>
//             </div>
            
//             {status !== 'setup' && status !== 'completed' && (
//               <div className="flex items-center gap-6">
//                  {/* TTS Toggle */}
//                 <button 
//                   onClick={() => setTtsEnabled(!ttsEnabled)}
//                   className="text-gray-400 hover:text-indigo-600 transition-colors"
//                   title="Toggle AI Voice"
//                 >
//                   {ttsEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
//                 </button>

//                 {/* Progress */}
//                 <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-full border border-gray-200">
//                    <div className="flex gap-1">
//                       {Array.from({ length: MAX_QUESTIONS }).map((_, i) => (
//                         <div key={i} className={`h-2 w-8 rounded-full transition-all ${i < questionCount ? 'bg-indigo-600' : 'bg-gray-200'}`} />
//                       ))}
//                    </div>
//                    <span className="text-sm font-bold text-gray-600 ml-2">{questionCount}/{MAX_QUESTIONS}</span>
//                 </div>

//                 <button onClick={() => setStatus('completed')} className="text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors">
//                    End
//                 </button>
//               </div>
//             )}
//           </header>

//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full overflow-hidden pb-2">
            
//             {/* LEFT: Interaction Area */}
//             <div className="lg:col-span-8 xl:col-span-9 flex flex-col gap-6 h-full overflow-y-auto pr-2 custom-scrollbar">
                
//                 {/* 1. Video Feed (Always visible) */}
//                 <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden border border-gray-800 shadow-2xl shrink-0">
//                     <VideoFeed isStreaming={status !== 'completed'} onMetrics={setVideoMetrics} />
                    
//                     {/* Setup Overlay */}
//                     {status === 'setup' && (
//                         <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-20">
//                             <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full space-y-6 animate-in fade-in zoom-in duration-300">
//                                 <div className="text-center">
//                                     <h2 className="text-2xl font-bold text-gray-900">Configure Session</h2>
//                                     <p className="text-gray-500 text-sm mt-1">Select your target role and difficulty to begin.</p>
//                                 </div>
//                                 <div className="space-y-4">
//                                     <div>
//                                         <label className="text-xs font-bold text-gray-500 uppercase">Role</label>
//                                         <input 
//                                             className="w-full p-3 border border-gray-200 rounded-lg mt-1 focus:ring-2 focus:ring-indigo-500 outline-none text-sm" 
//                                             value={config.role} 
//                                             onChange={e => setConfig({ ...config, role: e.target.value })} 
//                                         />
//                                     </div>
//                                     <div className="grid grid-cols-3 gap-2">
//                                         {['Junior', 'Mid-Level', 'Senior'].map((lvl) => (
//                                             <button
//                                                 key={lvl}
//                                                 onClick={() => setConfig({ ...config, level: lvl })}
//                                                 className={`py-2 rounded-lg text-xs font-bold border transition-all ${config.level === lvl ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
//                                             >
//                                                 {lvl}
//                                             </button>
//                                         ))}
//                                     </div>
//                                 </div>
//                                 <button onClick={startSession} disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2">
//                                     {loading ? <Loader2 className="animate-spin" size={18} /> : "Start Interview"}
//                                 </button>
//                             </div>
//                         </div>
//                     )}
//                 </div>

//                 {/* 2. Question & Answer Area */}
//                 {(status === 'active' || status === 'analyzing') && (
//                     <div className="flex flex-col gap-4 animate-in slide-in-from-bottom-4 duration-500 pb-10">
//                         <QuestionDisplay 
//                             question={interviewStage === 'main' ? currentQuestion.text : (currentQuestion.follow_up || "Follow up question...")}
//                             loading={loading}
//                             stage={interviewStage}
//                         />
                        
//                         <div className="bg-white p-1 rounded-xl border border-gray-200 shadow-sm transition-shadow hover:shadow-md relative">
//                             <textarea 
//                                 className="w-full p-4 bg-transparent resize-none min-h-[120px] outline-none text-gray-700 text-lg leading-relaxed placeholder:text-gray-300" 
//                                 placeholder="Answer here..."
//                                 value={transcript}
//                                 onChange={e => setTranscript(e.target.value)}
//                             />
                            
//                             <div className="flex justify-between items-center px-4 pb-4 mt-2 border-t border-gray-100 pt-3">
//                                 <div className="flex items-center gap-2">
//                                     <span className={`h-2 w-2 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-gray-300'}`}></span>
//                                     <span className="text-xs font-medium text-gray-500">{isListening ? 'Listening...' : 'Microphone Ready'}</span>
//                                 </div>

//                                 <div className="flex gap-2">
//                                     <button 
//                                         onClick={toggleListening} 
//                                         className={`p-3 rounded-full transition-all ${isListening ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
//                                         title="Toggle Microphone"
//                                     >
//                                         {isListening ? <MicOff size={20}/> : <Mic size={20}/>}
//                                     </button>
                                    
//                                     <button 
//                                         onClick={submitAnswer} 
//                                         disabled={status === 'analyzing' || !transcript} 
//                                         className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-indigo-200 flex items-center gap-2 font-medium"
//                                     >
//                                         {status === 'analyzing' ? (
//                                             <><Loader2 className="animate-spin" size={18}/> Analyzing...</>
//                                         ) : (
//                                             <><Send size={18}/> Submit Answer</>
//                                         )}
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>

//             {/* RIGHT: Live Analysis Sidebar */}
//             <div className="lg:col-span-4 xl:col-span-3 h-full overflow-hidden flex flex-col">
//                 <LiveFeedback 
//                     metrics={videoMetrics} 
//                     latestTranscriptAnalysis={transcriptAnalysis} 
//                 />
//             </div>

//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }







"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import VideoFeed from "@/components/interviewer/video-feed";
import QuestionDisplay from "@/components/interviewer/question-display";
import LiveFeedback from "@/components/interviewer/live-feedback";
import { 
  Loader2, Mic, MicOff, Send, 
  BarChart3, Volume2, VolumeX, Menu, X 
} from "lucide-react";

// --- Types & Interfaces ---
interface Question {
  id: string;
  text: string;
  follow_up?: string;
}

interface AnalysisData {
  strengths: string[];
  improvements: string[];
  clarity_score: number;
}

// Global definition for Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const MAX_QUESTIONS = 5;

export default function InterviewerPage() {
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

  // --- Configuration State ---
  const [config, setConfig] = useState({
    sessionId: null as string | null,
    role: "Full Stack Developer",
    level: "Mid-Level"
  });

  // --- Interview Flow State ---
  const [status, setStatus] = useState<'setup' | 'active' | 'analyzing' | 'completed'>('setup');
  const [questionCount, setQuestionCount] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question>({ id: "0", text: "", follow_up: "" });
  const [interviewStage, setInterviewStage] = useState<'main' | 'followup'>('main');
  const [loading, setLoading] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [showAnalysisMobile, setShowAnalysisMobile] = useState(false); // New state for mobile toggle

  // --- Data State ---
  const [videoMetrics, setVideoMetrics] = useState<any>(null);
  const [transcriptAnalysis, setTranscriptAnalysis] = useState<AnalysisData | null>(null);
  const [transcript, setTranscript] = useState("");
  
  // --- Speech & Audio Refs ---
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  // ------------------------------------------------------------------
  // 🎤 SPEECH RECOGNITION SETUP
  // ------------------------------------------------------------------
  useEffect(() => {
    if (typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event: any) => {
        let interimTranscript = "";
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptText = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcriptText + " ";
          } else {
            interimTranscript += transcriptText;
          }
        }
        
        if (finalTranscript) {
           setTranscript((prev) => prev + finalTranscript);
        }
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return alert("Browser does not support speech recognition.");
    
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  // ------------------------------------------------------------------
  // 🔊 TEXT-TO-SPEECH
  // ------------------------------------------------------------------
  useEffect(() => {
    if (status === 'active' && currentQuestion.text && ttsEnabled) {
      const textToSpeak = interviewStage === 'main' ? currentQuestion.text : currentQuestion.follow_up;
      if (!textToSpeak) return;

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  }, [currentQuestion, interviewStage, status, ttsEnabled]);


  // ------------------------------------------------------------------
  // 🚀 API ACTIONS
  // ------------------------------------------------------------------

  const startSession = async () => {
    if (!config.role) return alert("Please enter a target role.");
    setLoading(true);

    try {
      const token = localStorage.getItem("token") || "demo-token";
      const res = await fetch(`${API_URL}/interview/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ role: config.role, level: config.level }),
      });

      const data = await res.json();

      if (data.success && data.question) {
        setConfig(prev => ({ ...prev, sessionId: data.sessionId }));
        setCurrentQuestion({
          id: data.question._id || "1",
          text: data.question.text,
          follow_up: data.question.follow_up,
        });
        setQuestionCount(1);
        setStatus('active');
      } else {
        throw new Error(data.message || "Failed to start.");
      }
    } catch (err) {
      console.error(err);
      alert("Could not connect to AI Engine. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async () => {
    if (!transcript.trim()) return;
    
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    setStatus('analyzing'); 

    try {
      const token = localStorage.getItem("token") || "demo-token";
      const res = await fetch(`${API_URL}/interview/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ 
          transcript: transcript,
          question: currentQuestion.text 
        }),
      });

      const data = await res.json();
      if (data.success) {
        setTranscriptAnalysis(data.data.analysis);
        setTimeout(() => {
            handleStageTransition();
        }, 5000);
      }
    } catch (err) {
      console.error(err);
      setStatus('active'); 
    }
  };

  const handleStageTransition = () => {
      if (interviewStage === 'main' && currentQuestion.follow_up) {
          setInterviewStage('followup');
          setTranscript("");
          setTranscriptAnalysis(null);
          setStatus('active');
      } else {
          fetchNextQuestion();
      }
  };

  const fetchNextQuestion = async () => {
    if (questionCount >= MAX_QUESTIONS) {
        setStatus('completed');
        setTimeout(() => router.push(`/performance?session=${config.sessionId}`), 3000);
        return;
    }

    setLoading(true);
    setTranscript("");
    setTranscriptAnalysis(null);
    
    try {
        const token = localStorage.getItem("token") || "demo-token";
        const res = await fetch(`${API_URL}/interview/next-question`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({ sessionId: config.sessionId, role: config.role, level: config.level }),
        });
        const data = await res.json();
        
        if (data.success) {
            setCurrentQuestion({
                id: data.question._id,
                text: data.question.text,
                follow_up: data.question.follow_up
            });
            setQuestionCount(prev => prev + 1);
            setInterviewStage('main');
            setStatus('active');
        }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen flex font-sans">
      
      {/* Responsive Main Container:
        - Mobile: Full width (no margin)
        - Tablet: Small left margin for condensed sidebar
        - Desktop: Standard margin for expanded sidebar
      */}
      <main className="flex-1 p-3 md:p-6 lg:ml-[240px] md:ml-[72px] transition-all duration-300 flex flex-col h-screen overflow-hidden">
        <div className="max-w-[1920px] w-full mx-auto flex flex-col gap-4 h-full relative">
          
          {/* Header Bar */}
          <header className="flex flex-col md:flex-row justify-between items-center bg-white px-4 py-3 md:px-6 md:py-4 rounded-xl border border-gray-200 shadow-sm shrink-0 gap-4 md:gap-0">
            <div className="flex items-center justify-between w-full md:w-auto">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-600 rounded-lg text-white shadow-lg shadow-indigo-200">
                        <BarChart3 size={20} />
                    </div>
                    <div>
                        <h1 className="text-lg md:text-xl font-bold tracking-tight text-gray-900">AI Interview</h1>
                        <p className="text-gray-400 text-xs font-medium hidden sm:block">Session • {config.role}</p>
                    </div>
                </div>
                
                {/* Mobile Toggle for Analysis Panel */}
                <button 
                    onClick={() => setShowAnalysisMobile(!showAnalysisMobile)}
                    className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                >
                    {showAnalysisMobile ? <X size={20} /> : <BarChart3 size={20} />}
                </button>
            </div>
            
            {status !== 'setup' && status !== 'completed' && (
              <div className="flex items-center gap-3 md:gap-6 w-full md:w-auto justify-between md:justify-end">
                 {/* TTS Toggle */}
                <button 
                  onClick={() => setTtsEnabled(!ttsEnabled)}
                  className="text-gray-400 hover:text-indigo-600 transition-colors p-2"
                  title="Toggle AI Voice"
                >
                  {ttsEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
                </button>

                {/* Progress Indicators */}
                <div className="flex items-center gap-2 md:gap-3 px-3 py-1.5 md:px-4 md:py-2 bg-gray-50 rounded-full border border-gray-200">
                   <div className="flex gap-1">
                      {Array.from({ length: MAX_QUESTIONS }).map((_, i) => (
                        <div key={i} className={`h-1.5 w-4 md:h-2 md:w-8 rounded-full transition-all ${i < questionCount ? 'bg-indigo-600' : 'bg-gray-200'}`} />
                      ))}
                   </div>
                   <span className="text-xs md:text-sm font-bold text-gray-600 ml-1 md:ml-2">{questionCount}/{MAX_QUESTIONS}</span>
                </div>

                <button onClick={() => setStatus('completed')} className="text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors">
                   End
                </button>
              </div>
            )}
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 h-full overflow-hidden pb-2 relative">
            
            {/* LEFT: Interaction Area (Video + Chat) */}
            <div className={`lg:col-span-8 xl:col-span-9 flex flex-col gap-4 h-full overflow-y-auto pr-1 custom-scrollbar ${showAnalysisMobile ? 'hidden' : 'flex'}`}>
                
                {/* 1. Video Feed */}
                <div className="relative w-full aspect-video md:aspect-[16/9] lg:aspect-[21/9] bg-black rounded-xl md:rounded-2xl overflow-hidden border border-gray-800 shadow-xl shrink-0">
                    <VideoFeed isStreaming={status !== 'completed'} onMetrics={setVideoMetrics} />
                    
                    {/* Setup Overlay */}
                    {status === 'setup' && (
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-20 p-4">
                            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl max-w-md w-full space-y-6 animate-in fade-in zoom-in duration-300">
                                <div className="text-center">
                                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">Configure Session</h2>
                                    <p className="text-gray-500 text-sm mt-1">Select your target role to begin.</p>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase">Role</label>
                                        <input 
                                            className="w-full p-3 border border-gray-200 rounded-lg mt-1 focus:ring-2 focus:ring-indigo-500 outline-none text-sm" 
                                            value={config.role} 
                                            onChange={e => setConfig({ ...config, role: e.target.value })} 
                                        />
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        {['Junior', 'Mid-Level', 'Senior'].map((lvl) => (
                                            <button
                                                key={lvl}
                                                onClick={() => setConfig({ ...config, level: lvl })}
                                                className={`py-2 rounded-lg text-[10px] md:text-xs font-bold border transition-all ${config.level === lvl ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                                            >
                                                {lvl}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <button onClick={startSession} disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95">
                                    {loading ? <Loader2 className="animate-spin" size={18} /> : "Start Interview"}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* 2. Question & Answer Area */}
                {(status === 'active' || status === 'analyzing') && (
                    <div className="flex flex-col gap-4 animate-in slide-in-from-bottom-4 duration-500 pb-20 md:pb-10">
                        <QuestionDisplay 
                            question={interviewStage === 'main' ? currentQuestion.text : (currentQuestion.follow_up || "Follow up question...")} 
                            loading={loading}
                            stage={interviewStage}
                        />
                        
                        <div className="bg-white p-1 rounded-xl border border-gray-200 shadow-sm transition-shadow hover:shadow-md relative group focus-within:ring-2 focus-within:ring-indigo-100">
                            <textarea 
                                className="w-full p-4 bg-transparent resize-none min-h-[100px] md:min-h-[120px] outline-none text-gray-700 text-base md:text-lg leading-relaxed placeholder:text-gray-300" 
                                placeholder="Type your answer or use the microphone..."
                                value={transcript}
                                onChange={e => setTranscript(e.target.value)}
                            />
                            
                            <div className="flex flex-col sm:flex-row justify-between items-center px-4 pb-4 mt-2 border-t border-gray-100 pt-3 gap-3">
                                <div className="flex items-center gap-2 w-full sm:w-auto">
                                    <span className={`h-2 w-2 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-gray-300'}`}></span>
                                    <span className="text-xs font-medium text-gray-500">{isListening ? 'Listening...' : 'Microphone Ready'}</span>
                                </div>

                                <div className="flex gap-2 w-full sm:w-auto justify-end">
                                    <button 
                                        onClick={toggleListening} 
                                        className={`p-3 rounded-full transition-all ${isListening ? 'bg-red-50 text-red-600 hover:bg-red-100 ring-2 ring-red-100' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                        title="Toggle Microphone"
                                    >
                                        {isListening ? <MicOff size={20}/> : <Mic size={20}/>}
                                    </button>
                                    
                                    <button 
                                        onClick={submitAnswer} 
                                        disabled={status === 'analyzing' || !transcript} 
                                        className="flex-1 sm:flex-none px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-indigo-200 flex items-center justify-center gap-2 font-medium"
                                    >
                                        {status === 'analyzing' ? (
                                            <><Loader2 className="animate-spin" size={18}/> Analyzing...</>
                                        ) : (
                                            <><Send size={18}/> Submit</>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* RIGHT: Live Analysis Sidebar (Hidden on mobile unless toggled) */}
            <div className={`lg:col-span-4 xl:col-span-3 h-full overflow-hidden flex flex-col absolute lg:relative inset-0 bg-gray-50 lg:bg-transparent z-10 lg:z-0 lg:flex ${showAnalysisMobile ? 'flex' : 'hidden'}`}>
                <div className="flex lg:hidden justify-between items-center p-4 border-b border-gray-200">
                    <h3 className="font-bold text-gray-900">Live Analysis</h3>
                    <button onClick={() => setShowAnalysisMobile(false)}>
                        <X className="text-gray-500" />
                    </button>
                </div>
                <LiveFeedback 
                    metrics={videoMetrics} 
                    latestTranscriptAnalysis={transcriptAnalysis} 
                />
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}