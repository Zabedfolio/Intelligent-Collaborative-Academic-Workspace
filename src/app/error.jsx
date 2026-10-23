'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home, ShieldAlert } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log error to console or error reporting service
    console.error('ICAW Application Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      {/* Navigation */}
      <Navbar />

      {/* Main Error Container */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-lg w-full text-center">
          {/* Warning Icon Badge */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-amber-50 border border-amber-200 text-amber-600 mb-6 shadow-sm">
            <AlertTriangle className="w-10 h-10" />
          </div>

          <div className="inline-block px-3 py-1 mb-4 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
            System Notice • Something Went Wrong
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
            An Unexpected Academic Error Occurred
          </h1>

          <p className="text-sm text-slate-600 leading-relaxed mb-6 max-w-md mx-auto">
            We encountered a temporary disruption while processing this request. Our system has safely prevented data loss.
          </p>

          {error?.message && (
            <div className="mb-6 p-3 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono text-slate-700 break-words max-w-md mx-auto">
              {error.message}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => reset()}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-brand text-white font-bold text-sm shadow-md hover:bg-brand-hover hover:shadow-lg transition-all active:scale-[0.98]"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Try Again</span>
            </button>

            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-white text-slate-700 border border-slate-300 font-semibold text-sm hover:bg-slate-50 hover:text-brand transition-all shadow-xs"
            >
              <Home className="w-4 h-4 text-brand" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
