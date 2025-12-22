
// "use client";

// import Navigation from "@/components/navigation";
// import PDFViewer from "@/components/resume/pdf-viewer";
// import ResumeScore from "@/components/resume/resume-score";
// import FeedbackTabs from "@/components/resume/feedback-tabs";
// import Navbar from "@/components/ui/navbar";

// import { Upload, FileText, AlertCircle } from "lucide-react";
// import { useState, useEffect } from "react";

// // ✅ UPDATED INTERFACE
// interface ParsedResume {
//   skills?: string[];
//   education?: Array<{ name?: string, degree?: string, institution?: string, year?: string }>;
//   experience?: Array<{ title?: string, company?: string, duration?: string, description?: string }>;
//   score?: number;
//   feedback?: string[];
//   strengths?: string[];    
//   improvements?: string[]; 
// }

// export default function ResumePage() {
//   const [pdfUrl, setPdfUrl] = useState<string | null>(null);
//   const [score, setScore] = useState<number>(0);
//   const [parsedData, setParsedData] = useState<ParsedResume | null>(null);
//   const [loading, setLoading] = useState(true); 
//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetchLatestResume();
//   }, []);

//   async function fetchLatestResume() {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setLoading(false);
//         return;
//       }

//       const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      
//       const res = await fetch(`${API_URL}/resume`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (res.ok) {
//         const responseData = await res.json();
        
//         if (responseData.success && responseData.data && responseData.data.length > 0) {
//           const latest = responseData.data[0]; 
//           console.log("🔄 Loaded saved resume:", latest);

//           setScore(latest.score || 0);

//           // ✅ CRITICAL FIX: Force arrays to prevent crashes
//           setParsedData({
//             skills: Array.isArray(latest.skills) ? latest.skills : [],
//             education: Array.isArray(latest.education) ? latest.education : [],
//             experience: Array.isArray(latest.experience) ? latest.experience : [],
//             score: latest.score || 0,
//             feedback: Array.isArray(latest.feedback) ? latest.feedback : [],
//             strengths: Array.isArray(latest.strengths) ? latest.strengths : [],       
//             improvements: Array.isArray(latest.weaknesses) ? latest.weaknesses : []    
//           });

//           if (latest.fileURL) {
//             const fullUrl = latest.fileURL.startsWith("http") 
//               ? latest.fileURL 
//               : `http://localhost:5000${latest.fileURL}`;
//             setPdfUrl(fullUrl);
//           }
//         }
//       }
//     } catch (err) {
//       console.error("Failed to load saved resume:", err);
//       setError("Could not load previous resume data.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     if (file.type !== "application/pdf") {
//       alert("Please upload a valid PDF file.");
//       return;
//     }

//     const previewUrl = URL.createObjectURL(file);
//     setPdfUrl(previewUrl);
//     setUploading(true);
//     setError(null);

//     await uploadResume(file);
//   }

//   async function uploadResume(file: File) {
//     const form = new FormData();
//     form.append("file", file);
//     form.append("targetRole", "fullstack-developer");

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         alert("Please log in to upload your resume.");
//         setUploading(false);
//         return;
//       }

//       const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

//       const res = await fetch(`${API_URL}/resume/upload`, {
//         method: "POST",
//         headers: { Authorization: `Bearer ${token}` },
//         body: form,
//       });

//       const responseData = await res.json();

//       if (!responseData.success) {
//         throw new Error(responseData.message || "Upload failed");
//       }

//       console.log("✅ Analysis Success:", responseData);

//       const data = responseData.data;
//       const parsed = data.parsedResume || data; 

//       setScore(parsed.score || 0);
      
//       // ✅ SAFETY FIX
//       setParsedData({
//         skills: Array.isArray(parsed.skills) ? parsed.skills : [],
//         education: Array.isArray(parsed.education) ? parsed.education : [],
//         experience: Array.isArray(parsed.experience) ? parsed.experience : [],
//         score: parsed.score || 0,
//         feedback: Array.isArray(parsed.feedback) ? parsed.feedback : [],
//         strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
//         improvements: Array.isArray(parsed.weaknesses) ? parsed.weaknesses : []
//       });
      
