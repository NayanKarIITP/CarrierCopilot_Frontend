

"use client";

import { Map, ChevronRight, Rocket, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Props {
  roadmap?: any[];
}

export default function LearningRoadmap({ roadmap = [] }: Props) {
  const hasRoadmap = roadmap.length > 0;

  return (
    <div className="glass rounded-xl border border-border p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <Map size={16} className="text-blue-500" />
          Learning Path
        </h3>

        {hasRoadmap && (
          <Link
            href="/roadmap"
            className="text-xs text-blue-500 hover:text-blue-600 flex items-center"
          >
            View Full <ChevronRight size={14} />
          </Link>
        )}
      </div>

      {/* Content */}
      {hasRoadmap ? (
        //ROADMAP PREVIEW 
        <div className="relative space-y-4 pl-2">
          <div className="absolute left-[9px] top-1 bottom-1 w-0.5 bg-border/50" />

          {roadmap.slice(0, 3).map((step, i) => (
            <div key={i} className="flex gap-3 relative">
              <div className="w-5 h-5 rounded-full border-2 text-[10px] font-bold flex items-center justify-center bg-card border-border text-muted-foreground">
                {i + 1}
              </div>

              <div>
                <p className="text-sm font-medium">{step.title}</p>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {step.description || step.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        //  COMPACT EMPTY STATE
        <div className="flex items-center justify-between gap-3 bg-muted/40 rounded-lg p-3">
          <div className="flex items-center gap-3">
            <div className="bg-muted p-2 rounded-full">
              <Rocket size={16} className="text-muted-foreground" />
            </div>

            <div>
              <p className="text-sm font-medium">No roadmap yet</p>
              <p className="text-xs text-muted-foreground">
                Create your learning plan
              </p>
            </div>
          </div>

          <Link href="/roadmap">
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white gap-1"
            >
              Generate <ArrowRight size={14} />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
