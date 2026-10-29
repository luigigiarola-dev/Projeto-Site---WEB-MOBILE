# Migração e Arquitetura de Componentes React — FinEdu

## 1. Objetivo e Ideia Central

O **FinEdu** deixa de ser um conjunto de páginas HTML estáticas sustentadas por um arquivo monolítico (`app.js`) e evolui para uma aplicação moderna em **Next.js com React**. 

### Ganhos esperados:
- **Componentes reutilizáveis**: eliminação de blocos repetidos entre páginas (menus, rodapés, modais).
- **Renderização inteligente**: *Server Components* para exibição rápida de conteúdos e SEO, restringindo *Client Components* estritamente aos pontos de interação.
- **Roteamento nativo por arquivos**: eliminação de múltiplos arquivos HTML isolados em favor de rotas dinâmicas com transições fluidas.
- **Desacoplamento de dados**: regras de negócio e dados estáticos (aulas, perguntas e parâmetros) extraídos para JSONs estruturados fora do JavaScript principal.

> **Ideia central da arquitetura:**  
> O conteúdo estático é lido diretamente no servidor (alta velocidade e SEO), a validação de respostas do quiz é protegida por uma camada de API interna (sem expor o gabarito no navegador) e a interatividade fica restrita a componentes de cliente bem delimitados.

---

## 2. Estrutura Proposta (Next.js App Router)

A organização geral da aplicação distribui as responsabilidades em quatro diretórios principais:

- **Raiz (`app/`)**: Layout global unificado (cabeçalho, navegação móvel inferior, rodapé), arquivos de página para cada rota e configuração de metadados de SEO.
- **Componentes (`components/`)**: Elementos estruturais compartilhados, primitivos visuais e blocos específicos por funcionalidade.
- **Dados e Serviços (`lib/` ou `data/`)**: Arquivos JSON estáticos (módulos, perguntas) e módulos com funções puras de cálculo (juros compostos, reserva de emergência e regras de pontuação).
- **Público (`public/`)**: Imagens, ícones vetoriais, ilustrações e fontes estáticas.

---

## 3. Mapeamento de Rotas

As cinco páginas HTML do projeto original convertem-se em cinco rotas da aplicação, mantendo separação clara de responsabilidades:

| Página atual | Rota no Next.js | Tipo de componente | Responsabilidade |
| :--- | :--- | :--- | :--- |
| `index.html` | `/` | Servidor, com ilhas de cliente | Página inicial, jornada, gráfico comparativo de 12 meses (`fetch /api/market-rates`) e metas pessoais |
| `pages/trilhas.html` | `/trilhas` | Servidor + cliente | Trilha pedagógica, filtros por fase e mapa interativo de módulos (`fetch /api/modules`) |
| `pages/conteudo.html` | `/conteudo/[moduloId]` | Servidor + ConteudoClient | Artigos educativos carregados dinamicamente via `fetch /api/lessons/[moduloId]` |
| `pages/quiz.html` | `/quiz/[moduloId]` | Cliente (QuizClient) | Questionário interativo carregado via `fetch /api/quizzes/[moduloId]`, seleção, feedback e pontuação |
| `pages/simulador.html` | `/simulador` | Cliente | Calculadora em tempo real de juros compostos integrada com `fetch /api/market-rates` e projeção SVG |

---

## 4. Arquitetura e Organização dos Componentes

A estrutura recomendada organiza os componentes em três camadas funcionais:

```text
components/
├── layout/         # Moldura fixa, navegação e rodapés globais
├── ui/             # Primitivos visuais reutilizáveis (botões, badges, cards)
└── features/       # Componentes de domínio específico por funcionalidade
    ├── home/       # Gráfico comparativo e anotações de metas
    ├── trilhas/    # Filtros de fases e mapa de módulos
    ├── conteudo/   # Leitor focado de aulas teóricas
    ├── quiz/       # Questionário interativo, alternativas e feedback
    └── simulador/  # Calculadora paramétrica e projeção financeira
```

---

## 5. Componentes Estruturais e Globais (Layout & Shell)

Estes componentes compõem a casca compartilhada da aplicação via layout raiz:

| Componente | Tipo | Responsabilidade |
| :--- | :--- | :--- |
| **`AppHeader`** | Servidor | Logotipo institucional, links da navegação principal para telas maiores e acionador do perfil. |
| **`MobileNav`** | Cliente | Barra de navegação inferior fixa para dispositivos móveis, com realce da aba ativa e ícones de atalho. |
| **`AppFooter`** | Servidor | Rodapé estático com texto legal de aviso financeiro e direitos autorais. |
| **`ProfileModal`** | Cliente | Janela modal suspensa para edição do nome do usuário e visualização de aulas finalizadas. |
| **`GoalModal`** | Cliente | Janela modal com formulário para cadastro e agendamento de novas metas financeiras. |
| **`ToastNotification`** | Cliente | Balão transitório flutuante para confirmações de salvamento e avisos do sistema. |

---

## 6. Componentes Primitivos e Reutilizáveis (UI Kit)

