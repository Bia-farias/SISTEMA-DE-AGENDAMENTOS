import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useUIStore } from '../../stores/uiStore';
import { cn } from '../../utils/cn';
import { ToastMessage } from '../../types';

export function ToastContainer() {
  const { toasts, removeToast } = useUIStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast: ToastMessage) => {
        const icons: Record<ToastMessage['type'], React.ReactNode> = {
          success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
          error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
          warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
          info: <Info className="w-5 h-5 text-sky-500 shrink-0" />,
        };

        const borders: Record<ToastMessage['type'], string> = {
          success: 'border-emerald-500/30 dark:border-emerald-500/20',
          error: 'border-rose-500/30 dark:border-rose-500/20',
          warning: 'border-amber-500/30 dark:border-amber-500/20',
          info: 'border-sky-500/30 dark:border-sky-500/20',
        };

        return (
          <div
            key={toast.id}
            className={cn(
              'pointer-events-auto flex items-start gap-3 p-4 rounded-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md shadow-xl border transition-all animate-slide-in-right',
              borders[toast.type]
            )}
          >
            {icons[toast.type]}
            <div className="flex-1">
              {toast.title && (
                <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 mb-0.5">
                  {toast.title}
                </h4>
              )}
              <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors p-1"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
