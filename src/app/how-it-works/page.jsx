'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import FloatingRoleSwitcher from '../../components/FloatingRoleSwitcher';
import {
  Workflow,
  Sparkles,
  Bot,
  Users,
  Award,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileCheck2,
  Database,
  Cpu,
  Layers,
  Zap,
  HelpCircle,
  Lock,
  Server,
  Terminal,
  Activity,
  Check,
  ChevronRight,
  School
} from 'lucide-react';

export default function HowItWorksPage() {
  const [activeTab, setActiveTab] = useState('pipeline'); // 'pipeline' | 'privacy' | 'lms'

  const stages = [
    {
      num: '01',
      title: 'Teacher Ingests Syllabus & Slide Decks',
      role: 'Faculty Level',
      desc: 'The professor uploads official course syllabi, PDF lecture decks, and practice exams. ICAW parses the documents, segments semantic text chunks, and generates high-dimensional vector embeddings in under 60 seconds.',
      badge: 'Zero-Hallucination Anchor',
      icon: Database
    },
    {
      num: '02',
      title: 'Real-Time Vector Grounding & RAG Retrieval',
      role: 'AI Retrieval Engine',
      desc: 'When a student asks an academic question, the RAG engine performs hybrid semantic retrieval against authorized course slides. The model quotes exact slide numbers, page passages, and chapter references.',
      badge: 'Verifiable Citations',
      icon: Cpu
    },
    {
      num: '03',
      title: 'Adaptive Knowledge Tracing & Diagnostics',
      role: 'Learning Analytics',
      desc: 'Student practice test answers are evaluated against syllabus learning objectives. A Bayesian knowledge tracer pinpoints individual concept gaps and automatically generates spaced-repetition reinforcement drills.',
      badge: 'Targeted Mastery',
      icon: Award
    },
    {
      num: '04',
      title: 'Algorithmic Peer Study Group Matching',
      role: 'Peer Network',
      desc: 'Every Monday and Thursday, the platform matches students based on complementary skill profiles and overlapping weekly availability into dedicated real-time study rooms equipped with collaborative whiteboards.',
      badge: 'Optimal Compatibility',
      icon: Users
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-brand selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        
        {/* ================================================================= */}
        {/* 1. HERO BANNER                                                    */}
        {/* ================================================================= */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-14 shadow-sm text-center max-w-4xl mx-auto space-y-5">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-50 text-brand border border-brand/20 mx-auto">
            <Workflow className="w-3.5 h-3.5 text-brand" />
            <span>Architecture & Operational Lifecycle</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            How ICAW Transforms Higher Education
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Discover the engineering behind verified syllabus RAG tutoring, algorithmic study cohorts, and automated exam readiness diagnostics.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/training"
              className="px-6 py-3 rounded-xl bg-brand text-white font-bold text-xs hover:bg-brand-hover shadow-md shadow-brand/20 transition-all inline-flex items-center space-x-2"
            >
              <span>Explore Interactive Training</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/register"
              className="px-6 py-3 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs hover:bg-slate-200 transition-all"
            >
              Sign Up as Student or Faculty
            </Link>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 2. THE 4 CORE STAGES TIMELINE                                     */}
        {/* ================================================================= */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              The 4-Step Academic Lifecycle
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
              From first lecture slide upload to final exam mastery, every step is synchronized with institutional integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stages.map((stage) => {
              const StageIcon = stage.icon;
              return (
                <div
                  key={stage.num}
                  className="bg-white rounded-3xl border border-slate-200/90 p-8 shadow-xs hover:shadow-md hover:border-brand/40 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-3xl font-black text-brand">
                        {stage.num}
                      </span>
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-brand-50 text-brand border border-brand/20">
                        {stage.badge}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 pt-1">
                      <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                        <StageIcon className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        {stage.role}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-slate-900 leading-snug">
                      {stage.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {stage.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-brand font-semibold">
                    <span>Synchronized with Course Portal</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================================================================= */}
        {/* 3. TECHNICAL RAG PIPELINE DIAGRAM                                 */}
        {/* ================================================================= */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-8 border border-slate-800">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Technical Architecture
            </span>
            <h3 className="text-2xl font-black tracking-tight">
              The ICAW Zero-Hallucination Retrieval Pipeline
            </h3>
            <p className="text-xs text-slate-400 max-w-2xl">
              How student queries travel through dense vector embeddings and cross-encoder re-ranking to yield 100% verified textbook answers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
              <div className="text-emerald-400 font-mono font-bold">Step 1</div>
              <h4 className="font-bold text-sm text-white">Document Vectorization</h4>
              <p className="text-slate-300 leading-relaxed">
                Lecture PDFs are sliced into 512-token semantic chunks with 10% overlap and converted into dense vector embeddings.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
              <div className="text-emerald-400 font-mono font-bold">Step 2</div>
              <h4 className="font-bold text-sm text-white">Cosine Similarity Filter</h4>
              <p className="text-slate-300 leading-relaxed">
                Student query is embedded in real time. Nearest neighbor vector search retrieves top-k relevant slide chunks.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
              <div className="text-emerald-400 font-mono font-bold">Step 3</div>
              <h4 className="font-bold text-sm text-white">Cross-Encoder Re-Ranking</h4>
              <p className="text-slate-300 leading-relaxed">
                Retrieved chunks are scored by an academic cross-encoder to eliminate irrelevant context and pin exact slide numbers.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
              <div className="text-emerald-400 font-mono font-bold">Step 4</div>
              <h4 className="font-bold text-sm text-white">Grounded Generation</h4>
              <p className="text-slate-300 leading-relaxed">
                LLM generates explanation strictly conditioned on verified passages with clickable slide badges.
              </p>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 4. TRADITIONAL LMS VS ICAW COMPARISON                              */}
        {/* ================================================================= */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 shadow-sm space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              Why Traditional LMS Platforms Fall Short
            </h3>
            <p className="text-xs text-slate-500">
              Comparing conventional classroom tools with ICAW's Intelligent Academic Workspace.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Feature & Capability</th>
                  <th className="py-3 px-4">Traditional LMS (Canvas/Blackboard)</th>
                  <th className="py-3 px-4 text-brand font-black">ICAW Academic Workspace</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900">AI Tutoring</td>
                  <td className="py-3.5 px-4 text-slate-500">None, or generic third-party chatbots with high hallucination risk</td>
                  <td className="py-3.5 px-4 font-semibold text-brand">Teacher-Grounded RAG strictly anchored to lecture slides & citations</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900">Study Groups</td>
                  <td className="py-3.5 px-4 text-slate-500">Manual forum threads; 74% of students never form study cohorts</td>
                  <td className="py-3.5 px-4 font-semibold text-brand">Automated bi-weekly algorithmic pairing by schedule & skill complementarity</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900">Exam Preparation</td>
                  <td className="py-3.5 px-4 text-slate-500">Static PDF practice tests with zero personalization</td>
                  <td className="py-3.5 px-4 font-semibold text-brand">Adaptive Bayesian Knowledge Tracing with automated spaced repetition</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900">Real-Time Collaboration</td>
                  <td className="py-3.5 px-4 text-slate-500">Redirects to external tools (Google Docs / Zoom links)</td>
                  <td className="py-3.5 px-4 font-semibold text-brand">Built-in Yjs real-time collaborative workspace with shared whiteboards</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="bg-brand text-white rounded-3xl p-8 sm:p-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl font-black tracking-tight">Ready to Experience ICAW?</h3>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Join thousands of students and faculty streamlining their coursework. Try out our live demo accounts with zero setup.
            </p>
          </div>
          <div className="flex items-center space-x-3 shrink-0">
            <Link
              href="/register"
              className="px-6 py-3.5 rounded-xl bg-white text-brand font-bold text-xs hover:bg-slate-100 transition-all shadow-md"
            >
              Create Free Account
            </Link>
            <Link
              href="/dashboard"
              className="px-6 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white font-bold text-xs hover:bg-white/20 transition-all"
            >
              Open Live Demo
            </Link>
          </div>
        </div>

      </main>

      <Footer />
      <FloatingRoleSwitcher />
    </div>
  );
}
