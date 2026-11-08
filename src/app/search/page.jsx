'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import FloatingRoleSwitcher from '../../components/FloatingRoleSwitcher';
import { searchAcademicWorkspace, academicHierarchy } from '../../data/academicData';
import {
  Search,
  BookOpen,
  FileText,
  Layers,
  ArrowRight,
  Sparkles,
  User,
  Calendar,
  CheckCircle2,
  Filter,
  X,
  Play,
  Award,
  ChevronRight,
  TrendingUp,
  Tag
} from 'lucide-react';
import toast from 'react-hot-toast';

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get('q') || '';

  const [keyword, setKeyword] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState('ALL'); // 'ALL' | 'courses' | 'resources' | 'topics'

  useEffect(() => {
    if (initialQuery) {
      setKeyword(initialQuery);
    }
  }, [initialQuery]);

  // Execute unified search across courses, resources, and topics
  const searchResults = useMemo(() => {
    return searchAcademicWorkspace(keyword);
  }, [keyword]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!keyword.trim()) {
      toast('Please enter a search keyword', { icon: '🔍' });
      return;
    }
    router.push(`/search?q=${encodeURIComponent(keyword.trim())}`);
  };

  const handleQuickKeyword = (term) => {
    setKeyword(term);
    router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  const { courses, resources, topics, totalMatches } = searchResults;

  return (
    <div className="space-y-8">
      {/* Search Header Banner (NO GRADIENT) */}
      <div className="bg-white border border-slate-200/90 py-8 px-4 sm:px-8 rounded-3xl shadow-xs space-y-6">
        <div className="space-y-2 text-center max-w-3xl mx-auto">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-50 text-brand border border-brand/20 inline-block">
            Universal Academic Search
          </span>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900">
            Search Courses, Resources, and Topics
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Instant search across university curriculum syllabi, lecture slide decks, and exam topics from one search bar.
          </p>
        </div>

        {/* Unified Search Input Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="max-w-3xl mx-auto relative flex items-center border border-slate-300 focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/10 rounded-2xl overflow-hidden bg-slate-50 transition-all"
        >
          <Search className="w-5 h-5 text-slate-400 absolute left-4 select-none" />
          <input
            type="text"
            id="global-search-input"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Type a course code (CS401), topic (Backprop), or resource (Syllabus) and press Enter..."
            className="w-full pl-12 pr-28 py-3.5 text-xs sm:text-sm text-slate-900 bg-transparent placeholder-slate-400 focus:outline-none"
            autoFocus
          />
          {keyword && (
            <button
              type="button"
              onClick={() => {
                setKeyword('');
                router.push('/search');
              }}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 mr-2"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="submit"
            id="global-search-submit-btn"
            className="px-6 py-2.5 mr-2 rounded-xl bg-brand text-white font-bold text-xs hover:bg-brand-hover transition-all cursor-pointer shadow-xs shrink-0"
          >
            Search
          </button>
        </form>

        {/* Quick Search Chips */}
        <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-2 pt-1 text-xs text-slate-600">
          <span className="text-[11px] font-bold text-slate-500 uppercase">Popular:</span>
          {['Machine Learning', 'Syllabus', 'Neural Networks', 'Linear Algebra', 'SVD', 'RAG', 'Consensus'].map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => handleQuickKeyword(chip)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200/80 text-slate-700 text-[11px] font-semibold transition-all cursor-pointer"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Category Tabs: All, Courses, Resources, Topics */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'ALL', label: 'All Results', count: totalMatches },
            { id: 'courses', label: 'Courses', count: courses.length, icon: BookOpen },
            { id: 'resources', label: 'Resources & Slides', count: resources.length, icon: FileText },
            { id: 'topics', label: 'Curriculum Topics', count: topics.length, icon: Layers }
          ].map((cat) => {
            const isSelected = activeCategory === cat.id;
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                id={`search-tab-${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-brand text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                <span>{cat.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="text-xs text-slate-500 font-medium">
          {keyword ? (
            <span>
              Found <strong className="text-slate-900">{totalMatches}</strong> matching items across courses, resources & topics for "<strong className="text-brand">{keyword}</strong>"
            </span>
          ) : (
            <span>Enter a query above to search all academic materials</span>
          )}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 1. COURSES SECTION                                        */}
      {/* ========================================================= */}
      {(activeCategory === 'ALL' || activeCategory === 'courses') && (
        <section className="space-y-4" id="search-section-courses">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-brand" />
              <span>Matching Courses ({courses.length})</span>
            </h2>
          </div>

          {courses.length === 0 ? (
            <p className="text-xs text-slate-400 py-3 italic">No matching courses for this keyword.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courses.map((c) => (
                <div
                  key={c.id}
                  className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md hover:border-brand/40 transition-all flex flex-col justify-between space-y-3 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-brand-50 text-brand border border-brand/20">
                        {c.code}
                      </span>
                      <span className="text-[11px] font-bold text-slate-500">{c.credits} Credits</span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-brand transition-colors">
                      {c.name}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {c.description}
                    </p>

                    <div className="text-[11px] text-slate-500 flex flex-wrap items-center gap-3 pt-1">
                      <span className="flex items-center space-x-1">
                        <User className="w-3 h-3 text-slate-400" />
                        <span>{c.instructor}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{c.semester}</span>
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/courses/${c.id}`}
                    id={`search-open-course-${c.id}`}
                    className="w-full py-2 rounded-xl bg-slate-100 hover:bg-brand hover:text-white text-slate-700 font-bold text-xs flex items-center justify-center space-x-1.5 transition-all"
                  >
                    <span>View Course Workspace</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ========================================================= */}
      {/* 2. RESOURCES & SLIDES SECTION                             */}
      {/* ========================================================= */}
      {(activeCategory === 'ALL' || activeCategory === 'resources') && (
        <section className="space-y-4" id="search-section-resources">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <FileText className="w-4 h-4 text-brand" />
              <span>Matching Resources & Slide Decks ({resources.length})</span>
            </h2>
          </div>

          {resources.length === 0 ? (
            <p className="text-xs text-slate-400 py-3 italic">No matching resources for this keyword.</p>
          ) : (
            <div className="space-y-3">
              {resources.map((res) => (
                <div
                  key={res.id}
                  className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs hover:shadow-md transition-all group"
                >
                  <div className="flex items-start space-x-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand border border-brand/20 flex items-center justify-center shrink-0 mt-0.5">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center space-x-2 flex-wrap">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-brand transition-colors">
                          {res.title}
                        </h4>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-700">
                          {res.courseCode}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {res.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 flex items-center space-x-2 flex-wrap">
                        <span>{res.fileName}</span>
                        <span>•</span>
                        <span>{res.size}</span>
                        <span>•</span>
                        <span>{res.pages} Pages</span>
                        <span>•</span>
                        <span>Author: {res.author}</span>
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/courses/${res.courseId || 'cs401'}?tab=resources`}
                    id={`search-open-resource-${res.id}`}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-brand-50 text-slate-700 hover:text-brand text-xs font-bold transition-all shrink-0"
                  >
                    Open Resource
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ========================================================= */}
      {/* 3. TOPICS & CONCEPTS SECTION                              */}
      {/* ========================================================= */}
      {(activeCategory === 'ALL' || activeCategory === 'topics') && (
        <section className="space-y-4" id="search-section-topics">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <Layers className="w-4 h-4 text-brand" />
              <span>Matching Curriculum Topics & Exam Concepts ({topics.length})</span>
            </h2>
          </div>

          {topics.length === 0 ? (
            <p className="text-xs text-slate-400 py-3 italic">No matching topics for this keyword.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topics.map((top) => (
                <div
                  key={top.id}
                  className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-brand-50 text-brand">
                        {top.category}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-700">
                        Course: {top.courseCode}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-brand transition-colors">
                      {top.title}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {top.summary}
                    </p>

                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500">
                      <span className="font-semibold text-slate-700">Grounding:</span> {top.citation}
                    </div>
                  </div>

                  <Link
                    href="/exams?tab=practice"
                    id={`search-practice-topic-${top.id}`}
                    className="w-full py-2 rounded-xl bg-brand text-white font-bold text-xs flex items-center justify-center space-x-1.5 hover:bg-brand-hover transition-all"
                  >
                    <Play className="w-3 h-3" />
                    <span>Practice Topic in Exam Simulator</span>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Empty State when no results found across all categories */}
      {totalMatches === 0 && keyword && (
        <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-300 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900">
              No matching courses, resources, or topics found
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              We couldn't find anything matching "{keyword}". Try searching for course codes like "CS401", "MATH202", or topics like "Backpropagation", "Syllabus", or "SVD".
            </p>
          </div>
          <button
            onClick={() => handleQuickKeyword('Machine Learning')}
            className="px-4 py-2 rounded-xl bg-brand text-white text-xs font-bold hover:bg-brand-hover transition-all cursor-pointer"
          >
            Show Machine Learning Results
          </button>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-brand selection:text-white">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-8">
        <Suspense fallback={<div className="text-center py-20 text-slate-500">Loading search engine...</div>}>
          <SearchContent />
        </Suspense>
      </main>
      <FloatingRoleSwitcher />
      <Footer />
    </div>
  );
}
