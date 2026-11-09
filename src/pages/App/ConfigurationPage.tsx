import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Check, Sliders, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LUXURY_WATCHES } from '../../data/watches';

export const ConfigurationPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedWatch, watchConfig, updateWatchConfig, showToast } = useApp();

  const watch = selectedWatch || LUXURY_WATCHES[6];

  // Available options
  const dials = watch.availableDials || ['Black', 'Silver', 'Sunburst Olive Green', 'Bleu Nuit'];
  const cases = watch.availableCases || ['18ct Red Gold', 'Stainless Steel', 'Platinum'];
  const straps = watch.availableStraps || ['Hand-sewn Chocolate Alligator', 'Integrated Steel', 'Oysterflex Rubber'];

  const handleSelectDial = (dial: string) => {
    updateWatchConfig({ dialColor: dial });
    showToast(`Dial configuration set to: ${dial}`, 'info');
  };

  const handleSelectCase = (cMaterial: string) => {
    updateWatchConfig({ caseMaterial: cMaterial });
    showToast(`Case metal alloy set to: ${cMaterial}`, 'info');
  };

  const handleSelectStrap = (strap: string) => {
    updateWatchConfig({ braceletType: strap });
    showToast(`Bracelet configuration set to: ${strap}`, 'info');
  };

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto w-full flex flex-col gap-8">
      {/* Header */}
      <div>
        <span className="label-tracking text-gold-dark text-[10px] block mb-1">
          PERSONALIZATION ATELIER • STEP 04 OF 04
        </span>
        <h1 className="text-3xl md:text-4xl font-editorial-heading font-medium text-charcoal">
          Configure Your Timepiece.
        </h1>
        <p className="text-xs md:text-sm text-graphite font-sans mt-1">
          Select authentic manufacture finishes for the dial, case metallurgy, and bracelet prior to transformation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Preview Display */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-stone-light p-6 md:p-8 shadow-luxury flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-stone-dark mb-4">
              <span className="label-tracking text-gold-dark text-[10px]">
                {watch.brand} Ateliers
              </span>
              <span className="font-mono text-[10px]">
                Ref. {watch.reference}
              </span>
            </div>

            <div className="relative aspect-square w-full rounded-2xl bg-parchment/60 p-8 flex items-center justify-center border border-stone-light/60 overflow-hidden mb-6">
              <img
                src={watch.imageUrl}
                alt={watch.model}
                className="max-h-full max-w-full object-contain filter drop-shadow-2xl transition-all duration-300 hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/images/blancpain_macro.jpg';
                }}
              />
            </div>

            <h3 className="font-editorial-heading text-2xl font-medium text-charcoal">
              {watch.brand} {watch.model}
            </h3>

            {/* Current Active Specs Capsule */}
            <div className="mt-4 p-4 rounded-xl bg-ivory border border-stone-light text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-stone-dark">Dial Finish:</span>
                <span className="font-medium text-charcoal">{watchConfig.dialColor || watch.dialColor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-dark">Case Metallurgy:</span>
                <span className="font-medium text-charcoal">{watchConfig.caseMaterial || watch.caseMaterial}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-dark">Bracelet / Strap:</span>
                <span className="font-medium text-charcoal">{watchConfig.braceletType || watch.braceletType}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-stone-light/60 flex items-center gap-2 text-xs text-stone-dark">
            <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
            <span>Specifications calibrated to factory manufacture tolerances.</span>
          </div>
        </div>

        {/* Right: Configuration Controls */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-stone-light p-6 md:p-8 shadow-luxury flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="font-editorial-heading text-xl font-medium text-charcoal">
              Atelier Finishes
            </h3>

            {/* Dial Selector */}
            <div>
              <label className="text-xs uppercase tracking-wider text-charcoal font-medium block mb-2">
                Dial Treatment & Hue
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {dials.map(dial => {
                  const isSelected = (watchConfig.dialColor || watch.dialColor) === dial;
                  return (
                    <button
                      key={dial}
                      type="button"
                      onClick={() => handleSelectDial(dial)}
                      className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-gold bg-parchment font-semibold text-charcoal ring-1 ring-gold/40'
                          : 'border-stone-light text-graphite hover:border-stone'
                      }`}
                    >
                      <span className="truncate">{dial}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-gold shrink-0 ml-1" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Case Metallurgy Selector */}
            <div>
              <label className="text-xs uppercase tracking-wider text-charcoal font-medium block mb-2">
                Case Metallurgy & Bezel
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {cases.map(cMat => {
                  const isSelected = (watchConfig.caseMaterial || watch.caseMaterial) === cMat;
                  return (
                    <button
                      key={cMat}
                      type="button"
                      onClick={() => handleSelectCase(cMat)}
                      className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-gold bg-parchment font-semibold text-charcoal ring-1 ring-gold/40'
                          : 'border-stone-light text-graphite hover:border-stone'
                      }`}
                    >
                      <span className="truncate">{cMat}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-gold shrink-0 ml-1" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bracelet / Strap Selector */}
            <div>
              <label className="text-xs uppercase tracking-wider text-charcoal font-medium block mb-2">
                Bracelet & Clasp Construction
              </label>
              <div className="space-y-2">
                {straps.map(strap => {
                  const isSelected = (watchConfig.braceletType || watch.braceletType) === strap;
                  return (
                    <button
                      key={strap}
                      type="button"
                      onClick={() => handleSelectStrap(strap)}
                      className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-gold bg-parchment font-semibold text-charcoal ring-1 ring-gold/40'
                          : 'border-stone-light text-graphite hover:border-stone'
                      }`}
                    >
                      <span className="truncate">{strap}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-gold shrink-0 ml-1" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Action CTA */}
          <div className="mt-8 pt-6 border-t border-stone-light">
            <button
              onClick={() => navigate('/app/studio')}
              className="w-full py-4 px-6 rounded-xl bg-charcoal hover:bg-espresso text-ivory text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-md flex items-center justify-center gap-2 border border-charcoal hover:border-gold/40"
            >
              <Sparkles className="w-4 h-4 text-gold" />
              <span>Enter Transformation Workspace</span>
              <ArrowRight className="w-4 h-4 text-stone-light" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