Elementos atômicos compartilhados por múltiplos módulos:

- **`Button`**: Botão versátil com suporte a variantes visuais (principal, secundário, texto plano e botão de fechar em formato de cruz).
- **`ProgressBar`**: Barra de progresso percentual com transição suave, utilizada no cabeçalho do quiz e na leitura de aulas.
- **`Badge`**: Pílula identificadora de status, usada para indicar o nível do usuário (*"Iniciante"*), status da API ou identificador de fase.
- **`Card`**: Contêiner com elevação, cantos arredondados e bordas suaves para encapsular conteúdos e seções.

---

## 7. Componentes por Funcionalidade (Features)

### A. Página Inicial (`/`)
- **`HomeHero`**: Bloco de apresentação com saudação personalizada, frase motivacional e pílula com data atualizada.
- **`YieldComparisonCard`**: Cartão com o gráfico comparativo dos últimos 12 meses e a legenda visual dos indexadores (CDB, CDI, Selic, FIIs e Poupança).
- **`GoalsSection`**: Contêiner de gerenciamento de objetivos financeiros.
  - **`GoalItem`**: Card individual de cada meta cadastrada, exibindo título, anotação descritiva, data desejada e ação de exclusão.
  - **`EmptyGoalsState`**: Ilustração e texto instrucional exibidos quando o usuário ainda não possui metas criadas.

### B. Módulo de Trilhas (`/trilhas`)
- **`TrailHeader`**: Título da seção acompanhado pelo selo dinâmico de evolução do usuário (*Iniciante*, *Intermediário*, etc.).
- **`PhaseFilterBar`**: Seletor de abas com botões de filtro para visualizar todas as etapas ou isolar as Fases 1, 2 ou 3.
- **`TrailMap`**: Trilha contínua que organiza os módulos pedagógicos em sequência.
  - **`TrailNodeCard`**: Cartão individual de cada módulo, contendo ícone temático, título, status visual (disponível, bloqueado ou concluído) e link de direcionamento para a aula ou quiz.

### C. Módulo de Leitura / Aula (`/conteudo/[moduloId]`)
- **`FocusHeader`**: Cabeçalho simplificado de modo foco contendo botão de retorno à trilha, barra de preenchimento e contador da lição.
- **`LessonArticle`**: Área principal do artigo educativo com tipografia otimizada para leitura, marcadores visuais e destaques conceituais.
- **`FocusFooter`**: Barra inferior com o botão de avanço direcionando diretamente para a avaliação do módulo.

### D. Módulo de Quiz (`/quiz/[moduloId]`)
- **`QuizHeader`**: Cabeçalho do questionário com indicador de posição numérica e botão de cancelamento da sessão.
- **`QuizBreadcrumb`**: Trilha de migalhas indicando Fase, Nome do Módulo e a etiqueta de avaliação rápida.
- **`QuizStepper`**: Marcadores circulares que indicam a quantidade total de questões e o progresso da rodada.
- **`QuizQuestion`**: Cartão que renderiza o enunciado da pergunta atual.
- **`AnswerGroup`**: Lista ordenável de alternativas selecionáveis.
  - **`AnswerOptionButton`**: Botão de alternativa com estados visuais reativos (neutro, selecionado, acerto em verde ou erro em vermelho).
- **`QuizFeedbackPanel`**: Faixa explicativa exibida após a escolha, apresentando a justificativa pedagógica e reforço de aprendizado.
- **`QuizRewardCard`**: Tela de encerramento e celebração após o término das perguntas, mostrando índice de acertos, medalha e liberação do próximo módulo.

### E. Módulo de Simulação Financeira (`/simulador`)
- **`SimulatorHeader`**: Cabeçalho temático com título explicativo e ilustração do laboratório financeiro.
- **`SimulationForm`**: Formulário interativo com entradas numéricas para:
  - Valor inicial
  - Aporte mensal recorrente
  - Taxa anual esperada
  - Prazo em anos
- **`SimulationResultCard`**: Painel com o montante final estimado e destaque do valor total obtido em juros.
- **`ProjectionChart`**: Gráfico de linhas ou barras projetando a curva de crescimento do patrimônio ao longo do tempo.
- **`StatsGrid`**: Grade de resumo com três blocos analíticos (Total aportado do bolso, Total acumulado em rendimentos e Taxa efetiva mensal).
- **`CompoundInterestExplainer`**: Bloco retrátil em formato sanfona explicando o conceito teórico de juros compostos.

---

## 8. Matriz de Classificação: Servidor vs. Cliente

