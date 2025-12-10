
// "use client";

// import Navigation from "@/components/navigation";
// import PDFViewer from "@/components/resume/pdf-viewer";
// import ResumeScore from "@/components/resume/resume-score";
// import FeedbackTabs from "@/components/resume/feedback-tabs";
// import Navbar from "@/components/ui/navbar";

// import { Upload, FileText, AlertCircle } from "lucide-react";
// import { useState, useEffect } from "react";

// // ✅ UPDATED INTERFACE: Matches your new Backend response structure
// interface ParsedResume {
//   skills?: string[];
//   education?: Array<{ name?: string, degree?: string, institution?: string, year?: string }>;
//   experience?: Array<{ title?: string, company?: string, duration?: string, description?: string }>;
//   score?: number;
//   feedback?: string[];
//   strengths?: string[];    // <-- NEW: For the "Good" tab
//   improvements?: string[]; // <-- NEW: For the "Bad" tab (mapped from 'weaknesses')
// }

// export default function ResumePage() {
//   const [pdfUrl, setPdfUrl] = useState<string | null>(null);
//   const [score, setScore] = useState<number>(0);
//   const [parsedData, setParsedData] = useState<ParsedResume | null>(null);
//   const [loading, setLoading] = useState(true); // Start true to check for existing data
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

//           // ✅ MAP BACKEND DATA TO FRONTEND STATE SAFEGUARDS
//           // We use '|| []' to prevent the "map is not a function" crash
//           setParsedData({
//             skills: Array.isArray(latest.skills) ? latest.skills : [],
//             education: Array.isArray(latest.education) ? latest.education : [],
//             experience: Array.isArray(latest.experience) ? latest.experience : [],
//             score: latest.score || 0,
//             feedback: Array.isArray(latest.feedback) ? latest.feedback : [],
//             strengths: Array.isArray(latest.strengths) ? latest.strengths : [],       // Load saved strengths
//             improvements: Array.isArray(latest.weaknesses) ? latest.weaknesses : []    // Map DB 'weaknesses' to UI 'improvements'
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

//     // Validate (Real World Check)
//     if (file.type !== "application/pdf") {
//       alert("Please upload a valid PDF file.");
//       return;
//     }

//     // Instant Preview
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
//       // Handle nested data structure variations
//       const parsed = data.parsedResume || data; 

//       setScore(parsed.score || 0);
      
//       // ✅ UPDATE STATE WITH NEW ANALYSIS
//       setParsedData({
//         skills: Array.isArray(parsed.skills) ? parsed.skills : [],
//         education: Array.isArray(parsed.education) ? parsed.education : [],
//         experience: Array.isArray(parsed.experience) ? parsed.experience : [],
//         score: parsed.score || 0,
//         feedback: Array.isArray(parsed.feedback) ? parsed.feedback : [],
//         strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],      // From Python Analysis
//         improvements: Array.isArray(parsed.weaknesses) ? parsed.weaknesses : []   // From Python Analysis
//       });
      
//       if (data.pdf_url) {
//         setPdfUrl(`http://localhost:5000${data.pdf_url}`);
//       }

//     } catch (err: any) {
//       console.error("Upload error:", err);
//       setError(err.message || "An unexpected error occurred.");
//       // Don't clear PDF url on error so user can still see what they tried to upload
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

//           {/* Upload Area */}
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

//           {/* Main Layout */}
//           {(pdfUrl || loading) && (
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//               {/* PDF Viewer */}
//               <div className="lg:col-span-1 h-[600px] sticky top-8">
//                 <PDFViewer fileUrl={pdfUrl} />
//               </div>

//               {/* Analysis Results */}
//               <div className="lg:col-span-2 space-y-8">
//                 <ResumeScore score={score} loading={uploading || loading} />
                
//                 {/* Ensure your FeedbackTabs component uses 'strengths' and 'improvements'.
//                     We pass the whole object so it can choose what to render.
//                 */}
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







"use client";

import Navigation from "@/components/navigation";
import PDFViewer from "@/components/resume/pdf-viewer";
import ResumeScore from "@/components/resume/resume-score";
import FeedbackTabs from "@/components/resume/feedback-tabs";
import Navbar from "@/components/ui/navbar";

