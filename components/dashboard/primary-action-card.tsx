
"use client";

import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PrimaryActionCard({ interviewScore }: { interviewScore?: number }) {
  const router = useRouter();

  return (
    <div className="glass glow rounded-2xl p-8 border border-primary/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5 pointer-events-none" />
      <div className="relative z-10">
        <h2 className="text-2xl font-bold text-foreground mb-3">Start Your AI Mock Interview</h2>
        <p className="text-muted-foreground mb-6">
          Practice real interview scenarios with instant AI feedback on technical accuracy, communication, and confidence.
        </p>

        <div className="flex items-center gap-6">
          <Button
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-foreground font-semibold gap-2 glow"
            onClick={() => router.push("/interviewer")}
          >
            <Play size={18} />
            Begin Session
          </Button>

          {typeof interviewScore === "number" && (
            <div className="text-sm text-muted-foreground">
              Last interview score: <strong className="text-foreground">{interviewScore}%</strong>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
