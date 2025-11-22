"use client"

import { FileText } from "lucide-react"

export default function PDFViewer() {
  return (
    <div className="glass rounded-2xl border border-border h-full min-h-[600px] flex flex-col items-center justify-center p-8 sticky top-8">
      <FileText size={48} className="text-muted-foreground mb-4" />
      <p className="text-muted-foreground text-center">
        PDF Viewer
        <br />
        <span className="text-sm">Resume preview would display here</span>
      </p>
    </div>
  )
}
