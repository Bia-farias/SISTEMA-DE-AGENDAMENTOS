import React from 'react';
import {
  ShieldCheck,
  Clock,
  TrendingUp,
  Smile,
  CheckCircle2,
  CalendarX,
  FileSpreadsheet,
  Zap,
} from 'lucide-react';

export const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: Clock,
      title: 'Economia Real de Mais de 12 Horas por Semana',
      description:
        'Sua recepção e equipe não precisam mais passar o dia respondendo se "tem horário vago para hoje". O fluxo de agendamento e confirmação se torna automático.',
      stat: '12h/semana',
      statLabel: 'poupadas em mensagens manuais',
    },
    {
      icon: CalendarX,
      title: 'Zero Conflito de Horários & Sobreposições',
      description:
        'O sistema bloqueia instantaneamente horários já ocupados por profissional, eliminando o constrangimento de ter dois clientes marcados no mesmo minuto.',
      stat: '100%',
      statLabel: 'precisão na alocação de cadeiras',
    },
    {
      icon: TrendingUp,
      title: 'Redução Drástica do Cancelamento e Faltas (No-Show)',
      description:
        'Com as notificações de lembrete com 24h e 2h de antecedência pelo WhatsApp, sua taxa de comparecimento sobe para mais de 90%.',
      stat: '-85%',
      statLabel: 'na taxa de faltas sem aviso',
    },
    {
      icon: Smile,
      title: 'Experiência Premium e Moderna para seu Cliente',
      description:
        'Seu cliente recebe mensagens profissionais com o nome do estabelecimento, serviço contratado, profissional e orientações, transmitindo credibilidade.',
      stat: '99.2%',
      statLabel: 'aprovação dos clientes atendidos',
    },
    {
      icon: FileSpreadsheet,
      title: 'Adeus a Planilhas Confusas e Cadernos Rasurados',
      description:
        'Acesse a agenda de qualquer lugar: do computador da recepção, do tablet no salão ou do celular do proprietário em casa.',
      stat: 'Nuvem',
      statLabel: 'acesso 24h por dia e backup seguro',
    },
    {
      icon: Zap,
      title: 'Decisões Baseadas em Dados, Não em Suposições',
      description:
        'Descubra com 1 clique quais são os serviços mais lucrativos, os horários com maior demanda e quais clientes estão inativos há mais de 30 dias para resgatá-los.',
      stat: '+25%',
      statLabel: 'em retorno de clientes inativos',
    },
  ];

  return (
    <section id="beneficios" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/50 px-3 py-1 rounded-full border border-violet-200/60 dark:border-violet-800/60">
            Vantagens Competitivas
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Por que estabelecimentos líderes escolhem o Agenda AI?
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
            Mais do que um simples calendário: uma ferramenta desenhada para aumentar a pontualidade, encantar sua clientela e proteger seu faturamento.
          </p>
        </div>

        {/* Benefits Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="p-7 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-violet-50 dark:bg-violet-950/70 text-violet-600 dark:text-violet-400 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2.5">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-violet-600 dark:text-violet-400 font-sans">
                    {benefit.stat}
                  </span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                    {benefit.statLabel}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
