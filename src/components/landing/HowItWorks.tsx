import React from 'react';
import { Scissors, Calendar, UserCheck, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../../constants/siteConfig';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      icon: Scissors,
      title: 'Cadastre seus Serviços & Equipe',
      description:
        'Defina os procedimentos oferecidos, duração exata em minutos e preços. Adicione seus profissionais com horários de trabalho e comissões.',
    },
    {
      step: '02',
      icon: Calendar,
      title: 'Configure sua Grade de Atendimento',
      description:
        'Ajuste o horário de funcionamento do estabelecimento (ex: 08:00 às 20:00) e os intervalos de tempo dos slots da sua agenda.',
    },
    {
      step: '03',
      icon: UserCheck,
      title: 'Lance e Gerencie os Agendamentos',
      description:
        'Registre os compromissos em poucos segundos pela gaveta lateral. Acompanhe a mudança de status (pendente, confirmado, concluído) em tempo real.',
    },
    {
      step: '04',
      icon: Sparkles,
      title: 'Automatize Avisos e Acompanhe Métricas',
      description:
        'O sistema se encarrega dos lembretes via WhatsApp e calcula os KPIs de faturamento e ocupação direto no seu Dashboard.',
    },
  ];

  return (
    <section id="como-funciona" className="py-20 sm:py-28 bg-zinc-100/50 dark:bg-[#0c0c0e]/60 border-y border-zinc-200/60 dark:border-zinc-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/50 px-3 py-1 rounded-full border border-violet-200/60 dark:border-violet-800/60">
            Passo a Passo
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Como funciona a operação no dia a dia
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
            Em menos de 10 minutos seu salão, barbearia ou clínica estará pronto para rodar com organização total.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative p-6 sm:p-7 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-violet-600/30 dark:text-violet-400/30 font-mono">
                      {item.step}
                    </span>
                    <div className="w-11 h-11 rounded-xl bg-violet-100 dark:bg-violet-950/70 text-violet-600 dark:text-violet-400 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2.5">
                    {item.title}
                  </h3>

                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-12 text-center">
          <Link
            to={SITE_CONFIG.links.systemAccess}
            className="inline-flex items-center gap-2 text-sm font-bold text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 hover:underline"
          >
            <span>Experimente agora mesmo o sistema em funcionamento</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
