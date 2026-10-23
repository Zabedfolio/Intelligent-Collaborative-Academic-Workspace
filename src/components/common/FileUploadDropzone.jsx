'use client';

import { useState, useRef } from 'react';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Sparkles, 
  FileUp, 
  RefreshCw 
} from 'lucide-react';
import toast from 'react-hot-toast';

/**
 * Drag-and-Drop / Click File Upload Component with Real-Time Progress Bar
 */
export default function FileUploadDropzone({
  onUploadComplete,
  acceptedTypes = ['.pdf', '.docx', '.pptx', '.txt'],
  maxSizeMB = 25
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('idle'); // 'idle' | 'uploading' | 'completed' | 'error'
  const fileInputRef = useRef(null);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const startUploadSimulation = (file) => {
    // Validate file type
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    if (!acceptedTypes.includes(fileExtension)) {
      toast.error(`Invalid file type. Only ${acceptedTypes.join(', ')} are supported.`);
      return;
    }

    // Validate size
    if (file.size > maxSizeMB * 1024 * 1024) {
      toast.error(`File is too large. Maximum size is ${maxSizeMB}MB.`);
      return;
    }

    setUploadingFile({
      name: file.name,
      size: formatFileSize(file.size),
      rawSize: file.size,
      type: fileExtension.toUpperCase().replace('.', '')
    });
    setUploadStatus('uploading');
    setUploadProgress(0);

    // Simulate realistic upload progress bar increments
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 10;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setUploadProgress(100);
        setUploadStatus('completed');
        toast.success(`"${file.name}" uploaded successfully!`);

        // Notify parent callback
        if (onUploadComplete) {
          onUploadComplete({
            id: 'res-' + Date.now(),
            title: file.name.replace(/\.[^/.]+$/, ''),
            fileName: file.name,
            size: formatFileSize(file.size),
            type: fileExtension.toUpperCase().replace('.', ''),
            uploadedAt: 'Just now',
            status: 'Indexed in RAG'
          });
        }
      } else {
        setUploadProgress(currentProgress);
      }
    }, 180);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      startUploadSimulation(file);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      startUploadSimulation(file);
      e.target.value = ''; // Reset input
    }
  };

  const resetUploader = () => {
    setUploadingFile(null);
    setUploadProgress(0);
    setUploadStatus('idle');
  };

  return (
    <div className="w-full space-y-4">
      {/* Dropzone Container */}
      {uploadStatus === 'idle' ? (
        <div
          id="file-dropzone"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-3xl p-8 sm:p-10 text-center transition-all cursor-pointer group ${
            isDragging
              ? 'border-brand bg-brand-50/60 scale-[1.01] shadow-md ring-4 ring-brand/10'
              : 'border-slate-300 hover:border-brand/60 hover:bg-slate-50/70 bg-white'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptedTypes.join(',')}
            onChange={handleFileSelect}
            className="hidden"
          />

          <div className="flex flex-col items-center justify-center space-y-3">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-xs ${
                isDragging
                  ? 'bg-brand text-white'
                  : 'bg-brand-50 text-brand border border-brand/20'
              }`}
            >
              <UploadCloud className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-800">
                <span className="text-brand hover:underline">Click to upload</span> or drag and drop lecture materials
              </p>
              <p className="text-xs text-slate-500">
                Syllabi, Lecture Notes, Slides, Exam Bank ({acceptedTypes.join(', ')}) up to {maxSizeMB}MB
              </p>
            </div>

            <div className="pt-2 flex items-center space-x-2 text-[11px] font-medium text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              <span>Auto-indexed for Teacher-Approved RAG AI Tutor</span>
            </div>
          </div>
        </div>
      ) : (
        /* Active Upload Progress Box */
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3.5">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                  uploadStatus === 'completed'
                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                    : 'bg-brand-50 text-brand border border-brand/20'
                }`}
              >
                {uploadStatus === 'completed' ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : (
                  <FileText className="w-6 h-6 animate-pulse" />
                )}
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-slate-900 truncate max-w-xs sm:max-w-md">
                  {uploadingFile?.name}
                </h4>
                <p className="text-xs text-slate-500">
                  {uploadingFile?.size} • {uploadingFile?.type} Document
                </p>
              </div>
            </div>

            {uploadStatus === 'completed' && (
              <button
                onClick={resetUploader}
                className="text-xs font-semibold text-brand hover:underline p-1.5 rounded-lg hover:bg-brand-50"
              >
                Upload another file
              </button>
            )}
          </div>

          {/* Progress Bar Container */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-600">
                {uploadStatus === 'uploading'
                  ? 'Uploading & vectorizing content...'
                  : 'Upload complete! Vectorized for RAG AI Tutor'}
              </span>
              <span className="font-mono text-brand font-bold">
                {uploadProgress}%
              </span>
            </div>

            {/* Visual Animated Progress Bar */}
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/80">
              <div
                className={`h-full rounded-full transition-all duration-200 ease-out ${
                  uploadStatus === 'completed'
                    ? 'bg-emerald-500'
                    : 'bg-brand shadow-sm'
                }`}
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
