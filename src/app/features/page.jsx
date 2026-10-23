'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import FloatingRoleSwitcher from '../../components/FloatingRoleSwitcher';
import {
  Bot,
  Users,
  Award,
  BookOpen,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileCheck2,
  Sliders,
  Database,
  Cpu,
  Layers,
  LineChart,
  Code2,
  Share2,
  Check,
  Zap,
  Terminal,
  Activity,
  Lock
} from 'lucide-react';

export default function FeaturesPage() {
  const [filter, setFilter] = useState('all');

  const allFeatures = [
    {
      id: 'rag-engine',
      category: 'ai',
      title: 'Teacher-Approved RAG AI Tutor',
      desc: 'Hallucination-free answers anchored directly to verified lecture slides and textbooks. Every answer includes slide numbers and page citations.',
      icon: Bot,
      stats: '100% Verifiable Source Match',
      technical: 'Cross-encoder re-ranking with 512-token semantic chunks'
    },
    {
      id: 'peer-matching',
      category: 'collaboration',
      title: 'Algorithmic Study Group Matching',
      desc: 'Bi-weekly matching matrix groups students by complementary academic strengths and overlapping weekly calendar availability.',
      icon: Users,
      stats: 'Twice-Weekly Matching Cycles',
      technical: 'K-means availability clustering with skill balance constraints'
    },
    {
      id: 'adaptive-exam',
      category: 'analytics',
      title: 'Adaptive Spaced-Repetition Exam Prep',
      desc: 'Neural knowledge tracing diagnoses hidden topic gaps from quiz attempts and generates personalized spaced repetition quizzes.',
      icon: Award,
      stats: '+42% Avg Score Lift',
      technical: 'Bayesian Knowledge Tracing (BKT) with skill decay curves'
    },
    {
      id: 'realtime-canvas',
      category: 'collaboration',
      title: 'Real-Time Yjs Collaborative Workspace',
      desc: 'Zero-latency shared academic whiteboard and note sync powered by CRDTs, letting study cohorts work through problem sets together.',
      icon: Share2,
      stats: '<15ms Local Sync Latency',
      technical: 'Yjs CRDT state vectors over WebRTC peer mesh'
    },
    {
      id: 'faculty-authority',
      category: 'faculty',
      title: 'Faculty Syllabus Ingestion & Scope Bounds',
      desc: 'Educators drag and drop course slide PDFs and practice sets, immediately vectorizing curriculum content with strict answer constraints.',
      icon: BookOpen,
      stats: '60s Vector Embedding Indexing',
      technical: 'Automated OCR & tabular data parsing for slide presentations'
    },
    {
      id: 'answer-review',
      category: 'faculty',
      title: 'Instructor Answer Review Queue',
      desc: 'Professors audit student queries, endorse model explanations with official instructor notes, and broadcast clarifications to all enrolled portals.',
      icon: FileCheck2,
      stats: '1-Click Campus Broadcast',
      technical: 'Real-time WebSocket notification pipeline to course rosters'
    },
    {
      id: 'mastery-analytics',
      category: 'analytics',
      title: 'Curriculum Mastery Analytics',
      desc: 'Granular topic-by-topic comprehension charts showing students and faculty exactly which chapters require review before exam day.',
      icon: LineChart,
      stats: 'Real-time Diagnostic Feedback',
      technical: 'Topic-level mastery aggregation with cohort percentile mapping'
    },
    {
      id: 'sovereign-data',
      category: 'ai',
      title: 'Institutional Tenant Data Isolation',
      desc: 'Every university department maintains an isolated vector database. Student queries are never used to train public commercial AI models.',
      icon: ShieldCheck,
      stats: 'FERPA & SOC2 Ready',
      technical: 'Row-level security with TLS 1.3 & AES-256 data encryption'
    }
  ];

  const filtered = filter === 'all'
    ? allFeatures
    : allFeatures.filter((f) => f.category === filter);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-brand selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        
        {/* ================================================================= */}
        {/* HERO: Capabilities & Features Catalog                             */}
        {/* ================================================================= */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-14 shadow-sm text-center max-w-4xl mx-auto space-y-5">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-50 text-brand border border-brand/20 mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-brand" />
            <span>Full SaaS Capabilities & Technical Specifications</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Academic Engineering for Modern Higher Education
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Every feature on ICAW is built from the ground up to solve the real hurdles students and faculty face every semester.
          </p>

          {/* Category Filter Pills */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'all', label: 'All Capabilities' },
              { id: 'ai', label: 'AI & Grounding' },
              { id: 'collaboration', label: 'Peer Collaboration' },
              { id: 'analytics', label: 'Exam Prep & Analytics' },
              { id: 'faculty', label: 'Faculty Authority' }
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setFilter(btn.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filter === btn.id
                    ? 'bg-brand text-white shadow-md shadow-brand/20'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="bg-white rounded-3xl border border-slate-200/90 p-8 shadow-xs hover:shadow-md hover:border-brand/40 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand flex items-center justify-center border border-brand/20">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-bold text-base text-slate-900 leading-snug">
                    {feature.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {feature.desc}
                  </p>

                  <div className="pt-2 text-[11px] text-slate-500 font-mono">
                    <span className="text-slate-400 block font-sans text-[10px] uppercase font-bold">Tech Spec:</span>
                    {feature.technical}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-brand bg-brand-50 px-2.5 py-1 rounded-full border border-brand/20">
                    {feature.stats}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Security & FERPA Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200 shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-bold text-base text-slate-900">FERPA Compliant & Campus Data Sovereign</h4>
              <p className="text-xs text-slate-500 max-w-xl leading-relaxed mt-1">
                Student queries and lecture decks are never shared with public model training pools. All vector indexes remain strictly isolated to your enrolled university domain with AES-256 encryption.
              </p>
            </div>
          </div>
          <Link
            href="/training"
            className="px-6 py-3 rounded-xl bg-brand text-white font-bold text-xs hover:bg-brand-hover transition-all shrink-0 shadow-sm"
          >
            Review Training Guide
          </Link>
        </div>

      </main>

      <Footer />
      <FloatingRoleSwitcher />
    </div>
  );
}
