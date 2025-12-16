
// "use client";

// import { useState, useEffect } from "react";
// import {
//   Loader2, CheckCircle, BookOpen, Rocket,
//   ExternalLink, Zap, Youtube, Github, Book, FileText, Video,
//   Search, GraduationCap, MonitorPlay
// } from "lucide-react";

// const API_URL = "http://localhost:5000/api";

// // --- INTERFACES ---
// interface RoadmapResource {
//   title: string;
//   type: string;
//   url?: string;
// }

// interface RoadmapStep {
//   step: number;
//   title: string;
//   description: string;
//   duration?: string;
//   items?: string[]; // Old format (Skills list)
//   resources?: RoadmapResource[]; // New format (Specific links)
// }

// // --- LINK GENERATORS ---
// const getSearchLink = (term: string, type: 'video' | 'book' | 'course') => {
//   const query = encodeURIComponent(term);
//   switch (type) {
//     case 'video': return `https://www.youtube.com/results?search_query=${query}+tutorial`;
//     case 'book': return `https://www.google.com/search?tbm=bks&q=${query}`;
//     case 'course': return `https://www.udemy.com/courses/search/?q=${query}`;
//     default: return `https://www.google.com/search?q=${query}`;
//   }
// };

// const getDynamicLink = (res: RoadmapResource) => {
//   if (res.url) return res.url;
//   return getSearchLink(res.title, res.type as any);
// };

// // --- COMPONENTS ---
// const Card = ({ className, children }: any) => (
//   <div className={`bg-white rounded-xl border border-gray-200 shadow-sm ${className}`}>{children}</div>
// );

// const RoleInput = ({ value, onChange, placeholder }: any) => (
//   <div className="relative w-full">
//     <input
//       type="text"
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       placeholder={placeholder}
//       className="w-full bg-white border border-gray-300 text-gray-900 py-2.5 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
//     />
//   </div>
// );

// export default function RoadmapPage() {
//   const [loading, setLoading] = useState(true);
//   const [generating, setGenerating] = useState(false);
//   const [roadmapSteps, setRoadmapSteps] = useState<RoadmapStep[]>([]);
//   const [selectedRole, setSelectedRole] = useState("Full Stack Developer");

//   useEffect(() => {
//     fetchRoadmap();
//   }, []);

//   const fetchRoadmap = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) { setLoading(false); return; }

//       const res = await fetch(`${API_URL}/roadmap`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();

