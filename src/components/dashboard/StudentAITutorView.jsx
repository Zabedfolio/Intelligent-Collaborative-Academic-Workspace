'use client';

import { useState } from 'react';
import {
  Bot,
  Sparkles,
  Send,
  BookOpen,
  CheckCircle2,
  FileText,
  Clock,
  Layers,
  HelpCircle,
  Copy,
  RotateCcw,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Zap,
  Target
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function StudentAITutorView({ user }) {
  const lastScope = user?.lastScope || {
    courseId: 'cs401',
    courseName: 'Advanced Machine Learning & Neural Networks',
    examType: 'midterm'
  };

  const samplePrompts = [
    {
      q: 'Why does Batch Normalization struggle with mini-batch sizes smaller than 8?',
      a: 'Batch Normalization computes mean and variance across the batch dimension. When batch size is very small (e.g. < 8), sample statistics become noisy, biased estimators of the dataset distribution. This introduces high gradient variance during backpropagation, destabilizing layer activations and degrading test generalization.',
      source: 'CS401 Lecture 07: Optimization & Normalization',
      slide: 'Slide 34, Section 3.2',
      conf: '99.4% Verified Match',
      topic: 'Normalization Techniques'
    },
    {
      q: 'Explain the mathematical difference between Self-Attention and Cross-Attention in Transformers.',
      a: 'In Self-Attention, Query (Q), Key (K), and Value (V) matrices are all projected from the same input sequence X (i.e. Q = XW_q, K = XW_k, V = XW_v), computing pairwise token affinity within one sequence. In Cross-Attention, Queries are derived from the decoder sequence, while Keys and Values are derived from the encoder output, enabling the decoder to attend over the source representations.',
      source: 'CS401 Lecture 09: Transformer Architectures',
      slide: 'Slide 18, Section 4.1',
      conf: '99.8% Verified Match',
      topic: 'Attention Mechanisms'
    },
    {
      q: 'How does Singular Value Decomposition (SVD) relate to Principal Component Analysis (PCA)?',
      a: 'PCA on a zero-centered data matrix X is mathematically equivalent to the SVD of X = UΣV^T. The right singular vectors V correspond to the principal direction eigenvectors of the covariance matrix X^T X, while the singular values Σ_i relate to the eigenvalues λ_i by λ_i = σ_i² / (n - 1).',
      source: 'CS401 Lecture 04: Dimensionality Reduction',
      slide: 'Slide 42, Equation 7.4',
      conf: '99.1% Verified Match',
      topic: 'Dimensionality Reduction'
    }
  ];

  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `Hello ${user?.name ? user.name.split(' ')[0] : 'Student'}! I am your curriculum-anchored AI Tutor for **${lastScope.courseName}**. Every answer is strictly grounded in your syllabus, lecture slides, and exam banks with zero hallucination. What would you like to review today?`,
      source: null,
      time: 'Just now'
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [inspectedSlide, setInspectedSlide] = useState(samplePrompts[0]);

  const handleSendMessage = (queryText) => {
    const q = queryText || inputQuery;
    if (!q.trim()) return;

    // Append user query
    const newMsg = {
      sender: 'user',
      text: q,
      time: 'Just now'
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputQuery('');
    setIsGenerating(true);

    // Simulate RAG vector retrieval & response
    setTimeout(() => {
      // Find closest prompt or generate grounded response
      const matched = samplePrompts.find((p) =>
        p.q.toLowerCase().includes(q.toLowerCase().slice(0, 15))
      ) || {
        q,
        a: `Based on **${lastScope.courseName}** course materials, this concept is covered in unit slides. Key points include deterministic mathematical derivation, core algorithmic complexity, and specific midterm rubric expectations.`,
        source: 'CS401 Core Syllabus & Lecture Slide Deck',
        slide: 'Slide 22, Topic Overview',
        conf: '98.9% Verified Match',
        topic: 'Curriculum Core'
      };

      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: matched.a,
          source: matched,
          time: 'Just now'
        }
      ]);
      setInspectedSlide(matched);
      setIsGenerating(false);
      toast.success('Retrieved 3 vector chunks from lecture slides!');
    }, 900);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied explanation to clipboard');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Scope & Status Header */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-brand-50 text-brand border border-brand/20">
              <Bot className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-slate-900">RAG AI Course Tutor</h2>
              <p className="text-xs text-slate-500">
                Grounded in syllabus slide decks • 100% verified citations • Zero hallucinations
              </p>
            </div>
          </div>
        </div>

        {/* Current Active Scope Badge */}
        <div className="flex items-center space-x-2 shrink-0">
          <div className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center space-x-1.5">
            <BookOpen className="w-3.5 h-3.5 text-brand" />
            <span>Scope: <strong>{lastScope.courseId?.toUpperCase() || 'CS401'}</strong> ({lastScope.examType?.toUpperCase() || 'MIDTERM'})</span>
          </div>

          <span className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>RAG Online</span>
          </span>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT 2 COLS: Chat Interface */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-sm flex flex-col h-[650px] justify-between">
          
          {/* Quick Prompt Pills */}
          <div className="pb-3 border-b border-slate-100 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-brand" />
              Syllabus Quick Inquiries:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {samplePrompts.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(p.q)}
                  className="text-left px-2.5 py-1 rounded-xl text-xs bg-slate-50 hover:bg-brand-50 hover:text-brand border border-slate-200/70 text-slate-700 transition-all truncate max-w-xs"
                  title={p.q}
                >
                  {p.q}
                </button>
              ))}
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-brand text-white shadow-xs'
                      : 'bg-slate-50 border border-slate-200/80 text-slate-800 shadow-2xs space-y-3'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* Citation Footer on AI response */}
                  {msg.source && (
                    <div className="pt-2 border-t border-slate-200/70 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center space-x-1.5">
                        <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-mono font-bold text-brand">
                          {msg.source.slide}
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium truncate max-w-[180px]">
                          {msg.source.source}
                        </span>
                      </div>

                      <div className="flex items-center space-x-1">
                        <button
                          type="button"
                          onClick={() => setInspectingSlide(msg.source)}
                          className="px-2 py-0.5 rounded-md bg-brand-50 text-brand text-[10px] font-bold hover:bg-brand hover:text-white transition-colors"
                        >
                          Inspect Source
                        </button>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(msg.text)}
                          className="p-1 text-slate-400 hover:text-slate-600 rounded"
                          title="Copy answer"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <span className="text-[10px] text-slate-400 mt-1 px-1">
                  {msg.sender === 'user' ? 'You' : 'Curriculum RAG Engine'} • {msg.time}
                </span>
              </div>
            ))}

            {isGenerating && (
              <div className="flex items-center space-x-2 text-xs text-brand font-medium animate-pulse">
                <Bot className="w-4 h-4 animate-spin" />
                <span>Searching dense vector embeddings across {lastScope.courseId?.toUpperCase()} slides...</span>
              </div>
            )}
          </div>

          {/* Sticky Input Bar */}
          <div className="pt-3 border-t border-slate-100">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center space-x-2"
            >
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder={`Ask any concept from ${lastScope.courseId?.toUpperCase() || 'CS401'} syllabus or slide deck...`}
                className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand shadow-2xs"
              />
              <button
                type="submit"
                disabled={!inputQuery.trim() || isGenerating}
                className="px-5 py-3 rounded-2xl bg-brand text-white text-xs font-bold hover:bg-brand-hover transition-all flex items-center space-x-1.5 shadow-sm disabled:opacity-40 cursor-pointer"
              >
                <span>Ask</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
            <p className="text-[10px] text-slate-400 mt-1.5 text-center">
              Answers are bound to teacher-uploaded slides and syllabi.
            </p>
          </div>

        </div>

        {/* RIGHT 1 COL: Source Inspector & Practice Generator */}
        <div className="space-y-6">
          
          {/* Active Citation Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
              <FileText className="w-4 h-4 text-brand" />
              <h3 className="font-bold text-sm text-slate-900">Retrieved Slide Attribution</h3>
            </div>

            {inspectedSlide ? (
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-brand text-[11px]">
                      {inspectedSlide.slide}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      {inspectedSlide.conf}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-800 text-xs">
                    {inspectedSlide.source}
                  </h4>
                  <p className="text-slate-500 text-[11px] leading-relaxed">
                    Topic Unit: <strong>{inspectedSlide.topic}</strong>
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-brand-50/60 border border-brand/20 text-brand text-[11px] leading-relaxed">
                  <strong>Slide Text Excerpt:</strong> &ldquo;Normalization estimates mini-batch statistics. Sample variance spikes when mini-batch size N &lt; 8, degrading gradient stability.&rdquo;
                </div>
              </div>
            ) : (
              <div className="p-6 text-center text-xs text-slate-400">
                Ask a question to inspect retrieved lecture slide excerpts.
              </div>
            )}
          </div>

          {/* Quick Targeted Review Blitz */}
          <div className="bg-gradient-to-br from-brand to-emerald-950 text-white rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-emerald-300" />
              <h3 className="font-bold text-sm">Exam Diagnostic Blitz</h3>
            </div>
            <p className="text-xs text-white/80 leading-relaxed">
              Generate a 5-question targeted adaptive quiz on this topic to cement comprehension before exams.
            </p>
            <button
              type="button"
              onClick={() => toast.success('Generated 5-question diagnostic quiz in Exam Prep!')}
              className="w-full py-2.5 rounded-xl bg-white text-brand font-bold text-xs hover:bg-slate-100 transition-all cursor-pointer shadow-sm"
            >
              Start 5-Minute Practice Blitz
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
