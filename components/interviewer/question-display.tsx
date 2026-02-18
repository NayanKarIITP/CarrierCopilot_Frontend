


"use client";

import { Loader2, MessageSquare, CornerDownRight, Sparkles } from "lucide-react";

interface QuestionDisplayProps {
  question: string;
  followUp?: string;
  loading?: boolean;
  stage?: 'main' | 'followup';
}

const QuestionDisplay = ({ question, followUp, loading, stage = 'main' }: QuestionDisplayProps) => {
  return (
    <div className="bg-white dark:bg-card p-6 rounded-2xl border border-gray-200 dark:border-border shadow-sm space-y-4 transition-all duration-300 hover:shadow-md h-full flex flex-col relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none dark:opacity-10">
        <MessageSquare size={120} className="dark:text-white" />
      </div>

      {/* Header Badge */}
      <div className="flex items-center justify-between mb-2 relative z-10">
        <div className="flex items-center gap-2">
          {stage === 'followup' ? (
             <div className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 p-1.5 rounded-lg shadow-sm">
                <CornerDownRight size={18} />
             </div>
          ) : (
             <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 p-1.5 rounded-lg shadow-sm">
                <MessageSquare size={18} />
             </div>
          )}
          
          <div className={`text-xs font-bold uppercase tracking-wider ${stage === 'followup' ? 'text-indigo-600 dark:text-indigo-400' : 'text-blue-600 dark:text-blue-400'}`}>
            {stage === 'followup' ? "Deep Dive Follow-Up" : "Current Question"}
          </div>
        </div>

        {/* AI Badge */}
        {!loading && (
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-muted px-2.5 py-1 rounded-full border border-gray-200 dark:border-border">
                <Sparkles size={12} className="text-amber-400" /> AI Generated
            </div>
        )}
      </div>

      {/* Main Question Content */}
      <div className="flex-1 flex items-center relative z-10">
        {loading ? (
            <div className="w-full py-8 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 gap-4 animate-pulse">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-full">
                    <Loader2 className="animate-spin text-blue-500 dark:text-blue-400" size={24} />
                </div>
                <span className="text-sm font-medium tracking-wide">Analyzing your response & generating next step...</span>
            </div>
        ) : (
            <div className="w-full animate-in fade-in slide-in-from-bottom-2 duration-500">
                <p className={`font-medium text-gray-900 dark:text-white leading-relaxed ${stage === 'followup' ? 'text-lg italic text-gray-700 dark:text-gray-300' : 'text-xl'}`}>
                    "{question || "Waiting for question..."}"
                </p>
            </div>
        )}
      </div>

      {/* Static Follow-Up Preview */}
      {followUp && stage !== 'followup' && !loading && (
        <div className="mt-4 p-4 bg-indigo-50/50 dark:bg-indigo-900/20 border-l-4 border-indigo-300 dark:border-indigo-700 rounded-r-lg text-sm animate-in fade-in slide-in-from-top-2 relative z-10">
          <strong className="block mb-1 text-indigo-900 dark:text-indigo-200 font-semibold uppercase text-xs tracking-wide flex items-center gap-1">
            <CornerDownRight size={12}/> Coming Up Next
          </strong>
          <p className="text-gray-600 dark:text-gray-400 italic">"{followUp}"</p>
        </div>
      )}
    </div>
  );
};

export default QuestionDisplay;