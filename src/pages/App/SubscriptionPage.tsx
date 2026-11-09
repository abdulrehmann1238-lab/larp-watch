import React, { useState } from 'react';
import { CreditCard, Sparkles, Check, ShieldCheck, AlertCircle, ArrowUpRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PRICING_PLANS } from '../../data/pricing';

export const SubscriptionPage: React.FC = () => {
  const { user, openUpgradeModal, setUserTier, showToast } = useApp();
  const [cancelModalOpen, setCancelModalOpen] = useState(false);

  const currentPlan = PRICING_PLANS.find(p => p.id === user.tier.toLowerCase()) || PRICING_PLANS[1];

  const handleCancel = () => {
    setUserTier('Free');
    setCancelModalOpen(false);
    showToast('Plan changed to Free Tier. (Simulation)', 'info');
  };

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto w-full flex flex-col gap-8">
      {/* Header */}
      <div>
        <span className="label-tracking text-gold-dark text-[10px] block mb-1">
          BILLING & ALLOCATIONS
        </span>
        <h1 className="text-3xl md:text-4xl font-editorial-heading font-medium text-charcoal">
          Subscription Management.
        </h1>
        <p className="text-xs md:text-sm text-graphite font-sans mt-0.5">
          Manage your horological tier, remaining transformation credits, and export allowances.
        </p>
      </div>

      {/* Current Plan Overview Card */}
      <div className="bg-white rounded-2xl border border-stone-light p-6 md:p-8 shadow-luxury">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-light gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono uppercase tracking-widest text-gold-dark font-medium">
                Current Active Tier
              </span>
              <span className="px-2 py-0.5 rounded-full bg-sage/10 text-sage text-[10px] font-mono font-bold">
                ACTIVE
              </span>
            </div>
            <h2 className="font-editorial-heading text-3xl font-medium text-charcoal">
              {currentPlan.name} Tier
            </h2>
            <p className="text-xs text-graphite mt-1">
              {currentPlan.tagline}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={openUpgradeModal}
              className="px-5 py-2.5 rounded-xl bg-charcoal hover:bg-espresso text-ivory text-xs uppercase tracking-wider font-medium shadow-sm transition-all flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Change / Upgrade Plan</span>
            </button>
          </div>
        </div>

        {/* Credit Meter & Key Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 border-b border-stone-light">
          <div>
            <span className="text-[10px] uppercase font-mono text-stone-dark block">Transformation Credits</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-editorial-heading font-medium text-charcoal">
                {user.transformationsRemaining}
              </span>
              <span className="text-xs text-graphite font-mono">
                / {user.tier === 'Elite' ? '∞' : user.tier === 'Premium' ? '25' : '3'} left
              </span>
            </div>
            <div className="w-full h-1.5 bg-stone-light rounded-full mt-2 overflow-hidden">
              <div 
                className="h-full bg-gold rounded-full"
                style={{ width: `${Math.min(100, (user.transformationsRemaining / 25) * 100)}%` }}
              />
            </div>
          </div>

          <div>
            <span className="text-[10px] uppercase font-mono text-stone-dark block">Next Billing Cycle</span>
            <span className="text-xl font-editorial-heading font-medium text-charcoal mt-1 block">
              Nov 30, 2026
            </span>
            <span className="text-xs text-graphite font-sans">
              Auto-renews monthly at ${currentPlan.monthlyPrice}/mo
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-mono text-stone-dark block">Export Capability</span>
            <span className="text-xl font-editorial-heading font-medium text-charcoal mt-1 block">
              {currentPlan.exportQuality.split(' ')[0]} {currentPlan.exportQuality.split(' ')[1]}
            </span>
            <span className="text-xs text-graphite font-sans">
              Full uncompressed color profile
            </span>
          </div>
        </div>

        {/* Plan Features Included */}
        <div className="pt-6">
          <span className="text-[10px] uppercase font-mono tracking-widest text-stone-dark block mb-3">
            INCLUDED HOROLOGICAL PRIVILEGES
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-graphite">
            {currentPlan.features.map((feat, i) => (
              <div key={i} className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Usage History Mock Log */}
      <div className="bg-white rounded-2xl border border-stone-light p-6 md:p-8 shadow-xs">
        <h3 className="font-editorial-heading text-xl font-medium text-charcoal mb-4">
          Recent Credit Invocations
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-light text-stone-dark uppercase text-[10px] font-mono">
                <th className="pb-3">Date</th>
                <th className="pb-3">Reference Model</th>
                <th className="pb-3">Resolution</th>
                <th className="pb-3">Credits Deducted</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-light/50 text-graphite">
              <tr>
                <td className="py-3 font-mono">Today, 01:14 AM</td>
                <td className="py-3 font-medium text-charcoal">Blancpain Villeret Tourbillon Carrousel</td>
                <td className="py-3 font-mono">4K (300 DPI)</td>
                <td className="py-3 font-mono text-charcoal">1 Credit</td>
                <td className="py-3 text-sage font-medium">Completed</td>
              </tr>
              <tr>
                <td className="py-3 font-mono">Nov 08, 02:30 PM</td>
                <td className="py-3 font-medium text-charcoal">Rolex Submariner Date 126610LN</td>
                <td className="py-3 font-mono">4K (300 DPI)</td>
                <td className="py-3 font-mono text-charcoal">1 Credit</td>
                <td className="py-3 text-sage font-medium">Completed</td>
              </tr>
              <tr>
                <td className="py-3 font-mono">Nov 06, 09:15 AM</td>
                <td className="py-3 font-medium text-charcoal">Patek Philippe Nautilus 5711/1A</td>
                <td className="py-3 font-mono">1080p Web</td>
                <td className="py-3 font-mono text-charcoal">1 Credit</td>
                <td className="py-3 text-sage font-medium">Completed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Cancellation Option (Simulated) */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-parchment/60 border border-stone-light text-xs">
        <div>
          <span className="font-semibold text-charcoal block">Need to pause or downgrade?</span>
          <span className="text-graphite">You can cancel or switch to the Free Explore plan at any time.</span>
        </div>
        <button
          onClick={() => setCancelModalOpen(true)}
          className="text-terracotta hover:underline font-medium uppercase tracking-wider text-[11px]"
        >
          Cancel Subscription
        </button>
      </div>

      {/* Cancel Confirmation Modal */}
      {cancelModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl border border-stone-light p-6 max-w-sm w-full shadow-2xl">
            <h3 className="font-editorial-heading text-xl font-medium text-charcoal mb-2">
              Downgrade to Free Tier?
            </h3>
            <p className="text-xs text-graphite mb-6 leading-relaxed">
              This will set your monthly allowance to 3 transformations. You will retain all your saved projects.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setCancelModalOpen(false)}
                className="py-2 px-4 rounded-lg text-xs uppercase tracking-wider text-charcoal hover:bg-stone-light"
              >
                Keep Current Plan
              </button>
              <button
                onClick={handleCancel}
                className="py-2 px-4 rounded-lg bg-terracotta text-white text-xs uppercase tracking-wider font-medium hover:bg-red-700 shadow-sm"
              >
                Confirm Downgrade
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

