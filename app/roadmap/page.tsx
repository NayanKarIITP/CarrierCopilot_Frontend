
// "use client";

// import { useState, useEffect } from "react";
// import { 
//   Loader2, CheckCircle, AlertTriangle, BookOpen, Hammer, Rocket, ChevronDown, 
//   LayoutGrid, FileText, Mic, Map, TrendingUp, Settings, User 
// } from "lucide-react";

// // --- CONSTANTS ---
// const API_URL = "http://localhost:5000/api";

// // --- INLINE COMPONENTS (Sidebar & UI) ---

// // 1. SIDEBAR
// const Sidebar = () => (
//   <aside className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-6 h-screen sticky top-0">
//     <div className="mb-8">
//         <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary/20">
//             CC
//         </div>
//     </div>

//     <nav className="flex-1 flex flex-col gap-6 w-full px-4">
//         <NavItem icon={<LayoutGrid size={20} />} label="Dashboard" href="/dashboard" />
//         <NavItem icon={<FileText size={20} />} label="Resume" href="/resume" />
//         <NavItem icon={<Mic size={20} />} label="Interview" href="/interviewer" />
//         <NavItem icon={<Map size={20} />} label="Roadmap" active />
//         <NavItem icon={<TrendingUp size={20} />} label="Trends" href="/trends" />
//     </nav>

//     <div className="mt-auto flex flex-col gap-6 w-full px-4">
//         <NavItem icon={<Settings size={20} />} label="Settings" href="/settings" />
//         <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 border border-gray-200 cursor-pointer">
//             <User size={20} />
//         </div>
//     </div>
//   </aside>
// );

// const NavItem = ({ icon, label, active, href }: any) => (
//     <a 
//         href={href || "#"}
//         className={`p-3 rounded-xl flex justify-center transition-all duration-200 group relative ${
//             active 
//             ? "bg-primary text-white shadow-md shadow-primary/30" 
//             : "text-gray-400 hover:bg-gray-50 hover:text-primary"
//         }`}
//         title={label}
//     >
//         {icon}
//     </a>
// );

// // 2. UI Components
// const Card = ({ className, children }: any) => (
//   <div className={`bg-white rounded-xl border border-gray-200 shadow-sm ${className}`}>
//     {children}
//   </div>
// );

// const Button = ({ children, onClick, disabled, className, variant = "primary" }: any) => {
//   const baseStyle = "px-4 py-2 rounded-lg font-medium transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2";
//   const variants = {
//     primary: "bg-primary text-white hover:bg-primary/90 shadow-sm",
//     outline: "border border-gray-200 hover:bg-gray-50 text-gray-700",
//     ghost: "hover:bg-gray-100 text-gray-600"
//   };
//   return (
//     <button 
//       onClick={onClick} 
//       disabled={disabled} 
//       className={`${baseStyle} ${variants[variant as keyof typeof variants]} ${className}`}
//     >
//       {children}
//     </button>
//   );
// };

// const Select = ({ value, onChange, options, placeholder }: any) => (
//   <div className="relative w-full">
//     <select
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-2.5 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
//     >
//       {options.map((opt: any) => (
//         <option key={opt.value} value={opt.value}>{opt.label}</option>
//       ))}
//     </select>
//     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
//       <ChevronDown size={16} />
//     </div>
//   </div>
// );

// // Helper to style steps
// const getStepStyle = (index: number, title: string = "") => {
//     const typeLower = title.toLowerCase();

//     if (index === 0 || typeLower.includes("foundation") || typeLower.includes("current") || typeLower.includes("skill")) {
//         return { icon: <CheckCircle />, color: "bg-green-100 text-green-700" };
//     }
//     if (typeLower.includes("gap") || typeLower.includes("acquire") || typeLower.includes("missing")) {
//         return { icon: <AlertTriangle />, color: "bg-amber-100 text-amber-700" };
//     }
//     if (typeLower.includes("project") || typeLower.includes("build") || typeLower.includes("hands-on")) {
//         return { icon: <Hammer />, color: "bg-purple-100 text-purple-700" };
//     }
//     if (index === 4 || typeLower.includes("goal") || typeLower.includes("role") || typeLower.includes("next")) {
//         return { icon: <Rocket />, color: "bg-indigo-100 text-indigo-700" };
//     }
//     return { icon: <BookOpen />, color: "bg-blue-100 text-blue-700" };
// };

// export default function RoadmapPage() {
//   const [loading, setLoading] = useState(true);
//   const [generating, setGenerating] = useState(false);
//   const [roadmapSteps, setRoadmapSteps] = useState<any[]>([]);
//   const [selectedRole, setSelectedRole] = useState("Senior Full-Stack Developer");

//   const targetRoles = [
//     { value: "Senior Full-Stack Developer", label: "Senior Full-Stack Developer" },
//     { value: "Data Scientist", label: "Data Scientist" },
//     { value: "DevOps Engineer", label: "DevOps Engineer" },
//     { value: "AI/ML Engineer", label: "AI/ML Engineer" },
//     { value: "Product Manager", label: "Product Manager" },
//   ];

//   // 1. Fetch Roadmap on Load
//   useEffect(() => {
//     fetchRoadmap();
//   }, []);

//   const fetchRoadmap = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//           setLoading(false);
//           return;
//       }

//       const res = await fetch(`${API_URL}/roadmap`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const data = await res.json();

//       if (data.success && data.data && data.data.length > 0) {
//         const latest = data.data[0];
//         setSelectedRole(latest.targetRole || "Senior Full-Stack Developer");

