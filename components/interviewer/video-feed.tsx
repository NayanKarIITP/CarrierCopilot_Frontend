
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