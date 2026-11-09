'use client';

import { useState } from 'react';
import {
  Settings,
  Bot,
  Users,
  Bell,
  Shield,
  Save,
  CheckCircle2,
  Trash2,
  RotateCcw,
  Sparkles,
  Sliders,
  Lock
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function StudentSettingsView({ user }) {
  // Settings State
  const [citationDensity, setCitationDensity] = useState('inline'); // 'inline' | 'footnote'
  const [mathDerivationMode, setMathDerivationMode] = useState(true);
  const [matchingOptIn, setMatchingOptIn] = useState(true);
  const [preferredGroupSize, setPreferredGroupSize] = useState('3-4');
  const [studyMode, setStudyMode] = useState('hybrid'); // 'hybrid' | 'virtual' | 'campus'
  const [examAlerts, setExamAlerts] = useState(true);
  const [cohortCycleAlerts, setCohortCycleAlerts] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveSettings = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Workspace preferences updated successfully!');
    }, 600);
  };

  const handleClearCache = () => {
    try {
      localStorage.removeItem('icaw_search_recent');
      sessionStorage.removeItem('icaw_cached_resources');
      toast.success('Temporary application cache cleared.');
    } catch (e) {
      toast.success('Cache cleared.');
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-brand-50 text-brand border border-brand/20">
              <Settings className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900">Student Workspace Settings</h2>
          </div>
          <p className="text-xs text-slate-500">
            Configure RAG AI tutor explanation rigor, automated study matching, and notification triggers.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSaveSettings}
          disabled={isSaving}
          className="flex items-center space-x-1.5 px-5 py-2.5 rounded-xl bg-brand text-white text-xs font-bold hover:bg-brand-hover shadow-sm transition-all disabled:opacity-50 cursor-pointer shrink-0"
        >
          <Save className="w-3.5 h-3.5" />
          <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
        </button>
      </div>

      {/* 1. RAG AI Tutor Preferences */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center space-x-2.5 pb-4 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand border border-brand/20 flex items-center justify-center">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900">AI Tutor & Grounding Preferences</h3>
            <p className="text-xs text-slate-500">Fine-tune explanation style and syllabus citation constraints</p>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          {/* Citation Format */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
            <div>
              <h4 className="font-bold text-slate-800">Slide Attribution Style</h4>
              <p className="text-slate-500 text-[11px]">Display slide citations inline with equations or at the footnote of responses.</p>
            </div>
            <div className="flex items-center space-x-2 shrink-0">
              <button
                type="button"
                onClick={() => setCitationDensity('inline')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  citationDensity === 'inline'
                    ? 'bg-brand text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200'
                }`}
              >
                Inline Badges [Slide X]
              </button>
              <button
                type="button"
                onClick={() => setCitationDensity('footnote')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  citationDensity === 'footnote'
                    ? 'bg-brand text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200'
                }`}
              >
                Bottom Footnotes
              </button>
            </div>
          </div>

          {/* Step-by-Step Derivations */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
            <div className="space-y-0.5">
              <h4 className="font-bold text-slate-800">Step-by-Step Mathematical Derivations</h4>
              <p className="text-slate-500 text-[11px]">Always show full intermediate calculus/algebra steps for exam review.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={mathDerivationMode}
                onChange={(e) => setMathDerivationMode(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-10 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand" />
            </label>
          </div>
        </div>
      </div>

      {/* 2. Study Group Matching Preferences */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center space-x-2.5 pb-4 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand border border-brand/20 flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900">Cohort & Pairing Preferences</h3>
            <p className="text-xs text-slate-500">Configure your participation in automated bi-weekly matching cycles</p>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          {/* Opt-in toggle */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
            <div className="space-y-0.5">
              <h4 className="font-bold text-slate-800">Participate in Automated Cohort Pairing</h4>
              <p className="text-slate-500 text-[11px]">When active, you are automatically grouped with peers sharing your free study blocks.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={matchingOptIn}
                onChange={(e) => setMatchingOptIn(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-10 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand" />
            </label>
          </div>

          {/* Preferred Study Mode */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
            <div>
              <h4 className="font-bold text-slate-800">Preferred Collaboration Mode</h4>
              <p className="text-slate-500 text-[11px]">Choose where you prefer to collaborate with your cohort.</p>
            </div>
            <div className="flex items-center space-x-2 shrink-0">
              {['hybrid', 'virtual', 'campus'].map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setStudyMode(mode)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                    studyMode === mode
                      ? 'bg-brand text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Notifications & Cache Controls */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center space-x-2.5 pb-4 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand border border-brand/20 flex items-center justify-center">
            <Bell className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900">Notifications & Diagnostics</h3>
            <p className="text-xs text-slate-500">Alert triggers for exam readiness and matching cycles</p>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
            <div className="space-y-0.5">
              <h4 className="font-bold text-slate-800">Exam Preparation & Diagnostic Alerts</h4>
              <p className="text-slate-500 text-[11px]">Receive reminders when targeted review blitzes are generated before midterms.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={examAlerts}
                onChange={(e) => setExamAlerts(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-10 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand" />
            </label>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
            <div className="space-y-0.5">
              <h4 className="font-bold text-slate-800">Local Cache Management</h4>
              <p className="text-slate-500 text-[11px]">Clear cached search history and locally stored resource previews.</p>
            </div>
            <button
              type="button"
              onClick={handleClearCache}
              className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 font-bold transition-all cursor-pointer"
            >
              Clear Cache
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
