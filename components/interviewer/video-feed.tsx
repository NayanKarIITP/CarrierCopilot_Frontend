
// "use client";

// import { BarChart, Bar, LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
// import { useEffect, useState } from "react";
// import { Activity, Eye, Zap, Smile } from "lucide-react";

// interface LiveFeedbackProps {
//   metrics?: any;
//   latestTranscriptAnalysis?: any;
// }

// export default function LiveFeedback({ metrics, latestTranscriptAnalysis }: LiveFeedbackProps) {
//   const [dataHistory, setDataHistory] = useState<any[]>([]);

//   // Smoothly update history graph
//   useEffect(() => {
//     if (metrics?.visual_confidence) {
//       setDataHistory(prev => {
//         const newData = [...prev, { time: '', val: metrics.visual_confidence }];
//         return newData.slice(-15); // Keep last 15 ticks
//       });
//     }
//   }, [metrics]);

//   const emotion = metrics?.emotion || "Neutral";
//   const confidence = metrics?.visual_confidence || 0;
//   const eyeContact = metrics?.eye_contact || 0;
//   const clarity = latestTranscriptAnalysis?.clarity_score || 0;

//   return (
//     <div className="space-y-5">
        
//         {/* 1. Main Emotion Card */}
//         <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
//             <div className="flex items-center gap-3 mb-4">
//                 <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
//                     <Smile size={20} />
//                 </div>
//                 <div>
//                     <h3 className="text-sm font-bold text-gray-400 uppercase">Detected Emotion</h3>
//                     <p className="text-xl font-bold text-gray-900 capitalize">{emotion}</p>
//                 </div>
//             </div>
            
//             <div className="grid grid-cols-3 gap-2 mt-2">
//                 <MiniStat label="Pitch" val={metrics?.angles?.pitch || 0} unit="°" />
//                 <MiniStat label="Yaw" val={metrics?.angles?.yaw || 0} unit="°" />
//                 <MiniStat label="Roll" val={metrics?.angles?.roll || 0} unit="°" />
//             </div>
//         </div>

//         {/* 2. Key Metrics Bars */}
//         <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4">
//             <h3 className="flex items-center gap-2 text-sm font-bold text-gray-800">
//                 <Activity size={16} className="text-blue-500"/> Performance Signals
//             </h3>
            
//             <ProgressBar label="Visual Confidence" value={confidence} color="bg-blue-500" icon={<Zap size={14}/>} />
//             <ProgressBar label="Eye Contact" value={eyeContact} color="bg-green-500" icon={<Eye size={14}/>} />
//             <ProgressBar label="Speech Clarity" value={clarity} color="bg-purple-500" icon={<Activity size={14}/>} />
//         </div>

//         {/* 3. Real-time Graph */}
//         <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm h-48 flex flex-col">
//             <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">Confidence Trend</h3>
//             <div className="flex-1 w-full min-h-0">
//                 <ResponsiveContainer width="100%" height="100%">
//                     <LineChart data={dataHistory}>
//                         <Line 
//                             type="monotone" 
//                             dataKey="val" 
//                             stroke="#3b82f6" 
//                             strokeWidth={3} 
//                             dot={false}
//                             animationDuration={300}
//                         />
//                         <YAxis hide domain={[0, 100]} />
//                     </LineChart>
//                 </ResponsiveContainer>
//             </div>
//         </div>
//     </div>
//   );
// }

// // Helpers
// const MiniStat = ({ label, val, unit }: any) => (
//     <div className="bg-gray-50 rounded-lg p-2 text-center">
//         <div className="text-lg font-bold text-gray-700">{Math.round(val)}{unit}</div>
//         <div className="text-[10px] uppercase font-bold text-gray-400">{label}</div>
//     </div>
// );

