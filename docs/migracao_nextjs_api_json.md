# Arquitetura Next.js: API REST e Consumo Estrito via `fetch` — FinEdu

Este documento registra a arquitetura do projeto **FinEdu** após a migração para o Next.js 16 (App Router), detalhando a separação entre **Server e Client Components**, o sistema de **Roteamento**, a **camada de API REST interna** e a implementação estrita de requisições assíncronas via **`fetch()`** sobre os dados em JSON.

---

## 1. Visão Geral da Arquitetura

O FinEdu é uma plataforma web mobile gamificada de educação financeira desenvolvida em **Next.js 16.4.2** e **React 19.3.0**. 

Para atender aos princípios de desacoplamento, segurança e engenharia de software moderna:
1. **Nenhum componente de tela importa arquivos `.json` diretamente.**
2. Todos os dados estáticos (`modules.json`, `lessons.json`, `quizzes.json`, `marketRates.json`) são encapsulados e servidos por uma camada de **API Route Handlers** (`src/app/api/`).
3. O front-end consome exclusivamente esses endpoints por meio da Web API nativa **`fetch()`**, com tratamento de estados de carregamento (*loading*) e erro.

```
┌─────────────────────────────────────────────────────────────┐
│                       Camada de Dados                       │
│  src/data/ (modules.json, lessons.json, quizzes.json, ...)  │
└──────────────────────────────┬──────────────────────────────┘
                               │ (import local isolado)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 API Route Handlers (Next.js)                │
│   /api/modules  ·  /api/lessons  ·  /api/quizzes  ·  ...    │
└──────────────────────────────┬──────────────────────────────┘
                               │ (HTTP GET via fetch())
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 Front-end (Client & Server)                 │
│  AppContext · QuizClient · ConteudoClient · Simulador · ... │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Server Components vs. Client Components

O Next.js App Router adota por padrão os **React Server Components (RSC)**. A aplicação divide suas responsabilidades em:

### 🟢 Server Components (Renderizados no Servidor)
- **Local de Execução:** Executam exclusivamente no servidor durante a compilação (*build time*) ou no momento da requisição (*request time*). O código JavaScript desses componentes não é enviado ao navegador.
- **Responsabilidades no FinEdu:**
  - Definição de metadados de SEO (`metadata` e `generateMetadata`).
  - Geração estática de parâmetros dinâmicos (`generateStaticParams` para os 6 módulos).
  - Cascas estruturais de páginas (`RootLayout`, `HomePage`, `TrilhasPage`).
  - Componentes puramente apresentacionais (`AppFooter`, `SimulatorHeader`, `CompoundInterestExplainer`, `FocusHeader`, `FocusFooter`, `LessonArticle`).

### 🟠 Client Components (Executados no Navegador)
- **Diretiva:** Declarados obrigatoriamente com `"use client"` na primeira linha.
- **Local de Execução:** Hidratados no cliente, permitindo interatividade total e manipulação do DOM.
- **Responsabilidades no FinEdu:**
  - Gerenciamento de estado global e local (`useState`, `useEffect`, `useContext`).
  - Chamadas de rede assíncronas via **`fetch()`**.
  - Interação em tempo real (inputs de formulário, sliders, feedback imediato de acerto/erro no quiz).
  - Persistência e leitura do progresso no `localStorage`.
  - Animações e renderização vetorial dinâmica de gráficos SVG (`ProjectionChart`).

---

## 3. Catálogo de Endpoints da API (`src/app/api/`)

A camada de API foi construída usando **Route Handlers** nativos do Next.js:

| Endpoint | Método | Arquivo Fonte | Descrição do Retorno |
| :--- | :---: | :--- | :--- |
| `/api/modules` | `GET` | `src/app/api/modules/route.js` | Lista completa com os 6 módulos, fases, ícones e descrições. |
| `/api/lessons` | `GET` | `src/app/api/lessons/route.js` | Todas as lições ou lição filtrada por query param `?id=m1`. |
| `/api/lessons/[moduloId]` | `GET` | `src/app/api/lessons/[moduloId]/route.js` | Objeto detalhado da aula do módulo informado (título, parágrafos e destaques). |
| `/api/quizzes` | `GET` | `src/app/api/quizzes/route.js` | Banco completo de perguntas ou filtrado por `?moduloId=m1`. |
| `/api/quizzes/[moduloId]` | `GET` | `src/app/api/quizzes/[moduloId]/route.js` | Array de perguntas, alternativas e dicas para o módulo requisitado. |
| `/api/market-rates` | `GET` | `src/app/api/market-rates/route.js` | Taxas referenciais do mercado brasileiro (CDI, Selic e Poupança). |

---

## 4. Adaptações e Implementação do `fetch()` por Funcionalidade

### 4.1. Quiz Gamificado
- **Arquivo:** `src/components/features/quiz/QuizClient.js`
- **Antes:** Importava diretamente `quizzes.json` e `modules.json`.
- **Depois:** Utiliza `Promise.all` para disparar em paralelo:
  ```javascript
  Promise.all([
    fetch(`/api/quizzes/${moduloId}`).then((r) => r.json()),
    fetch("/api/modules").then((r) => r.json()),
  ]).then(([quizData, modulesList]) => {
    setQuestions(quizData.slice(0, 3));
    setCurrentModule(modulesList.find((m) => m.id === moduloId));
    setLoading(false);
  });
  ```
- **Benefício:** O cliente exibe feedback de carregamento suave (*skeleton/loading*) e não armazena dados estáticos embutidos diretamente no código-fonte.

### 4.2. Aulas e Artigos Pedagógicos
- **Arquivo:** `src/components/features/conteudo/ConteudoClient.js`
- **Antes:** `src/app/conteudo/[moduloId]/page.js` importava `lessons.json` e `modules.json`.
- **Depois:** A página server delega para `ConteudoClient`, que busca a aula via `fetch(`/api/lessons/${moduloId}`)` e os metadados da trilha em `/api/modules`.

### 4.3. Mapa da Trilha de Aprendizado
- **Arquivo:** `src/components/features/trilhas/TrailMap.js`
- **Antes:** Importava `modules.json` estaticamente.
- **Depois:** Consome os módulos providos pelo `AppContext` (que faz o `fetch` na inicialização) ou realiza `fetch("/api/modules")` como fallback resiliente.

### 4.4. Comparativo de Rentabilidade (Dashboard)
- **Arquivo:** `src/components/features/home/YieldComparisonCard.js`
- **Antes:** Importava `marketRates.json`.
- **Depois:** Dispara `fetch("/api/market-rates")` no hook `useEffect` e atualiza reativamente os cálculos comparativos de CDI, CDB, Poupança e FIIs nos últimos 12 meses.

### 4.5. Simulador de Investimentos
- **Arquivo:** `src/app/simulador/page.js` e `src/lib/calculations.js`
- **Antes:** `calculations.js` importava `marketRates.json` fixo.
- **Depois:** `SimuladorPage` busca as taxas via `fetch("/api/market-rates")` e as injeta na função pura `calculateSimulation(params, rates)`. `calculations.js` foi transformado em módulo utilitário 100% puro e sem acoplamento a arquivos de dados.

### 4.6. Contexto Global da Aplicação
- **Arquivo:** `src/context/AppContext.js`
- **Antes:** Importava `modules.json` para saber o total de módulos e validar progressos.
- **Depois:** Executa `fetch("/api/modules")` ao montar o provedor, calcula `totalModules`, `userLevel` e `progressPercent` de forma dinâmica e distribui os dados por toda a aplicação.

---

## 5. Estrutura de Roteamento (App Router)

A árvore de rotas da aplicação é organizada por pastas:

```
src/app/
├── layout.js                     # RootLayout (Shell global, fontes, modais e AppProvider)
├── page.js                       # Rota / (Início e Dashboard)
├── simulador/
│   └── page.js                   # Rota /simulador (Calculadora interativa)
├── trilhas/
│   └── page.js                   # Rota /trilhas (Mapa de módulos)
├── conteudo/
│   └── [moduloId]/
│       └── page.js               # Rota /conteudo/:moduloId (Aulas didáticas)
├── quiz/
│   └── [moduloId]/
│       └── page.js               # Rota /quiz/:moduloId (Quizzes de validação)
└── api/                          # Endpoints HTTP REST
    ├── modules/route.js
    ├── lessons/
    │   ├── route.js
    │   └── [moduloId]/route.js
    ├── quizzes/
    │   ├── route.js
    │   └── [moduloId]/route.js
    └── market-rates/route.js
```

---

## 6. Como Executar e Validar Localmente

1. **Iniciar o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

2. **Acessar a aplicação no navegador:**
   - Interface Web: [http://localhost:3000](http://localhost:3000)

3. **Testar os endpoints da API:**
   - Módulos: [http://localhost:3000/api/modules](http://localhost:3000/api/modules)
   - Lição 1: [http://localhost:3000/api/lessons/m1](http://localhost:3000/api/lessons/m1)
   - Quiz 1: [http://localhost:3000/api/quizzes/m1](http://localhost:3000/api/quizzes/m1)
   - Taxas de Mercado: [http://localhost:3000/api/market-rates](http://localhost:3000/api/market-rates)

