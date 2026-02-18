

"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, Info, Lightbulb, Zap, Database, Copy, Check, Briefcase, GraduationCap } from "lucide-react";

//  1. Match this Interface exactly with page.tsx to avoid type errors
interface ParsedResume {
  skills?: string[];
  education?: Array<{ 
    name?: string; 
    degree?: string; 
    institution?: string; 
    school?: string; // AI sometimes returns 'school'
    year?: string; 
    date?: string;   // AI sometimes returns 'date'
  }>;
  experience?: Array<{ 
    title?: string; 
    role?: string;   // AI sometimes returns 'role'
    company?: string; 
    organization?: string; // AI sometimes returns 'organization'
    duration?: string; 
    description?: string; 
  }>;
  feedback?: string[];
  strengths?: string[];
  improvements?: string[]; // We mapped 'weaknesses' to this in page.tsx
}

interface FeedbackTabsProps {
  parsedData?: ParsedResume | null;
  loading?: boolean;
}

type TabType = "feedback" | "extracted" | "skills";

export default function FeedbackTabs({ parsedData, loading = false }: FeedbackTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("feedback");
  const [copied, setCopied] = useState(false);

  const tabs: { id: TabType; label: string; icon: any }[] = [
    { id: "feedback", label: "Analysis", icon: Zap },
    { id: "extracted", label: "Data", icon: Database },
    { id: "skills", label: "Skills", icon: Lightbulb },
  ];

  const handleCopy = (text: string) => {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-card rounded-2xl border border-gray-200 dark:border-border p-8 md:p-12 text-center shadow-sm w-full flex flex-col items-center justify-center gap-4 min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent dark:border-indigo-400 dark:border-t-transparent"></div>
        <div className="space-y-2">
            <p className="text-gray-900 dark:text-white font-semibold text-lg">Analyzing Resume...</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Reviewing format, keywords, and impact.</p>
        </div>
      </div>
    );
  }

  // Safe Defaults
  const strengths = Array.isArray(parsedData?.strengths) ? parsedData!.strengths : [];
  const improvements = Array.isArray(parsedData?.improvements) ? parsedData!.improvements : [];
  const genericFeedback = Array.isArray(parsedData?.feedback) ? parsedData!.feedback : [];
  
  const skills = Array.isArray(parsedData?.skills) ? parsedData!.skills : [];
  const education = Array.isArray(parsedData?.education) ? parsedData!.education : [];
  const experience = Array.isArray(parsedData?.experience) ? parsedData!.experience : [];

  return (
    <div className="bg-white dark:bg-card rounded-2xl border border-gray-200 dark:border-border shadow-sm overflow-hidden flex flex-col w-full">
      
      {/* Header Tabs - Scrollable on mobile */}
      <div className="flex border-b border-gray-100 dark:border-border bg-gray-50/50 dark:bg-muted/10 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 min-w-[100px] py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-all relative ${
                    activeTab === tab.id
                        ? "text-indigo-600 dark:text-indigo-400 bg-white dark:bg-card shadow-sm ring-1 ring-black/5 dark:ring-white/5 z-10"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100/50 dark:hover:bg-muted/20"
                    }`}
                >
                    <Icon size={16} className={activeTab === tab.id ? "text-indigo-600 dark:text-indigo-400" : "text-gray-400 dark:text-gray-500"} />
                    {tab.label}
                    {activeTab === tab.id && <div className="absolute top-0 left-0 w-full h-0.5 bg-indigo-600 dark:bg-indigo-400" />}
                </button>
            );
        })}
      </div>

      {/* Content Area */}
      <div className="p-5 md:p-8 flex-1 overflow-y-auto min-h-[400px] md:min-h-0 md:h-auto max-h-[80vh] custom-scrollbar bg-white dark:bg-card">
        
        {/* === TAB 1: FEEDBACK === */}
        {activeTab === "feedback" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            {strengths.length === 0 && improvements.length === 0 && genericFeedback.length === 0 ? (
               <div className="text-center py-12 text-gray-400 dark:text-gray-500">
                 <Info size={48} className="mx-auto mb-4 opacity-30" />
                 <p>Upload a resume to generate specific AI feedback.</p>
               </div>
            ) : (
              <>
                {/* Improvements (Priority) */}
                {improvements.length > 0 && (
                  <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-5 border border-orange-100 dark:border-orange-800/30 shadow-sm">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-orange-800 dark:text-orange-300 mb-4 flex items-center gap-2">
                      <AlertCircle size={18} /> Needs Attention
                    </h3>
                    <div className="space-y-3">
                      {improvements.map((item, i) => (
                        <div key={i} className="flex gap-3 text-sm text-gray-700 dark:text-gray-300 items-start">
                          <span className="text-orange-500 font-bold mt-0.5">•</span>
                          <span className="leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Strengths */}
                {strengths.length > 0 && (
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-5 border border-green-100 dark:border-green-800/30 shadow-sm">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-green-800 dark:text-green-300 mb-4 flex items-center gap-2">
                      <CheckCircle2 size={18} /> Key Strengths
                    </h3>
                    <div className="space-y-3">
                      {strengths.map((item, i) => (
                        <div key={i} className="flex gap-3 text-sm text-gray-700 dark:text-gray-300 items-start">
                          <span className="text-green-500 font-bold mt-0.5">✓</span>
                          <span className="leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Generic / Other Feedback */}
                {genericFeedback.length > 0 && improvements.length === 0 && strengths.length === 0 && (
                   <div className="bg-gray-50 dark:bg-muted/10 rounded-xl p-5 border border-gray-200 dark:border-border">
                       <h3 className="text-sm font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-4">Summary</h3>
                       <ul className="list-disc pl-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                           {genericFeedback.map((f, i) => <li key={i}>{f}</li>)}
                       </ul>
                   </div>
                )}
              </>
            )}
          </div>
        )}

        {/* TAB 2: EXTRACTED DATA*/}
        {activeTab === "extracted" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            {experience.length > 0 || education.length > 0 ? (
                <>
                {/* Experience Block */}
                <div className="relative group">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4 flex items-center gap-2">
                        <Briefcase size={14} /> Experience
                    </h4>
                    <div className="space-y-6">
                        {experience.map((exp, i) => (
                            <div key={i} className="relative pl-6 border-l-2 border-gray-200 dark:border-gray-700">
                                <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-gray-600 ring-4 ring-white dark:ring-card" />
                                {/* Fallback for 'role' vs 'title' */}
                                <h5 className="font-bold text-gray-900 dark:text-white">{exp.title || exp.role || "Job Title"}</h5>
                                <div className="text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-1 flex flex-wrap gap-2">
                                    {/* Fallback for 'company' vs 'organization' */}
                                    <span>{exp.company || exp.organization || "Company"}</span>
                                    <span className="text-gray-300 dark:text-gray-600 hidden sm:inline">•</span>
                                    <span className="text-gray-500 dark:text-gray-400 font-normal text-xs sm:text-sm bg-gray-100 dark:bg-muted/50 px-2 py-0.5 rounded">
                                        {exp.duration || "Dates"}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mt-2">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full h-px bg-gray-100 dark:bg-border my-6" />

                {/* Education Block */}
                <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4 flex items-center gap-2">
                        <GraduationCap size={14} /> Education
                      </h4>
                      <div className="grid grid-cols-1 gap-4">
                        {education.map((edu, i) => (
                            <div key={i} className="p-4 rounded-xl border border-gray-200 dark:border-border bg-gray-50/50 dark:bg-muted/10 hover:bg-white dark:hover:bg-muted/20 transition-colors">
                                {/* Fallback for 'degree' */}
                                <h5 className="font-bold text-gray-900 dark:text-white">{edu.degree || edu.name || "Degree"}</h5>
                                {/* Fallback for 'institution' vs 'school' */}
                                <p className="text-sm text-gray-600 dark:text-gray-300">{edu.institution || edu.school || "Institution"}</p>
                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 font-mono">{edu.year || edu.date || "Year"}</p>
                            </div>
                        ))}
                      </div>
                </div>
                </>
            ) : (
                <div className="text-center py-10 text-gray-400 dark:text-gray-500">
                    <Database size={40} className="mx-auto mb-2 opacity-20" />
                    <p>No structured data extracted.</p>
                </div>
            )}
          </div>
        )}

        {/* === TAB 3: SKILLS === */}
        {activeTab === "skills" && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            {skills.length > 0 ? (
                <div>
                    <div className="flex justify-between items-start mb-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800/30">
                        <div className="flex gap-3">
                            <Lightbulb className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" size={18} />
                            <div>
                                <h4 className="font-bold text-blue-900 dark:text-blue-100 text-sm">Skills Detected</h4>
                                <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">Found {skills.length} technical keywords.</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => handleCopy(skills.join(", "))}
                            className="text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 p-2 rounded-lg transition-colors"
                        >
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill, i) => (
                            <span key={i} className="px-3 py-1.5 bg-white dark:bg-muted/20 border border-gray-200 dark:border-border text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg shadow-sm hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors cursor-default">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-center py-10 text-gray-400 dark:text-gray-500">
                    <p>No skills detected.</p>
                </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}