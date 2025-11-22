import Navigation from "@/components/navigation"
import VideoFeed from "@/components/interviewer/video-feed"
import QuestionDisplay from "@/components/interviewer/question-display"
import LiveFeedback from "@/components/interviewer/live-feedback"
import InterviewControls from "@/components/interviewer/interview-controls"
import Navbar from "@/components/ui/navbar"

export default function InterviewerPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navigation />
      <Navbar/>

      <main className="md:ml-20 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="space-y-2 border-b border-border pb-6 mb-8">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">AI Virtual Interviewer</h1>
            <p className="text-muted-foreground">Practice real interview scenarios and get instant AI feedback.</p>
          </div>

          {/* Main Interview Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Video Feed */}
            <div className="lg:col-span-2 space-y-6">
              {/* Video Feed */}
              <VideoFeed isStreaming={true} />

              {/* Question Display */}
              <QuestionDisplay
                question="Tell me about a time you faced a conflict with a teammate. How did you resolve it?"
                followUp="What would you do differently next time?"
              />

              {/* Controls */}
              <InterviewControls />
            </div>

            {/* Right Column - Live Feedback */}
            <div>
              <LiveFeedback />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
