import React from 'react';
import { useShop } from '../../context/ShopContext';
import { CheckCircle2, Sparkles, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-[#C9A96E]/40 shadow-xl transition-all duration-300 animate-slide-in-right"
        >
          {toast.type === 'gold' && <Sparkles className="w-5 h-5 text-[#C9A96E] shrink-0 mt-0.5" />}
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-[#6B6B6B] shrink-0 mt-0.5" />}

          <div className="flex-1 min-w-0">
            <h5 className="font-serif text-sm font-semibold text-[#0B0B0B]">{toast.title}</h5>
            <p className="text-xs text-[#6B6B6B] mt-0.5 leading-snug">{toast.message}</p>
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-[#6B6B6B] hover:text-[#0B0B0B] p-1 rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
