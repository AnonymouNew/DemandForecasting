import React, { useState } from "react";
import { TrendingUp, Cpu, GraduationCap, LayoutDashboard, Github, Linkedin, Mail, Share2 } from "lucide-react";
import { ProjectCard } from "./components/ProjectCard";
import { ForecastingProject } from "./components/ForecastingProject";
import { MLOpsProject } from "./components/MLOpsProject";
import { InterviewPrep } from "./components/InterviewPrep";
import { cn } from "./lib/utils";

type View = "dashboard" | "forecasting" | "mlops" | "prep" | "github";

export default function App() {
  const [currentView, setCurrentView] = useState<View>("dashboard");

  const projects = [
    {
      id: "forecasting" as View,
      title: "Demand Forecasting",
      description: "Predicting retail demand using hybrid time-series models (Prophet + XGBoost).",
      icon: TrendingUp,
    },
    {
      id: "mlops" as View,
      title: "End-to-End MLOps",
      description: "Predictive maintenance system with real-time monitoring, drift detection, and CI/CD.",
      icon: Cpu,
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 font-sans">
      {/* Sidebar Navigation */}
      <nav className="fixed left-0 top-0 bottom-0 w-20 md:w-64 bg-white border-r border-zinc-200 z-50 flex flex-col">
        <div className="p-6 border-b border-zinc-100 flex items-center gap-3">
          <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center text-white font-bold">DS</div>
          <span className="font-bold text-lg hidden md:block">Portfolio Hub</span>
        </div>
        
        <div className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setCurrentView("dashboard")}
            className={cn(
              "w-full flex items-center gap-3 p-3 rounded-xl transition-colors",
              currentView === "dashboard" ? "bg-zinc-100 text-zinc-900 font-semibold" : "text-zinc-500 hover:bg-zinc-50"
            )}
          >
            <LayoutDashboard size={20} />
            <span className="hidden md:block">Dashboard</span>
          </button>
          
          <div className="pt-4 pb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-zinc-400 hidden md:block">
            Projects
          </div>
          
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => setCurrentView(p.id)}
              className={cn(
                "w-full flex items-center gap-3 p-3 rounded-xl transition-colors",
                currentView === p.id ? "bg-zinc-100 text-zinc-900 font-semibold" : "text-zinc-500 hover:bg-zinc-50"
              )}
            >
              <p.icon size={20} />
              <span className="hidden md:block">{p.title}</span>
            </button>
          ))}

          <div className="pt-4 pb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-zinc-400 hidden md:block">
            Resources
          </div>
          
          <button
            onClick={() => setCurrentView("prep")}
            className={cn(
              "w-full flex items-center gap-3 p-3 rounded-xl transition-colors",
              currentView === "prep" ? "bg-zinc-100 text-zinc-900 font-semibold" : "text-zinc-500 hover:bg-zinc-50"
            )}
          >
            <GraduationCap size={20} />
            <span className="hidden md:block">Interview Prep</span>
          </button>

          <button
            onClick={() => setCurrentView("github")}
            className={cn(
              "w-full flex items-center gap-3 p-3 rounded-xl transition-colors",
              currentView === "github" ? "bg-zinc-100 text-zinc-900 font-semibold" : "text-zinc-500 hover:bg-zinc-50"
            )}
          >
            <Share2 size={20} />
            <span className="hidden md:block">Publish to GitHub</span>
          </button>
        </div>

        <div className="p-4 border-t border-zinc-100 space-y-4">
          <div className="flex justify-center md:justify-start gap-4 px-2">
            <Github size={18} className="text-zinc-400 hover:text-zinc-900 cursor-pointer" />
            <Linkedin size={18} className="text-zinc-400 hover:text-zinc-900 cursor-pointer" />
            <Mail size={18} className="text-zinc-400 hover:text-zinc-900 cursor-pointer" />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="ml-20 md:ml-64 p-6 md:p-12 max-w-7xl mx-auto">
        {currentView === "dashboard" && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-4">
                Data Science Portfolio
              </h1>
              <p className="text-lg text-zinc-500 max-w-2xl">
                Showcasing advanced machine learning projects with a focus on production-grade systems, time-series forecasting, and MLOps best practices.
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((p) => (
                <ProjectCard
                  key={p.id}
                  isActive={false}
                  onClick={() => setCurrentView(p.id)}
                  {...p}
                />
              ))}
            </div>

            <section className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Core Competencies</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["Time Series", "MLOps", "Deep Learning", "Feature Eng", "CI/CD", "Cloud Deployment", "Statistical Analysis", "Data Viz"].map((skill) => (
                  <div key={skill} className="px-4 py-2 bg-zinc-50 rounded-xl border border-zinc-100 text-sm font-medium text-zinc-600 text-center">
                    {skill}
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {currentView === "forecasting" && (
          <div className="space-y-6">
            <button onClick={() => setCurrentView("dashboard")} className="text-zinc-500 hover:text-zinc-900 text-sm flex items-center gap-2">
              ← Back to Dashboard
            </button>
            <h2 className="text-3xl font-bold">Demand Forecasting Project</h2>
            <ForecastingProject />
          </div>
        )}

        {currentView === "mlops" && (
          <div className="space-y-6">
            <button onClick={() => setCurrentView("dashboard")} className="text-zinc-500 hover:text-zinc-900 text-sm flex items-center gap-2">
              ← Back to Dashboard
            </button>
            <h2 className="text-3xl font-bold">End-to-End MLOps System</h2>
            <MLOpsProject />
          </div>
        )}

        {currentView === "github" && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <button onClick={() => setCurrentView("dashboard")} className="text-zinc-500 hover:text-zinc-900 text-sm flex items-center gap-2">
              ← Back to Dashboard
            </button>
            <div className="bg-zinc-900 text-white p-12 rounded-3xl shadow-2xl">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Github size={32} />
                Publish to GitHub
              </h2>
              <p className="text-zinc-400 mb-8 max-w-2xl">
                Since this environment is sandboxed, you need to manually push the code to your GitHub. Follow these commands in your local terminal:
              </p>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-sm font-bold text-zinc-500 uppercase">1. Initialize Repository</p>
                  <pre className="bg-zinc-800 p-4 rounded-xl font-mono text-sm overflow-x-auto border border-zinc-700">
                    git init{"\n"}
                    git add .{"\n"}
                    git commit -m "Initial commit: Data Science Portfolio Hub"
                  </pre>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-bold text-zinc-500 uppercase">2. Link to GitHub</p>
                  <pre className="bg-zinc-800 p-4 rounded-xl font-mono text-sm overflow-x-auto border border-zinc-700">
                    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git{"\n"}
                    git branch -M main{"\n"}
                    git push -u origin main
                  </pre>
                </div>
              </div>

              <div className="mt-12 p-6 bg-red-500/10 border border-red-500/20 rounded-2xl">
                <h4 className="text-red-400 font-bold mb-2">Troubleshooting Authentication Errors:</h4>
                <p className="text-sm text-zinc-300 mb-4">
                  If you see "authentication error" in your terminal, it usually means your local Git isn't logged in. Try these solutions:
                </p>
                <ul className="text-xs text-zinc-400 space-y-2 list-disc pl-4">
                  <li><strong>GitHub CLI (Recommended):</strong> Run <code>gh auth login</code> and follow the prompts.</li>
                  <li><strong>Personal Access Token:</strong> If using HTTPS, use a <a href="https://github.com/settings/tokens" target="_blank" className="text-blue-400 underline">Classic Token</a> as your password.</li>
                  <li><strong>SSH Keys:</strong> Ensure your SSH key is added to your <a href="https://github.com/settings/keys" target="_blank" className="text-blue-400 underline">GitHub account</a>.</li>
                  <li><strong>Credential Manager:</strong> On Windows/Mac, ensure your Git Credential Manager is up to date.</li>
                </ul>
              </div>

              <div className="mt-6 p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                <h4 className="text-emerald-400 font-bold mb-2">Pro Tip:</h4>
                <p className="text-sm text-zinc-300">
                  Ensure you have a <code>.gitignore</code> file to avoid uploading <code>node_modules</code> or your <code>.env</code> file. I've already created one for you in this project!
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