//       // Handle both data structures safely
//       if (data.success && data.data && data.data.length > 0) {
//         const latest = data.data[0];
//         setRoadmapSteps(latest.roadmap || latest.steps || []);
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGenerate = async () => {
//     setGenerating(true);
//     try {
//       const token = localStorage.getItem("token");
//       const res = await fetch(`${API_URL}/roadmap/generate`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ role: selectedRole })
//       });
//       const data = await res.json();
//       if (data.success) {
//         setRoadmapSteps(data.data.roadmap || data.data);
//       }
//     } catch (err) {
//       alert("Failed to generate roadmap");
//     } finally {
//       setGenerating(false);
//     }
//   };

//   if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;

//   return (
//     <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex p-4 md:p-8">
//       <main className="flex-1 max-w-5xl mx-auto w-full space-y-8">

//         {/* Header */}
//         <div className="space-y-4">
//           <div className="px-2 md:px-0 border-b border-gray-200 pb-6">
//             <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">Your AI-Powered Growth Roadmap</h1>
//             <p className="text-gray-500">Interactive, personalized career path based on your resume history.</p>
//           </div>
//           <Card className="p-4 flex gap-4">
//             <RoleInput value={selectedRole} onChange={setSelectedRole} placeholder="Enter Job Role (e.g. MERN Stack)" />
//             <button
//               onClick={handleGenerate}
//               disabled={generating}
//               className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
//             >
//               {generating ? <Loader2 className="animate-spin" size={18} /> : <Rocket size={18} />}
//               Generate
//             </button>
//           </Card>
//         </div>

//         {/* Roadmap Steps */}
//         <div className="space-y-6 relative">
//           {roadmapSteps.length > 0 ? roadmapSteps.map((step, i) => (
//             <div key={i} className="flex gap-4 md:gap-6 group">
//               {/* Vertical Line */}
//               <div className="flex flex-col items-center">
//                 <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold z-10 ${i === 0 ? 'bg-green-600 text-white' : 'bg-white border-2 border-blue-600 text-blue-600'}`}>
//                   {i + 1}
//                 </div>
//                 {i !== roadmapSteps.length - 1 && <div className="w-0.5 flex-1 bg-gray-200 my-2 group-hover:bg-blue-200 transition-colors"></div>}
//               </div>

//               {/* Step Content */}
//               <Card className="flex-1 p-6">
//                 <div className="mb-4">
//                   <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
//                   <p className="text-gray-500 mt-1">{step.description}</p>
//                   {step.duration && (
//                     <span className="inline-block mt-2 text-xs font-semibold bg-blue-50 text-blue-700 px-2 py-1 rounded">
//                       ⏱ {step.duration}
//                     </span>
//                   )}
//                 </div>

//                 {/* --- FALLBACK: SKILL BUTTONS (If specific resources are missing) --- */}
//                 {step.items && (!step.resources || step.resources.length === 0) && (
//                   <div className="flex flex-wrap gap-2 mt-4">
//                     {step.items.map((skill, idx) => (
//                       <a
//                         key={idx}
//                         href={getSearchLink(skill, 'video')}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="px-3 py-1.5 rounded-full border bg-gray-50 hover:bg-white hover:border-red-300 hover:text-red-600 transition-all text-sm font-medium flex items-center gap-2 cursor-pointer"
//                       >
//                         {skill} <Youtube size={14} />
//                       </a>
//                     ))}
//                   </div>
//                 )}

//                 {/* --- NEW: SPECIFIC RESOURCES (Best Quality) --- */}
//                 {step.resources && step.resources.length > 0 && (
//                   <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
//                     {step.resources.map((res, idx) => (
//                       <a
//                         key={idx}
//                         href={getDynamicLink(res)}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-blue-300 hover:bg-blue-50/50 transition-all bg-gray-50/50"
//                       >
//                         <div className="bg-white p-2 rounded-md shadow-sm text-blue-600">
//                           {res.type === 'video' ? <Youtube className="text-red-600" /> :
//                             res.type === 'book' ? <Book className="text-orange-600" /> :
//                               <MonitorPlay className="text-indigo-600" />}
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <p className="text-sm font-medium text-gray-900 truncate">{res.title}</p>
//                           <p className="text-xs text-gray-500 capitalize flex items-center gap-1">
//                             {res.type} <ExternalLink size={10} />
//                           </p>
//                         </div>
//                       </a>
//                     ))}
//                   </div>
//                 )}
//               </Card>
//             </div>
//           )) : (
//             <div className="text-center py-12 text-gray-500 border-2 border-dashed rounded-xl">
//               <Rocket size={48} className="mx-auto text-gray-300 mb-4" />
//               <p>Enter your dream role above and click Generate to start your journey.</p>
//             </div>
//           )}
//         </div>

//       </main>
//     </div>
//   );
// }






"use client";

import { useState, useEffect } from "react";
import { 
  Loader2, CheckCircle, BookOpen, Rocket, 
  ExternalLink, Youtube, Book, MonitorPlay
} from "lucide-react";

const API_URL = "http://localhost:5000/api";

// --- INTERFACES ---
interface RoadmapResource { title: string; type: string; url?: string; }
interface RoadmapStep { step: number; title: string; description: string; duration?: string; items?: string[]; resources?: RoadmapResource[]; }

// --- LINK GENERATORS ---
const getSearchLink = (term: string, type: 'video' | 'book' | 'course') => {
  const query = encodeURIComponent(term);
  switch (type) {
    case 'video': return `https://www.youtube.com/results?search_query=${query}+tutorial`;
    case 'book': return `https://www.google.com/search?tbm=bks&q=${query}`;
    case 'course': return `https://www.udemy.com/courses/search/?q=${query}`;
    default: return `https://www.google.com/search?q=${query}`;
  }
};

const getDynamicLink = (res: RoadmapResource) => {
  if (res.url) return res.url;
  return getSearchLink(res.title, res.type as any);
};

// --- COMPONENTS ---
const Card = ({ className, children }: any) => (
  // ✅ FIX: Added dark mode classes for card background and border
  <div className={`bg-white dark:bg-card dark:border-border rounded-xl border border-gray-200 shadow-sm ${className}`}>{children}</div>
);

const RoleInput = ({ value, onChange, placeholder }: any) => (
  <div className="relative w-full">
    {/* ✅ FIX: Added dark mode classes for input */}
    <input 
      type="text"
      value={value} 
      onChange={(e) => onChange(e.target.value)} 
      placeholder={placeholder}
      className="w-full bg-white dark:bg-muted/30 border border-gray-300 dark:border-border text-gray-900 dark:text-foreground py-2.5 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
    />
  </div>
);

export default function RoadmapPage() {
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [roadmapSteps, setRoadmapSteps] = useState<RoadmapStep[]>([]);
  const [selectedRole, setSelectedRole] = useState("Full Stack Developer");
  
  useEffect(() => {
    fetchRoadmap();
  }, []);

  const fetchRoadmap = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) { setLoading(false); return; }

      const res = await fetch(`${API_URL}/roadmap`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      
      if (data.success && data.data && data.data.length > 0) {
        const latest = data.data[0];
        setRoadmapSteps(latest.roadmap || latest.steps || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/roadmap/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ role: selectedRole })
      });
      const data = await res.json();
      if (data.success) {
        setRoadmapSteps(data.data.roadmap || data.data);
      }
    } catch (err) {
      alert("Failed to generate roadmap");
    } finally {
      setGenerating(false);
    }
  };

  // ✅ FIX: Background color for loading state
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-background"><Loader2 className="animate-spin dark:text-white" /></div>;

  return (
    // ✅ FIX: Main container background and text color
    <div className="min-h-screen bg-gray-50 dark:bg-background text-gray-900 dark:text-foreground font-sans flex p-4 md:p-8">
      <main className="flex-1 max-w-5xl mx-auto w-full space-y-8">
        
        {/* Header */}
        <div className="space-y-4">
          <div className="px-2 md:px-0 border-b border-gray-200 dark:border-border pb-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white">Your AI-Powered Growth Roadmap</h1>
            <p className="text-gray-500 dark:text-muted-foreground">Interactive, personalized career path based on your resume history.</p>
          </div>
          <Card className="p-4 flex gap-4">
            <RoleInput value={selectedRole} onChange={setSelectedRole} placeholder="Enter Job Role (e.g. MERN Stack)" />
            <button 
                onClick={handleGenerate} 
                disabled={generating}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
            >
                {generating ? <Loader2 className="animate-spin" size={18}/> : <Rocket size={18}/>}
                Generate
            </button>
          </Card>
        </div>

        {/* Roadmap Steps */}
        <div className="space-y-6 relative">
            {roadmapSteps.length > 0 ? roadmapSteps.map((step, i) => (
                <div key={i} className="flex gap-4 md:gap-6 group">
                    {/* Vertical Line */}
                    <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold z-10 ${i === 0 ? 'bg-green-600 text-white' : 'bg-white dark:bg-muted border-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400'}`}>
                            {i + 1}
                        </div>
                        {i !== roadmapSteps.length - 1 && <div className="w-0.5 flex-1 bg-gray-200 dark:bg-border my-2 group-hover:bg-blue-200 transition-colors"></div>}
                    </div>

                    {/* Step Content */}
                    <Card className="flex-1 p-6">
                        <div className="mb-4">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{step.title}</h3>
                            <p className="text-gray-500 dark:text-gray-400 mt-1">{step.description}</p>
                            {step.duration && (
                                <span className="inline-block mt-2 text-xs font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
                                    ⏱ {step.duration}
                                </span>
                            )}
                        </div>

                        {/* --- FALLBACK: SKILL BUTTONS --- */}
                        {step.items && (!step.resources || step.resources.length === 0) && (
                           <div className="flex flex-wrap gap-2 mt-4">
                              {step.items.map((skill, idx) => (
                                <a 
                                  key={idx}
                                  href={getSearchLink(skill, 'video')}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="px-3 py-1.5 rounded-full border dark:border-gray-700 bg-gray-50 dark:bg-secondary hover:bg-white dark:hover:bg-secondary/80 hover:border-red-300 hover:text-red-600 transition-all text-sm font-medium flex items-center gap-2 cursor-pointer dark:text-gray-300"
                                >
                                  {skill} <Youtube size={14} />
                                </a>
                              ))}
                           </div>
                        )}

                        {/* --- NEW: SPECIFIC RESOURCES --- */}
                        {step.resources && step.resources.length > 0 && (
                            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                                {step.resources.map((res, idx) => (
                                    <a 
                                        key={idx}
                                        href={getDynamicLink(res)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-blue-300 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-all bg-gray-50/50 dark:bg-secondary/20"
                                    >
                                        <div className="bg-white dark:bg-muted p-2 rounded-md shadow-sm text-blue-600 dark:text-blue-400">
                                            {res.type === 'video' ? <Youtube className="text-red-600"/> : 
                                             res.type === 'book' ? <Book className="text-orange-600"/> : 
                                             <MonitorPlay className="text-indigo-600 dark:text-indigo-400"/>}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{res.title}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize flex items-center gap-1">
                                              {res.type} <ExternalLink size={10} />
                                            </p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        )}
                    </Card>
                </div>
            )) : (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400 border-2 border-dashed dark:border-gray-800 rounded-xl">
                    <Rocket size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4"/>
                    <p>Enter your dream role above and click Generate to start your journey.</p>
                </div>
            )}
        </div>

      </main>
    </div>
  );
}