//       if (data.pdf_url) {
//         setPdfUrl(`http://localhost:5000${data.pdf_url}`);
//       }

//     } catch (err: any) {
//       console.error("Upload error:", err);
//       setError(err.message || "An unexpected error occurred.");
//     } finally {
//       setUploading(false);
//     }
//   }

//   return (
//     <div className="bg-background text-foreground min-h-screen">
//       <main className="md:ml-20 p-4 md:p-8">
//         <div className="max-w-7xl mx-auto">
          
//           <div className="space-y-2 border-b border-border pb-6 mb-8">
//             <h1 className="text-4xl font-bold tracking-tight text-foreground">
//               Resume Intelligence
//             </h1>
//             <p className="text-muted-foreground">
//               Get AI-powered feedback to optimize your resume for top tech companies.
//             </p>
//           </div>

//           <div className="mb-8">
//             <label className={`cursor-pointer block relative group ${uploading ? "opacity-50 pointer-events-none" : ""}`}>
//               <div className="glass rounded-2xl border-2 border-dashed border-primary/30 p-8 text-center hover:border-primary/50 transition-colors">
                
//                 {uploading ? (
//                    <div className="flex flex-col items-center">
//                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mb-2" />
//                      <p className="font-semibold text-primary">Analyzing content & ATS compatibility...</p>
//                    </div>
//                 ) : (
//                   <>
//                     <Upload className="mx-auto mb-3 text-primary" size={32} />
//                     <p className="font-semibold text-foreground mb-1">
//                       Drop your resume here or click to upload
//                     </p>
//                     <p className="text-sm text-muted-foreground">
//                       Supported formats: PDF
//                     </p>
//                   </>
//                 )}
//               </div>

//               <input
//                 type="file"
//                 accept=".pdf"
//                 onChange={handleFileSelect}
//                 className="hidden"
//                 disabled={uploading}
//               />
//             </label>

//             {error && (
//               <div className="mt-4 p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg flex items-center gap-2">
//                 <AlertCircle size={20} /> {error}
//               </div>
//             )}
//           </div>

//           {(pdfUrl || loading) && (
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//               <div className="lg:col-span-1 h-[600px] sticky top-8">
//                 <PDFViewer fileUrl={pdfUrl} />
//               </div>

//               <div className="lg:col-span-2 space-y-8">
//                 <ResumeScore score={score} loading={uploading || loading} />
//                 <FeedbackTabs parsedData={parsedData} loading={uploading || loading} />
//               </div>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }




// "use client";

// import Navigation from "@/components/navigation"; // Assuming this is your Sidebar
// import PDFViewer from "@/components/resume/pdf-viewer";
// import ResumeScore from "@/components/resume/resume-score";
// import FeedbackTabs from "@/components/resume/feedback-tabs";
// import { Upload, FileText, AlertCircle, Sparkles } from "lucide-react";
// import { useState, useEffect } from "react";

// // ✅ UPDATED INTERFACE
// interface ParsedResume {
//   skills?: string[];
//   education?: Array<{ name?: string, degree?: string, institution?: string, year?: string }>;
//   experience?: Array<{ title?: string, company?: string, duration?: string, description?: string }>;
//   score?: number;
//   feedback?: string[];
//   strengths?: string[];    
//   improvements?: string[]; 
// }

// export default function ResumePage() {
//   const [pdfUrl, setPdfUrl] = useState<string | null>(null);
//   const [score, setScore] = useState<number>(0);
//   const [parsedData, setParsedData] = useState<ParsedResume | null>(null);
//   const [loading, setLoading] = useState(true); 
//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetchLatestResume();
//   }, []);

//   async function fetchLatestResume() {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setLoading(false);
//         return;
//       }

