import React, { useState } from 'react';
import { Search, Watch, Plus, Check, Star, MoreVertical } from 'lucide-react';
import { LUXURY_WATCHES } from '../../data/watches';
import { WatchModel } from '../../types';
import { useApp } from '../../context/AppContext';

export const AdminCatalogPage: React.FC = () => {
  const { showToast } = useApp();
  const [catalog, setCatalog] = useState<WatchModel[]>(LUXURY_WATCHES);
  const [search, setSearch] = useState('');

  const toggleFeatured = (id: string) => {
    setCatalog(prev =>
      prev.map(w => (w.id === id ? { ...w, isFeatured: !w.isFeatured } : w))
    );
    showToast('Catalog featured reference updated.', 'gold');
  };

  const filtered = catalog.filter(w =>
    w.brand.toLowerCase().includes(search.toLowerCase()) ||
    w.model.toLowerCase().includes(search.toLowerCase()) ||
    w.reference.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-ivory/10">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-gold block mb-1">
            HOROLOGY ARCHIVE & CAD REPOSITORY
          </span>
          <h1 className="text-3xl font-editorial-heading font-medium text-ivory">
            Timepiece Catalog Management.
          </h1>
          <p className="text-xs text-stone-dark mt-0.5">
            Manage authenticated Swiss manufacture references, CAD models, and featured homepage showcases.
          </p>
        </div>

        <button
          onClick={() => showToast('Reference creation studio opened.', 'info')}
          className="px-4 py-2 rounded-xl bg-gold text-charcoal text-xs uppercase font-semibold tracking-wider hover:bg-gold-light transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Timepiece Reference</span>
        </button>
      </div>

      {/* Search */}
      <div className="p-4 rounded-xl bg-espresso border border-gold/20 flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="w-3.5 h-3.5 text-stone-dark absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search catalog by brand, model, reference number..."
            className="w-full bg-warmblack border border-gold/20 rounded-lg pl-9 pr-3 py-2 text-xs text-ivory focus:outline-none focus:border-gold"
          />
        </div>
        <span className="text-xs font-mono text-stone-dark hidden sm:inline">
          {filtered.length} of {catalog.length} References
        </span>
      </div>

      {/* Catalog Table */}
      <div className="p-6 rounded-2xl bg-espresso border border-gold/20">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-ivory/10 text-stone-dark uppercase text-[10px] font-mono">
                <th className="pb-3">Reference Model</th>
                <th className="pb-3">Manufacture</th>
                <th className="pb-3">Reference Code</th>
                <th className="pb-3">Dimensions</th>
                <th className="pb-3">Calibre</th>
                <th className="pb-3">Featured Showcase</th>
                <th className="pb-3 text-right">Market Ref</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory/5 text-stone-light">
              {filtered.map(watch => (
                <tr key={watch.id} className="hover:bg-ivory/5 transition-colors">
                  <td className="py-3 font-medium text-ivory flex items-center gap-2.5">
                    <img
                      src={watch.imageUrl}
                      alt={watch.model}
                      className="w-7 h-7 object-contain rounded bg-warmblack p-0.5 border border-ivory/10"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/images/blancpain_macro.jpg';
                      }}
                    />
                    <span className="truncate max-w-xs">{watch.model}</span>
                  </td>
                  <td className="py-3 text-gold font-medium">{watch.brand}</td>
                  <td className="py-3 font-mono text-stone-dark">{watch.reference}</td>
                  <td className="py-3 font-mono">{watch.caseDiameter}</td>
                  <td className="py-3 truncate max-w-[140px] text-stone-dark">{watch.movement}</td>
                  <td className="py-3">
                    <button
                      onClick={() => toggleFeatured(watch.id)}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono flex items-center gap-1 transition-colors ${
                        watch.isFeatured
                          ? 'bg-gold/20 text-gold border border-gold/40'
                          : 'bg-warmblack text-stone-dark border border-ivory/10'
                      }`}
                    >
                      <Star className={`w-3 h-3 ${watch.isFeatured ? 'fill-gold' : ''}`} />
                      <span>{watch.isFeatured ? 'FEATURED' : 'STANDARD'}</span>
                    </button>
                  </td>
                  <td className="py-3 text-right font-mono text-stone-light">{watch.priceEstimate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

