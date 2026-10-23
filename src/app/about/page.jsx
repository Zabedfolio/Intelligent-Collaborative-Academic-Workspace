'use client';

import Link from 'next/link';
import Image from 'next/image';
import { 
  GraduationCap, 
  Sparkles, 
  ShieldCheck, 
  Users, 
  BookOpen, 
  BrainCircuit, 
  Award, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

export default function AboutPage() {
  const pillars = [
    {
      icon: BrainCircuit,
      title: 'Teacher-Approved RAG AI Tutor',
      description: 'Unlike generic chatbots, ICAW AI tutors strictly ground answers in verified course materials, syllabi, and teacher-uploaded slides, eliminating hallucinations and ensuring syllabus alignment.'
    },
    {
      icon: Award,
      title: 'Adaptive Exam Preparation',
      description: 'Personalized practice questions, spaced repetition flashcards, and diagnostic mock exams tailored specifically to weak conceptual areas detected across formative assessments.'
    },
    {
      icon: Users,
      title: 'Intelligent Study Group Matching',
      description: 'Algorithmically pairs peers based on complementary study hours, compatible learning paces, and target grade goals to foster meaningful collaborative study groups.'
    },
    {
      icon: ShieldCheck,
      title: 'Institutional Academic Integrity',
      description: 'Built-in honor pledge safeguards, faculty oversight dashboards, and zero-leakage security protocols honoring institutional FERPA and academic integrity policies.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-white border-b border-slate-200/80 py-16 lg:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-50 border border-brand/20 text-brand text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next-Gen Academic Collaboration</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight max-w-3xl mx-auto leading-tight">
              Empowering Higher Education with Verified Intelligence
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              The Intelligent Collaborative Academic Workspace (ICAW) connects students, faculty, and academic advisors in a unified ecosystem designed for genuine academic mastery.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/register"
                className="px-6 py-3 rounded-xl bg-brand text-white font-bold text-sm shadow-md hover:bg-brand-hover transition-all inline-flex items-center space-x-2"
              >
                <span>Join the Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-xl bg-slate-100 text-slate-700 font-semibold text-sm hover:bg-slate-200 transition-all"
              >
                Institutional Inquiries
              </Link>
            </div>
          </div>
        </section>

        {/* Core Pillars */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Engineered for Academic Rigor
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Every tool within ICAW is purpose-built to enhance comprehension, elevate teaching efficiency, and support collaborative learning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-brand/5 border border-brand/20 flex items-center justify-center text-brand">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Mission Statement Banner */}
        <section className="bg-brand text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <GraduationCap className="w-12 h-12 mx-auto text-white/80" />
            <h2 className="text-2xl sm:text-3xl font-black">
              Bridging the Gap Between AI Innovation and University Standards
            </h2>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-2xl mx-auto">
              Our mission is to ensure AI enhances human thinking rather than replacing it. By providing verifiable citations to course curricula, teachers retain pedagogical control while students receive 24/7 personalized guidance.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
