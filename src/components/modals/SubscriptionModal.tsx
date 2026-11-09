import React, { useState } from 'react';
import { X, Check, Sparkles, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { PRICING_PLANS } from '../../data/pricing';

export const SubscriptionModal: React.FC = () => {
  const { isUpgradeModalOpen, closeUpgradeModal, user, setUserTier } = useApp();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [selectedPlanId, setSelectedPlanId] = useState<string>(user.tier.toLowerCase());

  if (!isUpgradeModalOpen) return null;

  const handleSelectPlan = (tierName: 'Free' | 'Premium' | 'Elite') => {
    setUserTier(tierName);
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#A58A5B', '#D8CCB8', '#24231F']
      });
    } catch (e) {}
    closeUpgradeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-espresso/80 backdrop-blur-sm animate-fade-in select-none">
      <div 
        className="relative w-full max-w-3xl bg-ivory rounded-2xl shadow-2xl border border-gold/40 p-6 md:p-8 max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeUpgradeModal}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-light/60 text-charcoal flex items-center justify-center hover:bg-stone-light transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center max-w-lg mx-auto">
          <span className="label-tracking text-gold-dark text-[10px]">
            Membership & Transformation Credits
          </span>
          <h2 className="text-2xl md:text-3xl font-editorial-heading font-medium text-charcoal mt-1">
            Choose Your Horology Tier
          </h2>
          <p className="text-xs text-graphite mt-2">
            Unlock high-resolution neural synthesis, rare complication access, and expanded portfolio archives.
          </p>

          {/* Monthly / Annual Toggle */}
          <div className="mt-4 inline-flex items-center p-1 rounded-full bg-stone-light/50 border border-stone-light">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-3 py-1 rounded-full text-[11px] font-sans font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-charcoal text-ivory shadow-xs'
                  : 'text-graphite hover:text-charcoal'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-3 py-1 rounded-full text-[11px] font-sans font-medium transition-all flex items-center gap-1.5 ${
                billingCycle === 'annual'
                  ? 'bg-charcoal text-ivory shadow-xs'
                  : 'text-graphite hover:text-charcoal'
              }`}
            >
              <span>Annual</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-gold text-charcoal font-semibold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Plan Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {PRICING_PLANS.map(plan => {
            const isCurrent = user.tier.toLowerCase() === plan.id;
            const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
            const tierTitle = plan.id === 'free' ? 'Free' : plan.id === 'premium' ? 'Premium' : 'Elite';

            return (
              <div
                key={plan.id}
                className={`relative rounded-xl p-5 border flex flex-col justify-between transition-all ${
                  plan.popular
                    ? 'border-gold bg-parchment/60 shadow-md ring-1 ring-gold/40'
                    : 'border-stone-light bg-ivory/80'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-gold text-charcoal text-[9px] uppercase tracking-wider font-semibold">
                    Most Popular
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-editorial-heading text-xl font-medium text-charcoal">
                      {plan.name}
                    </h3>
                    {isCurrent && (
                      <span className="text-[10px] uppercase font-sans text-sage font-medium px-2 py-0.5 rounded bg-sage/10">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-graphite mt-1 min-h-[32px]">
                    {plan.tagline}
                  </p>

                  <div className="mt-4 pb-4 border-b border-stone-light/60">
                    <span className="text-2xl font-editorial-heading font-medium text-charcoal">
                      ${price}
                    </span>
                    <span className="text-xs text-graphite ml-1">/ month</span>
                    <p className="text-[10px] text-stone-dark mt-0.5">
                      {plan.transformations}
                    </p>
                  </div>

                  <ul className="mt-4 flex flex-col gap-2 text-xs text-graphite">
                    {plan.features.slice(0, 4).map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                        <span className="text-[11px] leading-tight">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-2">
                  <button
                    onClick={() => handleSelectPlan(tierTitle)}
                    disabled={isCurrent}
                    className={`w-full py-2 px-3 rounded-lg text-xs uppercase tracking-wider font-medium transition-all ${
                      isCurrent
                        ? 'bg-stone-light/50 text-stone-dark cursor-default'
                        : plan.popular
                        ? 'bg-charcoal text-ivory hover:bg-espresso border border-gold/40 shadow-sm'
                        : 'bg-stone-light hover:bg-stone text-charcoal'
                    }`}
                  >
                    {isCurrent ? 'Current Plan' : `Activate ${tierTitle}`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Demo Disclaimer */}
        <div className="mt-6 p-3 rounded-lg bg-parchment border border-stone-light/70 flex items-center justify-center gap-2 text-center text-[11px] text-graphite">
          <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
          <span>
            <strong>Simulation Guarantee:</strong> LARP is a commercial demonstration. Selecting a tier instantly activates simulated credits without connecting credit cards or third-party gateways.
          </span>
        </div>
      </div>
    </div>
  );
};

