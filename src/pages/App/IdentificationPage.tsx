import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  Loader2, 
  Sparkles, 
  ArrowRight, 
  ShieldAlert, 
  Clock, 
  Search,
  Scan,
  Compass
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const IdentificationPage: React.FC = () => {
  const navigate = useNavigate();
  const { uploadedImage, detectedResult, setDetectedResult } = useApp();

  const [activeStep, setActiveStep] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const steps = [
    {
      title: 'Analyzing wrist photograph',
      desc: 'Isolating forearm boundary, skin tone histogram, and perspective angle.'
    },
    {
      title: 'Locating the timepiece',
      desc: 'Detecting watch case bounding box, lugs, and strap contact area.'
    },
    {
      title: 'Examining dial and case details',
      desc: 'Measuring bezel geometry, crown placement, and dial sub-register layout.'
    },
    {
      title: 'Matching visual characteristics',
      desc: 'Comparing ceramic luster, dial texturing, and three-piece bracelet linkages.'
    },
    {
      title: 'Searching the watch catalog',
      desc: 'Indexing against 150+ verified Swiss manufacture reference numbers.'
    }
  ];

  useEffect(() => {
    // Realistic 3.5s sequence
    const timers = [
      setTimeout(() => setActiveStep(1), 700),
      setTimeout(() => setActiveStep(2), 1400),
      setTimeout(() => setActiveStep(3), 2100),
      setTimeout(() => setActiveStep(4), 2800),
      setTimeout(() => {
        setActiveStep(5);
        setIsFinished(true);
      }, 3500)
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const imageSrc = uploadedImage || '/assets/images/wrist_original_dress.jpg';

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto w-full flex flex-col gap-10">
      {/* Header */}
      <div>
        <span className="label-tracking text-gold-dark text-[10px] block mb-1">
          ANALYSIS ENGINE • STEP 02 OF 04
        </span>
        <h1 className="text-3xl md:text-4xl font-editorial-heading font-medium text-charcoal">
          Understanding your timepiece.
        </h1>
        <p className="text-xs md:text-sm text-graphite font-sans mt-1">
          LARP neural vision detects the existing timepiece geometry to find authentic luxury counterparts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Uploaded Photo with simulated scanning overlay */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-light p-5 shadow-luxury">
          <div className="relative aspect-[16/11] w-full rounded-xl overflow-hidden bg-parchment border border-stone-light">
            <img
              src={imageSrc}
              alt="Analyzing wrist"
              className="w-full h-full object-cover"
            />

            {/* Neural scan HUD overlay */}
            <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between">
              <div className="flex justify-between items-center text-[9px] font-mono text-ivory bg-charcoal/70 px-2 py-1 rounded backdrop-blur-sm self-start">
                <span>SENSOR: RGB 300DPI</span>
              </div>

              {!isFinished && (
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent animate-pulse top-1/2 -translate-y-1/2" />
              )}

              {/* Bounding box marker */}
              <div className="absolute top-[35%] left-[42%] w-[26%] h-[32%] border-2 border-gold/80 rounded-full flex items-center justify-center pointer-events-none">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                <span className="absolute -top-5 text-[9px] font-mono uppercase bg-charcoal/90 text-gold px-1.5 py-0.5 rounded">
                  DIAL BOUNDARY
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-stone-dark">
            <span>Visual Segment: Primary Wrist</span>
            <span className="font-mono text-sage font-medium">98.4% Confidence</span>
          </div>
        </div>

        {/* Right: Simulated 5-Step Process & Results */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-light p-6 md:p-8 shadow-luxury flex flex-col justify-between">
          <div>
            <h3 className="font-editorial-heading text-xl font-medium text-charcoal mb-4">
              Horological Analysis Pipeline
            </h3>

            {/* 5 Steps list */}
            <div className="space-y-4">
              {steps.map((s, idx) => {
                const isDone = activeStep > idx;
                const isCurrent = activeStep === idx;

                return (
                  <div
                    key={idx}
                    className={`flex items-start gap-3.5 p-3 rounded-xl transition-all ${
                      isCurrent
                        ? 'bg-parchment border border-gold/40'
                        : isDone
                        ? 'bg-parchment/30 text-graphite'
                        : 'opacity-40'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-sage" />
                      ) : isCurrent ? (
                        <Loader2 className="w-4 h-4 text-gold animate-spin" />
                      ) : (
                        <span className="w-4 h-4 rounded-full border border-stone-dark/40 flex items-center justify-center text-[9px] font-mono">
                          {idx + 1}
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold text-charcoal">
                        0{idx + 1} — {s.title}
                      </h4>
                      <p className="text-[11px] text-graphite mt-0.5 leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Completed Result Card */}
            {isFinished && (
              <div className="mt-6 p-5 rounded-xl bg-ivory border border-gold/40 animate-fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-stone-light">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-sage" />
                    <span className="text-xs font-semibold text-charcoal uppercase tracking-wider font-mono">
                      Detected Timepiece Match
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-gold-dark bg-gold/15 px-2 py-0.5 rounded">
                    {detectedResult?.confidence}% Match
                  </span>
                </div>

                <div className="mt-3">
                  <h4 className="font-editorial-heading text-2xl font-medium text-charcoal">
                    {detectedResult?.brand} {detectedResult?.model}
                  </h4>

                  <ul className="mt-2 space-y-1 text-xs text-graphite">
                    {detectedResult?.characteristics.map((char, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-gold shrink-0" />
                        <span>{char}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Important Disclaimer */}
                <div className="mt-4 pt-3 border-t border-stone-light flex items-start gap-2 text-[10px] text-stone-dark leading-relaxed">
                  <ShieldAlert className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                  <span>
                    <strong>Disclaimer:</strong> This is an illustrative visual detection score used for reference selection. It does not certify physical watch authenticity, valuation, or ownership.
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Action button */}
          <div className="mt-8 pt-4 border-t border-stone-light flex items-center justify-end">
            <button
              onClick={() => navigate('/app/matches')}
              disabled={!isFinished}
              className={`py-3.5 px-8 rounded-xl text-xs uppercase tracking-[0.18em] font-medium transition-all shadow-md flex items-center gap-2 ${
                isFinished
                  ? 'bg-charcoal hover:bg-espresso text-ivory border border-charcoal hover:border-gold/40'
                  : 'bg-stone-light/50 text-stone-dark cursor-not-allowed'
              }`}
            >
              <span>Explore Matching Models</span>
              <ArrowRight className="w-3.5 h-3.5 text-gold" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

