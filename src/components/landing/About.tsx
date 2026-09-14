import React from 'react';
import {
  CheckCircle2,
  XCircle,
  CalendarCheck,
  Zap,
  Users2,
  TrendingUp,
  Clock,
  Layers,
  Sparkles,
} from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="sobre" className="py-20 sm:py-28 bg-zinc-100/50 dark:bg-[#0c0c0e]/60 border-y border-zinc-200/60 dark:border-zinc-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header da Seção */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/50 px-3 py-1 rounded-full border border-violet-200/60 dark:border-violet-800/60">
            Sobre o Sistema
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Desenvolvido para transformar o caos da sua rotina em clareza absoluta
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
            O <strong>Agenda AI</strong> foi criado especificamente para negócios que dependem de agendamento por hora — como salões de beleza, barbearias, clínicas de estética e profissionais autônomos. Ele centraliza tudo em uma única tela fluida, eliminando a dependência de cadernos de papel e mensagens dispersas.
          </p>
        </div>

        {/* 3 Pilares Centrais */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-950/80 text-violet-600 dark:text-violet-400 flex items-center justify-center mb-5">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              Centralização Total
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Todos os horários, escalas de profissionais, preços de serviços e histórico de atendimentos ficam armazenados e acessíveis em qualquer dispositivo com internet.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-5">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              Fim do "No-Show" e Faltas
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              O sistema dispara notificações inteligentes de lembrete com antecedência de 24 horas e 2 horas, permitindo que os clientes confirmem presença com 1 clique.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-5">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              Controle de Faturamento & Equipe
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Saiba exatamente quanto seu negócio faturou hoje, a taxa de ocupação das cadeiras e o valor exato de comissão a pagar para cada profissional da equipe.
            </p>
          </div>
        </div>

        {/* Comparação: Antes vs Depois do Agenda AI */}
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-sm">
          <div className="p-6 sm:p-8 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
            <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 text-center">
              A evolução da sua operação diária
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center mt-1">
              Veja a diferença prática entre a gestão tradicional e a rotina com o Agenda AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-zinc-200 dark:divide-zinc-800">
            {/* O Modo Tradicional */}
            <div className="p-6 sm:p-8 space-y-4 bg-red-50/20 dark:bg-red-950/10">
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold text-base">
                <XCircle className="w-5 h-5" />
                <span>Gestão Manual & Tradicional</span>
              </div>
              <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold mt-0.5">✕</span>
                  <span>Clientes que faltam e deixam horários vagos sem aviso prévio.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold mt-0.5">✕</span>
                  <span>Conflito de horários: dois clientes marcados com o mesmo profissional.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold mt-0.5">✕</span>
                  <span>Horas perdidas respondendo áudios e mensagens no WhatsApp manualmente.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold mt-0.5">✕</span>
                  <span>Dificuldade no fim do mês para calcular comissões de cada especialista.</span>
                </li>
              </ul>
            </div>

            {/* Com o Agenda AI */}
            <div className="p-6 sm:p-8 space-y-4 bg-emerald-50/20 dark:bg-emerald-950/10">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-base">
                <CheckCircle2 className="w-5 h-5" />
                <span>Com o Agenda AI</span>
              </div>
              <ul className="space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Confirmação automática de presença 24h e 2h antes no WhatsApp.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Grade visual inteligente que impede sobreposição e choque de horários.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Clientes cadastrados com histórico de serviços, total gasto e selo VIP.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Cálculo automático de comissões por porcentagem cadastrada na equipe.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