//         const steps = latest.steps || [];
//         setRoadmapSteps(steps);
//       }
//     } catch (err) {
//       console.error("Roadmap fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 2. Generate New Roadmap
//   const handleGenerateRoadmap = async () => {
//       setGenerating(true);
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) return alert("Please log in to generate a roadmap.");

//         const res = await fetch(`${API_URL}/roadmap/generate`, {
//             method: "POST",
//             headers: { 
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}` 
//             },
//             body: JSON.stringify({ role: selectedRole })
//         });

//         const data = await res.json();

//         if (data.success) {
//             let newSteps = [];
//             const raw = data.data.roadmap;

//             if (Array.isArray(raw)) newSteps = raw;
//             else if (raw?.steps) newSteps = raw.steps;
//             else if (raw?.roadmap) newSteps = raw.roadmap;

//             setRoadmapSteps(newSteps);
//         } else {
//             alert("Failed to generate roadmap. Please try again.");
//         }

//       } catch (err) {
//           console.error("Generation error:", err);
//           alert("Error connecting to server.");
//       } finally {
//           setGenerating(false);
//       }
//   };

//   if (loading) {
//       return (
//           <div className="min-h-screen flex items-center justify-center bg-gray-50">
//               <div className="flex flex-col items-center gap-4">
//                   <Loader2 className="animate-spin text-primary" size={48} />
//                   <p className="text-gray-500 font-medium">Loading your career path...</p>
//               </div>
//           </div>
//       );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex">
//       {/* ✅ SIDEBAR LAYOUT */}
//       <Sidebar />

//       <main className="flex-1 p-8 overflow-y-auto h-screen">
//         <div className="max-w-7xl mx-auto w-full space-y-10">

//           {/* Header */}
//           <div className="px-2 md:px-0 border-b border-gray-200 pb-6">
//             <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">
//               Your AI-Powered Growth Roadmap
//             </h1>
//             <p className="text-gray-500 text-sm md:text-base">
//               A personalized plan to help you achieve your career goals.
//             </p>
//           </div>

//           {/* Target Role Selector */}
//           <Card className="p-6 bg-white">
//             <h2 className="text-lg md:text-xl font-bold mb-4 text-gray-800">Target Role</h2>
//             <div className="flex flex-col md:flex-row gap-4 md:items-center">
//               <div className="w-full md:w-72">
//                 <Select 
//                     value={selectedRole} 
//                     onChange={setSelectedRole} 
//                     options={targetRoles} 
//                     placeholder="Select your target role"
//                 />
//               </div>

//               <Button 
//                 onClick={handleGenerateRoadmap} 
//                 disabled={generating}
//                 className="w-full md:w-auto px-8 min-w-[180px]"
//               >
//                 {generating ? (
//                     <>
//                         <Loader2 className="animate-spin" size={18} /> Generating...
//                     </>
//                 ) : (
//                     <>
//                         <Rocket size={18} /> Apply Roadmap
//                     </>
//                 )}
//               </Button>
//             </div>
//           </Card>

//           {/* Timeline */}
//           <h2 className="text-xl md:text-2xl font-bold px-2 md:px-0 text-gray-800">
//             Your Personalized Roadmap
//           </h2>

//           {roadmapSteps.length === 0 ? (
//              <div className="p-12 text-center border-2 border-dashed border-gray-300 rounded-xl bg-white">
//                 <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
//                     <Map size={32} />
//                 </div>
//                 <p className="text-gray-500 mb-4 font-medium">No roadmap found. Select a role above and click Apply.</p>
//              </div>
//           ) : (
//             <div className="relative space-y-8 pb-12">
//                 {roadmapSteps.map((step, i) => {
//                     const style = getStepStyle(i, step.title || step.step_type);

//                     return (
//                     <div key={i} className="relative group">
//                         {/* Connecting Line */}
//                         {i !== roadmapSteps.length - 1 && (
//                             <div className="hidden md:block absolute left-8 top-16 bottom-[-2rem] w-0.5 bg-gray-200 z-0" />
//                         )}

//                         <div className="p-6 relative overflow-visible z-10 transition-all duration-300 hover:translate-x-1">
//                             {/* Icon Bubble */}
//                             <div
//                             className={`absolute -left-3 md:-left-6 top-6 w-12 h-12 rounded-xl 
//                             ${style.color} flex items-center justify-center 
//                             border-4 border-gray-50 shadow-sm z-20 transition-transform group-hover:scale-110`}
//                             >
//                             {style.icon}
//                             </div>

//                             <Card className="ml-8 md:ml-10 hover:shadow-md transition-shadow border-l-4" style={{ borderLeftColor: 'var(--tw-color-primary)' }}>
//                                 <div className="p-6">
//                                     <div className="flex justify-between items-start mb-2">
//                                         <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
//                                         <span className="text-xs font-bold uppercase tracking-wider text-gray-400 bg-gray-100 px-2 py-1 rounded">
//                                             Step {i + 1}
//                                         </span>
//                                     </div>

//                                     <p className="text-sm text-gray-500 mb-6 leading-relaxed">
//                                         {step.description || step.subtitle || "Key actions for this stage."}
//                                     </p>

