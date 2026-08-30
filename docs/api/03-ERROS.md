# API — 03 — Tratamento e Códigos de Erro

---

## 1. Padrão de Resposta de Erro

Todas as rotas de API do sistema retornam erros em formato JSON padronizado:

```json
{
  "error": "Descrição amigável do erro para exibição",
  "code": "CODIGO_DO_ERRO",
  "details": null
}
```

---

## 2. Códigos HTTP e Significado

| Código HTTP | Código Interno | Significado | Ação Sugerida no Frontend |
|-------------|----------------|-------------|---------------------------|
| `400 Bad Request` | `VALIDATION_ERROR` | Dados inválidos ou incompletos | Destacar campos no formulário |
| `401 Unauthorized` | `AUTH_EXPIRED` | Sessão expirada ou ausente | Redirecionar para `/login` |
| `403 Forbidden` | `PERMISSION_DENIED` | Usuário não tem permissão para a ação | Exibir toast de permissão negada |
| `404 Not Found` | `RESOURCE_NOT_FOUND` | Cliente, serviço ou horário não existe | Exibir tela 404 / feedback de busca |
| `409 Conflict` | `SCHEDULE_CONFLICT` | Horário do profissional já ocupado | Sugerir outro horário na agenda |
| `429 Too Many Req` | `RATE_LIMIT_EXCEEDED` | Limite de chamadas à IA excedido | Informar limite diário atingido |
| `500 Server Error` | `INTERNAL_SERVER_ERROR`| Falha inesperada no servidor/IA | Toast com botão de tentar novamente |

---

## 3. Tratamento de Erros no Frontend

```javascript
// src/services/apiClient.js

export async function fetchAPI(endpoint, options = {}) {
  const { data: { session } } = await supabase.auth.getSession();
  
  const headers = {
    'Content-Type': 'application/json',
    ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(endpoint, { ...options, headers });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData.error || 'Ocorreu um erro inesperado. Tente novamente.';
    
    if (response.status === 401) {
      // Redireciona ou renova sessão
      window.location.href = '/login';
    }

    throw new Error(message);
  }

  return response.json();
}
```

---

*Próximo: [`04-API-IA.md`](./04-API-IA.md)*
