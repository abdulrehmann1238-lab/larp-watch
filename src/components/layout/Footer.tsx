import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { showToast } = useApp();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please enter a valid email address.', 'info');
      return;
    }
    setIsSubscribed(true);
    showToast('Subscribed to LARP Horology Gazette.', 'gold');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-espresso text-ivory border-t border-gold/20 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-ivory/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <Link to="/" className="inline-flex items-center gap-2.5 mb-4 group">
                <div className="w-7 h-7 rounded-full border border-gold/80 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                </div>
                <span className="text-2xl font-editorial-heading tracking-[0.25em] text-ivory font-medium">
                  LARP
                </span>
              </Link>
              <p className="text-sm font-sans text-stone-dark leading-relaxed max-w-sm mt-2">
                Redefining the relationship between personal photography and the world's finest timepieces. Photorealistic neural transformation with photographic authenticity.
              </p>
            </div>

            {/* Newsletter Subscription */}
            <div className="mt-8">
              <span className="text-[10px] tracking-[0.2em] uppercase font-sans text-gold/90 font-medium block mb-2">
                The Horology Gazette
              </span>
              <p className="text-xs text-stone-dark mb-3">
                Receive private curations on rare complications and technology releases.
              </p>
              {isSubscribed ? (
                <div className="flex items-center gap-2 text-xs text-sage py-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Welcome to the circle. Private editions dispatched seasonally.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex max-w-sm">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={e => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 bg-warmblack/60 border border-stone-dark/40 rounded-l-lg px-3.5 py-2.5 text-xs text-ivory placeholder:text-stone-dark/60 focus:outline-none focus:border-gold/70"
                  />
                  <button
                    type="submit"
                    className="bg-gold hover:bg-gold-light text-charcoal px-4 rounded-r-lg text-xs uppercase tracking-wider font-semibold flex items-center transition-colors"
                    aria-label="Subscribe to newsletter"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Explore Links */}
          <div className="flex flex-col gap-3">
            <span className="text-[11px] uppercase tracking-[0.2em] font-sans text-gold font-medium mb-1">
              Explore
            </span>
            <Link to="/#experience" className="text-xs text-stone-light hover:text-ivory transition-colors">
              The Experience
            </Link>
            <Link to="/how-it-works" className="text-xs text-stone-light hover:text-ivory transition-colors">
              How It Works
            </Link>
            <Link to="/collection" className="text-xs text-stone-light hover:text-ivory transition-colors">
              Watch Collection
            </Link>
            <Link to="/showcase" className="text-xs text-stone-light hover:text-ivory transition-colors">
              Transformation Showcase
            </Link>
            <Link to="/pricing" className="text-xs text-stone-light hover:text-ivory transition-colors">
              Membership Tiers
            </Link>
          </div>

          {/* Studio & Account */}
          <div className="flex flex-col gap-3">
            <span className="text-[11px] uppercase tracking-[0.2em] font-sans text-gold font-medium mb-1">
              Studio & Account
            </span>
            <Link to="/app/upload" className="text-xs text-stone-light hover:text-ivory transition-colors">
              Upload Wrist Photo
            </Link>
            <Link to="/app/dashboard" className="text-xs text-stone-light hover:text-ivory transition-colors">
              User Dashboard
            </Link>
            <Link to="/app/gallery" className="text-xs text-stone-light hover:text-ivory transition-colors">
              Saved Projects
            </Link>
            <Link to="/app/subscription" className="text-xs text-stone-light hover:text-ivory transition-colors">
              Subscription
            </Link>
            <Link to="/signin" className="text-xs text-stone-light hover:text-ivory transition-colors">
              Member Sign In
            </Link>
            <Link to="/admin" className="text-xs text-stone-light/70 hover:text-gold transition-colors flex items-center gap-1">
              <span>Admin Demonstration</span>
            </Link>
          </div>

          {/* Company & Assurance */}
          <div className="flex flex-col gap-3">
            <span className="text-[11px] uppercase tracking-[0.2em] font-sans text-gold font-medium mb-1">
              Company
            </span>
            <Link to="/about" className="text-xs text-stone-light hover:text-ivory transition-colors">
              About LARP
            </Link>
            <Link to="/faq" className="text-xs text-stone-light hover:text-ivory transition-colors">
              FAQ & Precision
            </Link>
            <Link to="/contact" className="text-xs text-stone-light hover:text-ivory transition-colors">
              Contact Concierge
            </Link>
            <span className="text-xs text-stone-dark">Geneva · Paris · Tokyo</span>
          </div>
        </div>

        {/* Digital Modification Legal Disclosure */}
        <div className="py-6 flex items-start gap-3 text-[11px] text-stone-dark leading-relaxed border-b border-ivory/5">
          <ShieldAlert className="w-4 h-4 text-gold/70 shrink-0 mt-0.5" />
          <p>
            <strong>Editorial & Digital Modification Notice:</strong> LARP is a proprietary photographic visualization and horological styling platform. Timepiece images created with LARP are digital transformations and do not represent verified certificates of physical possession, retail warranty, or physical watch appraisal. All trademarks, logos, and model names belong to their respective manufacture houses.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-dark">
          <div>
            © {new Date().getFullYear()} LARP Technologies S.A. All rights reserved. Handcrafted for Swiss Horology.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/faq" className="hover:text-stone-light transition-colors">Privacy Charter</Link>
            <Link to="/faq" className="hover:text-stone-light transition-colors">Terms of Service</Link>
            <Link to="/faq" className="hover:text-stone-light transition-colors">Authenticity Disclosures</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

