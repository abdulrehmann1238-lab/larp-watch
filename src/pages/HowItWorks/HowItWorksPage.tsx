import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Camera, Layers, Cpu, Eye } from 'lucide-react';
import { BeforeAfterSlider } from '../../components/comparison/BeforeAfterSlider';

export const HowItWorksPage: React.FC = () => {
  return (
    <div className="pt-28 pb-20 bg-ivory text-charcoal">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 text-center">
        <span className="label-tracking text-gold-dark text-[10px] block mb-3">
          PRECISION HOROLOGICAL ENGINEERING
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-editorial-heading font-medium text-charcoal leading-tight">
          How LARP Transforms Your Wrist.
        </h1>
        <p className="mt-4 text-base md:text-lg text-graphite max-w-2xl mx-auto font-sans leading-relaxed">
          A seamless synthesis of Swiss horological dimensions and neural lighting reconstruction that leaves the rest of your photograph 100% untouched.
        </p>
      </div>

      {/* Hero Before/After Demo */}
      <div className="max-w-4xl mx-auto px-6 mt-12 mb-20">
        <BeforeAfterSlider
          beforeImage="/assets/images/wrist_original_dress.jpg"
          afterImage="/assets/images/wrist_editorial.jpg"
          beforeLabel="Original Wrist Shot"
          afterLabel="Blancpain Villeret Tourbillon"
          aspectRatio="aspect-[16/10]"
          showAnnotations={true}
        />
      </div>

      {/* Step by Step Deep Dive */}
      <div className="max-w-5xl mx-auto px-6 flex flex-col gap-16">
        {/* Stage 1 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center p-8 rounded-2xl bg-parchment/60 border border-stone-light">
          <div className="md:col-span-2 text-4xl font-editorial-heading text-gold font-light">01</div>
          <div className="md:col-span-10">
            <h3 className="text-2xl font-editorial-heading font-medium text-charcoal mb-2">
              Anatomical Wrist & Hand Segmentation
            </h3>
            <p className="text-sm text-graphite leading-relaxed mb-4">
              Upon upload, LARP isolates the exact sub-millimeter contours of your wrist, skin folds, sleeve fabric, and background. It establishes an anatomical anchor that locks your natural bone structure and skin tone into place, guaranteeing they cannot be altered or smoothed.
            </p>
            <div className="flex flex-wrap gap-2 text-[11px] text-stone-dark font-mono">
              <span className="px-2 py-1 rounded bg-stone-light/60">Skin Pore Preservation: 100%</span>
              <span className="px-2 py-1 rounded bg-stone-light/60">Tattoo Vector Lock: Active</span>
              <span className="px-2 py-1 rounded bg-stone-light/60">Cuffline Boundary: Sub-pixel</span>
            </div>
          </div>
        </div>

        {/* Stage 2 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center p-8 rounded-2xl bg-parchment/60 border border-stone-light">
          <div className="md:col-span-2 text-4xl font-editorial-heading text-gold font-light">02</div>
          <div className="md:col-span-10">
            <h3 className="text-2xl font-editorial-heading font-medium text-charcoal mb-2">
              Timepiece Detection & Geometry Matching
            </h3>
            <p className="text-sm text-graphite leading-relaxed mb-4">
              The existing watch (or bare wrist) is evaluated for perspective pitch, roll, and yaw. LARP calculates the exact 3D orientation of the dial crystal relative to the camera lens and matches it against our genuine CAD horology library.
            </p>
            <div className="flex flex-wrap gap-2 text-[11px] text-stone-dark font-mono">
              <span className="px-2 py-1 rounded bg-stone-light/60">Camera Focal Length Inferred</span>
              <span className="px-2 py-1 rounded bg-stone-light/60">Lug-to-Lug Ratio Adjusted</span>
              <span className="px-2 py-1 rounded bg-stone-light/60">150+ Verified References</span>
            </div>
          </div>
        </div>

        {/* Stage 3 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center p-8 rounded-2xl bg-parchment/60 border border-stone-light">
          <div className="md:col-span-2 text-4xl font-editorial-heading text-gold font-light">03</div>
          <div className="md:col-span-10">
            <h3 className="text-2xl font-editorial-heading font-medium text-charcoal mb-2">
              Bidirectional Lighting & Shadow Reconstruction
            </h3>
            <p className="text-sm text-graphite leading-relaxed mb-4">
              Real watches interact with the environment around them. LARP samples the key light, fill light, and ambient bounce from your original photo, applying matching reflections across the sapphire crystal, brushed bevels, and polished gold surfaces.
            </p>
            <div className="flex flex-wrap gap-2 text-[11px] text-stone-dark font-mono">
              <span className="px-2 py-1 rounded bg-stone-light/60">Ray-traced Glare Matrix</span>
              <span className="px-2 py-1 rounded bg-stone-light/60">Occlusion Shadow under Lugs</span>
              <span className="px-2 py-1 rounded bg-stone-light/60">Natural Crystal Vignetting</span>
            </div>
          </div>
        </div>

        {/* Stage 4 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center p-8 rounded-2xl bg-parchment/60 border border-stone-light">
          <div className="md:col-span-2 text-4xl font-editorial-heading text-gold font-light">04</div>
          <div className="md:col-span-10">
            <h3 className="text-2xl font-editorial-heading font-medium text-charcoal mb-2">
              Master Resolution Synthesis & Export
            </h3>
            <p className="text-sm text-graphite leading-relaxed mb-4">
              The finalized transformation is blended seamlessly into the original sensor raster. You receive an ultra-high resolution export up to 8K, complete with horological metadata and optional digital modification disclosures.
            </p>
            <div className="flex flex-wrap gap-2 text-[11px] text-stone-dark font-mono">
              <span className="px-2 py-1 rounded bg-stone-light/60">Lossless PNG / 300 DPI</span>
              <span className="px-2 py-1 rounded bg-stone-light/60">Color Managed (sRGB / DCI-P3)</span>
              <span className="px-2 py-1 rounded bg-stone-light/60">Zero Compression Artifacts</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-2xl mx-auto px-6 text-center mt-20">
        <h3 className="text-3xl font-editorial-heading text-charcoal mb-4">
          Ready to experience the precision?
        </h3>
        <Link
          to="/app/upload"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-charcoal text-ivory text-xs uppercase tracking-[0.2em] font-medium hover:bg-espresso transition-all shadow-md"
        >
          <span>Transform Your First Photograph</span>
          <ArrowRight className="w-4 h-4 text-gold" />
        </Link>
      </div>
    </div>
  );
};

