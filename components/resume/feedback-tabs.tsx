
// "use client"

// import { useState } from "react"
// import { AlertCircle, CheckCircle2, Info, Lightbulb, Zap } from "lucide-react"

// interface ParsedResume {
//   skills?: string[]
//   education?: Array<{name?: string, degree?: string, institution?: string, year?: string}>
//   experience?: Array<{title?: string, company?: string, duration?: string, description?: string}>
//   feedback?: string[]
//   strengths?: string[]    
//   improvements?: string[]
// }

// interface FeedbackTabsProps {
//   parsedData?: ParsedResume | null
//   loading?: boolean
// }

// type TabType = "feedback" | "extracted" | "skills"

// export default function FeedbackTabs({ parsedData, loading = false }: FeedbackTabsProps) {
//   const [activeTab, setActiveTab] = useState<TabType>("feedback")

//   const tabs: { id: TabType; label: string }[] = [
//     { id: "feedback", label: "AI Analysis" },
//     { id: "extracted", label: "Extracted Data" },
//     { id: "skills", label: "Skills Check" },
//   ]

//   if (loading) {
//     return (
//       <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-sm">
//         <div className="flex flex-col items-center justify-center">
//           <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent mb-4"></div>
//           <p className="text-gray-500 font-medium">Analyzing resume structure & content...</p>
//         </div>
//       </div>
//     )
//   }

//   // ✅ CRITICAL FIX: Ensure these are always arrays using Array.isArray
//   const strengths = Array.isArray(parsedData?.strengths) ? parsedData.strengths : [];
//   const improvements = Array.isArray(parsedData?.improvements) ? parsedData.improvements : [];
//   const genericFeedback = Array.isArray(parsedData?.feedback) ? parsedData.feedback : [];
  
//   const skills = Array.isArray(parsedData?.skills) ? parsedData.skills : [];
//   const education = Array.isArray(parsedData?.education) ? parsedData.education : [];
//   const experience = Array.isArray(parsedData?.experience) ? parsedData.experience : [];

//   return (
//     <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      
//       {/* Tab Navigation */}
//       <div className="flex border-b border-gray-100 overflow-x-auto">
//         {tabs.map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id)}
//             className={`px-6 py-4 whitespace-nowrap text-sm font-medium transition-all border-b-2 hover:bg-gray-50 ${
//               activeTab === tab.id
//                 ? "border-blue-600 text-blue-600 bg-blue-50/50"
//                 : "border-transparent text-gray-500 hover:text-gray-700"
//             }`}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* Tab Content */}
//       <div className="p-6 md:p-8 min-h-[400px]">
        
//         {/* === TAB 1: FEEDBACK (STRENGTHS vs WEAKNESSES) === */}
//         {activeTab === "feedback" && (
//           <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            
//             {/* If we have no data at all */}
//             {strengths.length === 0 && improvements.length === 0 && genericFeedback.length === 0 ? (
//                <div className="text-center py-12 text-gray-400">
//                  <Info size={48} className="mx-auto mb-4 opacity-30" />
//                  <p>Upload a resume to see AI feedback.</p>
//                </div>
//             ) : (
//               <>
//                 {/* 1. Strengths Section */}
//                 {strengths.length > 0 && (
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
//                       <Zap className="text-green-500 fill-current" size={20}/> 
//                       Strong Points
//                     </h3>
//                     <div className="grid gap-3">
//                       {strengths.map((item, i) => (
//                         <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-green-50 border border-green-100">
//                           <CheckCircle2 className="text-green-600 flex-shrink-0 mt-0.5" size={18} />
//                           <p className="text-sm text-green-800">{item}</p>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* 2. Improvements Section */}
//                 {improvements.length > 0 && (
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
//                       <AlertCircle className="text-amber-500" size={20}/> 
//                       Areas for Improvement
//                     </h3>
//                     <div className="grid gap-3">
//                       {improvements.map((item, i) => (
//                         <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-amber-50 border border-amber-100">
//                           <Info className="text-amber-600 flex-shrink-0 mt-0.5" size={18} />
//                           <p className="text-sm text-amber-800">{item}</p>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* 3. Generic Feedback (Fallback) */}
//                 {strengths.length === 0 && improvements.length === 0 && genericFeedback.length > 0 && (
//                    <div className="space-y-3">
//                      {genericFeedback.map((item, i) => (
//                         <div key={i} className="p-4 bg-gray-50 rounded-lg border border-gray-100 text-sm text-gray-700">
//                            {item}
//                         </div>
//                      ))}
//                    </div>
//                 )}
//               </>
//             )}
//           </div>
//         )}

