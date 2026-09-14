import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  TrendingUp,
  MessageSquare,
  Users,
  Shield,
  Star,
  Zap,
} from 'lucide-react';
import { SITE_CONFIG } from '../../constants/siteConfig';

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden"
    >
      {/* Background Decorative Gradients & Grid Pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-violet-400/20 via-indigo-300/15 to-pink-300/10 dark:from-violet-600/15 dark:via-indigo-600/10 dark:to-purple-900/10 blur-[120px] rounded-full" />
        <div className="absolute -top-24 right-10 w-96 h-96 bg-violet-400/10 dark:bg-violet-600/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Text Content */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-50 dark:bg-violet-950/70 border border-violet-200/80 dark:border-violet-800/80 text-violet-700 dark:text-violet-300 text-xs font-semibold shadow-sm animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-violet-600 dark:bg-violet-400 animate-ping" />
            <span>Desenvolvido para Salões, Clínicas e Barbearias</span>
            <span className="text-violet-300 dark:text-violet-700">•</span>
            <span className="text-violet-600 dark:text-violet-400 font-bold">Versão 2.0</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight leading-[1.15]">
            A gestão da sua agenda e clientes,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 dark:from-violet-400 dark:via-purple-400 dark:to-indigo-300">
              simplificada e inteligente.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal max-w-2xl mx-auto">
            Elimine o descontrole de horários e mensagens perdidas. Centralize
            profissionais, clientes, serviços e lembretes automáticos no WhatsApp em
            uma plataforma ágil e profissional.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to={SITE_CONFIG.links.systemAccess}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-violet-600 hover:bg-violet-700 active:bg-violet-800 rounded-xl shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/35 transition-all duration-200 hover:-translate-y-0.5"
            >
              <span>Acessar o sistema</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#funcionalidades"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-zinc-700 dark:text-zinc-200 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-xl transition-all duration-200 shadow-sm"
            >
              <span>Conhecer funcionalidades</span>
            </a>
          </div>

          {/* Trust Highlights */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Sem instalação — 100% Web</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Lembretes automáticos no WhatsApp</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Multi-profissional e comissões</span>
            </div>
          </div>
        </div>

        {/* Visual System Mockup / Interactive Dashboard Presentation */}
        <div className="mt-14 sm:mt-18 relative max-w-5xl mx-auto">
          {/* Ambient Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 rounded-3xl blur-2xl opacity-60 dark:opacity-40" />

          {/* Main App Mockup Window */}
          <div className="relative rounded-2xl sm:rounded-3xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#121215] shadow-2xl shadow-zinc-900/10 dark:shadow-black/60 overflow-hidden">
            {/* Window Browser Header Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-100/80 dark:bg-zinc-900/90 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-400/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-400/80 inline-block" />
              </div>
              <div className="px-4 py-1 rounded-md bg-white dark:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-700/60 text-[11px] font-mono text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>app.agendaai.com/dashboard</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-medium">
                <span className="hidden sm:inline">Modo Demonstração Ativo</span>
              </div>
            </div>

            {/* Mockup Internal View: Real Agenda & Dashboard State */}
            <div className="p-4 sm:p-6 lg:p-8 bg-zinc-50/50 dark:bg-[#0d0d10] space-y-6">
              {/* Top Business Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200/70 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-violet-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                    SP
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-zinc-900 dark:text-zinc-50 text-base sm:text-lg">
                        Studio Prime & Estética
                      </h3>
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60">
                        Plano Pro
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Agenda de Atendimentos — Visualização em Tempo Real
                    </p>
                  </div>
                </div>

                {/* KPI Chips */}
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-xl text-left shadow-xs">
                    <span className="text-[10px] uppercase font-semibold text-zinc-400 block">
                      Receita Hoje
                    </span>
                    <span className="text-sm font-extrabold text-zinc-900 dark:text-zinc-100">
                      R$ 980,00
                    </span>
                  </div>
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-xl text-left shadow-xs">
                    <span className="text-[10px] uppercase font-semibold text-zinc-400 block">
                      Taxa de Ocupação
                    </span>
                    <span className="text-sm font-extrabold text-violet-600 dark:text-violet-400">
                      68% (Ativa)
                    </span>
                  </div>
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-xl text-left shadow-xs">
                    <span className="text-[10px] uppercase font-semibold text-zinc-400 block">
                      WhatsApp Status
                    </span>
                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Conectado
                    </span>
                  </div>
                </div>
              </div>

              {/* Schedule Timeline Preview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Appointment Card 1 */}
                <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs hover:border-violet-300 dark:hover:border-violet-700 transition-colors">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-violet-500" />
                      09:00 — 10:00
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                      Concluído
                    </span>
                  </div>
                  <h4 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                    Juliana Mendes
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">
                    Corte Feminino & Escova Modeladora
                  </p>
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
                    <span className="text-zinc-400 font-medium">Camila Albuquerque</span>
                    <span className="font-bold text-zinc-900 dark:text-zinc-200">R$ 140,00</span>
                  </div>
                </div>

                {/* Appointment Card 2 */}
                <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-violet-300 dark:border-violet-800/80 shadow-xs ring-1 ring-violet-500/20">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-violet-500" />
                      10:00 — 10:45
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
                      Confirmado
                    </span>
                  </div>
                  <h4 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                    Rodrigo Antunes
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">
                    Corte Masculino Premium + Barbearia
                  </p>
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
                    <span className="text-zinc-400 font-medium">Lucas Ferreira</span>
                    <span className="font-bold text-zinc-900 dark:text-zinc-200">R$ 75,00</span>
                  </div>
                </div>

                {/* Appointment Card 3 */}
                <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-zinc-400" />
                      14:00 — 16:00
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">
                      Pendente
                    </span>
                  </div>
                  <h4 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                    Larissa Vasconcelos
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">
                    Alongamento em Gel (Fibra de Vidro)
                  </p>
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
                    <span className="text-zinc-400 font-medium">Beatriz Lima</span>
                    <span className="font-bold text-zinc-900 dark:text-zinc-200">R$ 220,00</span>
                  </div>
                </div>
              </div>

              {/* Interactive Floating Micro-Banners */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/5 border border-emerald-500/20 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 block">
                      Automação de WhatsApp Ativa
                    </span>
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      Lembrete de véspera (24h) enviado para 6 clientes hoje.
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-gradient-to-r from-violet-500/10 to-purple-500/5 border border-violet-500/20 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-violet-500/20 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 block">
                      Inteligência Artificial Integrada
                    </span>
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      Identificou 3 clientes inativos com sugestão de retorno.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
