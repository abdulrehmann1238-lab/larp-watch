import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LUXURY_WATCHES } from '../../data/watches';

export const ProcessingPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedWatch, uploadedImage, setTransformedResultUrl, showToast } = useApp();

  const watch = selectedWatch || LUXURY_WATCHES[6];
  const [progress, setProgress] = useState<number>(10);
  const [activeStage, setActiveStage] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const stages = [
    'Preparing original photograph and sensor raster',
    'Mapping watch placement & wrist orientation vectors',
    'Reconstructing case and bracelet CAD geometry',
    'Matching original ambient lighting & key highlights',
    'Rebuilding natural reflections, crystal glare, and shadows',
    'Preserving original photographic pores, veins, and sleeve fabric',
    'Finalizing high-resolution 300 DPI preview'
  ];

  useEffect(() => {
    // 5.5 second smooth realistic progression
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsCompleted(true);
          setTransformedResultUrl('/assets/images/wrist_editorial.jpg');
          showToast('Transformation completed with maximum fidelity.', 'gold');
          return 100;
        }
        const next = prev + 3;
        const stageIndex = Math.min(Math.floor((next / 100) * stages.length), stages.length - 1);
        setActiveStage(stageIndex);
        return next;
      });
    }, 160);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 bg-ivory text-charcoal select-none">
      <div className="max-w-xl w-full text-center flex flex-col items-center">
        {/* Watch Crest Marker */}
        <div className="w-12 h-12 rounded-full border border-gold/60 flex items-center justify-center mb-6 relative">
          <div className="w-2 h-2 rounded-full bg-gold" />
          {!isCompleted && (
            <div className="absolute inset-0 rounded-full border-t border-gold animate-spin" />
          )}
        </div>

        <span className="label-tracking text-gold-dark text-[10px] block mb-2">
          {isCompleted ? 'SYNTHESIS COMPLETE' : 'HAUTE HORLOGERIE SYNTHESIS'}
        </span>

        <h1 className="text-3xl md:text-4xl font-editorial-heading font-medium text-charcoal">
          {isCompleted ? 'Your transformation is ready.' : 'Transforming your wrist photograph.'}
        </h1>

        <p className="mt-2 text-xs md:text-sm text-graphite font-sans max-w-md">
          {isCompleted
            ? `${watch.brand} ${watch.model} seamlessly positioned with 100% anatomical fidelity.`
            : 'Applying ray-traced reflections and matching lighting vectors to the original exposure.'}
        </p>

        {/* Central Circular Progress Container */}
        <div className="my-10 relative w-48 h-48 flex items-center justify-center">
          {/* Subtle Outer Ring */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="84"
              stroke="#E7E1D7"
              strokeWidth="3"
              fill="transparent"
            />
            <circle
              cx="96"
              cy="96"
              r="84"
              stroke="#A58A5B"
              strokeWidth="3"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 84}
              strokeDashoffset={(2 * Math.PI * 84) * (1 - progress / 100)}
              strokeLinecap="round"
              className="transition-all duration-200 ease-out"
            />
          </svg>

          {/* Centered Preview Image & Progress % */}
          <div className="absolute inset-4 rounded-full overflow-hidden border border-stone-light/70 bg-white flex flex-col items-center justify-center p-4">
            <img
              src={watch.imageUrl}
              alt={watch.model}
              className="w-16 h-16 object-contain filter drop-shadow-md mb-1"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/assets/images/blancpain_macro.jpg';
              }}
            />
            <span className="text-xl font-editorial-heading font-medium text-charcoal">
              {progress}%
            </span>
          </div>
        </div>

        {/* Current Active Stage Description */}
        <div className="w-full max-w-md bg-white rounded-xl border border-stone-light p-4 shadow-xs mb-8">
          <div className="flex items-center justify-between text-[10px] text-stone-dark uppercase tracking-widest font-mono mb-1.5">
            <span>Stage 0{activeStage + 1} of 07</span>
            <span>{isCompleted ? 'Finished' : 'Processing'}</span>
          </div>
          <p className="text-xs font-medium text-charcoal font-sans transition-all duration-300">
            {stages[activeStage]}
          </p>
        </div>

        {/* Action Button when finished */}
        {isCompleted ? (
          <button
            onClick={() => navigate('/app/results')}
            className="w-full max-w-sm py-4 px-8 rounded-full bg-charcoal hover:bg-espresso text-ivory text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-luxury-dark flex items-center justify-center gap-3 border border-charcoal hover:border-gold/40 animate-fade-in group"
          >
            <Sparkles className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
            <span>View Transformation Result</span>
            <ArrowRight className="w-4 h-4 text-stone-light group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          <div className="flex items-center gap-2 text-xs text-stone-dark">
            <ShieldCheck className="w-3.5 h-3.5 text-sage" />
            <span>Sub-millimeter pore and skin boundary locks active</span>
          </div>
        )}
      </div>
    </div>
  );
};