// const ProgressBar = ({ label, value, color, icon }: any) => (
//     <div>
//         <div className="flex justify-between items-center text-xs mb-1.5">
//             <span className="flex items-center gap-1.5 font-medium text-gray-600">
//                 {icon} {label}
//             </span>
//             <span className="font-bold text-gray-900">{value}%</span>
//         </div>
//         <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
//             <div 
//                 className={`h-full transition-all duration-700 ease-out ${color}`} 
//                 style={{ width: `${Math.min(value, 100)}%` }} 
//             />
//         </div>
//     </div>
// );







"use client";

import { useRef, useEffect, useState } from "react";
import { VideoOff, AlertCircle } from "lucide-react";

interface VideoFeedProps {
  isStreaming?: boolean;
  onMetrics?: (metrics: any) => void;
  videoRef?: React.RefObject<HTMLVideoElement>;
}

export default function VideoFeed({ isStreaming = true, onMetrics, videoRef: externalVideoRef }: VideoFeedProps) {
  const internalVideoRef = useRef<HTMLVideoElement>(null);
  const videoRef = externalVideoRef || internalVideoRef;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraError, setCameraError] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // 1. Initialize Camera
  useEffect(() => {
    if (!isStreaming) return;
    
    let stream: MediaStream | null = null;

    async function startCamera() {
      try {
        setCameraError(false);
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { width: 640, height: 480, frameRate: 15 } // Low res for speed
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => setIsReady(true);
        }
      } catch (err) {
        console.error("Camera access denied:", err);
        setCameraError(true);
      }
    }

    startCamera();

    return () => {
      if (stream) stream.getTracks().forEach((track) => track.stop());
      setIsReady(false);
    };
  }, [isStreaming, videoRef]);

  // 2. Capture & Analyze Loop
  useEffect(() => {
    if (!isStreaming || !isReady || cameraError) return;
    
    let isActive = true;

    const captureAndSend = async () => {
      if (!videoRef.current || !canvasRef.current) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (ctx && video.videoWidth) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const base64Image = canvas.toDataURL("image/jpeg", 0.6); 

        try {
           // ✅ FIX: Point directly to Python Backend (Port 8000)
           // Do NOT use /api prefix unless your FastAPI is configured for it
           const PYTHON_API_URL = "http://localhost:8000"; 
           
           const res = await fetch(`${PYTHON_API_URL}/interview/frame-metrics`, {
             method: "POST",
             headers: { "Content-Type": "application/json" },
             body: JSON.stringify({ image_base64: base64Image }),
           });
           
           // If Python is not running, this will throw, preventing the app from crashing
           if (res.ok) {
             const data = await res.json();
             if (data.success && onMetrics && isActive) {
               onMetrics(data.metrics);
             }
           }
        } catch (e) {
          // Silent fail (prevents console spam if backend is offline)
        }
      }

      if (isActive) setTimeout(captureAndSend, 1000); // 1 FPS
    };

    captureAndSend();

    return () => { isActive = false; };
  }, [isStreaming, isReady, cameraError, onMetrics]);

  return (
    <div className="relative w-full h-full bg-black rounded-xl overflow-hidden border border-gray-800 shadow-2xl">
      <canvas ref={canvasRef} className="hidden" />

      {cameraError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-red-400 gap-2 bg-gray-900 z-30">
           <AlertCircle size={40} />
           <p className="text-sm font-medium">Camera Access Denied</p>
        </div>
      )}

      <video 
        ref={videoRef} 
        className={`w-full h-full object-cover transform scale-x-[-1] transition-opacity duration-500 ${isReady ? 'opacity-100' : 'opacity-0'}`}
        playsInline 
        autoPlay 
        muted 
      />

      {isStreaming && isReady && (
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/50 border border-white/10 rounded-full px-3 py-1.5 backdrop-blur-md z-20">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
          <span className="text-[10px] font-bold text-white uppercase tracking-wider">AI Vision Active</span>
        </div>
      )}
    </div>
  );
}




// "use client";

