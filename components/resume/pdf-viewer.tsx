// "use client"

// import { FileText } from "lucide-react"

// export default function PDFViewer() {
//   return (
//     <div className="glass rounded-2xl border border-border h-full min-h-[600px] flex flex-col items-center justify-center p-8 sticky top-8">
//       <FileText size={48} className="text-muted-foreground mb-4" />
//       <p className="text-muted-foreground text-center">
//         PDF Viewer
//         <br />
//         <span className="text-sm">Resume preview would display here</span>
//       </p>
//     </div>
//   )
// }




"use client"

import { FileText } from "lucide-react"

interface PDFViewerProps {
  fileUrl?: string | null
}

export default function PDFViewer({ fileUrl }: PDFViewerProps) {
  if (!fileUrl) {
    return (
      <div className="glass rounded-2xl border border-border h-full min-h-[600px] flex flex-col items-center justify-center p-8 sticky top-8">
        <FileText size={48} className="text-muted-foreground mb-4" />
        <p className="text-muted-foreground text-center">
          PDF Viewer
          <br />
          <span className="text-sm">Upload a resume to preview it here</span>
        </p>
      </div>
    )
  }

  // Get the full URL for the PDF
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
  // Remove /api from the URL to get the base server URL
  const baseUrl = API_URL.replace('/api', '')
  const pdfUrl = fileUrl.startsWith('http') ? fileUrl : `${baseUrl}${fileUrl}`

  console.log("PDF URL:", pdfUrl); // Debug log

  return (
    <div className="glass rounded-2xl border border-border h-full min-h-[600px] overflow-hidden sticky top-8">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold text-foreground">Resume Preview</h3>
      </div>
      <iframe
        src={pdfUrl}
        className="w-full h-[calc(100%-60px)] min-h-[540px]"
        title="Resume PDF"
      />
    </div>
  )
}