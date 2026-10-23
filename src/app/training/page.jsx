'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import FloatingRoleSwitcher from '../../components/FloatingRoleSwitcher';
import {
  GraduationCap,
  Sparkles,
  Bot,
  Users,
  BookOpen,
  Award,
  CheckCircle2,
  ArrowRight,
  PlayCircle,
  HelpCircle,
  Search,
  FileCheck2,
  Sliders,
  Calendar,
  Layers,
  ShieldCheck,
  Zap,
  Check,
  ChevronRight,
  Clock,
  BookMarked,
  Share2,
  Target,
  FileText,
  AlertCircle,
  Lightbulb,
  CheckSquare
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function TrainingPage() {
  const [activeAudience, setActiveAudience] = useState('student'); // 'student' | 'teacher' | 'admin'
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [checkedSteps, setCheckedSteps] = useState({});
  const [simulatedPrompt, setSimulatedPrompt] = useState('Why does standard gradient descent oscillate in high-curvature valleys?');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedAnswer, setSimulatedAnswer] = useState(null);

  // Interactive Checklist Generator
  const [customCourseName, setCustomCourseName] = useState('CS401 Machine Learning');
  const [customGoal, setCustomGoal] = useState('Score an A grade on Midterm 2');
  const [generatedChecklist, setGeneratedChecklist] = useState(null);

  const toggleCheckStep = (stepKey) => {
    setCheckedSteps((prev) => {
      const next = { ...prev, [stepKey]: !prev[stepKey] };
      const count = Object.values(next).filter(Boolean).length;
      if (next[stepKey]) {
        toast.success(`Step completed! (${count} steps accomplished)`);
      }
      return next;
    });
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimulatedAnswer(null);
    setTimeout(() => {
      setIsSimulating(false);
      setSimulatedAnswer({
        text: 'In high-curvature valleys with ill-conditioned Hessians, the gradient vector points orthogonal to the optimal descent trajectory, inducing erratic oscillations across the steep ravines rather than progressing down the gently sloped path.',
        citations: [
          { source: 'CS401 Lecture 04: Convex Optimization & Momentum', slide: 'Slide 28', confidence: '99.4%' },
          { source: 'Goodfellow Deep Learning Textbook', page: 'Chapter 8.2, Page 294', confidence: '98.7%' }
        ],
        followUp: 'Recommended Next Step: Take a 3-question adaptive quiz on Momentum and Adam optimizers.'
      });
      toast.success('Generated syllabus-grounded answer with citations!');
    }, 550);
  };

  const handleGenerateChecklist = (e) => {
    e.preventDefault();
    setGeneratedChecklist([
      `Download and index verified ${customCourseName} syllabus PDF`,
      `Set profile weekly study hours to minimum 10 hours for ${customGoal}`,
      `Query the AI Tutor on 3 foundational lemmas from Lecture 1`,
      `Complete initial 15-minute adaptive diagnostic mock quiz`,
      `Join matched peer study room on Monday matching cycle`
    ]);
    toast.success('Generated personalized 5-step academic study plan!');
  };

  const trainingModules = {
    student: [
      {
        id: 'rag-tutor',
        title: 'Mastering the Teacher-Grounded RAG AI Tutor',
        badge: 'Core Skill',
        icon: Bot,
        description: 'How to ask questions that return 100% verified textbook answers with slide-by-slide academic citations.',
        timeEst: '3 min read',
        proTip: 'Pro-Tip: Always ask conceptual or derivation questions rather than yes/no questions to see the full mathematical citation.',
        steps: [
          {
            title: 'Select Your Active Enrolled Course Channel',
            detail: 'Navigate to the AI Tutor tab. Select the course channel (e.g. CS401 Machine Learning). This constrains the AI model exclusively to your teacher’s uploaded slides and verified reference books.'
          },
          {
            title: 'Submit Conceptual or Problem-Solving Questions',
            detail: 'Type any complex question or paste an assignment prompt. Avoid generic internet queries; ask specific conceptual questions like "Prove why backpropagation distributes error gradients via the chain rule".'
          },
          {
            title: 'Verify Grounded Citations & Slide References',
            detail: 'Every answer displays green verified badges showing the exact lecture deck, slide number, and textbook section used to generate the answer. Click any citation to inspect the verified passage.'
          },
          {
            title: 'Request Step-by-Step Derivations or Practice Quizzes',
            detail: 'Use the inline action buttons: "Generate Practice Question", "Simplify Explanation", or "Review Mathematical Derivation" to test your recall.'
          }
        ]
      },
      {
        id: 'study-groups',
        title: 'Matching Into High-Compatibility Study Groups',
        badge: 'Peer Network',
        icon: Users,
        description: 'How to set your schedule and let ICAW’s algorithmic matching pair you with balanced study cohorts.',
        timeEst: '2 min read',
        proTip: 'Pro-Tip: Students who update their skills and availability on Profile get matched 3.4x faster into active peer rooms.',
        steps: [
          {
            title: 'Fill Out Your Skills & Target Learning Goals',
            detail: 'On your Profile page, list 3-5 subjects you excel in and 2-3 topics you want to master. ICAW pairs students with complementary strengths (e.g. strong math background paired with strong coding background).'
          },
          {
            title: 'Define Weekly Study Availability & Hours',
            detail: 'Set your commitment (e.g. 12 hours/week) and select your available times (Weekday Evenings, Weekend Mornings). Groups are only formed between students with matching open windows.'
          },
          {
            title: 'Review Bi-Weekly Cohort Matching Results',
            detail: 'Matches are generated automatically every Monday and Thursday. When your group is formed, you receive a notification with your peers’ profiles and group agenda.'
          },
          {
            title: 'Collaborate in the Real-Time Room',
            detail: 'Launch the group room to share synchronous notes via CRDT whiteboard, participate in timed review sessions, and prepare for upcoming exams together.'
          }
        ]
      },
      {
        id: 'adaptive-exams',
        title: 'Targeting Weak Knowledge Gaps via Adaptive Prep',
        badge: 'Exam Readiness',
        icon: Award,
        description: 'How to take adaptive practice exams and eliminate recurring blind spots before midterm and finals.',
        timeEst: '3 min read',
        proTip: 'Pro-Tip: Review your flagged gaps immediately after finishing a diagnostic mock exam for maximum retention.',
        steps: [
          {
            title: 'Launch a 15-Minute Diagnostic Exam',
            detail: 'Open Exam Prep and start a diagnostic exam. Questions adapt dynamically based on your answers: if you answer correctly, difficulty ramps up; if you struggle, foundational concepts are presented.'
          },
          {
            title: 'Inspect the Automated Concept Knowledge Trace',
            detail: 'View your mastery curve across curriculum domains. Green concepts indicate strong retention (>85%), while amber/red concepts represent knowledge gaps.'
          },
          {
            title: 'Generate Spaced-Repetition Review Decks',
            detail: 'Click "Target Weak Topics" to generate targeted 5-question blitz quizzes focused exclusively on your flagged blind spots until your mastery score turns solid green.'
          }
        ]
      },
      {
        id: 'realtime-canvas',
        title: 'Collaborating on the Real-Time CRDT Whiteboard',
        badge: 'Live Study',
        icon: Share2,
        description: 'How peer cohorts solve problem sets with synchronized LaTeX formulas, code snippets, and audio review.',
        timeEst: '2 min read',
        proTip: 'Pro-Tip: You can export your completed study room canvas as a clean study summary PDF before exam day.',
        steps: [
          {
            title: 'Launch a Peer Session From Your Matched Group',
            detail: 'Click "Open Collaborative Canvas". All group members can see each other’s live cursors with zero latency.'
          },
          {
            title: 'Render Mathematical Notation via LaTeX',
            detail: 'Type equations in inline LaTeX syntax ($E = mc^2$ or full matrices) to automatically render formulas for everyone in the room.'
          },
          {
            title: 'Import Course Slide References to Canvas',
            detail: 'Clip any verified citation from the AI Tutor directly onto the study whiteboard to annotate together.'
          }
        ]
      }
    ],
    teacher: [
      {
        id: 'syllabus-indexing',
        title: 'Uploading Syllabi & Vectorizing Course Slides',
        badge: 'Faculty Authority',
        icon: BookOpen,
        description: 'How educators upload authorized lecture PDFs and ground the AI tutor within 60 seconds.',
        timeEst: '3 min read',
        proTip: 'Pro-Tip: Upload slides with speaker notes or clean bullet hierarchies for the highest semantic vector precision.',
        steps: [
          {
            title: 'Access Course Management & Resource Library',
            detail: 'Open your Faculty Workspace. Select your course (e.g., CS401) and navigate to the Resource Library.'
          },
          {
            title: 'Drag and Drop PDF Lecture Decks & Syllabi',
            detail: 'Use the universal file dropzone to upload lecture slide decks, practice exams with answer keys, and assigned textbook readings.'
          },
          {
            title: 'Verify Semantic Chunk Indexing',
            detail: 'The platform chunks PDFs and generates dense vector embeddings. Verify that syllabus indexing shows "Active Grounding" with 100% citation readiness.'
          },
          {
            title: 'Lock Grounding Boundaries',
            detail: 'Enable "Strict Academic Grounding" in AI Config. This guarantees the AI tutor will decline to answer out-of-scope queries or fabricate citations.'
          }
        ]
      },
      {
        id: 'answer-review',
        title: 'Reviewing AI Tutoring Answers & Anomaly Flagging',
        badge: 'Academic Integrity',
        icon: FileCheck2,
        description: 'Audit student queries, review AI answers, and approve institutional answers with a single click.',
        timeEst: '2 min read',
        proTip: 'Pro-Tip: Adding an official faculty note broadcasts immediately to all enrolled student course dashboards.',
        steps: [
          {
            title: 'Open the Answer Review Queue',
            detail: 'Examine questions where students gave feedback or where the AI model flagged ambiguity in student lecture queries.'
          },
          {
            title: 'Endorse or Correct Model Citations',
            detail: 'Teachers can add an official faculty note: "Professor Note: This proof will be on Exam 2, focus on lemma 4.1".'
          },
          {
            title: 'Broadcast Faculty Clarifications',
            detail: 'Push approved answers directly into student course portals so the entire class benefits from unified academic guidance.'
          }
        ]
      }
    ],
    admin: [
      {
        id: 'department-hierarchy',
        title: 'Campus Onboarding & Departmental Hierarchy',
        badge: 'Campus Governance',
        icon: ShieldCheck,
        description: 'Configure academic divisions, manage faculty tenure status, and inspect institutional data security.',
        timeEst: '4 min read',
        proTip: 'Pro-Tip: Department chairs can export semester FERPA data compliance audits directly to university legal.',
        steps: [
          {
            title: 'Map Academic Divisions & Departments',
            detail: 'Structure faculties (e.g., School of Engineering -> Department of CS & AI) to isolate course materials and data privacy.'
          },
          {
            title: 'Verify Faculty Credentials',
            detail: 'Review pending teacher signups in the Approval Queue to prevent unauthorized instructors from uploading course materials.'
          },
          {
            title: 'Audit System Logs & FERPA Compliance',
            detail: 'Download verifiable audit logs showing student query privacy, vector index isolation, and data encryption certificates.'
          }
        ]
      }
    ]
  };

  const currentModuleList = trainingModules[activeAudience] || trainingModules.student;
  const currentModule = currentModuleList[activeModuleIndex] || currentModuleList[0];

  const totalStepsInModule = currentModule.steps.length;
  const completedStepsInModule = currentModule.steps.filter((_, idx) => checkedSteps[`${currentModule.id}-${idx}`]).length;
  const moduleProgressPercent = Math.round((completedStepsInModule / totalStepsInModule) * 100);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-brand selection:text-white">
      {/* Universal Sticky Navigation */}
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        
        {/* ================================================================= */}
        {/* 1. ACADEMY HERO BANNER                                            */}
        {/* ================================================================= */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-sm relative overflow-hidden space-y-6">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-50 text-brand border border-brand/20">
              <Sparkles className="w-3.5 h-3.5 text-brand" />
              <span>ICAW Platform Academy • Complete Masterclass</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Master Every Tool on the Platform in Under 10 Minutes
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Step-by-step interactive training covering syllabus RAG prompting, peer study group setup, adaptive exam prep, and faculty authority tools.
            </p>

            {/* Audience Tabs */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">
                I am Learning As:
              </span>
              {[
                { id: 'student', label: 'Students & Learners', icon: GraduationCap },
                { id: 'teacher', label: 'Faculty & Professors', icon: BookOpen },
                { id: 'admin', label: 'Department Chairs', icon: ShieldCheck }
              ].map((role) => {
                const Icon = role.icon;
                const isActive = activeAudience === role.id;
                return (
                  <button
                    key={role.id}
                    onClick={() => {
                      setActiveAudience(role.id);
                      setActiveModuleIndex(0);
                    }}
                    className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-brand text-white shadow-md shadow-brand/20'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{role.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 2. TWO-COLUMN INTERACTIVE LESSON WORKBENCH                         */}
        {/* ================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Navigation: Modules (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Training Lessons ({currentModuleList.length})
              </h3>
              <span className="text-[11px] font-bold text-brand font-mono">
                {moduleProgressPercent}% Mastered
              </span>
            </div>

            {currentModuleList.map((mod, idx) => {
              const ModIcon = mod.icon;
              const isSelected = activeModuleIndex === idx;
              return (
                <button
                  key={mod.id}
                  onClick={() => setActiveModuleIndex(idx)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex flex-col space-y-2 ${
                    isSelected
                      ? 'bg-white border-brand shadow-md shadow-brand/5 ring-1 ring-brand'
                      : 'bg-white/80 border-slate-200/80 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      isSelected ? 'bg-brand text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      Lesson {idx + 1}
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{mod.timeEst}</span>
                    </span>
                  </div>

                  <div className="flex items-start space-x-3 pt-1">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-brand-50 text-brand' : 'bg-slate-100 text-slate-500'
                    }`}>
                      <ModIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 leading-snug">
                        {mod.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {mod.badge}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}

            {/* Quick Demo CTA Card */}
            <div className="p-5 rounded-2xl bg-brand text-white space-y-3 mt-4 shadow-sm">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-emerald-300" />
                <h4 className="font-bold text-xs">Test This Lesson in Live Demo</h4>
              </div>
              <p className="text-[11px] text-white/80 leading-relaxed">
                Use the floating switcher button in the bottom right corner to switch roles and test this workflow immediately.
              </p>
              <Link
                href="/dashboard"
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white text-brand font-bold text-xs hover:bg-slate-100 transition-all shadow-sm"
              >
                <span>Launch Interactive Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Content: Detailed Step-by-Step Lesson (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
              
              <div className="border-b border-slate-100 pb-5 space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-brand text-white">
                    {currentModule.badge}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">• Estimated {currentModule.timeEst}</span>
                </div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  {currentModule.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {currentModule.description}
                </p>

                {/* Pro Tip Box */}
                {currentModule.proTip && (
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center space-x-2.5 mt-2">
                    <Lightbulb className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-medium">{currentModule.proTip}</span>
                  </div>
                )}
              </div>

              {/* Progress Bar for Current Lesson */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-600">
                  <span>Lesson Completion Checklist:</span>
                  <span className="font-bold text-brand">{completedStepsInModule} of {totalStepsInModule} steps checked</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full rounded-full bg-brand transition-all duration-300" style={{ width: `${moduleProgressPercent}%` }} />
                </div>
              </div>

              {/* Step-by-Step Instructions */}
              <div className="space-y-3">
                {currentModule.steps.map((step, idx) => {
                  const stepKey = `${currentModule.id}-${idx}`;
                  const isDone = !!checkedSteps[stepKey];
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleCheckStep(stepKey)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start space-x-3.5 ${
                        isDone
                          ? 'bg-emerald-50/70 border-emerald-200'
                          : 'bg-slate-50/70 border-slate-200/80 hover:bg-white hover:border-brand/40'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isDone
                          ? 'bg-emerald-600 text-white'
                          : 'border-2 border-slate-300 bg-white text-transparent'
                      }`}>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>

                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className={`text-xs font-bold ${
                            isDone ? 'text-emerald-900 line-through' : 'text-slate-900'
                          }`}>
                            Step {idx + 1}: {step.title}
                          </h4>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            {isDone ? 'Completed' : 'Click to Check'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {step.detail}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* In-Memory Interactive Sandbox for RAG */}
              {currentModule.id === 'rag-tutor' && (
                <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-4 shadow-inner mt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bot className="w-4 h-4 text-emerald-400" />
                      <h4 className="font-bold text-xs tracking-tight">Interactive RAG Query Simulator</h4>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Live Sandbox
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    Test how our syllabus-grounded AI tutor answers without internet hallucination:
                  </p>

                  <div className="space-y-2">
                    <input
                      type="text"
                      value={simulatedPrompt}
                      onChange={(e) => setSimulatedPrompt(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    />
                    <button
                      type="button"
                      onClick={handleRunSimulation}
                      disabled={isSimulating}
                      className="w-full py-2.5 rounded-xl bg-brand hover:bg-brand-hover text-white font-bold text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer disabled:opacity-50 shadow-sm"
                    >
                      {isSimulating ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Sparkles className="w-3.5 h-3.5" />
                      )}
                      <span>{isSimulating ? 'Searching Vector Indexes...' : 'Run Grounded Query'}</span>
                    </button>
                  </div>

                  {simulatedAnswer && (
                    <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700 space-y-3 text-xs animate-in fade-in duration-200">
                      <p className="text-slate-200 leading-relaxed">
                        {simulatedAnswer.text}
                      </p>

                      <div className="pt-2 border-t border-slate-700/80 space-y-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                          Verified Faculty Sources:
                        </span>
                        {simulatedAnswer.citations.map((c, i) => (
                          <div key={i} className="flex items-center justify-between text-[11px] text-slate-300 bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                            <span className="font-semibold text-white">{c.source} ({c.slide || c.page})</span>
                            <span className="text-emerald-400 font-mono text-[10px]">{c.confidence} Match</span>
                          </div>
                        ))}
                      </div>

                      <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/50 text-[11px] text-emerald-300 flex items-center space-x-2">
                        <Award className="w-3.5 h-3.5 shrink-0" />
                        <span>{simulatedAnswer.followUp}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Navigation Controls */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  {Object.keys(checkedSteps).length} total masterclass steps completed
                </span>

                {activeModuleIndex < currentModuleList.length - 1 ? (
                  <button
                    onClick={() => setActiveModuleIndex(activeModuleIndex + 1)}
                    className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-brand text-white font-bold text-xs hover:bg-brand-hover transition-all cursor-pointer shadow-sm"
                  >
                    <span>Proceed to Next Lesson</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-brand text-white font-bold text-xs hover:bg-brand-hover transition-all shadow-sm"
                  >
                    <span>Launch ICAW Workspace</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>

            </div>

          </div>

        </div>

        {/* ================================================================= */}
        {/* 3. INTERACTIVE STUDY PLAN GENERATOR                               */}
        {/* ================================================================= */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-6">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-50 text-brand border border-brand/20">
              Interactive Planning Tool
            </span>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              Generate Your Custom Course Study Strategy
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Enter your current course and target exam goal to build an actionable 5-step roadmap.
            </p>
          </div>

          <form onSubmit={handleGenerateChecklist} className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-5 space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Course Name</label>
              <input
                type="text"
                value={customCourseName}
                onChange={(e) => setCustomCourseName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand bg-white"
              />
            </div>
            <div className="sm:col-span-5 space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Academic Goal</label>
              <input
                type="text"
                value={customGoal}
                onChange={(e) => setCustomGoal(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand bg-white"
              />
            </div>
            <div className="sm:col-span-2 flex items-end">
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-brand text-white font-bold text-xs hover:bg-brand-hover transition-all cursor-pointer shadow-sm"
              >
                Generate Plan
              </button>
            </div>
          </form>

          {generatedChecklist && (
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 animate-in fade-in duration-200">
              <h4 className="font-bold text-xs uppercase tracking-wider text-brand">
                Action Plan for {customCourseName} ({customGoal}):
              </h4>
              <div className="space-y-2">
                {generatedChecklist.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-xs text-slate-700">
                    <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </main>

      <Footer />
      <FloatingRoleSwitcher />
    </div>
  );
}
