
// "use client"

// import { FileText, ExternalLink } from "lucide-react"

// interface PDFViewerProps {
//   fileUrl?: string | null
// }

// export default function PDFViewer({ fileUrl }: PDFViewerProps) {
//   if (!fileUrl) {
//     return (
//       <div className="bg-white/50 backdrop-blur-sm rounded-2xl border border-dashed border-gray-300 h-64 lg:h-full lg:min-h-[600px] flex flex-col items-center justify-center p-8 lg:sticky lg:top-8 text-center">
//         <div className="bg-white p-4 rounded-full shadow-sm mb-4">
//             <FileText size={32} className="text-indigo-500" />
//         </div>
//         <p className="text-gray-900 font-medium">No Resume Uploaded</p>
//         <span className="text-sm text-gray-500 mt-1">Upload a PDF to see the preview here</span>
//       </div>
//     )
//   }

//   // URL Construction
//   const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
//   const baseUrl = API_URL.replace('/api', '')
//   const pdfUrl = fileUrl.startsWith('http') ? fileUrl : `${baseUrl}${fileUrl}`

//   return (
//     <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden shadow-xl h-[500px] lg:h-[calc(100vh-120px)] lg:sticky lg:top-8 flex flex-col">
      
//       {/* Header */}
//       <div className="p-3 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
//         <h3 className="font-semibold text-gray-200 text-sm flex items-center gap-2">
//             <FileText size={16} /> Resume Preview
//         </h3>
//         <a 
//             href={pdfUrl} 
//             target="_blank" 
//             rel="noopener noreferrer"
//             className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
//         >
//             Open Original <ExternalLink size={12} />
//         </a>
//       </div>

//       {/* iFrame */}
//       <iframe
//         src={pdfUrl}
//         className="w-full flex-1 bg-white"
//         title="Resume PDF"
//       />
//     </div>
//   )
// }




"use client"

import { FileText, ExternalLink } from "lucide-react"

interface PDFViewerProps {
  fileUrl?: string | null
}

export default function PDFViewer({ fileUrl }: PDFViewerProps) {
  if (!fileUrl) {
    return (
      <div className="bg-white/50 dark:bg-muted/10 backdrop-blur-sm rounded-2xl border border-dashed border-gray-300 dark:border-border h-64 lg:h-full lg:min-h-[600px] flex flex-col items-center justify-center p-8 lg:sticky lg:top-8 text-center transition-colors">
        <div className="bg-white dark:bg-card p-4 rounded-full shadow-sm mb-4">
          <FileText size={32} className="text-indigo-500 dark:text-indigo-400" />
        </div>
        <p className="text-gray-900 dark:text-gray-200 font-medium">
          No Resume Uploaded
        </p>
        <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Upload a PDF to see the preview here
        </span>
      </div>
    )
  }

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

  const pdfUrl = fileUrl.startsWith("http")
    ? fileUrl
    : `${API_URL.replace(/\/$/, "")}${fileUrl}`

  return (
    <div className="bg-gray-900 dark:bg-black rounded-2xl border border-gray-800 overflow-hidden shadow-xl h-[500px] lg:h-[calc(100vh-120px)] lg:sticky lg:top-8 flex flex-col">
      
      {/* Header */}
      <div className="p-3 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
        <h3 className="font-semibold text-gray-200 text-sm flex items-center gap-2">
          <FileText size={16} /> Resume Preview
        </h3>
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
        >
          Open Original <ExternalLink size={12} />
        </a>
      </div>

      {/* PDF */}
      <iframe
        src={pdfUrl}
        className="w-full flex-1 bg-white"
        title="Resume PDF"
      />
    </div>
  )
}
