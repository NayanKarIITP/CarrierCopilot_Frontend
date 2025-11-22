

"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Navbar from "@/components/ui/navbar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RoadmapPage() {
  const [selectedRole, setSelectedRole] = useState("senior-fullstack")

  const targetRoles = [
    { value: "senior-fullstack", label: "Senior Full-Stack Developer" },
    { value: "data-scientist", label: "Data Scientist" },
    { value: "devops", label: "DevOps Engineer" },
    { value: "ml-engineer", label: "AI/ML Engineer" },
  ]

  const roadmapSteps = [
    {
      step: 1,
      icon: "✓",
      title: "Your Foundation",
      subtitle: "Current Strengths",
      color: "bg-green-100 dark:bg-green-900",
      textColor: "text-green-700 dark:text-green-100",
      items: ["Node.js", "React", "Python", "MongoDB", "AWS"],
      type: "skills",
    },
    {
      step: 2,
      icon: "⚠",
      title: "Skills to Acquire",
      subtitle: "Identified Gaps",
      color: "bg-amber-100 dark:bg-amber-900",
      textColor: "text-amber-700 dark:text-amber-100",
      items: ["Kubernetes", "GraphQL", "CI/CD", "Docker", "System Design"],
      type: "gaps",
    },
    {
      step: 3,
      icon: "📚",
      title: "Recommended Courses",
      subtitle: "Learning Resources",
      color: "bg-blue-100 dark:bg-blue-900",
      textColor: "text-blue-700 dark:text-blue-100",
      items: [
        { title: "Kubernetes for Beginners", platform: "Coursera" },
        { title: "GraphQL Masterclass", platform: "Udemy" },
        { title: "Docker & Container Systems", platform: "Pluralsight" },
      ],
      type: "courses",
    },
    {
      step: 4,
      icon: "🔨",
      title: "Recommended Projects",
      subtitle: "Build Experience",
      color: "bg-purple-100 dark:bg-purple-900",
      textColor: "text-purple-700 dark:text-purple-100",
      items: [
        "Deploy a microservices app using Kubernetes",
        "Build a real-time dashboard with GraphQL subscriptions",
        "Create a CI/CD pipeline with GitHub Actions",
      ],
      type: "projects",
    },
    {
      step: 5,
      icon: "🚀",
      title: "Trending Roles to Target",
      subtitle: "Your Next Move",
      color: "bg-indigo-100 dark:bg-indigo-900",
      textColor: "text-indigo-700 dark:text-indigo-100",
      items: [
        { title: "Senior Backend Engineer", company: "Google", match: "95%" },
        { title: "Full-Stack Tech Lead", company: "Meta", match: "92%" },
        { title: "Architect", company: "Amazon", match: "88%" },
      ],
      type: "roles",
    },
  ]

  return (
  <div className="min-h-screen bg-background text-foreground">
    <Navigation />
    <Navbar />

    <main className="md:ml-20 p-4 md:p-8">
      <div className="max-w-7xl mx-auto w-full space-y-10">

        {/* Header */}
        <div className="px-2 md:px-0">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Your AI-Powered Growth Roadmap
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            A personalized plan to help you achieve your career goals.
          </p>
        </div>

        {/* Target Role */}
        <Card className="p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-bold mb-4">Target Role</h2>

          <div className="flex flex-col md:flex-row gap-4 md:items-center">
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-full md:w-64">
                <SelectValue placeholder="Select your target role" />
              </SelectTrigger>
              <SelectContent>
                {targetRoles.map((role) => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button className="w-full md:w-auto px-8">Apply Roadmap</Button>
          </div>
        </Card>

        {/* Timeline */}
        <h2 className="text-xl md:text-2xl font-bold px-2 md:px-0">
          Your Personalized Roadmap
        </h2>

        {roadmapSteps.map((step, i) => (
          <div key={i} className="relative">

            {/* Vertical line (desktop only) */}
            {i !== roadmapSteps.length - 1 && (
              <div className="hidden md:block absolute left-8 top-20 bottom-0 w-1 bg-border" />
            )}

            <Card className="p-4 md:p-6 relative">
              
              {/* Step Icon */}
              <div
                className={`absolute -left-4 md:-left-6 top-4 md:top-6 w-10 h-10 md:w-12 md:h-12 rounded-full 
                ${step.color} ${step.textColor} flex items-center justify-center 
                text-lg md:text-xl font-bold border-4 border-background`}
              >
                {step.icon}
              </div>

              <div className="ml-8 md:ml-10">

                <p className="text-xs md:text-sm text-muted-foreground">
                  Step {step.step}
                </p>

                <h3 className="text-xl md:text-2xl font-bold">{step.title}</h3>

                <p className="text-xs md:text-sm text-muted-foreground mb-4">
                  {step.subtitle}
                </p>

                {/* STEP CONTENT BELOW */}

                {/* Skills */}
                {step.type === "skills" && (
                  <div className="flex flex-wrap gap-2">
                    {step.items.map((x:any) => (
                      <span
                        key={x}
                        className="px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-xs md:text-sm"
                      >
                        {x}
                      </span>
                    ))}
                  </div>
                )}

                {/* Gaps */}
                {step.type === "gaps" && (
                  <div className="flex flex-wrap gap-2">
                    {step.items.map((x:any) => (
                      <span
                        key={x}
                        className="px-3 py-1.5 bg-amber-100 text-amber-800 rounded-full text-xs md:text-sm"
                      >
                        {x}
                      </span>
                    ))}
                  </div>
                )}

                {/* Courses */}
                {step.type === "courses" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {step.items.map((c:any) => (
                      <Card key={c.title} className="p-4 bg-muted">
                        <h4 className="font-semibold mb-2 text-sm">{c.title}</h4>
                        <p className="text-xs text-muted-foreground mb-3">{c.platform}</p>
                        <Button variant="outline" size="sm" className="w-full">
                          View Course
                        </Button>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Projects */}
                {step.type === "projects" && (
                  <div className="space-y-3">
                    {step.items.map((p:any) => (
                      <div key={p} className="p-4 border rounded-lg">
                        <p className="font-medium text-sm md:text-base">Project: {p}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Roles */}
                {step.type === "roles" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {step.items.map((r:any) => (
                      <Card key={r.title} className="p-4 hover:bg-muted transition">
                        <h4 className="font-semibold text-sm mb-1">{r.title}</h4>
                        <p className="text-xs text-muted-foreground mb-2">{r.company}</p>

                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-primary">{r.match} match</span>
                          <Button variant="ghost" size="sm">→</Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}

              </div>
            </Card>
          </div>
        ))}

      </div>
    </main>
  </div>
)
}

