import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  LayoutDashboard,
  Upload,
  Search,
  Sliders,
  Images,
  CreditCard,
  Settings,
  Compass,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Shield,
  Layers,
  Clock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AppLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, openUpgradeModal } = useApp();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const sidebarLinks = [
    { label: 'Overview', path: '/app/dashboard', icon: LayoutDashboard },
    { label: 'New Transformation', path: '/app/upload', icon: Upload, highlight: true },
    { label: 'Watch Identification', path: '/app/identify', icon: Search },
    { label: 'Matching Results', path: '/app/matches', icon: Layers },
    { label: 'Watch Studio', path: '/app/studio', icon: Sliders },
    { label: 'Comparison & Export', path: '/app/results', icon: Sparkles },
    { label: 'My Projects', path: '/app/gallery', icon: Images },
    { label: 'Watch Collection', path: '/collection', icon: Compass },
    { label: 'Subscription', path: '/app/subscription', icon: CreditCard },
    { label: 'Settings', path: '/app/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-parchment text-charcoal flex flex-col md:flex-row antialiased selection:bg-gold-subtle">
      {/* Desktop Luxury Sidebar */}
      <aside className="hidden md:flex flex-col justify-between w-64 lg:w-72 bg-ivory border-r border-stone-light/70 h-screen sticky top-0 shrink-0 z-30">
        <div className="p-6">
          {/* Brand Mark */}
          <Link to="/" className="flex items-center gap-2.5 pb-6 border-b border-stone-light/60 group">
            <div className="w-7 h-7 rounded-full border border-gold/80 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-gold" />
            </div>
            <div>
              <span className="text-2xl font-editorial-heading font-medium tracking-[0.25em] text-charcoal block leading-none">
                LARP
              </span>
              <span className="text-[8px] uppercase tracking-[0.2em] text-graphite font-sans">
                Creative Studio
              </span>
            </div>
          </Link>

          {/* Quick Primary Transformation CTA */}
          <div className="mt-5">
            <Link
              to="/app/upload"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-charcoal hover:bg-espresso text-ivory text-xs uppercase tracking-[0.15em] font-medium transition-all shadow-sm group border border-charcoal hover:border-gold/30"
            >
              <Upload className="w-3.5 h-3.5 text-gold group-hover:scale-110 transition-transform" />
              <span>New Photo</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 flex flex-col gap-1 overflow-y-auto max-h-[calc(100vh-340px)] pr-1">
            <span className="text-[9px] uppercase tracking-[0.22em] text-stone-dark font-sans px-3 mb-1">
              Workspace
            </span>
            {sidebarLinks.map(link => {
              const isActive = location.pathname === link.path;
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-sans tracking-wide transition-all ${
                    isActive
                      ? 'bg-stone-light/60 text-charcoal font-semibold shadow-xs border-l-2 border-gold pl-2.5'
                      : 'text-graphite hover:text-charcoal hover:bg-stone-light/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-gold' : 'text-stone-dark'}`} />
                    <span>{link.label}</span>
                  </div>
                  {link.highlight && !isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Profile Section */}
        <div className="p-4 border-t border-stone-light/70 bg-ivory-50/50">
          {/* Credit Counter Pill */}
          <div
            onClick={openUpgradeModal}
            className="flex items-center justify-between p-2.5 mb-3 rounded-lg bg-parchment/80 border border-stone-light cursor-pointer hover:border-gold/40 transition-colors group"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <div className="text-[11px]">
                <span className="font-semibold text-charcoal">{user.transformationsRemaining}</span>
                <span className="text-graphite ml-1">Credits</span>
              </div>
            </div>
            <span className="text-[10px] text-gold font-medium uppercase tracking-wider group-hover:underline">
              {user.tier} Tier
            </span>
          </div>

          {/* User info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover border border-stone shrink-0"
              />
              <div className="min-w-0">
                <p className="text-xs font-medium text-charcoal truncate">
                  {user.name}
                </p>
                <p className="text-[10px] text-graphite truncate font-mono">
                  {user.tier} Member
                </p>
              </div>
            </div>

            <Link
              to="/"
              className="text-stone-dark hover:text-charcoal p-1.5 rounded hover:bg-stone-light/40 transition-colors"
              title="Return to Public Site"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <header className="md:hidden flex items-center justify-between p-4 bg-ivory border-b border-stone-light sticky top-0 z-30">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full border border-gold flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-gold" />
          </div>
          <span className="text-xl font-editorial-heading font-medium tracking-[0.2em]">
            LARP
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            to="/app/upload"
            className="px-3 py-1.5 rounded-full bg-charcoal text-ivory text-[11px] uppercase tracking-wider font-medium"
          >
            + Transform
          </Link>
          <button
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            className="p-1.5 text-charcoal rounded-md"
            aria-label="Toggle workspace navigation"
          >
            {isMobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      {isMobileNavOpen && (
        <div className="fixed inset-0 top-[61px] z-40 bg-ivory/95 backdrop-blur-md md:hidden p-6 flex flex-col justify-between overflow-y-auto">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] uppercase tracking-widest text-stone-dark mb-2">Workspace Navigation</span>
            {sidebarLinks.map(link => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileNavOpen(false)}
                  className="flex items-center gap-3 py-3 text-sm font-sans text-charcoal border-b border-stone-light/40"
                >
                  <Icon className="w-4 h-4 text-gold" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-6 border-t border-stone-light flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
              <div>
                <p className="text-xs font-semibold">{user.name}</p>
                <p className="text-[10px] text-graphite">{user.tier} Tier</p>
              </div>
            </div>
            <Link to="/" onClick={() => setIsMobileNavOpen(false)} className="text-xs text-gold uppercase tracking-wider">
              Exit to Homepage
            </Link>
          </div>
        </div>
      )}

      {/* Main App Content Viewport */}
      <main className="flex-1 min-h-[calc(100vh-61px)] md:min-h-screen overflow-x-hidden flex flex-col">
        <Outlet />
      </main>
    </div>
  );
};

