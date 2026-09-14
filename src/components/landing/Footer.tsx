import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Heart, Shield, ArrowUp } from 'lucide-react';
import { SITE_CONFIG } from '../../constants/siteConfig';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white dark:bg-[#09090b] border-t border-zinc-200/80 dark:border-zinc-800/80 pt-16 pb-12 text-sm text-zinc-600 dark:text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-zinc-200/80 dark:border-zinc-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center text-white shadow-sm">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-zinc-900 dark:text-zinc-50 font-sans">
                Agenda<span className="text-violet-600 dark:text-violet-400">AI</span>
              </span>
            </div>

            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-sm">
              A solução definitiva para organização de horários, controle de clientes, gestão de serviços e automação no WhatsApp para salões de beleza, barbearias e clínicas.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1 text-xs text-zinc-400">
                <Shield className="w-3.5 h-3.5 text-emerald-500" />
                Dados criptografados e protegidos por RLS
              </span>
            </div>
          </div>

          {/* Links de Navegação */}
          <div>
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm uppercase tracking-wider mb-4">
              Navegação
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#hero" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  Sobre a Plataforma
                </a>
              </li>
              <li>
                <a href="#funcionalidades" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  Funcionalidades
                </a>
              </li>
              <li>
                <a href="#beneficios" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  Benefícios
                </a>
              </li>
              <li>
                <a href="#como-funciona" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  Como Funciona
                </a>
              </li>
            </ul>
          </div>

          {/* Sistema & Acesso */}
          <div>
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm uppercase tracking-wider mb-4">
              Acesso ao Sistema
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to={SITE_CONFIG.links.systemAccess}
                  className="font-semibold text-violet-600 dark:text-violet-400 hover:underline"
                >
                  Entrar na Plataforma
                </Link>
              </li>
              <li>
                <Link
                  to={SITE_CONFIG.links.startFree}
                  className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                >
                  Criar Conta Empresarial
                </Link>
              </li>
              <li>
                <Link
                  to="/forgot-password"
                  className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                >
                  Recuperar Senha
                </Link>
              </li>
              <li>
                <a href="#contato" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  Demonstração Guiada
                </a>
              </li>
            </ul>
          </div>

          {/* Suporte & Contato */}
          <div>
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm uppercase tracking-wider mb-4">
              Contato
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>{SITE_CONFIG.contact.email}</li>
              <li>{SITE_CONFIG.contact.formattedPhone}</li>
              <li className="text-xs text-zinc-400 pt-1">{SITE_CONFIG.contact.address}</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400">
          <p>
            © {new Date().getFullYear()} Agenda AI. Todos os direitos reservados.
          </p>

          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
            >
              <span>Voltar ao topo</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
