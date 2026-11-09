import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Eye, Layers } from 'lucide-react';
import { BeforeAfterSlider } from '../../components/comparison/BeforeAfterSlider';
import { INITIAL_PROJECTS } from '../../data/projects';
import { useApp } from '../../context/AppContext';

export const ShowcasePage: React.FC = () => {
  const { setSelectedWatch } = useApp();
  const [filter, setFilter] = useState<'all' | 'dress' | 'sports' | 'steel'>('all');

  return (
    <div className="pt-28 pb-20 bg-ivory text-charcoal">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="label-tracking text-gold-dark text-[10px] block mb-2">
            TRANSFORMATION SHOWCASE GALLERY
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-editorial-heading font-medium text-charcoal">
            Photographic Precision in Action.
          </h1>
          <p className="mt-4 text-base text-graphite font-sans leading-relaxed">
            Examine our high-fidelity transformations across varied skin complexions, indoor studio lighting, daylight environments, and cuff textiles.
          </p>

          {/* Filter tabs */}
          <div className="mt-8 flex items-center justify-center gap-2 flex-wrap">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-sans uppercase tracking-wider transition-all ${
                filter === 'all'
                  ? 'bg-charcoal text-ivory font-medium'
                  : 'bg-parchment text-graphite hover:text-charcoal'
              }`}
            >
              All Studies ({INITIAL_PROJECTS.length})
            </button>
            <button
              onClick={() => setFilter('dress')}
              className={`px-4 py-1.5 rounded-full text-xs font-sans uppercase tracking-wider transition-all ${
                filter === 'dress'
                  ? 'bg-charcoal text-ivory font-medium'
                  : 'bg-parchment text-graphite hover:text-charcoal'
              }`}
            >
              Grand Complications
            </button>
            <button
              onClick={() => setFilter('sports')}
              className={`px-4 py-1.5 rounded-full text-xs font-sans uppercase tracking-wider transition-all ${
                filter === 'sports'
                  ? 'bg-charcoal text-ivory font-medium'
                  : 'bg-parchment text-graphite hover:text-charcoal'
              }`}
            >
              Sports & Divers
            </button>
          </div>
        </div>

        {/* Showcase Grid */}
        <div className="flex flex-col gap-20">
          {INITIAL_PROJECTS.map((proj, idx) => (
            <div
              key={proj.id}
              className="bg-white rounded-2xl border border-stone-light p-6 md:p-8 shadow-luxury flex flex-col lg:flex-row gap-8 items-center"
            >
              {/* Slider Viewport */}
              <div className="w-full lg:w-3/5">
                <BeforeAfterSlider
                  beforeImage={proj.originalImageUrl}
                  afterImage={proj.transformedImageUrl}
                  beforeLabel={proj.detectedWatch ? `Original: ${proj.detectedWatch.brand}` : 'Original Wrist'}
                  afterLabel={`LARP: ${proj.selectedWatch.brand} ${proj.selectedWatch.model}`}
                  aspectRatio="aspect-[16/10]"
                  showAnnotations={idx === 0}
                  badgeText={`STUDY 0${idx + 1}`}
                />
              </div>

              {/* Study Info */}
              <div className="w-full lg:w-2/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-gold-dark font-mono uppercase tracking-wider mb-2">
                    <span>{proj.selectedWatch.brand}</span>
                    <span>•</span>
                    <span>Ref. {proj.selectedWatch.reference}</span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-editorial-heading font-medium text-charcoal">
                    {proj.title}
                  </h3>

                  <p className="mt-3 text-xs md:text-sm text-graphite font-sans leading-relaxed">
                    {proj.notes}
                  </p>

                  {/* Horological specs list */}
                  <div className="mt-6 pt-4 border-t border-stone-light/60 space-y-2 text-xs">
                    <div className="flex justify-between text-graphite">
                      <span className="text-stone-dark">Detected Timepiece:</span>
                      <span className="font-medium text-charcoal">{proj.detectedWatch?.brand} {proj.detectedWatch?.model}</span>
                    </div>
                    <div className="flex justify-between text-graphite">
                      <span className="text-stone-dark">Replaced With:</span>
                      <span className="font-medium text-charcoal">{proj.selectedWatch.model}</span>
                    </div>
                    <div className="flex justify-between text-graphite">
                      <span className="text-stone-dark">Anatomical Fidelity:</span>
                      <span className="font-medium text-sage">100% Skin Tone Locked</span>
                    </div>
                    <div className="flex justify-between text-graphite">
                      <span className="text-stone-dark">Lighting Preservation:</span>
                      <span className="font-medium text-gold">{proj.config.lightingPreservation}% Match</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-stone-light/60 flex items-center gap-3">
                  <Link
                    to="/app/configure"
                    onClick={() => setSelectedWatch(proj.selectedWatch)}
                    className="flex-1 py-3 px-4 rounded-xl bg-charcoal hover:bg-espresso text-ivory text-xs uppercase tracking-wider font-medium text-center transition-colors flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-gold" />
                    <span>Try This Transformation</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
