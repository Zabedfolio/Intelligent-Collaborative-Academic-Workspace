'use client';

import Link from 'next/link';
import { 
  Home, 
  LayoutDashboard, 
  Compass, 
  BookOpen, 
  LifeBuoy, 
  LogIn, 
  ShieldCheck, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

export default function NotFound() {
  const quickLinks = [
    { label: 'About Platform', href: '/about', icon: BookOpen },
    { label: 'Contact Support', href: '/contact', icon: LifeBuoy },
    { label: 'Sign In', href: '/login', icon: LogIn },
    { label: 'Terms & Integrity', href: '/terms', icon: ShieldCheck }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 selection:bg-brand selection:text-white">
      {/* Platform Navigation */}
      <Navbar />

      {/* 404 Hero Container */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="max-w-xl w-full text-center">
          
          {/* Aesthetic 4 [Compass] 4 Hero Composition */}
          <div className="flex items-center justify-center space-x-3 sm:space-x-4 my-2 select-none">
            <span className="text-8xl sm:text-9xl font-black text-slate-300/90 tracking-tight leading-none font-mono">
              4
            </span>
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-brand/5 border border-brand/20 flex items-center justify-center text-brand shadow-xs">
              <Compass className="w-10 h-10 sm:w-12 sm:h-12 text-brand animate-spin-slow" />
            </div>
            <span className="text-8xl sm:text-9xl font-black text-slate-300/90 tracking-tight leading-none font-mono">
              4
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3 mt-5">
            Lost in the Lecture Halls?
          </h1>

          {/* Description in two lines */}
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8 max-w-xl mx-auto">
            The page, study material, or workspace URL you requested doesn't exist,<br className="hidden sm:inline" />
            has been relocated, or is temporarily unavailable.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10 max-w-md mx-auto">
            <Link
              href="/"
              id="back-to-home-btn"
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-brand text-white font-bold text-sm shadow-md hover:bg-brand-hover hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>

            <Link
              href="/dashboard"
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-white text-slate-700 border border-slate-300 font-bold text-sm hover:bg-slate-50 hover:border-brand hover:text-brand transition-all shadow-xs active:scale-[0.98] cursor-pointer"
            >
              <LayoutDashboard className="w-4 h-4 text-brand" />
              <span>Go to Dashboard</span>
            </Link>
          </div>

          {/* Refined Helpful Destinations Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm text-left max-w-md mx-auto">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center space-x-2">
                <Sparkles className="w-3.5 h-3.5 text-brand" />
                <span>Helpful Destinations</span>
              </span>
              <span className="text-[11px] text-slate-400 font-medium">Quick links</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {quickLinks.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={idx}
                    href={item.href}
                    className="group p-3 rounded-xl bg-slate-50 hover:bg-brand-50 border border-slate-200/60 hover:border-brand/20 transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-white border border-slate-200/80 group-hover:border-brand/30 flex items-center justify-center text-slate-500 group-hover:text-brand transition-colors shrink-0">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-bold text-slate-700 group-hover:text-brand transition-colors truncate">
                        {item.label}
                      </span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                  </Link>
                );
              })}
            </div>
          </div>

        </div>
      </main>

      {/* Consistent Platform Footer */}
      <Footer />
    </div>
  );
}