//                                     {/* Render Items */}
//                                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
//                                         {step.items && Array.isArray(step.items) && step.items.map((item: any, idx: number) => {
//                                             // CASE 1: Simple String Item
//                                             if (typeof item === 'string') {
//                                                 return (
//                                                     <div key={idx} className="bg-gray-50 p-3 rounded-lg text-sm font-medium text-gray-700 border border-gray-100 flex items-center gap-2">
//                                                         <div className="w-1.5 h-1.5 rounded-full bg-primary/60"></div>
//                                                         {item}
//                                                     </div>
//                                                 );
//                                             }
//                                             // CASE 2: Object Item (Course/Role)
//                                             return (
//                                                 <div key={idx} className="bg-white p-4 rounded-lg border border-gray-200 hover:border-primary/40 hover:shadow-sm transition-all group/item cursor-default">
//                                                     <h4 className="font-bold text-sm text-gray-800 mb-1 group-hover/item:text-primary transition-colors">
//                                                         {item.title || item.name || "Resource"}
//                                                     </h4>
//                                                     {item.platform && (
//                                                         <div className="flex items-center gap-1 text-xs text-gray-500">
//                                                             <BookOpen size={12} /> {item.platform}
//                                                         </div>
//                                                     )}
//                                                     {item.company && (
//                                                         <p className="text-xs text-gray-500 mt-1 font-medium">
//                                                             {item.company} <span className="text-green-600 bg-green-50 px-1 rounded ml-1">{item.match}</span>
//                                                         </p>
//                                                     )}
//                                                 </div>
//                                             );
//                                         })}
//                                     </div>
//                                 </div>
//                             </Card>
//                         </div>
//                     </div>
//                     );
//                 })}
//             </div>
//           )}

//         </div>
//       </main>
//     </div>
//   );
// }









// "use client";

// import { useState, useEffect } from "react";
// import { 
//   Loader2, CheckCircle, AlertTriangle, BookOpen, Hammer, Rocket, ChevronDown, 
//   LayoutGrid, FileText, Mic, Map, TrendingUp, Settings, User, ExternalLink, Zap,
//   Search, Youtube, Github, Linkedin
// } from "lucide-react";

// // --- CONSTANTS ---
// const API_URL = "http://localhost:5000/api";

// // --- INTERFACES ---
// interface RoadmapItem {
//   title?: string;
//   name?: string;
//   platform?: string;
//   company?: string;
//   match?: string;
//   link?: string; // URL from backend
//   [key: string]: any;
// }

// interface RoadmapStep {
//   step: number;
//   title: string;
//   subtitle?: string;
//   description?: string;
//   icon?: string;
//   color?: string;
//   textColor?: string;
//   type: "skills" | "gaps" | "courses" | "projects" | "roles" | string;
//   items: (string | RoadmapItem)[];
// }

// // --- SMART LINK GENERATOR ---
// // This function makes every item clickable by generating a relevant URL
// const getSmartLink = (item: string | RoadmapItem, type: string) => {
//   // 1. If backend provided a specific link, use it
//   if (typeof item !== 'string' && item.link) return item.link;

//   // 2. Extract text for search
//   const text = typeof item === 'string' ? item : (item.title || item.name || "Technology");
//   const encoded = encodeURIComponent(text);

//   // 3. Generate "Real World" Search Links based on category
//   switch (type) {
//     case "skills": // Link to YouTube Crash Courses
//       return `https://www.youtube.com/results?search_query=${encoded}+crash+course`;
//     case "gaps": // Link to Tutorials
//       return `https://www.youtube.com/results?search_query=learn+${encoded}+fast`;
//     case "courses": // Link to Course Platforms
//       return `https://www.udemy.com/courses/search/?q=${encoded}`;
//     case "projects": // Link to GitHub Code
//       return `https://github.com/search?q=${encoded}&type=repositories`;
//     case "roles": // Link to Jobs
//       return `https://www.linkedin.com/jobs/search/?keywords=${encoded}`;
//     default:
//       return `https://www.google.com/search?q=${encoded}`;
//   }
// };

// // --- INLINE COMPONENTS ---



// const NavItem = ({ icon, label, active, href }: any) => (
//     <a href={href || "#"} className={`p-3 rounded-xl flex justify-center transition-all duration-200 group relative ${active ? "bg-blue-600 text-white shadow-md shadow-blue-600/30" : "text-gray-400 hover:bg-gray-50 hover:text-blue-600"}`} title={label}>{icon}</a>
// );

// const Card = ({ className, children, style }: any) => (
//   <div className={`bg-white rounded-xl border border-gray-200 shadow-sm ${className}`} style={style}>{children}</div>
// );

// const Button = ({ children, onClick, disabled, className, variant = "primary" }: any) => {
//   const baseStyle = "px-4 py-2 rounded-lg font-medium transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2";
//   const variants = {
//     primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
//     outline: "border border-gray-200 hover:bg-gray-50 text-gray-700",
//     ghost: "hover:bg-gray-100 text-gray-600"
//   };
//   return <button onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant as keyof typeof variants]} ${className}`}>{children}</button>;
// };

// const Select = ({ value, onChange, options }: any) => (
//   <div className="relative w-full">
//     <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-2.5 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all cursor-pointer">
//       {options.map((opt: any) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
//     </select>
//     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"><ChevronDown size={16} /></div>
//   </div>
// );

// const getStepStyle = (index: number, title: string = "") => {
//     const typeLower = title.toLowerCase();
//     if (index === 0 || typeLower.includes("foundation") || typeLower.includes("current")) return { icon: <CheckCircle />, color: "bg-green-100 text-green-700" };
//     if (typeLower.includes("gap") || typeLower.includes("acquire")) return { icon: <AlertTriangle />, color: "bg-amber-100 text-amber-700" };
//     if (typeLower.includes("project") || typeLower.includes("build")) return { icon: <Hammer />, color: "bg-purple-100 text-purple-700" };
//     if (index === 4 || typeLower.includes("goal") || typeLower.includes("role")) return { icon: <Rocket />, color: "bg-indigo-100 text-indigo-700" };
//     return { icon: <BookOpen />, color: "bg-blue-100 text-blue-700" };
// };

// // --- MAIN PAGE COMPONENT ---

