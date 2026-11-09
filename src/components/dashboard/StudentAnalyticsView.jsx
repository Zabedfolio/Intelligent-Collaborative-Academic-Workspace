'use client';

import { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Award,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
  BookOpen,
  ArrowRight,
  Filter
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function StudentAnalyticsView({ user }) {
  const [selectedCourse, setSelectedCourse] = useState('cs401');

  // Topic mastery list (Bayesian Knowledge Tracing)
  const topicMastery = [
    {
      topic: 'Deep Neural Networks & Backpropagation',
      mastery: 96,
      status: 'Mastered',
      questionsAttempted: 32,
      accuracy: '94%',
      lastTested: 'Yesterday'
    },
    {
      topic: 'Convolutional Networks & ResNets',
      mastery: 92,
      status: 'Mastered',
      questionsAttempted: 28,
      accuracy: '89%',
      lastTested: '2 days ago'
    },
    {
      topic: 'Transformer Attention & Multi-Head Self-Attention',
      mastery: 84,
      status: 'Proficient',
      questionsAttempted: 24,
      accuracy: '82%',
      lastTested: '3 days ago'
    },
    {
      topic: 'Recurrent Neural Networks & LSTMs',
      mastery: 78,
      status: 'Proficient',
      questionsAttempted: 18,
      accuracy: '76%',
      lastTested: '4 days ago'
    },
    {
      topic: 'Batch Normalization & Adaptive Optimizers',
      mastery: 62,
      status: 'Needs Review',
      questionsAttempted: 15,
      accuracy: '58%',
      lastTested: 'Today',
      isWeakSpot: true
    }
  ];

  // Weekly study hours breakdown (Mon - Sun)
  const weeklyStudyHours = [
    { day: 'Mon', hours: 4.5 },
    { day: 'Tue', hours: 3.8 },
    { day: 'Wed', hours: 5.2 },
    { day: 'Thu', hours: 4.0 },
    { day: 'Fri', hours: 2.5 },
    { day: 'Sat', hours: 6.0 },
    { day: 'Sun', hours: 3.5 }
  ];

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-brand-50 text-brand border border-brand/20">
              <BarChart3 className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900">Mastery Analytics & Knowledge Tracing</h2>
          </div>
          <p className="text-xs text-slate-500">
            Bayesian cognitive evaluation tracking your syllabus comprehension and exam readiness.
          </p>
        </div>

        {/* Course Filter Dropdown */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-slate-500">Course Filter:</span>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          >
            <option value="cs401">CS401: Machine Learning</option>
            <option value="math202">MATH202: Linear Algebra</option>
            <option value="cs302">CS302: Data Structures</option>
          </select>
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Overall Course Mastery</span>
            <Award className="w-4 h-4 text-brand" />
          </div>
          <div className="text-3xl font-black text-brand font-mono">84.2%</div>
          <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+6.8% since last diagnostic</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Exam Bank Accuracy</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono">88%</div>
          <div className="text-[11px] text-slate-400">103/117 questions correct</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Study Time This Week</span>
            <Clock className="w-4 h-4 text-brand" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono">29.5h</div>
          <div className="text-[11px] text-brand font-semibold">Across 5 course units</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Diagnosed Weak Spots</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-black text-amber-600 font-mono">1 Topic</div>
          <div className="text-[11px] text-amber-700 font-semibold">Batch Normalization</div>
        </div>
      </div>

      {/* Topic Comprehension Heatmap & Progress Bars */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="space-y-1">
            <h3 className="font-bold text-base text-slate-900">Curriculum Topic Comprehension</h3>
            <p className="text-xs text-slate-500">
              Evaluated by Bayesian knowledge tracing from your practice blitzes and AI tutor queries.
            </p>
          </div>
          <span className="text-xs font-bold text-brand bg-brand-50 px-3 py-1 rounded-full border border-brand/20">
            5 Syllabus Units Monitored
          </span>
        </div>

        <div className="space-y-4">
          {topicMastery.map((item, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border transition-all ${
                item.isWeakSpot
                  ? 'bg-amber-50/50 border-amber-200/80 shadow-xs'
                  : 'bg-slate-50/50 border-slate-200/80'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      item.status === 'Mastered'
                        ? 'bg-emerald-100 text-emerald-800'
                        : item.status === 'Proficient'
                        ? 'bg-brand-50 text-brand border border-brand/20'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {item.status}
                  </span>
                  <h4 className="font-bold text-xs text-slate-900">{item.topic}</h4>
                </div>

                <div className="flex items-center space-x-3 text-xs">
                  <span className="text-slate-500 text-[11px]">
                    Accuracy: <strong>{item.accuracy}</strong> ({item.questionsAttempted} Qs)
                  </span>
                  <span className="font-mono font-black text-brand text-sm">
                    {item.mastery}%
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2.5 bg-white rounded-full overflow-hidden p-0.5 border border-slate-200">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    item.mastery >= 90
                      ? 'bg-emerald-500'
                      : item.mastery >= 75
                      ? 'bg-brand'
                      : 'bg-amber-500'
                  }`}
                  style={{ width: `${item.mastery}%` }}
                />
              </div>

              {/* Weak Spot Alert & Remediation CTA */}
              {item.isWeakSpot && (
                <div className="mt-3 pt-3 border-t border-amber-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-amber-900">
                  <span className="flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Focus area: Mini-batch sample variance equations on Lecture 07.</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => toast.success('Loaded targeted practice questions for Batch Normalization!')}
                    className="inline-flex items-center space-x-1 px-3 py-1 rounded-xl bg-amber-600 text-white font-bold text-xs hover:bg-amber-700 transition-all cursor-pointer self-start sm:self-auto"
                  >
                    <span>Remediate Topic</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Study Distribution Bar Chart */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="space-y-1">
            <h3 className="font-bold text-base text-slate-900">Weekly Study Effort Distribution</h3>
            <p className="text-xs text-slate-500">
              Daily active engagement across AI Tutor discussions, practice quizzes, and study groups.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-slate-500">
            Avg: 4.2 hrs / day
          </span>
        </div>

        {/* CSS Bar Chart */}
        <div className="grid grid-cols-7 gap-3 pt-4 items-end h-44">
          {weeklyStudyHours.map((d) => {
            const heightPercent = Math.round((d.hours / 6.0) * 100);
            return (
              <div key={d.day} className="flex flex-col items-center h-full justify-end group">
                <span className="text-[10px] font-mono font-bold text-slate-400 group-hover:text-brand mb-1">
                  {d.hours}h
                </span>
                <div className="w-full max-w-[40px] bg-slate-100 rounded-t-xl overflow-hidden flex flex-col justify-end p-0.5 h-32 border border-slate-200/60">
                  <div
                    className="w-full bg-gradient-to-t from-emerald-700 to-brand rounded-t-lg transition-all group-hover:brightness-110"
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-slate-700 mt-2">{d.day}</span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
