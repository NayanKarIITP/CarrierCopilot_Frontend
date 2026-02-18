
"use client";

import { useEffect, useState } from "react";
import { Upload, Command, Loader2,Hourglass, AlertCircle } from "lucide-react"; 
import HeaderSection from "@/components/dashboard/header-section";
import ResumeQualityCard from "@/components/dashboard/resume-quality-card";
import ReadinessGauge from "@/components/dashboard/readiness-gauge";
import SkillGapAnalysis from "@/components/dashboard/skill-gap-analysis";
import AITipsFeed from "@/components/dashboard/ai-tips-feed";
import LearningRoadmap from "@/components/dashboard/learning-roadmap";
import PrimaryActionCard from "@/components/dashboard/primary-action-card";

import api from "@/lib/api"; 

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState<any>(null);
  
  // Upload State for "One Step" Flow
  const [uploading, setUploading] = useState(false);
  const [targetRole, setTargetRole] = useState("fullstack-developer");
  const [error, setError] = useState<string | null>(null);

  // Roles list for the dropdown
  const roles = [
    { id: "fullstack-developer", label: "Full Stack Developer" },
    { id: "frontend-developer", label: "Frontend Developer" },
    { id: "backend-developer", label: "Backend Developer" },
    { id: "data-scientist", label: "Data Scientist" },
    { id: "devops-engineer", label: "DevOps Engineer" },
    { id: "product-manager", label: "Product Manager" },
  ];

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/dashboard");
      if (res.data?.success) {
        setDashboard(res.data.data);
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  // DIRECT UPLOAD FUNCTION (No Redirect)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("targetRole", targetRole);

    try {
      // 1. Upload to Backend
      const res = await api.post("/resume/upload", formData);

      if (res.data.success) {
        // 2. SUCCESS! Fetch the fresh dashboard data immediately
        console.log(" Upload success, refreshing dashboard...");
        await fetchDashboard(); 
        // The state update in fetchDashboard will trigger a re-render, 
        // switching the view from "New User" to "Existing User" automatically.
      } else {
        setError(res.data.message || "Upload failed");
      }
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.response?.data?.message || "An unexpected error occurred.");
    } finally {
      setUploading(false);
    }
  };


  // 1. LOADING STATE

  if (loading) {
    return (
      <div className="flex h-full min-h-[500px] items-center justify-center bg-gray-50 dark:bg-background">
        <div className="flex flex-col items-center gap-4">
          <Hourglass className="h-10 w-10 animate-spin text-indigo-600" />
          <p className="text-muted-foreground animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }

  
  // 2️. ERROR STATE

  if (!dashboard) {
    return (
      <div className="p-10 text-center text-muted-foreground">
        Failed to load dashboard. Please refresh.
      </div>
    );
  }

  // Check New User (Score 0)
  const score = dashboard?.resume?.score || 0;
  const isNewUser = score === 0;

  // 3️. NEW USER VIEW (Direct Upload - ONE STEP)
  if (isNewUser) {
    return (
      <div className="flex flex-col h-full w-full bg-gray-50 dark:bg-background">
        
        {/* Header Section */}
        <div className="px-6 pt-8 pb-4">
           <HeaderSection fullName={dashboard.user.fullName} />
        </div>

        {/* Centered Content Area */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-3xl w-full">
            <div className="bg-white dark:bg-card rounded-3xl p-10 text-center border-2 border-dashed border-indigo-200 dark:border-indigo-900 shadow-sm relative overflow-hidden">
              
              {/* Subtle Gradient Background */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-20" />

              <div className="mx-auto w-20 h-20 bg-indigo-50 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-6">
                <Upload className="text-indigo-600 dark:text-indigo-400 h-8 w-8" />
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Let's unlock your career potential
              </h2>
              <p className="text-lg text-gray-500 dark:text-muted-foreground max-w-xl mx-auto mb-6 leading-relaxed">
                Upload your resume right now to generate your <span className="font-semibold text-indigo-600">ATS Score</span> and <span className="font-semibold text-indigo-600">Roadmap</span>.
              </p>

              {/*  Target Role Dropdown  */}
              <div className="max-w-xs mx-auto mb-6">
                <select
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  disabled={uploading}
                  className="w-full p-2 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>{role.label}</option>
                  ))}
                </select>
              </div>

              {/*  DIRECT UPLOAD BUTTON */}
              <label className={`inline-block relative group cursor-pointer ${uploading ? 'pointer-events-none opacity-80' : ''}`}>
                <div className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl shadow-indigo-200/50 dark:shadow-none transition-transform hover:-translate-y-1 active:translate-y-0 flex items-center gap-2">
                   {uploading ? (
                     <>
                       <Loader2 className="animate-spin h-5 w-5" />
                       Analyzing...
                     </>
                   ) : (
                     "Upload Resume Now"
                   )}
                </div>
                <input 
                  type="file" 
                  accept=".pdf" 
                  className="hidden" 
                  onChange={handleFileUpload}
                  disabled={uploading}
                />
              </label>

              {error && (
                <div className="mt-4 flex items-center justify-center gap-2 text-red-500 text-sm bg-red-50 p-2 rounded-lg max-w-md mx-auto">
                   <AlertCircle size={16} /> {error}
                </div>
              )}

              {/* Faint 'Preview' boxes */}
              <div className="mt-12 grid grid-cols-3 gap-4 opacity-25 grayscale pointer-events-none select-none">
                 <div className="h-16 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" style={{ animationDelay: "0s" }}></div>
                 <div className="h-16 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                 <div className="h-16 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" style={{ animationDelay: "0.4s" }}></div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }

  // 4️. EXISTING USER VIEW (Scrollable Dashboard)
  
  const skills = dashboard?.resume?.skills || [];
  const gaps = dashboard?.resume?.gaps || [];
  const roadmap = dashboard?.roadmap?.roadmap || [];
  const tips = dashboard?.aiTips || [];

  return (
    <div className="p-6 space-y-8 bg-gray-50 dark:bg-background min-h-screen">
      <HeaderSection fullName={dashboard.user.fullName} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6 lg:col-span-2">
          <PrimaryActionCard />
          <ResumeQualityCard score={score} />
          <SkillGapAnalysis skills={skills} gaps={gaps} />
          <LearningRoadmap roadmap={roadmap} />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <ReadinessGauge score={score} />
          <AITipsFeed tips={tips} />
        </div>
      </div>
    </div>
  );
}