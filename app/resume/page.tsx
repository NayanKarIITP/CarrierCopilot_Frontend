import Navigation from "@/components/navigation"
import PDFViewer from "@/components/resume/pdf-viewer"
import ResumeScore from "@/components/resume/resume-score"
import FeedbackTabs from "@/components/resume/feedback-tabs"
import { Upload } from "lucide-react"
import Navbar from "@/components/ui/navbar"

export default function ResumePage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navigation />
      <Navbar/>
      <main className="md:ml-20 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="space-y-2 border-b border-border pb-6 mb-8">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">Resume Analysis</h1>
            <p className="text-muted-foreground">
              Get AI-powered feedback to optimize your resume for top tech companies.
            </p>
          </div>

          {/* Upload Section */}
          <div className="mb-8">
            <div className="glass rounded-2xl border-2 border-dashed border-primary/30 p-8 text-center cursor-pointer hover:border-primary/50 transition-colors">
              <Upload className="mx-auto mb-3 text-primary" size={32} />
              <p className="font-semibold text-foreground mb-1">Drop your resume here or click to upload</p>
              <p className="text-sm text-muted-foreground">Supported formats: PDF, DOC, DOCX</p>
            </div>
          </div>

          {/* Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - PDF Viewer */}
            <div className="lg:col-span-1">
              <PDFViewer />
            </div>

            {/* Right Columns - Analysis */}
            <div className="lg:col-span-2 space-y-8">
              {/* Resume Score */}
              <ResumeScore score={88} />

              {/* Feedback & Tabs */}
              <FeedbackTabs />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
