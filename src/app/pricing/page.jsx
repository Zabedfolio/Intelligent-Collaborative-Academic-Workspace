'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import FloatingRoleSwitcher from '../../components/FloatingRoleSwitcher';
import {
  Award,
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  GraduationCap,
  BookOpen,
  HelpCircle,
  X,
  ChevronDown
} from 'lucide-react';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState('semester'); // 'semester' | 'annual'
  const [openPricingFaq, setOpenPricingFaq] = useState(0);

  const plans = [
    {
      name: 'Enrolled Student',
      subtitle: 'For individual university learners',
      price: '$0',
      period: 'free forever',
      badge: 'Most Popular',
      popular: true,
      features: [
        'Unlimited Teacher-Grounded RAG AI queries',
        'Slide-by-slide verified academic citations',
        'Bi-weekly algorithmic study group matching',
        'Adaptive exam diagnostic tests & gap tracking',
        'Real-time collaborative study room access',
        'Campus .edu email domain verification'
      ],
      ctaText: 'Get Started Free',
      ctaHref: '/register'
    },
    {
      name: 'Faculty Pro',
      subtitle: 'For course instructors & professors',
      price: billingCycle === 'semester' ? '$19' : '$15',
      period: 'per month / billed semesterly',
      popular: false,
      features: [
        'Everything in Student tier',
        'Instant syllabus & PDF lecture deck ingestion',
        'Strict RAG grounding boundary controls',
        'Student query audit & answer review queue',
        'Class-wide concept mastery & retention heatmap',
        'Direct Canvas & Blackboard LMS export'
      ],
      ctaText: 'Start Faculty Trial',
      ctaHref: '/register'
    },
    {
      name: 'Campus Enterprise',
      subtitle: 'For academic departments & deans',
      price: 'Custom',
      period: 'institutional SLA agreement',
      popular: false,
      features: [
        'Multi-department hierarchy management',
        'Dedicated isolated vector embedding database',
        'Full FERPA compliance & audit logging',
        'SSO / SAML university directory integration',
        'Custom AI model fine-tuning with faculty notes',
        'Dedicated 24/7 Academic Engineering support'
      ],
      ctaText: 'Contact Academic Sales',
      ctaHref: '/contact'
    }
  ];

  const comparisonRows = [
    { feature: 'Teacher-Grounded RAG AI Queries', student: 'Unlimited', faculty: 'Unlimited', enterprise: 'Unlimited' },
    { feature: 'Exact Slide & Textbook Citations', student: true, faculty: true, enterprise: true },
    { feature: 'Bi-Weekly Peer Study Group Matching', student: true, faculty: true, enterprise: true },
    { feature: 'Adaptive Spaced-Repetition Exam Prep', student: true, faculty: true, enterprise: true },
    { feature: 'Real-Time Yjs Collaborative Canvas', student: true, faculty: true, enterprise: true },
    { feature: 'Lecture PDF & Syllabus Vector Ingestion', student: false, faculty: true, enterprise: true },
    { feature: 'Strict Scope Grounding Locks', student: false, faculty: true, enterprise: true },
    { feature: 'Instructor Answer Review Queue', student: false, faculty: true, enterprise: true },
    { feature: 'Classwide Topic Struggle Heatmaps', student: false, faculty: true, enterprise: true },
    { feature: 'Canvas / Blackboard LMS Integration', student: false, faculty: 'Manual Export', enterprise: 'Automated 2-Way' },
    { feature: 'Departmental Faculty Hierarchy', student: false, faculty: false, enterprise: true },
    { feature: 'Dedicated Isolated Vector DB (pgvector)', student: false, faculty: false, enterprise: true },
    { feature: 'FERPA Audit Logs & Encryption Keys', student: true, faculty: true, enterprise: true },
    { feature: 'University SAML/SSO Directory', student: false, faculty: false, enterprise: true },
    { feature: 'Dedicated Academic Engineering Lead', student: false, faculty: false, enterprise: true }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-brand selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        
        {/* Header */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-14 shadow-sm text-center max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-50 text-brand border border-brand/20 mx-auto">
            <Award className="w-3.5 h-3.5 text-brand" />
            <span>Academic Pricing & Institutional Tiers</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Transparent Plans for Every Academic Need
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
            Free forever for enrolled students with university email addresses. Scalable tiers for faculty and university divisions.
          </p>

          {/* Billing Switcher */}
          <div className="pt-2 inline-flex items-center p-1.5 bg-slate-100 rounded-2xl border border-slate-200/80">
            <button
              onClick={() => setBillingCycle('semester')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                billingCycle === 'semester'
                  ? 'bg-white text-brand shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semester Billing (4 Months)
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                billingCycle === 'annual'
                  ? 'bg-white text-brand shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Academic Year (Save 20%)
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-3xl border p-8 shadow-sm flex flex-col justify-between space-y-6 relative ${
                p.popular
                  ? 'border-brand ring-2 ring-brand/20 shadow-md'
                  : 'border-slate-200/90'
              }`}
            >
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-brand text-white shadow-sm">
                  {p.badge}
                </span>
              )}

              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="font-bold text-lg text-slate-900">{p.name}</h3>
                  <p className="text-xs text-slate-500">{p.subtitle}</p>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-4xl font-black text-slate-900">{p.price}</span>
                    <span className="text-xs text-slate-400 font-medium">/ {p.period}</span>
                  </div>
                </div>

                <div className="space-y-2.5 pt-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    What's Included:
                  </span>
                  {p.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start space-x-2.5 text-xs text-slate-700">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href={p.ctaHref}
                className={`w-full py-3.5 rounded-xl font-bold text-xs text-center transition-all shadow-sm block ${
                  p.popular
                    ? 'bg-brand text-white hover:bg-brand-hover shadow-brand/20'
                    : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                }`}
              >
                {p.ctaText}
              </Link>
            </div>
          ))}
        </div>

        {/* ================================================================= */}
        {/* FULL FEATURE COMPARISON MATRIX TABLE                              */}
        {/* ================================================================= */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 sm:p-10 space-y-6">
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              Full Feature Comparison Matrix
            </h3>
            <p className="text-xs text-slate-500">
              Detailed granular breakdown of capabilities across academic tiers.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Feature & Architecture</th>
                  <th className="py-3 px-4 text-slate-800">Student Learner</th>
                  <th className="py-3 px-4 text-slate-800">Faculty Pro</th>
                  <th className="py-3 px-4 text-brand font-black">Campus Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {comparisonRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-900">{row.feature}</td>
                    
                    <td className="py-3.5 px-4">
                      {typeof row.student === 'boolean' ? (
                        row.student ? <Check className="w-4 h-4 text-emerald-600" /> : <X className="w-4 h-4 text-slate-300" />
                      ) : (
                        <span className="font-medium text-slate-800">{row.student}</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      {typeof row.faculty === 'boolean' ? (
                        row.faculty ? <Check className="w-4 h-4 text-emerald-600" /> : <X className="w-4 h-4 text-slate-300" />
                      ) : (
                        <span className="font-medium text-slate-800">{row.faculty}</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      {typeof row.enterprise === 'boolean' ? (
                        row.enterprise ? <Check className="w-4 h-4 text-emerald-600 font-bold" /> : <X className="w-4 h-4 text-slate-300" />
                      ) : (
                        <span className="font-bold text-brand">{row.enterprise}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 shadow-sm space-y-6 max-w-4xl mx-auto">
          <div className="space-y-1 text-center">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Pricing & Access FAQs</h3>
            <p className="text-xs text-slate-500">Everything you need to know about ICAW institutional plans.</p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'How does university .edu verification work?',
                a: 'When students register, we send a secure verification token to their university email domain. Once confirmed, full access to the RAG AI tutor, adaptive exam prep, and peer group matcher is activated with zero expiration.'
              },
              {
                q: 'Can professors expense the Faculty Pro tier through their university department?',
                a: 'Yes. Invoices are generated with formal academic tax credentials and can be submitted directly for departmental software reimbursement.'
              },
              {
                q: 'What is included in the Campus Enterprise contract?',
                a: 'Enterprise agreements include a tenant-isolated pgvector database, single sign-on (SSO/SAML), continuous Canvas/Blackboard integration, custom LMS course sync, and dedicated academic engineering support.'
              }
            ].map((faq, idx) => {
              const isOpen = openPricingFaq === idx;
              return (
                <div key={idx} className="rounded-2xl border border-slate-200 overflow-hidden">
                  <button
                    onClick={() => setOpenPricingFaq(isOpen ? -1 : idx)}
                    className="w-full p-4 text-left flex items-center justify-between bg-slate-50/60 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <span className="font-bold text-xs sm:text-sm text-slate-900">{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="p-4 text-xs text-slate-600 bg-white leading-relaxed border-t border-slate-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </main>

      <Footer />
      <FloatingRoleSwitcher />
    </div>
  );
}
