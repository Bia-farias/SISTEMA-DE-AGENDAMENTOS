import React, { useEffect, useRef, useState } from 'react';
import { useAIChatStore, AIChatMessage } from '../../stores/aiChatStore';
import {
  X,
  Send,
  Sparkles,
  Trash2,
  Bot,
  User,
  RotateCcw,
  ChevronDown,
} from 'lucide-react';

// ─── Markdown-like renderer (simple, no dependency) ────────────────────────

function renderContent(text: string): React.ReactNode {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Table rows
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      const rows = tableLines.filter((l) => !l.match(/^\|[-\s|]+\|$/));
      elements.push(
        <div key={i} className="overflow-x-auto my-2">
          <table className="text-[11px] border-collapse w-full">
            <tbody>
              {rows.map((row, ri) => {
                const cells = row
                  .split('|')
                  .slice(1, -1)
                  .map((c) => c.trim());
                return (
                  <tr key={ri} className={ri === 0 ? 'font-bold bg-white/10' : ''}>
                    {cells.map((cell, ci) => (
                      <td key={ci} className="px-2 py-1 border border-white/20">
                        {cell}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // Bullet points
    if (line.trim().startsWith('• ') || line.trim().startsWith('- ')) {
      elements.push(
        <li key={i} className="ml-3 list-none flex gap-1.5 items-start">
          <span className="text-violet-400 mt-0.5 shrink-0">•</span>
          <span>{inlineFormat(line.replace(/^[\s•\-]+/, ''))}</span>
        </li>
      );
      i++;
      continue;
    }

    // Arrow items
    if (line.trim().startsWith('→ ')) {
      elements.push(
        <li key={i} className="ml-3 list-none flex gap-1.5 items-start text-zinc-300">
          <span className="text-violet-400 mt-0.5 shrink-0">→</span>
          <span>{inlineFormat(line.replace(/^[\s→]+/, ''))}</span>
        </li>
      );
      i++;
      continue;
    }

    // Numbered list
    if (/^\d+\.\s/.test(line.trim())) {
      const num = line.trim().match(/^(\d+)\./)?.[1];
      elements.push(
        <li key={i} className="ml-3 list-none flex gap-1.5 items-start">
          <span className="text-violet-400 font-bold shrink-0">{num}.</span>
          <span>{inlineFormat(line.replace(/^\s*\d+\.\s/, ''))}</span>
        </li>
      );
      i++;
      continue;
    }

    // Empty line = spacer
    if (line.trim() === '') {
      elements.push(<div key={i} className="h-1" />);
      i++;
      continue;
    }

    // Normal paragraph
    elements.push(
      <p key={i} className="leading-relaxed">
        {inlineFormat(line)}
      </p>
    );
    i++;
  }

  return <div className="space-y-0.5 text-[12.5px]">{elements}</div>;
}

function inlineFormat(text: string): React.ReactNode {
  // Bold: **text**
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-bold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

// ─── Message Bubble ─────────────────────────────────────────────────────────

function MessageBubble({ message }: { message: AIChatMessage }) {
  const isUser = message.role === 'user';
  const timeStr = message.timestamp.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  if (isUser) {
    return (
      <div className="flex justify-end gap-2 items-end animate-fade-in">
        <div className="max-w-[85%]">
          <div className="bg-violet-600 text-white rounded-2xl rounded-br-sm px-4 py-2.5 text-[12.5px] leading-relaxed shadow-md shadow-violet-900/30">
            {message.content}
          </div>
          <p className="text-[10px] text-zinc-500 mt-1 text-right">{timeStr}</p>
        </div>
        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-violet-500 to-purple-600 flex items-center justify-center shrink-0 mb-4">
          <User size={13} className="text-white" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start gap-2 items-end animate-fade-in">
      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center shrink-0 mb-4 shadow-md shadow-violet-900/40">
        <Sparkles size={12} className="text-white" />
      </div>
      <div className="max-w-[90%]">
        <div className="bg-zinc-800/90 border border-zinc-700/60 text-zinc-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-md">
          {renderContent(message.content)}
        </div>
        <p className="text-[10px] text-zinc-500 mt-1">{timeStr}</p>
      </div>
    </div>
  );
}

// ─── Typing Indicator ────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="flex justify-start gap-2 items-end animate-fade-in">
      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center shrink-0">
        <Sparkles size={12} className="text-white" />
      </div>
      <div className="bg-zinc-800/90 border border-zinc-700/60 rounded-2xl rounded-bl-sm px-4 py-3">
        <div className="flex gap-1.5 items-center h-4">
          <span className="w-2 h-2 rounded-full bg-violet-400 animate-bounce [animation-delay:0ms]" />
          <span className="w-2 h-2 rounded-full bg-violet-400 animate-bounce [animation-delay:150ms]" />
          <span className="w-2 h-2 rounded-full bg-violet-400 animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}

// ─── Quick Suggestion Chips ──────────────────────────────────────────────────

const SUGGESTIONS = [
  '📊 Quanto faturamos hoje?',
  '📅 Quem está na agenda hoje?',
  '⭐ Quais são nossos clientes VIP?',
  '✂️ Liste nossos serviços e preços',
  '📱 Crie mensagem de reativação para clientes inativos',
  '👥 Quem está na equipe?',
];

function SuggestionChips({ onSelect }: { onSelect: (text: string) => void }) {
  return (
    <div className="px-4 pb-3">
      <p className="text-[10px] text-zinc-500 mb-2 font-semibold uppercase tracking-wider">
        Sugestões
      </p>
      <div className="flex flex-wrap gap-1.5">
        {SUGGESTIONS.map((s, i) => (
          <button
            key={i}
            onClick={() => onSelect(s)}
            className="text-[11px] px-2.5 py-1 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700/60 hover:border-violet-500/40 text-zinc-300 hover:text-violet-300 transition-all duration-150 font-medium"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Main Chat Panel ─────────────────────────────────────────────────────────

export function AIChatPanel() {
  const { isOpen, messages, isLoading, closeChat, sendMessage, clearHistory } = useAIChatStore();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (smooth = true) => {
    messagesEndRef.current?.scrollIntoView({ behavior: smooth ? 'smooth' : 'instant' });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
      scrollToBottom(false);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleScroll = () => {
    const el = messagesContainerRef.current;
    if (!el) return;
    const distFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    setShowScrollBtn(distFromBottom > 100);
  };

  const handleSubmit = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    setInput('');
    await sendMessage(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSuggestion = (text: string) => {
    if (isLoading) return;
    sendMessage(text);
  };

  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] lg:hidden"
          onClick={closeChat}
        />
      )}

      {/* Chat Panel */}
      <div
        className={`fixed right-0 top-0 h-full z-50 flex flex-col bg-[#0f0f12] border-l border-zinc-800/80 shadow-2xl shadow-black/60 transition-all duration-300 ease-out ${
          isOpen
            ? 'translate-x-0 opacity-100'
            : 'translate-x-full opacity-0 pointer-events-none'
        }`}
        style={{ width: 'min(440px, 100vw)' }}
      >
        {/* Header */}
        <div className="relative flex items-center justify-between px-5 py-4 border-b border-zinc-800/80 bg-gradient-to-r from-violet-950/80 via-purple-950/70 to-[#0f0f12] shrink-0">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-transparent pointer-events-none" />

          <div className="flex items-center gap-3 relative">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-900/50">
              <Sparkles size={17} className="text-white" />
            </div>
            <div>
              <h2 className="font-bold text-sm text-white leading-tight">Assistente IA</h2>
              <p className="text-[10px] text-zinc-400 font-medium">
                {apiKey ? '🟢 Groq conectado' : '🟡 Modo simulado'} · Sempre atualizado
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 relative">
            {messages.length > 0 && (
              <button
                onClick={clearHistory}
                className="p-2 rounded-xl text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
                title="Limpar conversa"
              >
                <Trash2 size={15} />
              </button>
            )}
            <button
              onClick={closeChat}
              className="p-2 rounded-xl text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
              title="Fechar assistente"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Messages area */}
        <div
          ref={messagesContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
        >
          {messages.length === 0 ? (
            /* Welcome Screen */
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 pb-8 animate-fade-in">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-2xl shadow-violet-900/60 animate-pulse-slow">
                <Sparkles size={28} className="text-white" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-lg mb-1">Olá! Sou seu Assistente IA ✨</h3>
                <p className="text-zinc-400 text-xs leading-relaxed max-w-[280px]">
                  Tenho acesso aos dados reais do seu negócio. Posso analisar faturamento,
                  agenda, clientes e muito mais. O que deseja saber?
                </p>
              </div>
              {!apiKey && (
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl px-3 py-2 text-[11px] text-amber-400 max-w-[300px] text-left">
                  <strong>🔧 Modo Simulado:</strong> Configure <code className="bg-amber-500/20 px-1 rounded">VITE_GROQ_API_KEY</code> no seu <code>.env</code> para usar a IA real com Groq.
                </div>
              )}
            </div>
          ) : (
            <>
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              {isLoading && <TypingIndicator />}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Scroll to bottom button */}
        {showScrollBtn && (
          <button
            onClick={() => scrollToBottom()}
            className="absolute bottom-24 right-4 p-2 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-zinc-200 shadow-lg transition-all animate-fade-in"
          >
            <ChevronDown size={16} />
          </button>
        )}

        {/* Suggestion chips (only when no messages) */}
        {messages.length === 0 && (
          <SuggestionChips onSelect={handleSuggestion} />
        )}

        {/* Input Area */}
        <div className="p-4 border-t border-zinc-800/80 bg-[#0f0f12] shrink-0">
          <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-700/60 rounded-2xl px-3.5 py-2 focus-within:border-violet-500/60 focus-within:ring-2 focus-within:ring-violet-500/20 transition-all">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Pergunte sobre agendamentos, clientes, receita..."
              disabled={isLoading}
              className="flex-1 bg-transparent text-zinc-100 placeholder-zinc-500 text-xs outline-none disabled:opacity-50"
            />
            <button
              onClick={handleSubmit}
              disabled={!input.trim() || isLoading}
              className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shadow-violet-900/40 shrink-0"
            >
              <Send size={13} className="text-white" />
            </button>
          </div>
          <p className="text-[10px] text-zinc-600 text-center mt-2">
            Enter para enviar · Dados atualizados em tempo real
          </p>
        </div>
      </div>
    </>
  );
}
