
      (() => {
        "use strict";
        const STORE = "finanedu-progress-v1";
        const modules = [
          {
            id: "m1",
            phase: 1,
            icon: "💡",
            title: "Poupar e investir",
            short: "O que é investir?",
          },
          {
            id: "m2",
            phase: 1,
            icon: "🧾",
            title: "Orçamento pessoal",
            short: "Organize seus gastos",
          },
          {
            id: "m3",
            phase: 2,
            icon: "🏦",
            title: "Reserva de emergência",
            short: "Sua rede de segurança",
          },
          {
            id: "m4",
            phase: 2,
            icon: "📊",
            title: "Opções de investimento",
            short: "Risco e retorno",
          },
          {
            id: "m5",
            phase: 3,
            icon: "🎯",
            title: "Metas financeiras",
            short: "Planeje seus objetivos",
          },
          {
            id: "m6",
            phase: 3,
            icon: "🌳",
            title: "Diversificação",
            short: "Monte uma estratégia",
          },
        ];
        const quizBank = {
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
              tip: "Um orçamento mostra para onde o dinheiro vai e ajuda a fazer escolhas.",
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
              tip: "Pequenos gastos recorrentes também podem pesar no fim do mês.",
            },
            {
              q: "Quando registrar um gasto?",
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
              tip: "O orçamento é pessoal: ele precisa refletir sua realidade e prioridades.",
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
              tip: "A reserva oferece segurança em situações inesperadas.",
            },
            {
              q: "Uma reserva de emergência deve priorizar:",
              options: [
                "Liquidez e segurança",
                "Promessas de retorno alto",
                "Dinheiro inacessível",
                "Apenas ações voláteis",
              ],
              correct: 0,
              tip: "Em uma emergência, o acesso rápido ao dinheiro é essencial.",
            },
            {
              q: "Qual situação combina com a reserva?",
              options: [
                "Um conserto urgente",
                "Uma viagem desejada",
                "Uma compra por moda",
                "Um presente planejado",
              ],
              correct: 0,
              tip: "Reservas existem para acontecimentos inesperados e necessários.",
            },
            {
              q: "Como construir uma reserva?",
              options: [
                "Com aportes possíveis e frequentes",
                "Esperando sobrar muito",
                "Usando crédito caro",
                "Aplicando todo o salário de uma vez",
              ],
              correct: 0,
              tip: "Constância torna o objetivo sustentável.",
            },
          ],
          m4: [
            {
              q: "O que costuma aumentar junto com a chance de retorno?",
              options: ["O risco", "A garantia", "A liquidez sempre", "A previsibilidade"],
              correct: 0,
              tip: "Retorno e risco costumam caminhar juntos; avalie os dois.",
            },
            {
              q: "Renda fixa significa:",
              options: [
                "Ter regras de rendimento definidas",
                "Nunca ter qualquer variação",
                "Não poder resgatar",
                "Ser igual à poupança",
              ],
              correct: 0,
              tip: "As regras são conhecidas, embora preço e resgate possam variar conforme o produto.",
            },
            {
              q: "Qual pergunta ajuda a escolher um investimento?",
              options: [
                "Quando vou precisar desse dinheiro?",
                "Qual tem o nome mais curto?",
                "Qual foi indicado sem explicação?",
                "Qual parece mais difícil?",
              ],
              correct: 0,
              tip: "Prazo, objetivo e risco orientam uma escolha consciente.",
            },
            {
              q: "Diversificar é:",
              options: [
                "Não concentrar tudo em uma opção",
                "Aplicar sempre no mesmo ativo",
                "Ignorar riscos",
                "Trocar de investimento todo dia",
              ],
              correct: 0,
              tip: "Distribuir reduz a dependência de um único tipo de investimento.",
            },
          ],
          m5: [
            {
              q: "Uma meta financeira clara inclui:",
              options: [
                "Valor, prazo e motivo",
                "Somente desejo",
                "A opinião de outras pessoas",
                "Um investimento aleatório",
              ],
              correct: 0,
              tip: "Quanto mais concreta a meta, mais fácil montar o caminho.",
            },
            {
              q: "Por que separar metas por prazo?",
              options: [
                "Porque cada prazo pede uma estratégia diferente",
                "Porque todas rendem igual",
                "Para nunca investir",
                "Para escolher apenas um produto",
              ],
              correct: 0,
              tip: "Objetivos próximos e distantes podem exigir níveis diferentes de liquidez e risco.",
            },
            {
              q: "O que ajuda a manter uma meta viva?",
              options: [
                "Revisar o avanço regularmente",
                "Esquecer depois de criar",
                "Mudar de objetivo diariamente",
                "Evitar registrar aportes",
              ],
              correct: 0,
              tip: "Acompanhar o progresso permite ajustes sem perder o foco.",
            },
            {
              q: "Um aporte automático pode ajudar porque:",
              options: [
                "Transforma a constância em hábito",
                "Garante lucro alto",
                "Elimina todo risco",
                "Substitui planejamento",
              ],
              correct: 0,
              tip: "Automatizar um valor possível reduz a dependência de decisões repetidas.",
            },
          ],
          m6: [
            {
              q: "Qual é a ideia de uma carteira diversificada?",
              options: [
                "Combinar ativos com funções diferentes",
                "Apostar tudo em uma ação",
                "Evitar qualquer plano",
                "Comprar apenas o que está na moda",
              ],
              correct: 0,
              tip: "Ativos diferentes podem reagir de modos diferentes aos cenários.",
            },
            {
              q: "Quando revisar uma carteira?",
              options: [
                "Quando seus objetivos ou prazos mudarem",
                "A cada boato da internet",
                "Somente quando houver lucro",
                "Nunca",
              ],
              correct: 0,
              tip: "Revisões devem respeitar o plano e mudanças reais na sua vida.",
            },
            {
              q: "A diversificação elimina perdas?",
              options: [
                "Não, mas ajuda a distribuir riscos",
                "Sim, sempre",
                "Apenas para renda fixa",
                "Somente em um mês",
              ],
              correct: 0,
              tip: "Diversificar não é garantia, mas reduz concentração.",
            },
            {
              q: "Uma decisão de longo prazo deve considerar:",
              options: [
                "Objetivos e tolerância a risco",
                "A última manchete",
                "A cor do gráfico",
                "A escolha de um desconhecido",
              ],
              correct: 0,
              tip: "Um plano pessoal é mais sólido do que reações impulsivas.",
            },
          ],
        };
        const base = { name: "", goals: [], completed: [], results: {} };
        const market = {
          cdiMonthly: 0.009,
          selicMonthly: 0.009,
          savingsMonthly: 0.005,
          loaded: false,
        };
        let chartsReady = false;
        let state = loadState();
        let selectedModule = 0;
        let visiblePhase = "all";
        let quiz = null;
        let toastTimer;
        const $ = (q, root = document) => root.querySelector(q);
        const $$ = (q, root = document) => [...root.querySelectorAll(q)];
        const listen = (q, type, handler) => {
          const element = $(q);
          if (element) element.addEventListener(type, handler);
        };
        const QUIZ_SESSION = "finanedu-active-quiz-v1";
        const money = (n) =>
          new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
            Number(n) || 0,
          );
        const pct = () => Math.round((state.completed.length / modules.length) * 100);
        function loadState() {
          try {
            const stored = JSON.parse(localStorage.getItem(STORE) || "{}");
            return {
              ...base,
              ...stored,
              goals: Array.isArray(stored.goals) ? stored.goals : [],
              results: stored.results || {},
            };
          } catch {
            return { ...base, goals: [], results: {} };
          }
        }
        function saveState() {
          localStorage.setItem(STORE, JSON.stringify(state));
        }
        function unlocked(index) {
          return index <= state.completed.length;
        }
        function level() {
          const p = pct();
          return p >= 70 ? "Avançado" : p >= 35 ? "Intermediário" : p > 0 ? "Iniciante" : "Novato";
        }
        function currentIndex() {
          return Math.min(state.completed.length, modules.length - 1);
        }
        function moduleStatus(index) {
          return state.completed.includes(modules[index].id)
            ? "completed"
            : index === currentIndex()
              ? "current"
              : unlocked(index)
                ? "available"
                : "locked";
        }
        function showToast(text) {
          const t = $("#toast");
          if (!t) return;
          t.textContent = text;
          t.classList.add("show");
          clearTimeout(toastTimer);
          toastTimer = setTimeout(() => t.classList.remove("show"), 3300);
        }
        function renderShell() {
          const l = level();
          const trailLevel = $("#trailLevel");
          if (trailLevel) trailLevel.textContent = l;
          const homeTitle = $("#homeTitle");
          if (homeTitle)
            homeTitle.textContent = state.name
              ? `Olá, ${state.name}! Pronto para estudar?`
              : "Aprenda no seu ritmo";
          const profileTitle = $("#profileTitle");
          if (profileTitle)
            profileTitle.textContent = state.name
              ? `${state.name}, sua jornada está em movimento!`
              : "Personalize sua jornada";
          const profileName = $("#profileName");
          if (profileName) profileName.value = state.name;
          const profileCompleted = $("#profileCompleted");
          if (profileCompleted)
            profileCompleted.textContent = state.completed.length
              ? `${state.completed.length} de ${modules.length} aulas concluídas.`
              : "Nenhuma aula concluída ainda.";
          const dateLabel = $("#dateLabel");
          if (dateLabel) dateLabel.textContent = new Intl.DateTimeFormat("pt-BR", {
            weekday: "short",
            day: "numeric",
            month: "short",
          }).format(new Date());
        }
        function renderGoals() {
          const list = $("#goalList"),
            empty = $("#emptyGoals");
          if (!list || !empty) return;
          list.innerHTML = "";
          empty.hidden = state.goals.length > 0;
          state.goals.forEach((goal, index) => {
            const li = document.createElement("li"),
              date = goal.date
                ? new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" }).format(
                    new Date(goal.date + "T12:00:00"),
                  )
                : "Sem data definida";
            li.innerHTML = `<span><strong>${escapeHtml(goal.title)}</strong><p>${escapeHtml(goal.note || "Sem anotação")}</p><time>${date}</time></span><button class="remove-goal" type="button" data-remove-goal="${index}" aria-label="Excluir anotação ${escapeHtml(goal.title)}">×</button>`;
            $("[data-remove-goal]", li).addEventListener("click", () => {
              state.goals.splice(index, 1);
              saveState();
              renderGoals();
            });
            list.append(li);
          });
        }
        function escapeHtml(value) {
          const span = document.createElement("span");
          span.textContent = value;
          return span.innerHTML;
        }
        function renderTrail() {
          const map = $("#pathMap");
          if (!map) return;
          map.innerHTML = "";
          modules
            .filter((m) => visiblePhase === "all" || m.phase === +visiblePhase)
            .forEach((m) => {
              const i = modules.indexOf(m),
                s = moduleStatus(i),
                li = document.createElement("li"),
                b = document.createElement("button");
              b.className = "node " + s;
              b.disabled = s === "locked";
              b.dataset.module = i;
              b.innerHTML = `<span class="node-core">${s === "completed" ? "✓" : s === "locked" ? "🔒" : m.icon}</span><small>${m.title}</small>`;
              b.addEventListener("click", () => openModule(i));
              li.append(b);
              map.append(li);
            });
        }
        function openModule(index) {
          if (!unlocked(index)) {
            showToast("Conclua a etapa anterior para desbloquear este módulo.");
            return;
          }
          selectedModule = index;
          startQuiz();
        }
        function go(id) {
          $$(".page").forEach((x) => x.classList.toggle("active", x.id === id));
          document.body.classList.toggle("focus-mode", ["aula", "quiz", "recompensa"].includes(id));
          $$("[data-go]").forEach((x) => x.classList.toggle("active", x.dataset.go === id));
          if (id === "inicio") {
            drawHomeChart();
          }
          if (id === "simulador") {
            simulateProjection();
          }
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        function startLesson() {
          const m = modules[selectedModule];
          $("#lessonPhase").textContent =
            `Fase ${m.phase} · ${m.phase === 1 ? "Fundamentos" : m.phase === 2 ? "Planejamento" : "Estratégia"}`;
          $("#lessonTitle").textContent = selectedModule === 0 ? "O que é investir?" : m.short;
          window.location.href = "conteudo.html";
        }
        function shuffleArray(array) {
          const result = [...array];
          for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
          }
          return result;
        }
        function shuffleOptions(question) {
          const order = shuffleArray(question.options.map((_, i) => i));
          return {
            ...question,
            options: order.map((i) => question.options[i]),
            correct: order.indexOf(question.correct),
          };
        }
        function startQuiz() {
          const pool = quizBank[modules[selectedModule].id] || quizBank.m1;
          const chosen = shuffleArray(pool).slice(0, 3).map(shuffleOptions);
          quiz = { items: chosen, index: 0, selected: null, checked: false, correct: 0 };
          saveQuizSession();
          if (!$("#quizTitle")) {
            const session = encodeURIComponent(JSON.stringify({ selectedModule, quiz }));
            window.location.href = `quiz.html?session=${session}`;
            return;
          }
          renderQuestion();
          go("quiz");
        }
        function renderQuestion() {
          if (!quiz || !$("#quizTitle")) return;
          const q = quiz.items[quiz.index],
            answers = $("#answers"),
            module = modules[selectedModule],
            phaseName =
              module.phase === 1
                ? "Fundamentos"
                : module.phase === 2
                  ? "Planejamento"
                  : "Estratégia";
          $("#quizTitle").textContent = q.q;
          $("#quizModule").textContent = module.title;
          $("#quizPhase").textContent = `Fase ${module.phase} · ${phaseName}`;
          $("#quizPosition").textContent = `${quiz.index + 1}/3`;
          $("#quizMeter").style.setProperty("--value", (quiz.index / 3) * 100 + "%");
          $("#quizStepper").innerHTML = [0, 1, 2]
            .map(
              (i) =>
                `<li class="${i < quiz.index ? "done" : i === quiz.index ? "current" : ""}"></li>`,
            )
            .join("");
          answers.innerHTML = "";
          $("#feedback").className = "feedback";
          $("#feedback").textContent = "";
          const action = $("#quizAction");
          action.hidden = true;
          action.disabled = true;
          action.textContent = "Próxima";
          quiz.selected = null;
          quiz.checked = false;
          q.options.forEach((o, i) => {
            const b = document.createElement("button");
            b.type = "button";
            b.innerHTML = `<b>${String.fromCharCode(65 + i)}.</b> ${o}`;
            b.addEventListener("click", () => selectAnswer(i));
            answers.append(b);
          });
        }
        function selectAnswer(i) {
          if (quiz.checked) return;
          quiz.selected = i;
          verifyAnswer();
        }
        function verifyAnswer() {
          const q = quiz.items[quiz.index],
            hit = quiz.selected === q.correct,
            feedback = $("#feedback");
          quiz.checked = true;
          $$("#answers button").forEach((b, i) => {
            b.disabled = true;
            if (i === q.correct) b.classList.add("correct");
            else if (i === quiz.selected) b.classList.add("wrong");
          });
          if (hit) quiz.correct++;
          feedback.textContent = hit ? "Correto. " + q.tip : "Não é essa. " + q.tip;
          feedback.className = "feedback show " + (hit ? "correct" : "wrong");
          const a = $("#quizAction");
          a.hidden = false;
          a.disabled = false;
          a.textContent = quiz.index === 2 ? "Ver resultado" : "Próxima";
        }
        function nextQuestion() {
          if (quiz.index < 2) {
            quiz.index++;
            renderQuestion();
          } else {
            finishQuiz();
          }
        }
        function finishQuiz() {
          const m = modules[selectedModule],
            score = quiz.correct,
            passed = score >= 2,
            wasDone = state.completed.includes(m.id);
          state.results[m.id] = { score, total: 3, passed, updatedAt: new Date().toISOString() };
          if (passed && !wasDone) {
            state.completed.push(m.id);
            state.completed.sort(
              (a, b) => modules.findIndex((m) => m.id === a) - modules.findIndex((m) => m.id === b),
            );
          }
          saveState();
          clearQuizSession();
          renderAll();
          $("#scoreRate").textContent = `${score} de 3`;
          $("#rewardLabel").textContent = passed ? "Resultado salvo" : "Resultado salvo";
          $("#rewardTitle").textContent = passed ? "Aula concluída" : "Revise e tente novamente";
          $("#rewardCopy").textContent = passed
            ? "Você acertou pelo menos duas partes. A próxima aula está liberada."
            : "Você precisa de dois acertos para liberar a próxima aula.";
          const action = $("#rewardAction");
          action.textContent = passed ? "Voltar à trilha" : "Tentar novamente";
          action.onclick = () => (passed ? window.location.href = "trilhas.html" : startQuiz());
          go("recompensa");
        }
        function numericInput(id) {
          const value = Number($(id).value);
          return Number.isFinite(value) ? value : 0;
        }
        function futureValue(initial, monthly, rate, months) {
          const factor = Math.pow(Math.max(0, 1 + rate), months);
          if (Math.abs(rate) < 1e-10) return initial + monthly * months;
          return initial * factor + monthly * ((factor - 1) / rate);
        }
        function projectionData() {
          const initial = numericInput("#initialValue"),
            monthly = numericInput("#monthlyValue"),
            annual = numericInput("#annualRate"),
            years = numericInput("#yearsValue"),
            r = 1 + annual / 100 > 0 ? Math.pow(1 + annual / 100, 1 / 12) - 1 : -1,
            n = Math.max(0, years * 12),
            points = Math.max(2, Math.min(121, Math.ceil(n) + 1)),
            values = [];
          for (let i = 0; i < points; i++) {
            const m = (n * i) / (points - 1);
            values.push({
              m,
              user: futureValue(initial, monthly, r, m),
              cdi: futureValue(initial, monthly, market.cdiMonthly, m),
              savings: futureValue(initial, monthly, market.savingsMonthly, m),
            });
          }
          return { initial, monthly, annual, years, r, n, values };
        }
        function simulateProjection() {
          if (!$("#simulationForm")) return;
          const d = projectionData(),
            final = d.values.at(-1).user,
            invested = d.initial + d.monthly * d.n,
            profit = final - invested;
          $("#totalResult").textContent = money(final);
          $("#profitResult").textContent = "Rendimento de " + money(profit);
          $("#investedResult").textContent = money(invested);
          $("#yieldResult").textContent = money(profit);
          $("#monthlyRateResult").textContent = (d.r * 100).toFixed(2).replace(".", ",") + "%";
          drawProjectionChart(d);
        }
        function chartOptions(element, colors, compact = false) {
          return {
            backgroundColor: "transparent",
            colors,
            legend: "none",
            lineWidth: 3,
            pointSize: 0,
            chartArea: {
              left: compact ? 22 : 48,
              right: 14,
              top: 16,
              bottom: compact ? 36 : 32,
              width: "86%",
              height: "78%",
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
            height: element.clientHeight || 230,
            enableInteractivity: true,
            animation: { startup: true, duration: 500, easing: "out" },
          };
        }
        function drawFallbackLine(element, columns, rows, colors) {
          const series = columns.slice(1).map((_, index) =>
            rows.map((row) => Number(row[index + 1])),
          );
          const values = series.flat().filter(Number.isFinite);
          if (!values.length) {
            element.innerHTML = '<p class="empty-state">Não foi possível montar o gráfico.</p>';
            return;
          }
          const min = Math.min(0, ...values),
            max = Math.max(...values),
            range = Math.max(max - min, 1),
            width = 600,
            height = 230,
            left = 36,
            right = 16,
            top = 16,
            bottom = 20,
            plotWidth = width - left - right,
            plotHeight = height - top - bottom;
          const grid = [0.25, 0.5, 0.75]
            .map((ratio) => {
              const y = top + plotHeight * ratio;
              return `<line x1="${left}" y1="${y}" x2="${width - right}" y2="${y}" stroke="#ececf3" />`;
            })
            .join("");
          const lines = series
            .map((line, lineIndex) => {
              const points = line
                .map((value, index) => {
                  const x = left + (index / Math.max(line.length - 1, 1)) * plotWidth,
                    y = top + ((max - value) / range) * plotHeight;
                  return `${x},${y}`;
                })
                .join(" ");
              return `<polyline fill="none" stroke="${colors[lineIndex] || "#6654e8"}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" points="${points}" />`;
            })
            .join("");
          element.innerHTML = `<svg width="100%" height="100%" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" aria-hidden="true">${grid}${lines}</svg>`;
        }
        function drawGoogleLine(
          element,
          columns,
          rows,
          colors,
          compact = false,
          firstType = "number",
        ) {
          if (!element) return;
          if (!chartsReady || !window.google?.visualization) {
            drawFallbackLine(element, columns, rows, colors);
            return;
          }
          const data = new google.visualization.DataTable();
          columns.forEach((column, index) =>
            data.addColumn(index === 0 ? firstType : "number", column),
          );
          data.addRows(rows);
          for (let i = 1; i < columns.length; i++)
            new google.visualization.NumberFormat({ prefix: "R$ ", fractionDigits: 0 }).format(
              data,
              i,
            );
          new google.visualization.LineChart(element).draw(
            data,
            chartOptions(element, colors, compact),
          );
        }
        function drawProjectionChart(d) {
          const rows = d.values.map((x) => [x.m, x.user, x.cdi, x.savings]);
          drawGoogleLine(
            $("#projectionChart"),
            ["Meses", "Sua projeção", "CDI", "Poupança"],
            rows,
            ["#6654e8", "#25ae72", "#9da3b5"],
            true,
          );
        }
        function drawHomeChart() {
          const rows = [],
            labels = [];
          let cdb = 1000,
            cdi = 1000,
            selic = 1000,
            savings = 1000,
            fiis = 1000;
          for (let i = 0; i < 12; i++) {
            const date = new Date();
            date.setMonth(date.getMonth() - 11 + i);
            labels.push(
              new Intl.DateTimeFormat("pt-BR", { month: "short" }).format(date).replace(".", ""),
            );
            cdb *= 1 + market.cdiMonthly + 0.0015 + (i % 3) * 0.0004;
            cdi *= 1 + market.cdiMonthly;
            selic *= 1 + market.selicMonthly;
            savings *= 1 + market.savingsMonthly;
            fiis *=
              1 +
              [
                0.018, -0.006, 0.024, 0.004, 0.015, -0.011, 0.02, 0.006, 0.017, -0.004, 0.015,
                0.008,
              ][i];
            rows.push([labels[i], cdb, cdi, selic, savings, fiis]);
          }
          drawGoogleLine(
            $("#homeChart"),
            ["Mês", "CDB", "CDI", "Meta Selic", "Poupança", "FIIs"],
            rows,
            ["#6654e8", "#25ae72", "#4f9ddd", "#9da3b5", "#ffad42"],
            false,
            "string",
          );
        }
        function renderAll() {
          renderShell();
          renderGoals();
          renderTrail();
        }
        function bcbNumber(item) {
          return Number(
            String(item?.valor ?? item)
              .replace(".", "")
              .replace(",", "."),
          );
        }
        function average(values) {
          return values.length
            ? values.reduce((sum, value) => sum + value, 0) / values.length
            : NaN;
        }
        async function tryBcb() {
          if (!$("#apiStatus") && !$("#projectionChart")) return;
          const series = (code) =>
            fetch(
              `https://api.bcb.gov.br/dados/serie/bcdata.sgs.${code}/dados/ultimos/260?formato=json`,
            ).then((r) => (r.ok ? r.json() : Promise.reject()));
          try {
            const [cdi, selic, poupanca] = await Promise.all([
              series(12),
              series(432),
              series(195),
            ]);
            const cdiDaily = average(cdi.slice(-21).map(bcbNumber).filter(Number.isFinite));
            const selicAnnual = bcbNumber(selic.at(-1));
            const savingsMonthly =
              average(poupanca.slice(-12).map(bcbNumber).filter(Number.isFinite)) / 100;
            if (cdiDaily > 0 && cdiDaily < 2)
              market.cdiMonthly = Math.pow(1 + cdiDaily / 100, 21) - 1;
            if (selicAnnual > 0 && selicAnnual < 100)
              market.selicMonthly = Math.pow(1 + selicAnnual / 100, 1 / 12) - 1;
            if (savingsMonthly > 0 && savingsMonthly < 0.1) market.savingsMonthly = savingsMonthly;
            market.loaded = true;
            const apiStatus = $("#apiStatus");
            if (apiStatus) apiStatus.textContent = "referência Banco Central";
            drawHomeChart();
            if ($("#simulationForm")) simulateProjection();
          } catch {
            const apiStatus = $("#apiStatus");
            if (apiStatus) apiStatus.textContent = "dados de referência";
            drawHomeChart();
          }
        }
        function initializeCharts() {
          if (!$("#homeChart") && !$("#projectionChart")) return;
          if (!window.google?.charts) {
            const apiStatus = $("#apiStatus");
            if (apiStatus) apiStatus.textContent = "dados de contingência";
            drawHomeChart();
            simulateProjection();
            return;
          }
          google.charts.load("current", { packages: ["corechart"], language: "pt-BR" });
          google.charts.setOnLoadCallback(() => {
            chartsReady = true;
            drawHomeChart();
            simulateProjection();
          });
        }
        $$("[data-phase]").forEach((b) =>
          b.addEventListener("click", () => {
            visiblePhase = b.dataset.phase;
            $$("[data-phase]").forEach((x) => x.classList.toggle("active", x === b));
            renderTrail();
          }),
        );
        listen("#continueQuiz", "click", startQuiz);
        listen("#quizAction", "click", nextQuestion);
        listen("#simulationForm", "submit", (e) => {
          e.preventDefault();
          simulateProjection();
          showToast("Projeção atualizada com seus números.");
        });
        listen("#profileOpen", "click", () => $("#profileDialog").showModal());
        listen("#profileClose", "click", () => $("#profileDialog").close());
        listen("#profileForm", "submit", (e) => {
          e.preventDefault();
          state.name = $("#profileName").value.trim();
          saveState();
          renderShell();
          $("#profileDialog").close();
          showToast(state.name ? "Perfil atualizado. Vamos nessa!" : "Perfil atualizado.");
        });
        listen("#goalOpen", "click", () => $("#goalDialog").showModal());
        listen("#goalClose", "click", () => $("#goalDialog").close());
        listen("#goalForm", "submit", (e) => {
          e.preventDefault();
          const title = $("#goalTitle").value.trim(),
            note = $("#goalNote").value.trim(),
            date = $("#goalDate").value;
          if (!title) return;
          state.goals.push({ title, note, date });
          saveState();
          renderGoals();
          e.currentTarget.reset();
          $("#goalDialog").close();
          showToast("Anotação adicionada.");
        });
        window.addEventListener("resize", () => {
          drawHomeChart();
          if ($("#simulationForm")) simulateProjection();
        });
        window.addEventListener("storage", (e) => {
          if (e.key === STORE) {
            state = loadState();
            renderAll();
          }
        });
        function saveQuizSession() {
          try {
            sessionStorage.setItem(QUIZ_SESSION, JSON.stringify({ selectedModule, quiz }));
          } catch {}
        }
        function restoreQuizSession() {
          try {
            const querySession = new URLSearchParams(window.location.search).get("session"),
              saved = JSON.parse(
                querySession || sessionStorage.getItem(QUIZ_SESSION) || "null",
              );
            if (
              !saved ||
              !Number.isInteger(saved.selectedModule) ||
              saved.selectedModule < 0 ||
              saved.selectedModule >= modules.length ||
              !Array.isArray(saved.quiz?.items) ||
              !saved.quiz.items.length
            )
              return false;
            selectedModule = saved.selectedModule;
            quiz = saved.quiz;
            if (querySession) {
              try {
                window.history.replaceState(null, "", window.location.pathname);
              } catch {}
            }
            return true;
          } catch {
            return false;
          }
        }
        function clearQuizSession() {
          try {
            sessionStorage.removeItem(QUIZ_SESSION);
          } catch {}
        }
        renderAll();
        initializeCharts();
        drawHomeChart();
        simulateProjection();
        tryBcb();
        if ($("#aula") || $("#quiz")) document.body.classList.add("focus-mode");
        if ($("#quizTitle")) {
          if (restoreQuizSession()) {
            renderQuestion();
            go("quiz");
          } else {
            selectedModule = currentIndex();
            startQuiz();
          }
        }
      })();
    
