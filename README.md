# Projeto-Web-Mobile-2

**Integrantes:**
- Luigi Arakaki Giarola — 10771372
- Enzo Gregorio Fiaschi — 10770107
- Misael Abdias Nina Quispe — 10771398
- Felipe Carvalho — 10771389
- Bruno Hatisuka — 10771376

---

# FinEdu — Educação Financeira Web Mobile

Plataforma web mobile para ensinar investimentos de forma prática e gamificada, no estilo Duolingo. O usuário aprende por meio de módulos de conteúdo, valida o conhecimento com quizzes e aplica o que aprendeu em um simulador de investimentos.

## Objetivo

Ensinar conceitos de investimentos de forma simples, permitindo que o usuário evolua por níveis de conhecimento e teste suas decisões financeiras em um simulador, sem risco real.

## Como o site funciona

Experiência única e minimalista, sem múltiplas abas ou menus complexos:

1. **Trilha de aprendizado** — mapa de módulos (estilo Duolingo), com progresso desbloqueando o próximo conteúdo.
2. **Conteúdo didático** — cada módulo traz um tema sobre investimentos (renda fixa, renda variável, tesouro direto, ações, diversificação etc.) de forma curta e prática.
3. **Quiz de validação** — ao final de cada módulo, um quiz confirma o aprendizado antes de liberar o próximo.
4. **Simulador de investimentos** — liberado conforme o progresso, permite alocar um saldo virtual entre investimentos simulados e acompanhar a evolução do patrimônio.

## Estrutura de Pastas e Arquivos

```
Projeto-Site---WEB-MOBILE/
├── index.html                   # Página principal / Início
├── pages/                       # Páginas internas da aplicação
│   ├── trilhas.html             # Trilha de aprendizado e mapa de módulos
│   ├── conteudo.html            # Aulas didáticas em modo foco
│   ├── quiz.html                # Quiz interativo com validação e pontuação
│   └── simulador.html           # Simulador e calculadora de investimentos
├── assets/
│   ├── css/
│   │   └── style.css            # Folha de estilos unificada e responsiva
│   └── js/
│       └── app.js               # Lógica completa da aplicação (quizzes, simulação, gráficos)
├── docs/
│   ├── API.txt                  # Referências de CDNs e APIs externas
│   └── wireframes/              # Wireframes e protótipos de design
│       ├── wireframe_projeto_hub.jpg
│       ├── wireframe_projeto_quiz.jpg
│       ├── wireframe_projeto_simulador.jpg
│       └── wireframe_projeto_trilha.jpg
└── README.md                    # Documentação do projeto
```

## Estilo e interface

- **Gamificação**: trilha de progresso, conquistas e streaks.
- **Visual minimalista**: mobile-first, inspirado no Duolingo.
- **Navegação limpa**: abas superiores no desktop e barra de navegação inferior no mobile.

## Tecnologias e Framework

- **Next.js (App Router)** — renderização híbrida (Server & Client Components), roteamento baseado no sistema de arquivos e otimização nativa de fontes e metadados.
- **React** — interface reativa e modular com Context API para gerenciamento de estado persistente (`localStorage`).
- **CSS3 & CSS Modules** — design system preservado com variáveis CSS globais e isolamento modular de escopo nos componentes.
- **Gráficos Dinâmicos em SVG** — projeções financeiras e gráficos comparativos de 12 meses responsivos, leves e sem atraso de carregamento.

## Estrutura do Projeto Next.js (`src/`)

```
Projeto-Site---WEB-MOBILE/
├── src/
│   ├── app/                         # Rotas (App Router)
│   │   ├── layout.js                # Shell global, fontes (DM Sans, Fredoka), Providers
│   │   ├── globals.css              # Design system, tokens e resets
│   │   ├── page.js                  # Rota '/' (Página Inicial e Metas)
│   │   ├── trilhas/page.js          # Rota '/trilhas' (Trilha de Aprendizado)
│   │   ├── conteudo/[moduloId]/     # Rota '/conteudo/[moduloId]' (Artigos didáticos)
│   │   ├── quiz/[moduloId]/         # Rota '/quiz/[moduloId]' (Quiz interativo)
│   │   └── simulador/page.js        # Rota '/simulador' (Simulador paramétrico)
│   ├── components/
│   │   ├── layout/                  # AppHeader, MobileNav, AppFooter, Modais, Toasts
│   │   ├── ui/                      # Button, ProgressBar, Badge, Card (com CSS Modules)
│   │   └── features/                # Componentes divididos por domínio:
│   │       ├── home/                # HomeHero, YieldComparisonCard, GoalsSection
│   │       ├── trilhas/             # TrailHeader, PhaseFilterBar, TrailMap, TrailNodeCard
│   │       ├── conteudo/            # FocusHeader, LessonArticle, FocusFooter
│   │       ├── quiz/                # Stepper, Question, AnswerGroup, Feedback, RewardCard
│   │       └── simulador/           # SimulatorHeader, SimulationForm, ResultCard, ProjectionChart
│   ├── context/
│   │   └── AppContext.js            # Estado global (metas, perfil, módulos concluídos, toast)
│   ├── data/                        # JSONs desacoplados (módulos, perguntas, aulas, taxas)
│   └── lib/                         # Funções puras de cálculo de juros e formatação
├── legacy/                          # Arquivos originais em HTML estático preservados
├── docs/                            # Documentação de arquitetura e wireframes
└── package.json
```

## Como Executar o Projeto Localmente

1. **Instalar dependências** (caso ainda não tenham sido instaladas):
   ```bash
   npm install
   ```

2. **Iniciar o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```
   Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

3. **Gerar a versão de produção e testar o build**:
   ```bash
   npm run build
   npm run start
   ```
