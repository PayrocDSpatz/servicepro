import React, { useState } from 'react';
import Icon from '../components/Icon.jsx';
import {
  signInEmail, signUpEmail, signInGoogle, resetPassword, isConfigured,
} from '../firebase.js';
import './AuthView.css';

export default function AuthView({ onBack, onContinueDemo }) {
  const [mode, setMode] = useState('signin'); // signin | signup | reset
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isConfigured) {
      setError('Firebase is not configured. Add your VITE_FIREBASE_* env vars to enable real auth.');
      return;
    }
    setError(''); setInfo(''); setBusy(true);
    try {
      if (mode === 'signin')      await signInEmail(email, password);
      else if (mode === 'signup') await signUpEmail(email, password, name);
      else if (mode === 'reset') {
        await resetPassword(email);
        setInfo('Password reset email sent. Check your inbox.');
      }
    } catch (err) {
      setError(prettyError(err));
    } finally {
      setBusy(false);
    }
  };

  const handleGoogle = async () => {
    if (!isConfigured) {
      setError('Firebase is not configured. Add your VITE_FIREBASE_* env vars to enable real auth.');
      return;
    }
    setError(''); setBusy(true);
    try { await signInGoogle(); }
    catch (err) { setError(prettyError(err)); }
    finally { setBusy(false); }
  };

  return (
    <div className="auth">
      {/* LEFT — brand panel */}
      <div className="auth-brand">
        <div className="auth-brand-inner">
          <div className="auth-brand-logo">
            <div className="lp-logo-mark" style={{ background: 'var(--sp-accent)' }}>
              <Icon name="wrench" size={22} stroke={2.5} />
            </div>
            <span className="auth-brand-name">SERVICE<span className="lp-accent">PRO</span></span>
          </div>

          <h1 className="auth-headline">
            One platform.<br />
            Every truck on the schedule.
          </h1>
          <p className="auth-tag">
            Dispatch, customers, invoicing, and contracts — built for HVAC, plumbing,
            lawn, pool, and pest crews.
          </p>

          <ul className="auth-bullets">
            <li><Icon name="check" size={16} /> 14-day free trial &middot; no card required</li>
            <li><Icon name="check" size={16} /> Onboard your first crew in an hour</li>
            <li><Icon name="check" size={16} /> Cancel any time</li>
          </ul>
        </div>
        <div className="auth-stripe" />
      </div>

      {/* RIGHT — form */}
      <div className="auth-form-wrap">
        <div className="auth-form-top">
          <button className="sp-btn sp-btn-ghost sp-btn-sm" onClick={onBack}>
            <Icon name="arrowRight" size={14} style={{ transform: 'rotate(180deg)' }} />
            Back
          </button>
          {mode !== 'reset' && (
            <span className="auth-toggle">
              {mode === 'signin' ? "Don't have an account? " : 'Already have one? '}
              <button className="auth-link" onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(''); setInfo(''); }}>
                {mode === 'signin' ? 'Sign up' : 'Sign in'}
              </button>
            </span>
          )}
        </div>

        <div className="auth-form">
          <h2 className="auth-form-title">
            {mode === 'signin' && 'Sign in'}
            {mode === 'signup' && 'Create your account'}
            {mode === 'reset'  && 'Reset password'}
          </h2>
          <p className="auth-form-sub">
            {mode === 'signin' && 'Welcome back. Get your day on the board.'}
            {mode === 'signup' && 'Start your 14-day free trial. No credit card.'}
            {mode === 'reset'  && "Enter your email and we'll send you a reset link."}
          </p>

          {!isConfigured && (
            <div className="auth-warn">
              <Icon name="alert" size={16} />
              <div>
                <strong>Demo mode.</strong> Firebase isn't configured yet, so sign-in is disabled.
                Add your <code>VITE_FIREBASE_*</code> environment variables to turn this on.
              </div>
            </div>
          )}

          {mode !== 'reset' && (
            <>
              <button className="auth-google" type="button" onClick={handleGoogle} disabled={busy}>
                <GoogleG />
                Continue with Google
              </button>
              <div className="auth-divider"><span>or</span></div>
            </>
          )}

          <form onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <div className="sp-field">
                <label className="sp-label">Your name</label>
                <input className="sp-input" type="text" required
                  value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Foreman" />
              </div>
            )}

            <div className="sp-field">
              <label className="sp-label">Email</label>
              <input className="sp-input" type="email" required autoComplete="email"
                value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" />
            </div>

            {mode !== 'reset' && (
              <div className="sp-field">
                <label className="sp-label">
                  Password
                  {mode === 'signin' && (
                    <button type="button" className="auth-link auth-link-right"
                            onClick={() => { setMode('reset'); setError(''); setInfo(''); }}>
                      Forgot?
                    </button>
                  )}
                </label>
                <input className="sp-input" type="password" required minLength={8}
                  autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder={mode === 'signup' ? 'At least 8 characters' : ''} />
              </div>
            )}

            {error && <div className="auth-error"><Icon name="alert" size={16} />{error}</div>}
            {info  && <div className="auth-info"><Icon name="check" size={16} />{info}</div>}

            <button className="sp-btn sp-btn-primary sp-btn-lg sp-btn-block" type="submit" disabled={busy}>
              {busy ? 'Working...' : (
                mode === 'signin' ? 'Sign In' :
                mode === 'signup' ? 'Create Account' :
                'Send Reset Link'
              )}
            </button>
          </form>

          {mode === 'reset' && (
            <button className="auth-link" style={{ marginTop: 16, display: 'block' }}
                    onClick={() => { setMode('signin'); setError(''); setInfo(''); }}>
              ← Back to sign in
            </button>
          )}

          <div className="auth-demo">
            <button className="sp-btn sp-btn-outline sp-btn-block" onClick={onContinueDemo}>
              Continue without signing in (demo)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function prettyError(err) {
  const code = err?.code || '';
  const map = {
    'auth/invalid-email':            'That email address looks invalid.',
    'auth/user-not-found':           'No account with that email.',
    'auth/wrong-password':           'Wrong password.',
    'auth/invalid-credential':       'Email or password is incorrect.',
    'auth/email-already-in-use':     'An account with that email already exists.',
    'auth/weak-password':            'Password needs to be at least 8 characters.',
    'auth/too-many-requests':        'Too many attempts. Try again in a few minutes.',
    'auth/popup-closed-by-user':     'Sign-in popup was closed before completing.',
    'auth/network-request-failed':   'Network error. Check your connection.',
  };
  return map[code] || err?.message || 'Something went wrong. Try again.';
}

function GoogleG() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84c-.21 1.13-.84 2.08-1.78 2.72v2.26h2.88c1.69-1.55 2.66-3.84 2.66-6.62z"/>
      <path fill="#34A853" d="M9 18c2.4 0 4.42-.8 5.9-2.18l-2.88-2.26c-.8.54-1.83.86-3.02.86-2.32 0-4.28-1.57-4.98-3.68H1.06v2.32A8.99 8.99 0 0 0 9 18z"/>
      <path fill="#FBBC05" d="M4.02 10.74A5.4 5.4 0 0 1 3.74 9c0-.6.1-1.18.28-1.74V4.94H1.06A8.99 8.99 0 0 0 0 9c0 1.46.34 2.83.94 4.06l3.08-2.32z"/>
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.43 1.34l2.56-2.56C13.42.88 11.4 0 9 0 5.48 0 2.43 2.02 1.06 4.94l3.08 2.32C4.72 5.15 6.68 3.58 9 3.58z"/>
    </svg>
  );
}