// export default function RoadmapPage() {
//   const [loading, setLoading] = useState(true);
//   const [generating, setGenerating] = useState(false);
//   const [roadmapSteps, setRoadmapSteps] = useState<RoadmapStep[]>([]);
//   const [selectedRole, setSelectedRole] = useState("Senior Full-Stack Developer");
//   // New State for User Level (Basic/Mid/Advanced)
//   const [userLevel, setUserLevel] = useState<string | null>(null);

//   const targetRoles = [
//     { value: "Senior Full-Stack Developer", label: "Senior Full-Stack Developer" },
//     { value: "Data Scientist", label: "Data Scientist" },
//     { value: "DevOps Engineer", label: "DevOps Engineer" },
//     { value: "AI/ML Engineer", label: "AI/ML Engineer" },
//     { value: "Product Manager", label: "Product Manager" },
//   ];

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
//       if (data.success && data.data && data.data.length > 0) {
//         const latest = data.data[0];
//         setSelectedRole(latest.targetRole || "Senior Full-Stack Developer");
//         const steps = latest.steps || latest.roadmap || [];
//         setRoadmapSteps(steps);
//         // Load level if saved
//         if (latest.level) setUserLevel(latest.level);
//       }
//     } catch (err) {
//       console.error("Roadmap fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGenerateRoadmap = async () => {
//       setGenerating(true);
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) return alert("Please log in.");

//         const res = await fetch(`${API_URL}/roadmap/generate`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//             body: JSON.stringify({ role: selectedRole })
//         });

//         const data = await res.json();
//         if (data.success) {
//             const resultData = data.data.roadmap || data.data; 
//             let newSteps = [];

//             if (Array.isArray(resultData)) newSteps = resultData;
//             else if (resultData?.roadmap) newSteps = resultData.roadmap;

//             // Set User Level based on Backend Calculation (Resume analysis)
//             if (resultData?.level) setUserLevel(resultData.level);
//             else if (data.data.level) setUserLevel(data.data.level);

//             setRoadmapSteps(newSteps);
//         } else {
//             alert(data.message || "Failed.");
//         }
//       } catch (err) {
//           console.error("Error:", err);
//       } finally {
//           setGenerating(false);
//       }
//   };

//   if (loading) {
//       return (
//           <div className="min-h-screen flex items-center justify-center bg-gray-50">
//               <Loader2 className="animate-spin text-blue-600" size={48} />
//           </div>
//       );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex">
//       <main className="flex-1 p-4 md:p-8 overflow-y-auto h-screen">
//         <div className="max-w-7xl mx-auto w-full space-y-10">

//           <div className="px-2 md:px-0 border-b border-gray-200 pb-6">
//             <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">Your AI-Powered Growth Roadmap</h1>
//             <p className="text-gray-500">Interactive, personalized career path based on your resume history.</p>
//           </div>

//           <Card className="p-6 bg-white">
//             <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-lg md:text-xl font-bold text-gray-800">Target Role</h2>

//                 {/* --- LEVEL BADGE --- */}
//                 {userLevel && (
//                     <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border flex items-center gap-2 shadow-sm animate-in fade-in zoom-in
//                         ${userLevel === 'Advanced' ? 'bg-purple-100 text-purple-700 border-purple-200' : 
//                           userLevel === 'Intermediate' ? 'bg-blue-100 text-blue-700 border-blue-200' : 
//                           'bg-green-100 text-green-700 border-green-200'}`}>
//                         <Zap size={14} className="fill-current" /> 
//                         <span>Current Level: {userLevel}</span>
//                     </div>
//                 )}
//             </div>

//             <div className="flex flex-col md:flex-row gap-4 md:items-center">
//               <div className="w-full md:w-72">
//                 <Select value={selectedRole} onChange={setSelectedRole} options={targetRoles} />
//               </div>
//               <Button onClick={handleGenerateRoadmap} disabled={generating} className="w-full md:w-auto px-8 min-w-[180px]">
//                 {generating ? <><Loader2 className="animate-spin" size={18} /> Generating...</> : <><Rocket size={18} /> Apply Roadmap</>}
//               </Button>
//             </div>
//           </Card>

//           {roadmapSteps.length === 0 ? (
//              <div className="p-12 text-center border-2 border-dashed border-gray-300 rounded-xl bg-white">
//                 <Map size={32} className="mx-auto mb-4 text-gray-400"/>
//                 <p className="text-gray-500">No roadmap found. Select a role above and click Apply.</p>
//              </div>
//           ) : (
//             <div className="relative space-y-8 pb-12">
//                 {roadmapSteps.map((step, i) => {
//                     const style = getStepStyle(i, step.title || step.type);
//                     return (
//                     <div key={i} className="relative group">
//                         {i !== roadmapSteps.length - 1 && (
//                             <div className="hidden md:block absolute left-8 top-16 bottom-[-2rem] w-0.5 bg-gray-200 z-0" />
//                         )}
//                         <div className="p-4 md:p-6 relative z-10">
//                             <div className={`absolute -left-2 md:-left-6 top-6 w-12 h-12 rounded-xl ${style.color} flex items-center justify-center border-4 border-gray-50 shadow-sm z-20`}>
//                                 {style.icon}
//                             </div>
//                             <Card className="ml-8 md:ml-10 border-l-4 hover:shadow-lg transition-all duration-300" style={{ borderLeftColor: '#2563eb' }}>
//                                 <div className="p-6">
//                                     <div className="flex justify-between mb-4">
//                                         <div>
//                                             <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
//                                             <p className="text-sm text-gray-500">{step.description || step.subtitle}</p>
//                                         </div>
//                                         <span className="text-xs font-bold uppercase text-gray-400 bg-gray-100 px-2 py-1 h-fit rounded">Step {i + 1}</span>
//                                     </div>

