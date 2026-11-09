import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  RotateCcw, 
  Save, 
  Download, 
  Sliders, 
  Layers, 
  Eye, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Minimize2, 
  ArrowRight,
  ShieldAlert,
  Clock,
  Compass,
  Undo2,
  Redo2
} from 'lucide-react';
import { BeforeAfterSlider } from '../../components/comparison/BeforeAfterSlider';
import { useApp } from '../../context/AppContext';
import { LUXURY_WATCHES } from '../../data/watches';

export const StudioPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    uploadedImage, 
    selectedWatch, 
    watchConfig, 
    updateWatchConfig, 
    saveProject, 
    showToast 
  } = useApp();

  const watch = selectedWatch || LUXURY_WATCHES[6];
  const originalImage = uploadedImage || '/assets/images/wrist_original_dress.jpg';
  const transformedImage = '/assets/images/wrist_editorial.jpg';

  const [projectName, setProjectName] = useState<string>('Grand Complication Autumn Portrait');
  const [viewMode, setViewMode] = useState<'slider' | 'transformed' | 'original'>('slider');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Local interactive slider adjustments
  const [lighting, setLighting] = useState<number>(watchConfig.lightingPreservation || 98);
  const [skinFidelity, setSkinFidelity] = useState<number>(watchConfig.skinTonePreservation || 100);
  const [backgroundPreserve, setBackgroundPreserve] = useState<number>(watchConfig.backgroundPreservation || 100);
  const [shadowDepth, setShadowDepth] = useState<number>(watchConfig.shadowReconstruction || 96);

  const handleSave = () => {
    saveProject({
      title: projectName,
      originalImageUrl: originalImage,
      transformedImageUrl: transformedImage,
      selectedWatch: watch,
      config: {
        dialColor: watchConfig.dialColor,
        caseMaterial: watchConfig.caseMaterial,
        braceletType: watchConfig.braceletType,
        lightingPreservation: lighting,
        skinTonePreservation: skinFidelity,
        wristAnatomyPreservation: 100,
        backgroundPreservation: backgroundPreserve,
        shadowReconstruction: shadowDepth
      },
      status: 'completed'
    });
  };

  const handleGenerate = () => {
    updateWatchConfig({
      lightingPreservation: lighting,
      skinTonePreservation: skinFidelity,
      backgroundPreservation: backgroundPreserve,
      shadowReconstruction: shadowDepth
    });
    navigate('/app/processing');
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-61px)] md:min-h-screen bg-parchment text-charcoal">
      {/* Studio Top Bar */}
      <div className="h-14 bg-white border-b border-stone-light/80 px-6 flex items-center justify-between sticky top-0 z-20 shadow-xs">
        {/* Project Name Editable Input */}
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-gold" />
          <input
            type="text"
            value={projectName}
            onChange={e => setProjectName(e.target.value)}
            className="font-editorial-heading text-lg font-medium text-charcoal bg-transparent hover:bg-parchment/60 focus:bg-white px-2 py-0.5 rounded border border-transparent focus:border-stone-light outline-none"
          />
          <span className="text-[10px] font-mono uppercase bg-parchment text-stone-dark px-2 py-0.5 rounded hidden sm:inline">
            STUDIO CANVAS
          </span>
        </div>

        {/* Studio Action Tools */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast('Action reverted.', 'info')}
            className="p-1.5 rounded-lg text-stone-dark hover:text-charcoal hover:bg-stone-light/40 transition-colors"
            title="Undo"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => showToast('Action restored.', 'info')}
            className="p-1.5 rounded-lg text-stone-dark hover:text-charcoal hover:bg-stone-light/40 transition-colors"
            title="Redo"
          >
            <Redo2 className="w-4 h-4" />
          </button>
          <div className="w-[1px] h-4 bg-stone-light mx-1" />
          <button
            onClick={handleSave}
            className="px-3.5 py-1.5 rounded-lg border border-stone-light hover:border-stone text-xs font-sans font-medium text-charcoal flex items-center gap-1.5 transition-colors"
          >
            <Save className="w-3.5 h-3.5 text-gold" />
            <span className="hidden sm:inline">Save Project</span>
          </button>
          <button
            onClick={() => navigate('/app/results')}
            className="px-3.5 py-1.5 rounded-lg bg-charcoal hover:bg-espresso text-ivory text-xs font-sans font-medium flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-gold" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Main Studio Workspace Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* LEFT PANEL: Original Reference & Switch (2.5 Cols) */}
        <div className="hidden lg:flex lg:col-span-3 bg-ivory border-r border-stone-light/70 p-5 flex-col justify-between overflow-y-auto max-h-[calc(100vh-115px)]">
          <div>
            <span className="text-[9px] uppercase tracking-widest text-stone-dark font-mono block mb-2">
              SOURCE PHOTOGRAPH
            </span>
            <div className="aspect-[16/11] w-full rounded-xl overflow-hidden border border-stone-light/80 bg-parchment relative mb-4">
              <img
                src={originalImage}
                alt="Source wrist"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-charcoal/80 text-ivory text-[9px] font-mono">
                Original RGB
              </span>
            </div>

            <div className="space-y-2 text-xs text-graphite mb-6">
              <div className="flex justify-between py-1 border-b border-stone-light/50">
                <span className="text-stone-dark">Resolution:</span>
                <span className="font-mono text-charcoal">2400 × 1600</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-light/50">
                <span className="text-stone-dark">Exposure Key:</span>
                <span className="font-mono text-charcoal">+0.3 EV Studio</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-light/50">
                <span className="text-stone-dark">Skin Lock:</span>
                <span className="font-mono text-sage font-medium">100% Retained</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/app/upload')}
              className="w-full py-2 px-3 rounded-lg border border-stone-light hover:border-stone text-xs text-charcoal transition-colors font-medium text-center"
            >
              Replace Source Photo
            </button>
          </div>

          {/* Model info card */}
          <div className="pt-4 border-t border-stone-light/70">
            <span className="text-[9px] uppercase tracking-widest text-stone-dark font-mono block mb-2">
              TARGET TIMEPIECE
            </span>
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-parchment border border-stone-light">
              <img
                src={watch.imageUrl}
                alt={watch.model}
                className="w-10 h-10 object-contain shrink-0"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/images/blancpain_macro.jpg';
                }}
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-charcoal truncate">{watch.model}</p>
                <p className="text-[10px] text-graphite font-mono">Ref. {watch.reference}</p>
              </div>
            </div>
          </div>
        </div>

        {/* CENTER: Interactive Large Editing Canvas (6.5 Cols) */}
        <div className="lg:col-span-6 p-4 md:p-8 flex flex-col justify-between items-center bg-parchment/40 overflow-y-auto">
          {/* Canvas View Mode Switcher */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-white border border-stone-light shadow-xs mb-4">
            <button
              onClick={() => setViewMode('slider')}
              className={`px-3 py-1 rounded-full text-xs font-sans transition-all ${
                viewMode === 'slider' ? 'bg-charcoal text-ivory font-medium' : 'text-graphite hover:text-charcoal'
              }`}
            >
              Before / After Split
            </button>
            <button
              onClick={() => setViewMode('transformed')}
              className={`px-3 py-1 rounded-full text-xs font-sans transition-all ${
                viewMode === 'transformed' ? 'bg-charcoal text-ivory font-medium' : 'text-graphite hover:text-charcoal'
              }`}
            >
              Transformed View
            </button>
            <button
              onClick={() => setViewMode('original')}
              className={`px-3 py-1 rounded-full text-xs font-sans transition-all ${
                viewMode === 'original' ? 'bg-charcoal text-ivory font-medium' : 'text-graphite hover:text-charcoal'
              }`}
            >
              Original View
            </button>
          </div>

          {/* Canvas Main Render Area */}
          <div className="w-full max-w-2xl my-auto">
            {viewMode === 'slider' ? (
              <BeforeAfterSlider
                beforeImage={originalImage}
                afterImage={transformedImage}
                beforeLabel="Original Wrist Shot"
                afterLabel={`LARP: ${watch.brand} ${watch.model}`}
                aspectRatio="aspect-[16/11]"
                showAnnotations={false}
                badgeText="STUDIO REAL-TIME COMPOSITING"
              />
            ) : viewMode === 'transformed' ? (
              <div className="relative aspect-[16/11] w-full rounded-xl overflow-hidden border border-stone shadow-luxury bg-warmblack">
                <img
                  src={transformedImage}
                  alt="Transformed Watch Result"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-3 right-3 px-3 py-1 rounded bg-charcoal/80 text-gold text-[10px] uppercase font-mono tracking-widest backdrop-blur-md">
                  Photorealistic Replacement
                </span>
              </div>
            ) : (
              <div className="relative aspect-[16/11] w-full rounded-xl overflow-hidden border border-stone shadow-luxury bg-warmblack">
                <img
                  src={originalImage}
                  alt="Original Wrist"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-3 left-3 px-3 py-1 rounded bg-charcoal/80 text-ivory text-[10px] uppercase font-mono tracking-widest backdrop-blur-md">
                  Original Photography
                </span>
              </div>
            )}
          </div>

          {/* Bottom disclaimer label */}
          <div className="mt-4 flex items-center gap-2 text-[10px] text-stone-dark">
            <ShieldAlert className="w-3.5 h-3.5 text-gold shrink-0" />
            <span>Digital transformation preview — not a photograph of physical ownership.</span>
          </div>
        </div>

        {/* RIGHT PANEL: Horological Adjustment Sliders (3 Cols) */}
        <div className="lg:col-span-3 bg-white border-l border-stone-light/70 p-6 flex flex-col justify-between overflow-y-auto max-h-[calc(100vh-115px)] shadow-xs">
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-stone-light">
              <span className="text-xs font-semibold text-charcoal uppercase tracking-wider font-mono">
                Synthesis Parameters
              </span>
              <Sliders className="w-4 h-4 text-gold" />
            </div>

            {/* Slider 1: Lighting Preservation */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-medium text-charcoal">Lighting Match</span>
                <span className="font-mono text-gold-dark font-semibold">{lighting}%</span>
              </div>
              <input
                type="range"
                min="80"
                max="100"
                value={lighting}
                onChange={e => setLighting(Number(e.target.value))}
                className="w-full accent-gold cursor-pointer"
              />
              <span className="text-[10px] text-stone-dark block mt-1">
                Specular reflection mapped to ambient light.
              </span>
            </div>

            {/* Slider 2: Skin Tone Fidelity */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-medium text-charcoal">Skin Tone & Pore Lock</span>
                <span className="font-mono text-sage font-semibold">{skinFidelity}%</span>
              </div>
              <input
                type="range"
                min="90"
                max="100"
                value={skinFidelity}
                onChange={e => setSkinFidelity(Number(e.target.value))}
                className="w-full accent-gold cursor-pointer"
              />
              <span className="text-[10px] text-stone-dark block mt-1">
                100% natural pore texture and hair follicle retention.
              </span>
            </div>

            {/* Slider 3: Shadow Depth */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-medium text-charcoal">Contact Shadow Depth</span>
                <span className="font-mono text-charcoal font-semibold">{shadowDepth}%</span>
              </div>
              <input
                type="range"
                min="70"
                max="100"
                value={shadowDepth}
                onChange={e => setShadowDepth(Number(e.target.value))}
                className="w-full accent-gold cursor-pointer"
              />
              <span className="text-[10px] text-stone-dark block mt-1">
                Occlusion shadow calculated under case and lugs.
              </span>
            </div>

            {/* Slider 4: Background Preservation */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-medium text-charcoal">Background Preservation</span>
                <span className="font-mono text-charcoal font-semibold">{backgroundPreserve}%</span>
              </div>
              <input
                type="range"
                min="90"
                max="100"
                value={backgroundPreserve}
                onChange={e => setBackgroundPreserve(Number(e.target.value))}
                className="w-full accent-gold cursor-pointer"
              />
              <span className="text-[10px] text-stone-dark block mt-1">
                Locks sleeve textiles and ambient background depth.
              </span>
            </div>
          </div>

          {/* Big Action CTA */}
          <div className="mt-8 pt-4 border-t border-stone-light">
            <button
              onClick={handleGenerate}
              className="w-full py-4 px-6 rounded-xl bg-charcoal hover:bg-espresso text-ivory text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-md flex items-center justify-center gap-2 border border-charcoal hover:border-gold/40 group"
            >
              <Sparkles className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
              <span>Generate Transformation</span>
            </button>
            <p className="text-[10px] text-center text-stone-dark mt-2">
              High-resolution raytracing pipeline simulated in ~5s
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

