import { useAIChatStore } from '../../stores/aiChatStore';
import { Sparkles, X } from 'lucide-react';

export function AIFloatingButton() {
  const { isOpen, openChat, closeChat, messages, hasUnreadMessages } = useAIChatStore();
  const unreadCount = hasUnreadMessages ? 1 : 0;

  return (
    <div className="fixed bottom-24 right-5 lg:bottom-8 lg:right-7 z-40">
      {/* Outer glow ring (visible when closed) */}
      {!isOpen && (
        <span className="absolute inset-0 rounded-full bg-violet-500/30 animate-ping" />
      )}

      <button
        onClick={() => (isOpen ? closeChat() : openChat())}
        title={isOpen ? 'Fechar Assistente IA' : 'Abrir Assistente IA'}
        className={`relative w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-300 select-none ${
          isOpen
            ? 'bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 rotate-0 scale-95'
            : 'bg-gradient-to-tr from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 hover:scale-110 shadow-violet-600/50 rotate-0'
        }`}
      >
        {isOpen ? (
          <X size={20} className="text-zinc-300" />
        ) : (
          <Sparkles size={22} className="text-white drop-shadow-sm" />
        )}

        {/* Unread badge */}
        {!isOpen && unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center shadow-sm ring-2 ring-white dark:ring-zinc-900 animate-bounce">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Tooltip label (desktop only) */}
      {!isOpen && (
        <div className="hidden lg:flex absolute right-16 top-1/2 -translate-y-1/2 items-center gap-2 pointer-events-none">
          <div className="bg-zinc-900 border border-zinc-700 text-white text-[11px] font-semibold px-3 py-1.5 rounded-xl shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Assistente IA ✨
          </div>
        </div>
      )}
    </div>
  );
}
