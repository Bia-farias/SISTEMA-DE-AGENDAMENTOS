import React, { useState } from 'react';
import {
  Calendar,
  MessageSquare,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Phone,
  Sparkles,
  User,
} from 'lucide-react';

export const InteractivePreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'agenda' | 'whatsapp' | 'kpis'>('agenda');

  return (
    <section className="py-16 bg-zinc-100/40 dark:bg-[#09090b] border-y border-zinc-200/80 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/60 px-3 py-1 rounded-full border border-violet-200/60 dark:border-violet-800/60">
            Experimentação Rápida
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Veja como o sistema funciona na prática
          </h2>
          <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400">
            Alterne entre os módulos para visualizar a experiência de agendamento, comunicação e gestão.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveTab('agenda')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              activeTab === 'agenda'
                ? 'bg-violet-600 text-white shadow-md shadow-violet-500/25'
                : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 border border-zinc-200 dark:border-zinc-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Calendário do Dia</span>
          </button>

          <button
            onClick={() => setActiveTab('whatsapp')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              activeTab === 'whatsapp'
                ? 'bg-violet-600 text-white shadow-md shadow-violet-500/25'
                : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 border border-zinc-200 dark:border-zinc-800'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Lembretes no WhatsApp</span>
          </button>

          <button
            onClick={() => setActiveTab('kpis')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              activeTab === 'kpis'
                ? 'bg-violet-600 text-white shadow-md shadow-violet-500/25'
                : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 border border-zinc-200 dark:border-zinc-800'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Métricas & Dashboard</span>
          </button>
        </div>

        {/* Tab Content Window */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xl overflow-hidden p-5 sm:p-7">
          {/* TAB 1: AGENDA */}
          {activeTab === 'agenda' && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                <div>
                  <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-base">
                    Agenda do Dia — Studio Prime & Estética
                  </h4>
                  <p className="text-xs text-zinc-400">
                    Sincronizada em tempo real com todos os profissionais
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                    Hoje • 6 agendamentos
                  </span>
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-zinc-700/60">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-violet-100 dark:bg-violet-950/70 text-violet-600 dark:text-violet-400 flex items-center justify-center font-bold text-xs">
                      09:00
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">Juliana Mendes</span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300">VIP</span>
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">Corte Feminino & Escova Modeladora • com Camila Albuquerque</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                      Concluído
                    </span>
                    <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 block mt-1">R$ 140,00</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-violet-50/40 dark:bg-violet-950/20 border border-violet-200 dark:border-violet-800/60">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs">
                      10:00
                    </div>
                    <div>
                      <span className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">Rodrigo Antunes</span>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">Corte Masculino Premium • com Lucas Ferreira</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                      Confirmado
                    </span>
                    <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 block mt-1">R$ 75,00</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-zinc-700/60">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-xs">
                      14:00
                    </div>
                    <div>
                      <span className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">Larissa Vasconcelos</span>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">Alongamento em Gel (Fibra) • com Beatriz Lima</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
                      Pendente Lembrete
                    </span>
                    <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 block mt-1">R$ 220,00</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: WHATSAPP */}
          {activeTab === 'whatsapp' && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
                <div>
                  <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-base">
                    Simulação de Notificação por WhatsApp
                  </h4>
                  <p className="text-xs text-zinc-400">
                    Gatilho automático disparado com antecedência de 24h
                  </p>
                </div>
                <span className="px-2 py-1 rounded text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                  Taxa de Confirmação: 92.5%
                </span>
              </div>

              {/* Chat Message Bubble Mockup */}
              <div className="max-w-md mx-auto p-4 rounded-2xl bg-[#e5ddd5] dark:bg-[#1f2c34] text-zinc-900 dark:text-zinc-100 font-sans shadow-inner">
                <div className="p-3.5 rounded-xl bg-white dark:bg-[#005c4b] text-xs sm:text-sm leading-relaxed shadow-sm">
                  <p className="font-semibold text-violet-700 dark:text-emerald-200 mb-1">
                    Studio Prime & Estética
                  </p>
                  <p>
                    Olá, <strong>Beatriz Lima</strong>! 👋
                  </p>
                  <p className="mt-2">
                    Passando para lembrar do seu horário amanhã! 🔔
                  </p>
                  <div className="mt-2 p-2 rounded bg-zinc-50 dark:bg-black/20 text-xs space-y-1">
                    <p>📅 <strong>Data:</strong> Amanhã às 14:00</p>
                    <p>✂️ <strong>Serviço:</strong> Alongamento em Gel</p>
                    <p>👤 <strong>Profissional:</strong> Camila Albuquerque</p>
                  </div>
                  <p className="mt-2 font-medium">
                    Por favor, responda:<br />
                    <strong>1</strong> para Confirmar presença ✅<br />
                    <strong>2</strong> para Remarcar 🔄
                  </p>
                  <div className="text-right text-[10px] text-zinc-400 dark:text-zinc-300 mt-1">
                    10:15 ✓✓ Entregue
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: KPIS */}
          {activeTab === 'kpis' && (
            <div className="space-y-4 animate-fade-in">
              <div className="pb-3 border-b border-zinc-100 dark:border-zinc-800">
                <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-base">
                  Painel de Indicadores do Dia
                </h4>
                <p className="text-xs text-zinc-400">
                  Métricas calculadas em tempo real com base no faturamento e agendamentos
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/60">
                  <span className="text-[11px] font-bold text-zinc-400 uppercase">Receita Estimada</span>
                  <span className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 block mt-1">R$ 980,00</span>
                  <span className="text-[11px] text-emerald-600 font-semibold">+18.4% esta semana</span>
                </div>

                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/60">
                  <span className="text-[11px] font-bold text-zinc-400 uppercase">Atendimentos</span>
                  <span className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 block mt-1">6 hoje</span>
                  <span className="text-[11px] text-zinc-400">1 concluído • 5 agendados</span>
                </div>

                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/60">
                  <span className="text-[11px] font-bold text-zinc-400 uppercase">Taxa de Ocupação</span>
                  <span className="text-xl font-extrabold text-violet-600 dark:text-violet-400 block mt-1">68%</span>
                  <span className="text-[11px] text-zinc-400">Capacidade ativa</span>
                </div>

                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/60">
                  <span className="text-[11px] font-bold text-zinc-400 uppercase">Novos Clientes</span>
                  <span className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 block mt-1">14</span>
                  <span className="text-[11px] text-emerald-600 font-semibold">Neste mês</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
