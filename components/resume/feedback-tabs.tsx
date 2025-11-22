"use client"

import { useState } from "react"
import { AlertCircle, AlertTriangle, Info, Lightbulb, HelpCircle } from "lucide-react"

interface FeedbackItem {
  id: number
  category: "critical" | "suggestion" | "tip"
  title: string
  description: string
  reason: string
}

const feedbackData: FeedbackItem[] = [
  {
    id: 1,
    category: "critical",
    title: "Add Quantifiable Results",
    description: "Your project descriptions lack specific metrics and outcomes.",
    reason: "Recruiters focus on impact. Use numbers to show what you accomplished.",
  },
  {
    id: 2,
    category: "critical",
    title: "Include Technical Keywords",
    description: "Add more specific technologies used in your projects.",
    reason: "ATS systems scan for relevant tech keywords to match job requirements.",
  },
  {
    id: 3,
    category: "suggestion",
    title: "Expand Experience Summary",
    description: "Your first bullet point under each role could be more specific.",
    reason: "Strong opening bullets grab attention and highlight key achievements.",
  },
  {
    id: 4,
    category: "tip",
    title: "Use Action Verbs",
    description: 'Replace passive language with strong action verbs like "architected" or "optimized".',
    reason: "Action verbs make your contributions sound more impactful.",
  },
]

type TabType = "feedback" | "extracted" | "skills" | "templates"

export default function FeedbackTabs() {
  const [activeTab, setActiveTab] = useState<TabType>("feedback")

  const tabs: { id: TabType; label: string }[] = [
    { id: "feedback", label: "Feedback & Suggestions" },
    { id: "extracted", label: "Extracted Data" },
    { id: "skills", label: "Skill Gap Analysis" },
    { id: "templates", label: "Resume Builder" },
  ]

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "critical":
        return <AlertCircle className="text-red-500" size={20} />
      case "suggestion":
        return <AlertTriangle className="text-amber-500" size={20} />
      case "tip":
        return <Info className="text-blue-500" size={20} />
      default:
        return null
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "critical":
        return "bg-red-500/10 border-red-500/30"
      case "suggestion":
        return "bg-amber-500/10 border-amber-500/30"
      case "tip":
        return "bg-blue-500/10 border-blue-500/30"
      default:
        return ""
    }
  }

  return (
    <div className="glass rounded-2xl border border-border overflow-hidden">
      {/* Tab Navigation */}
      <div className="flex border-b border-border overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 whitespace-nowrap text-sm font-medium transition-colors border-b-2 ${
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "feedback" && (
          <div className="space-y-4">
            {feedbackData.map((item) => (
              <div key={item.id} className={`rounded-lg border p-4 space-y-2 ${getCategoryColor(item.category)}`}>
                <div className="flex gap-3 items-start">
                  <div className="flex-shrink-0 mt-0.5">{getCategoryIcon(item.category)}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{item.title}</h4>
                    <p className="text-sm text-foreground/80">{item.description}</p>
                  </div>
                </div>

                <div className="flex gap-2 ml-8">
                  <HelpCircle size={16} className="text-muted-foreground flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground">
                    <span className="font-semibold">Why this matters:</span> {item.reason}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "extracted" && (
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-foreground mb-3">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {["React", "TypeScript", "Node.js", "GraphQL", "PostgreSQL", "AWS"].map((skill) => (
                  <div
                    key={skill}
                    className="bg-primary/10 border border-primary/30 rounded-full px-3 py-1 text-sm text-foreground"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-3">Education</h4>
              <p className="text-sm text-foreground">B.S. Computer Science - State University (2020)</p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-3">Experience</h4>
              <p className="text-sm text-foreground">Senior Frontend Engineer at TechCorp (2022-Present)</p>
              <p className="text-sm text-foreground">Frontend Engineer at StartupXYZ (2020-2022)</p>
            </div>
          </div>
        )}

        {activeTab === "skills" && (
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-foreground">React</span>
                <span className="text-sm text-muted-foreground">85% vs 90% target</span>
              </div>
              <div className="w-full bg-card rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-primary to-accent h-full" style={{ width: "85%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-foreground">System Design</span>
                <span className="text-sm text-muted-foreground">65% vs 85% target</span>
              </div>
              <div className="w-full bg-card rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-primary to-accent h-full" style={{ width: "65%" }} />
              </div>
            </div>

            <p className="text-sm text-muted-foreground mt-6">
              <Lightbulb size={16} className="inline mr-2" />
              Recommended resources for gaps appear below.
            </p>
          </div>
        )}

        {activeTab === "templates" && (
          <div className="space-y-3">
            <a href="#" className="block p-4 rounded-lg border border-border hover:bg-card/50 transition-colors">
              <p className="font-semibold text-foreground">Explore Template Options</p>
              <p className="text-sm text-muted-foreground">
                Browse professional resume templates tailored for tech roles
              </p>
            </a>

            <a href="#" className="block p-4 rounded-lg border border-border hover:bg-card/50 transition-colors">
              <p className="font-semibold text-foreground">Canva Resume Builder</p>
              <p className="text-sm text-muted-foreground">Design your resume with Canva's drag-and-drop editor</p>
            </a>

            <a href="#" className="block p-4 rounded-lg border border-border hover:bg-card/50 transition-colors">
              <p className="font-semibold text-foreground">Zety Resume Builder</p>
              <p className="text-sm text-muted-foreground">
                Use Zety's AI-powered resume builder for optimized results
              </p>
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
