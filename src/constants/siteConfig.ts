/**
 * Configurações Centrais do Website Institucional & Comercial
 * Permite alterar facilmente os links de direcionamento para o sistema,
 * dados de contato, redes sociais e informações da empresa em um só lugar.
 */

export const SITE_CONFIG = {
  // Informações do Produto
  name: 'Agenda AI',
  tagline: 'Sistema Inteligente de Agendamento e Gestão',
  shortDescription:
    'A plataforma completa para organizar agendamentos, clientes, serviços e equipe com lembretes automáticos e inteligência artificial.',
  
  // Links de Acesso ao Sistema (podem ser rotas internas ou URLs externas no futuro)
  links: {
    systemAccess: '/login',      // Botão principal "Acessar Sistema"
    startFree: '/register',       // Botão "Começar Agora" / "Criar Conta"
    dashboardDirect: '/dashboard', // Acesso direto ao Dashboard caso logado
    demoAccess: '/login',         // Modo demonstração
  },

  // Dados Comerciais e de Contato
  contact: {
    email: 'contato@agendaai.com.br',
    supportEmail: 'suporte@agendaai.com.br',
    phone: '+55 (11) 98888-7777',
    formattedPhone: '(11) 98888-7777',
    whatsappNumber: '5511988887777',
    whatsappMessage: 'Olá! Gostaria de conhecer mais sobre o sistema Agenda AI.',
    address: 'Av. Paulista, 1500 - Bela Vista, São Paulo - SP',
    workingHours: 'Segunda a Sexta, das 08:00 às 19:00',
  },

  // Redes Sociais
  social: {
    instagram: 'https://instagram.com/agendaai.oficial',
    linkedin: 'https://linkedin.com/company/agendaai',
    youtube: 'https://youtube.com/@agendaai',
  },

  // Métricas do Produto para Apresentação
  stats: {
    appointmentsManaged: '+45.000',
    reductionNoShow: '85%',
    timeSavedHours: '12h/semana',
    satisfactionRate: '99.2%',
  }
};
