// "use client"

// import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// const fillerWordData = [
//   { word: "Um", count: 3 },
//   { word: "Uh", count: 1 },
//   { word: "Like", count: 5 },
//   { word: "You know", count: 2 },
// ]

// const confidenceData = [
//   { time: "0s", score: 65 },
//   { time: "10s", score: 72 },
//   { time: "20s", score: 78 },
//   { time: "30s", score: 82 },
//   { time: "40s", score: 75 },
// ]

// const getGaugeScore = (score: number) => {
//   if (score >= 80) return { color: "from-green-500 to-emerald-500", label: "Excellent" }
//   if (score >= 60) return { color: "from-yellow-500 to-amber-500", label: "Good" }
//   return { color: "from-red-500 to-orange-500", label: "Needs Work" }
// }

// export default function LiveFeedback() {
//   const confidence = 75
//   const eyeContact = 70
//   const clarity = 82

//   return (
//     <div className="space-y-4 h-full">
//       {/* Metric Gauges */}
//       <div className="glass rounded-2xl border border-border p-6 space-y-4">
//         <h3 className="text-lg font-semibold text-foreground">Live Metrics</h3>

//         <div>
//           <div className="flex justify-between items-center mb-2">
//             <p className="text-sm font-semibold text-foreground">Confidence</p>
//             <span className="text-2xl font-bold text-primary">{confidence}%</span>
//           </div>
//           <div className="w-full bg-card rounded-full h-2 overflow-hidden">
//             <div
//               className="bg-gradient-to-r from-primary to-accent h-full transition-all"
//               style={{ width: `${confidence}%` }}
//             />
//           </div>
//         </div>

//         <div>
//           <div className="flex justify-between items-center mb-2">
//             <p className="text-sm font-semibold text-foreground">Eye Contact</p>
//             <span className="text-2xl font-bold text-accent">{eyeContact}%</span>
//           </div>
//           <div className="w-full bg-card rounded-full h-2 overflow-hidden">
//             <div
//               className="bg-gradient-to-r from-accent to-primary h-full transition-all"
//               style={{ width: `${eyeContact}%` }}
//             />
//           </div>
//         </div>

//         <div>
//           <div className="flex justify-between items-center mb-2">
//             <p className="text-sm font-semibold text-foreground">Clarity</p>
//             <span className="text-2xl font-bold text-primary">{clarity}%</span>
//           </div>
//           <div className="w-full bg-card rounded-full h-2 overflow-hidden">
//             <div
//               className="bg-gradient-to-r from-primary to-accent h-full transition-all"
//               style={{ width: `${clarity}%` }}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Filler Words Chart */}
//       <div className="glass rounded-2xl border border-border p-4">
//         <h4 className="text-sm font-semibold text-foreground mb-3">Filler Words</h4>
//         <ResponsiveContainer width="100%" height={120}>
//           <BarChart data={fillerWordData}>
//             <CartesianGrid stroke="rgb(var(--color-border) / 0.3)" vertical={false} />
//             <XAxis dataKey="word" stroke="rgb(var(--color-muted-foreground))" height={30} />
//             <YAxis stroke="rgb(var(--color-muted-foreground))" width={30} />
//             <Tooltip
//               contentStyle={{
//                 backgroundColor: "rgb(var(--color-card))",
//                 border: "none",
//                 borderRadius: "8px",
//               }}
//             />
//             <Bar dataKey="count" fill="hsl(var(--color-accent))" radius={4} />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Confidence Trend */}
//       <div className="glass rounded-2xl border border-border p-4">
//         <h4 className="text-sm font-semibold text-foreground mb-3">Confidence Trend</h4>
//         <ResponsiveContainer width="100%" height={100}>
//           <LineChart data={confidenceData}>
//             <CartesianGrid stroke="rgb(var(--color-border) / 0.3)" vertical={false} />
//             <XAxis dataKey="time" stroke="rgb(var(--color-muted-foreground))" height={25} />
//             <YAxis stroke="rgb(var(--color-muted-foreground))" width={30} />
//             <Tooltip
//               contentStyle={{
//                 backgroundColor: "rgb(var(--color-card))",
//                 border: "none",
//                 borderRadius: "8px",
//               }}
//             />
//             <Line type="monotone" dataKey="score" stroke="hsl(var(--color-primary))" dot={false} strokeWidth={2} />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   )
// }








// "use client";

