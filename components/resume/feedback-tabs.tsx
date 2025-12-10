// "use client"

// import { useState } from "react"
// import { AlertCircle, AlertTriangle, Info, Lightbulb, HelpCircle } from "lucide-react"

// interface FeedbackItem {
//   id: number
//   category: "critical" | "suggestion" | "tip"
//   title: string
//   description: string
//   reason: string
// }

// const feedbackData: FeedbackItem[] = [
//   {
//     id: 1,
//     category: "critical",
//     title: "Add Quantifiable Results",
//     description: "Your project descriptions lack specific metrics and outcomes.",
//     reason: "Recruiters focus on impact. Use numbers to show what you accomplished.",
//   },
//   {
//     id: 2,
//     category: "critical",
//     title: "Include Technical Keywords",
//     description: "Add more specific technologies used in your projects.",
//     reason: "ATS systems scan for relevant tech keywords to match job requirements.",
//   },
//   {
//     id: 3,
//     category: "suggestion",
//     title: "Expand Experience Summary",
//     description: "Your first bullet point under each role could be more specific.",
//     reason: "Strong opening bullets grab attention and highlight key achievements.",
//   },
//   {
//     id: 4,
//     category: "tip",
//     title: "Use Action Verbs",
//     description: 'Replace passive language with strong action verbs like "architected" or "optimized".',
//     reason: "Action verbs make your contributions sound more impactful.",
//   },
// ]

// type TabType = "feedback" | "extracted" | "skills" | "templates"

// export default function FeedbackTabs() {
//   const [activeTab, setActiveTab] = useState<TabType>("feedback")

//   const tabs: { id: TabType; label: string }[] = [
//     { id: "feedback", label: "Feedback & Suggestions" },
//     { id: "extracted", label: "Extracted Data" },
//     { id: "skills", label: "Skill Gap Analysis" },
//     { id: "templates", label: "Resume Builder" },
//   ]

//   const getCategoryIcon = (category: string) => {
//     switch (category) {
//       case "critical":
//         return <AlertCircle className="text-red-500" size={20} />
//       case "suggestion":
//         return <AlertTriangle className="text-amber-500" size={20} />
//       case "tip":
//         return <Info className="text-blue-500" size={20} />
//       default:
//         return null
//     }
//   }

//   const getCategoryColor = (category: string) => {
//     switch (category) {
//       case "critical":
//         return "bg-red-500/10 border-red-500/30"
//       case "suggestion":
//         return "bg-amber-500/10 border-amber-500/30"
//       case "tip":
//         return "bg-blue-500/10 border-blue-500/30"
//       default:
//         return ""
//     }
//   }

//   return (
//     <div className="glass rounded-2xl border border-border overflow-hidden">
//       {/* Tab Navigation */}
//       <div className="flex border-b border-border overflow-x-auto">
//         {tabs.map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id)}
//             className={`px-4 py-3 whitespace-nowrap text-sm font-medium transition-colors border-b-2 ${
//               activeTab === tab.id
//                 ? "border-primary text-primary"
//                 : "border-transparent text-muted-foreground hover:text-foreground"
//             }`}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* Tab Content */}
//       <div className="p-6">
//         {activeTab === "feedback" && (
//           <div className="space-y-4">
//             {feedbackData.map((item) => (
//               <div key={item.id} className={`rounded-lg border p-4 space-y-2 ${getCategoryColor(item.category)}`}>
//                 <div className="flex gap-3 items-start">
//                   <div className="flex-shrink-0 mt-0.5">{getCategoryIcon(item.category)}</div>
//                   <div className="flex-1">
//                     <h4 className="font-semibold text-foreground">{item.title}</h4>
//                     <p className="text-sm text-foreground/80">{item.description}</p>
//                   </div>
//                 </div>