//       const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      
//       const res = await fetch(`${API_URL}/resume`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (res.ok) {
//         const responseData = await res.json();
        
//         if (responseData.success && responseData.data && responseData.data.length > 0) {
//           const latest = responseData.data[0]; 
//           console.log("🔄 Loaded saved resume:", latest);

//           setScore(latest.score || 0);

//           setParsedData({
//             skills: Array.isArray(latest.skills) ? latest.skills : [],
//             education: Array.isArray(latest.education) ? latest.education : [],
//             experience: Array.isArray(latest.experience) ? latest.experience : [],
//             score: latest.score || 0,
//             feedback: Array.isArray(latest.feedback) ? latest.feedback : [],
//             strengths: Array.isArray(latest.strengths) ? latest.strengths : [],       
//             improvements: Array.isArray(latest.weaknesses) ? latest.weaknesses : []    
//           });

//           if (latest.fileURL) {
//             const fullUrl = latest.fileURL.startsWith("http") 
//               ? latest.fileURL 
//               : `http://localhost:5000${latest.fileURL}`;
//             setPdfUrl(fullUrl);
//           }
//         }
//       }
//     } catch (err) {
//       console.error("Failed to load saved resume:", err);
//       setError("Could not load previous resume data.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     if (file.type !== "application/pdf") {
//       alert("Please upload a valid PDF file.");
//       return;
//     }

//     const previewUrl = URL.createObjectURL(file);
//     setPdfUrl(previewUrl);
//     setUploading(true);
//     setError(null);

//     await uploadResume(file);
//   }

//   async function uploadResume(file: File) {
//     const form = new FormData();
//     form.append("file", file);
//     form.append("targetRole", "fullstack-developer");

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         alert("Please log in to upload your resume.");
//         setUploading(false);
//         return;
//       }

//       const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

//       const res = await fetch(`${API_URL}/resume/upload`, {
//         method: "POST",
//         headers: { Authorization: `Bearer ${token}` },
//         body: form,
//       });

//       const responseData = await res.json();

//       if (!responseData.success) {
//         throw new Error(responseData.message || "Upload failed");
//       }

//       console.log("✅ Analysis Success:", responseData);

//       const data = responseData.data;
//       const parsed = data.parsedResume || data; 

//       setScore(parsed.score || 0);
      
//       setParsedData({
//         skills: Array.isArray(parsed.skills) ? parsed.skills : [],
//         education: Array.isArray(parsed.education) ? parsed.education : [],
//         experience: Array.isArray(parsed.experience) ? parsed.experience : [],
//         score: parsed.score || 0,
//         feedback: Array.isArray(parsed.feedback) ? parsed.feedback : [],
//         strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
//         improvements: Array.isArray(parsed.weaknesses) ? parsed.weaknesses : []
//       });
      
//       if (data.pdf_url) {
//         setPdfUrl(`http://localhost:5000${data.pdf_url}`);
//       }

//     } catch (err: any) {
//       console.error("Upload error:", err);
//       setError(err.message || "An unexpected error occurred.");
//     } finally {
//       setUploading(false);
//     }
//   }

//   return (
//     <div className="bg-gray-50 min-h-screen text-gray-900 font-sans">


//       <main className="md:ml-20 transition-all duration-300">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          
//           {/* === Header Section === */}
//           <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-8 mb-8">
//             <div className="space-y-2">
//               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider">
//                 <Sparkles size={14} /> AI Powered
//               </div>
//               <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
//                 Resume Intelligence
//               </h1>
//               <p className="text-gray-500 max-w-xl text-lg">
//                 Upload your resume to get instant scoring, ATS feedback, and actionable improvement tips.
//               </p>
//             </div>
//           </div>

//           {/* === Upload Area === */}
//           <div className="mb-10">
//             <label className={`cursor-pointer block relative group ${uploading ? "pointer-events-none" : ""}`}>
//               <div 
//                 className={`
//                   relative overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 p-8 md:p-10 text-center
//                   ${uploading 
//                     ? "bg-indigo-50 border-indigo-200" 
//                     : "bg-white border-gray-300 hover:border-indigo-400 hover:shadow-lg hover:shadow-indigo-50/50"
//                   }
//                 `}
//               >
//                 {/* Background decorative elements */}
//                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

