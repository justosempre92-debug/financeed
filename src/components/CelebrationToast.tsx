import React from 'react';
import { Star, Sparkles, X } from 'lucide-react';

interface ToastData {
  title: string;
  message: string;
  starsAdded?: number;
  emoji?: string;
}

interface CelebrationToastProps {
  toast: ToastData | null;
  onClose: () => void;
}

export const CelebrationToast: React.FC<CelebrationToastProps> = ({ toast, onClose }) => {
  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-50 max-w-sm w-full bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200 p-1 rounded-3xl shadow-2xl animate-bounce">
      <div className="bg-white rounded-[22px] p-4 flex items-center justify-between gap-3 shadow-inner">
        <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-2xl shrink-0 shadow-xs">
          {toast.emoji || '⭐'}
        </div>

        <div className="flex-1 text-left">
          <div className="flex items-center gap-1.5">
            <h4 className="font-extrabold text-slate-900 text-sm">
              {toast.title}
            </h4>
            {toast.starsAdded && (
              <span className="text-xs bg-amber-100 text-amber-900 font-black px-2 py-0.5 rounded-full border border-amber-300 flex items-center gap-0.5">
                +{toast.starsAdded} <Star className="w-3 h-3 text-amber-500 fill-amber-400 inline" />
              </span>
            )}
          </div>
          <p className="text-xs text-slate-600 mt-0.5">
            {toast.message}
          </p>
        </div>

        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 p-1 rounded-full cursor-pointer"
          aria-label="Fechar notificação"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
