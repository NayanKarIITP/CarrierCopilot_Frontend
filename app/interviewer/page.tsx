"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import VideoFeed from "@/components/interviewer/video-feed";
import QuestionDisplay from "@/components/interviewer/question-display";
import LiveFeedback from "@/components/interviewer/live-feedback";
import {
  Hourglass, Mic, MicOff, Send,
  BarChart3, Volume2, VolumeX, Video, Activity, X,
  Settings2, Play, Sparkles, User, Briefcase
} from "lucide-react";

// Types & Interfaces
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

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const MAX_QUESTIONS = 3;

export default function InterviewerPage() {
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

  const [config, setConfig] = useState({
    sessionId: null as string | null,
    role: "Software Engineer",
    level: "Mid-Level"
  });

  const [status, setStatus] = useState<'setup' | 'active' | 'analyzing' | 'completed'>('setup');
  const [questionCount, setQuestionCount] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question>({ id: "0", text: "", follow_up: "" });
  const [interviewStage, setInterviewStage] = useState<'main' | 'followup'>('main');
  const [loading, setLoading] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [mobileTab, setMobileTab] = useState<'interview' | 'analysis'>('interview');

  const [videoMetrics, setVideoMetrics] = useState<any>(null);
  const [transcriptAnalysis, setTranscriptAnalysis] = useState<AnalysisData | null>(null);
  const [transcript, setTranscript] = useState("");

  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  // SPEECH & AUDIO LOGIC 
  useEffect(() => {
    if (typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event: any) => {
        let finalTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) finalTranscript += event.results[i][0].transcript + " ";
        }
        if (finalTranscript) setTranscript((prev) => prev + finalTranscript);
      };

      recognition.onerror = (event: any) => {
        console.error("Speech error", event.error);
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

  useEffect(() => {
    if (status === 'active' && currentQuestion.text && ttsEnabled) {
      const textToSpeak = interviewStage === 'main' ? currentQuestion.text : currentQuestion.follow_up;
      if (!textToSpeak) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      window.speechSynthesis.speak(utterance);
    }
  }, [currentQuestion, interviewStage, status, ttsEnabled]);

  // API ACTIONS
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
        setCurrentQuestion({ id: data.question._id || "1", text: data.question.text, follow_up: data.question.follow_up });
        setQuestionCount(1);
        setStatus('active');
      } else {
        throw new Error(data.message || "Failed to start.");
      }
    } catch (err) {
      console.error(err);
      alert("Could not connect to AI Engine.");
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async () => {
    if (!transcript.trim()) return;
    if (isListening) { recognitionRef.current.stop(); setIsListening(false); }
    setStatus('analyzing');
    try {
      const token = localStorage.getItem("token") || "demo-token";
      const res = await fetch(`${API_URL}/interview/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ transcript, question: currentQuestion.text, sessionId: config.sessionId }),
      });
      const data = await res.json();
      if (data.success) {
        setTranscriptAnalysis(data.data.analysis);
        setTimeout(() => handleStageTransition(), 5000);
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
        setCurrentQuestion({ id: data.question._id, text: data.question.text, follow_up: data.question.follow_up });
        setQuestionCount(prev => prev + 1);
        setInterviewStage('main');
        setStatus('active');
      }
    } catch (err) { console.error(err); } 
    finally { setLoading(false); }
  };

  const handleEndSession = async () => {
    if (recognitionRef.current) { try { recognitionRef.current.stop(); setIsListening(false); } catch (e) {} }
    setStatus('completed');
    if (config.sessionId) {
      try {
        const token = localStorage.getItem("token");
        await fetch(`${API_URL}/interview/end`, { 
          method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ sessionId: config.sessionId, fullTranscript: transcript }),
        });
      } catch (error) {}
      router.push(`/performance?session=${config.sessionId}`);
    } else {
      router.push('/');
    }
  };
  
  return (
    <div className="bg-gray-50 dark:bg-background text-gray-900 dark:text-foreground min-h-screen flex flex-col font-sans overflow-hidden transition-colors">

      {/* HEADER */}
      <header className="bg-white dark:bg-card px-4 py-3 border-b border-gray-200 dark:border-border flex justify-between items-center z-30 shadow-sm shrink-0 h-16">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-lg text-white shadow-indigo-200 dark:shadow-none shadow-lg">
            <BarChart3 size={20} />
          </div>
          <div>
            <h1 className="text-base font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight">AI Interview</h1>
            <div className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${status === 'active' ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`} />
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium truncate max-w-[120px]">{status === 'setup' ? 'Lobby' : config.role}</p>
            </div>
          </div>
        </div>

        {status !== 'setup' && status !== 'completed' && (
          <div className="flex items-center gap-2 sm:gap-4">
            <button onClick={() => setTtsEnabled(!ttsEnabled)} className={`p-2 rounded-full transition-colors ${ttsEnabled ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'bg-gray-100 dark:bg-muted text-gray-400 dark:text-gray-500'}`}>
              {ttsEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
            <div className="hidden sm:flex items-center gap-1 text-xs font-bold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-muted px-3 py-1.5 rounded-full border border-gray-200 dark:border-border">
              <span>Q</span><span className="text-indigo-600 dark:text-indigo-400">{questionCount}</span><span className="text-gray-400">/</span><span>{MAX_QUESTIONS}</span>
            </div>
            <button onClick={handleEndSession} className="text-red-500 dark:text-red-400 text-xs font-bold uppercase hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-1.5 rounded-lg transition-colors">End</button>
          </div>
        )}
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 relative overflow-hidden flex flex-col lg:flex-row h-[calc(100vh-64px)] lg:h-auto">

        {/* LEFT PANEL: Video & Setup/Interaction */}
        {/* UPDATE: Improved Flex layout for Desktop Lobby */}
        <div className={`flex-1 flex flex-col h-full overflow-y-auto p-4 md:p-6 transition-all duration-300 ${mobileTab === 'interview' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full absolute inset-0 -z-10 lg:opacity-100 lg:static lg:translate-x-0 lg:z-auto'}`}>
          
          <div className={`w-full flex flex-col ${status === 'setup' ? 'lg:flex-row lg:items-center lg:justify-center lg:h-full lg:gap-12 lg:max-w-7xl lg:mx-auto' : 'gap-6'}`}>
            
            {/* 1. Video Feed Container */}
            <div className={`relative bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800 shrink-0 group transition-all duration-500 ${status === 'setup' ? 'w-full aspect-video lg:flex-[1.5] lg:aspect-[16/9] lg:h-auto' : 'w-full aspect-video md:aspect-[16/9] lg:min-h-[400px]'}`}>
              <VideoFeed isStreaming={status !== 'completed'} onMetrics={setVideoMetrics} />
              
              <div className="absolute top-4 right-4 z-20 flex gap-2">
                {isListening && (
                  <div className="bg-red-500/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 animate-pulse"><Mic size={10} /> REC</div>
                )}
                <div className="bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full border border-white/10">
                  {status === 'active' ? 'LIVE' : status === 'setup' ? 'PREVIEW' : status.toUpperCase()}
                </div>
              </div>
            </div>

            {/* 2. SESSION SETUP - Desktop: Side Panel, Mobile: Below Video */}
            {status === 'setup' && (
              <div className="w-full lg:flex-1 max-w-lg mx-auto bg-white dark:bg-card rounded-2xl shadow-lg border border-gray-200 dark:border-border p-6 md:p-8 animate-in slide-in-from-bottom-4 duration-500">
                  <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="bg-indigo-100 dark:bg-indigo-900/30 w-10 h-10 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                          <Settings2 size={20} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Session Setup</h2>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Ready to practice? Configure your AI interviewer.</p>
                  </div>

                  <div className="space-y-5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                          <Briefcase size={14} /> Target Role
                        </label>
                        <input
                            className="w-full p-3.5 bg-gray-50 dark:bg-muted/20 border border-gray-200 dark:border-border rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-400"
                            value={config.role}
                            onChange={e => setConfig({ ...config, role: e.target.value })}
                            placeholder="e.g. Senior React Developer"
                        />
                      </div>
                      
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                          <User size={14} /> Experience Level
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {['Junior', 'Mid-Level', 'Senior'].map((lvl) => (
                            <button
                                key={lvl}
                                onClick={() => setConfig({ ...config, level: lvl })}
                                className={`py-3 rounded-xl text-xs font-bold border transition-all ${config.level === lvl ? 'bg-indigo-600 text-white border-indigo-600 shadow-md ring-2 ring-indigo-200 dark:ring-indigo-900' : 'bg-white dark:bg-muted/10 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-border hover:bg-gray-50 dark:hover:bg-muted/20'}`}
                            >
                                {lvl}
                            </button>
                            ))}
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          onClick={startSession}
                          disabled={loading}
                          className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white py-4 rounded-xl font-bold text-sm flex justify-center items-center gap-2 shadow-lg shadow-indigo-200 dark:shadow-none transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {loading ? <Hourglass className="animate-spin" size={18} /> : <Play size={18} fill="currentColor" />}
                          Start Interview Session
                        </button>
                        <p className="text-xs text-center text-gray-400 mt-3">Microphone access required.</p>
                      </div>
                  </div>
              </div>
            )}

            {/* 3. Question & Answer Area (Hidden in Setup) */}
            {(status === 'active' || status === 'analyzing') && (
              <div className="flex flex-col gap-4 pb-20 lg:pb-0 h-full w-full">
                <div className="shrink-0">
                  <QuestionDisplay
                    question={interviewStage === 'main' ? currentQuestion.text : (currentQuestion.follow_up || "Follow up question...")}
                    loading={loading}
                    stage={interviewStage}
                  />
                </div>

                <div className="flex-1 bg-white dark:bg-card p-2 rounded-2xl border border-gray-200 dark:border-border shadow-sm flex flex-col relative group focus-within:ring-2 focus-within:ring-indigo-100 dark:focus-within:ring-indigo-900/30 transition-all">
                  <textarea
                    className="w-full p-4 bg-transparent resize-none flex-1 text-base outline-none text-gray-700 dark:text-gray-200 placeholder:text-gray-300 dark:placeholder:text-gray-600 font-medium"
                    placeholder={isListening ? "Listening..." : "Type your answer or speak..."}
                    value={transcript}
                    onChange={e => setTranscript(e.target.value)}
                  />
                  <div className="flex justify-between items-center px-2 pb-2 mt-2">
                    <div className="flex items-center gap-2">
                      <button onClick={toggleListening} className={`p-3 rounded-full transition-all duration-300 ${isListening ? 'bg-red-50 dark:bg-red-900/20 text-red-500 ring-2 ring-red-100 dark:ring-red-900 animate-pulse' : 'bg-gray-100 dark:bg-muted text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-muted/80'}`}>
                        {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                      </button>
                      {isListening && <span className="text-xs font-bold text-red-500 animate-pulse hidden sm:block">Listening...</span>}
                    </div>
                    <button onClick={submitAnswer} disabled={status === 'analyzing' || !transcript} className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed text-sm font-bold flex items-center gap-2 shadow-md shadow-indigo-200 dark:shadow-none transition-all active:scale-95">
                      {status === 'analyzing' ? <Hourglass className="animate-spin" size={18} /> : <Send size={18} />}
                      <span className="hidden sm:inline">Submit Answer</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL: Analysis Sidebar (Hidden during setup for Lobby feel) */}
        {status !== 'setup' && (
          <div className={`lg:w-[380px] xl:w-[420px] border-l border-gray-200 dark:border-border bg-white dark:bg-card h-full overflow-y-auto transition-all duration-300 shadow-xl lg:shadow-none z-20 ${mobileTab === 'analysis' ? 'opacity-100 translate-x-0 absolute inset-0' : 'opacity-0 translate-x-full absolute inset-0 -z-10 lg:opacity-100 lg:static lg:translate-x-0 lg:z-auto'}`}>
            <div className="p-6 h-full flex flex-col">
              <div className="flex lg:hidden justify-between items-center mb-6 pb-4 border-b border-gray-100 dark:border-border">
                <div className="flex items-center gap-2">
                  <Activity className="text-indigo-600 dark:text-indigo-400" size={20} />
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg">Real-time Analysis</h3>
                </div>
                <button onClick={() => setMobileTab('interview')} className="p-2 bg-gray-50 dark:bg-muted rounded-full transition-colors">
                  <X size={20} className="text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              <div className="flex-1">
                <div className="mb-6 hidden lg:block">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="text-amber-400 fill-amber-400" size={18} />
                    AI Feedback
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Live metrics from your camera & audio.</p>
                </div>
                <LiveFeedback metrics={videoMetrics} latestTranscriptAnalysis={transcriptAnalysis} />
              </div>
            </div>
          </div>
        )}

      </main>

      {/* MOBILE BOTTOM TAB BAR */}
      {status !== 'setup' && (
        <div className="lg:hidden bg-white dark:bg-card border-t border-gray-200 dark:border-border flex justify-around py-3 px-4 shrink-0 z-40 pb-safe">
          <button onClick={() => setMobileTab('interview')} className={`flex flex-col items-center gap-1.5 p-2 rounded-xl w-full transition-all duration-300 ${mobileTab === 'interview' ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20' : 'text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-muted/10'}`}>
            <Video size={22} strokeWidth={mobileTab === 'interview' ? 2.5 : 2} />
            <span className="text-[10px] font-extrabold uppercase tracking-wide">Interview</span>
          </button>
          <div className="w-px bg-gray-200 dark:bg-border h-8 self-center mx-2" />
          <button onClick={() => setMobileTab('analysis')} className={`flex flex-col items-center gap-1.5 p-2 rounded-xl w-full transition-all duration-300 ${mobileTab === 'analysis' ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20' : 'text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-muted/10'}`}>
            <Activity size={22} strokeWidth={mobileTab === 'analysis' ? 2.5 : 2} />
            <span className="text-[10px] font-extrabold uppercase tracking-wide">Signals</span>
          </button>
        </div>
      )}

    </div>
  );
}
