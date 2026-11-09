import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Lock, Mail, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast, updateUser } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      showToast('Please enter your full name and email.', 'info');
      return;
    }
    updateUser({ name, email });
    showToast(`Welcome to LARP, ${name}. Your portfolio is initialized.`, 'gold');
    navigate('/app/dashboard');
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 flex items-center justify-center bg-ivory text-charcoal">
      <div className="w-full max-w-md bg-white rounded-2xl border border-stone-light p-8 md:p-10 shadow-luxury">
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
            Create Studio Account
          </h1>
          <p className="text-xs text-graphite mt-1">
            Begin transforming your personal horology photography.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs uppercase tracking-wider text-charcoal font-medium block mb-1.5">
              Full Legal Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-stone-dark absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Alexandre Laurent"
                className="w-full bg-parchment/40 border border-stone-light rounded-xl pl-10 pr-4 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
              />
            </div>
          </div>

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
                placeholder="e.g. alexandre@atelier.ch"
                className="w-full bg-parchment/40 border border-stone-light rounded-xl pl-10 pr-4 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-wider text-charcoal font-medium block mb-1.5">
              Secure Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-dark absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-parchment/40 border border-stone-light rounded-xl pl-10 pr-4 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          <div className="flex items-start gap-2 pt-1 text-xs text-graphite">
            <input
              type="checkbox"
              id="terms"
              required
              checked={acceptedTerms}
              onChange={e => setAcceptedTerms(e.target.checked)}
              className="mt-0.5 rounded border-stone-light text-charcoal focus:ring-gold"
            />
            <label htmlFor="terms" className="cursor-pointer">
              I agree to the Digital Transformation Charter and understand generated imagery represents simulated visualizations.
            </label>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-charcoal hover:bg-espresso text-ivory text-xs uppercase tracking-[0.18em] font-medium transition-all shadow-md flex items-center justify-center gap-2 border border-charcoal hover:border-gold/40"
            >
              <span>Create Account</span>
              <ArrowRight className="w-4 h-4 text-gold" />
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-stone-light text-center text-xs text-graphite">
          <span>Already have an account? </span>
          <Link to="/signin" className="text-gold-dark font-medium hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

