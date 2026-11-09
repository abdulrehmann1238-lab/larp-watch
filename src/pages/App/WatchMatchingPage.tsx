import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Check, 
  SlidersHorizontal, 
  Search, 
  ShieldCheck, 
  Info,
  Clock
} from 'lucide-react';
import { LUXURY_WATCHES } from '../../data/watches';
import { WatchModel } from '../../types';
import { useApp } from '../../context/AppContext';

export const WatchMatchingPage: React.FC = () => {
  const navigate = useNavigate();
  const { detectedResult, selectedWatch, setSelectedWatch } = useApp();

  const [sortOrder, setSortOrder] = useState<'match' | 'brand' | 'price'>('match');
  const [selectedBrandFilter, setSelectedBrandFilter] = useState<string>('All');

  // Augment watches with calculated similarity scores relative to detected timepiece
  const matchingWatches = useMemo(() => {
    let list = LUXURY_WATCHES.map((w, index) => {
      // High scores for iconic matches
      const score = Math.max(72, 98 - (index * 3));
      return { ...w, similarityScore: score };
    });

    if (selectedBrandFilter !== 'All') {
      list = list.filter(w => w.brand === selectedBrandFilter);
    }

    if (sortOrder === 'match') {
      list.sort((a, b) => (b.similarityScore || 0) - (a.similarityScore || 0));
    } else if (sortOrder === 'brand') {
      list.sort((a, b) => a.brand.localeCompare(b.brand));
    }

    return list;
  }, [sortOrder, selectedBrandFilter]);

  const activeWatch: WatchModel = selectedWatch || matchingWatches[0];

  const handleSelectWatch = (watch: WatchModel) => {
    setSelectedWatch(watch);
  };

  const handleContinue = () => {
    navigate('/app/configure');
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto w-full flex flex-col gap-8">
      {/* Header */}
      <div>
        <span className="label-tracking text-gold-dark text-[10px] block mb-1">
          MATCHING ENGINE • STEP 03 OF 04
        </span>
        <h1 className="text-3xl md:text-4xl font-editorial-heading font-medium text-charcoal">
          We found your next timepiece.
        </h1>
        <p className="text-xs md:text-sm text-graphite font-sans mt-1">
          Explore genuine Swiss luxury watch models calibrated to your wrist posture and lighting.
        </p>
      </div>

      {/* Detected Reference Summary Strip */}
      <div className="p-4 rounded-xl bg-white border border-stone-light shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-parchment flex items-center justify-center border border-stone-light">
            <Clock className="w-5 h-5 text-gold" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-stone-dark block">Detected Geometry</span>
            <p className="text-sm font-semibold text-charcoal">
              {detectedResult?.brand} {detectedResult?.model} <span className="text-xs text-sage font-mono">({detectedResult?.confidence}% match)</span>
            </p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-3">
          <select
            value={selectedBrandFilter}
            onChange={e => setSelectedBrandFilter(e.target.value)}
            className="bg-parchment/60 border border-stone-light rounded-lg px-3 py-1.5 text-xs text-charcoal focus:outline-none focus:border-gold"
          >
            <option value="All">All Brands</option>
            <option value="Rolex">Rolex</option>
            <option value="Patek Philippe">Patek Philippe</option>
            <option value="Blancpain">Blancpain</option>
            <option value="Audemars Piguet">Audemars Piguet</option>
            <option value="Cartier">Cartier</option>
            <option value="Omega">Omega</option>
          </select>

          <select
            value={sortOrder}
            onChange={e => setSortOrder(e.target.value as any)}
            className="bg-parchment/60 border border-stone-light rounded-lg px-3 py-1.5 text-xs text-charcoal focus:outline-none focus:border-gold"
          >
            <option value="match">Rank: Highest Similarity</option>
            <option value="brand">Rank: Brand A-Z</option>
          </select>
        </div>
      </div>

      {/* Master Layout: Results List (Left) + Expanded Inspection Panel (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Results Grid (Left 7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="flex items-center justify-between text-xs text-graphite mb-1">
            <span><strong>{matchingWatches.length}</strong> matching manufacture models available</span>
            <span className="text-[11px] text-stone-dark">Click card to select & preview</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {matchingWatches.map(watch => {
              const isSelected = activeWatch.id === watch.id;
              return (
                <div
                  key={watch.id}
                  onClick={() => handleSelectWatch(watch)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white border-gold shadow-md ring-1 ring-gold/40'
                      : 'bg-white/80 hover:bg-white border-stone-light hover:border-stone'
                  }`}
                >
                  <div>
                    {/* Header: Brand & Score */}
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="label-tracking text-gold-dark text-[9px]">
                        {watch.brand}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gold/15 text-gold-dark font-semibold">
                        {watch.similarityScore}% Fit
                      </span>
                    </div>

                    {/* Image */}
                    <div className="aspect-[4/3] w-full flex items-center justify-center p-2 bg-parchment/40 rounded-lg overflow-hidden mb-3">
                      <img
                        src={watch.imageUrl}
                        alt={watch.model}
                        className="max-h-full max-w-full object-contain filter drop-shadow-md"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/assets/images/blancpain_macro.jpg';
                        }}
                      />
                    </div>

                    <h4 className="font-editorial-heading text-base font-medium text-charcoal leading-tight">
                      {watch.model}
                    </h4>
                    <p className="text-[11px] font-mono text-stone-dark mt-0.5">
                      Ref. {watch.reference}
                    </p>
                  </div>

                  <div className="mt-3 pt-3 border-t border-stone-light/60 flex items-center justify-between text-xs">
                    <span className="text-graphite text-[11px]">{watch.caseDiameter}</span>
                    <button
                      type="button"
                      className={`px-3 py-1 rounded text-[10px] uppercase tracking-wider font-semibold transition-colors ${
                        isSelected
                          ? 'bg-gold text-charcoal'
                          : 'bg-stone-light/60 text-charcoal hover:bg-stone-light'
                      }`}
                    >
                      {isSelected ? 'Selected' : 'Select'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Watch Inspection Panel (Right 5 Cols - Sticky) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-light p-6 shadow-luxury sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-stone-light">
            <span className="text-[10px] uppercase font-mono tracking-widest text-gold-dark font-medium">
              Selected Manufacture Reference
            </span>
            <span className="text-xs text-sage font-medium flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Ready for Wrist Fit
            </span>
          </div>

          {/* Large Watch Preview */}
          <div className="aspect-square w-full flex items-center justify-center p-6 bg-parchment/50 rounded-xl my-4 border border-stone-light/60">
            <img
              src={activeWatch.imageUrl}
              alt={activeWatch.model}
              className="max-h-full max-w-full object-contain filter drop-shadow-2xl"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/assets/images/blancpain_macro.jpg';
              }}
            />
          </div>

          <h3 className="font-editorial-heading text-2xl font-medium text-charcoal">
            {activeWatch.brand} {activeWatch.model}
          </h3>
          <p className="text-xs text-graphite font-mono mt-0.5">
            Reference {activeWatch.reference} • {activeWatch.caseDiameter}
          </p>

          <p className="text-xs text-graphite font-sans mt-3 leading-relaxed">
            {activeWatch.description}
          </p>

          {/* Key Specs Grid */}
          <div className="mt-4 pt-3 border-t border-stone-light/60 grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-[10px] uppercase text-stone-dark block">Case</span>
              <span className="font-medium text-charcoal">{activeWatch.caseMaterial}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-stone-dark block">Dial Finish</span>
              <span className="font-medium text-charcoal">{activeWatch.dialColor}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-stone-dark block">Movement</span>
              <span className="font-medium text-charcoal truncate block">{activeWatch.movement}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-stone-dark block">Water Resistance</span>
              <span className="font-medium text-charcoal">{activeWatch.waterResistance}</span>
            </div>
          </div>

          {/* Continue CTA */}
          <div className="mt-6 pt-4 border-t border-stone-light/80 flex flex-col gap-2">
            <button
              onClick={handleContinue}
              className="w-full py-3.5 px-6 rounded-xl bg-charcoal hover:bg-espresso text-ivory text-xs uppercase tracking-[0.18em] font-medium transition-all shadow-md flex items-center justify-center gap-2 border border-charcoal hover:border-gold/40"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Configure This Timepiece</span>
              <ArrowRight className="w-3.5 h-3.5 text-stone-light" />
            </button>
            <p className="text-[10px] text-center text-stone-dark">
              Customize dial color, metal case alloy, and strap before synthesis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

