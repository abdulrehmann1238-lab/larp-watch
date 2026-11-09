import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 bg-espresso/95 backdrop-blur-md text-ivory border border-gold/30 rounded-lg shadow-luxury-dark text-sm animate-fade-in"
        >
          <div className="flex items-center gap-2.5">
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-sage shrink-0" />
            ) : toast.type === 'gold' ? (
              <span className="w-2 h-2 rounded-full bg-gold shrink-0 animate-pulse" />
            ) : (
              <Info className="w-4 h-4 text-gold/80 shrink-0" />
            )}
            <span className="font-sans font-light tracking-wide text-xs md:text-sm text-stone-light">
              {toast.message}
            </span>
          </div>
          <button
            onClick={() => dismissToast(toast.id)}
            className="text-stone-dark hover:text-ivory transition-colors p-1"
            aria-label="Close notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};

