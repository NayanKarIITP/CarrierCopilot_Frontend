


"use client";

import { useState, useRef } from "react";
import VideoFeed from "./video-feed";
import LiveFeedback from "./live-feedback";
import QuestionDisplay from "./question-display";
import SpeechInput from "./speech-input";
import { Hourglass, PlayCircle, ShieldCheck } from "lucide-react";

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
                            {loading ? <Hourglass className="animate-spin" /> : <PlayCircle />}
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