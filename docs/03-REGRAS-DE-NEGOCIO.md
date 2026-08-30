# 03 — Regras de Negócio

---

## 1. Multi-Tenancy

| # | Regra |
|---|-------|
| RN-01 | Cada empresa cadastrada é um **tenant** independente no sistema |
| RN-02 | Todo registro no banco (cliente, profissional, agendamento, etc.) deve obrigatoriamente ter um `tenant_id` associado |
| RN-03 | Um usuário só pode acessar dados do tenant ao qual está vinculado |
| RN-04 | O `tenant_id` do usuário logado é determinado pela tabela `profiles` com base no `auth.uid()` |
| RN-05 | É proibido retornar dados de outros tenants, mesmo que o frontend tente manipular parâmetros |

---

## 2. Usuários e Perfis

| # | Regra |
|---|-------|
| RN-06 | Ao se cadastrar, o usuário cria sua empresa e é automaticamente atribuído como `owner` |
| RN-07 | O `owner` pode criar usuários com roles `admin` ou `employee` dentro do seu tenant |
| RN-08 | Um `employee` pode visualizar a agenda e registrar atendimentos, mas **não** pode alterar configurações da empresa |
| RN-09 | Um `admin` pode gerenciar clientes, profissionais, serviços e financeiro, mas **não** pode excluir a empresa |
| RN-10 | O `owner` é o único que pode excluir a conta da empresa |
| RN-11 | Um usuário pode pertencer a apenas **um** tenant por vez |

---

## 3. Agendamentos

| # | Regra |
|---|-------|
| RN-12 | Um agendamento deve ter: cliente, profissional, serviço, data, horário de início e status |
| RN-13 | O horário de término é calculado automaticamente com base na duração do serviço |
| RN-14 | Não é permitido criar dois agendamentos para o mesmo profissional com horários sobrepostos |
| RN-15 | Um agendamento só pode ser criado dentro do horário de trabalho do profissional |
| RN-16 | O status inicial de um agendamento é sempre `pendente` |
| RN-17 | Agendamentos cancelados não liberam automaticamente o horário para reagendamento (deve ser feito manualmente) |
| RN-18 | O histórico de mudanças de status de um agendamento deve ser registrado na tabela `appointment_status_history` |
| RN-19 | Não é permitido alterar um agendamento com status `concluído` |

### Status possíveis de agendamento:

```
pendente → confirmado → concluído
    ↓
cancelado
```

---

## 4. Profissionais e Disponibilidade

| # | Regra |
|---|-------|
| RN-20 | Um profissional pode ser associado a múltiplos serviços |
| RN-21 | Cada profissional tem horários de trabalho definidos por dia da semana |
| RN-22 | Um profissional inativo não pode receber novos agendamentos |
| RN-23 | Se um profissional não tiver horário definido para um dia, ele não aparece disponível naquele dia |
| RN-24 | Intervalos (almoço, pausas) do profissional bloqueiam agendamentos naquele período |

---

## 5. Serviços

| # | Regra |
|---|-------|
| RN-25 | Todo serviço deve ter: nome, preço e duração em minutos |
| RN-26 | A duração do serviço é usada para calcular o horário de término dos agendamentos |
| RN-27 | Um serviço inativo não pode ser selecionado em novos agendamentos |
| RN-28 | A exclusão de um serviço deve ser bloqueada se houver agendamentos vinculados a ele |

---

## 6. Financeiro

| # | Regra |
|---|-------|
| RN-29 | Toda transação financeira deve estar vinculada a um agendamento e a um cliente |
| RN-30 | O valor da transação é herdado do preço do serviço, mas pode ser ajustado manualmente |
| RN-31 | O status padrão de uma nova transação é `pendente` |
| RN-32 | Ao marcar um agendamento como `concluído`, o sistema deve oferecer a opção de registrar o pagamento |
| RN-33 | Transações com status `vencido` são aquelas com data de vencimento no passado e status ainda `pendente` |
| RN-34 | Agendamentos cancelados devem gerar transação com status `cancelado` |

### Status possíveis de transação:

```
pendente → pago
    ↓
cancelado
    ↓
vencido
```

---

## 7. Clientes

| # | Regra |
|---|-------|
| RN-35 | O CPF de um cliente deve ser único dentro do tenant |
| RN-36 | O WhatsApp é o campo principal de contato e deve ser obrigatório |
| RN-37 | Um cliente não pode ser excluído se possuir agendamentos ativos |
| RN-38 | Clientes sem agendamentos há mais de 60 dias são considerados **inativos** |
| RN-39 | O histórico de atendimentos do cliente deve ser exibido em ordem cronológica decrescente |

---

## 8. Inteligência Artificial

| # | Regra |
|---|-------|
| RN-40 | A IA só pode acessar dados do tenant do usuário autenticado |
| RN-41 | A chave da API Groq nunca pode ser exposta no frontend |
| RN-42 | Toda chamada à IA deve ser intermediada por uma Vercel Function (serverless) |
| RN-43 | A IA deve verificar a existência de cliente, serviço e disponibilidade antes de criar um agendamento |
| RN-44 | Caso a IA não encontre o cliente ao criar um agendamento, deve informar o usuário e perguntar se deseja cadastrá-lo |
| RN-45 | O histórico de conversas com a IA deve ser armazenado por tenant e por usuário |
| RN-46 | A IA não pode executar ações destrutivas (exclusões) sem confirmação explícita do usuário |
| RN-47 | Respostas da IA devem sempre ser contextualizadas com os dados reais da empresa, não genéricas |

---

## 9. WhatsApp

| # | Regra |
|---|-------|
| RN-48 | Na V1, o envio de WhatsApp é feito via link `wa.me` — não há envio direto pelo sistema |
| RN-49 | Templates de mensagem pertencem ao tenant e não podem ser compartilhados entre empresas |
| RN-50 | A IA pode gerar o conteúdo de uma mensagem de WhatsApp, mas o envio deve ser confirmado pelo usuário |

---

## 10. Segurança e Privacidade

| # | Regra |
|---|-------|
| RN-51 | Dados pessoais de clientes (CPF, telefone, e-mail) só podem ser acessados por usuários autenticados e do mesmo tenant |
| RN-52 | Nenhuma rota da API pode retornar dados sem validação do `tenant_id` |
| RN-53 | Variáveis de ambiente sensíveis devem estar configuradas apenas no servidor (Vercel), nunca no código-fonte |
| RN-54 | O sistema deve revogar sessões automaticamente após inatividade prolongada (configuração do Supabase Auth) |

---

*Próximo: [`arquitetura/01-ARQUITETURA.md`](../arquitetura/01-ARQUITETURA.md)*