//                 {uploading ? (
//                    <div className="flex flex-col items-center justify-center py-4">
//                      <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-indigo-600 border-t-transparent mb-4" />
//                      <p className="font-bold text-indigo-900 text-lg">Analyzing your profile...</p>
//                      <p className="text-indigo-600 text-sm mt-1">Checking ATS compatibility & extraction</p>
//                    </div>
//                 ) : (
//                   <div className="transition-transform group-hover:-translate-y-1 duration-300">
//                     <div className="mx-auto bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-indigo-100 transition-colors">
//                         <Upload className="text-indigo-600" size={32} />
//                     </div>
//                     <p className="font-bold text-gray-900 text-lg mb-1">
//                       Drop your resume here or <span className="text-indigo-600 underline decoration-2 underline-offset-2">browse</span>
//                     </p>
//                     <p className="text-sm text-gray-400">
//                       Supports PDF files up to 5MB
//                     </p>
//                   </div>
//                 )}
//               </div>

//               <input
//                 type="file"
//                 accept=".pdf"
//                 onChange={handleFileSelect}
//                 className="hidden"
//                 disabled={uploading}
//               />
//             </label>

//             {error && (
//               <div className="mt-4 p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl flex items-center gap-3 animate-in slide-in-from-top-2">
//                 <AlertCircle size={20} className="shrink-0" /> 
//                 <p className="text-sm font-medium">{error}</p>
//               </div>
//             )}
//           </div>

//           {/* === Main Grid Layout === */}
//           {(pdfUrl || loading) && (
//             <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
//               {/* Left Column: PDF Viewer (4 Cols) */}
//               {/* Uses 'sticky' inside the PDFViewer component logic, or we can enforce it here */}
//               <div className="lg:col-span-4 order-2 lg:order-1">
//                 <PDFViewer fileUrl={pdfUrl} />
//               </div>

//               {/* Right Column: Analysis Results (8 Cols) */}
//               <div className="lg:col-span-8 order-1 lg:order-2 space-y-6">
//                 {/* Score Card */}
//                 <ResumeScore score={score} loading={uploading || loading} />
                
//                 {/* Detailed Tabs */}
//                 {/* Added min-height wrapper to prevent layout shift */}
//                 <div className="min-h-[400px]">
//                     <FeedbackTabs parsedData={parsedData} loading={uploading || loading} />
//                 </div>
//               </div>

//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }




"use client";

