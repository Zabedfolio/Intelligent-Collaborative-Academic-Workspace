'use client';

import { useState, useEffect } from 'react';
import { Sliders, Sparkles, ShieldCheck, Layers, Save, CheckCircle2, AlertTriangle, Coins } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CourseAISettingsCard({
  course,
  onSave,
  isSaving = false,
  canEdit = true
}) {
  const [strictCourseMode, setStrictCourseMode] = useState(true);
  const [cumulativeFinalScope, setCumulativeFinalScope] = useState(false);
  const [maxContextTokens, setMaxContextTokens] = useState(2500);

  useEffect(() => {
    if (course?.aiConfig) {
      setStrictCourseMode(course.aiConfig.strictCourseMode ?? true);
      setCumulativeFinalScope(course.aiConfig.cumulativeFinalScope ?? false);
      setMaxContextTokens(course.aiConfig.maxContextTokens ?? 2500);
    }
  }, [course]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!canEdit) return;

    await onSave({
      strictCourseMode,
      cumulativeFinalScope,
      maxContextTokens
    });
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand border border-brand/20 flex items-center justify-center shrink-0">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-brand-50 text-brand border border-brand/20">
                Pedagogical Governance
              </span>
              <span className="text-xs font-mono font-bold text-slate-500">
                {course?.code || course?.courseCode}
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">
              Course AI Tutor & Grounding Parameters
            </h3>
          </div>
        </div>

        {canEdit && (
          <button
            type="button"
            onClick={handleFormSubmit}
            disabled={isSaving}
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-brand text-white font-bold text-xs hover:bg-brand-hover shadow-xs transition-all whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? 'Saving Rules...' : 'Save AI Parameters'}</span>
          </button>
        )}
      </div>

      <div className="space-y-5 text-xs">
        {/* 1. Strict Course Mode Toggle */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
          <div className="space-y-1 pr-4">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <h4 className="font-bold text-slate-900 text-xs">Strict Syllabus Grounding Mode</h4>
              <span className="text-[10px] font-bold uppercase px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                Recommended
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              When active, the RAG AI tutor is strictly forbidden from answering using general internet knowledge. If a concept is absent from course lecture slides, the tutor explicitly outputs &quot;Not covered in uploaded course resources.&quot;
            </p>
          </div>

          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              type="checkbox"
              disabled={!canEdit}
              checked={strictCourseMode}
              onChange={(e) => setStrictCourseMode(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
          </label>
        </div>

        {/* 2. Cumulative Final Scope Toggle */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
          <div className="space-y-1 pr-4">
            <div className="flex items-center space-x-2">
              <Layers className="w-4 h-4 text-brand shrink-0" />
              <h4 className="font-bold text-slate-900 text-xs">Cumulative Final Exam Retrieval Rule</h4>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              When enabled, student queries under the <strong>Final Scope</strong> retrieve context chunks from both Midterm and Final slide decks. When disabled, Final exam preparation retrieves only from post-midterm materials.
            </p>
          </div>

          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              type="checkbox"
              disabled={!canEdit}
              checked={cumulativeFinalScope}
              onChange={(e) => setCumulativeFinalScope(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
          </label>
        </div>

        {/* 3. Max Context Tokens Slider */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Coins className="w-4 h-4 text-brand shrink-0" />
              <div>
                <h4 className="font-bold text-slate-900 text-xs">Max Retrieved Context Budget per Query</h4>
                <p className="text-[11px] text-slate-500">
                  Enforces strict upper bounds on vector chunk retrieval to control token consumption.
                </p>
              </div>
            </div>

            <span className="font-mono font-bold text-xs px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-brand shadow-2xs shrink-0">
              {maxContextTokens.toLocaleString()} tokens
            </span>
          </div>

          <div className="pt-2">
            <input
              type="range"
              min="500"
              max="5000"
              step="250"
              disabled={!canEdit}
              value={maxContextTokens}
              onChange={(e) => setMaxContextTokens(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
              <span>500 (Economy / Top-2 chunks)</span>
              <span>2,500 (Balanced / Top-5 chunks)</span>
              <span>5,000 (Exhaustive)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