// import { useState, useEffect } from "react";
// import {
//   BarChart,
//   Bar,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// interface LiveFeedbackProps {
//   metrics?: any;
//   latestTranscriptAnalysis?: any;
// }

// export default function LiveFeedback({ metrics, latestTranscriptAnalysis }: LiveFeedbackProps) {
//   const [confidence, setConfidence] = useState(0);
//   const [eyeContact, setEyeContact] = useState(0);
//   const [emotion, setEmotion] = useState("neutral");
//   const [emotionStrength, setEmotionStrength] = useState(0);
//   const [rawEmotionData, setRawEmotionData] = useState<any[]>([]);
//   const [clarity, setClarity] = useState(0);
//   const [headPose, setHeadPose] = useState({ pitch: 0, yaw: 0, roll: 0 });

//   const [fillerWords, setFillerWords] = useState<any[]>([]);
//   const [confidenceTrend, setConfidenceTrend] = useState<any[]>([]);

//   // --------------------------
//   // ⚡ APPLY LIVE METRICS
//   // --------------------------
//   useEffect(() => {
//     if (!metrics) return;

//     setEyeContact(metrics.eye_contact || 0);
//     setConfidence(metrics.visual_confidence || 0);
//     setEmotion(metrics.emotion || "neutral");

//     // Head-pose
//     if (metrics.head_pose) {
//       setHeadPose(metrics.head_pose);
//     }

//     // Raw emotion probabilities
//     if (metrics.raw_emotions) {
//       const mapped = Object.keys(metrics.raw_emotions).map((key) => ({
//         emotion: key,
//         score: Number((metrics.raw_emotions[key] * 100).toFixed(2)),
//       }));
//       setRawEmotionData(mapped);

//       // Select current emotion strength
//       if (metrics.emotion) {
//         const val = metrics.raw_emotions[metrics.emotion] || 0;
//         setEmotionStrength((val * 100).toFixed(0));
//       }
//     }

//     // Confidence trend graph
//     setConfidenceTrend((prev) => [
//       ...prev.slice(-10),
//       { time: `${prev.length * 2}s`, score: metrics.visual_confidence || 0 },
//     ]);
//   }, [metrics]);


//   // --------------------------
//   // 🎤 SPEECH METRICS
//   // --------------------------
//   useEffect(() => {
//     if (!latestTranscriptAnalysis) return;

//     setClarity(latestTranscriptAnalysis.clarity_score || 0);

//     const fillers = latestTranscriptAnalysis.filler_words_count || {};
//     setFillerWords(
//       Object.keys(fillers).map((word) => ({
//         word,
//         count: fillers[word],
//       }))
//     );
//   }, [latestTranscriptAnalysis]);

//   return (
//     <div className="space-y-4 h-full">
      
//       {/* METRICS PANEL */}
//       <div className="glass rounded-2xl border border-border p-6 space-y-4">
//         <h3 className="text-lg font-semibold text-foreground">Live Metrics</h3>

//         <MetricBar label="Confidence" value={confidence} colorClass="from-primary to-accent" />
//         <MetricBar label="Eye Contact" value={eyeContact} colorClass="from-accent to-primary" />
//         <MetricBar label="Clarity" value={clarity} colorClass="from-primary to-accent" />

//         {/* Emotion */}
//         <div className="mt-4">
//           <p className="text-sm font-semibold text-foreground">Dominant Emotion</p>
//           <p className="text-xl font-bold capitalize">
//             {emotion} ({emotionStrength}%)
//           </p>
//         </div>

//         {/* Head Pose */}
//         <div className="mt-4">
//           <p className="text-sm font-semibold text-foreground mb-1">Head Pose</p>
//           <p className="text-sm text-muted-foreground">
//             Pitch: <b>{headPose.pitch.toFixed(2)}</b>° |  
//             Yaw: <b>{headPose.yaw.toFixed(2)}</b>° |  
//             Roll: <b>{headPose.roll.toFixed(2)}</b>°
//           </p>
//         </div>
//       </div>

//       {/* RAW EMOTION CHART */}
//       <ChartCard title="Emotion Probabilities">
//         <ResponsiveContainer width="100%" height={140}>
//           <BarChart data={rawEmotionData}>
//             <CartesianGrid stroke="rgb(var(--color-border)/0.3)" vertical={false} />
//             <XAxis dataKey="emotion" stroke="rgb(var(--color-muted-foreground))" />
//             <YAxis stroke="rgb(var(--color-muted-foreground))" />
//             <Tooltip contentStyle={{ backgroundColor: "rgb(var(--color-card))" }} />
//             <Bar dataKey="score" fill="hsl(var(--color-primary))" radius={4} />
//           </BarChart>
//         </ResponsiveContainer>
//       </ChartCard>

