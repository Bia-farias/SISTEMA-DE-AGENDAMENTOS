# IA — 02 — Integração com Groq

---

## 1. O que é o Groq?

**Groq** é uma plataforma de inferência de LLM (Large Language Models) extremamente rápida, com tempos de resposta muito inferiores ao OpenAI. Usa hardware próprio (LPU — Language Processing Unit) para entregar respostas em milissegundos.

---

## 2. Por que Groq?

| Característica | Groq | OpenAI |
|---------------|------|--------|
| Velocidade | ⚡ Muito rápido (~500 tokens/s) | Moderado |
| Custo | 💰 Plano gratuito generoso | Pago |
| Modelos | Llama 3, Mixtral | GPT-4, GPT-3.5 |
| Facilidade | SDK simples | SDK similar |
| Streaming | ✅ Suportado | ✅ Suportado |

---

## 3. Configuração do Client Groq

```js
// api/ai.js (Vercel Function)
import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY  // NUNCA no frontend
})
```

---

## 4. Modelos Disponíveis

| Modelo | Uso Recomendado |
|--------|----------------|
| `llama-3.3-70b-versatile` | Principal — chat, análise, criação de agendamentos |
| `llama-3.1-8b-instant` | Tarefas simples onde velocidade é prioridade |
| `mixtral-8x7b-32768` | Contextos muito longos (janela 32k tokens) |

---

## 5. Estrutura da Chamada

```js
const completion = await groq.chat.completions.create({
  model: 'llama-3.3-70b-versatile',
  messages: [
    {
      role: 'system',
      content: systemPrompt  // contexto da empresa
    },
    ...conversationHistory,  // histórico recente
    {
      role: 'user',
      content: userMessage
    }
  ],
  temperature: 0.7,
  max_tokens: 1024,
  stream: false  // ou true para streaming
})

const response = completion.choices[0].message.content
```

---

## 6. Streaming de Respostas

Para melhorar a experiência, a resposta pode ser streamada:

```js
// api/ai.js
export default async function handler(req, res) {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  const stream = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [...],
    stream: true
  })

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content || ''
    if (content) {
      res.write(`data: ${JSON.stringify({ content })}\n\n`)
    }
  }

  res.write('data: [DONE]\n\n')
  res.end()
}
```

```js
// src/services/ai.service.js (frontend)
export async function streamAIResponse(message, onChunk) {
  const response = await fetch('/api/ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  })

  const reader = response.body.getReader()
  const decoder = new TextDecoder()

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    const chunk = decoder.decode(value)
    const lines = chunk.split('\n')

    for (const line of lines) {
      if (line.startsWith('data: ') && line !== 'data: [DONE]') {
        const data = JSON.parse(line.slice(6))
        onChunk(data.content)
      }
    }
  }
}
```

---

## 7. Configuração da Conta Groq

1. Acesse: [console.groq.com](https://console.groq.com)
2. Crie uma conta gratuita
3. Vá em **API Keys** → **Create API Key**
4. Copie a chave e adicione às variáveis da Vercel: `GROQ_API_KEY`

---

*Próximo: [`03-CONTEXTO-DA-IA.md`](./03-CONTEXTO-DA-IA.md)*
