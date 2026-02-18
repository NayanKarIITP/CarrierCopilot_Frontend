
"use client";

import { useState, useEffect } from "react";
import {
  Hourglass, CheckCircle, BookOpen, Rocket,
  ExternalLink, Youtube, Book, MonitorPlay, Sparkles
} from "lucide-react";
import api from "@/lib/api";

// INTERFACES 
interface RoadmapResource { title: string; type: string; url?: string; }
interface RoadmapStep { step: number; title: string; description: string; duration?: string; items?: string[]; resources?: RoadmapResource[]; }

// LINK GENERATORS 
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

// COMPONENTS 
const Card = ({ className, children }: any) => (
  <div className={`bg-white dark:bg-card dark:border-border rounded-xl border border-gray-200 shadow-sm ${className}`}>{children}</div>
);

const RoleInput = ({ value, onChange, placeholder }: any) => (
  <div className="relative w-full">
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-white dark:bg-muted/30 border border-gray-300 dark:border-border text-gray-900 dark:text-foreground py-2.5 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
    />
  </div>
);

export default function RoadmapPage() {
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [roadmapSteps, setRoadmapSteps] = useState<RoadmapStep[]>([]);
  const [selectedRole, setSelectedRole] = useState("Full Stack Developer");
  const [userSkills, setUserSkills] = useState<string[]>([]);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      // 1. Fetch existing Roadmap & User Skills in parallel
      const [roadmapRes, dashboardRes] = await Promise.allSettled([
        api.get("/roadmap"),
        api.get("/dashboard") // Fetch dashboard to get current skills
      ]);

      // Handle Roadmap Data
      if (roadmapRes.status === "fulfilled" && roadmapRes.value.data.success) {
        const data = roadmapRes.value.data.data;
        if (data && data.length > 0) {
          const latest = data[0];
          setRoadmapSteps(latest.roadmap || latest.steps || []);
          // Optional: Set selected role to what was previously generated if available
          if (latest.role) setSelectedRole(latest.role);
        }
      }

      // Handle Skills Data (from Dashboard/Resume)
      if (dashboardRes.status === "fulfilled" && dashboardRes.value.data.success) {
        const resumeData = dashboardRes.value.data.data?.resume;
        if (resumeData && resumeData.skills) {
          setUserSkills(resumeData.skills);
        }
      }

    } catch (err) {
      console.error("Failed to load initial data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (!selectedRole.trim()) return;
    setGenerating(true);

    try {
      // Send BOTH role and skills so Python knows the context
      const res = await api.post("/roadmap/generate", {
        role: selectedRole,
        skills: userSkills
      });

      if (res.data.success) {
        setRoadmapSteps(res.data.data.roadmap || res.data.data);
      }
    } catch (err) {
      console.error("Generation Error:", err);
      alert("Failed to generate roadmap. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-background">
        <Hourglass className="animate-spin text-blue-600 dark:text-blue-400" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background text-gray-900 dark:text-foreground font-sans flex p-4 md:p-8">
      <main className="flex-1 max-w-5xl mx-auto w-full space-y-8">

        {/* Header */}
        <div className="space-y-4">
          <div className="px-2 md:px-0 border-b border-gray-200 dark:border-border pb-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white flex items-center gap-3">
              Your AI Growth Roadmap
            </h1>
            <p className="text-gray-500 dark:text-muted-foreground text-lg">
              Interactive, personalized career path based on your resume & target role.
            </p>
          </div>

          <Card className="p-6 flex flex-col md:flex-row gap-4 md:items-end bg-blue-50/50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900">
            <div className="flex-1 w-full">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 block ml-1">
                Target Job Role
              </label>
              <RoleInput
                value={selectedRole}
                onChange={setSelectedRole}
                placeholder="e.g. Data Scientist, DevOps Engineer..."
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={generating}
              className="mt-4 md:mt-0 w-full md:w-auto bg-blue-600 text-white px-8 py-2.5 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-blue-200 dark:shadow-none transition-all hover:scale-105 active:scale-95 h-[42px]"
            >
              {generating ? <Hourglass className="animate-spin" size={20} /> : <Rocket size={20} />}
              {generating ? "Planning..." : "Generate Roadmap"}
            </button>
          </Card>
        </div>

        {/* Roadmap Steps */}
        <div className="space-y-6 relative pb-20">
          {roadmapSteps.length > 0 ? roadmapSteps.map((step, i) => (
            <div key={i} className="flex gap-4 md:gap-6 group animate-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${i * 100}ms` }}>
              {/* Vertical Line */}
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold z-10 shadow-sm transition-colors ${i === 0 ? 'bg-green-600 text-white shadow-green-200 dark:shadow-none' : 'bg-white dark:bg-card border-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400'}`}>
                  {i + 1}
                </div>
                {i !== roadmapSteps.length - 1 && (
                  <div className="w-0.5 flex-1 bg-gray-200 dark:bg-gray-800 my-2 group-hover:bg-blue-300 dark:group-hover:bg-blue-700 transition-colors"></div>
                )}
              </div>

              {/* Step Content */}
              <Card className="flex-1 p-6 hover:shadow-md transition-shadow dark:hover:border-blue-900/50">
                <div className="mb-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{step.title}</h3>
                    {step.duration && (
                      <span className="text-xs font-semibold bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-800">
                        ⏱ {step.duration}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">{step.description}</p>
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

                {/* SPECIFIC RESOURCES  */}
                {step.resources && step.resources.length > 0 && (
                  <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-3">
                    {step.resources.map((res, idx) => (
                      <a
                        key={idx}
                        href={getDynamicLink(res)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-blue-400 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all bg-white dark:bg-card group/link"
                      >
                        <div className="bg-gray-50 dark:bg-muted p-2.5 rounded-lg text-blue-600 dark:text-blue-400 group-hover/link:bg-white dark:group-hover/link:bg-background transition-colors">
                          {res.type === 'video' ? <Youtube className="text-red-500" size={20} /> :
                            res.type === 'book' ? <Book className="text-amber-600" size={20} /> :
                              <MonitorPlay className="text-indigo-600" size={20} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white truncate group-hover/link:text-blue-600 dark:group-hover/link:text-blue-400 transition-colors">
                            {res.title}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 capitalize flex items-center gap-1 mt-0.5">
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
            <div className="text-center py-16 bg-white dark:bg-card border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl">
              <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-muted rounded-full flex items-center justify-center mb-4">
                <Rocket size={32} className="text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Ready to launch?</h3>
              <p className="text-gray-500 dark:text-muted-foreground">Enter your dream role above and click Generate.</p>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}