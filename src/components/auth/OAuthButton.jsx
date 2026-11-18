'use client';

import { useState } from 'react';
import { authClient } from '../../lib/auth-client';
import toast from 'react-hot-toast';

export default function OAuthButton({ mode = 'signin', callbackUrl = '/dashboard' }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleOAuthSignIn = async (provider = 'google') => {
    setIsLoading(true);
    try {
      if (typeof authClient?.signIn?.social === 'function') {
        await authClient.signIn.social({
          provider,
          callbackURL: callbackUrl
        });
      } else {
        toast.error('OAuth provider is not configured yet on this domain.');
      }
    } catch (error) {
      console.error('OAuth error:', error);
      toast.error(error?.message || 'Failed to authenticate via Google.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => handleOAuthSignIn('google')}
        disabled={isLoading}
        className="w-full py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 text-xs font-bold transition-all shadow-xs flex items-center justify-center space-x-2.5 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-slate-300 border-t-brand rounded-full animate-spin" />
        ) : (
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
        )}
        <span>
          {mode === 'signup'
            ? 'Sign up with Google (Institutional)'
            : 'Continue with Google (Institutional)'}
        </span>
      </button>

      {/* Modern Separator */}
      <div className="relative flex items-center justify-center">
        <div className="border-t border-slate-200/80 w-full" />
        <span className="bg-white px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider shrink-0">
          Or continue with email
        </span>
        <div className="border-t border-slate-200/80 w-full" />
      </div>
    </div>
  );
}