//       {/* FILLER WORDS */}
//       <ChartCard title="Filler Words">
//         <ResponsiveContainer width="100%" height={120}>
//           <BarChart data={fillerWords}>
//             <CartesianGrid stroke="rgb(var(--color-border)/0.3)" vertical={false} />
//             <XAxis dataKey="word" stroke="rgb(var(--color-muted-foreground))" />
//             <YAxis stroke="rgb(var(--color-muted-foreground))" />
//             <Tooltip contentStyle={{ backgroundColor: "rgb(var(--color-card))" }} />
//             <Bar dataKey="count" fill="hsl(var(--color-accent))" radius={4} />
//           </BarChart>
//         </ResponsiveContainer>
//       </ChartCard>

//       {/* CONFIDENCE TREND */}
//       <ChartCard title="Confidence Trend">
//         <ResponsiveContainer width="100%" height={110}>
//           <LineChart data={confidenceTrend}>
//             <CartesianGrid stroke="rgb(var(--color-border)/0.3)" vertical={false} />
//             <XAxis dataKey="time" stroke="rgb(var(--color-muted-foreground))" />
//             <YAxis stroke="rgb(var(--color-muted-foreground))" />
//             <Tooltip contentStyle={{ backgroundColor: "rgb(var(--color-card))" }} />
//             <Line type="monotone" dataKey="score" stroke="hsl(var(--color-primary))" dot={false} strokeWidth={2} />
//           </LineChart>
//         </ResponsiveContainer>
//       </ChartCard>
//     </div>
//   );
// }

// function MetricBar({ label, value, colorClass }: any) {
//   return (
//     <div>
//       <div className="flex justify-between items-center mb-1">
//         <p className="text-sm font-semibold">{label}</p>
//         <span className="text-xl font-bold">{value}%</span>
//       </div>
//       <div className="w-full bg-card rounded-full h-2 overflow-hidden">
//         <div
//           className={`bg-gradient-to-r ${colorClass} h-full`}
//           style={{ width: `${value}%` }}
//         />
//       </div>
//     </div>
//   );
// }

// function ChartCard({ title, children }: any) {
//   return (
//     <div className="glass rounded-2xl border border-border p-4">
//       <h4 className="text-sm font-semibold mb-2">{title}</h4>
//       {children}
//     </div>
//   );
// }








// "use client";

// import { useState, useEffect } from "react";
// import {
//   BarChart,
//   Bar,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// interface LiveFeedbackProps {
//   metrics?: any;
//   latestTranscriptAnalysis?: any;
// }

// export default function LiveFeedback({ metrics, latestTranscriptAnalysis }: LiveFeedbackProps) {
//   const [confidence, setConfidence] = useState(0);
//   const [eyeContact, setEyeContact] = useState(0);
//   const [emotion, setEmotion] = useState("neutral");
//   const [emotionStrength, setEmotionStrength] = useState(0);
//   const [rawEmotionData, setRawEmotionData] = useState<any[]>([]);
//   const [clarity, setClarity] = useState(0);
  
//   // ✅ FIX: Initialize with default values to prevent undefined access
//   const [headPose, setHeadPose] = useState({ pitch: 0, yaw: 0, roll: 0 });

//   const [fillerWords, setFillerWords] = useState<any[]>([]);
//   const [confidenceTrend, setConfidenceTrend] = useState<any[]>([]);

//   // --------------------------
//   // ⚡ APPLY LIVE METRICS
//   // --------------------------
//   useEffect(() => {
//     if (!metrics) return;

//     setEyeContact(metrics.eye_contact || 0);
//     setConfidence(metrics.visual_confidence || 0);
//     setEmotion(metrics.emotion || "neutral");

//     // ✅ FIX: Safe access for head_pose
//     if (metrics.head_pose && typeof metrics.head_pose === 'object') {
//       setHeadPose({
//           pitch: metrics.head_pose.pitch || 0,
//           yaw: metrics.head_pose.yaw || 0,
//           roll: metrics.head_pose.roll || 0
//       });
//     }

//     // Raw emotion probabilities
//     if (metrics.raw_emotions) {
//       const mapped = Object.keys(metrics.raw_emotions).map((key) => ({
//         emotion: key,
//         score: Number((metrics.raw_emotions[key] * 100).toFixed(2)),
//       }));
//       setRawEmotionData(mapped);

