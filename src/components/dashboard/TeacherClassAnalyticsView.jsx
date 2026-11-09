'use client';

import { useState } from 'react';
import {
  PieChart,
  BarChart3,
  AlertTriangle,
  TrendingUp,
  Download,
  Users,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function TeacherClassAnalyticsView({ user }) {
  const [selectedCourse, setSelectedCourse] = useState('cs401');

  const curriculumUnits = [
    {
      unit: 'Unit 1: Foundations, Linear Classifiers & Loss Functions',
      comprehension: 94,
      status: 'Strong Mastery',
      questionsAsked: 142,
      difficultyRating: 'Low Friction'
    },
    {
      unit: 'Unit 2: Convex Optimization & SGD Momentum',
      comprehension: 88,
      status: 'Strong Mastery',
      questionsAsked: 210,
      difficultyRating: 'Normal'
    },
    {
      unit: 'Unit 3: Batch Normalization & Mini-Batch Variance',
      comprehension: 54,
      status: 'Critical Confusion Area',
      questionsAsked: 480,
      difficultyRating: 'High Friction',
      isAlert: true
    },
    {
      unit: 'Unit 4: Deep Residual Networks & Vanishing Gradients',
      comprehension: 91,
      status: 'Strong Mastery',
      questionsAsked: 180,
      difficultyRating: 'Normal'
    },
    {
      unit: 'Unit 5: Transformer Multi-Head Self-Attention',
      comprehension: 76,
      status: 'Moderate Comprehension',
      questionsAsked: 390,
      difficultyRating: 'Medium Friction'
    }
  ];

  const handleExportCSV = () => {
    toast.success('Generated classwide diagnostic CSV report');
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-brand-50 text-brand border border-brand/20">
              <PieChart className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900">Classwide Mastery & Confusion Heatmaps</h2>
          </div>
          <p className="text-xs text-slate-500">
            Real-time aggregate diagnostics highlighting where students struggle prior to midterm and final exams.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-brand bg-slate-50 focus:outline-none"
          >
            <option value="cs401">CS401: Machine Learning (142 Students)</option>
            <option value="cs302">CS302: Data Structures (190 Students)</option>
            <option value="cs605">CS605: Deep Generative LLMs (45 Students)</option>
          </select>

          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center space-x-1 px-4 py-2 rounded-xl bg-brand text-white text-xs font-bold hover:bg-brand-hover shadow-sm transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Critical Pre-Exam Alert Banner */}
      <div className="p-5 rounded-3xl bg-amber-500/10 border-2 border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start space-x-3">
          <div className="p-2 rounded-2xl bg-amber-500 text-white shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
              Pre-Midterm Confusion Hotspot Detected
            </span>
            <h3 className="font-bold text-sm text-slate-900">
              46% of CS401 Students Failed Sample Variance Calculations (Unit 3, Slide 34)
            </h3>
            <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
              Diagnostic blitz queries indicate widespread student misconception regarding why Bessel correction factor $N/(N-1)$ matters when $N &lt; 8$.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => toast.success('Generated in-class 10-minute review slide pack')}
          className="px-4 py-2.5 rounded-xl bg-amber-600 text-white font-bold text-xs hover:bg-amber-700 transition-all cursor-pointer shadow-xs shrink-0"
        >
          Create In-Class Review Slide
        </button>
      </div>

      {/* KPI Overview Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Enrolled Class Size</span>
          <div className="text-3xl font-black text-slate-900 font-mono">142</div>
          <div className="text-[11px] text-emerald-600 font-semibold">96% Weekly Active</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Class Average Mastery</span>
          <div className="text-3xl font-black text-brand font-mono">80.6%</div>
          <div className="text-[11px] text-slate-400">Across 5 curriculum units</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">AI Tutor Queries</span>
          <div className="text-3xl font-black text-slate-900 font-mono">1,402</div>
          <div className="text-[11px] text-brand font-semibold">100% Verified Citations</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Active Study Cohorts</span>
          <div className="text-3xl font-black text-emerald-600 font-mono">34 Groups</div>
          <div className="text-[11px] text-slate-400">Automated schedule matching</div>
        </div>
      </div>

      {/* Curriculum Unit Confusion Heatmap Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-base text-slate-900">Curriculum Unit Comprehension Breakdown</h3>
            <p className="text-xs text-slate-500">
              Aggregated from students&apos; practice attempts, diagnostic quizzes, and AI tutor explanations.
            </p>
          </div>

          <span className="text-xs font-mono font-bold text-slate-400">
            Fall 2026 Cohort Aggregate
          </span>
        </div>

        <div className="space-y-4">
          {curriculumUnits.map((u, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border transition-all ${
                u.isAlert
                  ? 'bg-amber-50/50 border-amber-300 shadow-xs'
                  : 'bg-slate-50/50 border-slate-200/80'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center space-x-2.5">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      u.comprehension >= 85
                        ? 'bg-emerald-100 text-emerald-800'
                        : u.comprehension >= 70
                        ? 'bg-brand-50 text-brand'
                        : 'bg-rose-100 text-rose-800 border border-rose-200'
                    }`}
                  >
                    {u.status}
                  </span>
                  <h4 className="font-bold text-xs text-slate-900">{u.unit}</h4>
                </div>

                <div className="flex items-center space-x-3 text-xs">
                  <span className="text-slate-500 text-[11px]">
                    Questions: <strong>{u.questionsAsked}</strong> • Friction: <strong>{u.difficultyRating}</strong>
                  </span>
                  <span className="font-mono font-black text-brand text-sm">
                    {u.comprehension}% Class Average
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2.5 bg-white rounded-full overflow-hidden p-0.5 border border-slate-200">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    u.comprehension >= 85
                      ? 'bg-emerald-500'
                      : u.comprehension >= 70
                      ? 'bg-brand'
                      : 'bg-rose-500'
                  }`}
                  style={{ width: `${u.comprehension}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
