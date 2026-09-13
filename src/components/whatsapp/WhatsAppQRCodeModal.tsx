import React from 'react';
import { X, QrCode, Smartphone, CheckCircle, RefreshCw, ShieldCheck } from 'lucide-react';
import { useWhatsAppStore } from '../../stores/whatsappStore';
import { Button } from '../ui/Button';

export function WhatsAppQRCodeModal() {
  const { isQrModalOpen, setQrModalOpen, isConnecting, connectWhatsApp, connection } =
    useWhatsAppStore();

  if (!isQrModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-[#121216] border border-zinc-200 dark:border-zinc-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => setQrModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <QrCode size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
              Conectar WhatsApp Business
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Sincronize o número do seu salão para disparos automáticos
            </p>
          </div>
        </div>

        {/* Content Box */}
        <div className="flex flex-col md:flex-row items-center gap-6 p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800 mb-6">
          {/* Simulated QR Code */}
          <div className="relative w-44 h-44 bg-white p-3 rounded-2xl shadow-inner border border-zinc-200 flex flex-col items-center justify-center shrink-0 overflow-hidden">
            {isConnecting ? (
              <div className="flex flex-col items-center gap-2 text-emerald-600">
                <RefreshCw size={36} className="animate-spin" />
                <span className="text-[11px] font-bold">Emparelhando...</span>
              </div>
            ) : (
              <>
                {/* Visual QR Code Pattern */}
                <div className="grid grid-cols-6 gap-1 w-full h-full p-1 opacity-90">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-xs ${
                        (i % 2 === 0 || i % 5 === 0 || i === 0 || i === 5 || i === 30 || i === 35) &&
                        i !== 14 &&
                        i !== 21
                          ? 'bg-zinc-900'
                          : 'bg-zinc-200'
                      }`}
                    />
                  ))}
                </div>
                {/* Center WhatsApp Logo Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-lg border-2 border-white">
                    <Smartphone size={20} />
                  </div>
                </div>
                {/* Scan Line Animation */}
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent top-1/4 animate-bounce" />
              </>
            )}
          </div>

          {/* Instructions */}
          <div className="flex-1 space-y-3">
            <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-500" />
              Como Conectar:
            </h4>
            <ol className="text-xs text-zinc-600 dark:text-zinc-400 space-y-2 list-decimal list-inside leading-relaxed">
              <li>Abra o <strong>WhatsApp</strong> no seu celular.</li>
              <li>Toque em <strong>Configurações</strong> ou <strong>Menu (⋮)</strong>.</li>
              <li>Selecione <strong>Aparelhos conectados</strong>.</li>
              <li>Aponte a câmera para o QR Code ao lado.</li>
            </ol>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
              Conexão criptografada de ponta a ponta.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3">
          <Button variant="outline" onClick={() => setQrModalOpen(false)}>
            Fechar
          </Button>
          <Button
            variant="primary"
            onClick={connectWhatsApp}
            disabled={isConnecting}
            className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/25"
          >
            {isConnecting ? (
              <span className="flex items-center gap-2">
                <RefreshCw size={14} className="animate-spin" /> Conectando...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <CheckCircle size={15} /> Simular Leitura do QR Code
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
