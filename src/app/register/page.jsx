'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, passwordRules } from '../../lib/validations/auth';
import { useAuthStore } from '../../store/useAuthStore';
import Footer from '../../components/common/Footer';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  GraduationCap,
  Briefcase,
  Check,
  X,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUser } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successInfo, setSuccessInfo] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      role: 'student',
      password: '',
      confirmPassword: '',
      agreeTerms: false
    }
  });

  const selectedRole = watch('role');
  const watchedPassword = watch('password') || '';

  // Calculate password strength score (0 to 5)
  const passwordChecks = passwordRules.map((rule) => ({
    ...rule,
    passed: rule.test(watchedPassword)
  }));
  const passedCount = passwordChecks.filter((c) => c.passed).length;
  const strengthColor =
    passedCount <= 2
      ? 'bg-rose-500'
      : passedCount <= 4
      ? 'bg-amber-500'
      : 'bg-emerald-600';
  const strengthLabel =
    passedCount === 0
      ? 'Enter password'
      : passedCount <= 2
      ? 'Weak'
      : passedCount <= 4
      ? 'Good'
      : 'Strong';

  const onSubmit = async (data) => {
    setIsLoading(true);
    setServerError('');

    try {
      const res = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role
      });

      if (!res.success) {
        // Acceptance criteria: "This email is already registered. Please log in or reset your password instead."
        setServerError(res.error);
        toast.error(res.error);
        setIsLoading(false);
        return;
      }

      // Successful registration state
      setSuccessInfo({
        user: res.user,
        role: res.role,
        isStudent: res.role === 'student',
        email: data.email
      });
      setIsLoading(false);
      toast.success(
        res.role === 'student'
          ? 'Student account created! Verification email sent.'
          : 'Teacher account created with teacher permissions.'
      );
    } catch (err) {
      setServerError('An unexpected error occurred. Please try again.');
      toast.error('An unexpected error occurred.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-brand selection:text-white">
      <div className="flex-1 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
        {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-xl text-center space-y-2 mb-6">
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
          Create your Academic Account
        </h2>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Choose your role to get configured with teacher-approved RAG AI, exam prep, or class resource management.
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl shadow-xl shadow-slate-900/5 border border-slate-200/80">
          
          {/* Success Dialog Modal after Registration */}
          {successInfo ? (
            <div className="space-y-6 text-center py-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50/50">
                <ShieldCheck className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900">
                  {successInfo.isStudent
                    ? 'Student Account Created!'
                    : 'Teacher Account Created!'}
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  Welcome to ICAW, <strong className="text-slate-900">{successInfo.user.name}</strong>. Your account has been registered with{' '}
                  <span className="font-bold text-brand uppercase">{successInfo.role}</span> permissions.
                </p>
              </div>

              {/* Role-Specific Status Notice */}
              {successInfo.isStudent ? (
                <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-left space-y-2 text-xs text-emerald-900">
                  <div className="flex items-center space-x-2 font-bold text-emerald-800">
                    <Mail className="w-4 h-4 shrink-0" />
                    <span>Email Verification Sent</span>
                  </div>
                  <p className="text-[11px] text-emerald-700 leading-relaxed">
                    We sent a verification link to <span className="font-mono font-bold">{successInfo.email}</span>. You can start exploring your courses and study tools right away.
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-left space-y-2 text-xs text-amber-900">
                  <div className="flex items-center space-x-2 font-bold text-amber-800">
                    <Info className="w-4 h-4 shrink-0" />
                    <span>Teacher Role Configured</span>
                  </div>
                  <p className="text-[11px] text-amber-700 leading-relaxed">
                    Your account has teacher-role permissions assigned. Depending on institutional policy, course publishing and class-wide resource uploads may require institutional approval.
                  </p>
                </div>
              )}

              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  onClick={() => router.push('/dashboard')}
                  className="py-2.5 px-6 rounded-xl bg-brand text-white text-xs font-bold hover:bg-brand-hover transition-all shadow-md shadow-brand/25 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Go to My Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/login')}
                  className="py-2.5 px-6 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-all cursor-pointer"
                >
                  <span>Go to Login</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              
              {/* Server Duplicate Error Alert */}
              {serverError && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 space-y-2 animate-in fade-in duration-150">
                  <div className="flex items-start space-x-2.5">
                    <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                    <div className="text-xs font-semibold leading-relaxed">
                      {serverError}
                    </div>
                  </div>
                  <div className="pt-1 pl-6">
                    <Link
                      href="/login"
                      className="inline-flex items-center space-x-1.5 text-xs font-bold text-brand hover:underline"
                    >
                      <span>Click here to sign in with this email</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}

              {/* Role Selection: Student vs Teacher */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">
                  I am registering as:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {/* Student Option Card */}
                  <div
                    onClick={() => setValue('role', 'student', { shouldValidate: true })}
                    className={`cursor-pointer p-4 rounded-2xl border-2 transition-all flex flex-col items-center text-center space-y-1.5 ${
                      selectedRole === 'student'
                        ? 'border-brand bg-brand-50/50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      selectedRole === 'student' ? 'bg-brand text-white' : 'bg-slate-100 text-slate-500'
                    }`}>
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Student</span>
                      <span className="text-[10px] text-slate-500 block leading-tight">
                        RAG AI tutor, adaptive practice & study groups
                      </span>
                    </div>
                  </div>

                  {/* Teacher Option Card */}
                  <div
                    onClick={() => setValue('role', 'teacher', { shouldValidate: true })}
                    className={`cursor-pointer p-4 rounded-2xl border-2 transition-all flex flex-col items-center text-center space-y-1.5 ${
                      selectedRole === 'teacher'
                        ? 'border-brand bg-brand-50/50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      selectedRole === 'teacher' ? 'bg-brand text-white' : 'bg-slate-100 text-slate-500'
                    }`}>
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Teacher</span>
                      <span className="text-[10px] text-slate-500 block leading-tight">
                        Course materials, AI config & class analytics
                      </span>
                    </div>
                  </div>
                </div>
                {errors.role && (
                  <p className="text-[11px] font-medium text-rose-600">
                    {errors.role.message}
                  </p>
                )}
              </div>

              {/* Full Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-bold text-slate-700 mb-1.5"
                >
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="e.g. Alex Morgan"
                    {...register('name')}
                    className={`w-full pl-10 pr-4 py-2.5 bg-slate-50/60 border rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.name
                        ? 'border-rose-300 focus:ring-rose-200 bg-rose-50/20'
                        : 'border-slate-200 focus:border-brand focus:ring-brand/20 bg-white'
                    }`}
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-[11px] font-medium text-rose-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Address */}
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

              {/* Password Field with Show/Hide */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-bold text-slate-700 mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    placeholder="Create a strong password"
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
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Real-time Password Strength Meter */}
                {watchedPassword && (
                  <div className="mt-2 space-y-1.5">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-semibold text-slate-500">Strength:</span>
                      <span className="font-bold text-slate-700">{strengthLabel}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${strengthColor} transition-all duration-300`}
                        style={{ width: `${(passedCount / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Inline Password Complexity Checklist */}
                <div className="mt-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Password Complexity Requirements:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                    {passwordChecks.map((rule) => (
                      <div
                        key={rule.id}
                        className={`flex items-center space-x-1.5 text-[11px] transition-colors ${
                          rule.passed
                            ? 'text-emerald-700 font-semibold'
                            : 'text-slate-500'
                        }`}
                      >
                        {rule.passed ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        ) : (
                          <div className="w-3.5 h-3.5 rounded-full border border-slate-300 flex items-center justify-center shrink-0">
                            <span className="w-1 h-1 rounded-full bg-slate-300" />
                          </div>
                        )}
                        <span>{rule.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {errors.password && (
                  <p className="mt-1 text-[11px] font-medium text-rose-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-xs font-bold text-slate-700 mb-1.5"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    placeholder="Repeat password"
                    {...register('confirmPassword')}
                    className={`w-full pl-10 pr-10 py-2.5 bg-slate-50/60 border rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.confirmPassword
                        ? 'border-rose-300 focus:ring-rose-200 bg-rose-50/20'
                        : 'border-slate-200 focus:border-brand focus:ring-brand/20 bg-white'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-[11px] font-medium text-rose-600">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Academic Code of Conduct Checkbox */}
              <div>
                <label className="flex items-start space-x-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    {...register('agreeTerms')}
                    className="mt-0.5 w-4 h-4 rounded border-slate-300 text-brand focus:ring-brand accent-[#003717]"
                  />
                  <span className="text-xs text-slate-600 leading-tight">
                    I agree to the <span className="text-brand font-semibold hover:underline">Academic Integrity Code</span> and institutional workspace terms.
                  </span>
                </label>
                {errors.agreeTerms && (
                  <p className="mt-1 text-[11px] font-medium text-rose-600">
                    {errors.agreeTerms.message}
                  </p>
                )}
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
                    <span>Creating account...</span>
                  </>
                ) : (
                  <>
                    <span>Create {selectedRole === 'teacher' ? 'Teacher' : 'Student'} Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Footer Navigation */}
          {!successInfo && (
            <div className="pt-4 mt-6 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-500">
                Already have an academic account?{' '}
                <Link
                  href="/login"
                  className="font-bold text-brand hover:underline"
                >
                  Log in here
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
      </div>

      {/* Compact Platform Footer */}
      <Footer variant="compact" />
    </div>
  );
}
