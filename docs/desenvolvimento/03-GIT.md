# Desenvolvimento — 03 — Fluxo Git e Versionamento

---

## 1. Padrão de Branches (Git Flow Simplificado)

| Branch | Finalidade | Deploy Automático na Vercel |
|--------|------------|-----------------------------|
| `main` | Produção estável | ✅ Ambiente de Produção |
| `develop` | Integração de novas features | ✅ Ambiente de Staging / Preview |
| `feature/nome-da-feature` | Desenvolvimento de nova tela/recurso | ✅ Preview Deployment temporário |
| `fix/nome-do-bug` | Correção pontual de bugs | ✅ Preview Deployment temporário |

---

## 2. Padrão de Mensagens de Commit (Conventional Commits)

Utilize prefixos semânticos para manter o histórico claro e profissional:

- `feat:` Nova funcionalidade (ex: `feat: adiciona criacao de agendamento por linguagem natural`)
- `fix:` Correção de bug (ex: `fix: corrige validacao de conflito de horario no mesmo profissional`)
- `docs:` Alterações na documentação (ex: `docs: adiciona especificacao de endpoints de IA`)
- `style:` Formatação, ponto e vírgula, CSS sem alteração de regra de negócio
- `refactor:` Refatoração de código sem mudar comportamento externo
- `chore:` Atualização de dependências, configs do build ou setup

---

## 3. Workflow de Trabalho

1. Criar branch a partir de `main` ou `develop`:
   ```bash
   git checkout -b feature/modulo-agenda
   ```
2. Realizar alterações e commits atômicos:
   ```bash
   git add .
   git commit -m "feat: implementa visualizacao semanal do calendario"
   ```
3. Subir branch para o GitHub e abrir **Pull Request (PR)**:
   ```bash
   git push origin feature/modulo-agenda
   ```
4. Validar preview gerado pela Vercel e realizar o merge.

---

*Próximo: [`04-TESTES.md`](./04-TESTES.md)*