//         {/* === TAB 2: EXTRACTED DATA === */}
//         {activeTab === "extracted" && (
//           <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
//             {/* Experience */}
//             <div>
//               <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Work Experience</h4>
//               {experience.length > 0 ? (
//                 <div className="space-y-4">
//                   {experience.map((exp, index) => (
//                     <div key={index} className="pl-4 border-l-2 border-gray-200">
//                       <h5 className="font-semibold text-gray-900 text-lg">{exp.title || 'Role'}</h5>
//                       <div className="text-sm text-blue-600 font-medium mb-1">
//                         {exp.company} {exp.duration && <span className="text-gray-400 font-normal">• {exp.duration}</span>}
//                       </div>
//                       {exp.description && <p className="text-sm text-gray-600 leading-relaxed">{exp.description}</p>}
//                     </div>
//                   ))}
//                 </div>
//               ) : <p className="text-sm text-gray-400 italic">No experience found.</p>}
//             </div>

//             {/* Education */}
//             <div>
//               <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Education</h4>
//               {education.length > 0 ? (
//                 <div className="grid gap-4 sm:grid-cols-2">
//                   {education.map((edu, index) => (
//                     <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
//                       <h5 className="font-semibold text-gray-900">{edu.degree || "Degree"}</h5>
//                       <p className="text-sm text-gray-600">{edu.institution}</p>
//                       {edu.year && <p className="text-xs text-gray-400 mt-2">{edu.year}</p>}
//                     </div>
//                   ))}
//                 </div>
//               ) : <p className="text-sm text-gray-400 italic">No education found.</p>}
//             </div>
//           </div>
//         )}

//         {/* === TAB 3: SKILLS CHECK === */}
//         {activeTab === "skills" && (
//           <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
//             <div className="mb-6 p-4 bg-blue-50 text-blue-800 rounded-lg text-sm flex gap-3">
//                <Lightbulb size={20} className="shrink-0"/>
//                <p>These are the hard skills extracted from your resume. Visit the <strong>Roadmap</strong> page to see what you are missing for your target role.</p>
//             </div>

//             {skills.length > 0 ? (
//               <div className="flex flex-wrap gap-2">
//                 {skills.map((skill, index) => (
//                   <span key={index} className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 shadow-sm">
//                     {skill}
//                   </span>
//                 ))}
//               </div>
//             ) : <p className="text-gray-400">No technical skills detected.</p>}
//           </div>
//         )}

//       </div>
//     </div>
//   )
// }



// "use client";

// import { useState } from "react";
// import { AlertCircle, CheckCircle2, Info, Lightbulb, Zap, Database, Copy, Check, ChevronRight } from "lucide-react";

// interface ParsedResume {
//   skills?: string[];
//   education?: Array<{ degree?: string; institution?: string; year?: string }>;
//   experience?: Array<{ title?: string; company?: string; duration?: string; description?: string }>;
//   feedback?: string[];
//   strengths?: string[];
//   improvements?: string[];
// }

// interface FeedbackTabsProps {
//   parsedData?: ParsedResume | null;
//   loading?: boolean;
// }

// type TabType = "feedback" | "extracted" | "skills";

// export default function FeedbackTabs({ parsedData, loading = false }: FeedbackTabsProps) {
//   const [activeTab, setActiveTab] = useState<TabType>("feedback");
//   const [copied, setCopied] = useState(false);

//   const tabs: { id: TabType; label: string; icon: any }[] = [
//     { id: "feedback", label: "Analysis", icon: Zap },
//     { id: "extracted", label: "Data", icon: Database },
//     { id: "skills", label: "Skills", icon: Lightbulb },
//   ];

//   const handleCopy = (text: string) => {
//       navigator.clipboard.writeText(text);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//   };

//   if (loading) {
//     return (
//       <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-12 text-center shadow-sm w-full flex flex-col items-center justify-center gap-4 min-h-[400px]">
//         <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
//         <div className="space-y-2">
//             <p className="text-gray-900 font-semibold text-lg">Analyzing Resume...</p>
//             <p className="text-gray-500 text-sm">Reviewing format, keywords, and impact.</p>
//         </div>
//       </div>
//     );
//   }

//   // Safe Defaults
//   const strengths = Array.isArray(parsedData?.strengths) ? parsedData.strengths : [];
//   const improvements = Array.isArray(parsedData?.improvements) ? parsedData.improvements : [];
//   const genericFeedback = Array.isArray(parsedData?.feedback) ? parsedData.feedback : [];
  
//   const skills = Array.isArray(parsedData?.skills) ? parsedData.skills : [];
//   const education = Array.isArray(parsedData?.education) ? parsedData.education : [];
//   const experience = Array.isArray(parsedData?.experience) ? parsedData.experience : [];

//   return (
//     <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col w-full">
      
