

"use client";

import { LineChart, Line, YAxis, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import { Activity, Eye, Zap, Smile, TrendingUp } from "lucide-react";

interface LiveFeedbackProps {
  metrics?: any;
  latestTranscriptAnalysis?: any;
}

export default function LiveFeedback({ metrics, latestTranscriptAnalysis }: LiveFeedbackProps) {
  const [dataHistory, setDataHistory] = useState<any[]>([]);

  useEffect(() => {
    const score = metrics?.confidence_score ?? metrics?.visual_confidence;

    if (score !== undefined && score !== null) {
      setDataHistory(prev => {
        const newData = [...prev, { time: '', val: score }];
        // Keep last 30 points for a smoother line
        return newData.slice(-30); 
      });
    }
  }, [metrics]);

  const emotion = metrics?.emotion || "Neutral";
  // 🛠️ FIX 3: Map the correct key here too
  const confidence = metrics?.confidence_score ?? metrics?.visual_confidence ?? 0;
  const eyeContact = metrics?.eye_contact || 0;
  
  const getEmotionColor = (e: string) => {
      switch(e?.toLowerCase()) { // Safe check for e
          case 'happy': return 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20';
          case 'stressed': return 'text-red-500 bg-red-50 dark:bg-red-900/20';
          case 'focused': return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20'; // Added Focused
          case 'concentrated': return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20';
          case 'surprised': return 'text-amber-500 bg-amber-50 dark:bg-amber-900/20';
          default: return 'text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-muted';
      }
  };

  return (
    <div className="space-y-6">
        
        {/* 1. Main Emotion Card */}
        <div className="bg-white dark:bg-card p-6 rounded-2xl border border-gray-200 dark:border-border shadow-sm transition-all">
            <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-xl ${getEmotionColor(emotion)}`}>
                    <Smile size={24} />
                </div>
                <div>
                    <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Detected Emotion</h3>
                    <p className="text-xl font-bold text-gray-900 dark:text-white capitalize">{emotion}</p>
                </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
                <MiniStat label="Pitch" val={metrics?.angles?.pitch || 0} unit="°" />
                <MiniStat label="Yaw" val={metrics?.angles?.yaw || 0} unit="°" />
                <MiniStat label="Roll" val={metrics?.angles?.roll || 0} unit="°" />
            </div>
        </div>

        {/* 2. Key Metrics Bars */}
        <div className="bg-white dark:bg-card p-6 rounded-2xl border border-gray-200 dark:border-border shadow-sm space-y-6">
            <h3 className="flex items-center gap-2 text-sm font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wide">
                <Zap size={16} className="text-amber-500"/> Real-time Signals
            </h3>
            
            <ProgressBar label="Visual Confidence" value={confidence} color="bg-blue-500" icon={<Zap size={14}/>} />
            <ProgressBar label="Eye Contact" value={eyeContact} color="bg-green-500" icon={<Eye size={14}/>} />
            
            {latestTranscriptAnalysis && (
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 animate-in fade-in">
                      <ProgressBar 
                        label="Answer Relevance" 
                        value={latestTranscriptAnalysis.relevance_score || 0} 
                        color="bg-purple-500" 
                        icon={<Activity size={14}/>} 
                    />
                </div>
            )}
        </div>

        {/* 3. Real-time Graph */}
        <div className="bg-white dark:bg-card p-6 rounded-2xl border border-gray-200 dark:border-border shadow-sm h-56 flex flex-col">
            <h3 className="flex items-center gap-2 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-4">
                 <TrendingUp size={14} /> Confidence Trend
            </h3>
            <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={dataHistory}>
                        <Line 
                            type="monotone" 
                            dataKey="val" 
                            stroke="#3b82f6" 
                            strokeWidth={3} 
                            dot={false}
                            isAnimationActive={false}
                        />
                        <YAxis hide domain={[0, 100]} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    </div>
  );
}

// Helpers
const MiniStat = ({ label, val, unit }: any) => (
    <div className="bg-gray-50 dark:bg-muted rounded-xl p-3 text-center border border-gray-100 dark:border-border">
        <div className="text-lg font-bold text-gray-700 dark:text-gray-200">{Math.round(val)}{unit}</div>
        <div className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 mt-1">{label}</div>
    </div>
);

const ProgressBar = ({ label, value, color, icon }: any) => (
    <div>
        <div className="flex justify-between items-center text-xs mb-2">
            <span className="flex items-center gap-2 font-medium text-gray-600 dark:text-gray-400">
                {icon} {label}
            </span>
            <span className="font-bold text-gray-900 dark:text-white">{value}%</span>
        </div>
        <div className="w-full bg-gray-100 dark:bg-muted rounded-full h-2.5 overflow-hidden">
            <div 
                className={`h-full transition-all duration-500 ease-out ${color}`} 
                style={{ width: `${Math.min(value, 100)}%` }} 
            />
        </div>
    </div>
);