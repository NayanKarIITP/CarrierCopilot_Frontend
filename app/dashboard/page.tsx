"use client";

import { useEffect, useState } from "react";
import HeaderSection from "@/components/dashboard/header-section";
import ResumeQualityCard from "@/components/dashboard/resume-quality-card";
import ReadinessGauge from "@/components/dashboard/readiness-gauge";
import SkillGapAnalysis from "@/components/dashboard/skill-gap-analysis";
import AITipsFeed from "@/components/dashboard/ai-tips-feed";
import LearningRoadmap from "@/components/dashboard/learning-roadmap";
import PrimaryActionCard from "@/components/dashboard/primary-action-card";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState<any>(null);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("❌ No token found. User not logged in.");
        return;
      }

      const res = await fetch("http://localhost:5000/api/dashboard", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log("📌 DASHBOARD RESPONSE:", data);

      if (data.success) {
        setDashboard(data.data);
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="p-10 text-center text-muted-foreground">
        Loading Dashboard...
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="p-10 text-center text-muted-foreground">
        Failed to load dashboard
      </div>
    );
  }

  const score = dashboard?.resume?.score || 0;
  const skills = dashboard?.resume?.skills || [];
  const gaps = dashboard?.resume?.gaps || [];
  const roadmap = dashboard?.roadmap?.roadmap || [];
  const tips = dashboard?.aiTips || [];

  return (
    <div className="p-6 space-y-8">
      {/* Header Section — dynamic username */}
      <HeaderSection fullName={dashboard.user.fullName} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column */}
        <div className="space-y-6 lg:col-span-2">

          <PrimaryActionCard />

          {/* Resume Score */}
          <ResumeQualityCard score={score} />

          {/* Skill Gap Analysis */}
          <SkillGapAnalysis skills={skills} gaps={gaps} />

          {/* Learning Roadmap */}
          <LearningRoadmap roadmap={roadmap} />
        </div>

        {/* Right Column */}
        <div className="space-y-6">

          {/* Readiness Gauge */}
          <ReadinessGauge score={score} />

          {/* AI Tips */}
          <AITipsFeed tips={tips} />

        </div>
      </div>
    </div>
  );
}