// import { useRef, useEffect, useState } from "react";
// import { VideoOff, AlertCircle } from "lucide-react";

// interface VideoFeedProps {
//   isStreaming?: boolean;
//   onMetrics?: (metrics: any) => void;
//   videoRef?: React.RefObject<HTMLVideoElement>;
// }

// export default function VideoFeed({ isStreaming = true, onMetrics, videoRef: externalVideoRef }: VideoFeedProps) {
//   const internalVideoRef = useRef<HTMLVideoElement>(null);
//   const videoRef = externalVideoRef || internalVideoRef;
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [cameraError, setCameraError] = useState(false);
//   const [isReady, setIsReady] = useState(false);

//   // 1. Initialize Camera
//   useEffect(() => {
//     if (!isStreaming) return;
    
//     let stream: MediaStream | null = null;

//     async function startCamera() {
//       try {
//         setCameraError(false);
//         stream = await navigator.mediaDevices.getUserMedia({ 
//           video: { width: 640, height: 480, frameRate: 15 } // Low res for speed
//         });
        
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//           videoRef.current.onloadedmetadata = () => setIsReady(true);
//         }
//       } catch (err) {
//         console.error("Camera access denied:", err);
//         setCameraError(true);
//       }
//     }

//     startCamera();

//     return () => {
//       if (stream) stream.getTracks().forEach((track) => track.stop());
//       setIsReady(false);
//     };
//   }, [isStreaming, videoRef]);

//   // 2. Capture & Analyze Loop
//   useEffect(() => {
//     if (!isStreaming || !isReady || cameraError) return;
    
//     let isActive = true;

//     const captureAndSend = async () => {
//       if (!videoRef.current || !canvasRef.current) return;

//       const video = videoRef.current;
//       const canvas = canvasRef.current;
//       const ctx = canvas.getContext("2d");

//       if (ctx && video.videoWidth) {
//         canvas.width = video.videoWidth;
//         canvas.height = video.videoHeight;
        
//         ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
//         const base64Image = canvas.toDataURL("image/jpeg", 0.6); 

//         try {
//            const PYTHON_API_URL = "http://localhost:8000"; 
           
//            const res = await fetch(`${PYTHON_API_URL}/interview/frame-metrics`, {
//              method: "POST",
//              headers: { "Content-Type": "application/json" },
//              body: JSON.stringify({ image_base64: base64Image }),
//            });
           
//            if (res.ok) {
//              const data = await res.json();
//              if (data.success && onMetrics && isActive) {
//                onMetrics(data.metrics);
//              }
//            }
//         } catch (e) {
//           // Silent fail
//         }
//       }

//       if (isActive) setTimeout(captureAndSend, 1000); // 1 FPS
//     };

//     captureAndSend();

//     return () => { isActive = false; };
//   }, [isStreaming, isReady, cameraError, onMetrics]);

//   return (
//     <div className="relative w-full h-full bg-black rounded-xl overflow-hidden border border-gray-800 dark:border-gray-700 shadow-2xl">
//       <canvas ref={canvasRef} className="hidden" />

//       {cameraError && (
//         <div className="absolute inset-0 flex flex-col items-center justify-center text-red-400 gap-2 bg-gray-900 z-30">
//            <AlertCircle size={40} />
//            <p className="text-sm font-medium">Camera Access Denied</p>
//         </div>
//       )}

//       <video 
//         ref={videoRef} 
//         className={`w-full h-full object-cover transform scale-x-[-1] transition-opacity duration-500 ${isReady ? 'opacity-100' : 'opacity-0'}`}
//         playsInline 
//         autoPlay 
//         muted 
//       />

//       {isStreaming && isReady && (
//         <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/50 border border-white/10 rounded-full px-3 py-1.5 backdrop-blur-md z-20">
//           <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
//           <span className="text-[10px] font-bold text-white uppercase tracking-wider">AI Vision Active</span>
//         </div>
//       )}
//     </div>
//   );
// }