/**
 * FinEdu — Educação Financeira Web Mobile
 * Código JavaScript Vanilla refatorado, modular e simplificado.
 */
(() => {
  "use strict";

  /* ==========================================================================
     1. CONSTANTES E BANCO DE DADOS
     ========================================================================== */

  const STORAGE_KEY = "finanedu-progress-v1";
  const QUIZ_SESSION_KEY = "finanedu-active-quiz-v1";

  // Módulos da trilha de aprendizado
  const MODULES = [
    { id: "m1", phase: 1, icon: "💡", title: "Poupar e investir", short: "O que é investir?" },
    { id: "m2", phase: 1, icon: "🧾", title: "Orçamento pessoal", short: "Organize seus gastos" },
    { id: "m3", phase: 2, icon: "🏦", title: "Reserva de emergência", short: "Sua rede de segurança" },
    { id: "m4", phase: 2, icon: "📊", title: "Opções de investimento", short: "Risco e retorno" },
    { id: "m5", phase: 3, icon: "🎯", title: "Metas financeiras", short: "Planeje seus objetivos" },
    { id: "m6", phase: 3, icon: "🌳", title: "Diversificação", short: "Monte uma estratégia" },
  ];

  // Banco de perguntas organizadas por módulo (m1 a m6)
  const QUIZ_BANK = {
    m1: [
      {
        q: "Qual é a principal diferença entre poupar e investir?",
        options: [
          "Poupar é guardar; investir busca multiplicar",
          "São exatamente a mesma coisa",
          "Poupar sempre tem risco; investir nunca",
          "Investir é somente para quem é rico",
        ],
        correct: 0,
        tip: "Poupar separa dinheiro. Investir aplica esse dinheiro com expectativa de rendimento.",
      },
      {
        q: "Por que deixar dinheiro parado pode ser um problema?",
        options: [
          "Porque a inflação pode reduzir seu poder de compra",
          "Porque o banco sempre cobra multa",
          "Porque o dinheiro desaparece",
          "Porque guardar é proibido",
        ],
        correct: 0,
        tip: "A inflação faz os preços subirem: com o mesmo valor, você pode comprar menos no futuro.",
      },
      {
        q: "O que deve vir antes de escolher um investimento?",
        options: [
          "O objetivo e o prazo do dinheiro",
          "A indicação de um desconhecido",
          "O nome mais famoso",
          "A cor do aplicativo",
        ],
        correct: 0,
        tip: "Objetivo, prazo e tolerância a risco ajudam a encontrar opções mais adequadas.",
      },
      {
        q: "Para que servem os juros compostos?",
        options: [
          "Para render sobre valores já rendidos",
          "Para impedir aportes mensais",
          "Para zerar a inflação",
          "Para evitar planejamento",
        ],
        correct: 0,
        tip: "Nos juros compostos, os rendimentos também passam a render com o tempo.",
      },
    ],
    m2: [
      {
        q: "Qual é a função principal de um orçamento pessoal?",
        options: [
          "Dar visibilidade para receitas e gastos",
          "Fazer compras automaticamente",
          "Eliminar todas as contas",
          "Escolher ações",
        ],
        correct: 0,
        tip: "Um orçamento mostra para onde o dinheiro vai e ajuda a fazer escolhas conscientes.",
      },
      {
        q: "Qual gasto costuma merecer revisão primeiro?",
        options: [
          "O que se repete e não faz mais sentido",
          "Somente gastos grandes",
          "Nenhum gasto fixo",
          "Apenas presentes",
        ],
        correct: 0,
        tip: "Pequenos gastos recorrentes somados pesam bastante no final do mês.",
      },
      {
        q: "Quando é melhor registrar um gasto?",
        options: [
          "Assim que ele acontecer",
          "Somente no fim do ano",
          "Apenas se for caro",
          "Nunca",
        ],
        correct: 0,
        tip: "Registrar perto do momento da compra evita esquecimentos.",
      },
      {
        q: "Uma boa regra para o orçamento é:",
        options: [
          "Planejar antes de gastar",
          "Gastar antes de receber",
          "Ignorar contas futuras",
          "Copiar o orçamento de outra pessoa",
        ],
        correct: 0,
        tip: "O orçamento é pessoal: deve refletir sua realidade e seus objetivos.",
      },
    ],
    m3: [
      {
        q: "Qual é o objetivo de uma reserva de emergência?",
        options: [
          "Cobrir imprevistos sem recorrer a dívidas",
          "Aumentar o risco da carteira",
          "Comprar itens por impulso",
          "Substituir todo investimento",
        ],
        correct: 0,
        tip: "A reserva oferece segurança e tranquilidade diante de situações inesperadas.",
      },
      {
        q: "Uma reserva de emergência deve priorizar:",
        options: [
          "Liquidez e segurança",
          "Promessas de retorno alto",
          "Dinheiro inacessível por anos",
          "Apenas ações voláteis",
        ],
        correct: 0,
        tip: "Em uma emergência, o acesso rápido e seguro ao dinheiro é essencial.",
      },
      {
        q: "Qual situação combina com o uso da reserva de emergência?",
        options: [
          "Um conserto urgente de saúde ou casa",
          "Uma viagem de férias",
          "Uma compra por moda",
          "Um presente de aniversário",
        ],
        correct: 0,
        tip: "Reservas existem para imprevistos necessários, não para desejos de consumo.",
      },
      {
        q: "Como construir uma reserva de emergência?",
        options: [
          "Com aportes possíveis e frequentes",
          "Esperando sobrar muito dinheiro",
          "Usando empréstimos com juros altos",
          "Aplicando todo o salário de uma vez",
        ],
        correct: 0,
        tip: "A constância mensal torna o objetivo atingível e sustentável.",
      },
    ],
    m4: [
      {
        q: "O que costuma aumentar junto com a chance de retorno?",
        options: ["O risco", "A garantia", "A liquidez sempre", "A previsibilidade"],
        correct: 0,
        tip: "Retorno e risco caminham juntos no mercado financeiro.",
      },
      {
        q: "Renda fixa significa:",
        options: [
          "Ter regras de rentabilidade definidas na contratação",
          "Nunca ter qualquer variação de saldo",
          "Não poder resgatar o dinheiro nunca",
          "Ser exatamente igual à poupança",
        ],
        correct: 0,
        tip: "As regras de cálculo do rendimento são conhecidas desde o início.",
      },
      {
        q: "Qual pergunta ajuda a escolher o investimento ideal?",
        options: [
          "Quando vou precisar desse dinheiro?",
          "Qual tem o nome mais curto?",
          "Qual foi indicado por um estranho?",
          "Qual parece mais difícil de entender?",
        ],
        correct: 0,
        tip: "Prazo, objetivo e perfil de risco orientam uma boa decisão.",
      },
      {
        q: "O conceito de diversificação significa:",
        options: [
          "Não concentrar todo o capital em uma única opção",
          "Aplicar sempre no mesmo produto",
          "Ignorar os riscos existentes",
          "Trocar de aplicação todos os dias",
        ],
        correct: 0,
        tip: "Distribuir entre diferentes produtos reduz a dependência de um só ativo.",
      },
    ],
    m5: [
      {
        q: "Uma meta financeira clara inclui:",
        options: [
          "Valor, prazo e objetivo",
          "Somente desejo vago",
          "Apenas a opinião dos amigos",
          "Um produto aleatório",
        ],
        correct: 0,
        tip: "Quanto mais específica a meta, mais fácil medir o progresso e montar a estratégia.",
      },
      {
        q: "Por que separar metas por prazo (curto, médio e longo)?",
        options: [
          "Porque cada prazo exige um nível de risco e liquidez diferente",
          "Porque todas as aplicações rendem exatamente o mesmo",
          "Para nunca precisar investir",
          "Para escolher apenas um único produto",
        ],
        correct: 0,
        tip: "Prazos curtos pedem segurança; prazos longos suportam oscilações maiores.",
      },
      {
        q: "O que ajuda a manter uma meta financeira ativa?",
        options: [
          "Acompanhar o avanço com frequência",
          "Esquecer a meta logo após anotar",
          "Mudar de objetivo todos os dias",
          "Não registrar novos aportes",
        ],
        correct: 0,
        tip: "Acompanhar a evolução mantém a motivação e permite ajustes de rota.",
      },
      {
        q: "Um aporte programado/automático ajuda porque:",
        options: [
          "Transforma a disciplina em um hábito automático",
          "Garante retorno milionário imediato",
          "Elimina todo e qualquer risco",
          "Substitui a necessidade de planejar",
        ],
        correct: 0,
        tip: "Automatizar seus investimentos evita esquecimentos e gastos por impulso.",
      },
    ],
    m6: [
      {
        q: "Qual é o principal objetivo de uma carteira diversificada?",
        options: [
          "Combinar ativos com comportamentos diferentes para equilibrar riscos",
          "Apostar tudo em uma única ação da moda",
          "Evitar qualquer tipo de planejamento financeiro",
          "Comprar apenas o que subiu ontem",
        ],
        correct: 0,
        tip: "Ativos diferentes reagem de maneiras opostas a diferentes cenários econômicos.",
      },
      {
        q: "Quando é recomendado rebalancear uma carteira de investimentos?",
        options: [
          "Quando seus objetivos, prazos ou percentuais planejados mudarem",
          "A cada notícia alarmista da internet",
          "Apenas quando houver lucro rápido",
          "Nunca mais mexer",
        ],
        correct: 0,
        tip: "Revisões periódicas mantêm a carteira alinhada aos seus objetivos pessoais.",
      },
      {
        q: "A diversificação elimina 100% das perdas?",
        options: [
          "Não, mas ajuda a diluir e controlar os riscos gerais",
          "Sim, sempre elimina totalmente",
          "Apenas se for investido em renda fixa",
          "Somente em dias úteis",
        ],
        correct: 0,
        tip: "Diversificar não anula os riscos de mercado, mas previne perdas catastróficas.",
      },
      {
        q: "Uma estratégia de investimento de longo prazo deve se basear em:",
        options: [
          "Objetivos claros, consistência e tolerância ao risco",
          "A última recomendação de rede social",
          "Palpites rápidos",
          "Tentativas de adivinhar o topo do mercado",
        ],
        correct: 0,
        tip: "A disciplina consistente supera a tentativa de prever o mercado no curto prazo.",
      },
    ],
  };

  // Taxas referenciais de mercado
  const marketRates = {
    cdiMonthly: 0.009,       // ~0,90% ao mês
    selicMonthly: 0.009,     // ~0,90% ao mês
    savingsMonthly: 0.005,   // ~0,50% ao mês
    isLiveBcb: false,
  };

  /* ==========================================================================
     2. GERENCIAMENTO DE ESTADO (LOCALSTORAGE)
     ========================================================================== */

  const defaultState = {
    name: "",
    goals: [],
    completed: [],
    results: {},
  };

  let state = loadState();
  let selectedModuleIndex = 0;
  let activePhaseFilter = "all";
  let activeQuiz = null;
  let isGoogleChartsReady = false;
  let toastTimeout = null;

  function loadState() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return { ...defaultState };
      const parsed = JSON.parse(stored);
      return {
        ...defaultState,
        ...parsed,
        goals: Array.isArray(parsed.goals) ? parsed.goals : [],
        completed: Array.isArray(parsed.completed) ? parsed.completed : [],
        results: parsed.results || {},
      };
    } catch {
      return { ...defaultState };
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn("Não foi possível salvar o estado no localStorage", e);
    }
  }

  /* ==========================================================================
     3. FUNÇÕES UTILITÁRIAS E FORMATAÇÃO
     ========================================================================== */

  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

  function formatCurrency(value) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(value) || 0);
  }

  function formatDate(isoDateString) {
    if (!isoDateString) return "Sem data definida";
    try {
      return new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" }).format(
        new Date(isoDateString + "T12:00:00"),
      );
    } catch {
      return isoDateString;
    }
  }

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text ?? "";
    return div.innerHTML;
  }

  function shuffle(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function getProgressPercentage() {
    return Math.round((state.completed.length / MODULES.length) * 100);
  }

  function getUserLevel() {
    const progress = getProgressPercentage();
    if (progress >= 70) return "Avançado";
    if (progress >= 35) return "Intermediário";
    if (progress > 0) return "Iniciante";
    return "Novato";
  }

  function isModuleUnlocked(index) {
    // Primeiro módulo sempre liberado; os demais dependem do progresso
    return index <= state.completed.length;
  }

  function getModuleStatus(index) {
    const module = MODULES[index];
    if (state.completed.includes(module.id)) return "completed";
    if (index === state.completed.length) return "current";
    if (isModuleUnlocked(index)) return "available";
    return "locked";
  }

  function showToast(message) {
    const toast = $("#toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove("show"), 3300);
  }

  /* ==========================================================================
     4. HEADER, PERFIL E METAS
     ========================================================================== */

  function renderHeaderAndProfile() {
    // Nível na trilha
    const trailLevel = $("#trailLevel");
    if (trailLevel) trailLevel.textContent = `🌱 ${getUserLevel()}`;

    // Título da home com boas-vindas personalizadas
    const homeTitle = $("#homeTitle");
    if (homeTitle) {
      homeTitle.textContent = state.name
        ? `Olá, ${state.name}! Pronto para estudar? ✨`
        : "Seu próximo passo começa aqui ✨";
    }

    // Modal de perfil
    const profileTitle = $("#profileTitle");
    if (profileTitle) {
      profileTitle.textContent = state.name
        ? `${state.name}, sua jornada está em movimento!`
        : "Personalize sua jornada";
    }

    const profileNameInput = $("#profileName");
    if (profileNameInput && state.name) {
      profileNameInput.value = state.name;
    }

    const profileCompleted = $("#profileCompleted");
    if (profileCompleted) {
      const total = MODULES.length;
      const count = state.completed.length;
      profileCompleted.textContent = count > 0
        ? `${count} de ${total} aulas concluídas (${getProgressPercentage()}%).`
        : "Nenhuma aula concluída ainda.";
    }

    // Data de hoje
    const dateLabel = $("#dateLabel");
    if (dateLabel) {
      dateLabel.textContent = new Intl.DateTimeFormat("pt-BR", {
        weekday: "short",
        day: "numeric",
        month: "short",
      }).format(new Date());
    }
  }

  function renderGoalsList() {
    const list = $("#goalList");
    const emptyState = $("#emptyGoals");
    if (!list || !emptyState) return;

    list.innerHTML = "";
    emptyState.hidden = state.goals.length > 0;

    state.goals.forEach((goal, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>
          <strong>${escapeHtml(goal.title)}</strong>
          <p>${escapeHtml(goal.note || "Sem anotação")}</p>
          <time>${formatDate(goal.date)}</time>
        </span>
        <button class="remove-goal" type="button" aria-label="Excluir meta: ${escapeHtml(goal.title)}">×</button>
      `;

      li.querySelector(".remove-goal").addEventListener("click", () => {
        state.goals.splice(index, 1);
        saveState();
        renderGoalsList();
        showToast("Meta removida.");
      });

      list.appendChild(li);
    });
  }

  function setupProfileAndGoalsEvents() {
    // Abrir e fechar perfil
    const profileOpen = $("#profileOpen");
    const profileClose = $("#profileClose");
    const profileDialog = $("#profileDialog");
    const profileForm = $("#profileForm");

    if (profileOpen && profileDialog) {
      profileOpen.addEventListener("click", () => profileDialog.showModal());
    }
    if (profileClose && profileDialog) {
      profileClose.addEventListener("click", () => profileDialog.close());
    }
    if (profileForm && profileDialog) {
      profileForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = $("#profileName");
        state.name = input ? input.value.trim() : "";
        saveState();
        renderHeaderAndProfile();
        profileDialog.close();
        showToast(state.name ? `Perfil salvo, ${state.name}!` : "Perfil atualizado.");
      });
    }

    // Abrir e fechar metas
    const goalOpen = $("#goalOpen");
    const goalClose = $("#goalClose");
    const goalDialog = $("#goalDialog");
    const goalForm = $("#goalForm");

    if (goalOpen && goalDialog) {
      goalOpen.addEventListener("click", () => goalDialog.showModal());
    }
    if (goalClose && goalDialog) {
      goalClose.addEventListener("click", () => goalDialog.close());
    }
    if (goalForm && goalDialog) {
      goalForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const titleInput = $("#goalTitle");
        const noteInput = $("#goalNote");
        const dateInput = $("#goalDate");

        const title = titleInput ? titleInput.value.trim() : "";
        const note = noteInput ? noteInput.value.trim() : "";
        const date = dateInput ? dateInput.value : "";

        if (!title) return;

        state.goals.push({ title, note, date });
        saveState();
        renderGoalsList();
        goalForm.reset();
        goalDialog.close();
        showToast("Nova meta adicionada!");
      });
    }
  }

  /* ==========================================================================
     5. TRILHAS E CONTEÚDO DIDÁTICO
     ========================================================================= */

  function renderTrailMap() {
    const pathMap = $("#pathMap");
    if (!pathMap) return;

    pathMap.innerHTML = "";

    const visibleModules = MODULES.filter((module) => {
      return activePhaseFilter === "all" || module.phase === Number(activePhaseFilter);
    });

    visibleModules.forEach((module) => {
      const originalIndex = MODULES.indexOf(module);
      const status = getModuleStatus(originalIndex);
      const li = document.createElement("li");
      const button = document.createElement("button");

      button.className = `node ${status}`;
      button.disabled = status === "locked";
      button.dataset.module = originalIndex;

      const icon = status === "completed" ? "✓" : status === "locked" ? "🔒" : module.icon;
      button.innerHTML = `
        <span class="node-core">${icon}</span>
        <small>${escapeHtml(module.title)}</small>
      `;

      button.addEventListener("click", () => {
        if (!isModuleUnlocked(originalIndex)) {
          showToast("Conclua a etapa anterior para desbloquear este módulo.");
          return;
        }
        selectedModuleIndex = originalIndex;
        // Inicia o quiz diretamente ou navega para ele
        startQuizSession(originalIndex);
      });

      li.appendChild(button);
      pathMap.appendChild(li);
    });
  }

  function setupPhaseFilters() {
    const filterButtons = $$("[data-phase]");
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        activePhaseFilter = btn.dataset.phase;
        filterButtons.forEach((b) => b.classList.toggle("active", b === btn));
        renderTrailMap();
      });
    });
  }

  function renderLessonContent() {
    const lessonPhase = $("#lessonPhase");
    const lessonTitle = $("#lessonTitle");
    if (!lessonPhase || !lessonTitle) return;

    const module = MODULES[selectedModuleIndex] || MODULES[0];
    const phaseNames = { 1: "Fundamentos", 2: "Planejamento", 3: "Estratégia" };
    lessonPhase.textContent = `Fase ${module.phase} · ${phaseNames[module.phase] || "Fundamentos"}`;
    lessonTitle.textContent = selectedModuleIndex === 0 ? "O que é investir?" : module.short;
  }

  /* ==========================================================================
     6. QUIZ E GAMIFICAÇÃO
     ========================================================================== */

  function startQuizSession(moduleIndex) {
    selectedModuleIndex = moduleIndex;
    const module = MODULES[moduleIndex] || MODULES[0];
    const pool = QUIZ_BANK[module.id] || QUIZ_BANK.m1;

    // Seleciona 3 perguntas aleatórias e embaralha as alternativas
    const chosenQuestions = shuffle(pool).slice(0, 3).map((item) => {
      const indices = [0, 1, 2, 3];
      const shuffledIndices = shuffle(indices);
      return {
        q: item.q,
        options: shuffledIndices.map((i) => item.options[i]),
        correct: shuffledIndices.indexOf(item.correct),
        tip: item.tip,
      };
    });

    activeQuiz = {
      moduleIndex,
      items: chosenQuestions,
      currentIndex: 0,
      selectedIndex: null,
      isChecked: false,
      correctCount: 0,
    };

    saveQuizSession();

    // Se estiver em outra página (ex: trilhas, conteudo ou index), redireciona para quiz.html
    if (!$("#quizTitle")) {
      const isInPagesDir = window.location.pathname.includes("/pages/");
      window.location.href = isInPagesDir ? "quiz.html" : "pages/quiz.html";
      return;
    }

    renderCurrentQuestion();
  }

  function saveQuizSession() {
    try {
      sessionStorage.setItem(QUIZ_SESSION_KEY, JSON.stringify(activeQuiz));
    } catch {}
  }

  function restoreQuizSession() {
    try {
      const raw = sessionStorage.getItem(QUIZ_SESSION_KEY);
      if (!raw) return false;
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.items) && parsed.items.length > 0) {
        activeQuiz = parsed;
        selectedModuleIndex = parsed.moduleIndex || 0;
        return true;
      }
    } catch {}
    return false;
  }

  function clearQuizSession() {
    try {
      sessionStorage.removeItem(QUIZ_SESSION_KEY);
    } catch {}
  }

  function renderCurrentQuestion() {
    if (!activeQuiz || !$("#quizTitle")) return;

    const currentQuestion = activeQuiz.items[activeQuiz.currentIndex];
    const module = MODULES[selectedModuleIndex] || MODULES[0];
    const phaseNames = { 1: "Fundamentos", 2: "Planejamento", 3: "Estratégia" };

    $("#quizTitle").textContent = currentQuestion.q;
    $("#quizModule").textContent = module.title;
    $("#quizPhase").textContent = `Fase ${module.phase} · ${phaseNames[module.phase]}`;
    $("#quizPosition").textContent = `${activeQuiz.currentIndex + 1}/3`;

    // Barra de progresso do quiz
    const meter = $("#quizMeter");
    if (meter) {
      meter.style.setProperty("--value", `${(activeQuiz.currentIndex / 3) * 100}%`);
    }

    // Stepper (bolinhas indicadoras)
    const stepper = $("#quizStepper");
    if (stepper) {
      stepper.innerHTML = [0, 1, 2]
        .map((step) => {
          let className = "";
          if (step < activeQuiz.currentIndex) className = "done";
          else if (step === activeQuiz.currentIndex) className = "current";
          return `<li class="${className}"></li>`;
        })
        .join("");
    }

    // Feedback e botão de ação
    const feedback = $("#feedback");
    if (feedback) {
      feedback.className = "feedback";
      feedback.textContent = "";
    }

    const actionBtn = $("#quizAction");
    if (actionBtn) {
      actionBtn.hidden = true;
      actionBtn.disabled = true;
      actionBtn.textContent = activeQuiz.currentIndex === 2 ? "Ver resultado" : "Próxima";
    }

    // Renderiza as alternativas
    const answersContainer = $("#answers");
    if (answersContainer) {
      answersContainer.innerHTML = "";
      currentQuestion.options.forEach((optionText, index) => {
        const btn = document.createElement("button");
        btn.type = "button";
        const letter = String.fromCharCode(65 + index); // A, B, C, D
        btn.innerHTML = `<b>${letter}.</b> ${escapeHtml(optionText)}`;
        btn.addEventListener("click", () => handleSelectAnswer(index));
        answersContainer.appendChild(btn);
      });
    }

    activeQuiz.isChecked = false;
    activeQuiz.selectedIndex = null;
  }

  function handleSelectAnswer(chosenIndex) {
    if (!activeQuiz || activeQuiz.isChecked) return;

    activeQuiz.isChecked = true;
    activeQuiz.selectedIndex = chosenIndex;

    const currentQuestion = activeQuiz.items[activeQuiz.currentIndex];
    const isCorrect = chosenIndex === currentQuestion.correct;
    if (isCorrect) activeQuiz.correctCount++;

    // Desabilita botões e colore certo/errado
    const optionButtons = $$("#answers button");
    optionButtons.forEach((button, index) => {
      button.disabled = true;
      if (index === currentQuestion.correct) {
        button.classList.add("correct");
      } else if (index === chosenIndex) {
        button.classList.add("wrong");
      }
    });

    // Exibe feedback
    const feedback = $("#feedback");
    if (feedback) {
      feedback.textContent = (isCorrect ? "Correto! " : "Não é essa. ") + currentQuestion.tip;
      feedback.className = `feedback show ${isCorrect ? "correct" : "wrong"}`;
    }

    // Mostra botão de continuar
    const actionBtn = $("#quizAction");
    if (actionBtn) {
      actionBtn.hidden = false;
      actionBtn.disabled = false;
      actionBtn.textContent = activeQuiz.currentIndex === 2 ? "Ver resultado" : "Próxima";
    }

    saveQuizSession();
  }

  function handleNextQuestion() {
    if (!activeQuiz) return;
    if (activeQuiz.currentIndex < 2) {
      activeQuiz.currentIndex++;
      saveQuizSession();
      renderCurrentQuestion();
    } else {
      finishQuiz();
    }
  }

  function finishQuiz() {
    if (!activeQuiz) return;

    const module = MODULES[selectedModuleIndex] || MODULES[0];
    const score = activeQuiz.correctCount;
    const passed = score >= 2;
    const wasAlreadyDone = state.completed.includes(module.id);

    // Salva o histórico de resultados
    state.results[module.id] = {
      score,
      total: 3,
      passed,
      updatedAt: new Date().toISOString(),
    };

    // Desbloqueia o próximo módulo se atingiu a pontuação mínima
    if (passed && !wasAlreadyDone) {
      state.completed.push(module.id);
      state.completed.sort((a, b) => {
        return MODULES.findIndex((m) => m.id === a) - MODULES.findIndex((m) => m.id === b);
      });
    }

    saveState();
    clearQuizSession();
    renderHeaderAndProfile();

    // Atualiza a tela de recompensa
    const quizSection = $("#quiz");
    const rewardSection = $("#recompensa");
    if (quizSection) quizSection.classList.remove("active");
    if (rewardSection) rewardSection.classList.add("active");

    const scoreRate = $("#scoreRate");
    if (scoreRate) scoreRate.textContent = `${score} de 3`;

    const rewardTitle = $("#rewardTitle");
    if (rewardTitle) {
      rewardTitle.textContent = passed ? "Aula concluída! 🎉" : "Revise e tente novamente";
    }

    const rewardCopy = $("#rewardCopy");
    if (rewardCopy) {
      rewardCopy.textContent = passed
        ? "Parabéns! Você acertou a maioria das questões e liberou o próximo módulo."
        : "Você precisa acertar pelo menos 2 questões para avançar na trilha.";
    }

    const rewardAction = $("#rewardAction");
    if (rewardAction) {
      rewardAction.textContent = passed ? "Voltar à trilha" : "Tentar novamente";
      rewardAction.onclick = () => {
        if (passed) {
          const isInPagesDir = window.location.pathname.includes("/pages/");
          window.location.href = isInPagesDir ? "trilhas.html" : "pages/trilhas.html";
        } else {
          startQuizSession(selectedModuleIndex);
          if (quizSection) quizSection.classList.add("active");
          if (rewardSection) rewardSection.classList.remove("active");
        }
      };
    }
  }

  /* ==========================================================================
     7. SIMULADOR DE INVESTIMENTOS
     ========================================================================== */

  function getNumericInputValue(id, fallback = 0) {
    const input = $(id);
    if (!input) return fallback;
    const val = Number(input.value);
    return Number.isFinite(val) ? val : fallback;
  }

  /**
   * Fórmula de Juros Compostos com Aportes Mensais:
   * FV = P * (1 + r)^n + PMT * [((1 + r)^n - 1) / r]
   */
  function calculateFutureValue(principal, monthlyPayment, monthlyRate, months) {
    if (months <= 0) return principal;
    if (Math.abs(monthlyRate) < 1e-10) {
      return principal + monthlyPayment * months;
    }
    const compoundFactor = Math.pow(1 + monthlyRate, months);
    return principal * compoundFactor + monthlyPayment * ((compoundFactor - 1) / monthlyRate);
  }

  function calculateSimulation() {
    const initial = getNumericInputValue("#initialValue", 1000);
    const monthly = getNumericInputValue("#monthlyValue", 300);
    const annualRate = getNumericInputValue("#annualRate", 11.5);
    const years = getNumericInputValue("#yearsValue", 5);

    const totalMonths = Math.max(1, years * 12);
    // Taxa mensal equivalente: r = (1 + i)^(1/12) - 1
    const monthlyRate = annualRate > -100 ? Math.pow(1 + annualRate / 100, 1 / 12) - 1 : 0;

    const dataPoints = [];
    const steps = Math.min(60, totalMonths);

    for (let i = 0; i <= steps; i++) {
      const month = (totalMonths * i) / steps;
      dataPoints.push({
        month,
        userValue: calculateFutureValue(initial, monthly, monthlyRate, month),
        cdiValue: calculateFutureValue(initial, monthly, marketRates.cdiMonthly, month),
        savingsValue: calculateFutureValue(initial, monthly, marketRates.savingsMonthly, month),
      });
    }

    const finalAmount = dataPoints[dataPoints.length - 1].userValue;
    const totalInvested = initial + monthly * totalMonths;
    const totalProfit = finalAmount - totalInvested;

    return {
      initial,
      monthly,
      annualRate,
      years,
      monthlyRate,
      totalMonths,
      finalAmount,
      totalInvested,
      totalProfit,
      dataPoints,
    };
  }

  function updateSimulationUI() {
    const simulationForm = $("#simulationForm");
    if (!simulationForm) return;

    const result = calculateSimulation();

    const totalResult = $("#totalResult");
    if (totalResult) totalResult.textContent = formatCurrency(result.finalAmount);

    const profitResult = $("#profitResult");
    if (profitResult) {
      profitResult.textContent = `Rendimento de ${formatCurrency(result.totalProfit)}`;
    }

    const investedResult = $("#investedResult");
    if (investedResult) investedResult.textContent = formatCurrency(result.totalInvested);

    const yieldResult = $("#yieldResult");
    if (yieldResult) yieldResult.textContent = formatCurrency(result.totalProfit);

    const monthlyRateResult = $("#monthlyRateResult");
    if (monthlyRateResult) {
      monthlyRateResult.textContent = `${(result.monthlyRate * 100).toFixed(2).replace(".", ",")}%`;
    }

    drawProjectionChart(result);
  }

  /* ==========================================================================
     8. GRÁFICOS (GOOGLE CHARTS E SVG FALLBACK)
     ========================================================================== */

  function drawSvgFallbackChart(container, columns, rows, colors) {
    if (!container) return;
    const seriesCount = columns.length - 1;
    const seriesValues = [];

    for (let c = 0; c < seriesCount; c++) {
      seriesValues.push(rows.map((r) => Number(r[c + 1]) || 0));
    }

    const allValues = seriesValues.flat();
    const minVal = 0;
    const maxVal = Math.max(...allValues, 1000);
    const range = maxVal - minVal || 1;

    const width = 600;
    const height = 230;
    const padding = { top: 20, right: 20, bottom: 25, left: 45 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    // Linhas de grade horizontais
    const gridLines = [0.25, 0.5, 0.75, 1.0]
      .map((ratio) => {
        const y = padding.top + chartH * (1 - ratio);
        return `<line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="#ececf3" stroke-dasharray="3" />`;
      })
      .join("");

    // Linhas dos gráficos
    const lines = seriesValues
      .map((series, sIndex) => {
        const points = series
          .map((val, idx) => {
            const x = padding.left + (idx / Math.max(series.length - 1, 1)) * chartW;
            const y = padding.top + (1 - (val - minVal) / range) * chartH;
            return `${x.toFixed(1)},${y.toFixed(1)}`;
          })
          .join(" ");
        return `<polyline fill="none" stroke="${colors[sIndex] || "#6654e8"}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" points="${points}" />`;
      })
      .join("");

    container.innerHTML = `
      <svg width="100%" height="100%" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" aria-hidden="true">
        ${gridLines}
        ${lines}
      </svg>
    `;
  }

  function drawGoogleChartLine(container, columns, rows, colors, isCompact = false) {
    if (!container) return;

    if (!isGoogleChartsReady || !window.google?.visualization) {
      drawSvgFallbackChart(container, columns, rows, colors);
      return;
    }

    const dataTable = new google.visualization.DataTable();
    columns.forEach((colName, index) => {
      dataTable.addColumn(index === 0 ? "string" : "number", colName);
    });

    // Formata o primeiro elemento da linha como string se necessário
    const formattedRows = rows.map((row) => [String(row[0]), ...row.slice(1)]);
    dataTable.addRows(formattedRows);

    const formatter = new google.visualization.NumberFormat({ prefix: "R$ ", fractionDigits: 0 });
    for (let c = 1; c < columns.length; c++) {
      formatter.format(dataTable, c);
    }

    const options = {
      backgroundColor: "transparent",
      colors,
      legend: "none",
      lineWidth: 3,
      pointSize: 0,
      chartArea: {
        left: isCompact ? 35 : 45,
        right: 15,
        top: 20,
        bottom: 30,
        width: "90%",
        height: "80%",
      },
      hAxis: {
        textStyle: { color: "#7a8094", fontName: "DM Sans", fontSize: 10 },
        gridlines: { color: "transparent" },
        baselineColor: "#e5e6ee",
      },
      vAxis: {
        format: "short",
        textStyle: { color: "#7a8094", fontName: "DM Sans", fontSize: 10 },
        gridlines: { color: "#ececf3" },
        baselineColor: "transparent",
      },
      tooltip: { textStyle: { fontName: "DM Sans" }, showColorCode: true },
      height: container.clientHeight || 230,
    };

    const chart = new google.visualization.LineChart(container);
    chart.draw(dataTable, options);
  }

  function drawProjectionChart(simResult) {
    const container = $("#projectionChart");
    if (!container) return;

    const columns = ["Mês", "Sua projeção", "CDI", "Poupança"];
    const rows = simResult.dataPoints.map((point) => [
      `Mês ${Math.round(point.month)}`,
      point.userValue,
      point.cdiValue,
      point.savingsValue,
    ]);

    drawGoogleChartLine(container, columns, rows, ["#6654e8", "#25ae72", "#9da3b5"], true);
  }

  function drawHomeChart() {
    const container = $("#homeChart");
    if (!container) return;

    const columns = ["Mês", "CDB", "CDI", "Meta Selic", "Poupança", "FIIs"];
    const rows = [];
    const monthsBack = 12;

    let cdb = 1000;
    let cdi = 1000;
    let selic = 1000;
    let savings = 1000;
    let fiis = 1000;

    const fiiFluctuations = [
      0.018, -0.006, 0.024, 0.004, 0.015, -0.011,
      0.02, 0.006, 0.017, -0.004, 0.015, 0.008,
    ];

    for (let i = 0; i < monthsBack; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - (monthsBack - 1) + i);
      const monthLabel = new Intl.DateTimeFormat("pt-BR", { month: "short" })
        .format(date)
        .replace(".", "");

      cdb *= 1 + marketRates.cdiMonthly + 0.0015 + (i % 3) * 0.0004;
      cdi *= 1 + marketRates.cdiMonthly;
      selic *= 1 + marketRates.selicMonthly;
      savings *= 1 + marketRates.savingsMonthly;
      fiis *= 1 + (fiiFluctuations[i] || 0.01);

      rows.push([monthLabel, cdb, cdi, selic, savings, fiis]);
    }

    drawGoogleChartLine(
      container,
      columns,
      rows,
      ["#6654e8", "#25ae72", "#4f9ddd", "#9da3b5", "#ffad42"],
      false,
    );
  }

  /* ==========================================================================
     9. INTEGRAÇÃO COM BANCO CENTRAL DO BRASIL (BCB API)
     ========================================================================== */

  async function fetchBcbRates() {
    const apiStatus = $("#apiStatus");
    if (!apiStatus && !$("#homeChart") && !$("#simulationForm")) return;

    const fetchSeries = async (code) => {
      const url = `https://api.bcb.gov.br/dados/serie/bcdata.sgs.${code}/dados/ultimos/260?formato=json`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Falha HTTP ${res.status}`);
      return res.json();
    };

    const parseBcbValue = (item) => {
      const raw = item?.valor ?? item;
      return Number(String(raw).replace(".", "").replace(",", "."));
    };

    try {
      // 12: Taxa CDI diária, 432: Meta Selic anualizada, 195: Poupança mensal
      const [cdiData, selicData, savingsData] = await Promise.all([
        fetchSeries(12),
        fetchSeries(432),
        fetchSeries(195),
      ]);

      const recentCdi = cdiData.slice(-21).map(parseBcbValue).filter(Number.isFinite);
      const avgCdiDaily = recentCdi.reduce((acc, v) => acc + v, 0) / recentCdi.length;
      const latestSelic = parseBcbValue(selicData[selicData.length - 1]);
      const recentSavings = savingsData.slice(-12).map(parseBcbValue).filter(Number.isFinite);
      const avgSavings = (recentSavings.reduce((acc, v) => acc + v, 0) / recentSavings.length) / 100;

      if (avgCdiDaily > 0 && avgCdiDaily < 2) {
        marketRates.cdiMonthly = Math.pow(1 + avgCdiDaily / 100, 21) - 1;
      }
      if (latestSelic > 0 && latestSelic < 100) {
        marketRates.selicMonthly = Math.pow(1 + latestSelic / 100, 1 / 12) - 1;
      }
      if (avgSavings > 0 && avgSavings < 0.1) {
        marketRates.savingsMonthly = avgSavings;
      }

      marketRates.isLiveBcb = true;
      if (apiStatus) apiStatus.textContent = "referência Banco Central";
    } catch {
      if (apiStatus) apiStatus.textContent = "dados de referência";
    } finally {
      drawHomeChart();
      updateSimulationUI();
    }
  }

  function initGoogleCharts() {
    if (!$("#homeChart") && !$("#projectionChart")) return;

    if (!window.google?.charts) {
      drawHomeChart();
      updateSimulationUI();
      return;
    }

    google.charts.load("current", { packages: ["corechart"], language: "pt-BR" });
    google.charts.setOnLoadCallback(() => {
      isGoogleChartsReady = true;
      drawHomeChart();
      updateSimulationUI();
    });
  }

  /* ==========================================================================
     10. INICIALIZAÇÃO DA APLICAÇÃO
     ========================================================================== */

  function init() {
    // 1. Renderizações globais (Header, perfil, metas)
    renderHeaderAndProfile();
    renderGoalsList();
    setupProfileAndGoalsEvents();

    // 2. Trilhas e filtros (se estiver em trilhas.html)
    if ($("#pathMap")) {
      renderTrailMap();
      setupPhaseFilters();
    }

    // 3. Aula didática (se estiver em conteudo.html)
    if ($("#aula")) {
      document.body.classList.add("focus-mode");
      renderLessonContent();
      const continueBtn = $("#continueQuiz");
      if (continueBtn) {
        continueBtn.addEventListener("click", () => startQuizSession(selectedModuleIndex));
      }
    }

    // 4. Quiz interativo (se estiver em quiz.html)
    if ($("#quizTitle")) {
      document.body.classList.add("focus-mode");
      const hasRestored = restoreQuizSession();
      if (!hasRestored) {
        // Se abriu quiz direto sem sessão, inicia pelo primeiro módulo não concluído
        const nextIndex = Math.min(state.completed.length, MODULES.length - 1);
        startQuizSession(nextIndex);
      } else {
        renderCurrentQuestion();
      }

      const nextBtn = $("#quizAction");
      if (nextBtn) {
        nextBtn.addEventListener("click", handleNextQuestion);
      }
    }

    // 5. Simulador de investimentos (se estiver em simulador.html)
    const simForm = $("#simulationForm");
    if (simForm) {
      updateSimulationUI();
      simForm.addEventListener("submit", (e) => {
        e.preventDefault();
        updateSimulationUI();
        showToast("Projeção calculada com sucesso!");
      });

      // Recalcula dinamicamente ao digitar
      $$("#simulationForm input").forEach((input) => {
        input.addEventListener("input", updateSimulationUI);
      });
    }

    // 6. Gráficos e API do Banco Central
    initGoogleCharts();
    fetchBcbRates();

    // 7. Eventos de Janela e Redimensionamento
    window.addEventListener("resize", () => {
      drawHomeChart();
      updateSimulationUI();
    });

    window.addEventListener("storage", (event) => {
      if (event.key === STORAGE_KEY) {
        state = loadState();
        renderHeaderAndProfile();
        renderGoalsList();
        renderTrailMap();
      }
    });
  }

  // Executa após o carregamento do DOM
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