//                                     {/* --- CLICKABLE SKILLS & GAPS --- */}
//                                     {(step.type === "skills" || step.type === "gaps") && (
//                                       <div className="flex flex-wrap gap-2">
//                                         {step.items?.map((item, idx) => {
//                                           const text = typeof item === 'string' ? item : (item.name || "Skill");
//                                           const url = getSmartLink(item, step.type);
//                                           const isGap = step.type === 'gaps';
//                                           return (
//                                             <a 
//                                               key={idx} 
//                                               href={url} 
//                                               target="_blank" 
//                                               rel="noopener noreferrer"
//                                               className={`px-4 py-2 rounded-full text-sm font-medium border flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer shadow-sm ${
//                                                 isGap ? 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100' : 'bg-green-50 text-green-900 border-green-200 hover:bg-green-100'
//                                               }`}
//                                               title={`Click to find ${text} tutorials`}
//                                             >
//                                               {text} 
//                                               {isGap ? <Youtube size={12} className="opacity-50"/> : <CheckCircle size={12} className="opacity-50"/>}
//                                             </a>
//                                           );
//                                         })}
//                                       </div>
//                                     )}

//                                     {/* --- CLICKABLE COURSES --- */}
//                                     {step.type === "courses" && (
//                                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
//                                         {step.items?.map((item: any, idx: number) => (
//                                           <a 
//                                             key={idx}
//                                             href={getSmartLink(item, "courses")}
//                                             target="_blank" 
//                                             rel="noopener noreferrer"
//                                             className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all group/item block relative overflow-hidden"
//                                           >
//                                             <div className="absolute top-0 right-0 p-2 opacity-0 group-hover/item:opacity-100 transition-opacity">
//                                                 <ExternalLink size={14} className="text-blue-500" />
//                                             </div>
//                                             <h4 className="font-bold text-sm text-gray-900 mb-1 group-hover/item:text-blue-600">
//                                               {item.title}
//                                             </h4>
//                                             <div className="flex items-center gap-1 text-xs text-gray-500">
//                                               <BookOpen size={12} /> {item.platform || "Online Course"}
//                                             </div>
//                                           </a>
//                                         ))}
//                                       </div>
//                                     )}

//                                     {/* --- CLICKABLE PROJECTS --- */}
//                                     {step.type === "projects" && (
//                                       <div className="space-y-3">
//                                         {step.items?.map((item, idx) => (
//                                           <a 
//                                             key={idx}
//                                             href={getSmartLink(item, "projects")}
//                                             target="_blank" 
//                                             rel="noopener noreferrer"
//                                             className="bg-gray-50 p-4 rounded-lg text-sm font-medium text-gray-700 border border-gray-100 flex items-center justify-between hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 transition-colors group/proj"
//                                           >
//                                             <div className="flex items-center gap-3">
//                                                 <div className="w-2 h-2 rounded-full bg-purple-500 shrink-0 group-hover/proj:scale-125 transition-transform"></div>
//                                                 {typeof item === 'string' ? item : item.title}
//                                             </div>
//                                             <Github size={16} className="text-gray-400 group-hover/proj:text-purple-600"/>
//                                           </a>
//                                         ))}
//                                       </div>
//                                     )}

//                                     {/* --- CLICKABLE ROLES --- */}
//                                     {step.type === "roles" && (
//                                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
//                                         {step.items?.map((item: any, idx: number) => (
//                                           <a 
//                                             key={idx}
//                                             href={getSmartLink(item, "roles")}
//                                             target="_blank" 
//                                             rel="noopener noreferrer"
//                                             className="bg-white p-4 rounded-lg border border-gray-200 hover:border-indigo-400 hover:shadow-md transition-all block group/role"
//                                           >
//                                             <div className="flex justify-between items-start">
//                                                 <h4 className="font-bold text-sm text-gray-800 mb-1 group-hover/role:text-indigo-600">{item.title}</h4>
//                                                 <Linkedin size={14} className="text-gray-300 group-hover/role:text-indigo-500"/>
//                                             </div>
//                                             <p className="text-xs text-gray-500 mt-1 flex justify-between items-center">
//                                               <span>{item.company || "Top Tech Co."}</span>
//                                               <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-bold text-[10px] border border-green-100">
//                                                 {item.match} match
//                                               </span>
//                                             </p>
//                                           </a>
//                                         ))}
//                                       </div>
//                                     )}
//                                 </div>
//                             </Card>
//                         </div>
//                     </div>
//                     );
//                 })}
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }







// "use client";

// import { useState, useEffect } from "react";
// import { 
//   Loader2, CheckCircle, AlertTriangle, BookOpen, Hammer, Rocket, 
//   LayoutGrid, FileText, Mic, Map, TrendingUp, Settings, User, ExternalLink, Zap,
//   Search, Youtube, Github, Linkedin, RefreshCw
// } from "lucide-react";

// // --- CONSTANTS ---
// const API_URL = "http://localhost:5000/api";

// // --- INTERFACES ---
// interface RoadmapItem {
//   title?: string;
//   name?: string;
//   platform?: string;
//   company?: string;
//   match?: string;
//   link?: string;
//   [key: string]: any;
// }

// interface RoadmapStep {
//   step: number;
//   title: string;
//   subtitle?: string;
//   description?: string;
//   icon?: string;
//   color?: string;
//   textColor?: string;
//   type: "skills" | "gaps" | "courses" | "projects" | "roles" | string;
//   items: (string | RoadmapItem)[];
// }