//                 <div className="flex gap-2 ml-8">
//                   <HelpCircle size={16} className="text-muted-foreground flex-shrink-0 mt-0.5" />
//                   <p className="text-xs text-muted-foreground">
//                     <span className="font-semibold">Why this matters:</span> {item.reason}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {activeTab === "extracted" && (
//           <div className="space-y-6">
//             <div>
//               <h4 className="font-semibold text-foreground mb-3">Skills</h4>
//               <div className="flex flex-wrap gap-2">
//                 {["React", "TypeScript", "Node.js", "GraphQL", "PostgreSQL", "AWS"].map((skill) => (
//                   <div
//                     key={skill}
//                     className="bg-primary/10 border border-primary/30 rounded-full px-3 py-1 text-sm text-foreground"
//                   >
//                     {skill}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <h4 className="font-semibold text-foreground mb-3">Education</h4>
//               <p className="text-sm text-foreground">B.S. Computer Science - State University (2020)</p>
//             </div>

//             <div>
//               <h4 className="font-semibold text-foreground mb-3">Experience</h4>
//               <p className="text-sm text-foreground">Senior Frontend Engineer at TechCorp (2022-Present)</p>
//               <p className="text-sm text-foreground">Frontend Engineer at StartupXYZ (2020-2022)</p>
//             </div>
//           </div>
//         )}

//         {activeTab === "skills" && (
//           <div className="space-y-4">
//             <div>
//               <div className="flex justify-between mb-2">
//                 <span className="text-sm font-semibold text-foreground">React</span>
//                 <span className="text-sm text-muted-foreground">85% vs 90% target</span>
//               </div>
//               <div className="w-full bg-card rounded-full h-2 overflow-hidden">
//                 <div className="bg-gradient-to-r from-primary to-accent h-full" style={{ width: "85%" }} />
//               </div>
//             </div>

//             <div>
//               <div className="flex justify-between mb-2">
//                 <span className="text-sm font-semibold text-foreground">System Design</span>
//                 <span className="text-sm text-muted-foreground">65% vs 85% target</span>
//               </div>
//               <div className="w-full bg-card rounded-full h-2 overflow-hidden">
//                 <div className="bg-gradient-to-r from-primary to-accent h-full" style={{ width: "65%" }} />
//               </div>
//             </div>

//             <p className="text-sm text-muted-foreground mt-6">
//               <Lightbulb size={16} className="inline mr-2" />
//               Recommended resources for gaps appear below.
//             </p>
//           </div>
//         )}

//         {activeTab === "templates" && (
//           <div className="space-y-3">
//             <a href="#" className="block p-4 rounded-lg border border-border hover:bg-card/50 transition-colors">
//               <p className="font-semibold text-foreground">Explore Template Options</p>
//               <p className="text-sm text-muted-foreground">
//                 Browse professional resume templates tailored for tech roles
//               </p>
//             </a>

//             <a href="#" className="block p-4 rounded-lg border border-border hover:bg-card/50 transition-colors">
//               <p className="font-semibold text-foreground">Canva Resume Builder</p>
//               <p className="text-sm text-muted-foreground">Design your resume with Canva's drag-and-drop editor</p>
//             </a>

//             <a href="#" className="block p-4 rounded-lg border border-border hover:bg-card/50 transition-colors">
//               <p className="font-semibold text-foreground">Zety Resume Builder</p>
//               <p className="text-sm text-muted-foreground">
//                 Use Zety's AI-powered resume builder for optimized results
//               </p>
//             </a>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }






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





