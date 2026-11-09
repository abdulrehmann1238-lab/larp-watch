import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Sparkles, Compass } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-28 pb-24 bg-ivory text-charcoal">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="label-tracking text-gold-dark text-[10px] block mb-2">
            PHILOSOPHY & VISION
          </span>
          <h1 className="text-4xl sm:text-6xl font-editorial-heading font-medium text-charcoal leading-tight">
            Where horology meets imagination.
          </h1>
          <p className="mt-4 text-base md:text-lg text-graphite font-sans leading-relaxed">
            LARP was conceived with a single purist ambition: allowing watch enthusiasts to experience the world’s most iconic mechanical timepieces within their own authentic photographic reality.
          </p>
        </div>

        {/* Large Editorial Hero Visual */}
        <div className="rounded-2xl overflow-hidden border border-stone-light shadow-luxury mb-16 aspect-[21/9] relative">
          <img
            src="/assets/images/blancpain_macro.jpg"
            alt="Haute Horlogerie Movement Details"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent flex items-end p-8">
            <p className="text-xs font-mono text-stone-light max-w-lg">
              Manufacture Le Brassus — Tourbillon and Carrousel regulating organs in 18ct red gold case.
            </p>
          </div>
        </div>

        {/* Narrative Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-sm text-graphite leading-relaxed mb-20">
          <div>
            <h3 className="font-editorial-heading text-2xl text-charcoal mb-4">
              Making Luxury Discovery Truly Personal
            </h3>
            <p className="mb-4">
              For generations, discovering a luxury watch required peering through bulletproof boutique glass or viewing idealized studio renders on digital catalogs. You could appreciate a perpetual calendar or an oyster case, but you could never truly envision how its 41mm diameter sat on your wrist, under your suit cuff, in the lighting of your daily life.
            </p>
            <p>
              LARP bridges this gap. By combining modern computational vision with sub-millimeter horological CAD models, we render authentic timepieces onto your own wrist photograph with uncompromising realism.
            </p>
          </div>

          <div>
            <h3 className="font-editorial-heading text-2xl text-charcoal mb-4">
              The Sacred Principle of Photographic Fidelity
            </h3>
            <p className="mb-4">
              Our core technological breakthrough is what we do <em>not</em> change. Generative AI tools often hallucinate distorted fingers, artificial skin smoothing, and smeared sleeve fabrics. LARP strictly rejects synthetic distortion.
            </p>
            <p>
              Your skin texture, hand veins, freckles, tattoos, sweater knits, cuff stitching, and background room shadows remain 100% genuine photograph pixels. Only the timepiece boundary is digitally transformed.
            </p>
          </div>
        </div>

        {/* Commitments Matrix */}
        <div className="p-8 md:p-12 rounded-2xl bg-parchment/70 border border-stone-light mb-16">
          <span className="label-tracking text-gold-dark text-[10px] block mb-2">
            OUR ETHICAL CHARTER
          </span>
          <h3 className="font-editorial-heading text-3xl text-charcoal mb-6">
            Commitment to Transparency & Provenance
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
            <div>
              <div className="w-7 h-7 rounded-full bg-gold/15 text-gold flex items-center justify-center mb-3">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="font-medium text-charcoal text-sm mb-1">Clear Digital Attribution</h4>
              <p className="text-graphite leading-relaxed">
                We always advocate for honest digital transparency. Transformed photographs are visualizations, not physical ownership appraisals.
              </p>
            </div>

            <div>
              <div className="w-7 h-7 rounded-full bg-gold/15 text-gold flex items-center justify-center mb-3">
                <Compass className="w-4 h-4" />
              </div>
              <h4 className="font-medium text-charcoal text-sm mb-1">Respect for Manufacture IP</h4>
              <p className="text-graphite leading-relaxed">
                All registered reference names and complication trademarks belong to their respective Swiss, German, and French manufacture maisons.
              </p>
            </div>

            <div>
              <div className="w-7 h-7 rounded-full bg-gold/15 text-gold flex items-center justify-center mb-3">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="font-medium text-charcoal text-sm mb-1">Zero Cloud Data Retention</h4>
              <p className="text-graphite leading-relaxed">
                In this client demonstration, user wrist images are processed client-side via browser object sandboxing and are never sold or stored on external servers.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Link
            to="/app/upload"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-charcoal text-ivory text-xs uppercase tracking-[0.2em] font-medium hover:bg-espresso transition-all shadow-md"
          >
            <span>Begin Your Personal Transformation</span>
            <ArrowRight className="w-4 h-4 text-gold" />
          </Link>
        </div>
      </div>
    </div>
  );
};

