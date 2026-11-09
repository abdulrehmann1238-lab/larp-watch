import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete?: () => void;
  forceShow?: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete, forceShow = false }) => {
  const [isVisible, setIsVisible] = useState(() => {
    if (forceShow) return true;
    return !sessionStorage.getItem('larp_intro_shown');
  });
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    // Smooth simulated luxury intro sequence ~ 1.8 seconds
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsFadingOut(true);
          setTimeout(() => {
            setIsVisible(false);
            sessionStorage.setItem('larp_intro_shown', 'true');
            if (onComplete) onComplete();
          }, 600);
          return 100;
        }
        return prev + 5;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-ivory text-charcoal transition-opacity duration-700 ease-in-out select-none ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background macro dial subtle watermark */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10 transition-opacity duration-1000 scale-105"
        style={{ backgroundImage: `url('/assets/images/blancpain_macro.jpg')` }}
      />
      <div className="absolute inset-0 bg-ivory/80 backdrop-blur-[2px]" />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md">
        {/* Crest mark */}
        <div className="w-9 h-9 border border-gold/40 rounded-full flex items-center justify-center mb-6">
          <div className="w-1.5 h-1.5 rounded-full bg-gold" />
        </div>

        {/* Wordmark */}
        <h1 className="text-4xl md:text-5xl font-editorial-heading tracking-[0.25em] text-charcoal font-medium">
          LARP
        </h1>

        {/* Subtitle */}
        <p className="mt-3 label-tracking text-graphite text-[10px] md:text-xs tracking-[0.28em] font-normal">
          THE ART OF HOROLOGY, REIMAGINED.
        </p>

        {/* Delicate Progress Line */}
        <div className="w-48 h-[1.5px] bg-stone-light/60 mt-8 overflow-hidden relative rounded-full">
          <div
            className="h-full bg-gold transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Quick Skip button for immediate convenience */}
        <button
          onClick={() => {
            setIsFadingOut(true);
            setTimeout(() => {
              setIsVisible(false);
              sessionStorage.setItem('larp_intro_shown', 'true');
              if (onComplete) onComplete();
            }, 200);
          }}
          className="mt-8 text-[10px] uppercase tracking-[0.2em] text-stone-dark hover:text-charcoal transition-colors underline-offset-4 hover:underline"
        >
          Skip Intro
        </button>
      </div>
    </div>
  );
};

