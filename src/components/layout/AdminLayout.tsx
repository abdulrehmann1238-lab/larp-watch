import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  Watch, 
  Activity, 
  CreditCard, 
  ShieldCheck, 
  ArrowLeft,
  Search,
  Bell,
  Sparkles,
  Sliders,
  Menu,
  X
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const adminNav = [
    { label: 'Executive Overview', path: '/admin', icon: BarChart3 },
    { label: 'User Directory', path: '/admin/users', icon: Users },
    { label: 'Watch Catalog Registry', path: '/admin/catalog', icon: Watch },
    { label: 'Transformation Queue', path: '/admin/transformations', icon: Activity },
    { label: 'Subscriptions & MRR', path: '/admin/subscriptions', icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-warmblack text-ivory flex flex-col md:flex-row antialiased font-sans">
      {/* Admin Sidebar */}
      <aside className="hidden md:flex flex-col justify-between w-64 bg-espresso border-r border-gold/20 h-screen sticky top-0 shrink-0 z-30">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-ivory/10">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full border border-gold flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-gold" />
              </div>
              <div>
                <span className="text-xl font-editorial-heading font-medium tracking-[0.2em] text-ivory">
                  LARP
                </span>
                <span className="text-[8px] uppercase tracking-widest text-gold block font-mono">
                  Console S.A.
                </span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-gold/15 text-gold text-[9px] uppercase tracking-widest font-mono border border-gold/30">
              Demo
            </span>
          </div>

          {/* Navigation */}
          <nav className="mt-6 flex flex-col gap-1.5">
            <span className="text-[9px] uppercase tracking-widest text-stone-dark font-sans px-2 mb-1">
              Supervision
            </span>
            {adminNav.map(item => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-sans tracking-wide transition-all ${
                    isActive
                      ? 'bg-gold/15 text-gold font-medium border border-gold/30'
                      : 'text-stone-light/70 hover:text-ivory hover:bg-ivory/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-gold' : 'text-stone-dark'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Link Back to Public Workspace */}
        <div className="p-5 border-t border-ivory/10 bg-warmblack/40">
          <Link
            to="/app/dashboard"
            className="flex items-center gap-2 text-xs text-stone-light hover:text-gold transition-colors py-2 px-3 rounded-lg hover:bg-ivory/5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to User Studio</span>
          </Link>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 bg-espresso border-b border-gold/20 sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full border border-gold flex items-center justify-center">
            <div className="w-1 rounded-full bg-gold" />
          </div>
          <span className="text-lg font-editorial-heading tracking-widest">LARP Admin</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 text-stone-light hover:text-ivory"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[57px] z-40 bg-espresso/98 md:hidden p-6 flex flex-col justify-between">
          <div className="flex flex-col gap-2">
            {adminNav.map(item => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 text-sm text-stone-light hover:text-gold border-b border-ivory/10 flex items-center gap-3"
              >
                <item.icon className="w-4 h-4 text-gold" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
          <Link
            to="/app/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="py-3 text-center text-xs text-gold uppercase tracking-widest border border-gold/40 rounded-lg"
          >
            Return to User Studio
          </Link>
        </div>
      )}

      {/* Admin Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Top bar */}
        <div className="h-14 border-b border-gold/15 px-6 md:px-8 flex items-center justify-between bg-espresso/50 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-xs text-stone-dark">
            <ShieldCheck className="w-4 h-4 text-gold" />
            <span className="font-mono text-[11px]">ADMINISTRATIVE CONSOLE • REGION: EUROPE-WEST1 (GENEVA)</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5 text-sage">
              <span className="w-2 h-2 rounded-full bg-sage animate-pulse" />
              <span className="text-[11px] font-mono">NEURAL PIPELINE HEALTHY (99.4%)</span>
            </div>
          </div>
        </div>

        <main className="p-6 md:p-10 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

