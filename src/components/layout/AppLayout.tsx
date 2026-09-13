import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileBottomNav } from './MobileBottomNav';
import { ToastContainer } from '../ui/Toast';
import { NovoAgendamentoDrawer } from '../agenda/NovoAgendamentoDrawer';
import { AgendamentoDetalheDrawer } from '../agenda/AgendamentoDetalheDrawer';
import { NovoClienteDrawer } from '../clientes/NovoClienteDrawer';
import { ClienteDetalheDrawer } from '../clientes/ClienteDetalheDrawer';
import { NovoServicoDrawer } from '../servicos/NovoServicoDrawer';
import { NovoProfissionalDrawer } from '../profissionais/NovoProfissionalDrawer';
import { AIChatPanel } from '../ai/AIChatPanel';
import { AIFloatingButton } from '../ai/AIFloatingButton';

export function AppLayout() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-zinc-50 dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto pb-20 lg:pb-8 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />

      {/* Global Interactive Drawers (No central modals!) */}
      <NovoAgendamentoDrawer />
      <AgendamentoDetalheDrawer />
      <NovoClienteDrawer />
      <ClienteDetalheDrawer />
      <NovoServicoDrawer />
      <NovoProfissionalDrawer />

      {/* Toast Notification Layer */}
      <ToastContainer />

      {/* AI Assistant */}
      <AIFloatingButton />
      <AIChatPanel />
    </div>
  );
}
