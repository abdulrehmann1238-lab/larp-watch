import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Lock, Mail } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useApp();
  const [email, setEmail] = useState('alexandre.laurent@horology-atelier.ch');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Signed in successfully as Alexandre Laurent.', 'gold');
    navigate('/app/dashboard');
  };

  const handleDemoSignIn = () => {
    showToast('One-Click Demo Access granted.', 'gold');
    navigate('/app/dashboard');
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 flex items-center justify-center bg-ivory text-charcoal">
      <div className="w-full max-w-md bg-white rounded-2xl border border-stone-light p-8 md:p-10 shadow-luxury">
        {/* Crest */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full border border-gold flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-gold" />
            </div>
            <span className="text-2xl font-editorial-heading tracking-[0.2em] font-medium text-charcoal">
              LARP
            </span>
          </Link>
          <h1 className="text-2xl font-editorial-heading font-medium text-charcoal">
            Welcome to the Studio
          </h1>
          <p className="text-xs text-graphite mt-1">
            Access your personal horology transformation workspace.
          </p>
        </div>

        {/* Quick Demo Access Callout */}
        <div className="mb-6 p-3 rounded-xl bg-parchment border border-gold/30 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-gold shrink-0" />
            <span className="text-xs text-charcoal font-medium">Explore Client Demo Mode</span>
          </div>
          <button
            type="button"
            onClick={handleDemoSignIn}
            className="px-3 py-1.5 rounded-lg bg-charcoal text-ivory text-[10px] uppercase tracking-wider font-semibold hover:bg-espresso transition-colors shrink-0"
          >
            Instant Enter
          </button>
        </div>

        {/* Sign In Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs uppercase tracking-wider text-charcoal font-medium block mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-dark absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-parchment/40 border border-stone-light rounded-xl pl-10 pr-4 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs uppercase tracking-wider text-charcoal font-medium block">
                Password
              </label>
              <button
                type="button"
                onClick={() => showToast('Simulated password reset sent.', 'info')}
                className="text-[11px] text-gold-dark hover:underline"
              >
                Forgot?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-dark absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-parchment/40 border border-stone-light rounded-xl pl-10 pr-4 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={e => setRememberMe(e.target.checked)}
              className="rounded border-stone-light text-charcoal focus:ring-gold"
            />
            <label htmlFor="remember" className="text-xs text-graphite cursor-pointer">
              Remember this device for 30 days
            </label>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-charcoal hover:bg-espresso text-ivory text-xs uppercase tracking-[0.18em] font-medium transition-all shadow-md flex items-center justify-center gap-2 border border-charcoal hover:border-gold/40"
            >
              <span>Sign In to Studio</span>
              <ArrowRight className="w-4 h-4 text-gold" />
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-stone-light text-center text-xs text-graphite">
          <span>New to LARP? </span>
          <Link to="/signup" className="text-gold-dark font-medium hover:underline">
            Request an atelier account
          </Link>
        </div>
      </div>
    </div>
  );
};

