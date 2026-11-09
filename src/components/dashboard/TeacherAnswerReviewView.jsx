'use client';

import { useState } from 'react';
import {
  CheckSquare,
  Award,
  CheckCircle2,
  AlertCircle,
  Eye,
  Edit3,
  Search,
  Filter,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Save
} from 'lucide-react';
import toast from 'react-hot-toast';
import Modal from '../common/Modal';

export default function TeacherAnswerReviewView({ user }) {
  const [submissions, setSubmissions] = useState([
    {
      id: 'sub-1',
      studentName: 'Alex Morgan',
      studentEmail: 'student@university.edu',
      course: 'CS401',
      exam: 'Midterm 2 Diagnostic Blitz',
      questionTitle: 'Derive mini-batch variance degradation in Batch Normalization',
      studentAnswer:
        'When batch size N is small (e.g. N < 8), sample variance becomes an erratic estimator of the population variance. The estimated statistics introduce high variance into normalized activations, which destabilizes gradient propagation and impairs test generalization.',
      aiProposedScore: 18,
      maxScore: 20,
      rubricConfidence: 94,
      status: 'pending_review',
      feedback:
        'Excellent intuition. Fully explained why small batch size causes erratic statistics. Minor deduction for omitting the Bessel correction factor.',
      rubricBreakdown: [
        { criterion: 'Theoretical explanation of sample variance', score: 9, max: 10 },
        { criterion: 'Impact on backpropagation & gradients', score: 9, max: 10 }
      ]
    },
    {
      id: 'sub-2',
      studentName: 'Maria Chen',
      studentEmail: 'mchen@university.edu',
      course: 'CS401',
      exam: 'Midterm 2 Diagnostic Blitz',
      questionTitle: 'Matrix factorization relation between PCA and SVD',
      studentAnswer:
        'PCA on zero-centered data X is equivalent to SVD of X = UΣV^T. Principal direction eigenvectors are given by V, and eigenvalues equal Σ_i² / (n - 1).',
      aiProposedScore: 20,
      maxScore: 20,
      rubricConfidence: 99,
      status: 'pending_review',
      feedback: 'Flawless mathematical formulation matching course rubric slide 42.',
      rubricBreakdown: [
        { criterion: 'Correct identification of V as eigenvectors', score: 10, max: 10 },
        { criterion: 'Correct eigenvalue to singular value relation', score: 10, max: 10 }
      ]
    },
    {
      id: 'sub-3',
      studentName: 'David Kim',
      studentEmail: 'dkim@university.edu',
      course: 'CS401',
      exam: 'Midterm 2 Diagnostic Blitz',
      questionTitle: 'Self-Attention vs Cross-Attention matrix projections',
      studentAnswer:
        'Self-attention projects Q, K, V from the same sentence. Cross-attention takes Q from decoder and K, V from encoder.',
      aiProposedScore: 16,
      maxScore: 20,
      rubricConfidence: 86,
      status: 'flagged_review',
      feedback:
        'Conceptually sound but brief. Did not specify projection matrices W_q, W_k, W_v explicitly.',
      rubricBreakdown: [
        { criterion: 'Distinction between source sequences', score: 10, max: 10 },
        { criterion: 'Mathematical projection matrix formulation', score: 6, max: 10 }
      ]
    }
  ]);

  const [activeReviewItem, setActiveReviewItem] = useState(null);
  const [overrideScore, setOverrideScore] = useState('');
  const [overrideFeedback, setOverrideFeedback] = useState('');

  const handleOpenReview = (item) => {
    setActiveReviewItem(item);
    setOverrideScore(item.aiProposedScore);
    setOverrideFeedback(item.feedback);
  };

  const handleApproveGrade = (item) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === item.id ? { ...s, status: 'approved' } : s))
    );
    toast.success(`Approved score of ${item.aiProposedScore}/${item.maxScore} for ${item.studentName}`);
    setActiveReviewItem(null);
  };

  const handleSaveOverride = () => {
    if (!activeReviewItem) return;
    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === activeReviewItem.id
          ? {
              ...s,
              aiProposedScore: Number(overrideScore),
              feedback: overrideFeedback,
              status: 'approved'
            }
          : s
      )
    );
    toast.success(`Published calibrated score for ${activeReviewItem.studentName}`);
    setActiveReviewItem(null);
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-brand-50 text-brand border border-brand/20">
              <CheckSquare className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900">AI Rubric Answer Evaluation & Review</h2>
          </div>
          <p className="text-xs text-slate-500">
            Review student written responses evaluated against official syllabus rubrics. Approve AI grades or adjust scores with full pedagogical control.
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <span className="px-3.5 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold font-mono">
            3 Submissions Pending Review
          </span>
        </div>
      </div>

      {/* Submissions List */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 flex-wrap gap-2">
          <div>
            <h3 className="font-bold text-base text-slate-900">CS401 Midterm Diagnostic Submissions</h3>
            <p className="text-xs text-slate-500">Evaluated by multi-criterion rubric grounding pipeline</p>
          </div>

          <span className="text-xs font-mono font-bold text-slate-400">
            Auto-Scored via Lecture Rubrics
          </span>
        </div>

        <div className="space-y-4">
          {submissions.map((sub) => (
            <div
              key={sub.id}
              className={`p-5 rounded-2xl border transition-all ${
                sub.status === 'approved'
                  ? 'bg-slate-50/50 border-slate-200'
                  : sub.status === 'flagged_review'
                  ? 'bg-amber-50/40 border-amber-200'
                  : 'bg-white border-slate-200 shadow-2xs hover:border-brand/40'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 flex-wrap">
                    <span className="font-bold text-xs text-slate-900">{sub.studentName}</span>
                    <span className="text-[10px] text-slate-400">({sub.studentEmail})</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        sub.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : sub.status === 'flagged_review'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-brand-50 text-brand'
                      }`}
                    >
                      {sub.status.replace('_', ' ')}
                    </span>
                  </div>

                  <h4 className="font-semibold text-xs text-slate-700">
                    Question: &ldquo;{sub.questionTitle}&rdquo;
                  </h4>
                </div>

                {/* Score & Actions */}
                <div className="flex items-center space-x-3 shrink-0">
                  <div className="text-right">
                    <div className="font-mono font-black text-base text-brand">
                      {sub.aiProposedScore} / {sub.maxScore}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      AI Conf: {sub.rubricConfidence}%
                    </div>
                  </div>

                  {sub.status !== 'approved' ? (
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => handleOpenReview(sub)}
                        className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-all cursor-pointer"
                      >
                        Inspect Rubric
                      </button>
                      <button
                        type="button"
                        onClick={() => handleApproveGrade(sub)}
                        className="px-3 py-1.5 rounded-xl bg-brand text-white text-xs font-bold hover:bg-brand-hover transition-all cursor-pointer shadow-2xs"
                      >
                        Approve
                      </button>
                    </div>
                  ) : (
                    <span className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Graded & Published</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Student Answer Excerpt */}
              <div className="mt-3 p-3 rounded-xl bg-slate-50 text-slate-700 text-xs leading-relaxed border border-slate-200/60 font-mono text-[11px]">
                &ldquo;{sub.studentAnswer}&rdquo;
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rubric Calibration Modal */}
      {activeReviewItem && (
        <Modal
          isOpen={!!activeReviewItem}
          onClose={() => setActiveReviewItem(null)}
          title={`Evaluate Submission: ${activeReviewItem.studentName}`}
          subtitle={`Question: ${activeReviewItem.questionTitle}`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-5 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-xl space-y-1 text-slate-700 border border-slate-200">
              <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wider">
                Student Written Answer:
              </span>
              <p className="font-mono text-slate-800 text-xs">{activeReviewItem.studentAnswer}</p>
            </div>

            {/* Rubric Breakdown Grid */}
            <div className="space-y-2">
              <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wider">
                Multi-Criterion Rubric Evaluation:
              </span>
              <div className="space-y-1.5">
                {activeReviewItem.rubricBreakdown.map((r, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200"
                  >
                    <span>{r.criterion}</span>
                    <strong className="font-mono text-brand">
                      {r.score} / {r.max} pts
                    </strong>
                  </div>
                ))}
              </div>
            </div>

            {/* Score & Feedback Calibration Input */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
              <div className="space-y-1">
                <label className="font-bold text-slate-800 block">Final Score (0-{activeReviewItem.maxScore})</label>
                <input
                  type="number"
                  min="0"
                  max={activeReviewItem.maxScore}
                  value={overrideScore}
                  onChange={(e) => setOverrideScore(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono font-bold text-brand text-sm"
                />
              </div>

              <div className="sm:col-span-3 space-y-1">
                <label className="font-bold text-slate-800 block">Faculty Feedback Note to Student</label>
                <input
                  type="text"
                  value={overrideFeedback}
                  onChange={(e) => setOverrideFeedback(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setActiveReviewItem(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveOverride}
                className="px-5 py-2 rounded-xl bg-brand text-white font-bold hover:bg-brand-hover shadow-xs flex items-center space-x-1"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Publish Grade & Feedback</span>
              </button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
}
