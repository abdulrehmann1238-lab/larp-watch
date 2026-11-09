import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Heart, Sparkles, Check, ArrowRight, ShieldCheck, Compass } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WatchDetailModal: React.FC = () => {
  const { modalWatch, closeWatchModal, setSelectedWatch, toggleFavoriteWatch, isWatchFavorite } = useApp();
  const navigate = useNavigate();

  if (!modalWatch) return null;

  const isFav = isWatchFavorite(modalWatch.id);

  const handleTransformClick = () => {
    setSelectedWatch(modalWatch);
    closeWatchModal();
    navigate('/app/configure');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-espresso/80 backdrop-blur-sm animate-fade-in select-none">
      <div 
        className="relative w-full max-w-4xl bg-ivory rounded-2xl shadow-2xl border border-gold/30 overflow-hidden max-h-[92vh] flex flex-col md:flex-row"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={closeWatchModal}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-ivory/80 backdrop-blur-md text-charcoal border border-stone-light flex items-center justify-center hover:bg-stone-light transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Column: Watch Product Imagery */}
        <div className="w-full md:w-1/2 bg-parchment relative p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-stone-light/70">
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 rounded-full bg-ivory/90 text-[10px] uppercase font-sans tracking-widest text-gold-dark font-medium border border-stone-light">
              {modalWatch.brand} Manufacture
            </span>
          </div>

          <div className="relative w-full aspect-square max-w-sm flex items-center justify-center">
            <img
              src={modalWatch.imageUrl}
              alt={`${modalWatch.brand} ${modalWatch.model}`}
              className="max-h-full max-w-full object-contain filter drop-shadow-2xl transition-transform duration-500 hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/assets/images/blancpain_macro.jpg';
              }}
            />
          </div>

          {/* Reference tag */}
          <div className="mt-4 flex items-center gap-2 text-xs text-graphite font-mono">
            <span>Ref. {modalWatch.reference}</span>
            <span>•</span>
            <span>{modalWatch.dimensions}</span>
          </div>
        </div>

        {/* Right Column: Horological Specifications & Actions */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center justify-between">
              <span className="label-tracking text-gold-dark text-[11px]">
                {modalWatch.collection}
              </span>
              <button
                onClick={() => toggleFavoriteWatch(modalWatch.id)}
                className={`p-2 rounded-full border transition-colors ${
                  isFav
                    ? 'bg-gold/10 border-gold text-gold'
                    : 'border-stone-light text-stone-dark hover:text-charcoal'
                }`}
                title="Save to Wishlist"
              >
                <Heart className={`w-4 h-4 ${isFav ? 'fill-gold' : ''}`} />
              </button>
            </div>

            <h2 className="text-2xl md:text-3xl font-editorial-heading font-medium text-charcoal mt-1">
              {modalWatch.brand} {modalWatch.model}
            </h2>

            <p className="mt-3 text-xs md:text-sm text-graphite font-sans leading-relaxed">
              {modalWatch.description}
            </p>

            {/* Technical Specifications Grid */}
            <div className="mt-6 pt-4 border-t border-stone-light/60 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-stone-dark block">Case Diameter</span>
                <span className="font-medium text-charcoal">{modalWatch.caseDiameter}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-stone-dark block">Case Material</span>
                <span className="font-medium text-charcoal">{modalWatch.caseMaterial}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-stone-dark block">Dial Specification</span>
                <span className="font-medium text-charcoal">{modalWatch.dialColor}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-stone-dark block">Movement Calibre</span>
                <span className="font-medium text-charcoal">{modalWatch.movement}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-stone-dark block">Water Resistance</span>
                <span className="font-medium text-charcoal">{modalWatch.waterResistance}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-stone-dark block">Market Ref. Value</span>
                <span className="font-medium text-charcoal">{modalWatch.priceEstimate}</span>
              </div>
            </div>

            {/* Available Configurations Pill Tags */}
            <div className="mt-5">
              <span className="text-[10px] uppercase tracking-wider text-stone-dark block mb-2">
                Available Dial Finishes
              </span>
              <div className="flex flex-wrap gap-1.5">
                {modalWatch.availableDials.map(dial => (
                  <span key={dial} className="px-2.5 py-1 rounded bg-stone-light/50 text-[11px] text-graphite border border-stone-light">
                    {dial}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-8 pt-4 border-t border-stone-light/70 flex flex-col gap-2.5">
            <button
              onClick={handleTransformClick}
              className="w-full py-3.5 px-6 rounded-xl bg-charcoal hover:bg-espresso text-ivory text-xs uppercase tracking-[0.18em] font-medium transition-all shadow-md flex items-center justify-center gap-2 group border border-charcoal hover:border-gold/50"
            >
              <Sparkles className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
              <span>Transform With This Watch</span>
              <ArrowRight className="w-3.5 h-3.5 text-stone-light group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-[10px] text-center text-stone-dark tracking-wide">
              Selected timepiece will be placed on your wrist in the transformation studio.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