//       {/* Header Tabs - Scrollable on mobile */}
//       <div className="flex border-b border-gray-100 bg-gray-50/50 overflow-x-auto no-scrollbar">
//         {tabs.map((tab) => {
//             const Icon = tab.icon;
//             return (
//                 <button
//                     key={tab.id}
//                     onClick={() => setActiveTab(tab.id)}
//                     className={`flex-1 min-w-[100px] py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-all relative ${
//                     activeTab === tab.id
//                         ? "text-indigo-600 bg-white shadow-sm ring-1 ring-black/5 z-10"
//                         : "text-gray-500 hover:text-gray-700 hover:bg-gray-100/50"
//                     }`}
//                 >
//                     <Icon size={16} className={activeTab === tab.id ? "text-indigo-600" : "text-gray-400"} />
//                     {tab.label}
//                     {activeTab === tab.id && <div className="absolute top-0 left-0 w-full h-0.5 bg-indigo-600" />}
//                 </button>
//             );
//         })}
//       </div>

//       {/* Content Area - Responsive Height */}
//       {/* On Mobile: Fixed height with scroll (400px). On Desktop: Auto height (grows with content) */}
//       <div className="p-5 md:p-8 flex-1 overflow-y-auto min-h-[400px] md:min-h-0 md:h-auto max-h-[80vh] custom-scrollbar">
        
//         {/* === TAB 1: FEEDBACK === */}
//         {activeTab === "feedback" && (
//           <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
//             {strengths.length === 0 && improvements.length === 0 && genericFeedback.length === 0 ? (
//                <div className="text-center py-12 text-gray-400">
//                  <Info size={48} className="mx-auto mb-4 opacity-30" />
//                  <p>Upload a resume to generate specific AI feedback.</p>
//                </div>
//             ) : (
//               <>
//                 {/* Improvements (Priority) */}
//                 {improvements.length > 0 && (
//                   <div className="bg-orange-50 rounded-xl p-5 border border-orange-100 shadow-sm">
//                     <h3 className="text-sm font-bold uppercase tracking-wider text-orange-800 mb-4 flex items-center gap-2">
//                       <AlertCircle size={18} /> Needs Attention
//                     </h3>
//                     <div className="space-y-3">
//                       {improvements.map((item, i) => (
//                         <div key={i} className="flex gap-3 text-sm text-gray-700 items-start">
//                           <span className="text-orange-500 font-bold mt-0.5">•</span>
//                           <span className="leading-relaxed">{item}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Strengths */}
//                 {strengths.length > 0 && (
//                   <div className="bg-green-50 rounded-xl p-5 border border-green-100 shadow-sm">
//                     <h3 className="text-sm font-bold uppercase tracking-wider text-green-800 mb-4 flex items-center gap-2">
//                       <CheckCircle2 size={18} /> Key Strengths
//                     </h3>
//                     <div className="space-y-3">
//                       {strengths.map((item, i) => (
//                         <div key={i} className="flex gap-3 text-sm text-gray-700 items-start">
//                           <span className="text-green-500 font-bold mt-0.5">✓</span>
//                           <span className="leading-relaxed">{item}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Generic / Other Feedback */}
//                 {genericFeedback.length > 0 && improvements.length === 0 && strengths.length === 0 && (
//                    <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
//                         <h3 className="text-sm font-bold uppercase tracking-wider text-gray-600 mb-4">Summary</h3>
//                         <ul className="list-disc pl-4 space-y-2 text-sm text-gray-600">
//                             {genericFeedback.map((f, i) => <li key={i}>{f}</li>)}
//                         </ul>
//                    </div>
//                 )}
//               </>
//             )}
//           </div>
//         )}

//         {/* === TAB 2: EXTRACTED DATA === */}
//         {activeTab === "extracted" && (
//           <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
//             {experience.length > 0 || education.length > 0 ? (
//                 <>
//                 {/* Experience Block */}
//                 <div className="relative group">
//                     <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Experience</h4>
//                     <div className="space-y-6">
//                         {experience.map((exp, i) => (
//                             <div key={i} className="relative pl-6 border-l-2 border-gray-200">
//                                 <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-gray-300 ring-4 ring-white" />
//                                 <h5 className="font-bold text-gray-900">{exp.title}</h5>
//                                 <div className="text-indigo-600 text-sm font-medium mb-1 flex flex-wrap gap-2">
//                                     <span>{exp.company}</span>
//                                     <span className="text-gray-300 hidden sm:inline">•</span>
//                                     <span className="text-gray-500 font-normal text-xs sm:text-sm bg-gray-100 px-2 py-0.5 rounded">{exp.duration}</span>
//                                 </div>
//                                 <p className="text-sm text-gray-600 leading-relaxed mt-2">{exp.description}</p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 <div className="w-full h-px bg-gray-100 my-6" />

