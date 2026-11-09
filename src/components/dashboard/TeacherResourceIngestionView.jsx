'use client';

import { useState } from 'react';
import {
  FileUp,
  UploadCloud,
  FileCheck2,
  Trash2,
  Eye,
  RefreshCw,
  BookOpen,
  CheckCircle2,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import toast from 'react-hot-toast';
import FileUploadDropzone from '../common/FileUploadDropzone';
import Modal from '../common/Modal';
import ConfirmDialog from '../common/ConfirmDialog';

export default function TeacherResourceIngestionView({ user }) {
  const [selectedCourse, setSelectedCourse] = useState('cs401');
  const [isProcessing, setIsProcessing] = useState(false);
  const [viewingResource, setViewingResource] = useState(null);
  const [deletingResource, setDeletingResource] = useState(null);

  const [resources, setResources] = useState([
    {
      id: 'res-t1',
      title: 'CS401 Lecture 07: Batch Normalization & Adaptive Optimizers',
      fileName: 'CS401_Lecture_07_Optimization.pdf',
      size: '3.4 MB',
      type: 'PDF',
      uploadedAt: 'Today at 09:30 AM',
      status: 'Indexed in RAG',
      course: 'cs401',
      pages: 42,
      chunksCount: 168,
      excerpt: 'Mini-batch variance derivation, moving average decay factors, and gradient stability proofs.'
    },
    {
      id: 'res-t2',
      title: 'CS401 Midterm 2 Diagnostic Exam Bank & Rubrics',
      fileName: 'CS401_Midterm2_ExamBank_2026.pdf',
      size: '1.2 MB',
      type: 'PDF',
      uploadedAt: 'Yesterday',
      status: 'Indexed in RAG',
      course: 'cs401',
      pages: 14,
      chunksCount: 56,
      excerpt: 'Approved rubric grading criteria, sample short-answer explanations, and multiple-choice distractors.'
    },
    {
      id: 'res-t3',
      title: 'CS401 Syllabus & Week-by-Week Curriculum Blueprint',
      fileName: 'CS401_Syllabus_Fall2026.pdf',
      size: '850 KB',
      type: 'PDF',
      uploadedAt: '3 days ago',
      status: 'Indexed in RAG',
      course: 'cs401',
      pages: 12,
      chunksCount: 48,
      excerpt: 'Official learning objectives, textbook chapter correspondences, and academic integrity policies.'
    }
  ]);

  const handleUploadComplete = (newFile) => {
    const createdItem = {
      ...newFile,
      id: `res-${Date.now()}`,
      course: selectedCourse,
      pages: Math.floor(Math.random() * 25) + 10,
      chunksCount: Math.floor(Math.random() * 80) + 40,
      uploadedAt: 'Just now',
      status: 'Indexed in RAG',
      excerpt: `Uploaded document for ${selectedCourse.toUpperCase()} parsed, chunked, and vectorized into dense embeddings.`
    };

    setResources((prev) => [createdItem, ...prev]);
    toast.success(`"${newFile.title}" vectorized and added to RAG tutor!`);
  };

  const handleConfirmDelete = () => {
    if (!deletingResource) return;
    setResources((prev) => prev.filter((r) => r.id !== deletingResource.id));
    toast.success(`"${deletingResource.title}" de-indexed from course RAG.`);
    setDeletingResource(null);
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-brand-50 text-brand border border-brand/20">
              <FileUp className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900">Resource Ingestion & Vectorization Pipeline</h2>
          </div>
          <p className="text-xs text-slate-500">
            Upload lecture notes, slide decks, and exam banks. Files are parsed, chunked, and indexed to ground the student AI tutor.
          </p>
        </div>

        {/* Course Target Selector */}
        <div className="flex items-center space-x-2 shrink-0">
          <span className="text-xs font-semibold text-slate-500">Target Course:</span>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          >
            <option value="cs401">CS401: Machine Learning</option>
            <option value="cs302">CS302: Data Structures</option>
            <option value="cs605">CS605: Deep Generative LLMs</option>
          </select>
        </div>
      </div>

      {/* 4-Step Vectorization Pipeline Visualizer */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            Automated Ingestion Architecture
          </span>
          <span className="text-[11px] font-mono text-slate-400">&lt;60s Average Pipeline Time</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs pt-1">
          <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/70 space-y-1">
            <div className="text-[10px] font-mono font-bold text-slate-400">Step 1</div>
            <div className="font-bold text-white">OCR & PDF Parsing</div>
            <p className="text-[11px] text-slate-400">Extracts slide titles, equations, and code blocks.</p>
          </div>
          <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/70 space-y-1">
            <div className="text-[10px] font-mono font-bold text-slate-400">Step 2</div>
            <div className="font-bold text-white">Semantic Chunking</div>
            <p className="text-[11px] text-slate-400">256-token sliding window with 32-token overlap.</p>
          </div>
          <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/70 space-y-1">
            <div className="text-[10px] font-mono font-bold text-slate-400">Step 3</div>
            <div className="font-bold text-white">Vector Embedding</div>
            <p className="text-[11px] text-slate-400">Dense vector representations stored in MongoDB.</p>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 space-y-1">
            <div className="text-[10px] font-mono font-bold text-emerald-400">Step 4</div>
            <div className="font-bold text-emerald-300">RAG Grounded</div>
            <p className="text-[11px] text-emerald-200/80">Available immediately in student tutor queries.</p>
          </div>
        </div>
      </div>

      {/* Upload Dropzone */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="space-y-1">
          <h3 className="font-bold text-base text-slate-900">Upload Course Material</h3>
          <p className="text-xs text-slate-500">
            Drag and drop syllabus PDFs, PowerPoint slides (.pptx), or exam rubrics. Max size 25MB.
          </p>
        </div>

        <FileUploadDropzone
          onUploadComplete={handleUploadComplete}
          courseName={selectedCourse.toUpperCase()}
        />
      </div>

      {/* Ingested Materials Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-base text-slate-900">Indexed Course Materials ({resources.length})</h3>
            <p className="text-xs text-slate-500">
              Active ground-truth references for {selectedCourse.toUpperCase()}
            </p>
          </div>

          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
            All Documents Active
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {resources.map((item) => (
            <div
              key={item.id}
              className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/50 p-2 rounded-2xl transition-all"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-xs text-slate-900">{item.title}</span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    {item.type}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    {item.status}
                  </span>
                </div>

                <p className="text-[11px] text-slate-500">
                  {item.fileName} • {item.size} • {item.pages} Pages • {item.chunksCount} Vector Chunks
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setViewingResource(item)}
                  className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-all cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Chunks</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDeletingResource(item)}
                  className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-xs font-semibold text-rose-700 transition-all cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>De-index</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inspect Modal */}
      {viewingResource && (
        <Modal
          isOpen={!!viewingResource}
          onClose={() => setViewingResource(null)}
          title={viewingResource.title}
          subtitle={`Vector Details: ${viewingResource.fileName}`}
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-xl text-center">
              <div>
                <span className="text-[10px] text-slate-400 block">Total Pages</span>
                <strong>{viewingResource.pages} Pages</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Vector Chunks</span>
                <strong className="text-brand">{viewingResource.chunksCount} Chunks</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Grounding Mode</span>
                <strong className="text-emerald-700">100% Strict</strong>
              </div>
            </div>

            <div className="space-y-1">
              <span className="font-bold text-slate-700">Sample Semantic Chunk:</span>
              <p className="p-3 rounded-xl bg-slate-100 text-slate-700 leading-relaxed font-mono text-[11px]">
                {viewingResource.excerpt}
              </p>
            </div>
          </div>
        </Modal>
      )}

      {/* Confirm De-index Dialog */}
      <ConfirmDialog
        isOpen={!!deletingResource}
        onClose={() => setDeletingResource(null)}
        onConfirm={handleConfirmDelete}
        title="De-index Material from RAG"
        description="Are you sure you want to de-index this document? Its vector embeddings will be removed from the course knowledge base and student AI tutor queries will no longer cite it."
        resourceName={deletingResource?.title}
        confirmText="Confirm De-index"
        cancelText="Cancel"
        variant="danger"
      />

    </div>
  );
}
