# Desenvolvimento — 04 — Estratégia e Roteiro de Testes

---

## 1. Níveis de Teste

1. **Testes Manuais de Fluxo (E2E Manual - MVP)**: Validação dos cenários principais descritos abaixo.
2. **Testes Unitários (Vitest / Jest)**: Para funções utilitárias (cálculo de horas, formatação de moedas, validação de conflito).
3. **Testes de RLS / Banco**: Execução de scripts SQL de validação de isolamento de tenants.

---

## 2. Roteiro de Testes Manuais (QA do MVP)

### Teste 1: Autenticação & Isolamento
1. Cadastrar Empresa A com usuário `admin_a@teste.com`.
2. Criar 2 clientes e 1 profissional na Empresa A.
3. Fazer logout.
4. Cadastrar Empresa B com usuário `admin_b@teste.com`.
5. Verificar se a lista de clientes da Empresa B está vazia (isolamento multi-tenant garantido).

### Teste 2: Conflito de Horário na Agenda
1. Criar um agendamento para Carlos das 14:00 às 14:30.
2. Tentar criar outro agendamento para Carlos no mesmo dia das 14:15 às 14:45.
3. Verificar se o sistema bloqueia a criação e exibe aviso amigável de conflito.

### Teste 3: Criação de Agendamento por IA
1. Abrir a tela do Assistente IA.
2. Digitar: *"Agende Maria amanhã às 16:00 para Corte Masculino com Carlos"*.
3. Verificar se a IA confirma a criação e se o agendamento aparece instantaneamente na tela da Agenda.

### Teste 4: Disparo de WhatsApp (Link `wa.me`)
1. No card de um agendamento, clicar em "WhatsApp".
2. Selecionar o template de "Confirmação".
3. Clicar no botão de envio e verificar se a URL `wa.me` é aberta com os dados do cliente e da empresa preenchidos corretamente.

---

*Próximo: [`05-ROADMAP.md`](./05-ROADMAP.md)*
