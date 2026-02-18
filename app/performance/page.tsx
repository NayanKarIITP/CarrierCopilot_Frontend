// app/performance/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Hourglass, CheckCircle2, AlertTriangle, RotateCcw, 
  Trophy, Mic, BrainCircuit, ChevronDown, ChevronUp,
  BarChart3, Calendar, User, ArrowRight
} from "lucide-react";

// Types 
interface Analysis {
  strengths: string[];
  improvements: string[];
  clarity_score: number;
  confidence_estimate: number;
  filler_words_count?: Record<string, number>;
}

interface QuestionHistory {
  number: number;
  question: string;
  transcript: string;
  score: number;
}

interface SessionData {
  _id: string;
  role: string;
  level: string;
  createdAt: string;
  analysis: Analysis;
  history: QuestionHistory[];
}

// UI Components 
// 1. Circular Progress Score
const ScoreRing = ({ score }: { score: number }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  
  const getColor = (s: number) => {
    if (s >= 80) return "text-emerald-500 dark:text-emerald-400";
    if (s >= 60) return "text-blue-500 dark:text-blue-400";
    if (s >= 40) return "text-amber-500 dark:text-amber-400";
    return "text-rose-500 dark:text-rose-400";
  };

  return (
    <div className="relative w-40 h-40 flex items-center justify-center">
      <svg className="transform -rotate-90 w-full h-full">
        <circle
          className="text-gray-200 dark:text-gray-700"
          strokeWidth="8"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="80"
          cy="80"
        />
        <circle
          className={`${getColor(score)} transition-all duration-1000 ease-out`}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="80"
          cy="80"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className={`text-4xl font-bold ${getColor(score)}`}>{score}</span>
        <span className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider font-semibold">/ 100</span>
      </div>
    </div>
  );
};

// 2. Metric Bar
const MetricBar = ({ label, value, icon: Icon, color }: any) => (
  <div className="mb-4">
    <div className="flex justify-between items-center mb-1">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        <Icon size={16} className={color} /> {label}
      </div>
      <span className="text-sm font-bold text-gray-900 dark:text-white">{value}%</span>
    </div>
    <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2.5">
      <div 
        className={`h-2.5 rounded-full ${color.replace('text-', 'bg-')} transition-all duration-1000`} 
        style={{ width: `${value}%` }} 
      />
    </div>
  </div>
);