import { Upload, FileText, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";

// ✅ UPDATED INTERFACE: Matches your new Backend response structure
interface ParsedResume {
  skills?: string[];
  education?: Array<{ name?: string, degree?: string, institution?: string, year?: string }>;
  experience?: Array<{ title?: string, company?: string, duration?: string, description?: string }>;
  score?: number;
  feedback?: string[];
  strengths?: string[];    // <-- NEW: For the "Good" tab
  improvements?: string[]; // <-- NEW: For the "Bad" tab (mapped from 'weaknesses')
}

export default function ResumePage() {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [parsedData, setParsedData] = useState<ParsedResume | null>(null);
  const [loading, setLoading] = useState(true); // Start true to check for existing data
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

          setScore(latest.score || 0);

          // ✅ MAP BACKEND DATA TO FRONTEND STATE SAFEGUARDS
          // We use '|| []' to prevent the "map is not a function" crash
          setParsedData({
            skills: Array.isArray(latest.skills) ? latest.skills : [],
            education: Array.isArray(latest.education) ? latest.education : [],
            experience: Array.isArray(latest.experience) ? latest.experience : [],
            score: latest.score || 0,
            feedback: Array.isArray(latest.feedback) ? latest.feedback : [],
            strengths: Array.isArray(latest.strengths) ? latest.strengths : [],       // Load saved strengths
            improvements: Array.isArray(latest.weaknesses) ? latest.weaknesses : []    // Map DB 'weaknesses' to UI 'improvements'
          });

          if (latest.fileURL) {
            const fullUrl = latest.fileURL.startsWith("http") 
              ? latest.fileURL 
              : `http://localhost:5000${latest.fileURL}`;
            setPdfUrl(fullUrl);
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

    // Validate (Real World Check)
    if (file.type !== "application/pdf") {
      alert("Please upload a valid PDF file.");
      return;
    }

    // Instant Preview
    const previewUrl = URL.createObjectURL(file);
    setPdfUrl(previewUrl);
    setUploading(true);
    setError(null);

    await uploadResume(file);
  }

  async function uploadResume(file: File) {
    const form = new FormData();
    form.append("file", file);
    form.append("targetRole", "fullstack-developer");

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

      console.log("✅ Analysis Success:", responseData);

      const data = responseData.data;
      // Handle nested data structure variations
      const parsed = data.parsedResume || data; 

      setScore(parsed.score || 0);
      
      // ✅ CRITICAL FIX: Sanitize incoming data immediately
      setParsedData({
        skills: Array.isArray(parsed.skills) ? parsed.skills : [],
        education: Array.isArray(parsed.education) ? parsed.education : [],
        experience: Array.isArray(parsed.experience) ? parsed.experience : [],
        score: parsed.score || 0,
        feedback: Array.isArray(parsed.feedback) ? parsed.feedback : [],
        strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
        improvements: Array.isArray(parsed.weaknesses) ? parsed.weaknesses : []
      });
      
      if (data.pdf_url) {
        setPdfUrl(`http://localhost:5000${data.pdf_url}`);
      }

    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      <main className="md:ml-20 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="space-y-2 border-b border-border pb-6 mb-8">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              Resume Intelligence
            </h1>
            <p className="text-muted-foreground">
              Get AI-powered feedback to optimize your resume for top tech companies.
            </p>
          </div>

          {/* Upload Area */}
          <div className="mb-8">
            <label className={`cursor-pointer block relative group ${uploading ? "opacity-50 pointer-events-none" : ""}`}>
              <div className="glass rounded-2xl border-2 border-dashed border-primary/30 p-8 text-center hover:border-primary/50 transition-colors">
                
                {uploading ? (
                   <div className="flex flex-col items-center">
                     <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mb-2" />
                     <p className="font-semibold text-primary">Analyzing content & ATS compatibility...</p>
                   </div>
                ) : (
                  <>
                    <Upload className="mx-auto mb-3 text-primary" size={32} />
                    <p className="font-semibold text-foreground mb-1">
                      Drop your resume here or click to upload
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Supported formats: PDF
                    </p>
                  </>
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
              <div className="mt-4 p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg flex items-center gap-2">
                <AlertCircle size={20} /> {error}
              </div>
            )}
          </div>

          {/* Main Layout */}
          {(pdfUrl || loading) && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* PDF Viewer */}
              <div className="lg:col-span-1 h-[600px] sticky top-8">
                <PDFViewer fileUrl={pdfUrl} />
              </div>

              {/* Analysis Results */}
              <div className="lg:col-span-2 space-y-8">
                <ResumeScore score={score} loading={uploading || loading} />
                
                {/* Ensure FeedbackTabs receives the sanitized data */}
                <FeedbackTabs parsedData={parsedData} loading={uploading || loading} />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}