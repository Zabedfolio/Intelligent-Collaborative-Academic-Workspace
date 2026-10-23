'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../lib/validations/auth';
import { useAuthStore } from '../../store/useAuthStore';
import Footer from '../../components/common/Footer';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldAlert,
  GraduationCap,
  UserCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: true
    }
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setServerError('');

    try {
      const res = await login({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe
      });

      if (!res.success) {
        // Acceptance criteria: "Invalid email or password" without revealing which field was wrong
        setServerError(res.error || 'Invalid email or password');
        toast.error(res.error || 'Invalid email or password');
        setIsLoading(false);
        return;
      }

      toast.success(`Welcome back, ${res.user.name}! Redirecting...`);
      setTimeout(() => {
        router.push('/dashboard');
      }, 500);
    } catch (err) {
      setServerError('An unexpected error occurred. Please try again.');
      toast.error('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  // Quick fill helper for reviewer/demo testing
  const fillDemoAccount = (role) => {
    if (role === 'student') {
      setValue('email', 'student@university.edu', { shouldValidate: true });
      setValue('password', 'Password123!', { shouldValidate: true });
      setServerError('');
      toast.success('Loaded Student demo credentials');
    } else if (role === 'teacher') {
      setValue('email', 'teacher@university.edu', { shouldValidate: true });
      setValue('password', 'Password123!', { shouldValidate: true });
      setServerError('');
      toast.success('Loaded Teacher demo credentials');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-brand selection:text-white">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        {/* Logo and Academic Header */}
        <Link href="/" className="inline-flex items-center space-x-3 group justify-center">
          <Image
            src="/ICAW-logo.png"
            alt="ICAW Logo"
            width={48}
            height={48}
            className="w-12 h-12 object-contain transition-transform group-hover:scale-105"
            priority
          />
          <span className="font-extrabold text-2xl tracking-tight text-brand">
            ICAW
          </span>
        </Link>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Sign in to your Academic Workspace
        </h2>
        <p className="text-xs text-slate-500">
          Access your RAG AI tutor, courses, and collaborative study groups
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl shadow-xl shadow-slate-900/5 border border-slate-200/80 space-y-6">
          
          {/* Quick Demo Fill Chips */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/70 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand" />
                Quick Demo Credentials:
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => fillDemoAccount('student')}
                className="flex items-center justify-center space-x-1.5 py-1.5 px-2.5 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:border-brand hover:text-brand hover:bg-brand-50/50 transition-all shadow-xs"
              >
                <GraduationCap className="w-3.5 h-3.5 text-brand" />
                <span>Student Demo</span>
              </button>
              <button
                type="button"
                onClick={() => fillDemoAccount('teacher')}
                className="flex items-center justify-center space-x-1.5 py-1.5 px-2.5 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:border-amber-700 hover:text-amber-800 hover:bg-amber-50/50 transition-all shadow-xs"
              >
                <UserCheck className="w-3.5 h-3.5 text-amber-600" />
                <span>Teacher Demo</span>
              </button>
            </div>
          </div>

          {/* Server Error Alert Banner */}
          {serverError && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 flex items-start space-x-2.5 animate-in fade-in duration-150">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
              <div className="text-xs font-semibold leading-relaxed">
                {serverError}
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold text-slate-700 mb-1.5"
              >
                Institutional or Personal Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="student@university.edu"
                  {...register('email')}
                  className={`w-full pl-10 pr-4 py-2.5 bg-slate-50/60 border rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                    errors.email
                      ? 'border-rose-300 focus:ring-rose-200 bg-rose-50/20'
                      : 'border-slate-200 focus:border-brand focus:ring-brand/20 bg-white'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-[11px] font-medium text-rose-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-xs font-bold text-slate-700"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => toast('Password reset link can be sent to your institutional email.')}
                  className="text-[11px] font-semibold text-brand hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  {...register('password')}
                  className={`w-full pl-10 pr-10 py-2.5 bg-slate-50/60 border rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                    errors.password
                      ? 'border-rose-300 focus:ring-rose-200 bg-rose-50/20'
                      : 'border-slate-200 focus:border-brand focus:ring-brand/20 bg-white'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-[11px] font-medium text-rose-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center space-x-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  {...register('rememberMe')}
                  className="w-4 h-4 rounded border-slate-300 text-brand focus:ring-brand accent-[#003717]"
                />
                <span className="text-xs font-medium text-slate-700">
                  Remember Me on this device
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-3 py-2.5 px-4 rounded-xl bg-brand text-white text-xs font-bold tracking-wide hover:bg-brand-hover active:scale-[0.99] transition-all shadow-md shadow-brand/25 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer Navigation */}
          <div className="pt-4 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              Don't have an account yet?{' '}
              <Link
                href="/register"
                className="font-bold text-brand hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
      </div>

      {/* Compact Platform Footer */}
      <Footer variant="compact" />
    </div>
  );
}