| Componente | Classificação | Justificativa Técnica |
| :--- | :--- | :--- |
| **`AppHeader`, `AppFooter`** | Server Component | Estruturas fixas que não mantêm estado nem manipulam eventos complexos. |
| **`HomeHero`, `TrailHeader`** | Server Component | Conteúdos textuais e metadados que beneficiam indexação e carregamento imediato. |
| **`LessonArticle`** | Server Component | Textos longos de artigos educativos que chegam pré-renderizados em HTML puro. |
| **`MobileNav`** | Client Component | Precisa verificar a rota ativa no navegador para destacar o botão correto. |
| **`Modais (Profile / Goal)`** | Client Component | Controlam estados de abertura, fechamento e envio de formulários via teclado/mouse. |
| **`PhaseFilterBar`** | Client Component | Dispara filtros reativos na interface ao clique das abas. |
| **`SimulationForm` e `ProjectionChart`** | Client Component | Exigem recálculo instantâneo de fórmulas matemáticas e redesenho reativo do gráfico conforme o usuário digita. |
| **`QuizQuestion`, `AnswerGroup` e `QuizRewardCard`** | Client Component | Dependem de eventos de clique, temporização, transições de tela e persistência de pontuação no navegador. |

---

## 9. Provedores de Estado Sugeridos (Contextos Globais)

Para evitar passagem excessiva de propriedades entre componentes (*prop drilling*), sugerem-se três contextos de dados:

- **`ProgressContext`**: Mantém o registro de módulos já concluídos, pontuações de quizzes e desbloqueio das próximas fases. Sincroniza com o armazenamento local.
- **`GoalsContext`**: Armazena a lista de metas pessoais cadastradas pelo usuário, possibilitando adição e exclusão a partir de qualquer tela.
- **`UserContext`**: Centraliza preferências de exibição e o nome do perfil definido na modal.

---

## 10. Consumo Estrito de Dados via API e `fetch()`

A aplicação não importa arquivos JSON locais nas telas. Todos os dados são expostos por **Route Handlers** no Next.js (`src/app/api/`) e consumidos estritamente via `fetch()` assíncrono no cliente:

| Funcionalidade | Endpoint Consumido | Componente Consumidor |
| :--- | :--- | :--- |
| **Módulos e Fases** | `/api/modules` | `AppContext.js`, `TrailMap.js`, `QuizClient.js`, `ConteudoClient.js` |
| **Aulas e Artigos** | `/api/lessons/[moduloId]` | `ConteudoClient.js` |
| **Questionários** | `/api/quizzes/[moduloId]` | `QuizClient.js` |
| **Taxas do Mercado** | `/api/market-rates` | `YieldComparisonCard.js`, `SimuladorPage` |

---

## 11. Endpoints Implementados da API (`src/app/api/`)

A camada de API foi padronizada retornando objetos e coleções JSON através de respostas HTTP nativas do Next.js:

| Endpoint | Método | O que retorna | Uso na interface |
| :--- | :---: | :--- | :--- |
| **`/api/modules`** | `GET` | Array com os 6 módulos, fases, títulos, ícones e descrições | `/trilhas`, navegação e totalizador de progresso no contexto |
| **`/api/lessons`** | `GET` | Todas as lições didáticas ou lição específica via query param `?id=m1` | Consulta geral de conteúdo |
| **`/api/lessons/[moduloId]`** | `GET` | Título da aula, parágrafos formatados e destaques conceituais da lição | Leitor imersivo em `/conteudo/[moduloId]` |
| **`/api/quizzes`** | `GET` | Banco completo de perguntas agrupadas por módulo | Consulta geral de avaliações |
| **`/api/quizzes/[moduloId]`** | `GET` | Perguntas, alternativas e dicas pedagógicas do módulo ativo | Avaliação rápida interativa em `/quiz/[moduloId]` |
| **`/api/market-rates`** | `GET` | Taxas mensais e anuais de CDI, Selic e Poupança | Projeções do simulador e comparativo dos últimos 12 meses |

---

## 12. Estratégia de Cache, Resiliência e UX

- **Cache**: Revalidação incremental com invalidação orientada por *tags*, atualizando apenas a rota correspondente ao dado modificado.
- **Carregamento (*Loading*)**: Estruturas de *skeletons* com o formato de cartões e linhas cinzas previnem saltos de layout (*layout shift*).
- **Falhas e Contingência**: Se um JSON estiver temporariamente indisponível ou corrompido, uma tela de contingência oferece botão de "tentar novamente" sem interromper o restante da navegação.
- **Persistência Híbrida**: Pontuações, medalhas e metas permanecem salvas no armazenamento local do navegador para funcionamento offline no celular; a API serve apenas para enunciados e validação.

---

## 13. Passos da Migração

1. **Inicialização**: Criar a estrutura base do projeto Next.js, preservar integralmente o design e variáveis de CSS existentes, e configurar metadados, viewport mobile e Open Graph.
2. **Componentes**: Isolar cabeçalho, navegação móvel e rodapé no layout raiz; separar componentes de servidor (conteúdo estático) de componentes de cliente (interação e temporizadores).
3. **Regras de Negócio**: Transformar os cálculos matemáticos do simulador em funções puras independentes de interface e centralizar o progresso do usuário em contextos de estado.
4. **Validação**: Testar a responsividade em dispositivos móveis e auditar padrões de acessibilidade (hierarquia de cabeçalhos, textos alternativos e navegação por teclado).
