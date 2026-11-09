import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useApp();

  // Scroll detection for navbar background transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'The Experience', path: '/#experience' },
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'Watch Collection', path: '/collection' },
    { label: 'Showcase', path: '/showcase' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'About', path: '/about' },
  ];

  const isLightHero = location.pathname !== '/' && !location.pathname.startsWith('/app');

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-ivory/95 backdrop-blur-md border-b border-stone-light/60 py-3.5 shadow-sm'
            : isLightHero
            ? 'bg-ivory/80 backdrop-blur-sm border-b border-stone-light/40 py-5'
            : 'bg-gradient-to-b from-warmblack/70 via-warmblack/30 to-transparent py-5 text-ivory'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Brand Wordmark */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group"
          >
            <div className={`w-7 h-7 rounded-full border flex items-center justify-center transition-colors ${
              isScrolled || isLightHero
                ? 'border-gold text-charcoal'
                : 'border-gold/80 text-ivory'
            }`}>
              <div className="w-1.5 h-1.5 rounded-full bg-gold" />
            </div>
            <div className="flex flex-col">
              <span className={`text-2xl font-editorial-heading font-medium tracking-[0.2em] leading-none ${
                isScrolled || isLightHero ? 'text-charcoal' : 'text-ivory'
              }`}>
                LARP
              </span>
              <span className={`text-[8px] tracking-[0.25em] uppercase font-sans mt-0.5 ${
                isScrolled || isLightHero ? 'text-graphite' : 'text-stone-light'
              }`}>
                Haute Horlogerie
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`text-xs uppercase tracking-[0.18em] transition-colors relative py-1 font-sans ${
                    isScrolled || isLightHero
                      ? isActive
                        ? 'text-charcoal font-semibold'
                        : 'text-graphite hover:text-charcoal'
                      : isActive
                      ? 'text-ivory font-semibold'
                      : 'text-stone-light hover:text-ivory'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-gold" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-5">
            <Link
              to="/signin"
              className={`text-xs uppercase tracking-[0.16em] font-sans transition-colors ${
                isScrolled || isLightHero
                  ? 'text-graphite hover:text-charcoal'
                  : 'text-stone-light hover:text-ivory'
              }`}
            >
              Sign In
            </Link>

            <Link
              to="/app/upload"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-charcoal text-ivory text-xs uppercase tracking-[0.15em] font-medium border border-charcoal hover:bg-espresso hover:border-gold/40 transition-all shadow-sm hover:shadow-md group"
            >
              <span>Transform Photo</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isScrolled || isLightHero ? 'text-charcoal hover:bg-stone-light/50' : 'text-ivory hover:bg-warmblack/50'
            }`}
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col bg-ivory text-charcoal">
          <div className="flex items-center justify-between p-6 border-b border-stone-light">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full border border-gold flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-gold" />
              </div>
              <span className="text-xl font-editorial-heading font-medium tracking-[0.2em]">
                LARP
              </span>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-charcoal hover:bg-stone-light/40 rounded-lg"
              aria-label="Close Menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 px-8 py-8 flex flex-col justify-between overflow-y-auto">
            <div className="flex flex-col gap-6">
              <span className="text-[10px] tracking-[0.25em] uppercase text-stone-dark font-sans">
                Navigation
              </span>
              {navLinks.map(link => (
                <Link
                  key={link.label}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-editorial-heading text-charcoal hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/faq"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-editorial-heading text-charcoal hover:text-gold transition-colors"
              >
                FAQ & Horology
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-editorial-heading text-charcoal hover:text-gold transition-colors"
              >
                Contact Concierge
              </Link>
            </div>

            <div className="pt-8 border-t border-stone-light flex flex-col gap-3">
              <Link
                to="/app/upload"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center py-3.5 rounded-full bg-charcoal text-ivory text-xs uppercase tracking-[0.18em] font-medium"
              >
                Start Transformation
              </Link>
              <div className="flex items-center justify-between pt-2">
                <Link
                  to="/signin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xs uppercase tracking-widest text-graphite hover:text-charcoal"
                >
                  Sign In
                </Link>
                <Link
                  to="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xs uppercase tracking-widest text-gold hover:underline flex items-center gap-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Admin Portal
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

