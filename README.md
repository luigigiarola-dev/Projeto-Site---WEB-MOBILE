# Projeto-Site---WEB-MOBILE

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

## Tecnologias

- **HTML5** — semântico e acessível
- **CSS3** — design system com variáveis CSS, responsivo e modular
- **JavaScript (ES6+)** — lógica da aplicação, validações, gerenciamento de estado local (`localStorage`/`sessionStorage`)
- **Google Charts API** — visualização gráfica interativa de rentabilidade e projeções