// // --- SMART LINK GENERATOR ---
// const getSmartLink = (item: string | RoadmapItem, type: string) => {
//   if (typeof item !== 'string' && item.link) return item.link;
//   const text = typeof item === 'string' ? item : (item.title || item.name || "Technology");
//   const encoded = encodeURIComponent(text);

//   switch (type) {
//     case "skills": return `https://www.youtube.com/results?search_query=${encoded}+crash+course`;
//     case "gaps": return `https://www.youtube.com/results?search_query=learn+${encoded}+fast`;
//     case "courses": return `https://www.udemy.com/courses/search/?q=${encoded}`;
//     case "projects": return `https://github.com/search?q=${encoded}&type=repositories`;
//     case "roles": return `https://www.linkedin.com/jobs/search/?keywords=${encoded}`;
//     default: return `https://www.google.com/search?q=${encoded}`;
//   }
// };

// // --- INLINE COMPONENTS ---
// const Card = ({ className, children, style }: any) => (
//   <div className={`bg-white rounded-xl border border-gray-200 shadow-sm ${className}`} style={style}>{children}</div>
// );

// const Button = ({ children, onClick, disabled, className, variant = "primary" }: any) => {
//   const baseStyle = "px-4 py-2 rounded-lg font-medium transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2";
//   const variants = {
//     primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
//     outline: "border border-gray-200 hover:bg-gray-50 text-gray-700",
//     ghost: "hover:bg-gray-100 text-gray-600"
//   };
//   return <button onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant as keyof typeof variants]} ${className}`}>{children}</button>;
// };

// // UPDATED: Input component instead of Select to allow ANY role
// const RoleInput = ({ value, onChange, placeholder }: any) => (
//   <div className="relative w-full">
//     <input 
//       type="text"
//       value={value} 
//       onChange={(e) => onChange(e.target.value)} 
//       placeholder={placeholder}
//       className="w-full bg-white border border-gray-300 text-gray-900 py-2.5 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all placeholder:text-gray-400"
//       list="role-suggestions"
//     />
//     <datalist id="role-suggestions">
//       <option value="Senior Full-Stack Developer" />
//       <option value="AI/ML Engineer" />
//       <option value="DevOps Engineer" />
//       <option value="Data Scientist" />
//       <option value="Product Manager" />
//       <option value="Blockchain Developer" />
//       <option value="Cybersecurity Analyst" />
//     </datalist>
//   </div>
// );

// const getStepStyle = (index: number, title: string = "") => {
//     const typeLower = title.toLowerCase();
//     if (index === 0 || typeLower.includes("foundation") || typeLower.includes("current")) return { icon: <CheckCircle />, color: "bg-green-100 text-green-700" };
//     if (typeLower.includes("gap") || typeLower.includes("acquire")) return { icon: <AlertTriangle />, color: "bg-amber-100 text-amber-700" };
//     if (typeLower.includes("project") || typeLower.includes("build")) return { icon: <Hammer />, color: "bg-purple-100 text-purple-700" };
//     if (index === 4 || typeLower.includes("goal") || typeLower.includes("role")) return { icon: <Rocket />, color: "bg-indigo-100 text-indigo-700" };
//     return { icon: <BookOpen />, color: "bg-blue-100 text-blue-700" };
// };

// // --- MAIN PAGE COMPONENT ---

// export default function RoadmapPage() {
//   const [loading, setLoading] = useState(true);
//   const [generating, setGenerating] = useState(false);
//   const [roadmapSteps, setRoadmapSteps] = useState<RoadmapStep[]>([]);
//   const [selectedRole, setSelectedRole] = useState("Senior Full-Stack Developer");
//   const [userLevel, setUserLevel] = useState<string | null>(null);

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
//       if (data.success && data.data && data.data.length > 0) {
//         const latest = data.data[0];
//         setSelectedRole(latest.targetRole || "Senior Full-Stack Developer");
//         const steps = latest.steps || latest.roadmap || [];
//         setRoadmapSteps(steps);
//         if (latest.level) setUserLevel(latest.level);
//       }
//     } catch (err) {
//       console.error("Roadmap fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGenerateRoadmap = async () => {
//       setGenerating(true);
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) return alert("Please log in.");

//         const res = await fetch(`${API_URL}/roadmap/generate`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//             body: JSON.stringify({ role: selectedRole })
//         });

//         const data = await res.json();
//         if (data.success) {
//             const resultData = data.data.roadmap || data.data; 
//             let newSteps = [];

//             // Handle different JSON structures safely
//             if (Array.isArray(resultData)) newSteps = resultData;
//             else if (resultData?.roadmap) newSteps = resultData.roadmap;

//             // Update User Level from Backend Response
//             if (resultData?.level) setUserLevel(resultData.level);
//             else if (data.data.level) setUserLevel(data.data.level);

//             setRoadmapSteps(newSteps);
//         } else {
//             alert(data.message || "Failed.");
//         }
//       } catch (err) {
//           console.error("Error:", err);
//       } finally {
//           setGenerating(false);
//       }
//   };

//   if (loading) {
//       return (
//           <div className="min-h-screen flex items-center justify-center bg-gray-50">
//               <Loader2 className="animate-spin text-blue-600" size={48} />
//           </div>
//       );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex">
//       <main className="flex-1 p-4 md:p-8 overflow-y-auto h-screen">
//         <div className="max-w-7xl mx-auto w-full space-y-10">

//           <div className="px-2 md:px-0 border-b border-gray-200 pb-6">
//             <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">Your AI-Powered Growth Roadmap</h1>
//             <p className="text-gray-500">Interactive, personalized career path based on your resume history.</p>
//           </div>

//           <Card className="p-6 bg-white">
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
//                 <h2 className="text-lg md:text-xl font-bold text-gray-800">Target Role</h2>

