const CHAVE_PROGRESSO = 'finanEduProgresso';

const QUESTIONARIOS = [
    {
        pergunta: 'O que é uma receita?',
        alternativas: [
            {
                texto: 'Dinheiro que sai do seu bolso para pagar contas.',
                correta: false
            },
            {
                texto: 'Dinheiro que você recebe com trabalho, vendas ou investimentos.',
                correta: true
            },
            {
                texto: 'Dinheiro guardado para emergências.',
                correta: false
            },
            {
                texto: 'Dinheiro usado para investir na bolsa de valores.',
                correta: false
            }
        ],
        dica: 'Receita é o dinheiro que você recebe. Pode vir do seu salário, de uma venda ou de rendimentos de investimentos.'
    },
    {
        pergunta: 'O que é uma despesa?',
        alternativas: [
            {
                texto: 'Dinheiro que sai do seu bolso para pagar contas ou compras.',
                correta: true
            },
            {
                texto: 'Dinheiro guardado no banco para o futuro.',
                correta: false
            },
            {
                texto: 'O lucro obtido em um investimento.',
                correta: false
            },
            {
                texto: 'O total de dinheiro que você ganha por mês.',
                correta: false
            }
        ],
        dica: 'Despesa é todo o dinheiro que sai do seu bolso, seja para pagar contas, fazer compras ou qualquer outro gasto.'
    },
    {
        pergunta: 'Para que serve um orçamento pessoal?',
        alternativas: [
            {
                texto: 'Para aumentar automaticamente o seu salário.',
                correta: false
            },
            {
                texto: 'Para organizar receitas e despesas e planejar melhor o dinheiro.',
                correta: true
            },
            {
                texto: 'Para pagar impostos com desconto.',
                correta: false
            },
            {
                texto: 'Para garantir lucro em qualquer investimento.',
                correta: false
            }
        ],
        dica: 'O orçamento pessoal ajuda a comparar quanto você ganha e quanto gasta, permitindo planejar o uso do seu dinheiro.'
    }
];

const NOMES_FASES = [
    'Fase 1 - Fundamentos',
    'Fase 2 - Planejamento',
    'Fase 3 - Estratégia Avançada'
];

function obterEstrutura() {
    const fases = Array.from(
        document.querySelectorAll(
            'body > main > section[id^="fase"]'
        )
    );

    if (fases.length) {
        return fases.map(fase =>
            Array.from(
                fase.querySelectorAll(
                    ':scope > ol > li'
                )
            ).map(modulo => ({
                nome:
                    modulo.querySelector('h3')
                        ?.textContent
                        .trim() || 'Módulo',

                aulas:
                    Number(
                        modulo.querySelector(
                            'progress'
                        )?.max
                    ) || 1
            }))
        );
    }

    return [
        [
            {
                nome: 'Introdução às Finanças',
                aulas: 5
            },
            {
                nome: 'Orçamento Pessoal',
                aulas: 6
            },
            {
                nome: 'Investimentos Básicos',
                aulas: 6
            }
        ],
        [
            {
                nome: 'Gestão de Risco',
                aulas: 5
            },
            {
                nome: 'Renda Fixa vs Variável',
                aulas: 6
            },
            {
                nome: 'Reserva de Emergência',
                aulas: 5
            }
        ],
        [
            {
                nome: 'Diversificação',
                aulas: 6
            },
            {
                nome: 'Ações & Funds',
                aulas: 8
            },
            {
                nome: 'Independência Financeira',
                aulas: 10
            }
        ]
    ];
}

function criarProgresso(estrutura) {
    return estrutura.map(
        fase => fase.map(() => 0)
    );
}

function progressoValido(
    progresso,
    estrutura
) {
    if (
        !Array.isArray(progresso) ||
        progresso.length !== estrutura.length
    ) {
        return false;
    }

    return progresso.every(
        (fase, faseIndex) => {
            if (
                !Array.isArray(fase) ||
                fase.length !==
                    estrutura[faseIndex].length
            ) {
                return false;
            }

            return fase.every(
                (valor, moduloIndex) =>
                    Number.isInteger(valor) &&
                    valor >= 0 &&
                    valor <=
                        estrutura[
                            faseIndex
                        ][moduloIndex].aulas
            );
        }
    );
}

