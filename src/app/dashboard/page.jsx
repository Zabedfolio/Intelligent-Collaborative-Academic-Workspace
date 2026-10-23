'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Sidebar from '../../components/dashboard/Sidebar';
import Footer from '../../components/common/Footer';
import FloatingRoleSwitcher from '../../components/FloatingRoleSwitcher';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import FileUploadDropzone from '../../components/common/FileUploadDropzone';
import EmptyState from '../../components/common/EmptyState';
import { ListSkeleton, CardSkeleton, Spinner } from '../../components/common/SkeletonLoader';
import { useAuthStore } from '../../store/useAuthStore';
import { 
  LogIn, 
  Sparkles, 
  FileText, 
  Trash2, 
  Eye, 
  RefreshCw, 
  BookOpen, 
  CheckCircle2, 
  UploadCloud,
  FileCheck,
  Calendar,
  Layers,
  ArrowRight,
  FolderOpen,
  GraduationCap
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function DashboardPage() {
  const { user, activeTab, initAuth } = useAuthStore();

  // Resource items state
  const [resources, setResources] = useState([
    {
      id: 'res-1',
      title: 'CS401 Syllabus - Advanced Machine Learning & Neural Networks',
      fileName: 'CS401_Syllabus_Fall2026.pdf',
      size: '1.8 MB',
      type: 'PDF',
      uploadedAt: 'Today at 09:30 AM',
      status: 'Indexed in RAG',
      course: 'CS401',
      author: 'Prof. Anderson',
      pages: 14,
      excerpt: 'Course objectives, week-by-week topic schedule, grading breakdown (30% exams, 40% assignments, 30% project), and recommended reading.'
    },
    {
      id: 'res-2',
      title: 'Lecture 04 Slides - RAG Architecture & Vector Indexing',
      fileName: 'Lecture_04_RAG_Embeddings.pdf',
      size: '4.2 MB',
      type: 'PDF',
      uploadedAt: 'Yesterday',
      status: 'Indexed in RAG',
      course: 'CS401',
      author: 'Prof. Anderson',
      pages: 38,
      excerpt: 'Dense retrieval models, cosine similarity metric comparisons, hybrid BM25 + dense retrieval ranking pipelines, and hallucination reduction strategies.'
    },
    {
      id: 'res-3',
      title: 'Midterm Diagnostic Exam Bank & Answer Keys',
      fileName: 'Diagnostic_Exam_Bank_2026.pdf',
      size: '920 KB',
      type: 'PDF',
      uploadedAt: '2 days ago',
      status: 'Indexed in RAG',
      course: 'CS401',
      author: 'Teaching Assistant Team',
      pages: 8,
      excerpt: 'Selected multiple-choice diagnostic questions, code completion challenges for transformer attention heads, and sample essay rubrics.'
    }
  ]);

  // Loading state for fetching simulation
  const [isFetching, setIsFetching] = useState(false);

  // Modal: View Resource state
  const [viewingResource, setViewingResource] = useState(null);

  // ConfirmDialog: Delete Resource state
  const [deletingResource, setDeletingResource] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  // Simulate pending data fetch
  const handleRefreshData = () => {
    setIsFetching(true);
    setTimeout(() => {
      setIsFetching(false);
      toast.success('Course resources refreshed.');
    }, 1200);
  };

  // Enrolled courses list
  const courses = [
    { id: 'cs401', code: 'CS401', name: 'Machine Learning' },
    { id: 'math202', code: 'MATH202', name: 'Linear Algebra' },
    { id: 'phys101', code: 'PHYS101', name: 'Quantum Mechanics' }
  ];
  const [selectedCourse, setSelectedCourse] = useState('cs401');

  // Filtered resources based on selected course
  const displayedResources = resources.filter(
    (r) => r.course?.toLowerCase() === selectedCourse.toLowerCase()
  );

  // Smoothly scroll and activate dropzone when clicking "Upload" CTA
  const handleTriggerUpload = () => {
    const dropzone = document.getElementById('file-dropzone');
    if (dropzone) {
      dropzone.scrollIntoView({ behavior: 'smooth', block: 'center' });
      dropzone.click();
    }
  };

  // Handle new file upload from dropzone
  const handleUploadComplete = (newFile) => {
    const targetCourse = selectedCourse.toUpperCase();
    setResources((prev) => [
      {
        ...newFile,
        course: targetCourse,
        author: user?.name || 'Verified Instructor',
        pages: Math.floor(Math.random() * 20) + 5,
        excerpt: `Uploaded material for ${targetCourse} indexed and vectorized for syllabus-anchored AI tutoring.`
      },
      ...prev
    ]);
  };

  // Handle destructive delete confirmation
  const handleConfirmDelete = () => {
    if (!deletingResource) return;
    setIsDeleting(true);

    setTimeout(() => {
      setResources((prev) => prev.filter((r) => r.id !== deletingResource.id));
      toast.success(`"${deletingResource.title}" deleted.`);
      setIsDeleting(false);
      setDeletingResource(null);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans relative selection:bg-brand selection:text-white">
      {/* Dynamic Collapsible Sidebar */}
      <Sidebar />

      {/* Main Dashboard Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="h-16 px-6 bg-white border-b border-slate-200/80 flex items-center justify-between shadow-xs sticky top-0 z-20">
          <div>
            <h1 className="text-base font-bold text-slate-900 capitalize">
              {user ? `${user.role} Dashboard` : 'Academic Dashboard'}
            </h1>
            <p className="text-xs text-slate-500">
              Active Module: <span className="font-semibold text-brand uppercase">{activeTab}</span>
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleRefreshData}
              disabled={isFetching}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 hover:text-brand transition-all cursor-pointer disabled:opacity-50"
              title="Test pending data fetch loading skeletons"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? 'animate-spin text-brand' : ''}`} />
              <span>{isFetching ? 'Fetching...' : 'Simulate Fetch'}</span>
            </button>

            {user ? (
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  user.role === 'student'
                    ? 'bg-emerald-100 text-emerald-800'
                    : user.role === 'teacher'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                {user.role} Access
              </span>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-brand text-white hover:bg-brand-hover shadow-xs transition-all"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Log In</span>
              </Link>
            )}
          </div>
        </header>

        {/* Dashboard Body Content */}
        <main className="flex-1 p-6 sm:p-8 space-y-8 max-w-6xl mx-auto w-full">
          
          {/* Welcome Banner */}
          <div className="bg-brand text-white rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-emerald-200 border border-white/15">
                {user?.role || 'Guest'} Workspace
              </span>
              <h2 className="text-xl sm:text-2xl font-bold">
                Welcome back{user?.name ? `, ${user.name}` : ''}!
              </h2>
              <p className="text-xs sm:text-sm text-white/80 max-w-xl">
                Upload course syllabi, lecture slides, or exam banks. Materials are vectorized to power the hallucination-free RAG AI tutor.
              </p>
            </div>
            <div className="shrink-0 flex items-center space-x-2 bg-white/10 px-4 py-2.5 rounded-2xl border border-white/15 text-xs font-medium">
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>RAG Engine Online</span>
            </div>
          </div>

          {/* 1. Drag-and-Drop / Click File Upload Section */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                  <UploadCloud className="w-5 h-5 text-brand" />
                  <span>Upload Course Material</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Drag and drop PDFs or click to upload. An animated progress bar tracks upload & vectorization.
                </p>
              </div>
            </div>

            <FileUploadDropzone onUploadComplete={handleUploadComplete} />
          </section>

          {/* 2. Course Materials & Active Resources List */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-brand" />
                  <span>Course Materials & Syllabus Grounding</span>
                </h3>
                <p className="text-xs text-slate-500">
                  {resources.length} documents currently indexed for this semester.
                </p>
              </div>

              <span className="text-xs text-slate-500 font-medium">
                {isFetching ? 'Refreshing data...' : 'Showing verified documents'}
              </span>
            </div>

            {/* Course Selector Tabs */}
            <div className="flex items-center space-x-2 border-b border-slate-200/80 pb-3 overflow-x-auto">
              {courses.map((course) => {
                const count = resources.filter(
                  (r) => r.course?.toLowerCase() === course.id.toLowerCase()
                ).length;
                const isSelected = selectedCourse === course.id;
                return (
                  <button
                    key={course.id}
                    id={`course-tab-${course.id}`}
                    onClick={() => setSelectedCourse(course.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-brand text-white shadow-xs'
                        : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80'
                    }`}
                  >
                    <span>{course.code} - {course.name}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Content Display: Skeletons vs EmptyState vs Data */}
            {isFetching ? (
              <ListSkeleton count={3} />
            ) : displayedResources.length === 0 ? (
              <EmptyState
                icon={FolderOpen}
                title="No resources yet"
                description={`There are no materials uploaded for ${
                  courses.find((c) => c.id === selectedCourse)?.code || 'this course'
                } yet. Upload your syllabus or lecture slides to enable syllabus-anchored AI tutoring.`}
                actionLabel="Upload"
                onAction={handleTriggerUpload}
                actionIcon={UploadCloud}
              />
            ) : (
              <div className="space-y-3">
                {displayedResources.map((res) => (
                  <div
                    key={res.id}
                    className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs hover:shadow-md transition-all"
                  >
                    <div className="flex items-start space-x-3.5 min-w-0">
                      <div className="w-11 h-11 rounded-xl bg-brand-50 text-brand border border-brand/20 flex items-center justify-center shrink-0 mt-0.5">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center space-x-2 flex-wrap">
                          <h4 className="text-sm font-bold text-slate-900 truncate">
                            {res.title}
                          </h4>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-700 border border-slate-200">
                            {res.type}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-50 text-emerald-800 border border-emerald-200/60">
                            {res.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 flex items-center space-x-3">
                          <span>{res.fileName}</span>
                          <span>•</span>
                          <span>{res.size}</span>
                          <span>•</span>
                          <span>Uploaded {res.uploadedAt}</span>
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons: View in Modal & Confirm Delete */}
                    <div className="flex items-center space-x-2 shrink-0 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                      <button
                        onClick={() => setViewingResource(res)}
                        id={`view-btn-${res.id}`}
                        className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-brand-50 text-slate-700 hover:text-brand text-xs font-semibold transition-all cursor-pointer"
                        title="View resource in modal without losing place on page"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Resource</span>
                      </button>

                      <button
                        onClick={() => setDeletingResource(res)}
                        id={`delete-btn-${res.id}`}
                        className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-white hover:bg-rose-50 text-slate-500 hover:text-rose-600 border border-slate-200 hover:border-rose-200 text-xs font-semibold transition-all cursor-pointer"
                        title="Delete resource with confirmation dialog"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete Resource</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

        </main>

        {/* Compact Footer */}
        <Footer variant="compact" />
      </div>

      {/* Floating Role Switcher */}
      <FloatingRoleSwitcher />

      {/* ================================================================= */}
      {/* 3. KEY ACTION MODAL: View Resource                                */}
      {/* Keeps background page visible but inactive behind backdrop blur   */}
      {/* ================================================================= */}
      <Modal
        isOpen={!!viewingResource}
        onClose={() => setViewingResource(null)}
        title={viewingResource?.title || 'Resource Details'}
        subtitle={`Course Document: ${viewingResource?.fileName || ''}`}
        maxWidth="max-w-2xl"
        footer={
          <button
            onClick={() => setViewingResource(null)}
            className="px-5 py-2.5 rounded-xl bg-brand text-white text-xs font-bold hover:bg-brand-hover transition-all cursor-pointer"
          >
            Done Reading
          </button>
        }
      >
        {viewingResource && (
          <div className="space-y-6 text-sm text-slate-700">
            {/* Metadata Summary Pill Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">File Type</span>
                <span className="font-bold text-slate-900">{viewingResource.type}</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">File Size</span>
                <span className="font-bold text-slate-900">{viewingResource.size}</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Page Count</span>
                <span className="font-bold text-slate-900">{viewingResource.pages || 12} Pages</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">RAG Status</span>
                <span className="font-bold text-emerald-700 flex items-center space-x-1 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Indexed</span>
                </span>
              </div>
            </div>

            {/* Document Content Preview */}
            <div className="space-y-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Executive Syllabus & Content Summary
              </h5>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs leading-relaxed text-slate-600">
                {viewingResource.excerpt}
              </div>
            </div>

            {/* AI Tutor Integration Notice */}
            <div className="p-4 rounded-2xl bg-brand-50 border border-brand/20 flex items-start space-x-3 text-xs text-brand">
              <Sparkles className="w-5 h-5 shrink-0 mt-0.5 text-brand" />
              <div>
                <p className="font-bold">Verified AI Grounding Ground Truth</p>
                <p className="text-slate-600 mt-0.5">
                  When students ask the RAG AI tutor questions related to {viewingResource.course}, citations and answers will be strictly referenced against this document.
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* ================================================================= */}
      {/* 4. DESTRUCTIVE ACTION CONFIRMATION DIALOG: Delete Resource        */}
      {/* Action only proceeds if the user clicks "Confirm"                 */}
      {/* ================================================================= */}
      <ConfirmDialog
        isOpen={!!deletingResource}
        onClose={() => setDeletingResource(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Course Resource"
        description="Are you sure you want to delete this resource? It will be permanently de-indexed from the AI tutor vector database and course materials list."
        resourceName={deletingResource?.title}
        confirmText="Confirm Delete"
        cancelText="Keep Resource"
        isProcessing={isDeleting}
        variant="danger"
      />
    </div>
  );
}
