'use client';

import Link from 'next/link';
import { ShieldCheck, Lock, EyeOff, Server, Database } from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Navbar />

      <main className="flex-1 py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-10 space-y-3">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand/20 text-brand text-xs font-bold uppercase tracking-wider">
              <Lock className="w-3.5 h-3.5" />
              <span>Data Protection & FERPA Compliance</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Privacy & AI Ethics Policy
            </h1>
            <p className="text-sm text-slate-600 max-w-xl mx-auto">
              How student data, academic queries, and course documents are protected within ICAW.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-10 shadow-sm space-y-8 text-sm leading-relaxed text-slate-600">
            <section className="space-y-3">
              <div className="flex items-center space-x-2 text-brand font-bold text-base">
                <ShieldCheck className="w-5 h-5 text-brand" />
                <h2 className="text-slate-900 font-extrabold text-lg">1. Academic Data Confidentiality</h2>
              </div>
              <p>
                Student educational records, assessment scores, and AI interaction history are treated with stringent confidentiality consistent with FERPA standards. Student prompts are never sold or exploited for commercial tracking.
              </p>
            </section>

            <section className="space-y-3">
              <div className="flex items-center space-x-2 text-brand font-bold text-base">
                <Database className="w-5 h-5 text-brand" />
                <h2 className="text-slate-900 font-extrabold text-lg">2. Isolated RAG Embeddings</h2>
              </div>
              <p>
                Faculty syllabus documents and student interactions are vector-indexed in tenant-isolated partitions. Your queries are checked against teacher-approved course vectors, ensuring no cross-institutional leakage.
              </p>
            </section>

            <section className="space-y-3">
              <div className="flex items-center space-x-2 text-brand font-bold text-base">
                <EyeOff className="w-5 h-5 text-brand" />
                <h2 className="text-slate-900 font-extrabold text-lg">3. Model Training Guarantees</h2>
              </div>
              <p>
                Student answers, diagnostic test attempts, and proprietary university course slides are never utilized to pre-train public foundation models. All inference remains scoped to local academic sessions.
              </p>
            </section>

            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
              <p>Have specific compliance or legal questions?</p>
              <Link href="/contact" className="font-bold text-brand hover:underline">
                Contact Data Protection Officer &rarr;
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