//                 {/* Education Block */}
//                 <div>
//                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Education</h4>
//                      <div className="grid grid-cols-1 gap-4">
//                         {education.map((edu, i) => (
//                             <div key={i} className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 hover:bg-white transition-colors">
//                                 <h5 className="font-bold text-gray-900">{edu.degree}</h5>
//                                 <p className="text-sm text-gray-600">{edu.institution}</p>
//                                 <p className="text-xs text-gray-400 mt-2 font-mono">{edu.year}</p>
//                             </div>
//                         ))}
//                      </div>
//                 </div>
//                 </>
//             ) : (
//                 <div className="text-center py-10 text-gray-400">
//                     <Database size={40} className="mx-auto mb-2 opacity-20" />
//                     <p>No structured data extracted.</p>
//                 </div>
//             )}
//           </div>
//         )}

//         {/* === TAB 3: SKILLS === */}
//         {activeTab === "skills" && (
//           <div className="animate-in fade-in slide-in-from-right-4 duration-300">
//             {skills.length > 0 ? (
//                 <div>
//                     <div className="flex justify-between items-start mb-6 bg-blue-50 p-4 rounded-xl border border-blue-100">
//                         <div className="flex gap-3">
//                             <Lightbulb className="text-blue-600 shrink-0 mt-0.5" size={18} />
//                             <div>
//                                 <h4 className="font-bold text-blue-900 text-sm">Skills Detected</h4>
//                                 <p className="text-xs text-blue-700 mt-1">Found {skills.length} technical keywords.</p>
//                             </div>
//                         </div>
//                         <button 
//                             onClick={() => handleCopy(skills.join(", "))}
//                             className="text-blue-600 hover:bg-blue-100 p-2 rounded-lg transition-colors"
//                         >
//                             {copied ? <Check size={16} /> : <Copy size={16} />}
//                         </button>
//                     </div>

//                     <div className="flex flex-wrap gap-2">
//                         {skills.map((skill, i) => (
//                             <span key={i} className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg shadow-sm hover:border-indigo-300 transition-colors cursor-default">
//                                 {skill}
//                             </span>
//                         ))}
//                     </div>
//                 </div>
//             ) : (
//                 <div className="text-center py-10 text-gray-400">
//                     <p>No skills detected.</p>
//                 </div>
//             )}
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }






"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, Info, Lightbulb, Zap, Database, Copy, Check, ChevronRight } from "lucide-react";

interface ParsedResume {
  skills?: string[];
  education?: Array<{ degree?: string; institution?: string; year?: string }>;
  experience?: Array<{ title?: string; company?: string; duration?: string; description?: string }>;
  feedback?: string[];
  strengths?: string[];
  improvements?: string[];
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
  const strengths = Array.isArray(parsedData?.strengths) ? parsedData.strengths : [];
  const improvements = Array.isArray(parsedData?.improvements) ? parsedData.improvements : [];
  const genericFeedback = Array.isArray(parsedData?.feedback) ? parsedData.feedback : [];
  
  const skills = Array.isArray(parsedData?.skills) ? parsedData.skills : [];
  const education = Array.isArray(parsedData?.education) ? parsedData.education : [];
  const experience = Array.isArray(parsedData?.experience) ? parsedData.experience : [];

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

        {/* === TAB 2: EXTRACTED DATA === */}
        {activeTab === "extracted" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            {experience.length > 0 || education.length > 0 ? (
                <>
                {/* Experience Block */}
                <div className="relative group">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">Experience</h4>
                    <div className="space-y-6">
                        {experience.map((exp, i) => (
                            <div key={i} className="relative pl-6 border-l-2 border-gray-200 dark:border-gray-700">
                                <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-gray-600 ring-4 ring-white dark:ring-card" />
                                <h5 className="font-bold text-gray-900 dark:text-white">{exp.title}</h5>
                                <div className="text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-1 flex flex-wrap gap-2">
                                    <span>{exp.company}</span>
                                    <span className="text-gray-300 dark:text-gray-600 hidden sm:inline">•</span>
                                    <span className="text-gray-500 dark:text-gray-400 font-normal text-xs sm:text-sm bg-gray-100 dark:bg-muted/50 px-2 py-0.5 rounded">{exp.duration}</span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mt-2">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full h-px bg-gray-100 dark:bg-border my-6" />

                {/* Education Block */}
                <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">Education</h4>
                      <div className="grid grid-cols-1 gap-4">
                        {education.map((edu, i) => (
                            <div key={i} className="p-4 rounded-xl border border-gray-200 dark:border-border bg-gray-50/50 dark:bg-muted/10 hover:bg-white dark:hover:bg-muted/20 transition-colors">
                                <h5 className="font-bold text-gray-900 dark:text-white">{edu.degree}</h5>
                                <p className="text-sm text-gray-600 dark:text-gray-300">{edu.institution}</p>
                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 font-mono">{edu.year}</p>
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