import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, MessageCircle, ShieldCheck } from 'lucide-react';
import { SITE_CONFIG } from '../../constants/siteConfig';

export const CTASection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-tr from-violet-900 via-violet-800 to-indigo-900 text-white p-8 sm:p-14 lg:p-16 overflow-hidden shadow-2xl shadow-violet-950/40 border border-violet-700/50">
          {/* Ambient Background Circles */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-violet-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-violet-100 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-violet-300" />
              <span>Modernize o seu negócio hoje mesmo</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.2]">
              Tenha seus agendamentos sob controle definitivo.
            </h2>

            <p className="text-base sm:text-lg text-violet-100/90 leading-relaxed max-w-2xl mx-auto">
              Diga adeus ao estresse de mensagens acumuladas, faltas sem aviso e planilhas confusas. Dedique seu tempo ao que realmente importa: atender bem e faturar mais.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <Link
                to={SITE_CONFIG.links.systemAccess}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-violet-900 bg-white hover:bg-violet-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
              >
                <span>Acessar sistema</span>
                <ArrowRight className="w-5 h-5 text-violet-700" />
              </Link>

              <a
                href={`https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
                  SITE_CONFIG.contact.whatsappMessage
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl backdrop-blur-sm transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-emerald-300" />
                <span>Conversar no WhatsApp</span>
              </a>
            </div>

            <div className="pt-4 flex items-center justify-center gap-2 text-xs text-violet-200">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>Acesso imediato • Sem taxa oculta de instalação</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
