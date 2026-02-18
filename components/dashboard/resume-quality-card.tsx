

"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link"; 

// Auto-grade calculation
function calculateGrade(score: number) {
  if (score >= 90) return "A+";
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  return "D";
}

// Motivation text
function getReviewText(score: number) {
  if (score >= 90)
    return "Outstanding! Your resume is interview-ready.";
  if (score >= 80)
    return "Strong resume! Consider enhancing key sections for perfection.";
  if (score >= 70)
    return "Good baseline. Try improving clarity and structure.";
  if (score >= 60)
    return "Needs more detailing. Add metrics, results, and skills.";
  return "Your resume needs improvements. Focus on skills, projects & format.";
}

export default function ResumeQualityCard({
  score = 0,
}: {
  score?: number;
}) {
  const grade = calculateGrade(score);
  const reviewText = getReviewText(score);

  return (
    <div className="glass rounded-2xl p-6 border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Resume Quality
      </h3>

      <div className="flex items-end justify-between">
        <div>
          <p
            className={`text-4xl font-bold mb-1
              ${
                grade === "A+" || grade === "A"
                  ? "text-green-500"
                  : grade === "B"
                  ? "text-yellow-500"
                  : grade === "C"
                  ? "text-orange-500"
                  : "text-red-500"
              }`}
          >
            {grade}
          </p>

          <p className="text-sm text-muted-foreground">{score}/100</p>
        </div>
      </div>

      {/* Review line */}
      <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
        {reviewText}
      </p>

      {/*  WORKABLE BUTTON: Redirects to /resume */}
      <Link 
        href="/resume" 
        className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-card border border-border hover:bg-muted text-foreground transition-all text-sm font-medium shadow-sm active:scale-95"
      >
        View Full Report
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
