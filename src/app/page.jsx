'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import FloatingRoleSwitcher from '../components/FloatingRoleSwitcher';
import { useAuthStore } from '../store/useAuthStore';
import {
  Sparkles,
  BrainCircuit,
  Award,
  Users,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  CheckCircle2,
  Cpu,
  Database,
  Layers,
  GraduationCap,
  PlayCircle,
  FileCheck2,
  Clock,
  ChevronRight,
  Zap,
  BarChart3,
  Check,
  Search,
  School,
  Lock,
  Share2,
  Code2,
  Compass,
  CheckSquare,
  HelpCircle,
  TrendingUp,
  FileText,
  Star,
  Quote,
  Sliders,
  ChevronDown,
  ExternalLink,
  Laptop,
  Terminal,
  Activity,
  Bookmark
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function Home() {
  const { user, isAuthenticated } = useAuthStore();
  
  // Interactive Studio Tab
  const [activeStudioTab, setActiveStudioTab] = useState('tutor'); // 'tutor' | 'whiteboard' | 'groups' | 'exams'
  
  // Interactive Domain Switcher
  const [activeDomain, setActiveDomain] = useState('cs'); // 'cs' | 'math' | 'med' | 'econ'

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(0);

  // RAG Studio Simulator State
  const samplePrompts = [
    {
      q: 'Why does Batch Normalization struggle with small batch sizes?',
      a: 'Batch Normalization estimates batch mean and variance across the mini-batch dimension. With small batch sizes (e.g. batch size < 8), sample statistics become noisy approximations of the population, inducing severe variance into activations and degrading gradient stability.',
      source: 'CS401 Lecture 07: Normalization & Optimization',
      slide: 'Slide 34',
      conf: '99.4% Verified Match'
    },
    {
      q: 'Derive the time complexity of Dijkstra with a Fibonacci Heap vs Binary Heap.',
      a: 'With a Binary Heap, Dijkstra runs in O((V + E) log V). With a Fibonacci Heap, the decrease-key operation drops from O(log V) to amortized O(1), yielding an optimal asymptotic upper bound of O(E + V log V), drastically outperforming on dense graphs where E ≈ V².',
      source: 'CS302 Advanced Algorithms & Graph Theory',
      slide: 'Slide 52, Section 4.3',
      conf: '99.1% Verified Match'
    },
    {
      q: 'Explain the mathematical intuition behind Self-Attention in Transformers.',
      a: 'Self-attention maps a query vector against all key vectors via scaled dot-product QK^T / sqrt(d_k), producing a softmax-normalized weight distribution. This dynamically scales value vectors, enabling tokens to aggregate contextual information across arbitrary distances in O(1) sequential steps.',
      source: 'CS605 Deep Generative Architectures & LLMs',
      slide: 'Slide 16, Transformer Foundations',
      conf: '99.7% Verified Match'
    }
  ];

  const [activePromptIndex, setActivePromptIndex] = useState(0);
  const [customQuery, setCustomQuery] = useState('');
  const [isSimulatingRAG, setIsSimulatingRAG] = useState(false);
  const [activeRAGResult, setActiveRAGResult] = useState(samplePrompts[0]);

  const handleRunRAGSimulation = (promptObj) => {
    setIsSimulatingRAG(true);
    setTimeout(() => {
      setIsSimulatingRAG(false);
      setActiveRAGResult(promptObj);
      toast.success('Vector retrieved & verified against professor syllabus slides!');
    }, 450);
  };

  const handleCustomQuerySubmit = (e) => {
    e.preventDefault();
    if (!customQuery.trim()) return;
    setIsSimulatingRAG(true);
    setTimeout(() => {
      setIsSimulatingRAG(false);
      setActiveRAGResult({
        q: customQuery,
        a: `Syllabus grounding successful for "${customQuery}". The vector embedding matched 3 semantic chunks from course materials. Proof and key theorems verified with active course slides.`,
        source: 'CS401 Curriculum Slide Deck & Reading Notes',
        slide: 'Verified Slide Deck',
        conf: '98.9% Semantic Confidence'
      });
      toast.success('Grounded answer synthesized from course slides!');
    }, 550);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans relative selection:bg-brand selection:text-white">
      {/* Universal Sticky Navbar */}
      <Navbar />

      <main className="flex-1 flex flex-col">
        
        {/* ================================================================= */}
        {/* 1. HERO SECTION WITH AMBIENT LIGHT & FLOATING PILLS               */}
        {/* ================================================================= */}
        <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 border-b border-slate-200/60">
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-brand/8 via-emerald-500/5 to-transparent pointer-events-none rounded-full blur-3xl -z-10" />
          <div className="absolute top-40 right-10 w-96 h-96 bg-brand/5 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            
            {/* Live Operational Status Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-50 text-brand border border-brand/20 shadow-xs animate-in fade-in duration-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                {user ? `${user.role.toUpperCase()} MODE ACTIVE • ${user.name}` : 'CAMPUS VECTOR PLATFORM • UNIVERSITY GRADE'}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.08] max-w-4xl mx-auto">
              The Intelligent Workspace for University Education
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Unifying teacher-approved RAG AI tutoring, adaptive exam mastery, and peer study group matching into one university platform. Zero hallucinations, verified citations, and collaborative peer cohorts.
            </p>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/dashboard"
                id="hero-launch-workspace-btn"
                className="px-8 py-4 rounded-2xl bg-brand text-white font-bold text-sm shadow-xl shadow-brand/25 hover:bg-brand-hover hover:scale-102 active:scale-95 transition-all inline-flex items-center space-x-3 cursor-pointer"
              >
                <span>Launch Workspace Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/training"
                id="hero-explore-training-btn"
                className="px-8 py-4 rounded-2xl bg-white text-slate-800 border border-slate-200/90 font-bold text-sm shadow-sm hover:bg-slate-50 hover:border-brand/40 hover:text-brand transition-all inline-flex items-center space-x-2.5 cursor-pointer"
              >
                <GraduationCap className="w-4 h-4 text-brand" />
                <span>Explore Platform Training</span>
              </Link>
            </div>

            {/* Trust Pill Bar */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-semibold text-slate-500">
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero AI Hallucinations</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>FERPA-Isolated Vector Storage</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <Users className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Bi-Weekly Algorithmic Peer Matching</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <Award className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Free for Verified .edu Students</span>
              </span>
            </div>

          </div>
        </section>

        {/* ================================================================= */}
        {/* 2. STATS & INSTITUTIONAL ADOPTION BANNER                          */}
        {/* ================================================================= */}
        <section className="bg-white border-b border-slate-200/70 py-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-black text-brand font-mono">100%</div>
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">Curriculum Bounded</div>
                <div className="text-[11px] text-slate-500">Answers verified to slide & page</div>
              </div>
              <div className="space-y-1 pt-4 lg:pt-0">
                <div className="text-3xl sm:text-4xl font-black text-brand font-mono">+42%</div>
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">Average Grade Lift</div>
                <div className="text-[11px] text-slate-500">On semester midterms & finals</div>
              </div>
              <div className="space-y-1 pt-4 lg:pt-0">
                <div className="text-3xl sm:text-4xl font-black text-brand font-mono">&lt;60s</div>
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">Syllabus Ingestion</div>
                <div className="text-[11px] text-slate-500">Instant course slide vectorization</div>
              </div>
              <div className="space-y-1 pt-4 lg:pt-0">
                <div className="text-3xl sm:text-4xl font-black text-brand font-mono">18,500+</div>
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">Study Cohorts Formed</div>
                <div className="text-[11px] text-slate-500">Automated schedule-matched groups</div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 3. INTERACTIVE MULTI-STUDIO SIMULATOR (Live In-Browser Testing)   */}
        {/* ================================================================= */}
        <section className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20 space-y-8">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-50 text-brand border border-brand/20">
              Interactive Academic Studio
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Experience the Platform in Action
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Click through the live simulator below to test our syllabus RAG tutor, inspect collaborative whiteboards, review study matching, and explore knowledge graphs.
            </p>

            {/* Studio Navigation Tabs - Balanced Responsive Layout */}
            <div className="pt-4 max-w-5xl mx-auto w-full">
              <div className="grid grid-cols-2 md:grid-cols-4 p-1.5 bg-slate-200/80 backdrop-blur rounded-2xl border border-slate-300/80 gap-2 shadow-inner">
                {[
                  { id: 'tutor', label: '1. RAG AI Tutor', icon: BrainCircuit },
                  { id: 'whiteboard', label: '2. Real-Time Canvas', icon: Share2 },
                  { id: 'groups', label: '3. Cohort Matcher', icon: Users },
                  { id: 'exams', label: '4. Knowledge Map', icon: Award }
                ].map((tab) => {
                  const TabIcon = tab.icon;
                  const isSelected = activeStudioTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveStudioTab(tab.id)}
                      className={`flex items-center justify-center space-x-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                        isSelected
                          ? 'bg-brand text-white shadow-md shadow-brand/25 ring-1 ring-brand/50 scale-[1.01]'
                          : 'text-slate-700 hover:text-slate-900 hover:bg-white/70'
                      }`}
                    >
                      <TabIcon className="w-3.5 h-3.5 shrink-0" />
                      <span className="whitespace-nowrap">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* SIMULATOR WINDOW CONTAINER */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-900/5 p-6 sm:p-10 transition-all">
            
            {/* 1. RAG AI TUTOR STUDIO */}
            {activeStudioTab === 'tutor' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left: Query Controls & Prompts */}
                <div className="lg:col-span-5 space-y-5">
                  <div className="space-y-2">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-brand text-white">
                      Curriculum-Bounded Vector Search
                    </span>
                    <h3 className="text-xl font-black text-slate-900 leading-snug">
                      Verifiable answers directly referencing your professor's slides.
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Unlike generic internet chatbots, ICAW matches queries to authorized PDF decks uploaded by verified instructors. Click any sample prompt to run a vector search:
                    </p>
                  </div>

                  {/* Sample Query Selectors */}
                  <div className="space-y-2">
                    {samplePrompts.map((p, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setActivePromptIndex(idx);
                          handleRunRAGSimulation(p);
                        }}
                        className={`w-full text-left p-3 rounded-xl border text-xs font-medium transition-all cursor-pointer flex items-center justify-between ${
                          activePromptIndex === idx
                            ? 'bg-brand-50 border-brand/40 text-brand font-bold shadow-2xs'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span className="line-clamp-1">{p.q}</span>
                        <ChevronRight className="w-3.5 h-3.5 shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>

                  {/* Custom Input */}
                  <form onSubmit={handleCustomQuerySubmit} className="space-y-2 pt-2 border-t border-slate-100">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                      Or Try Your Own Query:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={customQuery}
                        onChange={(e) => setCustomQuery(e.target.value)}
                        placeholder="e.g. Derive gradient of cross-entropy loss..."
                        className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand bg-white"
                      />
                      <button
                        type="submit"
                        disabled={isSimulatingRAG}
                        className="px-4 py-2 rounded-xl bg-brand text-white font-bold text-xs hover:bg-brand-hover transition-all cursor-pointer disabled:opacity-50"
                      >
                        {isSimulatingRAG ? 'Searching...' : 'Search'}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Right: Simulated Terminal Output with Verified Citations */}
                <div className="lg:col-span-7 bg-slate-900 text-white rounded-2xl p-6 space-y-4 shadow-xl border border-slate-800 font-sans">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500" />
                      <div className="w-3 h-3 rounded-full bg-amber-500" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                      <span className="text-xs font-mono text-slate-400 ml-2">icaw_rag_vector_runtime</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                      {activeRAGResult.conf}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-xs text-slate-300">
                      <span className="text-slate-400 block text-[10px] font-bold uppercase">Prompt:</span>
                      "{activeRAGResult.q}"
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-emerald-400 block text-[10px] font-bold uppercase tracking-wider">
                        Grounded Answer:
                      </span>
                      <p className="text-xs text-slate-200 leading-relaxed font-normal">
                        {activeRAGResult.a}
                      </p>
                    </div>

                    {/* Verified Citation Box */}
                    <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/50 space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-bold text-emerald-300">
                        <span className="flex items-center space-x-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Grounded Source Citation:</span>
                        </span>
                        <span className="text-white font-mono">{activeRAGResult.slide}</span>
                      </div>
                      <p className="text-[11px] text-emerald-200/90 font-medium">
                        {activeRAGResult.source}
                      </p>
                    </div>

                    <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Indexed via pgvector semantic chunks</span>
                      <Link href="/training" className="text-emerald-400 hover:underline font-bold">
                        Read Training Masterclass →
                      </Link>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* 2. REAL-TIME CANVAS STUDIO */}
            {activeStudioTab === 'whiteboard' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-brand text-white">
                    CRDT-Powered Study Rooms
                  </span>
                  <h3 className="text-xl font-black text-slate-900 leading-snug">
                    Zero-latency collaborative whiteboard and markdown notebook.
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Powered by Yjs and WebRTC peer mesh, cohorts can sketch algorithmic trees, solve mathematical proofs synchronously, and annotate lecture slides together with zero merge conflicts.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-700">
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Live multi-cursor tracking with student names</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>LaTeX mathematical equation live rendering</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>End-to-end encrypted room sessions</span>
                    </li>
                  </ul>
                </div>

                {/* Whiteboard Canvas Visual Mockup */}
                <div className="lg:col-span-7 bg-slate-900 rounded-2xl p-6 border border-slate-800 text-white space-y-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <span className="text-xs font-bold text-white">Live Study Room: CS401 Midterm Cohort</span>
                    </div>
                    <div className="flex items-center -space-x-1.5">
                      <span className="w-6 h-6 rounded-full bg-brand border-2 border-slate-900 text-[10px] font-bold flex items-center justify-center">AM</span>
                      <span className="w-6 h-6 rounded-full bg-emerald-600 border-2 border-slate-900 text-[10px] font-bold flex items-center justify-center">JL</span>
                      <span className="w-6 h-6 rounded-full bg-amber-600 border-2 border-slate-900 text-[10px] font-bold flex items-center justify-center">DK</span>
                    </div>
                  </div>

                  <div className="h-64 rounded-xl bg-slate-950 border border-slate-800/80 p-5 relative overflow-hidden flex flex-col justify-between font-mono text-xs">
                    <div className="space-y-2">
                      <p className="text-slate-400">// Synchronous Proof: Backprop gradient distribution</p>
                      <p className="text-emerald-400">∂L/∂W = ∂L/∂y * ∂y/∂z * ∂z/∂W</p>
                      <p className="text-slate-300">where z = Wx + b and y = σ(z)</p>
                    </div>

                    {/* Simulated Cursors */}
                    <div className="absolute top-16 right-20 flex items-center space-x-1 bg-amber-500/90 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded shadow">
                      <span>Jessica Lin (Writing Proof)</span>
                    </div>

                    <div className="absolute bottom-10 left-32 flex items-center space-x-1 bg-emerald-500/90 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded shadow">
                      <span>Alex Morgan (Annotating Slide 18)</span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-900 pt-2">
                      <span>Latency: 8ms • P2P WebRTC Connected</span>
                      <span className="text-brand-200">Session saved to course portfolio</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. STUDY COHORT MATCHER */}
            {activeStudioTab === 'groups' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-brand text-white">
                    Algorithmic Matching Engine
                  </span>
                  <h3 className="text-xl font-black text-slate-900 leading-snug">
                    Paired by overlapping schedules and complementary skills.
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Stop posting in ghost forums. Every Monday and Thursday, ICAW clusters student availability windows and balances strengths so students never study alone.
                  </p>
                  <Link
                    href="/profile"
                    className="inline-flex items-center space-x-2 text-xs font-bold text-brand hover:underline"
                  >
                    <span>Configure your profile skills & availability</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="lg:col-span-7 bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Matched Study Cohort #401-B</span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                      96% Compatibility Index
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
                      <div className="flex items-center space-x-2">
                        <div className="w-7 h-7 rounded-lg bg-brand text-white text-xs font-bold flex items-center justify-center">AM</div>
                        <span className="text-xs font-bold text-slate-900">Alex Morgan (You)</span>
                      </div>
                      <p className="text-[11px] text-slate-500">Excels: Machine Learning, PyTorch</p>
                      <p className="text-[10px] text-brand font-semibold">Free: Tue & Thu Evenings (6-9 PM)</p>
                    </div>

                    <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
                      <div className="flex items-center space-x-2">
                        <div className="w-7 h-7 rounded-lg bg-emerald-700 text-white text-xs font-bold flex items-center justify-center">JL</div>
                        <span className="text-xs font-bold text-slate-900">Jessica Lin (Peer)</span>
                      </div>
                      <p className="text-[11px] text-slate-500">Excels: Linear Algebra, Optimization</p>
                      <p className="text-[10px] text-brand font-semibold">Free: Tue & Thu Evenings (6-9 PM)</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
                    <span>Algorithm detected overlapping exam target: Midterm 2 (CS401)</span>
                    <span className="font-bold">Next cycle: Monday 9 AM</span>
                  </div>
                </div>
              </div>
            )}

            {/* 4. ADAPTIVE KNOWLEDGE MAP */}
            {activeStudioTab === 'exams' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-brand text-white">
                    Bayesian Knowledge Tracing
                  </span>
                  <h3 className="text-xl font-black text-slate-900 leading-snug">
                    Pinpoint curriculum blind spots before the midterm.
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Our neural evaluation tracer logs student question accuracy across diagnostic quizzes. Instead of re-reading slides you already know, ICAW generates targeted spaced repetition blitz quizzes.
                  </p>
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center space-x-2 text-xs font-bold text-brand hover:underline"
                  >
                    <span>Start a diagnostic exam in dashboard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                    <span>Curriculum Mastery Graph: CS401 Machine Learning</span>
                    <span className="text-brand font-mono">Overall Readiness: 78%</span>
                  </div>

                  <div className="space-y-3">
                    {[
                      { topic: 'Convolutional Filters & Pooling', score: 94, state: 'Mastered', color: 'bg-emerald-500' },
                      { topic: 'Stochastic Gradient Descent & Momentum', score: 86, state: 'Strong', color: 'bg-emerald-500' },
                      { topic: 'Multi-Head Attention & Positional Encoding', score: 54, state: 'Review Needed', color: 'bg-amber-500' },
                      { topic: 'Eigenvalues & SVD Matrix Decomposition', score: 32, state: 'Critical Gap', color: 'bg-rose-500' }
                    ].map((row, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between text-xs font-medium">
                          <span className="text-slate-800">{row.topic}</span>
                          <span className="font-mono text-slate-600">{row.score}% ({row.state})</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div className={`h-full rounded-full ${row.color}`} style={{ width: `${row.score}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => toast.success('Generated 5-question adaptive quiz on SVD & Attention!')}
                      className="w-full py-2.5 rounded-xl bg-brand text-white font-bold text-xs hover:bg-brand-hover transition-all cursor-pointer shadow-sm"
                    >
                      Generate 5-Minute Targeted Review Blitz
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </section>

        {/* ================================================================= */}
        {/* 4. THE 6 PILLARS OF ICAW (Deep Feature Grid)                      */}
        {/* ================================================================= */}
        <section className="bg-white border-y border-slate-200/70 py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-50 text-brand border border-brand/20">
                Core Architecture
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Engineered for Academic Excellence
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Six integrated pillars that eliminate academic friction and empower university communities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: BrainCircuit,
                  title: 'Verifiable RAG Vector Ingestion',
                  desc: 'Lecture slides and textbook readings are chunked and vectorized. Answers explicitly cite slide numbers and page passages with zero hallucinations.',
                  stat: '100% Course Bound'
                },
                {
                  icon: Users,
                  title: 'Bi-Weekly Cohort Pairing',
                  desc: 'Pairing engine clusters students by overlapping study windows and complementary skills, ensuring every student has an active cohort.',
                  stat: 'Mon & Thu Cycles'
                },
                {
                  icon: Award,
                  title: 'Adaptive Knowledge Tracing',
                  desc: 'Bayesian evaluation maps comprehension across curriculum topics and serves spaced repetition quizzes that turn weak spots into strengths.',
                  stat: '+42% Exam Lift'
                },
                {
                  icon: Share2,
                  title: 'Real-Time Yjs Collaborative Canvas',
                  desc: 'CRDT-based whiteboard, LaTeX mathematical notation, and shared code notes with live peer cursors and audio review channels.',
                  stat: '<15ms P2P Sync'
                },
                {
                  icon: BookOpen,
                  title: 'Faculty Course Authority',
                  desc: 'Professors drag and drop syllabi, review model responses, endorse answers with official instructor notes, and set strict question boundaries.',
                  stat: '60s PDF Indexing'
                },
                {
                  icon: ShieldCheck,
                  title: 'FERPA & Tenant Sovereignty',
                  desc: 'Student lecture queries are never fed into public commercial models. Complete institutional data isolation and encryption at rest.',
                  stat: 'Full FERPA Privacy'
                }
              ].map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-7 rounded-3xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:border-brand/40 hover:shadow-lg transition-all flex flex-col justify-between space-y-4 group"
                  >
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand flex items-center justify-center border border-brand/20 group-hover:scale-105 transition-transform">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-base text-slate-900 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-brand bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand/20">
                        {item.stat}
                      </span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ================================================================= */}
        {/* 5. TRADITIONAL LMS VS ICAW (The Great Academic Shift)             */}
        {/* ================================================================= */}
        <section className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20 space-y-10">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-50 text-brand border border-brand/20">
              The Great Shift
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Why Traditional LMS Platforms Fall Short
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Universities pay millions for Canvas and Blackboard, yet students struggle in isolation. Here is why ICAW is replacing the conventional workflow.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-4 px-6">Capability Area</th>
                    <th className="py-4 px-6 text-slate-500">Traditional LMS (Canvas / Blackboard)</th>
                    <th className="py-4 px-6 text-brand font-black">ICAW Academic Workspace</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="py-4 px-6 font-bold text-slate-900">Course Notes & Q&A</td>
                    <td className="py-4 px-6 text-slate-500">Static PDF downloads; students turn to hallucinatory ChatGPT</td>
                    <td className="py-4 px-6 font-semibold text-brand">Teacher-Grounded RAG tutor citing exact slide numbers and textbook pages</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-bold text-slate-900">Study Group Formation</td>
                    <td className="py-4 px-6 text-slate-500">Unmoderated discussion boards; 74% of students never find study partners</td>
                    <td className="py-4 px-6 font-semibold text-brand">Bi-weekly algorithmic matching by open calendar slots & complementary skills</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-bold text-slate-900">Exam Preparation</td>
                    <td className="py-4 px-6 text-slate-500">Static past paper PDFs with no feedback or personalized diagnostics</td>
                    <td className="py-4 px-6 font-semibold text-brand">Bayesian Knowledge Tracing identifying blind spots and serving targeted blitz quizzes</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-bold text-slate-900">Peer Collaboration</td>
                    <td className="py-4 px-6 text-slate-500">None; forces students onto Discord, WhatsApp, and fragmented tools</td>
                    <td className="py-4 px-6 font-semibold text-brand">Built-in real-time collaborative whiteboard, LaTeX editor, and session history</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-bold text-slate-900">Faculty Insights</td>
                    <td className="py-4 px-6 text-slate-500">Only end-of-semester course evaluations after it is too late to adapt</td>
                    <td className="py-4 px-6 font-semibold text-brand">Real-time classwide confusion heatmaps before professors give exams</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 6. HOW ICAW HELPS EVERY MAJOR & DOMAIN                            */}
        {/* ================================================================= */}
        <section className="bg-slate-100/60 border-y border-slate-200/70 py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-50 text-brand border border-brand/20">
                Tailored Disciplines
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Engineered for Every University Department
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Whether you are proving mathematical theorems, debugging algorithms, or synthesizing case law, ICAW adapts to your academic discipline.
              </p>

              {/* Major Selector */}
              <div className="pt-3 inline-flex items-center p-1.5 bg-white rounded-2xl border border-slate-200 shadow-xs flex-wrap justify-center gap-1">
                {[
                  { id: 'cs', label: 'Computer Science & AI', icon: Terminal },
                  { id: 'math', label: 'Mathematics & Physics', icon: Activity },
                  { id: 'med', label: 'Biomedical & Pre-Med', icon: ShieldCheck },
                  { id: 'econ', label: 'Economics & Business', icon: TrendingUp }
                ].map((dom) => {
                  const DomIcon = dom.icon;
                  const isCurrent = activeDomain === dom.id;
                  return (
                    <button
                      key={dom.id}
                      onClick={() => setActiveDomain(dom.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-brand text-white shadow-md shadow-brand/20'
                          : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      <DomIcon className="w-3.5 h-3.5" />
                      <span>{dom.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Domain Details Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm">
              {activeDomain === 'cs' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-bold text-sm text-slate-900">Code Syntax & Complexity Proofs</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Instant verification of Big-O asymptotic proofs, recursion tree unrolling, and memory hierarchy concepts directly tied to course slide decks.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-sm text-slate-900">Machine Learning & Neural Nets</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Deep conceptual breakdowns of backprop derivations, loss functions, attention mechanisms, and PyTorch tensors with instructor citations.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-sm text-slate-900">Algorithmic Peer Cohorts</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Paired into 3-4 person groups for coding practice, mock technical interviews, and collaborative midterm problem set review.
                    </p>
                  </div>
                </div>
              )}

              {activeDomain === 'math' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-bold text-sm text-slate-900">Step-by-Step Proof Verification</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Ask the AI tutor to break down complex epsilon-delta proofs, Taylor series expansions, and multi-variable integration steps with slide references.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-sm text-slate-900">Live LaTeX Whiteboard</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Collaborate in real time using native LaTeX rendering. Share complex matrix equations, contour integrals, and vector fields with peers.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-sm text-slate-900">Theorem Mastery Tracking</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Automated diagnostics track which mathematical lemmas and convergence tests you have mastered vs. which need review before finals.
                    </p>
                  </div>
                </div>
              )}

              {activeDomain === 'med' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-bold text-sm text-slate-900">Dense Physiological Grounding</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Query complex biochemical pathways (Krebs cycle, neurotransmitter cascades) with answers strictly verified against approved medical faculty decks.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-sm text-slate-900">Pharmacology & Mechanism Recall</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Spaced repetition drills designed around drug mechanisms of action, adverse reactions, and contraindications.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-sm text-slate-900">Clinical Case Cohorts</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Matched with fellow pre-med students to work through clinical vignettes and diagnostic decision trees on the shared canvas.
                    </p>
                  </div>
                </div>
              )}

              {activeDomain === 'econ' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-bold text-sm text-slate-900">Econometric Modeling</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Verify regression interpretations, instrumental variable identification, and macro-economic dynamic stochastic general equilibrium models.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-sm text-slate-900">Case Study Synthesis</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Extract valuation frameworks, discounted cash flow guidelines, and strategic business cases directly from professor lecture slides.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-sm text-slate-900">Group Financial Projects</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Collaborative study cohorts coordinate financial statement analysis and prepare for corporate finance exams together.
                    </p>
                  </div>
                </div>
              )}
            </div>

          </div>
        </section>

        {/* ================================================================= */}
        {/* 7. VERIFIED TESTIMONIALS & FACULTY ENDORSEMENTS                   */}
        {/* ================================================================= */}
        <section className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20 space-y-10">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-50 text-brand border border-brand/20">
              Community Impact
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Trusted by Faculty and Students Alike
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Read how professors and undergraduate cohorts use ICAW to elevate academic outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed italic">
                  "For the first time, our students have an AI tutor that I actually trust. Knowing every single answer is tethered strictly to my CS401 lecture slides gives me complete peace of mind."
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-brand text-white font-bold flex items-center justify-center text-xs">
                  SC
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">Dr. Sarah Connor</h4>
                  <p className="text-[11px] text-slate-500">Associate Professor of Computer Science</p>
                </div>
              </div>
            </div>

            <div className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed italic">
                  "The bi-weekly study group matcher changed my semester. I was paired with two peers who had the exact same available hours on Tuesday evenings, and we all scored in the 90th percentile."
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                  AM
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">Alex Morgan</h4>
                  <p className="text-[11px] text-slate-500">Junior Computer Science Major</p>
                </div>
              </div>
            </div>

            <div className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed italic">
                  "The adaptive knowledge tracer detected that our class was struggling with Eigenvalues three weeks before the midterm. I scheduled a review session and our failure rate dropped to near zero."
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-amber-600 text-white font-bold flex items-center justify-center text-xs">
                  AP
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">Dean Arthur Pendelton</h4>
                  <p className="text-[11px] text-slate-500">Dean of Engineering & Applied Sciences</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 8. COMPREHENSIVE FAQ ACCORDION                                    */}
        {/* ================================================================= */}
        <section className="bg-white border-y border-slate-200/70 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            
            <div className="text-center space-y-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-50 text-brand border border-brand/20">
                Got Questions?
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Everything you need to know about access, grounding, and university integrations.
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  q: 'Is student access really 100% free forever?',
                  a: 'Yes. Any university student registering with an institutional email (.edu, .ac.uk, etc.) receives full access to the Teacher-Grounded RAG AI tutor, adaptive exam prep, and algorithmic study group matching without ever needing a credit card.'
                },
                {
                  q: 'How does ICAW prevent hallucinations compared to ChatGPT or Claude?',
                  a: 'Generic consumer chatbots synthesize predictions from random public internet text. ICAW uses strict Retrieval-Augmented Generation (RAG) bounded strictly to your professor’s uploaded lecture PDFs and approved reference manuals. Every response includes slide numbers and page citations. If a concept is not in your syllabus, the tutor explicitly says so.'
                },
                {
                  q: 'How does the study group matching algorithm work?',
                  a: 'Every Monday and Thursday, our matching engine evaluates active student availability windows and course mastery goals. It clusters students who have overlapping available study hours and complementary academic strengths into balanced 3-4 student cohorts with a pre-configured real-time study room.'
                },
                {
                  q: 'How do professors upload course slides and manage authority?',
                  a: 'Instructors log into the Faculty Workspace, select their course, and drag-and-drop lecture slides, syllabi, and practice exams. The system vectorizes the materials in under 60 seconds. Teachers have access to an Answer Review Queue to endorse model citations and broadcast official faculty clarifications.'
                },
                {
                  q: 'Is student data protected under FERPA guidelines?',
                  a: 'Yes. All student queries, vector chunks, and course materials are stored in tenant-isolated databases. User data is strictly protected under FERPA and is never sold or used to train third-party public AI models.'
                },
                {
                  q: 'Can I test the platform right now without creating an account?',
                  a: 'Yes! Use the draggable floating role switcher button in the bottom-right corner of the screen. You can switch between Logged Out (Visitor), Student View, and Teacher View with a single click.'
                }
              ].map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200 overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                      className="w-full p-5 text-left flex items-center justify-between bg-slate-50/60 hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      <span className="font-bold text-xs sm:text-sm text-slate-900">{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="p-5 text-xs text-slate-600 bg-white leading-relaxed border-t border-slate-200">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ================================================================= */}
        {/* 9. FAST-TRACK ONBOARDING & TRAINING PROMO BANNER                  */}
        {/* ================================================================= */}
        <section className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-brand text-white rounded-3xl p-8 sm:p-14 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="space-y-4 max-w-xl z-10">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 border border-white/20 text-emerald-300">
                Interactive Academy
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                New to the Platform? Follow the Complete ICAW Masterclass
              </h2>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                Step-by-step interactive training covering syllabus RAG prompting, peer study group setup, adaptive exam prep, and faculty authority tools in under 10 minutes.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 z-10 shrink-0">
              <Link
                href="/training"
                id="cta-open-training-btn"
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white text-brand font-bold text-xs hover:bg-slate-100 transition-all text-center shadow-lg"
              >
                Open Training Masterclass
              </Link>
              <Link
                href="/register"
                id="cta-create-account-btn"
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white/10 border border-white/25 text-white font-bold text-xs hover:bg-white/20 transition-all text-center"
              >
                Sign Up as Student or Faculty
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* Global Academic Footer */}
      <Footer />

      {/* Draggable Role Switcher Widget with Visitor Mode */}
      <FloatingRoleSwitcher />
    </div>
  );
}