function carregarProgresso(
    estrutura
) {
    try {
        const salvo =
            JSON.parse(
                localStorage.getItem(
                    CHAVE_PROGRESSO
                )
            );

        if (
            progressoValido(
                salvo,
                estrutura
            )
        ) {
            return salvo;
        }
    } catch (erro) {
    }

    const inicial =
        criarProgresso(
            estrutura
        );

    if (
        estrutura.length === 3 &&
        estrutura[0].length === 3
    ) {
        inicial[0][0] =
            Math.min(
                5,
                estrutura[0][0].aulas
            );

        inicial[0][1] =
            Math.min(
                3,
                estrutura[0][1].aulas
            );
    }

    localStorage.setItem(
        CHAVE_PROGRESSO,
        JSON.stringify(inicial)
    );

    return inicial;
}

function salvarProgresso(
    progresso
) {
    localStorage.setItem(
        CHAVE_PROGRESSO,
        JSON.stringify(progresso)
    );
}

function moduloConcluido(
    progresso,
    estrutura,
    fase,
    modulo
) {
    return (
        progresso[fase][modulo] >=
        estrutura[fase][modulo].aulas
    );
}

function faseConcluida(
    progresso,
    estrutura,
    fase
) {
    return estrutura[fase]?.every(
        (_, modulo) =>
            moduloConcluido(
                progresso,
                estrutura,
                fase,
                modulo
            )
    ) || false;
}

function moduloLiberado(
    progresso,
    estrutura,
    fase,
    modulo
) {
    if (
        fase === 0 &&
        modulo === 0
    ) {
        return true;
    }

    if (modulo > 0) {
        return moduloConcluido(
            progresso,
            estrutura,
            fase,
            modulo - 1
        );
    }

    return faseConcluida(
        progresso,
        estrutura,
        fase - 1
    );
}

function proximoDestino(
    progresso,
    estrutura,
    fase,
    modulo,
    aula
) {
    const total =
        estrutura[fase][modulo].aulas;

    if (aula < total) {
        return {
            fase,
            modulo,
            aula: aula + 1,
            texto: 'Próxima aula'
        };
    }

    if (
        modulo + 1 <
        estrutura[fase].length
    ) {
        return {
            fase,
            modulo: modulo + 1,
            aula: 1,
            texto: 'Próximo módulo'
        };
    }

    if (
        fase + 1 <
        estrutura.length
    ) {
        return {
            fase: fase + 1,
            modulo: 0,
            aula: 1,
            texto: 'Próxima fase'
        };
    }

    return {
        fase: null,
        modulo: null,
        aula: null,
        texto: 'Concluir trilha'
    };
}

function criarUrl(destino) {
    if (destino.fase === null) {
        return 'trilhas.html#fase3';
    }

    return (
        `quiz.html?fase=${destino.fase + 1}` +
        `&modulo=${destino.modulo + 1}` +
        `&aula=${destino.aula}`
    );
}

function resolverAula(
    progresso,
    estrutura,
    parametros
) {
    const fase =
        Number(
            parametros.get('fase')
        ) - 1;

    const modulo =
        Number(
            parametros.get('modulo')
        ) - 1;

    const aula =
        Number(
            parametros.get('aula')
        );

    const parametrosValidos =
        Number.isInteger(fase) &&
        Number.isInteger(modulo) &&
        Number.isInteger(aula) &&
        estrutura[fase]?.[modulo] &&
        aula >= 1 &&
        aula <=
            estrutura[fase][modulo].aulas;

    if (
        parametrosValidos &&
        moduloLiberado(
            progresso,
            estrutura,
            fase,
            modulo
        )
    ) {
        return {
            faseAtual: fase,
            moduloAtual: modulo,
            aulaAtual: aula
        };
    }

    for (
        let f = 0;
        f < estrutura.length;
        f++
    ) {
        for (
            let m = 0;
            m < estrutura[f].length;
            m++
        ) {
            if (
                moduloLiberado(
                    progresso,
                    estrutura,
                    f,
                    m
                ) &&
                progresso[f][m] <
                    estrutura[f][m].aulas
            ) {
                return {
                    faseAtual: f,
                    moduloAtual: m,
                    aulaAtual:
                        progresso[f][m] + 1
                };
            }
        }
    }

    return null;
}