//                 {/* --- DYNAMIC LEVEL BADGE --- */}
//                 {userLevel && (
//                     <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border flex items-center gap-2 shadow-sm animate-in fade-in zoom-in
//                         ${userLevel.toLowerCase().includes('advanced') ? 'bg-purple-100 text-purple-700 border-purple-200' : 
//                           userLevel.toLowerCase().includes('intermediate') ? 'bg-blue-100 text-blue-700 border-blue-200' : 
//                           'bg-green-100 text-green-700 border-green-200'}`}>
//                         <Zap size={14} className="fill-current" /> 
//                         <span>Current Level: {userLevel}</span>
//                     </div>
//                 )}
//             </div>

//             <div className="flex flex-col md:flex-row gap-4 md:items-center">
//               <div className="w-full md:flex-1">
//                 {/* UPDATED: Uses RoleInput to allow ANY text */}
//                 <RoleInput 
//                     value={selectedRole} 
//                     onChange={setSelectedRole} 
//                     placeholder="Enter any job title (e.g. Robotics Engineer)" 
//                 />
//               </div>
//               <Button onClick={handleGenerateRoadmap} disabled={generating} className="w-full md:w-auto px-8 min-w-[180px]">
//                 {generating ? <><Loader2 className="animate-spin" size={18} /> Analyzing...</> : <><Rocket size={18} /> Generate Roadmap</>}
//               </Button>
//             </div>
//           </Card>

//           {roadmapSteps.length === 0 ? (
//              <div className="p-12 text-center border-2 border-dashed border-gray-300 rounded-xl bg-white">
//                 <Map size={32} className="mx-auto mb-4 text-gray-400"/>
//                 <p className="text-gray-500">No roadmap found. Enter a target role above and click Generate.</p>
//              </div>
//           ) : (
//             <div className="relative space-y-8 pb-12">
//                 {roadmapSteps.map((step, i) => {
//                     const style = getStepStyle(i, step.title || step.type);
//                     return (
//                     <div key={i} className="relative group">
//                         {i !== roadmapSteps.length - 1 && (
//                             <div className="hidden md:block absolute left-8 top-16 bottom-[-2rem] w-0.5 bg-gray-200 z-0" />
//                         )}
//                         <div className="p-4 md:p-6 relative z-10">
//                             <div className={`absolute -left-2 md:-left-6 top-6 w-12 h-12 rounded-xl ${style.color} flex items-center justify-center border-4 border-gray-50 shadow-sm z-20`}>
//                                 {style.icon}
//                             </div>
//                             <Card className="ml-8 md:ml-10 border-l-4 hover:shadow-lg transition-all duration-300" style={{ borderLeftColor: '#2563eb' }}>
//                                 <div className="p-6">
//                                     <div className="flex justify-between mb-4">
//                                         <div>
//                                             <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
//                                             <p className="text-sm text-gray-500">{step.description || step.subtitle}</p>
//                                         </div>
//                                         <span className="text-xs font-bold uppercase text-gray-400 bg-gray-100 px-2 py-1 h-fit rounded">Step {i + 1}</span>
//                                     </div>

//                                     {/* --- CLICKABLE SKILLS & GAPS --- */}
//                                     {(step.type === "skills" || step.type === "gaps") && (
//                                       <div className="flex flex-wrap gap-2">
//                                         {step.items?.map((item, idx) => {
//                                           const text = typeof item === 'string' ? item : (item.name || "Skill");
//                                           const url = getSmartLink(item, step.type);
//                                           const isGap = step.type === 'gaps';
//                                           return (
//                                             <a 
//                                               key={idx} 
//                                               href={url} 
//                                               target="_blank" 
//                                               rel="noopener noreferrer"
//                                               className={`px-4 py-2 rounded-full text-sm font-medium border flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer shadow-sm ${
//                                                 isGap ? 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100' : 'bg-green-50 text-green-900 border-green-200 hover:bg-green-100'
//                                               }`}
//                                               title={`Click to find ${text} tutorials`}
//                                             >
//                                               {text} 
//                                               {isGap ? <Youtube size={12} className="opacity-50"/> : <CheckCircle size={12} className="opacity-50"/>}
//                                             </a>
//                                           );
//                                         })}
//                                       </div>
//                                     )}

//                                     {/* --- CLICKABLE COURSES --- */}
//                                     {step.type === "courses" && (
//                                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
//                                         {step.items?.map((item: any, idx: number) => (
//                                           <a 
//                                             key={idx}
//                                             href={getSmartLink(item, "courses")}
//                                             target="_blank" 
//                                             rel="noopener noreferrer"
//                                             className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all group/item block relative overflow-hidden"
//                                           >
//                                             <div className="absolute top-0 right-0 p-2 opacity-0 group-hover/item:opacity-100 transition-opacity">
//                                                 <ExternalLink size={14} className="text-blue-500" />
//                                             </div>
//                                             <h4 className="font-bold text-sm text-gray-900 mb-1 group-hover/item:text-blue-600">
//                                               {item.title}
//                                             </h4>
//                                             <div className="flex items-center gap-1 text-xs text-gray-500">
//                                               <BookOpen size={12} /> {item.platform || "Online Course"}
//                                             </div>
//                                           </a>
//                                         ))}
//                                       </div>
//                                     )}

