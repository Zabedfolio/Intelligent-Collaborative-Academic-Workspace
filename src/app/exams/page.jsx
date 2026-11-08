'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import FloatingRoleSwitcher from '../../components/FloatingRoleSwitcher';
import Pagination from '../../components/common/Pagination';
import { sample100Questions } from '../../data/examQuestions';
import { 
  GraduationCap, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  Layers, 
  BarChart3, 
  Clock, 
  ChevronRight, 
  ChevronLeft,
  Search, 
  Filter, 
  BookOpen, 
  Award, 
  AlertCircle,
  Play, 
  RotateCcw,
  Check,
  X,
  ArrowRight,
  TrendingUp,
  BrainCircuit,
  SlidersHorizontal,
  Bookmark
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function ExamPage() {
  // Tabs: 'overview' | 'practice' | 'bank' | 'analytics' | 'history'
  const [activeTab, setActiveTab] = useState('overview');

  // Course selector
  const [selectedCourse, setSelectedCourse] = useState('CS401');

  // ==========================================
  // PRACTICE TAB STATE (Interactive Simulator)
  // ==========================================
  const [currentPracticeIndex, setCurrentPracticeIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasSubmittedAnswer, setHasSubmittedAnswer] = useState(false);
  const [practiceScore, setPracticeScore] = useState({ correct: 0, total: 0 });
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState(new Set());

  // Set of 10 practice questions for active session
  const practiceQuestions = useMemo(() => {
    return sample100Questions.slice(0, 10);
  }, []);

  const activeQuestion = practiceQuestions[currentPracticeIndex];

  const handleSelectOption = (optId) => {
    if (hasSubmittedAnswer) return;
    setSelectedOption(optId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption) {
      toast.error('Please choose an answer option first.');
      return;
    }
    setHasSubmittedAnswer(true);
    const chosen = activeQuestion.options.find((o) => o.id === selectedOption);
    if (chosen?.isCorrect) {
      setPracticeScore((prev) => ({ correct: prev.correct + 1, total: prev.total + 1 }));
      toast.success('Correct! Verified with syllabus citations.');
    } else {
      setPracticeScore((prev) => ({ ...prev, total: prev.total + 1 }));
      toast.error('Incorrect. Review syllabus citation below.');
    }
  };

  const handleNextPracticeQuestion = () => {
    if (currentPracticeIndex < practiceQuestions.length - 1) {
      setCurrentPracticeIndex((prev) => prev + 1);
      setSelectedOption(null);
      setHasSubmittedAnswer(false);
    } else {
      toast.success('Practice Blitz Complete! Excellent work.');
    }
  };

  const handlePrevPracticeQuestion = () => {
    if (currentPracticeIndex > 0) {
      setCurrentPracticeIndex((prev) => prev - 1);
      setSelectedOption(null);
      setHasSubmittedAnswer(false);
    }
  };

  const toggleBookmark = (id) => {
    setBookmarkedQuestions((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        toast('Question removed from bookmarks', { icon: '🔖' });
      } else {
        next.add(id);
        toast.success('Question bookmarked for final exam review');
      }
      return next;
    });
  };

  // ==========================================
  // QUESTION BANK TAB STATE (100 Items + Pagination)
  // ==========================================
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('ALL');
  const [selectedTopic, setSelectedTopic] = useState('ALL');
  
  // Pagination state: supports 10 or 20 items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Filter 100 questions based on search & filters
  const filteredQuestions = useMemo(() => {
    return sample100Questions.filter((q) => {
      const matchesSearch = 
        q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.questionText.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.questionNumber.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDifficulty = 
        selectedDifficulty === 'ALL' || q.difficulty === selectedDifficulty;

      const matchesTopic = 
        selectedTopic === 'ALL' || q.topic === selectedTopic;

      return matchesSearch && matchesDifficulty && matchesTopic;
    });
  }, [searchQuery, selectedDifficulty, selectedTopic]);

  // Sliced items for the current page without full page reload
  const paginatedQuestions = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredQuestions.slice(startIndex, startIndex + pageSize);
  }, [filteredQuestions, currentPage, pageSize]);

  // Handle switching to practice tab with a specific question loaded
  const handlePracticeSpecificQuestion = (question) => {
    const targetIdx = practiceQuestions.findIndex((q) => q.id === question.id);
    if (targetIdx !== -1) {
      setCurrentPracticeIndex(targetIdx);
    } else {
      // Load onto slot 0
      practiceQuestions[0] = question;
      setCurrentPracticeIndex(0);
    }
    setSelectedOption(null);
    setHasSubmittedAnswer(false);
    setActiveTab('practice');
    toast.success(`Loaded ${question.questionNumber} into Practice mode!`);
  };

  // List of all unique topics for filter
  const allTopics = useMemo(() => {
    return Array.from(new Set(sample100Questions.map((q) => q.topic)));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-brand selection:text-white">
      {/* Universal Responsive Navbar */}
      <Navbar />

      {/* Clean Modern Exam Header (NO GRADIENT) */}
      <div className="bg-white border-b border-slate-200/80 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-50 text-brand border border-brand/20">
                Course: {selectedCourse}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                Syllabus Verified
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900">
              Adaptive Exam Preparation & Question Bank
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Curriculum-bounded diagnostic tests, spaced repetition flashcards, and a 100-question master bank referencing verified lecture slides.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center space-x-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 shrink-0">
            <div className="text-center px-2">
              <span className="block text-2xl font-black text-brand">78%</span>
              <span className="text-[10px] font-bold uppercase text-slate-500">Exam Readiness</span>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div className="text-center px-2">
              <span className="block text-2xl font-black text-slate-900">100</span>
              <span className="text-[10px] font-bold uppercase text-slate-500">Bank Questions</span>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div className="text-center px-2">
              <span className="block text-2xl font-black text-amber-600">12d</span>
              <span className="text-[10px] font-bold uppercase text-slate-500">Until Midterm</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 pt-8 pb-16 space-y-6">
        
        {/* ========================================================= */}
        {/* TABS NAVIGATION BAR (Switch views without page reload)    */}
        {/* ========================================================= */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md p-1.5 flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
          {[
            { id: 'overview', label: 'Exam Overview', icon: BookOpen },
            { id: 'practice', label: 'Practice', icon: Play, badge: 'Interactive' },
            { id: 'bank', label: 'Question Bank (100)', icon: Layers, badge: 'Paginated' },
            { id: 'analytics', label: 'Diagnostic Analytics', icon: BarChart3 },
            { id: 'history', label: 'Attempt History', icon: Clock }
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`exam-tab-${tab.id}`}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (tab.id === 'bank') setCurrentPage(1);
                }}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-brand text-white shadow-xs scale-[1.01]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* TAB 1: OVERVIEW & READINESS                               */}
        {/* ========================================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Next Midterm Countdown */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-amber-50 text-amber-800 border border-amber-200">
                    Target Exam
                  </span>
                  <Clock className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">CS401 Midterm 2</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Chapters 4 to 8 • Neural Networks & Backprop</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-600">Curriculum Mastery</span>
                    <span className="font-bold text-slate-900">78%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-brand h-full rounded-full w-[78%]" />
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('practice')}
                  id="start-practice-cta"
                  className="w-full py-2.5 rounded-xl bg-brand text-white font-bold text-xs hover:bg-brand-hover shadow-xs flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Switch to Practice Tab</span>
                </button>
              </div>

              {/* Card 2: Weak Concepts Detected */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-rose-50 text-rose-800 border border-rose-200">
                    High-Priority Gap
                  </span>
                  <AlertCircle className="w-4 h-4 text-rose-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Eigenvalues & SVD</h3>
                  <p className="text-xs text-slate-500 mt-0.5">32% accuracy across recent mock quizzes</p>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Your professor's slides emphasize Lemma 4.2 for low-rank approximations. Solve 5 focused questions to close this gap.
                </p>
                <button
                  onClick={() => {
                    setSelectedTopic('Linear Algebra & SVD');
                    setActiveTab('bank');
                    setCurrentPage(1);
                  }}
                  className="w-full py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <span>Browse 10 SVD Questions</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Card 3: 100-Question Bank Summary */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-50 text-emerald-800 border border-emerald-200">
                    Master Question Bank
                  </span>
                  <Layers className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">100 Verified Questions</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Paginated in batches of 10 or 20 items</p>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Browse by difficulty, test your intuition, and verify solutions against slide deck citations without leaving this page.
                </p>
                <button
                  onClick={() => {
                    setActiveTab('bank');
                    setCurrentPage(1);
                  }}
                  className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 shadow-xs flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <span>Open Question Bank (100 Items)</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Quick Practice Topics Grid */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Curriculum Topic Readiness Breakdown</h3>
                  <p className="text-xs text-slate-500">Click any topic to practice targeted diagnostic questions</p>
                </div>
                <span className="text-xs font-bold text-brand">{allTopics.length} Key Domains</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {allTopics.map((top, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedTopic(top);
                      setActiveTab('bank');
                      setCurrentPage(1);
                    }}
                    className="p-3.5 rounded-2xl border border-slate-200 text-left hover:border-brand hover:bg-brand-50/40 transition-all cursor-pointer group flex items-center justify-between"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 group-hover:text-brand transition-colors">
                        {top}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">10 Questions available</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-brand group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: PRACTICE (Interactive Exam Simulator)              */}
        {/* Seamlessly switchable without full page reload            */}
        {/* ========================================================= */}
        {activeTab === 'practice' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-8 transition-all">
            {/* Practice Header & Stepper */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-brand text-white">
                    Live Practice Simulator
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-700">
                    {activeQuestion.topic}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    activeQuestion.difficulty === 'Easy' 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : activeQuestion.difficulty === 'Medium'
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}>
                    {activeQuestion.difficulty}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-slate-900">
                  Question {currentPracticeIndex + 1} of {practiceQuestions.length} ({activeQuestion.questionNumber})
                </h2>
              </div>

              {/* Controls & Bookmarking */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleBookmark(activeQuestion.id)}
                  className={`p-2 rounded-xl border text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                    bookmarkedQuestions.has(activeQuestion.id)
                      ? 'bg-amber-50 border-amber-300 text-amber-700'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                  title="Bookmark for review"
                >
                  <Bookmark className={`w-4 h-4 ${bookmarkedQuestions.has(activeQuestion.id) ? 'fill-amber-500 text-amber-500' : ''}`} />
                  <span className="hidden sm:inline">
                    {bookmarkedQuestions.has(activeQuestion.id) ? 'Bookmarked' : 'Bookmark'}
                  </span>
                </button>

                <div className="px-3 py-1.5 rounded-xl bg-slate-100 text-xs font-bold text-slate-700">
                  Score: {practiceScore.correct} / {practiceScore.total}
                </div>
              </div>
            </div>

            {/* Question Text Box */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3">
              <span className="text-[11px] font-bold text-brand uppercase tracking-wider block">
                Problem Statement
              </span>
              <p className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
                {activeQuestion.questionText}
              </p>
            </div>

            {/* Multiple Choice Options */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Select the correct answer:
              </span>
              {activeQuestion.options.map((opt, idx) => {
                const optLetter = String.fromCharCode(65 + idx);
                const isChosen = selectedOption === opt.id;
                
                let optionStyle = 'bg-white border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-50/80';
                if (hasSubmittedAnswer) {
                  if (opt.isCorrect) {
                    optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-1 ring-emerald-500';
                  } else if (isChosen && !opt.isCorrect) {
                    optionStyle = 'bg-rose-50 border-rose-500 text-rose-950 ring-1 ring-rose-500';
                  }
                } else if (isChosen) {
                  optionStyle = 'bg-brand-50 border-brand text-brand font-bold ring-1 ring-brand/50';
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-start space-x-3.5 ${optionStyle}`}
                  >
                    <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                      isChosen ? 'bg-brand text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {optLetter}
                    </span>
                    <span className="text-xs sm:text-sm font-medium leading-relaxed pt-0.5">
                      {opt.text}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Answer Explanation & RAG Citation (Revealed on Submit) */}
            {hasSubmittedAnswer && (
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3 animate-fadeIn">
                <div className="flex items-center space-x-2 text-emerald-800 font-bold text-xs uppercase">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Verified Solution & Syllabus Grounding</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                  {activeQuestion.solution}
                </p>
                <div className="p-3 bg-white rounded-xl border border-emerald-200 text-xs text-slate-600 flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-brand shrink-0" />
                  <span className="font-semibold text-slate-800">Source:</span>
                  <span>{activeQuestion.citation}</span>
                </div>
              </div>
            )}

            {/* Footer Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-200/80">
              <button
                onClick={handlePrevPracticeQuestion}
                disabled={currentPracticeIndex === 0}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer inline-flex items-center space-x-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Question</span>
              </button>

              <div className="flex items-center space-x-3">
                {!hasSubmittedAnswer ? (
                  <button
                    onClick={handleSubmitAnswer}
                    id="submit-practice-answer-btn"
                    className="px-6 py-2.5 rounded-xl bg-brand text-white text-xs font-bold hover:bg-brand-hover shadow-xs transition-all cursor-pointer"
                  >
                    Check Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextPracticeQuestion}
                    id="next-practice-question-btn"
                    className="px-6 py-2.5 rounded-xl bg-brand text-white text-xs font-bold hover:bg-brand-hover shadow-xs transition-all cursor-pointer inline-flex items-center space-x-1.5"
                  >
                    <span>{currentPracticeIndex === practiceQuestions.length - 1 ? 'Finish Blitz' : 'Next Question'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: QUESTION BANK (100 Items with Pagination)          */}
        {/* Splits 100 items into pages of 10 or 20 without reload     */}
        {/* ========================================================= */}
        {activeTab === 'bank' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
            {/* Header and Filter Controls */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                  <Layers className="w-5 h-5 text-brand" />
                  <span>Master Question Bank (100 Verified Questions)</span>
                </h2>
                <p className="text-xs text-slate-500">
                  Splits the 100-item bank into pages of 10 or 20 questions so you can browse without long load times.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full lg:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search 100 questions..."
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand bg-slate-50 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-slate-700 flex items-center space-x-1">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  <span>Difficulty:</span>
                </span>
                {['ALL', 'Easy', 'Medium', 'Hard', 'Exam Standard'].map((diff) => (
                  <button
                    key={diff}
                    onClick={() => {
                      setSelectedDifficulty(diff);
                      setCurrentPage(1);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedDifficulty === diff
                        ? 'bg-brand text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-2">
                <span className="font-bold text-slate-700">Topic:</span>
                <select
                  value={selectedTopic}
                  onChange={(e) => {
                    setSelectedTopic(e.target.value);
                    setCurrentPage(1);
                  }}
                  aria-label="Filter questions by topic"
                  className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:border-brand focus:outline-none focus:ring-1 focus:ring-brand cursor-pointer max-w-[200px] truncate"
                >
                  <option value="ALL">All Topics (100 Questions)</option>
                  {allTopics.map((top) => (
                    <option key={top} value={top}>
                      {top}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Questions List (Showing sliced items for active page) */}
            <div className="space-y-3">
              {paginatedQuestions.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                  <p className="text-xs font-bold text-slate-500">No questions match your search or filter.</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedDifficulty('ALL');
                      setSelectedTopic('ALL');
                      setCurrentPage(1);
                    }}
                    className="mt-2 text-xs text-brand font-bold hover:underline"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                paginatedQuestions.map((q) => (
                  <div
                    key={q.id}
                    className="bg-slate-50/70 hover:bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:shadow-xs group"
                  >
                    <div className="space-y-1.5 min-w-0 flex-1">
                      <div className="flex items-center space-x-2 flex-wrap">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-200 text-slate-800">
                          {q.questionNumber}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-brand-50 text-brand border border-brand/20">
                          {q.topic}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          q.difficulty === 'Easy'
                            ? 'bg-emerald-50 text-emerald-700'
                            : q.difficulty === 'Medium'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-rose-50 text-rose-700'
                        }`}>
                          {q.difficulty}
                        </span>
                        <span className="text-xs text-slate-400">
                          Est: {q.estimatedTime}
                        </span>
                      </div>

                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-brand transition-colors line-clamp-2">
                        {q.questionText}
                      </h4>

                      <p className="text-xs text-slate-500 flex items-center space-x-2">
                        <BookOpen className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{q.citation}</span>
                      </p>
                    </div>

                    {/* Solve / Practice Button */}
                    <div className="shrink-0 flex items-center space-x-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200">
                      <button
                        onClick={() => handlePracticeSpecificQuestion(q)}
                        id={`practice-btn-${q.id}`}
                        className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-brand text-white hover:bg-brand-hover text-xs font-bold transition-all shadow-2xs cursor-pointer"
                        title="Load this question directly into Practice mode"
                      >
                        <Play className="w-3 h-3" />
                        <span>Practice Now</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* ========================================================= */}
            {/* REUSABLE PAGINATION COMPONENT                             */}
            {/* Split 100 items into 10 or 20 per page without reload     */}
            {/* ========================================================= */}
            <Pagination
              currentPage={currentPage}
              totalItems={filteredQuestions.length}
              pageSize={pageSize}
              onPageChange={(newPage) => {
                setCurrentPage(newPage);
                // Smoothly focus top of list
                window.scrollTo({ top: 380, behavior: 'smooth' });
              }}
              onPageSizeChange={(newSize) => {
                setPageSize(newSize);
                setCurrentPage(1);
              }}
              pageSizeOptions={[10, 20, 50]}
              itemName="exam questions"
            />
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: DIAGNOSTIC ANALYTICS                               */}
        {/* ========================================================= */}
        {activeTab === 'analytics' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-slate-900">Bayesian Knowledge Tracing & Concept Accuracy</h2>
              <p className="text-xs text-slate-500">
                Visualizing student diagnostic confidence across CS401 lecture chapters.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { domain: 'Convolutional Filters & Pooling', score: 94, status: 'Mastered', color: 'bg-emerald-500' },
                { domain: 'Stochastic Gradient Descent & Momentum', score: 86, status: 'Strong', color: 'bg-emerald-500' },
                { domain: 'Multi-Head Attention & Positional Encoding', score: 54, status: 'Review Needed', color: 'bg-amber-500' },
                { domain: 'Eigenvalues & SVD Decomposition', score: 32, status: 'Critical Gap', color: 'bg-rose-500' }
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-800">{item.domain}</span>
                    <span className="text-slate-900">{item.score}% ({item.status})</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div className={`${item.color} h-full rounded-full`} style={{ width: `${item.score}%` }} />
                  </div>
                  <button
                    onClick={() => {
                      setSelectedTopic(item.domain.split(' ')[0]);
                      setActiveTab('bank');
                      setCurrentPage(1);
                    }}
                    className="text-[11px] text-brand font-bold hover:underline inline-flex items-center space-x-1 pt-1"
                  >
                    <span>Target 10 questions in this topic</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: ATTEMPT HISTORY                                    */}
        {/* ========================================================= */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-slate-900">Past Exam Diagnostic Attempts</h2>
              <p className="text-xs text-slate-500">Review mistakes, time per question, and retry previous tests.</p>
            </div>

            <div className="space-y-3">
              {[
                { title: 'Diagnostic Blitz #4 - Optimization & Loss', date: 'Today at 02:15 PM', score: '9 / 10 (90%)', time: '12m 45s' },
                { title: 'Diagnostic Blitz #3 - Linear Algebra & SVD', date: 'Yesterday at 04:30 PM', score: '6 / 10 (60%)', time: '14m 10s' },
                { title: 'Full Practice Mock #1 - Neural Foundations', date: '3 days ago', score: '18 / 20 (90%)', time: '28m 20s' }
              ].map((h, idx) => (
                <div key={idx} className="p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">{h.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{h.date} • Time spent: {h.time}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="px-3 py-1 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {h.score}
                    </span>
                    <button
                      onClick={() => setActiveTab('practice')}
                      className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-white cursor-pointer"
                    >
                      Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Floating Role Switcher */}
      <FloatingRoleSwitcher />

      {/* Footer */}
      <Footer />
    </div>
  );
}
