'use client';

import { useState } from 'react';
import {
  Sliders,
  Bot,
  ShieldCheck,
  Save,
  CheckCircle2,
  Sparkles,
  Zap,
  BookOpen,
  Lock,
  Cpu,
  RotateCcw
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function TeacherAIConfigView({ user }) {
  const [selectedCourse, setSelectedCourse] = useState('cs401');
  const [topK, setTopK] = useState(4);
  const [similarityThreshold, setSimilarityThreshold] = useState(0.82);
  const [temperature, setTemperature] = useState(0.15);
  const [systemPromptOverride, setSystemPromptOverride] = useState(
    "You are the verified AI Teaching Assistant for CS401: Advanced Machine Learning & Neural Networks at IIUC. Ground all responses strictly on uploaded lecture slides and syllabus rubrics. Enforce explicit [Slide X, Page Y] citations. If a student inquires about unverified outside material, gently redirect them to the course curriculum."
  );
  const [citationMandate, setCitationMandate] = useState(true);
  const [stepByStepDerivations, setStepByStepDerivations] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveConfig = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success(`AI Tutor hyperparameters saved for ${selectedCourse.toUpperCase()}!`);
    }, 600);
  };

  const handleResetDefaults = () => {
    setTopK(4);
    setSimilarityThreshold(0.82);
    setTemperature(0.15);
    toast('Restored recommended academic RAG defaults', { icon: 'ℹ️' });
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-brand-50 text-brand border border-brand/20">
              <Sliders className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900">Course AI Tutor Configuration</h2>
          </div>
          <p className="text-xs text-slate-500">
            Control retrieval hyper-parameters, vector similarity thresholds, and hallucination guardrails for student inquiries.
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={handleSaveConfig}
            disabled={isSaving}
            className="flex items-center space-x-1.5 px-5 py-2 rounded-xl bg-brand text-white text-xs font-bold hover:bg-brand-hover shadow-sm transition-all disabled:opacity-50 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? 'Saving...' : 'Save AI Config'}</span>
          </button>
        </div>
      </div>

      {/* Course Target Selector Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-4 h-4 text-brand" />
          <span className="text-xs font-bold text-slate-800">Active Course Target:</span>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-brand bg-slate-50 focus:outline-none"
          >
            <option value="cs401">CS401: Advanced Machine Learning</option>
            <option value="cs302">CS302: Data Structures & Algorithms</option>
            <option value="cs605">CS605: Deep Generative Architectures</option>
          </select>
        </div>

        <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
          RAG Pipeline: Strict Grounding Online
        </span>
      </div>

      {/* Retrieval Hyperparameters Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center space-x-2.5 pb-4 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand border border-brand/20 flex items-center justify-center">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900">Dense Retrieval & Similarity Thresholds</h3>
            <p className="text-xs text-slate-500">Fine-tune how many slide chunks are injected and how strictly they must match.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          
          {/* Top-K Chunks */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800">Top-k Retrieved Chunks</span>
              <span className="text-base font-mono font-black text-brand">{topK} Chunks</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Number of 256-token passages extracted from course slides per inquiry.
            </p>
            <input
              type="range"
              min="2"
              max="8"
              step="1"
              value={topK}
              onChange={(e) => setTopK(Number(e.target.value))}
              className="w-full accent-brand cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>2 (Ultra-focused)</span>
              <span>8 (Broad context)</span>
            </div>
          </div>

          {/* Cosine Similarity Cutoff */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800">Similarity Cutoff</span>
              <span className="text-base font-mono font-black text-brand">{similarityThreshold}</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Minimum cosine similarity required before a chunk is accepted into prompt context.
            </p>
            <input
              type="range"
              min="0.70"
              max="0.95"
              step="0.01"
              value={similarityThreshold}
              onChange={(e) => setSimilarityThreshold(Number(e.target.value))}
              className="w-full accent-brand cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>0.70 (Permissive)</span>
              <span>0.95 (Exact Match)</span>
            </div>
          </div>

          {/* Temperature */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800">Model Temperature</span>
              <span className="text-base font-mono font-black text-brand">{temperature}</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Controls deterministic output. Lower temperature ensures accurate math proofs.
            </p>
            <input
              type="range"
              min="0.0"
              max="0.5"
              step="0.05"
              value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
              className="w-full accent-brand cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>0.0 (Deterministic)</span>
              <span>0.5 (Creative)</span>
            </div>
          </div>

        </div>
      </div>

      {/* System Prompt & Guardrails Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center space-x-2.5 pb-4 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand border border-brand/20 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900">Pedagogical Guardrails & System Prompt</h3>
            <p className="text-xs text-slate-500">Governs how the AI tutor introduces itself, guides students, and formats answers.</p>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
              System Instruction Prompt Template
            </label>
            <textarea
              rows={4}
              value={systemPromptOverride}
              onChange={(e) => setSystemPromptOverride(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="font-semibold text-slate-800">Mandatory [Slide X, Page Y] Tagging</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="font-semibold text-slate-800">Zero Unindexed Hallucination Guardrail</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
