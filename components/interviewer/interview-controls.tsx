
"use client";

import { Button } from "@/components/ui/button";
import { SkipForward, StopCircle, Hourglass } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface QuestionData {
  text: string;
  follow_up: string;
  difficulty?: string;
}

interface Props {
  sessionId: string | null;
  role: string;
  level: string;
  onNextQuestion: (q: QuestionData) => void;
  onEndInterview?: () => Promise<void> | void; 
}

export default function InterviewControls({ 
  sessionId, 
  role, 
  level, 
  onNextQuestion, 
  onEndInterview 
}: Props) {
  
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [ending, setEnding] = useState(false);

  const handleNextQuestion = async () => {
    if (!sessionId) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

      const res = await fetch(`${API_URL}/interview/next-question`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token || ""}`
        },
        body: JSON.stringify({
          sessionId,
          role,
          level
        })
      });

      const data = await res.json();

      if (data.success && data.question) {
        onNextQuestion({
          text: data.question.text, 
          follow_up: data.question.followUp || data.question.follow_up || "", 
          difficulty: data.question.difficulty
        });
      } else {
        console.warn("API Error:", data.message || "Failed to fetch question");
      }
    } catch (err) {
      console.error("Network Error:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleEnd = async () => {
    if (ending) return;

    try {
      setEnding(true);
      
      if (onEndInterview) {
        await onEndInterview(); 
      }
      
      if (sessionId) {
        router.push(`/performance?session=${sessionId}`);
      } else {
        router.push("/dashboard");
      }

    } catch (error) {
      console.error("Failed to end interview:", error);
    } finally {
      setEnding(false);
    }
  }

  return (
    <div className="flex gap-3 mt-4 w-full">
      {/* Next Question Button */}
      <Button
        variant="outline"
        className="flex-1 gap-2 bg-white dark:bg-card hover:bg-gray-50 dark:hover:bg-muted text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700 shadow-sm transition-all h-12"
        onClick={handleNextQuestion}
        disabled={loading || ending || !sessionId}
      >
        {loading ? <Hourglass className="animate-spin" size={18} /> : <SkipForward size={18} />}
        {loading ? "Generating..." : "Next Question"}
      </Button>

      {/* End Interview Button */}
      <Button
        onClick={handleEnd}
        disabled={loading || ending}
        className="flex-1 gap-2 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 shadow-sm transition-all h-12"
        variant="ghost"
      >
        {ending ? <Hourglass className="animate-spin" size={18} /> : <StopCircle size={18} />}
        {ending ? "Saving..." : "End Interview"}
      </Button>
    </div>
  );
}