"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, Info, Lightbulb, Zap, Database, Copy, Check } from "lucide-react";

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
    { id: "feedback", label: "AI Analysis", icon: Zap },
    { id: "extracted", label: "Parsed Data", icon: Database },
    { id: "skills", label: "Skills Check", icon: Lightbulb },
  ];

  const handleCopy = (text: string) => {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-sm h-full flex flex-col items-center justify-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
        <div className="space-y-2">
            <p className="text-gray-900 font-semibold text-lg">Analyzing Resume...</p>
            <p className="text-gray-500 text-sm">Reviewing format, keywords, and impact.</p>
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
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden h-full flex flex-col">
      
      {/* Header Tabs */}
      <div className="flex border-b border-gray-100 bg-gray-50/50">
        {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-all relative ${
                    activeTab === tab.id
                        ? "text-indigo-600 bg-white shadow-sm ring-1 ring-black/5 z-10"
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-100/50"
                    }`}
                >
                    <Icon size={16} className={activeTab === tab.id ? "text-indigo-600" : "text-gray-400"} />
                    {tab.label}
                    {activeTab === tab.id && <div className="absolute top-0 left-0 w-full h-0.5 bg-indigo-600" />}
                </button>
            );
        })}
      </div>

      {/* Content Area */}
      <div className="p-6 md:p-8 flex-1 overflow-y-auto max-h-[600px] custom-scrollbar">
        
        {/* === TAB 1: FEEDBACK === */}
        {activeTab === "feedback" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            {strengths.length === 0 && improvements.length === 0 && genericFeedback.length === 0 ? (
               <div className="text-center py-12 text-gray-400">
                 <Info size={48} className="mx-auto mb-4 opacity-30" />
                 <p>Upload a resume to generate specific AI feedback.</p>
               </div>
            ) : (
              <>
                {/* Improvements (Priority) */}
                {improvements.length > 0 && (
                  <div className="bg-orange-50/50 rounded-xl p-5 border border-orange-100">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-orange-800 mb-4 flex items-center gap-2">
                      <AlertCircle size={18} /> Needs Attention
                    </h3>
                    <div className="space-y-3">
                      {improvements.map((item, i) => (
                        <div key={i} className="flex gap-3 text-sm text-gray-700">
                          <span className="text-orange-500 font-bold">•</span>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Strengths */}
                {strengths.length > 0 && (
                  <div className="bg-green-50/50 rounded-xl p-5 border border-green-100">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-green-800 mb-4 flex items-center gap-2">
                      <CheckCircle2 size={18} /> Key Strengths
                    </h3>
                    <div className="space-y-3">
                      {strengths.map((item, i) => (
                        <div key={i} className="flex gap-3 text-sm text-gray-700">
                          <span className="text-green-500 font-bold">✓</span>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Generic / Other Feedback */}
                {genericFeedback.length > 0 && improvements.length === 0 && strengths.length === 0 && (
                   <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-600 mb-4">Summary</h3>
                        <ul className="list-disc pl-4 space-y-2 text-sm text-gray-600">
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
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400">Experience</h4>
                    </div>
                    <div className="space-y-6">
                        {experience.map((exp, i) => (
                            <div key={i} className="relative pl-6 border-l-2 border-gray-200 hover:border-indigo-300 transition-colors">
                                <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-gray-200 ring-4 ring-white" />
                                <h5 className="font-bold text-gray-900">{exp.title}</h5>
                                <div className="text-indigo-600 text-sm font-medium mb-1">
                                    {exp.company} <span className="text-gray-400 font-normal">• {exp.duration}</span>
                                </div>
                                <p className="text-sm text-gray-600 leading-relaxed mt-2">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full h-px bg-gray-100 my-6" />

                {/* Education Block */}
                <div>
                     <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Education</h4>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {education.map((edu, i) => (
                            <div key={i} className="p-4 rounded-xl border border-gray-200 bg-gray-50/50">
                                <h5 className="font-bold text-gray-900">{edu.degree}</h5>
                                <p className="text-sm text-gray-600">{edu.institution}</p>
                                <p className="text-xs text-gray-400 mt-2 font-mono bg-white inline-block px-2 py-1 rounded border border-gray-200">{edu.year}</p>
                            </div>
                        ))}
                     </div>
                </div>
                </>
            ) : (
                <div className="text-center py-10 text-gray-400">
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
                    <div className="flex justify-between items-start mb-6 bg-blue-50 p-4 rounded-xl border border-blue-100">
                        <div className="flex gap-3">
                            <Lightbulb className="text-blue-600 shrink-0 mt-0.5" size={18} />
                            <div>
                                <h4 className="font-bold text-blue-900 text-sm">Skills Detected</h4>
                                <p className="text-xs text-blue-700 mt-1">These keywords were successfully parsed from your document.</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => handleCopy(skills.join(", "))}
                            className="text-blue-600 hover:bg-blue-100 p-1.5 rounded-lg transition-colors"
                            title="Copy all skills"
                        >
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill, i) => (
                            <span key={i} className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg shadow-sm">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-center py-10 text-gray-400">
                    <p>No skills detected.</p>
                </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}