import React from 'react';
import {
  Calendar,
  Users,
  Scissors,
  UserCheck,
  TrendingUp,
  MessageSquare,
  Sparkles,
  Clock,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      icon: Calendar,
      title: 'Agenda & Calendário Inteligente',
      description:
        'Visualização clara de todos os horários do dia com filtros por profissional. Identifique rapidamente slots livres e agendamentos confirmados, pendentes ou concluídos.',
      badge: 'Core do Sistema',
      color: 'violet',
    },
    {
      icon: Users,
      title: 'CRM Completo de Clientes',
      description:
        'Mantenha o histórico detalhado de cada cliente: total de atendimentos realizados, valor acumulado investido, data da última visita, preferências e selo VIP automático.',
      badge: 'Fidelização',
      color: 'blue',
    },
    {
      icon: UserCheck,
      title: 'Equipe & Gestão de Comissões',
      description:
        'Cadastre seus colaboradores com especialidades, horários de expediente, dias da semana e porcentagem de comissão individual calculada automaticamente.',
      badge: 'Multi-profissional',
      color: 'cyan',
    },
    {
      icon: Scissors,
      title: 'Catálogo de Serviços Personalizado',
      description:
        'Organize seu menu por categorias (Cabelo, Barbearia, Unhas, Estética, Corporal), definindo duração exata em minutos e preços para planejar os intervalos da agenda.',
      badge: 'Organização',
      color: 'pink',
    },
    {
      icon: TrendingUp,
      title: 'Dashboard de Indicadores (KPIs)',
      description:
        'Monitore a saúde do seu negócio em tempo real: receita diária, total de atendimentos concluídos, novos clientes no mês e taxa de ocupação da sua capacidade.',
      badge: 'Gestão Financeira',
      color: 'emerald',
    },
    {
      icon: MessageSquare,
      title: 'Automação & Lembretes no WhatsApp',
      description:
        'Dispare mensagens automáticas de confirmação imediata, lembretes de véspera (24h) e alertas de 2 horas antes do atendimento para erradicar o no-show e cancelamentos.',
      badge: 'Anti-Faltas',
      color: 'green',
    },
    {
      icon: Sparkles,
      title: 'Assistente com Inteligência Artificial',
      description:
        'Converse com uma IA contextualizada com os dados reais do seu negócio. Consulte faturamento, liste clientes para reativação e gere mensagens promocionais.',
      badge: 'Inovação com IA',
      color: 'purple',
    },
  ];

  return (
    <section id="funcionalidades" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/50 px-3 py-1 rounded-full border border-violet-200/60 dark:border-violet-800/60">
            Funcionalidades Reais
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Tudo o que seu estabelecimento precisa para operar no mais alto nível
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
            Cada recurso foi desenhado com base nas dores reais do dia a dia de salões, barbearias e clínicas. Sem telas desnecessárias, apenas foco em agilidade.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative p-6 sm:p-7 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs hover:shadow-xl hover:border-violet-300 dark:hover:border-violet-700/80 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-violet-600 group-hover:text-white transition-all duration-300 shadow-xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700/60">
                    {feature.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                  {feature.title}
                </h3>

                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}

          {/* Featured Highlight Card */}
          <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 text-white shadow-lg flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 text-white flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold tracking-tight">
                Interface Fluida & 100% Responsiva
              </h3>
              <p className="text-sm text-violet-100 leading-relaxed">
                Desenvolvido com gavetas dinâmicas (*drawers*), modo escuro automático, atalhos rápidos e suporte completo para uso em smartphones e tablets na recepção.
              </p>
            </div>

            <div className="pt-6 border-t border-white/20 mt-6 flex items-center gap-2 text-xs font-semibold text-violet-100">
              <CheckCircle className="w-4 h-4 text-emerald-300" />
              <span>Sem necessidade de treinamento complexo</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
