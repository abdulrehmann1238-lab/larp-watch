import React, { useState } from 'react';
import { Check, Sparkles, ShieldCheck, HelpCircle } from 'lucide-react';
import { PRICING_PLANS, PRICING_FAQS } from '../../data/pricing';
import { useApp } from '../../context/AppContext';

export const PricingPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const { user, openUpgradeModal, setUserTier } = useApp();

  return (
    <div className="pt-28 pb-24 bg-ivory text-charcoal">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="label-tracking text-gold-dark text-[10px] block mb-2">
            MEMBERSHIP TIERS
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-editorial-heading font-medium text-charcoal">
            Find your perfect way to experience LARP.
          </h1>
          <p className="mt-4 text-base md:text-lg text-graphite font-sans leading-relaxed">
            From your first transformation to your personal watch photography collection.
          </p>

          {/* Billing Toggle */}
          <div className="mt-8 inline-flex items-center p-1 rounded-full bg-parchment border border-stone-light">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-full text-xs font-sans uppercase tracking-wider font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-charcoal text-ivory shadow-xs'
                  : 'text-graphite hover:text-charcoal'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-5 py-2 rounded-full text-xs font-sans uppercase tracking-wider font-medium transition-all flex items-center gap-2 ${
                billingCycle === 'annual'
                  ? 'bg-charcoal text-ivory shadow-xs'
                  : 'text-graphite hover:text-charcoal'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold text-charcoal font-semibold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-20">
          {PRICING_PLANS.map(plan => {
            const isCurrent = user.tier.toLowerCase() === plan.id;
            const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
            const tierTitle = plan.id === 'free' ? 'Free' : plan.id === 'premium' ? 'Premium' : 'Elite';

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-8 flex flex-col justify-between transition-all ${
                  plan.popular
                    ? 'border-2 border-gold bg-white shadow-luxury ring-1 ring-gold/40'
                    : 'border border-stone-light bg-parchment/50'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gold text-charcoal text-[10px] uppercase tracking-widest font-bold shadow-sm">
                    Recommended for Collectors
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-editorial-heading text-2xl font-medium text-charcoal">
                      {plan.name}
                    </h3>
                    {isCurrent && (
                      <span className="text-[10px] uppercase font-sans text-sage font-medium px-2.5 py-1 rounded bg-sage/10">
                        Active Plan
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-graphite min-h-[36px] leading-relaxed">
                    {plan.tagline}
                  </p>

                  <div className="mt-6 pb-6 border-b border-stone-light/70">
                    <span className="text-4xl font-editorial-heading font-medium text-charcoal">
                      ${price}
                    </span>
                    <span className="text-xs text-graphite ml-1">/ month</span>
                    <p className="text-[11px] text-stone-dark mt-1 font-mono">
                      {plan.transformations}
                    </p>
                  </div>

                  {/* Feature List */}
                  <ul className="mt-6 flex flex-col gap-3 text-xs text-graphite">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-10 pt-4 border-t border-stone-light/60">
                  <button
                    onClick={() => {
                      if (!isCurrent) {
                        openUpgradeModal();
                      }
                    }}
                    className={`w-full py-3.5 px-4 rounded-xl text-xs uppercase tracking-[0.16em] font-medium transition-all ${
                      isCurrent
                        ? 'bg-stone-light/60 text-stone-dark cursor-default'
                        : plan.popular
                        ? 'bg-charcoal hover:bg-espresso text-ivory border border-gold/40 shadow-sm'
                        : 'bg-stone-light hover:bg-stone text-charcoal'
                    }`}
                  >
                    {isCurrent ? 'Current Plan' : `Experience ${tierTitle}`}
                  </button>
                  <p className="text-[10px] text-center text-stone-dark mt-2">
                    {plan.id === 'free' ? 'No payment details required' : 'Simulated demo billing • Cancel anytime'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Comparison Matrix */}
        <div className="bg-white rounded-2xl border border-stone-light p-8 md:p-10 shadow-luxury mb-20">
          <h3 className="font-editorial-heading text-2xl font-medium text-charcoal mb-6">
            Detailed Horology Matrix
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-light text-stone-dark uppercase tracking-wider text-[10px]">
                  <th className="pb-4 font-normal">Capability</th>
                  <th className="pb-4 font-normal">Explore (Free)</th>
                  <th className="pb-4 font-medium text-gold-dark">Discover (Premium)</th>
                  <th className="pb-4 font-normal">Experience (Elite)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-light/50">
                <tr>
                  <td className="py-4 font-medium text-charcoal">Monthly Transformations</td>
                  <td className="py-4 text-graphite">3 / month</td>
                  <td className="py-4 text-charcoal font-medium">25 / month</td>
                  <td className="py-4 text-gold-dark font-medium">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-4 font-medium text-charcoal">Maximum Export Resolution</td>
                  <td className="py-4 text-graphite">1080p Web</td>
                  <td className="py-4 text-charcoal font-medium">4K Ultra (300 DPI)</td>
                  <td className="py-4 text-gold-dark font-medium">8K Master Grade</td>
                </tr>
                <tr>
                  <td className="py-4 font-medium text-charcoal">Catalog Scope</td>
                  <td className="py-4 text-graphite">12 Core Classics</td>
                  <td className="py-4 text-charcoal font-medium">150+ References</td>
                  <td className="py-4 text-gold-dark font-medium">Complete Archive + Bespoke</td>
                </tr>
                <tr>
                  <td className="py-4 font-medium text-charcoal">Dial & Strap Customization</td>
                  <td className="py-4 text-graphite">Base Finishes</td>
                  <td className="py-4 text-charcoal font-medium">All Official Finishes</td>
                  <td className="py-4 text-gold-dark font-medium">Piece-Unique Atelier</td>
                </tr>
                <tr>
                  <td className="py-4 font-medium text-charcoal">Ray-traced Lighting Solver</td>
                  <td className="py-4 text-graphite">Standard</td>
                  <td className="py-4 text-charcoal font-medium">Bidirectional Specular</td>
                  <td className="py-4 text-gold-dark font-medium">Full Macro Reflection Array</td>
                </tr>
                <tr>
                  <td className="py-4 font-medium text-charcoal">Portfolio Project Archive</td>
                  <td className="py-4 text-graphite">Up to 5 Projects</td>
                  <td className="py-4 text-charcoal font-medium">Unlimited</td>
                  <td className="py-4 text-gold-dark font-medium">Unlimited + RAW History</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Pricing FAQs */}
        <div className="max-w-3xl mx-auto">
          <h3 className="font-editorial-heading text-2xl font-medium text-center text-charcoal mb-8">
            Frequently Asked Questions
          </h3>

          <div className="space-y-4">
            {PRICING_FAQS.map((faq, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-parchment/60 border border-stone-light">
                <h4 className="font-editorial-heading text-lg font-medium text-charcoal mb-2">
                  {faq.question}
                </h4>
                <p className="text-xs text-graphite leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

