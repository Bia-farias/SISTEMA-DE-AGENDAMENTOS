import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Preciso instalar algum programa no computador para usar?',
      answer:
        'Não! O Agenda AI é 100% online (nuvem). Você pode acessar de qualquer navegador web moderno em computadores, notebooks, tablets ou smartphones na recepção sem precisar de servidores locais ou instalações demoradas.',
    },
    {
      question: 'Consigo gerenciar vários profissionais com horários diferentes?',
      answer:
        'Sim. Você pode cadastrar quantos profissionais precisar, definindo dias da semana em que cada um trabalha, horários de início e término de expediente, especialidades e a taxa de comissão percentual individual.',
    },
    {
      question: 'Como funciona o envio de lembretes pelo WhatsApp?',
      answer:
        'O sistema integra automações de mensageria com regras prontas: confirmação no ato do agendamento, lembrete de véspera (24h antes) e aviso rápido (2h antes). O cliente pode responder confirmando a presença, atualizando o status na sua tela instantaneamente.',
    },
    {
      question: 'O sistema evita que dois clientes sejam marcados no mesmo horário?',
      answer:
        'Sim! A grade de agendamento valida a disponibilidade do profissional selecionado e da duração do procedimento, impedindo choques de horários e sobreposição de cadeiras.',
    },
    {
      question: 'Consigo acompanhar o faturamento e comissões da equipe?',
      answer:
        'Com certeza. O painel Dashboard calcula a receita diária de serviços confirmados e concluídos, taxa de ocupação das salas e resumo de desempenho para facilitar o fechamento de caixa.',
    },
    {
      question: 'Como posso testar o sistema agora?',
      answer:
        'Basta clicar no botão "Acessar sistema" no topo desta página. Você poderá experimentar a navegação imediatamente e visualizar todas as telas em funcionamento.',
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 sm:py-28 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/50 px-3 py-1 rounded-full border border-violet-200/60 dark:border-violet-800/60">
            Dúvidas Comuns
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Perguntas Frequentes
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400">
            Respostas diretas para as principais perguntas sobre a implantação e uso do sistema.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-bold text-base text-zinc-900 dark:text-zinc-100">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-zinc-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-violet-600 dark:text-violet-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800/60 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
