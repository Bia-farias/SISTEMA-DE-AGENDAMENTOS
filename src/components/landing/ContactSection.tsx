import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
} from 'lucide-react';
import { SITE_CONFIG } from '../../constants/siteConfig';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessType: 'Salão de Beleza',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Feedback visual limpo
    setIsSubmitted(true);
  };

  return (
    <section id="contato" className="py-20 sm:py-28 bg-zinc-100/40 dark:bg-[#0c0c0e]/60 border-t border-zinc-200/80 dark:border-zinc-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/50 px-3 py-1 rounded-full border border-violet-200/60 dark:border-violet-800/60">
            Fale Conosco
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Pronto para transformar a gestão do seu espaço?
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
            Tire suas dúvidas com nossa equipe ou solicite uma apresentação personalizada para o seu salão, barbearia ou clínica.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Informações de Contato Direto */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-7 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-6">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                Canais de Atendimento
              </h3>

              <div className="space-y-4">
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-violet-100 dark:bg-violet-950/70 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-zinc-400 font-medium block">E-mail Comercial</span>
                    <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                      {SITE_CONFIG.contact.email}
                    </span>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
                    SITE_CONFIG.contact.whatsappMessage
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-zinc-400 font-medium block">WhatsApp Oficial</span>
                    <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {SITE_CONFIG.contact.formattedPhone}
                    </span>
                  </div>
                </a>

                <div className="flex items-start gap-3.5 p-3 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-zinc-400 font-medium block">Horário de Atendimento</span>
                    <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      {SITE_CONFIG.contact.workingHours}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-zinc-400 font-medium block">Endereço</span>
                    <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      {SITE_CONFIG.contact.address}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Formulário de Contato */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-9 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                Envie uma Mensagem
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
                Preencha os campos abaixo e nosso time entrará em contato em poucas horas.
              </p>

              {isSubmitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 text-center space-y-3 animate-fade-in">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-300 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-lg text-emerald-900 dark:text-emerald-200">
                    Mensagem enviada com sucesso!
                  </h4>
                  <p className="text-sm text-emerald-700 dark:text-emerald-300 max-w-md mx-auto">
                    Obrigado pelo contato! Nossa equipe retornará pelo seu WhatsApp ou e-mail com as informações solicitadas.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', businessType: 'Salão de Beleza', message: '' });
                    }}
                    className="mt-4 px-4 py-2 text-xs font-bold text-emerald-800 dark:text-emerald-200 bg-emerald-100/80 dark:bg-emerald-900/40 rounded-lg hover:bg-emerald-200"
                  >
                    Enviar outra mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                        Seu Nome *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Carlos Silva"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                        WhatsApp / Celular *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="(11) 98888-7777"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                        Seu E-mail *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="seu.email@empresa.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                        Tipo de Negócio
                      </label>
                      <select
                        value={formData.businessType}
                        onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                      >
                        <option value="Salão de Beleza">Salão de Beleza</option>
                        <option value="Barbearia">Barbearia</option>
                        <option value="Clínica de Estética">Clínica de Estética</option>
                        <option value="Clínica de Saúde / Terapia">Clínica de Saúde / Terapia</option>
                        <option value="Profissional Autônomo">Profissional Autônomo</option>
                        <option value="Outro">Outro segmento</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                      Como podemos te ajudar?
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Conte um pouco sobre sua equipe, quantidade de atendimentos ou dúvidas..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-semibold text-white bg-violet-600 hover:bg-violet-700 rounded-xl shadow-md shadow-violet-500/20 transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <span>Enviar solicitação</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