//       // Select current emotion strength
//       if (metrics.emotion) {
//         const val = metrics.raw_emotions[metrics.emotion] || 0;
//         setEmotionStrength(Number((val * 100).toFixed(0))); // Ensure Number
//       }
//     }

//     // Confidence trend graph
//     setConfidenceTrend((prev) => [
//       ...prev.slice(-10),
//       { time: `${prev.length * 2}s`, score: metrics.visual_confidence || 0 },
//     ]);
//   }, [metrics]);


//   // --------------------------
//   // 🎤 SPEECH METRICS
//   // --------------------------
//   useEffect(() => {
//     if (!latestTranscriptAnalysis) return;

//     setClarity(latestTranscriptAnalysis.clarity_score || 0);

//     const fillers = latestTranscriptAnalysis.filler_words_count || {};
//     setFillerWords(
//       Object.keys(fillers).map((word) => ({
//         word,
//         count: fillers[word],
//       }))
//     );
//   }, [latestTranscriptAnalysis]);

//   return (
//     <div className="space-y-4 h-full">
      
//       {/* METRICS PANEL */}
//       <div className="glass rounded-2xl border border-border p-6 space-y-4">
//         <h3 className="text-lg font-semibold text-foreground">Live Metrics</h3>

//         <MetricBar label="Confidence" value={confidence} colorClass="from-primary to-accent" />
//         <MetricBar label="Eye Contact" value={eyeContact} colorClass="from-accent to-primary" />
//         <MetricBar label="Clarity" value={clarity} colorClass="from-primary to-accent" />

//         {/* Emotion */}
//         <div className="mt-4">
//           <p className="text-sm font-semibold text-foreground">Dominant Emotion</p>
//           <p className="text-xl font-bold capitalize">
//             {emotion} ({emotionStrength}%)
//           </p>
//         </div>

//         {/* Head Pose - Safely Rendered */}
//         <div className="mt-4">
//           <p className="text-sm font-semibold text-foreground mb-1">Head Pose</p>
//           <p className="text-sm text-muted-foreground">
//             Pitch: <b>{(headPose.pitch || 0).toFixed(2)}</b>° |  
//             Yaw: <b>{(headPose.yaw || 0).toFixed(2)}</b>° |  
//             Roll: <b>{(headPose.roll || 0).toFixed(2)}</b>°
//           </p>
//         </div>
//       </div>

//       {/* RAW EMOTION CHART */}
//       <ChartCard title="Emotion Probabilities">
//         <ResponsiveContainer width="100%" height={140}>
//           <BarChart data={rawEmotionData}>
//             <CartesianGrid stroke="rgb(var(--color-border)/0.3)" vertical={false} />
//             <XAxis dataKey="emotion" stroke="rgb(var(--color-muted-foreground))" />
//             <YAxis stroke="rgb(var(--color-muted-foreground))" />
//             <Tooltip contentStyle={{ backgroundColor: "rgb(var(--color-card))" }} />
//             <Bar dataKey="score" fill="hsl(var(--color-primary))" radius={4} />
//           </BarChart>
//         </ResponsiveContainer>
//       </ChartCard>

//       {/* FILLER WORDS */}
//       <ChartCard title="Filler Words">
//         <ResponsiveContainer width="100%" height={120}>
//           <BarChart data={fillerWords}>
//             <CartesianGrid stroke="rgb(var(--color-border)/0.3)" vertical={false} />
//             <XAxis dataKey="word" stroke="rgb(var(--color-muted-foreground))" />
//             <YAxis stroke="rgb(var(--color-muted-foreground))" />
//             <Tooltip contentStyle={{ backgroundColor: "rgb(var(--color-card))" }} />
//             <Bar dataKey="count" fill="hsl(var(--color-accent))" radius={4} />
//           </BarChart>
//         </ResponsiveContainer>
//       </ChartCard>

//       {/* CONFIDENCE TREND */}
//       <ChartCard title="Confidence Trend">
//         <ResponsiveContainer width="100%" height={110}>
//           <LineChart data={confidenceTrend}>
//             <CartesianGrid stroke="rgb(var(--color-border)/0.3)" vertical={false} />
//             <XAxis dataKey="time" stroke="rgb(var(--color-muted-foreground))" />
//             <YAxis stroke="rgb(var(--color-muted-foreground))" />
//             <Tooltip contentStyle={{ backgroundColor: "rgb(var(--color-card))" }} />
//             <Line type="monotone" dataKey="score" stroke="hsl(var(--color-primary))" dot={false} strokeWidth={2} />
//           </LineChart>
//         </ResponsiveContainer>
//       </ChartCard>
//     </div>
//   );
// }

