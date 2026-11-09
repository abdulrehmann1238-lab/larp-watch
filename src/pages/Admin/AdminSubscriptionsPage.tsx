import React from 'react';
import { CreditCard, TrendingUp, DollarSign, Users, Award, ShieldCheck } from 'lucide-react';
import { PRICING_PLANS } from '../../data/pricing';
import { ADMIN_STATS_DATA } from '../../data/admin';

export const AdminSubscriptionsPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-ivory/10">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-gold block mb-1">
            REVENUE INTELLIGENCE & MEMBERSHIP TIERS
          </span>
          <h1 className="text-3xl font-editorial-heading font-medium text-ivory">
            Subscription Financials & Cohorts.
          </h1>
          <p className="text-xs text-stone-dark mt-0.5">
            Breakdown of MRR, tier distribution, lifetime value, and churn rates across global horology studios.
          </p>
        </div>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-espresso border border-gold/20">
          <span className="text-[10px] uppercase font-mono text-stone-dark block">Monthly Recurring (MRR)</span>
          <span className="text-3xl font-editorial-heading font-medium text-ivory mt-1 block">$148,200</span>
          <span className="text-[10px] text-sage font-mono mt-0.5 block">+18.4% vs last quarter</span>
        </div>

        <div className="p-4 rounded-xl bg-espresso border border-gold/20">
          <span className="text-[10px] uppercase font-mono text-stone-dark block">Annual Run Rate (ARR)</span>
          <span className="text-3xl font-editorial-heading font-medium text-ivory mt-1 block">$1.78M</span>
          <span className="text-[10px] text-gold font-mono mt-0.5 block">Projected 2026/2027</span>
        </div>

        <div className="p-4 rounded-xl bg-espresso border border-gold/20">
          <span className="text-[10px] uppercase font-mono text-stone-dark block">Paid Subscriber Base</span>
          <span className="text-3xl font-editorial-heading font-medium text-ivory mt-1 block">3,820</span>
          <span className="text-[10px] text-stone-light font-mono mt-0.5 block">26.7% Conversion rate</span>
        </div>

        <div className="p-4 rounded-xl bg-espresso border border-gold/20">
          <span className="text-[10px] uppercase font-mono text-stone-dark block">Net Revenue Churn</span>
          <span className="text-3xl font-editorial-heading font-medium text-sage mt-1 block">0.8%</span>
          <span className="text-[10px] text-sage font-mono mt-0.5 block">World-class luxury retention</span>
        </div>
      </div>

      {/* Plan Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PRICING_PLANS.map(plan => {
          const count = plan.id === 'free' ? 10460 : plan.id === 'premium' ? 2940 : 880;
          const rev = plan.id === 'free' ? '$0' : plan.id === 'premium' ? '$85,260' : '$69,520';

          return (
            <div key={plan.id} className="p-6 rounded-2xl bg-espresso border border-gold/20 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-gold">{plan.name} Tier</span>
                  <span className="font-mono text-stone-dark">${plan.monthlyPrice}/mo</span>
                </div>
                <h3 className="font-editorial-heading text-2xl font-medium text-ivory mt-1">
                  {count.toLocaleString()} <span className="text-xs font-sans text-stone-dark">Members</span>
                </h3>
                <p className="text-xs text-stone-dark mt-1 font-mono">
                  Monthly Revenue: <strong className="text-gold font-medium">{rev}</strong>
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-ivory/10 text-[11px] text-stone-light space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-stone-dark">Allowance:</span>
                  <span className="font-mono">{plan.transformations}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-dark">Max Export:</span>
                  <span className="font-mono">{plan.exportQuality.split(' ')[0]}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

