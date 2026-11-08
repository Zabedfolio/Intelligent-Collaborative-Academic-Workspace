'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import {
  Search,
  BookOpen,
  FileText,
  Layers,
  ArrowRight,
  X,
  ExternalLink,
  Command,
  Clock,
  Sparkles
} from 'lucide-react';
import { searchAcademicWorkspace } from '../../data/academicData';

export default function GlobalSearchModal({ isOpen, onClose, initialQuery = '' }) {
  const router = useRouter();
  const inputRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState('ALL'); // 'ALL' | 'courses' | 'resources' | 'topics'

  useEffect(() => {
    setMounted(true);
  }, []);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery(initialQuery);
      setActiveCategory('ALL');
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 50);
    }
  }, [isOpen, initialQuery]);

  // Global Esc key listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Execute unified search in memory across courses, resources, topics
  const results = useMemo(() => {
    return searchAcademicWorkspace(query);
  }, [query]);

  const { courses, resources, topics, totalMatches } = results;

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSelectCourse = (courseId) => {
    onClose();
    router.push(`/courses/${courseId}`);
  };

  const handleSelectResource = (courseId) => {
    onClose();
    router.push(`/courses/${courseId}`);
  };

  const handleSelectTopic = (courseId) => {
    onClose();
    router.push(`/courses/${courseId}`);
  };

  const popularSuggestions = [
    'Machine Learning',
    'Neural Networks',
    'CS401',
    'Distributed Systems',
    'RAG',
    'Consensus',
    'Linear Algebra',
    'Syllabus'
  ];

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/50 backdrop-blur-md transition-all duration-200 animate-in fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col max-h-[80vh] transition-all transform animate-in zoom-in-95 duration-150">
        
        {/* Top Header & Search Input */}
        <div className="p-4 border-b border-slate-200/80 flex items-center space-x-3 bg-slate-50/50">
          <Search className="w-5 h-5 text-slate-400 shrink-0 ml-1" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses, resources, and topics..."
            className="flex-1 bg-transparent text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none font-medium"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <div className="hidden sm:flex items-center space-x-1 px-2 py-1 rounded-md bg-slate-100 text-slate-500 text-[10px] font-semibold border border-slate-200">
            <span>ESC</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Category Pills (when query has matches) */}
        {query.trim() && totalMatches > 0 && (
          <div className="px-4 py-2 border-b border-slate-100 bg-white flex items-center space-x-1.5 overflow-x-auto no-scrollbar text-xs">
            {[
              { id: 'ALL', label: 'All', count: totalMatches },
              { id: 'courses', label: 'Courses', count: courses.length },
              { id: 'resources', label: 'Resources', count: resources.length },
              { id: 'topics', label: 'Topics', count: topics.length }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-brand text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>
        )}

        {/* Scrollable Results Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5 divide-y divide-slate-100">
          
          {/* Empty Query: Quick suggestions */}
          {!query.trim() && (
            <div className="py-2 space-y-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                  Popular Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {popularSuggestions.map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-brand-50 border border-slate-200 hover:border-brand/30 text-xs font-semibold text-slate-700 hover:text-brand transition-colors cursor-pointer"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 text-xs text-slate-500 leading-relaxed">
                <span className="font-semibold text-slate-700">Instant Search:</span> Type any course code (e.g. <span className="font-mono text-brand font-bold">CS401</span>), topic (<span className="font-mono text-brand font-bold">Backpropagation</span>), or resource material to jump directly without leaving this page.
              </div>
            </div>
          )}

          {/* No results state */}
          {query.trim() && totalMatches === 0 && (
            <div className="py-12 text-center space-y-2">
              <p className="text-sm font-semibold text-slate-800">
                No matches found for &quot;{query}&quot;
              </p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try searching for course codes like <span className="font-bold text-brand">CS401</span>, <span className="font-bold text-brand">CS402</span>, or topics like <span className="font-bold text-brand">Neural Networks</span>.
              </p>
            </div>
          )}

          {/* 1. COURSES SECTION */}
          {query.trim() && (activeCategory === 'ALL' || activeCategory === 'courses') && courses.length > 0 && (
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-brand" />
                  <span>Courses ({courses.length})</span>
                </span>
              </div>
              <div className="space-y-1.5">
                {courses.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => handleSelectCourse(c.id)}
                    className="p-3 rounded-xl border border-slate-200/70 hover:border-brand/40 bg-white hover:bg-brand-50/40 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-50 text-brand border border-brand/20">
                          {c.code}
                        </span>
                        <span className="text-sm font-bold text-slate-900 group-hover:text-brand transition-colors">
                          {c.name}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        {c.department} • {c.instructor} • {c.credits} Credits
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand transition-colors shrink-0 ml-3" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. RESOURCES SECTION */}
          {query.trim() && (activeCategory === 'ALL' || activeCategory === 'resources') && resources.length > 0 && (
            <div className="space-y-2.5 pt-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                  <FileText className="w-3.5 h-3.5 text-brand" />
                  <span>Resources & Slides ({resources.length})</span>
                </span>
              </div>
              <div className="space-y-1.5">
                {resources.map((r) => (
                  <div
                    key={r.id}
                    onClick={() => handleSelectResource(r.courseId)}
                    className="p-3 rounded-xl border border-slate-200/70 hover:border-brand/40 bg-white hover:bg-brand-50/40 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                          {r.type}
                        </span>
                        <span className="text-sm font-bold text-slate-900 group-hover:text-brand transition-colors">
                          {r.title}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        {r.courseCode}: {r.courseName} • {r.author}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand transition-colors shrink-0 ml-3" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. TOPICS SECTION */}
          {query.trim() && (activeCategory === 'ALL' || activeCategory === 'topics') && topics.length > 0 && (
            <div className="space-y-2.5 pt-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                  <Layers className="w-3.5 h-3.5 text-brand" />
                  <span>Curriculum Topics ({topics.length})</span>
                </span>
              </div>
              <div className="space-y-1.5">
                {topics.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => handleSelectTopic(t.courseId)}
                    className="p-3 rounded-xl border border-slate-200/70 hover:border-brand/40 bg-white hover:bg-brand-50/40 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {t.category}
                        </span>
                        <span className="text-sm font-bold text-slate-900 group-hover:text-brand transition-colors">
                          {t.title}
                        </span>
                        <span className="text-[10px] text-slate-500 font-semibold">({t.courseCode})</span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1">
                        {t.summary}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand transition-colors shrink-0 ml-3" />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center space-x-3">
            <span>Press <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded font-mono text-[10px]">ESC</kbd> to close</span>
            <span>Click any result to view workspace</span>
          </div>
          <div className="font-semibold text-brand">
            ICAW Unified Search
          </div>
        </div>

      </div>
    </div>,
    document.body
  );
}