// function MetricBar({ label, value, colorClass }: any) {
//   return (
//     <div>
//       <div className="flex justify-between items-center mb-1">
//         <p className="text-sm font-semibold">{label}</p>
//         <span className="text-xl font-bold">{value}%</span>
//       </div>
//       <div className="w-full bg-card rounded-full h-2 overflow-hidden">
//         <div
//           className={`bg-gradient-to-r ${colorClass} h-full`}
//           style={{ width: `${value}%` }}
//         />
//       </div>
//     </div>
//   );
// }

// function ChartCard({ title, children }: any) {
//   return (
//     <div className="glass rounded-2xl border border-border p-4">
//       <h4 className="text-sm font-semibold mb-2">{title}</h4>
//       {children}
//     </div>
//   );
// }






"use client";

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { useEffect, useState } from "react";
import { Activity, Eye, Zap, Smile } from "lucide-react";

interface LiveFeedbackProps {
  metrics?: any;
  latestTranscriptAnalysis?: any;
}

export default function LiveFeedback({ metrics, latestTranscriptAnalysis }: LiveFeedbackProps) {
  const [dataHistory, setDataHistory] = useState<any[]>([]);

  // Smoothly update history graph
  useEffect(() => {
    if (metrics?.visual_confidence) {
      setDataHistory(prev => {
        const newData = [...prev, { time: '', val: metrics.visual_confidence }];
        return newData.slice(-15); // Keep last 15 ticks
      });
    }
  }, [metrics]);

  const emotion = metrics?.emotion || "Neutral";
  const confidence = metrics?.visual_confidence || 0;
  const eyeContact = metrics?.eye_contact || 0;
  const clarity = latestTranscriptAnalysis?.clarity_score || 0;

  return (
    <div className="space-y-5">
        
        {/* 1. Main Emotion Card */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                    <Smile size={20} />
                </div>
                <div>
                    <h3 className="text-sm font-bold text-gray-400 uppercase">Detected Emotion</h3>
                    <p className="text-xl font-bold text-gray-900 capitalize">{emotion}</p>
                </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2 mt-2">
                <MiniStat label="Pitch" val={metrics?.angles?.pitch || 0} unit="°" />
                <MiniStat label="Yaw" val={metrics?.angles?.yaw || 0} unit="°" />
                <MiniStat label="Roll" val={metrics?.angles?.roll || 0} unit="°" />
            </div>
        </div>

        {/* 2. Key Metrics Bars */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="flex items-center gap-2 text-sm font-bold text-gray-800">
                <Activity size={16} className="text-blue-500"/> Performance Signals
            </h3>
            
            <ProgressBar label="Visual Confidence" value={confidence} color="bg-blue-500" icon={<Zap size={14}/>} />
            <ProgressBar label="Eye Contact" value={eyeContact} color="bg-green-500" icon={<Eye size={14}/>} />
            <ProgressBar label="Speech Clarity" value={clarity} color="bg-purple-500" icon={<Activity size={14}/>} />
        </div>

        {/* 3. Real-time Graph */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm h-48 flex flex-col">
            <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">Confidence Trend</h3>
            <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={dataHistory}>
                        <Line 
                            type="monotone" 
                            dataKey="val" 
                            stroke="#3b82f6" 
                            strokeWidth={3} 
                            dot={false}
                            animationDuration={300}
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
    <div className="bg-gray-50 rounded-lg p-2 text-center">
        <div className="text-lg font-bold text-gray-700">{Math.round(val)}{unit}</div>
        <div className="text-[10px] uppercase font-bold text-gray-400">{label}</div>
    </div>
);

const ProgressBar = ({ label, value, color, icon }: any) => (
    <div>
        <div className="flex justify-between items-center text-xs mb-1.5">
            <span className="flex items-center gap-1.5 font-medium text-gray-600">
                {icon} {label}
            </span>
            <span className="font-bold text-gray-900">{value}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <div 
                className={`h-full transition-all duration-700 ease-out ${color}`} 
                style={{ width: `${Math.min(value, 100)}%` }} 
            />
        </div>
    </div>
);