import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Maximize2, Minimize2, ZoomIn, ZoomOut, RotateCcw, Sparkles, ShieldCheck } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  aspectRatio?: string;
  showAnnotations?: boolean;
  className?: string;
  badgeText?: string;
}

interface Annotation {
  id: string;
  x: number; // percentage
  y: number; // percentage
  label: string;
  description: string;
}

const DEFAULT_ANNOTATIONS: Annotation[] = [
  {
    id: 'skin-texture',
    x: 58,
    y: 62,
    label: 'Epidermal Fidelity',
    description: 'Natural skin pores, micro-creases, and subcutaneous highlights remain 100% unaltered.'
  },
  {
    id: 'sleeve-cuff',
    x: 42,
    y: 35,
    label: 'Clothing & Cuff Fabric',
    description: 'Ribbed knit cuff texture and wool weave retained with zero AI distortion.'
  },
  {
    id: 'specular-reflection',
    x: 52,
    y: 43,
    label: 'Ray-Traced Horology',
    description: 'Bezel crystal glare and rose gold case luster recalculated against warm ambient light.'
  },
  {
    id: 'ambient-shadow',
    x: 48,
    y: 52,
    label: 'Contact Shadow',
    description: 'Realistic contact occlusion rebuilt beneath the lugs and alligator leather strap.'
  }
];

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Original Photography',
  afterLabel = 'LARP Transformation',
  aspectRatio = 'aspect-[16/10]',
  showAnnotations = false,
  className = '',
  badgeText = 'TRANSFORMED WITH LARP'
}) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [activeAnnotation, setActiveAnnotation] = useState<Annotation | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedX = Math.max(0, Math.min(x, rect.width));
    const percentage = (clampedX / rect.width) * 100;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (isDragging && e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  }, [isDragging, handleMove]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  }, [isDragging, handleMove]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen().catch(() => {});
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.3, 2.5));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.3, 1));
  const handleResetZoom = () => {
    setZoomLevel(1);
    setSliderPosition(50);
  };

  return (
    <div className={`relative flex flex-col items-center select-none w-full ${className}`}>
      {/* Top Floating Control Bar */}
      <div className="w-full flex items-center justify-between px-2 py-2 text-xs text-graphite mb-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-light/60 text-charcoal font-sans text-[11px] font-medium tracking-wider uppercase border border-stone/40">
            <Sparkles className="w-3 h-3 text-gold" />
            {badgeText}
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-graphite/80 tracking-wide">
            <ShieldCheck className="w-3 h-3 text-sage" />
            Original photography preserved
          </span>
        </div>

        {/* Zoom & View Controls */}
        <div className="flex items-center gap-1.5 bg-parchment/80 backdrop-blur-sm px-2 py-1 rounded-lg border border-stone-light">
          <button
            onClick={handleZoomIn}
            className="p-1 rounded hover:bg-stone-light/70 text-charcoal transition-colors"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-1 rounded hover:bg-stone-light/70 text-charcoal transition-colors"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleResetZoom}
            className="p-1 rounded hover:bg-stone-light/70 text-charcoal transition-colors text-[10px] uppercase font-sans font-medium px-1.5"
            title="Reset View"
          >
            <RotateCcw className="w-3 h-3 inline mr-1" />
            {Math.round(zoomLevel * 100)}%
          </button>
          <div className="w-[1px] h-3 bg-stone mx-0.5" />
          <button
            onClick={toggleFullscreen}
            className="p-1 rounded hover:bg-stone-light/70 text-charcoal transition-colors"
            title="Fullscreen Mode"
            aria-label="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Image Comparison Frame */}
      <div
        ref={containerRef}
        className={`relative w-full ${aspectRatio} overflow-hidden rounded-xl border border-stone/40 bg-warmblack shadow-luxury cursor-ew-resize group`}
        onMouseDown={e => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onTouchStart={e => {
          setIsDragging(true);
          if (e.touches.length > 0) handleMove(e.touches[0].clientX);
        }}
      >
        {/* Container for Zoom scale */}
        <div
          className="absolute inset-0 w-full h-full transition-transform duration-150 ease-out origin-center"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Base Layer: Transformed (After) Image */}
          <img
            src={afterImage}
            alt="Transformed Luxury Watch"
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
            loading="eager"
            onError={(e) => {
              // Fallback to high-res watch photography
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1200&auto=format&fit=crop';
            }}
          />

          {/* Top Layer: Original (Before) Image with Clip Path */}
          <div
            className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
            style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
          >
            <img
              src={beforeImage}
              alt="Original Wrist"
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
              loading="eager"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop';
              }}
            />
          </div>

          {/* Precision Annotations Layer (Optional) */}
          {showAnnotations && DEFAULT_ANNOTATIONS.map(ann => (
            <div
              key={ann.id}
              className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 z-30"
              style={{ left: `${ann.x}%`, top: `${ann.y}%` }}
              onMouseEnter={() => setActiveAnnotation(ann)}
              onMouseLeave={() => setActiveAnnotation(null)}
              onClick={(e) => {
                e.stopPropagation();
                setActiveAnnotation(activeAnnotation?.id === ann.id ? null : ann);
              }}
            >
              <div className="relative flex items-center justify-center">
                <span className="w-5 h-5 rounded-full bg-gold/90 text-charcoal-dark font-sans font-bold text-[10px] flex items-center justify-center shadow-lg cursor-pointer ring-2 ring-ivory/80 hover:scale-110 transition-transform">
                  +
                </span>
                <span className="absolute w-7 h-7 rounded-full bg-gold/30 animate-ping pointer-events-none" />
              </div>

              {/* Tooltip Card */}
              {activeAnnotation?.id === ann.id && (
                <div className="absolute left-1/2 bottom-full mb-3 -translate-x-1/2 w-56 p-3 bg-espresso/95 backdrop-blur-md border border-gold/40 text-ivory rounded-lg shadow-2xl z-40 text-left pointer-events-none">
                  <p className="text-[10px] font-sans uppercase tracking-widest text-gold font-semibold">
                    {ann.label}
                  </p>
                  <p className="mt-1 text-xs text-stone-light font-light leading-relaxed">
                    {ann.description}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Draggable Vertical Divider */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-ivory shadow-[0_0_10px_rgba(0,0,0,0.6)] z-20 pointer-events-none transition-opacity duration-200"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Luxury Circular Center Handle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-ivory text-charcoal border border-gold/80 shadow-2xl flex items-center justify-center pointer-events-auto cursor-grab active:cursor-grabbing hover:scale-105 transition-transform">
            <svg
              className="w-4 h-4 text-charcoal fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M8.5 6L3.5 12L8.5 18M15.5 6L20.5 12L15.5 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>
        </div>

        {/* Labels: Before (Left) & After (Right) */}
        <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
          <span className="px-3 py-1.5 rounded bg-charcoal/80 backdrop-blur-md text-ivory text-[10px] uppercase tracking-[0.2em] font-sans border border-ivory/20 shadow-md">
            {beforeLabel}
          </span>
        </div>
        <div className="absolute bottom-4 right-4 z-20 pointer-events-none">
          <span className="px-3 py-1.5 rounded bg-charcoal/80 backdrop-blur-md text-gold text-[10px] uppercase tracking-[0.2em] font-sans border border-gold/30 shadow-md">
            {afterLabel}
          </span>
        </div>
      </div>

      {/* Helper caption below slider */}
      <p className="mt-2.5 text-[11px] text-graphite/70 font-sans tracking-wide text-center">
        Drag the vertical divider horizontally to compare the original wrist photograph and the photorealistic transformed watch.
      </p>
    </div>
  );
};

