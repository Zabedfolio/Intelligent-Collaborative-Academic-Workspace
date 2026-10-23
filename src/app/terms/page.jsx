'use client';

import Link from 'next/link';
import { ShieldCheck, BookOpen, FileCheck, Scale, AlertCircle } from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Navbar />

      <main className="flex-1 py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-10 space-y-3">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand/20 text-brand text-xs font-bold uppercase tracking-wider">
              <Scale className="w-3.5 h-3.5" />
              <span>Platform Policies & Honor Code</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Terms of Service & Academic Integrity
            </h1>
            <p className="text-sm text-slate-600 max-w-xl mx-auto">
              Last updated: October 2026. Please review our institutional policies governing ethical AI use and collaborative scholarship.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-10 shadow-sm space-y-8 text-sm leading-relaxed text-slate-600">
            
            {/* Section 1 */}
            <section id="academic-integrity" className="space-y-3">
              <div className="flex items-center space-x-2 text-brand font-bold text-base">
                <ShieldCheck className="w-5 h-5 text-brand" />
                <h2 className="text-slate-900 font-extrabold text-lg">1. Academic Integrity & Honor Pledge</h2>
              </div>
              <p>
                By enrolling and utilizing the Intelligent Collaborative Academic Workspace (ICAW), every student and educator commits to uphoding university honor codes. ICAW’s RAG AI tutor is designed strictly for conceptual mastery, Socratic guidance, and exam preparation.
              </p>
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs space-y-1">
                <p className="font-bold">Strict Prohibition Against Dishonesty:</p>
                <p>
                  Directly inputting live, active, or proctored examination questions to obtain unauthorized answers constitutes an honor code violation. Actions are auditable by verified course instructors.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <div className="flex items-center space-x-2 text-brand font-bold text-base">
                <BookOpen className="w-5 h-5 text-brand" />
                <h2 className="text-slate-900 font-extrabold text-lg">2. Faculty & Curriculum Materials</h2>
              </div>
              <p>
                All textbooks, slides, and lecture notes indexed in course RAG databases remain the intellectual property of their respective authors and academic institutions. Users may not export, scrape, or distribute proprietary materials beyond individual study within the workspace.
              </p>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <div className="flex items-center space-x-2 text-brand font-bold text-base">
                <FileCheck className="w-5 h-5 text-brand" />
                <h2 className="text-slate-900 font-extrabold text-lg">3. Collaborative Study Groups</h2>
              </div>
              <p>
                Study group matching is provided to foster peer engagement. Harassment, unauthorized commercial promotion, or disruption of study spaces is strictly prohibited and subject to immediate suspension.
              </p>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <div className="flex items-center space-x-2 text-brand font-bold text-base">
                <Scale className="w-5 h-5 text-brand" />
                <h2 className="text-slate-900 font-extrabold text-lg">4. User Accounts & Verification</h2>
              </div>
              <p>
                Students and teachers must maintain accurate registration credentials. Teacher accounts undergo institutional verification before unlocking course publication and custom RAG model configuration privileges.
              </p>
            </section>

            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
              <p>Need further clarification on institutional governance?</p>
              <Link href="/contact" className="font-bold text-brand hover:underline">
                Contact Academic Affairs &rarr;
              </Link>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
