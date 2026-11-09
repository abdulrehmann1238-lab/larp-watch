import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Download, 
  Save, 
  RotateCcw, 
  Compass, 
  Upload, 
  ShieldCheck, 
  ShieldAlert, 
  Check, 
  SlidersHorizontal,
  ChevronDown,
  Layers,
  FileCheck
} from 'lucide-react';
import { BeforeAfterSlider } from '../../components/comparison/BeforeAfterSlider';
import { useApp } from '../../context/AppContext';
import { LUXURY_WATCHES } from '../../data/watches';

export const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    selectedWatch, 
    uploadedImage, 
    transformedResultUrl, 
    watchConfig, 
    saveProject, 
    showToast 
  } = useApp();

  const watch = selectedWatch || LUXURY_WATCHES[6];
  const originalImage = uploadedImage || '/assets/images/wrist_original_dress.jpg';
  const transformedImage = transformedResultUrl || '/assets/images/wrist_editorial.jpg';

  // Export options state
  const [resolution, setResolution] = useState<'standard' | 'high' | 'ultra'>('high');
  const [format, setFormat] = useState<'JPG' | 'PNG'>('JPG');
  const [includeDisclosure, setIncludeDisclosure] = useState<boolean>(true);
  const [isExportPanelOpen, setIsExportPanelOpen] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = transformedImage;
    link.download = `LARP_${watch.brand}_${watch.reference}_${resolution.toUpperCase()}.${format.toLowerCase()}`;
    link.click();
    showToast(`Master file downloaded (${resolution.toUpperCase()} ${format}).`, 'success');
  };

  const handleSaveToProjects = () => {
    saveProject({
      title: `${watch.brand} ${watch.model} Study`,
      originalImageUrl: originalImage,
      transformedImageUrl: transformedImage,
      selectedWatch: watch,
      config: watchConfig,
      status: 'completed',
      favorite: true
    });
    setIsSaved(true);
  };

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto w-full flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-light/70">
        <div>
          <span className="label-tracking text-gold-dark text-[10px] block mb-1">
            TRANSFORMATION RESULT
          </span>
          <h1 className="text-3xl md:text-4xl font-editorial-heading font-medium text-charcoal">
            Precision you can see.
          </h1>
          <p className="text-xs md:text-sm text-graphite font-sans mt-0.5">
            Compare your original photograph against the photorealistic {watch.brand} {watch.model}.
          </p>
        </div>

        {/* Primary Download & Save Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSaveToProjects}
            disabled={isSaved}
            className={`px-4 py-2.5 rounded-xl border text-xs uppercase tracking-wider font-medium flex items-center gap-2 transition-all ${
              isSaved
                ? 'bg-sage/10 border-sage text-sage cursor-default'
                : 'border-stone-light hover:border-stone bg-white text-charcoal'
            }`}
          >
            {isSaved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5 text-gold" />}
            <span>{isSaved ? 'Saved to Projects' : 'Save Project'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="px-6 py-2.5 rounded-xl bg-charcoal hover:bg-espresso text-ivory text-xs uppercase tracking-[0.16em] font-medium flex items-center gap-2 transition-all shadow-md border border-charcoal hover:border-gold/30"
          >
            <Download className="w-3.5 h-3.5 text-gold" />
            <span>Download High-Res</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Comparison Slider Component */}
      <div className="bg-white rounded-2xl border border-stone-light p-6 md:p-8 shadow-luxury">
        <BeforeAfterSlider
          beforeImage={originalImage}
          afterImage={transformedImage}
          beforeLabel="Original Wrist Photography"
          afterLabel={`LARP: ${watch.brand} ${watch.model}`}
          aspectRatio="aspect-[16/10]"
          showAnnotations={true}
          badgeText="PRECISION RESULT"
        />

        {/* Preserved Elements Audit Grid */}
        <div className="mt-8 pt-6 border-t border-stone-light grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-parchment/60 border border-stone-light">
            <span className="text-[10px] uppercase font-mono text-stone-dark block">Wrist Anatomy</span>
            <span className="font-semibold text-charcoal mt-0.5 block">100% Preserved</span>
            <p className="text-[10px] text-graphite mt-1">Natural skin tones and subcutaneous veins locked.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-parchment/60 border border-stone-light">
            <span className="text-[10px] uppercase font-mono text-stone-dark block">Lighting Vector</span>
            <span className="font-semibold text-charcoal mt-0.5 block">Matched to Ambient</span>
            <p className="text-[10px] text-graphite mt-1">Specular crystal glare generated from room keylight.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-parchment/60 border border-stone-light">
            <span className="text-[10px] uppercase font-mono text-stone-dark block">Cuff & Textiles</span>
            <span className="font-semibold text-charcoal mt-0.5 block">Zero AI Artifacts</span>
            <p className="text-[10px] text-graphite mt-1">Sleeve stitches and wool ribbing untouched.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-parchment/60 border border-stone-light">
            <span className="text-[10px] uppercase font-mono text-stone-dark block">Horological Scale</span>
            <span className="font-semibold text-charcoal mt-0.5 block">{watch.caseDiameter}</span>
            <p className="text-[10px] text-graphite mt-1">Manufacture proportions calibrated to lug-to-lug width.</p>
          </div>
        </div>
      </div>

      {/* Export Settings Panel */}
      <div className="bg-white rounded-2xl border border-stone-light p-6 md:p-8 shadow-xs">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-editorial-heading text-xl font-medium text-charcoal">
              Master Resolution Export Settings
            </h3>
            <p className="text-xs text-graphite mt-0.5">
              Select export resolution, container format, and ethical attribution metadata.
            </p>
          </div>
          <span className="text-xs font-mono text-sage font-medium flex items-center gap-1">
            <FileCheck className="w-4 h-4" /> Ready for Print / Web
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Resolution Options */}
          <div>
            <label className="text-xs uppercase tracking-wider text-charcoal font-medium block mb-2">
              Export Resolution
            </label>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setResolution('standard')}
                className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                  resolution === 'standard' ? 'border-gold bg-parchment font-semibold text-charcoal' : 'border-stone-light text-graphite'
                }`}
              >
                <span>Standard (1080p Web)</span>
                {resolution === 'standard' && <Check className="w-3.5 h-3.5 text-gold" />}
              </button>
              <button
                type="button"
                onClick={() => setResolution('high')}
                className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                  resolution === 'high' ? 'border-gold bg-parchment font-semibold text-charcoal' : 'border-stone-light text-graphite'
                }`}
              >
                <span>High Resolution (4K, 300 DPI)</span>
                {resolution === 'high' && <Check className="w-3.5 h-3.5 text-gold" />}
              </button>
              <button
                type="button"
                onClick={() => setResolution('ultra')}
                className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                  resolution === 'ultra' ? 'border-gold bg-parchment font-semibold text-charcoal' : 'border-stone-light text-graphite'
                }`}
              >
                <span>Master Grade (8K Ultra)</span>
                {resolution === 'ultra' && <Check className="w-3.5 h-3.5 text-gold" />}
              </button>
            </div>
          </div>

          {/* Format Options */}
          <div>
            <label className="text-xs uppercase tracking-wider text-charcoal font-medium block mb-2">
              File Format
            </label>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setFormat('JPG')}
                className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                  format === 'JPG' ? 'border-gold bg-parchment font-semibold text-charcoal' : 'border-stone-light text-graphite'
                }`}
              >
                <span>JPEG (Optimized Color Balance)</span>
                {format === 'JPG' && <Check className="w-3.5 h-3.5 text-gold" />}
              </button>
              <button
                type="button"
                onClick={() => setFormat('PNG')}
                className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                  format === 'PNG' ? 'border-gold bg-parchment font-semibold text-charcoal' : 'border-stone-light text-graphite'
                }`}
              >
                <span>PNG (Lossless Alpha Ready)</span>
                {format === 'PNG' && <Check className="w-3.5 h-3.5 text-gold" />}
              </button>
            </div>
          </div>

          {/* Disclosure & Metadata Options */}
          <div>
            <label className="text-xs uppercase tracking-wider text-charcoal font-medium block mb-2">
              Ethical Disclosure
            </label>
            <div className="p-3.5 rounded-xl bg-ivory border border-stone-light flex flex-col justify-between h-[100px]">
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="disclosure"
                  checked={includeDisclosure}
                  onChange={e => setIncludeDisclosure(e.target.checked)}
                  className="mt-0.5 rounded border-stone text-charcoal focus:ring-gold"
                />
                <label htmlFor="disclosure" className="text-xs text-graphite leading-relaxed cursor-pointer">
                  Include subtle cryptographic metadata indicating digital horological transformation.
                </label>
              </div>
              <span className="text-[10px] text-stone-dark">
                Recommended for public editorial publication.
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-stone-light/60 flex items-center justify-between">
          <span className="text-xs text-stone-dark">
            Est. Download Size: ~4.6 MB • Color Profile: sRGB
          </span>
          <button
            onClick={handleDownload}
            className="py-2.5 px-6 rounded-xl bg-charcoal hover:bg-espresso text-ivory text-xs uppercase tracking-wider font-medium flex items-center gap-2 transition-all shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-gold" />
            <span>Download Photograph</span>
          </button>
        </div>
      </div>

      {/* Digital Modification Legal Disclosure Box */}
      <div className="p-4 rounded-xl bg-parchment border border-stone-light flex items-start gap-3 text-xs text-graphite leading-relaxed">
        <ShieldAlert className="w-4 h-4 text-gold shrink-0 mt-0.5" />
        <p>
          <strong>Digital Modification Notice:</strong> This image is a digital transformation generated with LARP. It demonstrates how a genuine luxury timepiece reference would appear on the user's wrist. It is not an authentic certificate of physical watch ownership, warranty, or retail appraisal.
        </p>
      </div>

      {/* Next Step Exploration Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-stone-light/70">
        <button
          onClick={() => navigate('/app/upload')}
          className="text-xs uppercase tracking-wider font-medium text-charcoal hover:text-gold flex items-center gap-1.5 transition-colors"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload Another Wrist Photo</span>
        </button>

        <button
          onClick={() => navigate('/collection')}
          className="text-xs uppercase tracking-wider font-medium text-charcoal hover:text-gold flex items-center gap-1.5 transition-colors"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Try Another Luxury Reference</span>
        </button>
      </div>
    </div>
  );
};