function atualizarStatus(
    progresso,
    estrutura
) {
    let total = 0;
    let concluido = 0;

    estrutura.forEach(
        (fase, faseIndex) => {
            fase.forEach(
                (modulo, moduloIndex) => {
                    total += modulo.aulas;

                    concluido += Math.min(
                        progresso[
                            faseIndex
                        ][moduloIndex],
                        modulo.aulas
                    );
                }
            );
        }
    );

    const percentual =
        total
            ? Math.round(
                (concluido / total) * 100
            )
            : 0;

    let faseAtual =
        estrutura.findIndex(
            (_, index) =>
                !faseConcluida(
                    progresso,
                    estrutura,
                    index
                )
        );

    if (faseAtual === -1) {
        faseAtual =
            estrutura.length - 1;
    }

    const niveis = [
        'INICIANTE',
        'INTERMEDIÁRIO',
        'AVANÇADO'
    ];

    const status =
        document.querySelector(
            'section[aria-labelledby="titulo-status-nivel"]'
        );

    if (status) {
        const texto =
            status.querySelector(
                'p:first-of-type'
            );

        const barra =
            status.querySelector(
                'progress'
            );

        if (texto) {
            texto.textContent =
                `${niveis[faseAtual] || 'AVANÇADO'} ${percentual}%`;
        }

        if (barra) {
            barra.value =
                percentual;

            barra.textContent =
                `${percentual}%`;
        }
    }
}

