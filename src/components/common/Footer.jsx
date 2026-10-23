'use client';

import Link from 'next/link';
import Image from 'next/image';
import { 
  GraduationCap, 
  Mail, 
  ShieldCheck, 
  FileText, 
  HelpCircle, 
  ExternalLink,
  Sparkles,
  BookOpen,
  Users
} from 'lucide-react';

export default function Footer({ variant = 'default' }) {
  const currentYear = new Date().getFullYear();

  if (variant === 'compact') {
    return (
      <footer className="w-full py-4 px-6 border-t border-slate-200/80 bg-white text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-brand">Intelligent Collaborative Academic Workspace</span>
            <span>&copy; {currentYear}</span>
          </div>
          <div className="flex items-center space-x-5 font-medium">
            <Link href="/about" className="hover:text-brand transition-colors">About</Link>
            <Link href="/contact" className="hover:text-brand transition-colors">Contact</Link>
            <Link href="/terms" className="hover:text-brand transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-brand transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="w-full border-t border-slate-200/90 bg-white text-slate-600 font-sans mt-auto">
      {/* Upper Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          
          {/* Brand Info & Mission (Cols 1-2) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center space-x-3.5 group">
              <Image
                src="/ICAW-logo.png"
                alt="ICAW Logo"
                width={56}
                height={56}
                className="w-13 h-13 sm:w-14 sm:h-14 object-contain shrink-0 transition-transform group-hover:scale-105"
              />
              <div className="flex flex-col justify-center">
                <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 group-hover:text-brand transition-colors leading-tight">
                  Intelligent Collaborative
                </span>
                <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 group-hover:text-brand transition-colors leading-tight">
                  Academic Workspace
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
              An intelligent, university-grade collaborative workspace uniting teacher-verified RAG AI tutoring, adaptive exam preparation, and peer study groups.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center space-x-1.5">
              <BookOpen className="w-3.5 h-3.5 text-brand" />
              <span>Platform</span>
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-brand transition-colors inline-flex items-center">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-brand transition-colors inline-flex items-center">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-brand transition-colors inline-flex items-center">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-brand transition-colors inline-flex items-center">
                  Create Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Academic & Platform Info Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center space-x-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-brand" />
              <span>Academic Info</span>
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" id="footer-link-about" className="hover:text-brand font-medium text-slate-700 transition-colors inline-flex items-center">
                  About Platform
                </Link>
              </li>
              <li>
                <Link href="/contact" id="footer-link-contact" className="hover:text-brand font-medium text-slate-700 transition-colors inline-flex items-center">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/register?role=teacher" className="hover:text-brand transition-colors inline-flex items-center">
                  Faculty Verification
                </Link>
              </li>
              <li>
                <Link href="/about#rag-tutor" className="hover:text-brand transition-colors inline-flex items-center">
                  RAG AI Architecture
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Governance Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-brand" />
              <span>Trust & Legal</span>
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" id="footer-link-terms" className="hover:text-brand font-medium text-slate-700 transition-colors inline-flex items-center">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" id="footer-link-privacy" className="hover:text-brand transition-colors inline-flex items-center">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms#academic-integrity" className="hover:text-brand transition-colors inline-flex items-center">
                  Academic Integrity
                </Link>
              </li>
              <li>
                <Link href="/contact#support" className="hover:text-brand transition-colors inline-flex items-center">
                  Institutional Inquiries
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-100 bg-slate-50/70 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {currentYear} <span className="font-semibold text-slate-700">Intelligent Collaborative Academic Workspace</span>. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-6 font-medium">
            <Link href="/about" className="hover:text-brand transition-colors">
              About
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/contact" className="hover:text-brand transition-colors">
              Contact
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/terms" className="hover:text-brand transition-colors">
              Terms
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/privacy" className="hover:text-brand transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
