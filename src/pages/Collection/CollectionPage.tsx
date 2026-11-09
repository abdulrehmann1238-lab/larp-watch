import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, Heart, Sparkles, Filter, X } from 'lucide-react';
import { LUXURY_WATCHES } from '../../data/watches';
import { useApp } from '../../context/AppContext';

export const CollectionPage: React.FC = () => {
  const navigate = useNavigate();
  const { openWatchModal, setSelectedWatch, toggleFavoriteWatch, isWatchFavorite } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('All');

  const brands = useMemo(() => {
    return ['All', ...Array.from(new Set(LUXURY_WATCHES.map(w => w.brand)))];
  }, []);

  const materials = ['All', 'Stainless Steel', 'Oystersteel', '18ct Red Gold', '18K White Gold', 'Carbon TPT®'];

  const filteredWatches = useMemo(() => {
    return LUXURY_WATCHES.filter(watch => {
      const matchesSearch =
        watch.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        watch.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        watch.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
        watch.collection.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesBrand = selectedBrand === 'All' || watch.brand === selectedBrand;
      const matchesMaterial = selectedMaterial === 'All' || watch.caseMaterial.includes(selectedMaterial);

      return matchesSearch && matchesBrand && matchesMaterial;
    });
  }, [searchQuery, selectedBrand, selectedMaterial]);

  return (
    <div className="pt-28 pb-24 bg-ivory text-charcoal">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="label-tracking text-gold-dark text-[10px] block mb-2">
            CURATED HOROLOGY ARCHIVE
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-editorial-heading font-medium text-charcoal">
            The world's finest timepieces.
          </h1>
          <p className="mt-3 text-base text-graphite font-sans leading-relaxed">
            Explore authentic references, verified dimensions, and historic complications ready to be fitted onto your wrist photograph.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 md:p-6 rounded-2xl bg-parchment/70 border border-stone-light/80 mb-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-dark absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by brand, model, or reference (e.g. Submariner, Nautilus, 126610LN)..."
              className="w-full bg-white border border-stone-light rounded-xl pl-10 pr-4 py-2.5 text-xs text-charcoal placeholder:text-stone-dark focus:outline-none focus:border-gold"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-dark hover:text-charcoal"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Brand Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            <select
              value={selectedBrand}
              onChange={e => setSelectedBrand(e.target.value)}
              className="bg-white border border-stone-light rounded-xl px-3 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold cursor-pointer"
            >
              {brands.map(b => (
                <option key={b} value={b}>
                  Brand: {b}
                </option>
              ))}
            </select>

            <select
              value={selectedMaterial}
              onChange={e => setSelectedMaterial(e.target.value)}
              className="bg-white border border-stone-light rounded-xl px-3 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold cursor-pointer"
            >
              {materials.map(m => (
                <option key={m} value={m}>
                  Material: {m}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Result Count and Active Filters */}
        <div className="flex items-center justify-between text-xs text-graphite mb-6">
          <span>Showing <strong>{filteredWatches.length}</strong> authenticated references</span>
          {(selectedBrand !== 'All' || selectedMaterial !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedBrand('All');
                setSelectedMaterial('All');
                setSearchQuery('');
              }}
              className="text-gold-dark hover:underline flex items-center gap-1"
            >
              <X className="w-3 h-3" />
              Reset filters
            </button>
          )}
        </div>

        {/* Watches Grid */}
        {filteredWatches.length === 0 ? (
          <div className="text-center py-20 bg-parchment/40 rounded-2xl border border-stone-light">
            <p className="font-editorial-heading text-2xl text-charcoal">No timepieces matched your search criteria.</p>
            <p className="text-xs text-graphite mt-2">Try adjusting your brand or material filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredWatches.map(watch => {
              const isFav = isWatchFavorite(watch.id);
              return (
                <div
                  key={watch.id}
                  className="bg-white rounded-2xl border border-stone-light/80 p-6 flex flex-col justify-between hover:shadow-luxury transition-all duration-300 group"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-stone-dark mb-4">
                      <span className="label-tracking text-gold-dark text-[9px]">
                        {watch.brand}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px]">
                          Ref. {watch.reference}
                        </span>
                        <button
                          onClick={() => toggleFavoriteWatch(watch.id)}
                          className="p-1 text-stone-dark hover:text-gold transition-colors"
                          title="Favorite"
                        >
                          <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-gold text-gold' : ''}`} />
                        </button>
                      </div>
                    </div>

                    {/* Image */}
                    <div
                      onClick={() => openWatchModal(watch)}
                      className="relative aspect-square w-full flex items-center justify-center p-4 bg-parchment/40 rounded-xl overflow-hidden mb-5 cursor-pointer"
                    >
                      <img
                        src={watch.imageUrl}
                        alt={watch.model}
                        className="max-h-full max-w-full object-contain filter drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/assets/images/blancpain_macro.jpg';
                        }}
                      />
                    </div>

                    <h3
                      onClick={() => openWatchModal(watch)}
                      className="font-editorial-heading text-xl font-medium text-charcoal group-hover:text-gold-dark transition-colors cursor-pointer"
                    >
                      {watch.model}
                    </h3>
                    <p className="text-xs text-graphite mt-1 line-clamp-2 leading-relaxed">
                      {watch.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-stone-light/50 grid grid-cols-2 gap-2 text-[11px] text-stone-dark">
                      <div>
                        <span className="block text-[9px] uppercase tracking-wider">Material</span>
                        <span className="font-medium text-charcoal truncate block">{watch.caseMaterial}</span>
                      </div>
                      <div>
                        <span className="block text-[9px] uppercase tracking-wider">Diameter</span>
                        <span className="font-medium text-charcoal">{watch.caseDiameter}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-2">
                    <button
                      onClick={() => openWatchModal(watch)}
                      className="flex-1 py-2.5 px-3 rounded-lg border border-stone hover:border-charcoal text-charcoal text-xs uppercase tracking-wider font-medium text-center transition-colors"
                    >
                      Inspect Details
                    </button>
                    <button
                      onClick={() => {
                        setSelectedWatch(watch);
                        navigate('/app/configure');
                      }}
                      className="py-2.5 px-4 rounded-lg bg-charcoal hover:bg-espresso text-ivory text-xs uppercase tracking-wider font-medium transition-colors flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3 h-3 text-gold" />
                      <span>Wear</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

