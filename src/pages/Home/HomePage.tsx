import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Layers, 
  Sliders, 
  Eye, 
  Compass, 
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { BeforeAfterSlider } from '../../components/comparison/BeforeAfterSlider';
import { LUXURY_WATCHES } from '../../data/watches';
import { useApp } from '../../context/AppContext';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { openWatchModal, setSelectedWatch } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'popular' | 'dress' | 'complication'>('all');

  const featuredWatches = LUXURY_WATCHES.slice(0, 6);

  return (
    <div className="flex flex-col min-h-screen bg-ivory text-charcoal">
      {/* 6.2 HERO SECTION — Cinematic Luxury Experience */}
      <section className="relative min-h-[92vh] flex flex-col justify-between pt-28 pb-12 px-6 md:px-10 overflow-hidden bg-espresso text-ivory">
        {/* Background Visual: Luxury Macro Watch / Wrist Photo fallback */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="/assets/images/wrist_editorial.jpg"
            alt="Haute Horlogerie Wrist"
            className="w-full h-full object-cover object-[center_35%] opacity-35 filter brightness-90 contrast-105 scale-100 transition-transform duration-1000 ease-out"
          />
          {/* Subtle editorial vignette & lighting gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/60 to-espresso/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-espresso/90 via-espresso/40 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto w-full pt-12 md:pt-20">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-6 h-[1px] bg-gold" />
            <span className="label-tracking text-gold text-[10px] md:text-xs tracking-[0.28em] font-medium">
              THE FUTURE OF PERSONAL WATCH PHOTOGRAPHY
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-editorial-heading font-medium tracking-tight text-ivory leading-[1.05]">
            Your Wrist.<br />
            Your Watch.<br />
            <span className="font-editorial-subheading italic text-gold font-normal">Reimagined.</span>
          </h1>

          <p className="mt-6 md:mt-8 text-base sm:text-lg md:text-xl text-stone-light/90 max-w-2xl font-sans font-light leading-relaxed">
            Experience the world's finest timepieces on your own wrist. Transform an ordinary photograph into extraordinary luxury watch imagery with LARP.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              to="/app/upload"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-ivory text-charcoal text-xs uppercase tracking-[0.2em] font-semibold hover:bg-gold hover:text-charcoal transition-all shadow-luxury-dark group"
            >
              <span>Transform Your Photo</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="#interactive-preview"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-ivory/30 hover:border-gold text-ivory text-xs uppercase tracking-[0.2em] font-sans transition-all hover:bg-ivory/5"
            >
              <span>Explore the Experience</span>
            </a>
          </div>

          {/* Precision assurance */}
          <div className="mt-8 flex items-center gap-3 text-xs text-stone-dark font-sans">
            <ShieldCheck className="w-4 h-4 text-gold" />
            <span>AI-powered precision. Photographic authenticity. Skin, clothing & lighting preserved.</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="relative z-10 max-w-5xl mx-auto w-full pt-8 flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-stone-dark">
          <span>Swiss Horological Standards</span>
          <a href="#interactive-preview" className="flex items-center gap-1.5 hover:text-gold transition-colors">
            <span>Scroll to Discover</span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce" />
          </a>
        </div>
      </section>

      {/* 6.3 INTERACTIVE HERO TRANSFORMATION PREVIEW */}
      <section id="interactive-preview" className="py-20 md:py-28 px-6 md:px-10 bg-ivory border-b border-stone-light/70">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="label-tracking text-gold-dark text-[10px] block mb-2">
              PRECISION HOROLOGICAL TRANSFORMATION
            </span>
            <h2 className="text-3xl md:text-5xl font-editorial-heading font-medium text-charcoal">
              Drag to witness the transformation.
            </h2>
            <p className="mt-3 text-sm md:text-base text-graphite font-sans leading-relaxed">
              Slide between the original wrist photograph and the photorealistic Blancpain Villeret Tourbillon Carrousel replacement.
            </p>
          </div>

          {/* Interactive Split Comparison Component */}
          <div className="max-w-4xl mx-auto">
            <BeforeAfterSlider
              beforeImage="/assets/images/wrist_original_dress.jpg"
              afterImage="/assets/images/wrist_editorial.jpg"
              beforeLabel="Original Wrist Photography"
              afterLabel="Blancpain Villeret Grand Complication"
              aspectRatio="aspect-[16/10]"
              showAnnotations={true}
              badgeText="LARP PRECISION SYNTHESIS"
            />
          </div>

          {/* Quick Specs Callout */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-center border-t border-stone-light pt-8">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-stone-dark block">Anatomy</span>
              <p className="text-sm font-medium text-charcoal mt-0.5">100% Skin Texture Retained</p>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-stone-dark block">Lighting Vector</span>
              <p className="text-sm font-medium text-charcoal mt-0.5">Specular Reflection Matched</p>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-stone-dark block">Fabric & Cuffs</span>
              <p className="text-sm font-medium text-charcoal mt-0.5">Zero AI Sleeve Smudge</p>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-stone-dark block">Timepiece Fidelity</span>
              <p className="text-sm font-medium text-charcoal mt-0.5">True Manufacture Proportions</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6.4 THE LARP EXPERIENCE — Editorial 01, 02, 03 */}
      <section id="experience" className="py-24 md:py-32 px-6 md:px-10 bg-parchment">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-xl mb-16">
            <span className="label-tracking text-gold-dark text-[10px] block mb-2">
              THE THREE-PILLAR METHOD
            </span>
            <h2 className="text-3xl md:text-5xl font-editorial-heading font-medium text-charcoal">
              Luxury, without limits.
            </h2>
            <p className="mt-3 text-sm md:text-base text-graphite font-sans leading-relaxed">
              Discover how LARP brings the world's most iconic timepieces into your own photography without disturbing what makes it yours.
            </p>
          </div>

          {/* Editorial Blocks */}
          <div className="flex flex-col gap-20 md:gap-28">
            {/* 01 — Identify */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
              <div className="order-2 md:order-1">
                <span className="text-3xl md:text-4xl font-editorial-heading text-gold font-light block mb-3">
                  01
                </span>
                <span className="label-tracking text-charcoal text-[11px] block mb-1">
                  IDENTIFY
                </span>
                <h3 className="text-2xl md:text-3xl font-editorial-heading font-medium text-charcoal mb-4">
                  Recognize the timepiece on your wrist.
                </h3>
                <p className="text-sm text-graphite leading-relaxed font-sans mb-6">
                  Our neural horology scanner analyzes your wrist geometry, dial markings, case dimensions, and lug spacing to identify the closest genuine luxury reference.
                </p>
                <div className="flex items-center gap-3 text-xs text-charcoal font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                  <span>Sub-millimeter dial boundary localization</span>
                </div>
              </div>
              <div className="order-1 md:order-2 rounded-2xl overflow-hidden border border-stone-light shadow-luxury bg-white aspect-[4/3] relative group">
                <img
                  src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop"
                  alt="Timepiece Recognition"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent flex items-end p-6">
                  <div className="text-ivory text-xs font-mono">
                    <span className="text-gold font-bold">DETECTED:</span> Oyster Perpetual Submariner Date (94% confidence)
                  </div>
                </div>
              </div>
            </div>

            {/* 02 — Match */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
              <div className="rounded-2xl overflow-hidden border border-stone-light shadow-luxury bg-white aspect-[4/3] relative group">
                <img
                  src="/assets/images/blancpain_macro.jpg"
                  alt="Authentic Catalog Reference"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent flex items-end p-6">
                  <div className="text-ivory text-xs font-mono">
                    <span className="text-gold font-bold">ARCHIVE:</span> Blancpain Villeret Tourbillon Carrousel Cal. 232
                  </div>
                </div>
              </div>
              <div>
                <span className="text-3xl md:text-4xl font-editorial-heading text-gold font-light block mb-3">
                  02
                </span>
                <span className="label-tracking text-charcoal text-[11px] block mb-1">
                  MATCH
                </span>
                <h3 className="text-2xl md:text-3xl font-editorial-heading font-medium text-charcoal mb-4">
                  Explore authentic references and variations.
                </h3>
                <p className="text-sm text-graphite leading-relaxed font-sans mb-6">
                  Select from over 150 verified manufacture references. Personalize dial enamels, gold alloy cases, and hand-stitched alligator or metal bracelets authentic to each model's history.
                </p>
                <div className="flex items-center gap-3 text-xs text-charcoal font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                  <span>Exact reference specs, case diameters & official complications</span>
                </div>
              </div>
            </div>

            {/* 03 — Transform */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
              <div className="order-2 md:order-1">
                <span className="text-3xl md:text-4xl font-editorial-heading text-gold font-light block mb-3">
                  03
                </span>
                <span className="label-tracking text-charcoal text-[11px] block mb-1">
                  TRANSFORM
                </span>
                <h3 className="text-2xl md:text-3xl font-editorial-heading font-medium text-charcoal mb-4">
                  Replace the watch while preserving your photo.
                </h3>
                <p className="text-sm text-graphite leading-relaxed font-sans mb-6">
                  Our proprietary lighting solver projects ambient specular gleam, contact shadows, and crystal refractions precisely onto your wrist contours. The rest of your photo remains untouched.
                </p>
                <div className="flex items-center gap-3 text-xs text-charcoal font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                  <span>Raytraced case reflections matched to your room lighting</span>
                </div>
              </div>
              <div className="order-1 md:order-2 rounded-2xl overflow-hidden border border-stone-light shadow-luxury bg-white aspect-[4/3] relative group">
                <img
                  src="/assets/images/wrist_editorial.jpg"
                  alt="Transformed Luxury Timepiece"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent flex items-end p-6">
                  <div className="text-ivory text-xs font-mono">
                    <span className="text-gold font-bold">STATUS:</span> Photorealistic Synthesis Complete (300 DPI Export)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6.5 PHOTOGRAPHIC PRECISION SECTION */}
      <section className="py-24 px-6 md:px-10 bg-ivory border-b border-stone-light">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="label-tracking text-gold-dark text-[10px] block mb-2">
              ARCHITECTURAL INTEGRITY
            </span>
            <h2 className="text-3xl md:text-5xl font-editorial-heading font-medium text-charcoal leading-tight">
              Nothing changes.<br />
              <span className="italic font-editorial-subheading text-gold">Except the watch.</span>
            </h2>
            <p className="mt-3 text-sm text-graphite font-sans">
              Our core promise: every anatomical nuance, skin tone, fabric texture, and background environment is protected with photographic fidelity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-parchment/60 border border-stone-light">
              <span className="w-8 h-8 rounded-full bg-gold/15 text-gold flex items-center justify-center text-xs font-serif font-bold mb-4">
                A
              </span>
              <h4 className="font-editorial-heading text-lg font-medium text-charcoal mb-2">
                Skin Texture & Tattoos
              </h4>
              <p className="text-xs text-graphite leading-relaxed">
                Natural epidermal grain, hair follicles, wrist veins, scars, and tattoos are completely preserved with zero blurring or synthetic smoothing.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-parchment/60 border border-stone-light">
              <span className="w-8 h-8 rounded-full bg-gold/15 text-gold flex items-center justify-center text-xs font-serif font-bold mb-4">
                B
              </span>
              <h4 className="font-editorial-heading text-lg font-medium text-charcoal mb-2">
                Ambient Lighting & Shadows
              </h4>
              <p className="text-xs text-graphite leading-relaxed">
                The watch case absorbs and reflects your actual room light—whether warm sunset daylight, office halogen, or moody studio flash.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-parchment/60 border border-stone-light">
              <span className="w-8 h-8 rounded-full bg-gold/15 text-gold flex items-center justify-center text-xs font-serif font-bold mb-4">
                C
              </span>
              <h4 className="font-editorial-heading text-lg font-medium text-charcoal mb-2">
                Garments & Sleeve Drapes
              </h4>
              <p className="text-xs text-graphite leading-relaxed">
                Suit cuffs, cashmere sweaters, leather jackets, and shirt seams wrap naturally over the watch case just as they do in real life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6.6 WATCH COLLECTION SHOWCASE */}
      <section className="py-24 px-6 md:px-10 bg-ivory-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="label-tracking text-gold-dark text-[10px] block mb-2">
                HAUTE HORLOGERIE ARCHIVE
              </span>
              <h2 className="text-3xl md:text-5xl font-editorial-heading font-medium text-charcoal">
                A world of extraordinary timepieces.
              </h2>
            </div>
            <Link
              to="/collection"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-medium text-charcoal hover:text-gold transition-colors pb-1 border-b border-charcoal hover:border-gold"
            >
              <span>Explore All 150+ References</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredWatches.map(watch => (
              <div
                key={watch.id}
                className="bg-white rounded-2xl border border-stone-light/80 p-6 flex flex-col justify-between hover:shadow-luxury transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-dark mb-4">
                    <span className="label-tracking text-gold-dark text-[9px]">
                      {watch.brand}
                    </span>
                    <span className="font-mono text-[10px]">
                      Ref. {watch.reference}
                    </span>
                  </div>

                  {/* Watch Image */}
                  <div className="relative aspect-square w-full flex items-center justify-center p-4 bg-parchment/40 rounded-xl overflow-hidden mb-5">
                    <img
                      src={watch.imageUrl}
                      alt={watch.model}
                      className="max-h-full max-w-full object-contain filter drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/images/blancpain_macro.jpg';
                      }}
                    />
                  </div>

                  <h3 className="font-editorial-heading text-xl font-medium text-charcoal group-hover:text-gold-dark transition-colors">
                    {watch.model}
                  </h3>
                  <p className="text-xs text-graphite mt-1 line-clamp-2 leading-relaxed">
                    {watch.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-stone-light/50 flex items-center justify-between text-[11px] text-stone-dark">
                    <span>{watch.caseMaterial}</span>
                    <span>{watch.caseDiameter}</span>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2">
                  <button
                    onClick={() => openWatchModal(watch)}
                    className="flex-1 py-2.5 px-3 rounded-lg border border-stone hover:border-charcoal text-charcoal text-xs uppercase tracking-wider font-medium text-center transition-colors"
                  >
                    Explore Model
                  </button>
                  <button
                    onClick={() => {
                      setSelectedWatch(watch);
                      navigate('/app/configure');
                    }}
                    className="py-2.5 px-3.5 rounded-lg bg-charcoal hover:bg-espresso text-ivory text-xs uppercase tracking-wider font-medium transition-colors"
                    title="Transform Wrist with this watch"
                  >
                    Transform
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6.7 HOW IT WORKS — Four-step horizontal process */}
      <section className="py-24 px-6 md:px-10 bg-ivory border-t border-stone-light">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="label-tracking text-gold-dark text-[10px] block mb-2">
              SEAMLESS HOROLOGY WORKFLOW
            </span>
            <h2 className="text-3xl md:text-5xl font-editorial-heading font-medium text-charcoal">
              How LARP Works.
            </h2>
            <p className="mt-3 text-sm text-graphite font-sans">
              From raw phone photograph to high-horology masterpiece in four simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Step 01 */}
            <div className="flex flex-col p-6 rounded-xl bg-parchment/60 border border-stone-light relative">
              <span className="text-2xl font-editorial-heading text-gold font-light mb-2">01</span>
              <h4 className="font-editorial-heading text-lg font-medium text-charcoal mb-1">Upload</h4>
              <p className="text-xs text-graphite leading-relaxed">
                Choose or take a clear photograph of your wrist from your phone or desktop library.
              </p>
            </div>

            {/* Step 02 */}
            <div className="flex flex-col p-6 rounded-xl bg-parchment/60 border border-stone-light relative">
              <span className="text-2xl font-editorial-heading text-gold font-light mb-2">02</span>
              <h4 className="font-editorial-heading text-lg font-medium text-charcoal mb-1">Identify</h4>
              <p className="text-xs text-graphite leading-relaxed">
                LARP scans the timepiece you are wearing and matches it with genuine luxury reference models.
              </p>
            </div>

            {/* Step 03 */}
            <div className="flex flex-col p-6 rounded-xl bg-parchment/60 border border-stone-light relative">
              <span className="text-2xl font-editorial-heading text-gold font-light mb-2">03</span>
              <h4 className="font-editorial-heading text-lg font-medium text-charcoal mb-1">Transform</h4>
              <p className="text-xs text-graphite leading-relaxed">
                Select your desired reference, dial finish, and strap, then generate a photorealistic replacement.
              </p>
            </div>

            {/* Step 04 */}
            <div className="flex flex-col p-6 rounded-xl bg-parchment/60 border border-stone-light relative">
              <span className="text-2xl font-editorial-heading text-gold font-light mb-2">04</span>
              <h4 className="font-editorial-heading text-lg font-medium text-charcoal mb-1">Export</h4>
              <p className="text-xs text-graphite leading-relaxed">
                Save your transformed photograph in up to 8K resolution, ready for personal portfolios.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6.8 FINAL CTA — Dark Espresso Section */}
      <section className="py-24 md:py-32 px-6 md:px-10 bg-espresso text-ivory relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img
            src="/assets/images/blancpain_macro.jpg"
            alt="Macro Dial Detail"
            className="w-full h-full object-cover scale-110 filter brightness-75"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/90 to-espresso/80" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <span className="label-tracking text-gold text-[10px] tracking-[0.28em] block mb-3 font-medium">
            BEGIN YOUR HOROLOGY JOURNEY
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-editorial-heading font-medium text-ivory leading-tight">
            Your next favorite watch.<br />
            <span className="font-editorial-subheading italic text-gold font-normal">Already on your wrist.</span>
          </h2>
          <p className="mt-6 text-sm sm:text-base text-stone-light font-sans max-w-xl mx-auto leading-relaxed">
            Discover what your photography looks like with the world's most coveted mechanical timepieces.
          </p>

          <div className="mt-8">
            <Link
              to="/app/upload"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gold hover:bg-gold-light text-charcoal text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-luxury-dark group"
            >
              <span>Start Your Transformation</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