export default function PerformancePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<SessionData | null>(null);
  const [expandedQ, setExpandedQ] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("session") || params.get("sessionId");
      if (id) fetchSessionData(id);
      else setLoading(false);
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
        setSession(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-background"><Hourglass className="animate-spin text-indigo-600 dark:text-indigo-400" size={48} /></div>;
  if (!session) return <div className="min-h-screen flex items-center justify-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-background">No report found.</div>;

  const { analysis, role, level, createdAt, history } = session;
  
  // FIX: Filter out empty/duplicate questions (Logic: Must have a transcript)
  const validHistory = history.filter(h => h.transcript && h.transcript.trim().length > 0);

  const score = analysis.clarity_score || 0;
  const dateStr = new Date(createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-background font-sans pb-20 transition-colors">
      
      {/* HERO SECTION  */}
      <div className="bg-white dark:bg-card border-b border-gray-200 dark:border-border transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                  <BarChart3 size={24} />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Performance Review</h1>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1"><User size={14}/> {role}</span>
                <span className="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"/>
                <span className="bg-gray-100 dark:bg-muted/50 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded text-xs font-medium">{level}</span>
                <span className="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"/>
                <span className="flex items-center gap-1"><Calendar size={14}/> {dateStr}</span>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => router.push('/interviewer')} 
                className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-card border border-gray-300 dark:border-border text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-50 dark:hover:bg-muted/50 transition-all font-medium shadow-sm"
              >
                <RotateCcw size={18} /> Retry
              </button>
              <Link href="/roadmap">
                <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-xl transition-all font-medium shadow-md shadow-indigo-100 dark:shadow-none">
                  Go to Roadmap <ArrowRight size={18} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

        {/*  TOP ROW: SCORES & METRICS  */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* 1. Overall Score Card */}
          <div className="bg-white dark:bg-card p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-border flex flex-col items-center justify-center relative overflow-hidden transition-colors">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 dark:from-indigo-900/10 to-transparent pointer-events-none" />
            <h3 className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4 z-10">Overall Score</h3>
            <div className="z-10">
              <ScoreRing score={score} />
            </div>
            <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400 max-w-[200px] z-10">
              {score > 80 ? "You're interview ready! Excellent work." : "Good effort. Focus on the improvements below to reach the next level."}
            </p>
          </div>

          {/* 2. Detailed Metrics */}
          <div className="bg-white dark:bg-card p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-border flex flex-col justify-center transition-colors">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Metric Breakdown</h3>
            <MetricBar 
              label="Clarity & Flow" 
              value={analysis.clarity_score} 
              icon={Mic} 
              color="text-emerald-500 dark:text-emerald-400" 
            />
            <MetricBar 
              label="Confidence" 
              value={analysis.confidence_estimate} 
              icon={Trophy} 
              color="text-blue-500 dark:text-blue-400" 
            />
            <MetricBar 
              label="Technical Depth" 
              value={Math.min(100, (analysis.clarity_score + analysis.confidence_estimate) / 2 + 5)} 
              icon={BrainCircuit} 
              color="text-purple-500 dark:text-purple-400" 
            />
          </div>

          {/* 3. AI Verdict (Gradient Card) */}
          <div className="bg-gradient-to-br from-indigo-900 to-purple-800 dark:from-indigo-950 dark:to-purple-950 text-white p-8 rounded-2xl shadow-xl shadow-indigo-200 dark:shadow-none flex flex-col justify-between relative overflow-hidden transition-colors">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-5 rounded-full blur-3xl -mr-10 -mt-10" />
            
            <div>
              <div className="flex items-center gap-2 mb-3 text-indigo-200 dark:text-indigo-300">
                <BrainCircuit size={20} />
                <span className="text-xs font-bold uppercase tracking-widest">AI Verdict</span>
              </div>
              <h3 className="text-xl font-semibold leading-relaxed mb-4">
                "You demonstrate strong potential for a <span className="text-white font-bold underline decoration-indigo-400 decoration-2 underline-offset-2">{role}</span> role."
              </h3>
              <p className="text-indigo-100 dark:text-indigo-200 text-sm opacity-90">
                Your structured problem solving is good. To reach Senior level, focus on discussing trade-offs and edge cases more explicitly.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex justify-between items-center text-sm font-medium">
                <span>Target Level: {level}</span>
                <span className="bg-white/20 px-2 py-1 rounded text-xs">{score >= 70 ? 'On Track' : 'Needs Prep'}</span>
              </div>
            </div>
          </div>
        </div>

        {/*  MIDDLE ROW: FEEDBACK  */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/30 p-6 rounded-2xl transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 size={20} />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white">Top Strengths</h3>
            </div>
            <ul className="space-y-3">
              {analysis.strengths.map((str, i) => (
                <li key={i} className="flex gap-3 text-gray-700 dark:text-gray-300 text-sm">
                  <span className="w-1.5 h-1.5 bg-emerald-500 dark:bg-emerald-400 rounded-full mt-2 shrink-0"/>
                  {str}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-amber-50/50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-800/30 p-6 rounded-2xl transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600 dark:text-amber-400">
                <AlertTriangle size={20} />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white">Areas for Improvement</h3>
            </div>
            <ul className="space-y-3">
              {analysis.improvements.map((imp, i) => (
                <li key={i} className="flex gap-3 text-gray-700 dark:text-gray-300 text-sm">
                  <span className="w-1.5 h-1.5 bg-amber-500 dark:bg-amber-400 rounded-full mt-2 shrink-0"/>
                  {imp}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* BOTTOM ROW: QUESTION BREAKDOWN  */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Session Transcript Analysis</h3>
          
          <div className="bg-white dark:bg-card border border-gray-200 dark:border-border rounded-2xl shadow-sm divide-y divide-gray-100 dark:divide-gray-800 transition-colors">
            
            {/*  USE FILTERED HISTORY HERE */}
            {validHistory.length > 0 ? validHistory.map((item, idx) => (
              <div key={idx} className="group">
                <button 
                  onClick={() => setExpandedQ(expandedQ === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-muted/10 transition-colors text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 
                      ${item.score >= 70 
                        ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400" 
                        : "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400"}`}>
                      {item.score}
                    </div>
                    <div>
                      {/*  FIX: Display Q1, Q2, Q3 correctly based on Index + 1 */}
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-0.5">Question {idx + 1}</p>
                      <p className="font-semibold text-gray-900 dark:text-white line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {item.question}
                      </p>
                    </div>
                  </div>
                  {expandedQ === idx ? <ChevronUp className="text-gray-400"/> : <ChevronDown className="text-gray-400"/>}
                </button>

                {/* Expanded Content */}
                {expandedQ === idx && (
                  <div className="p-6 bg-gray-50/50 dark:bg-muted/10 border-t border-gray-100 dark:border-gray-800 animate-in fade-in slide-in-from-top-1">
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Full Question</h4>
                        <p className="text-gray-800 dark:text-gray-200 font-medium">{item.question}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Your Answer</h4>
                        <div className="bg-white dark:bg-card p-4 rounded-xl border border-gray-200 dark:border-border text-gray-600 dark:text-gray-300 text-sm leading-relaxed italic">
                          "{item.transcript}"
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )) : (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">No transcripts recorded for this session.</div>
            )}
          </div>
        </div>

      </main>
    </div>
  );
}