document.addEventListener(
    'DOMContentLoaded',
    () => {
        const form =
            document.querySelector(
                'form[aria-label="Alternativas da pergunta"]'
            );

        if (!form) {
            return;
        }

        const botaoVerificar =
            form.querySelector(
                'button[type="submit"]'
            );

        const botaoContinuar =
            document.querySelector(
                'main > article > footer button'
            );

        const tituloPergunta =
            document.getElementById(
                'pergunta-titulo'
            );

        const dicaTexto =
            document.getElementById(
                'dica-texto'
            );

        const breadcrumb =
            document.querySelector(
                'main > nav[aria-label="Trilha de navegação"]'
            );

        const progressoAtividade =
            document.querySelector(
                'section[aria-label="Progresso da atividade"]'
            );

        const contadorAtividade =
            progressoAtividade
                ?.parentElement
                .querySelector(
                    'span:last-child'
                );

        const navAulas =
            document.querySelector(
                'main > nav[aria-label="Navegação entre aulas"]'
            );

        const botaoAnterior =
            navAulas?.querySelector(
                'button:first-of-type'
            );

        const botaoProximaAula =
            navAulas?.querySelector(
                'button:last-of-type'
            );

        const navTitulo =
            navAulas?.querySelector(
                'hgroup p:first-child'
            );

        const navContador =
            navAulas?.querySelector(
                'hgroup p:last-child'
            );

        const estrutura =
            obterEstrutura();

        let progresso =
            carregarProgresso(
                estrutura
            );

        const parametros =
            new URLSearchParams(
                window.location.search
            );

        const acesso =
            resolverAula(
                progresso,
                estrutura,
                parametros
            );

        if (!acesso) {
            window.location.href =
                'trilhas.html';

            return;
        }

        const {
            faseAtual,
            moduloAtual,
            aulaAtual
        } = acesso;

        const modulo =
            estrutura[
                faseAtual
            ][
                moduloAtual
            ];

        const totalAulas =
            modulo.aulas;

        let respondido = false;

        function renderizarProgresso() {
            if (
                !progressoAtividade
            ) {
                return;
            }

            progressoAtividade.innerHTML =
                '';

            const concluido =
                progresso[
                    faseAtual
                ][
                    moduloAtual
                ];

            for (
                let i = 1;
                i <= totalAulas;
                i++
            ) {
                const span =
                    document.createElement(
                        'span'
                    );

                span.setAttribute(
                    'aria-hidden',
                    'true'
                );

                span.dataset.aula =
                    String(i);

                if (i <= concluido) {
                    span.textContent =
                        '●';

                    span.style.backgroundColor =
                        'var(--cor-destaque)';
                } else {
                    span.textContent =
                        '○';
                }

                progressoAtividade.appendChild(
                    span
                );
            }

            if (
                contadorAtividade
            ) {
                contadorAtividade.textContent =
                    `${aulaAtual} / ${totalAulas}`;
            }
        }

        function atualizarCabecalho() {
            const spans =
                breadcrumb?.querySelectorAll(
                    'span'
                );

            if (
                spans?.length >= 5
            ) {
                spans[0].textContent =
                    NOMES_FASES[
                        faseAtual
                    ];

                spans[2].textContent =
                    modulo.nome;

                spans[4].textContent =
                    `Aula ${aulaAtual} de ${totalAulas}`;
            }

            if (navTitulo) {
                navTitulo.textContent =
                    modulo.nome;
            }

            if (navContador) {
                navContador.textContent =
                    `${aulaAtual} de ${totalAulas}`;
            }

            if (botaoAnterior) {
                botaoAnterior.disabled =
                    faseAtual === 0 &&
                    moduloAtual === 0 &&
                    aulaAtual === 1;
            }

            if (
                botaoProximaAula
            ) {
                const texto =
                    aulaAtual <
                    totalAulas
                        ? 'Próxima aula'
                        : 'Próximo';

                botaoProximaAula.innerHTML =
                    `<span>${texto}</span>`;
            }
        }

        function aplicarPergunta() {
            const questionario =
                QUESTIONARIOS[
                    (aulaAtual - 1) %
                        QUESTIONARIOS.length
                ];

            tituloPergunta.textContent =
                questionario.pergunta;

            dicaTexto.textContent =
                questionario.dica;

            const alternativas =
                [...questionario.alternativas]
                    .sort(
                        () =>
                            Math.random() -
                            0.5
                    );

            form.querySelectorAll(
                'label'
            ).forEach(
                label =>
                    label.remove()
            );

            alternativas.forEach(
                (alt, indice) => {
                    const letra =
                        [
                            'A',
                            'B',
                            'C',
                            'D',
                            'E',
                            'F'
                        ][indice];

                    const id =
                        `opcao-${letra.toLowerCase()}`;

                    const label =
                        document.createElement(
                            'label'
                        );

                    label.setAttribute(
                        'for',
                        id
                    );

                    if (alt.correta) {
                        label.setAttribute(
                            'data-correta',
                            'true'
                        );
                    }

                    label.innerHTML = `
                        <input type="radio" name="resposta" id="${id}" value="${letra.toLowerCase()}">
                        <span>${letra}</span>
                        <span>${alt.texto}</span>
                    `;

                    form.insertBefore(
                        label,
                        botaoVerificar
                    );
                }
            );
        }

        function desabilitar(
            botao,
            estado
        ) {
            if (!botao) {
                return;
            }

            botao.disabled =
                estado;

            botao.style.opacity =
                estado
                    ? '0.5'
                    : '';

            botao.style.cursor =
                estado
                    ? 'not-allowed'
                    : 'pointer';
        }

        function urlAulaAnterior() {
            if (
                aulaAtual > 1
            ) {
                return (
                    `quiz.html?fase=${faseAtual + 1}` +
                    `&modulo=${moduloAtual + 1}` +
                    `&aula=${aulaAtual - 1}`
                );
            }

            if (
                moduloAtual > 0
            ) {
                const anterior =
                    estrutura[
                        faseAtual
                    ][
                        moduloAtual - 1
                    ];

                return (
                    `quiz.html?fase=${faseAtual + 1}` +
                    `&modulo=${moduloAtual}` +
                    `&aula=${anterior.aulas}`
                );
            }

            if (
                faseAtual > 0
            ) {
                const faseAnterior =
                    estrutura[
                        faseAtual - 1
                    ];

                const moduloAnterior =
                    faseAnterior.length - 1;

                return (
                    `quiz.html?fase=${faseAtual}` +
                    `&modulo=${moduloAnterior + 1}` +
                    `&aula=${faseAnterior[moduloAnterior].aulas}`
                );
            }

            return null;
        }

        renderizarProgresso();
        atualizarCabecalho();
        aplicarPergunta();

        desabilitar(
            botaoContinuar,
            true
        );

        form.addEventListener(
            'submit',
            evento => {
                evento.preventDefault();

                if (respondido) {
                    return;
                }

                const selecionado =
                    form.querySelector(
                        'input[name="resposta"]:checked'
                    );

                if (!selecionado) {
                    alert(
                        'Escolha uma alternativa antes de verificar.'
                    );

                    return;
                }

                const labelSelecionado =
                    selecionado.closest(
                        'label'
                    );

                const labelCorreto =
                    form.querySelector(
                        'label[data-correta="true"]'
                    );

                const acertou =
                    labelSelecionado ===
                    labelCorreto;

                labelSelecionado.classList.add(
                    acertou
                        ? 'alternativa-correta'
                        : 'alternativa-incorreta'
                );

                if (
                    !acertou &&
                    labelCorreto
                ) {
                    labelCorreto.classList.add(
                        'alternativa-correta'
                    );
                }

                form.querySelectorAll(
                    'input[name="resposta"]'
                ).forEach(
                    input =>
                        input.disabled = true
                );

                desabilitar(
                    botaoVerificar,
                    true
                );

                progresso[
                    faseAtual
                ][
                    moduloAtual
                ] = Math.max(
                    progresso[
                        faseAtual
                    ][
                        moduloAtual
                    ],
                    aulaAtual
                );

                salvarProgresso(
                    progresso
                );

                renderizarProgresso();

                atualizarStatus(
                    progresso,
                    estrutura
                );

                const segmento =
                    progressoAtividade?.querySelector(
                        `[data-aula="${aulaAtual}"]`
                    );

                if (segmento) {
                    segmento.textContent =
                        '●';

                    segmento.style.backgroundColor =
                        'var(--cor-destaque)';
                }

                const destino =
                    proximoDestino(
                        progresso,
                        estrutura,
                        faseAtual,
                        moduloAtual,
                        aulaAtual
                    );

                botaoContinuar.textContent =
                    destino.texto;

                desabilitar(
                    botaoContinuar,
                    false
                );

                respondido = true;
            }
        );

        botaoContinuar?.addEventListener(
            'click',
            () => {
                if (!respondido) {
                    return;
                }

                const destino =
                    proximoDestino(
                        progresso,
                        estrutura,
                        faseAtual,
                        moduloAtual,
                        aulaAtual
                    );

                window.location.href =
                    criarUrl(destino);
            }
        );

        botaoProximaAula?.addEventListener(
            'click',
            () => {
                const concluida =
                    progresso[
                        faseAtual
                    ][
                        moduloAtual
                    ] >= aulaAtual;

                if (!concluida) {
                    alert(
                        'Envie o quiz desta aula antes de continuar.'
                    );

                    return;
                }

                const destino =
                    proximoDestino(
                        progresso,
                        estrutura,
                        faseAtual,
                        moduloAtual,
                        aulaAtual
                    );

                window.location.href =
                    criarUrl(destino);
            }
        );

        botaoAnterior?.addEventListener(
            'click',
            () => {
                const url =
                    urlAulaAnterior();

                if (url) {
                    window.location.href =
                        url;
                }
            }
        );

        window.addEventListener(
            'storage',
            evento => {
                if (
                    evento.key !==
                    CHAVE_PROGRESSO
                ) {
                    return;
                }

                try {
                    const novo =
                        JSON.parse(
                            evento.newValue
                        );

                    if (
                        progressoValido(
                            novo,
                            estrutura
                        )
                    ) {
                        progresso =
                            novo;

                        renderizarProgresso();
                        atualizarStatus(
                            progresso,
                            estrutura
                        );

                        if (
                            progresso[
                                faseAtual
                            ][
                                moduloAtual
                            ] >= aulaAtual
                        ) {
                            respondido =
                                true;

                            desabilitar(
                                botaoVerificar,
                                true
                            );

                            desabilitar(
                                botaoContinuar,
                                false
                            );
                        }
                    }
                } catch (erro) {
                }
            }
        );
    }
);
