
// "use client";

// import { FileText, ExternalLink } from "lucide-react";

// interface PDFViewerProps {
//   fileUrl?: string | null;
// }

// export default function PDFViewer({ fileUrl }: PDFViewerProps) {
//   if (!fileUrl) {
//     return (
//       <div className="bg-white/50 dark:bg-muted/10 backdrop-blur-sm rounded-2xl border border-dashed border-gray-300 dark:border-border h-64 lg:h-full lg:min-h-[600px] flex flex-col items-center justify-center p-8 text-center">
//         <div className="bg-white dark:bg-card p-4 rounded-full shadow-sm mb-4">
//           <FileText size={32} className="text-indigo-500" />
//         </div>
//         <p className="font-medium">No Resume Uploaded</p>
//         <span className="text-sm text-gray-500 mt-1">
//           Upload a PDF to see the preview here
//         </span>
//       </div>
//     );
//   }

//   // ✅ BACKEND ALREADY SENDS FULL URL — USE AS IS
//   // const pdfUrl = fileUrl;
//   const pdfUrl = fileUrl
//   ? fileUrl.replace("http://", "https://")
//   : "";

//   return (
//     <div className="bg-gray-900 rounded-2xl border overflow-hidden shadow-xl h-[520px] lg:h-[calc(100vh-140px)] flex flex-col">
//       {/* Header */}
//       <div className="p-3 bg-gray-800 border-b flex justify-between items-center">
//         <h3 className="font-semibold text-sm flex items-center gap-2 text-gray-200">
//           <FileText size={16} /> Resume Preview
//         </h3>

//         <a
//           href={pdfUrl}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-xs text-indigo-400 flex items-center gap-1"
//         >
//           Open Original <ExternalLink size={12} />
//         </a>
//       </div>

//       {/* PDF */}
//       <iframe
//         src={pdfUrl}
//         className="w-full flex-1 bg-white"
//         title="Resume PDF"
//       />
//     </div>
//   );
// }




"use client";

import { useState } from 'react';
import { FileText, ExternalLink } from "lucide-react";

// ✅ 1. DEFINE THE MISSING COMPONENT HERE
function EmptyState() {
  return (
    <div className="bg-white/50 dark:bg-muted/10 backdrop-blur-sm rounded-2xl border border-dashed border-gray-300 dark:border-border h-64 lg:h-full lg:min-h-[600px] flex flex-col items-center justify-center p-8 text-center">
      <div className="bg-white dark:bg-card p-4 rounded-full shadow-sm mb-4">
        <FileText size={32} className="text-indigo-500" />
      </div>
      <p className="font-medium">No Resume Uploaded</p>
      <span className="text-sm text-gray-500 mt-1">
        Upload a PDF to see the preview here
      </span>
    </div>
  );
}

interface PDFViewerProps {
  fileUrl?: string | null;
}

export default function PDFViewer({ fileUrl }: PDFViewerProps) {
  // ✅ 2. USE IT SAFELY
  if (!fileUrl) {
    return <EmptyState />;
  }

  // Handle blob URLs safely
  let pdfUrl = fileUrl || "";
  if (pdfUrl.startsWith("http://") && !pdfUrl.includes("localhost") && !pdfUrl.startsWith("blob:")) {
      pdfUrl = pdfUrl.replace("http://", "https://");
  }

  return (
    <div className="bg-gray-900 rounded-2xl border overflow-hidden shadow-xl h-[520px] lg:h-[calc(100vh-140px)] flex flex-col">
      <div className="p-3 bg-gray-800 border-b flex justify-between items-center">
        <h3 className="font-semibold text-sm flex items-center gap-2 text-gray-200">
          <FileText size={16} /> Resume Preview
        </h3>
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-indigo-400 flex items-center gap-1"
        >
          Open Original <ExternalLink size={12} />
        </a>
      </div>

      <iframe
        src={pdfUrl}
        className="w-full flex-1 bg-white"
        title="Resume PDF"
      />
    </div>
  );
}