"use client";

import PDFViewer from "@/components/resume/pdf-viewer";
import ResumeScore from "@/components/resume/resume-score";
import FeedbackTabs from "@/components/resume/feedback-tabs";
import { Upload, Sparkles,Hourglass, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";

// UPDATED INTERFACE
interface ParsedResume {
  skills?: string[];
  education?: Array<{ name?: string, degree?: string, institution?: string, year?: string }>;
  experience?: Array<{ title?: string, company?: string, duration?: string, description?: string }>;
  score?: number;
  feedback?: string[];
  strengths?: string[];    
  improvements?: string[]; 
}

// Helper to handle Local vs Cloudinary URLs
const getFullUrl = (url: string | null | undefined) => {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url; 
  }
  const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace('/api', '');
  const cleanPath = url.startsWith('/') ? url : `/${url}`;
  return `${baseUrl}${cleanPath}`;
};

export default function ResumePage() {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [parsedData, setParsedData] = useState<ParsedResume | null>(null);
  const [loading, setLoading] = useState(true); 
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // NEW: State for Target Role
  const [targetRole, setTargetRole] = useState("fullstack-developer");

  // NEW: Roles List
  const roles = [
    { id: "fullstack-developer", label: "Full Stack Developer" },
    { id: "frontend-developer", label: "Frontend Developer" },
    { id: "backend-developer", label: "Backend Developer" },
    { id: "data-scientist", label: "Data Scientist" },
    { id: "devops-engineer", label: "DevOps Engineer" },
    { id: "product-manager", label: "Product Manager" },
    { id: "mobile-developer", label: "Mobile Developer" },
    { id: "ui-ux-designer", label: "UI/UX Designer" }
  ];

  useEffect(() => {
    fetchLatestResume();
  }, []);

  async function fetchLatestResume() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      
      const res = await fetch(`${API_URL}/resume`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const responseData = await res.json();
        
        if (responseData.success && responseData.data && responseData.data.length > 0) {
          const latest = responseData.data[0]; 
          console.log("🔄 Loaded saved resume:", latest);

          // FLATTENING LOGIC (Handles DB nesting)
          const flatData = {
              ...latest,
              ...(latest.parsedResume || {}), 
              ...(latest.parsed || {}),     
              ...(latest.analysis || {})
          };

          setScore(flatData.resume_score || flatData.score || 0);

          setParsedData({
            skills: Array.isArray(flatData.skills) ? flatData.skills : [],
            education: Array.isArray(flatData.education) ? flatData.education : [],
            experience: Array.isArray(flatData.experience) ? flatData.experience : [],
            score: flatData.resume_score || flatData.score || 0,
            feedback: Array.isArray(flatData.feedback) ? flatData.feedback : [],
            strengths: Array.isArray(flatData.strengths) ? flatData.strengths : [],       
            improvements: Array.isArray(flatData.weaknesses) ? flatData.weaknesses : []    
          });

          if (latest.fileURL) {
            setPdfUrl(getFullUrl(latest.fileURL));
          }
        }
      }
    } catch (err) {
      console.error("Failed to load saved resume:", err);
      setError("Could not load previous resume data.");
    } finally {
      setLoading(false);
    }
  }

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload a valid PDF file.");
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setPdfUrl(previewUrl);
    setUploading(true);
    setError(null);

    await uploadResume(file);
  }

  async function uploadResume(file: File) {
    const form = new FormData();
    form.append("file", file);
    
    // UPDATED: Send selected role
    form.append("targetRole", targetRole);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in to upload your resume.");
        setUploading(false);
        return;
      }

      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

      const res = await fetch(`${API_URL}/resume/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });

      const responseData = await res.json();

      if (!responseData.success) {
        throw new Error(responseData.message || "Upload failed");
      }

      console.log("✅ RAW Backend Response:", responseData);

      // CRITICAL FIX: Extract 'resume' key specifically
      const rootData = responseData.data || {};
      
      const unifiedData = {
          ...rootData,                    
          ...(rootData.resume || {}),       // 👈 ADDED THIS (This contains the new score)
          ...(rootData.parsedResume || {}), 
          ...(rootData.data || {}),         
          ...(rootData.parsed || {}),       
          ...(rootData.analysis || {})      
      };

      console.log("Unified Data for UI:", unifiedData);

      if ((unifiedData.resume_score || 0) === 0 && (unifiedData.score || 0) === 0) {
          console.warn("⚠️ Warning: Score is 0. Check console for structure mismatch.");
      }

      setScore(unifiedData.resume_score || unifiedData.score || 0);
      
      setParsedData({
        skills: Array.isArray(unifiedData.skills) ? unifiedData.skills : [],
        education: Array.isArray(unifiedData.education) ? unifiedData.education : [],
        experience: Array.isArray(unifiedData.experience) ? unifiedData.experience : [],
        score: unifiedData.resume_score || unifiedData.score || 0,
        feedback: Array.isArray(unifiedData.feedback) ? unifiedData.feedback : [],
        strengths: Array.isArray(unifiedData.strengths) ? unifiedData.strengths : [],
        improvements: Array.isArray(unifiedData.weaknesses) ? unifiedData.weaknesses : []
      });
      
      const newUrl = unifiedData.fileURL || unifiedData.pdf_url;
      if (newUrl) {
         setPdfUrl(getFullUrl(newUrl));
      }

    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="bg-gray-50 dark:bg-background min-h-screen text-gray-900 dark:text-foreground font-sans">

      <main className="md:ml-20 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 dark:border-border pb-8 mb-8">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
                <Upload size={14} className="mr-1" /> Resume Analysis
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Resume Intelligence
              </h1>
              <p className="text-gray-500 dark:text-muted-foreground max-w-xl text-lg">
                Upload your resume to get instant scoring, ATS feedback, and actionable improvement tips.
              </p>
            </div>
          </div>

          {/* Upload Area & Controls */}
          <div className="mb-10 space-y-6">
            
            {/* Role Selector Dropdown */}
            <div className="max-w-md">
              <label htmlFor="role-select" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Target Job Role
              </label>
              <div className="relative">
                <select
                  id="role-select"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  disabled={uploading}
                  className="block w-full pl-3 pr-10 py-3 text-base border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-xl bg-white dark:bg-card shadow-sm transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                </div>
              </div>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                The AI will analyze your resume specifically for this position.
              </p>
            </div>

            <label className={`cursor-pointer block relative group ${uploading ? "pointer-events-none" : ""}`}>
              <div 
                className={`
                  relative overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 p-8 md:p-10 text-center
                  ${uploading 
                    ? "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800" 
                    : "bg-white dark:bg-card border-gray-300 dark:border-border hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-50/50 dark:hover:shadow-indigo-900/20"
                  }
                `}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {uploading ? (
                    <div className="flex flex-col items-center justify-center py-4">
                      <Hourglass className="h-10 w-10 animate-spin text-indigo-600 dark:text-indigo-400 mb-4" />
                      <p className="font-bold text-indigo-900 dark:text-indigo-200 text-lg">Analyzing your profile...</p>
                      <p className="text-indigo-600 dark:text-indigo-400 text-sm mt-1">
                        Checking fit for <span className="font-semibold">{roles.find(r => r.id === targetRole)?.label}</span>...
                      </p>
                    </div>
                ) : (
                  <div className="transition-transform group-hover:-translate-y-1 duration-300">
                    <div className="mx-auto bg-indigo-50 dark:bg-indigo-900/30 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 transition-colors">
                        <Upload className="text-indigo-600 dark:text-indigo-400" size={32} />
                    </div>
                    <p className="font-bold text-gray-900 dark:text-white text-lg mb-1">
                      Drop your resume here or <span className="text-indigo-600 dark:text-indigo-400 underline decoration-2 underline-offset-2">browse</span>
                    </p>
                    <p className="text-sm text-gray-400 dark:text-muted-foreground">
                      Supports PDF files up to 5MB
                    </p>
                  </div>
                )}
              </div>

              <input
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                className="hidden"
                disabled={uploading}
              />
            </label>

            {error && (
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3 animate-in slide-in-from-top-2">
                <AlertCircle size={20} className="shrink-0" /> 
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}
          </div>

          {/* Grid Layout */}
          {(pdfUrl || loading) && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              <div className="lg:col-span-4 order-2 lg:order-1">
                <PDFViewer fileUrl={pdfUrl} />
              </div>

              <div className="lg:col-span-8 order-1 lg:order-2 space-y-6">
                <ResumeScore score={score} loading={uploading || loading} />
                <div className="min-h-[400px]">
                    <FeedbackTabs parsedData={parsedData} loading={uploading || loading} />
                </div>
              </div>

            </div>
          )}
        </div>
      </main>
    </div>
  );
}

