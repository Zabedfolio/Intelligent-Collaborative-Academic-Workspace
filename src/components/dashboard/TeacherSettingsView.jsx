'use client';

import { useState } from 'react';
import {
  Settings,
  Building2,
  Sliders,
  ShieldCheck,
  CheckCircle2,
  Save,
  Bell,
  CheckSquare,
  BookOpen,
  Lock,
  Sparkles,
  Bot
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function TeacherSettingsView({ user }) {
  const [department, setDepartment] = useState(
    user?.department || 'Department of Computer Science & Artificial Intelligence'
  );
  const [designation, setDesignation] = useState(
    user?.designation || 'Associate Professor & AI Curriculum Chair'
  );
  const [officeHours, setOfficeHours] = useState(
    user?.officeHours || 'Tue & Thu: 2:00 PM - 4:30 PM (Academic Hall Suite 402 / Zoom)'
  );
  const [strictAttribution, setStrictAttribution] = useState(true);
  const [autoFlagLowConfidence, setAutoFlagLowConfidence] = useState(true);
  const [rubricPassingThreshold, setRubricPassingThreshold] = useState(70);
  const [classConfusionAlerts, setClassConfusionAlerts] = useState(true);
  const [dailyVectorSyncEmail, setDailyVectorSyncEmail] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveSettings = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Faculty settings & pedagogical guidelines updated!');
    }, 600);
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
              <Settings className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900">Faculty & Pedagogical Settings</h2>
          </div>
          <p className="text-xs text-slate-500">
            Configure institutional appointment details, RAG tutor strictness thresholds, and AI rubric grading controls.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSaveSettings}
          disabled={isSaving}
          className="flex items-center space-x-1.5 px-5 py-2.5 rounded-xl bg-brand text-white text-xs font-bold hover:bg-brand-hover shadow-sm transition-all disabled:opacity-50 cursor-pointer shrink-0"
        >
          <Save className="w-3.5 h-3.5" />
          <span>{isSaving ? 'Saving...' : 'Save Faculty Settings'}</span>
        </button>
      </div>

      {/* 1. Academic Affiliation & Office Consultation */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center space-x-2.5 pb-4 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand border border-brand/20 flex items-center justify-center">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900">Academic Affiliation & Advisory Hours</h3>
            <p className="text-xs text-slate-500">Public faculty credentials displayed to enrolled students</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
              Academic Department Affiliation *
            </label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand shadow-2xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
              Faculty Designation / Title *
            </label>
            <input
              type="text"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand shadow-2xs"
            />
          </div>

          <div className="md:col-span-2 space-y-1.5">
            <label className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
              Office Hours & Student Advisory Location
            </label>
            <input
              type="text"
              value={officeHours}
              onChange={(e) => setOfficeHours(e.target.value)}
              placeholder="e.g. Tue & Thu: 2:00 PM - 4:30 PM (Suite 402 / Zoom)"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand shadow-2xs"
            />
          </div>
        </div>
      </div>

      {/* 2. RAG Grounding & AI Moderation Policies */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center space-x-2.5 pb-4 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand border border-brand/20 flex items-center justify-center">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900">Curriculum RAG Grounding Policies</h3>
            <p className="text-xs text-slate-500">Enforce strict adherence to approved lecture slides and syllabi</p>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          {/* Strict Attribution Enforcement */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
            <div className="space-y-0.5">
              <h4 className="font-bold text-slate-800">Strict Slide Attribution Constraint</h4>
              <p className="text-slate-500 text-[11px]">
                Require the AI tutor to cite explicit slide and page numbers before emitting answers. Questions outside course syllabus are flagged.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={strictAttribution}
                onChange={(e) => setStrictAttribution(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-10 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand" />
            </label>
          </div>

          {/* AI Rubric Threshold */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
            <div>
              <h4 className="font-bold text-slate-800">Rubric Review Auto-Flag Threshold</h4>
              <p className="text-slate-500 text-[11px]">
                Automatically flag student answers for manual professor review when AI rubric evaluation confidence falls below this percentage.
              </p>
            </div>
            <div className="flex items-center space-x-2 shrink-0">
              <input
                type="range"
                min="50"
                max="90"
                step="5"
                value={rubricPassingThreshold}
                onChange={(e) => setRubricPassingThreshold(Number(e.target.value))}
                className="w-24 accent-brand cursor-pointer"
              />
              <span className="font-mono font-bold text-brand min-w-[36px]">
                {rubricPassingThreshold}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Class Analytics & Faculty Alerts */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center space-x-2.5 pb-4 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand border border-brand/20 flex items-center justify-center">
            <Bell className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900">Pedagogical Alerts & Digest</h3>
            <p className="text-xs text-slate-500">Real-time alerts on classwide misunderstandings and vectorization</p>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
            <div className="space-y-0.5">
              <h4 className="font-bold text-slate-800">Classwide Confusion Heatmap Alerts</h4>
              <p className="text-slate-500 text-[11px]">Notify me 48 hours before exams if &gt;25% of students struggle with a specific lecture slide topic.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={classConfusionAlerts}
                onChange={(e) => setClassConfusionAlerts(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-10 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand" />
            </label>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
            <div className="space-y-0.5">
              <h4 className="font-bold text-slate-800">Daily Ingestion & Vector Sync Report</h4>
              <p className="text-slate-500 text-[11px]">Receive an email summary whenever new lecture PDFs or exam banks finish embedding.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={dailyVectorSyncEmail}
                onChange={(e) => setDailyVectorSyncEmail(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-10 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand" />
            </label>
          </div>
        </div>
      </div>

    </div>
  );
}