//                                     {/* --- CLICKABLE PROJECTS --- */}
//                                     {step.type === "projects" && (
//                                       <div className="space-y-3">
//                                         {step.items?.map((item, idx) => (
//                                           <a 
//                                             key={idx}
//                                             href={getSmartLink(item, "projects")}
//                                             target="_blank" 
//                                             rel="noopener noreferrer"
//                                             className="bg-gray-50 p-4 rounded-lg text-sm font-medium text-gray-700 border border-gray-100 flex items-center justify-between hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 transition-colors group/proj"
//                                           >
//                                             <div className="flex items-center gap-3">
//                                                 <div className="w-2 h-2 rounded-full bg-purple-500 shrink-0 group-hover/proj:scale-125 transition-transform"></div>
//                                                 {typeof item === 'string' ? item : item.title}
//                                             </div>
//                                             <Github size={16} className="text-gray-400 group-hover/proj:text-purple-600"/>
//                                           </a>
//                                         ))}
//                                       </div>
//                                     )}

//                                     {/* --- CLICKABLE ROLES --- */}
//                                     {step.type === "roles" && (
//                                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
//                                         {step.items?.map((item: any, idx: number) => (
//                                           <a 
//                                             key={idx}
//                                             href={getSmartLink(item, "roles")}
//                                             target="_blank" 
//                                             rel="noopener noreferrer"
//                                             className="bg-white p-4 rounded-lg border border-gray-200 hover:border-indigo-400 hover:shadow-md transition-all block group/role"
//                                           >
//                                             <div className="flex justify-between items-start">
//                                                 <h4 className="font-bold text-sm text-gray-800 mb-1 group-hover/role:text-indigo-600">{item.title}</h4>
//                                                 <Linkedin size={14} className="text-gray-300 group-hover/role:text-indigo-500"/>
//                                             </div>
//                                             <p className="text-xs text-gray-500 mt-1 flex justify-between items-center">
//                                               <span>{item.company || "Top Tech Co."}</span>
//                                               <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-bold text-[10px] border border-green-100">
//                                                 {item.match} match
//                                               </span>
//                                             </p>
//                                           </a>
//                                         ))}
//                                       </div>
//                                     )}
//                                 </div>
//                             </Card>
//                         </div>
//                     </div>
//                     );
//                 })}
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
  ExternalLink, Zap, Youtube, Github, Book, FileText, Video,
  Search, GraduationCap, MonitorPlay
} from "lucide-react";

const API_URL = "http://localhost:5000/api";

// --- INTERFACES ---
interface RoadmapResource {
  title: string;
  type: string;
  url?: string;
}

interface RoadmapStep {
  step: number;
  title: string;
  description: string;
  duration?: string;
  items?: string[]; // Old format (Skills list)
  resources?: RoadmapResource[]; // New format (Specific links)
}

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
  <div className={`bg-white rounded-xl border border-gray-200 shadow-sm ${className}`}>{children}</div>
);

const RoleInput = ({ value, onChange, placeholder }: any) => (
  <div className="relative w-full">
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-white border border-gray-300 text-gray-900 py-2.5 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
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

      // Handle both data structures safely
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

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex p-4 md:p-8">
      <main className="flex-1 max-w-5xl mx-auto w-full space-y-8">

        {/* Header */}
        <div className="space-y-4">
          <div className="px-2 md:px-0 border-b border-gray-200 pb-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">Your AI-Powered Growth Roadmap</h1>
            <p className="text-gray-500">Interactive, personalized career path based on your resume history.</p>
          </div>
          <Card className="p-4 flex gap-4">
            <RoleInput value={selectedRole} onChange={setSelectedRole} placeholder="Enter Job Role (e.g. MERN Stack)" />
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
            >
              {generating ? <Loader2 className="animate-spin" size={18} /> : <Rocket size={18} />}
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
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold z-10 ${i === 0 ? 'bg-green-600 text-white' : 'bg-white border-2 border-blue-600 text-blue-600'}`}>
                  {i + 1}
                </div>
                {i !== roadmapSteps.length - 1 && <div className="w-0.5 flex-1 bg-gray-200 my-2 group-hover:bg-blue-200 transition-colors"></div>}
              </div>

              {/* Step Content */}
              <Card className="flex-1 p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                  <p className="text-gray-500 mt-1">{step.description}</p>
                  {step.duration && (
                    <span className="inline-block mt-2 text-xs font-semibold bg-blue-50 text-blue-700 px-2 py-1 rounded">
                      ⏱ {step.duration}
                    </span>
                  )}
                </div>

                {/* --- FALLBACK: SKILL BUTTONS (If specific resources are missing) --- */}
                {step.items && (!step.resources || step.resources.length === 0) && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {step.items.map((skill, idx) => (
                      <a
                        key={idx}
                        href={getSearchLink(skill, 'video')}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-full border bg-gray-50 hover:bg-white hover:border-red-300 hover:text-red-600 transition-all text-sm font-medium flex items-center gap-2 cursor-pointer"
                      >
                        {skill} <Youtube size={14} />
                      </a>
                    ))}
                  </div>
                )}

                {/* --- NEW: SPECIFIC RESOURCES (Best Quality) --- */}
                {step.resources && step.resources.length > 0 && (
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                    {step.resources.map((res, idx) => (
                      <a
                        key={idx}
                        href={getDynamicLink(res)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-blue-300 hover:bg-blue-50/50 transition-all bg-gray-50/50"
                      >
                        <div className="bg-white p-2 rounded-md shadow-sm text-blue-600">
                          {res.type === 'video' ? <Youtube className="text-red-600" /> :
                            res.type === 'book' ? <Book className="text-orange-600" /> :
                              <MonitorPlay className="text-indigo-600" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{res.title}</p>
                          <p className="text-xs text-gray-500 capitalize flex items-center gap-1">
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
            <div className="text-center py-12 text-gray-500 border-2 border-dashed rounded-xl">
              <Rocket size={48} className="mx-auto text-gray-300 mb-4" />
              <p>Enter your dream role above and click Generate to start your journey.</p>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}