# Segurança — 03 — Proteção de Dados Sensíveis e LGPD

---

## 1. Mapeamento de Dados Sensíveis

Em conformidade com as boas práticas de privacidade e a **LGPD (Lei Geral de Proteção de Dados)**, os seguintes dados são tratados como sensíveis:

| Entidade | Campo | Classificação | Medida de Proteção |
|----------|-------|---------------|--------------------|
| `customers` | `cpf` | Dado Pessoal Identificável | RLS + Acesso restrito a usuários autenticados |
| `customers` | `phone` | Dado de Contato | RLS + Máscara visual no frontend |
| `customers` | `email` | Dado de Contato | RLS |
| `profiles` | Senhas | Dado Crítico | Hash Bcrypt gerenciado pelo Supabase Auth (nunca visível) |
| `financial_transactions` | Valores | Dado Financeiro | Visível apenas para perfis `admin` e `owner` |

---

## 2. Boas Práticas de Privacidade

1. **Minimização de Dados**: Coletar apenas as informações estritamente necessárias para a prestação do serviço de agendamento (Nome e WhatsApp são suficientes).
2. **Direito ao Esquecimento (Exclusão)**: Possibilidade de exclusão ou anonimização dos dados cadastrais do cliente a pedido do titular.
3. **Auditoria de Acesso**: Registro de alterações críticas de status e operações realizadas por membros da equipe no log de eventos.
4. **Sem logs de senhas ou tokens**: Funções de API e console não devem imprimir payloads contendo tokens JWT ou credenciais completas.

---

*Próximo: [`04-VARIAVEIS-AMBIENTE.md`](./04-VARIAVEIS-AMBIENTE.md)*
