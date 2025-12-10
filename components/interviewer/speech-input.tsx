"use client";

import { useEffect, useState, useRef } from "react";
import { Mic, MicOff, Waves } from "lucide-react";

// ✅ Fix TypeScript errors for SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface SpeechInputProps {
  onTranscriptUpdate?: (text: string) => void;
  onFinalAnswer?: (text: string) => void;
}

export default function SpeechInput({ onTranscriptUpdate, onFinalAnswer }: SpeechInputProps) {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (!SR) {
        console.warn("Speech Recognition not supported.");
        return;
      }

      const recognition = new SR();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event: any) => {
        let interim = "";
        let final = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            final += event.results[i][0].transcript + " ";
          } else {
            interim += event.results[i][0].transcript;
          }
        }

        if (onTranscriptUpdate) onTranscriptUpdate(interim);
        if (final && onFinalAnswer) onFinalAnswer(final.trim());
      };

      recognition.onerror = (event: any) => {
        console.error("Mic Error:", event.error);
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <button
        onClick={toggleListening}
        className={`
            group relative flex items-center justify-center w-20 h-20 rounded-full transition-all duration-300 shadow-xl
            ${isListening 
                ? "bg-red-500 shadow-red-500/40" 
                : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/40"}
        `}
      >
        {isListening && (
           <>
             <span className="absolute w-full h-full rounded-full bg-red-500 opacity-30 animate-ping"></span>
             <span className="absolute w-[120%] h-[120%] rounded-full border border-red-500 opacity-20 animate-pulse"></span>
           </>
        )}
        
        {isListening ? (
             <MicOff className="w-8 h-8 text-white relative z-10" />
        ) : (
             <Mic className="w-8 h-8 text-white relative z-10" />
        )}
      </button>
      
      <p className={`text-xs font-bold uppercase tracking-wider transition-colors ${isListening ? 'text-red-500 animate-pulse' : 'text-gray-400'}`}>
        {isListening ? "Listening..." : "Click to Speak"}
      </p>
    </div>
  );
}