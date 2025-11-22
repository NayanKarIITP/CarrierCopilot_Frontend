"use client"

import { useRef, useEffect } from "react"
import { VideoOff } from "lucide-react"

interface VideoFeedProps {
  isStreaming?: boolean
}

export default function VideoFeed({ isStreaming = true }: VideoFeedProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (isStreaming && videoRef.current) {
      // In a real app, this would access the user's camera
      // navigator.mediaDevices.getUserMedia({ video: true })
      //   .then(stream => {
      //     videoRef.current!.srcObject = stream
      //   })
    }
  }, [isStreaming])

  return (
    <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden border border-border">
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5">
        <video ref={videoRef} className="w-full h-full object-cover" playsInline autoPlay muted />
        {!isStreaming && (
          <div className="flex flex-col items-center gap-3">
            <VideoOff size={48} className="text-muted-foreground" />
            <p className="text-muted-foreground">Camera is off</p>
          </div>
        )}
      </div>

      {/* Recording Indicator */}
      {isStreaming && (
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-500/20 border border-red-500/50 rounded-full px-3 py-1.5">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-xs font-semibold text-red-500">Recording</span>
        </div>
      )}

      {/* Timer */}
      <div className="absolute top-4 left-4 text-sm font-semibold text-foreground">00:42</div>
    </div>
  )
}