import PDFViewer from "@/components/resume/pdf-viewer";
import ResumeScore from "@/components/resume/resume-score";
import FeedbackTabs from "@/components/resume/feedback-tabs";
import { Upload, AlertCircle, Sparkles, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

interface ParsedResume {
  skills?: string[];
  education?: any[];
  experience?: any[];
  score?: number;
  feedback?: string[];
  strengths?: string[];
  improvements?: string[];
}

export default function ResumePage() {
  const router = useRouter();

  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [parsedData, setParsedData] = useState<ParsedResume | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* ---------------------------------------------------
     LOAD LAST SAVED RESUME
  --------------------------------------------------- */
  useEffect(() => {
    fetchLatestResume();
  }, []);

  async function fetchLatestResume() {
    try {
      const res = await api.get("/resume");

      if (res.data?.success && res.data.data?.length > 0) {
        const latest = res.data.data[0];

        setScore(latest.score || 0);
        setParsedData({
          skills: latest.skills || [],
          education: latest.education || [],
          experience: latest.experience || [],
          score: latest.score || 0,
          feedback: latest.feedback || [],
          strengths: latest.strengths || [],
          improvements: latest.weaknesses || [],
        });
      }
    } catch (err: any) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
      } else {
        console.error("Failed to load resume:", err);
        setError("Could not load previous resume data.");
      }
    } finally {
      setLoading(false);
    }
  }

  /* ---------------------------------------------------
     FILE SELECT
  --------------------------------------------------- */
  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload a valid PDF file.");
      return;
    }

    setPdfUrl(URL.createObjectURL(file));
    setUploading(true);
    setError(null);

    await uploadResume(file);
  }

  /* ---------------------------------------------------
     UPLOAD RESUME
  --------------------------------------------------- */
  // async function uploadResume(file: File) {
  //   const form = new FormData();
  //   form.append("file", file);
  //   form.append("targetRole", "fullstack-developer");

  //   try {
  //     const res = await api.post("/resume/upload", form);

  //     if (!res.data?.success) {
  //       throw new Error(res.data?.message || "Upload failed");
  //     }

  //     const parsed = res.data.data.parsedResume;

  //     setScore(parsed.score || 0);
  //     setParsedData({
  //       skills: parsed.skills || [],
  //       education: parsed.education || [],
  //       experience: parsed.experience || [],
  //       score: parsed.score || 0,
  //       feedback: parsed.feedback || [],
  //       strengths: parsed.strengths || [],
  //       improvements: parsed.weaknesses || [],
  //     });
  //   } catch (err: any) {
  //     if (err.response?.status === 401) {
  //       localStorage.removeItem("token");
  //       router.push("/login");
  //     } else {
  //       console.error("Upload error:", err);
  //       setError(err.message || "Upload failed.");
  //     }
  //   } finally {
  //     setUploading(false);
  //   }
  // }

  async function uploadResume(file: File) {
  const form = new FormData();

  // 🔥 MUST MATCH BACKEND EXACTLY
  form.append("resume", file);                 // ✅ was "file"
  form.append("target_role", "fullstack-developer"); // ✅ was "targetRole"

  try {
    const res = await api.post("/resume/upload", form);

    if (!res.data?.success) {
      throw new Error(res.data?.message || "Upload failed");
    }

    const parsed = res.data.data.parsedResume;

    setScore(parsed.score || 0);
    setParsedData({
      skills: parsed.skills || [],
      education: parsed.education || [],
      experience: parsed.experience || [],
      score: parsed.score || 0,
      feedback: parsed.feedback || [],
      strengths: parsed.strengths || [],
      improvements: parsed.weaknesses || [],
    });
  } catch (err: any) {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      router.push("/login");
    } else {
      console.error("Upload error:", err);
      setError(err.message || "Upload failed.");
    }
  } finally {
    setUploading(false);
  }
}

  /* ---------------------------------------------------
     UI
  --------------------------------------------------- */
  return (
    <div className="bg-gray-50 dark:bg-background min-h-screen">
      <main className="md:ml-20">
        <div className="max-w-7xl mx-auto px-6 py-10">

          <div className="mb-8">
            <div className="flex items-center gap-2 text-indigo-600">
              <Sparkles size={14} /> AI Powered
            </div>
            <h1 className="text-3xl font-bold">Resume Intelligence</h1>
          </div>

          <label className="block cursor-pointer mb-6">
            <div className="border-2 border-dashed rounded-xl p-8 text-center">
              {uploading ? (
                <Loader2 className="animate-spin mx-auto" />
              ) : (
                <Upload className="mx-auto" />
              )}
            </div>
            <input type="file" hidden accept=".pdf" onChange={handleFileSelect} />
          </label>

          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded-lg flex gap-2">
              <AlertCircle size={18} /> {error}
            </div>
          )}

          {(pdfUrl || loading) && (
            <div className="grid lg:grid-cols-12 gap-6 mt-8">
              <div className="lg:col-span-4">
                <PDFViewer fileUrl={pdfUrl} />
              </div>
              <div className="lg:col-span-8 space-y-6">
                <ResumeScore score={score} loading={uploading || loading} />
                <FeedbackTabs
                  parsedData={parsedData}
                  loading={uploading || loading}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
