const CHAVE_PROGRESSO = 'finanEduProgresso';

function obterEstrutura() {
    return Array.from(document.querySelectorAll('main > section[id^="fase"]')).map((fase) =>
        Array.from(fase.querySelectorAll(':scope > ol > li')).map((modulo) => ({
            nome: modulo.querySelector('h3')?.textContent.trim() || 'Módulo',
            aulas: Number(modulo.querySelector('progress')?.max) || 1
        }))
    );
}

function progressoValido(progresso, estrutura) {
    if (!Array.isArray(progresso) || progresso.length !== estrutura.length) return false;

    return progresso.every((fase, i) => {
        if (!Array.isArray(fase) || fase.length !== estrutura[i].length) return false;

        return fase.every((valor, j) =>
            Number.isInteger(valor) &&
            valor >= 0 &&
            valor <= estrutura[i][j].aulas
        );
    });
}

function migrarProgresso(estrutura, fases) {
    return fases.map((fase, faseIndex) =>
        Array.from(fase.querySelectorAll(':scope > ol > li')).map((modulo, moduloIndex) => {
            const barra = modulo.querySelector('progress');
            const valor = Number(barra?.value) || 0;
            const maximo = estrutura[faseIndex][moduloIndex].aulas;

            return Math.max(0, Math.min(valor, maximo));
        })
    );
}

function carregarProgresso(estrutura, fases) {
    try {
        const salvo = JSON.parse(localStorage.getItem(CHAVE_PROGRESSO));

        if (progressoValido(salvo, estrutura)) {
            return salvo;
        }
    } catch (erro) {
    }

    const inicial = migrarProgresso(estrutura, fases);

    localStorage.setItem(
        CHAVE_PROGRESSO,
        JSON.stringify(inicial)
    );

    return inicial;
}

function salvarProgresso(progresso) {
    localStorage.setItem(
        CHAVE_PROGRESSO,
        JSON.stringify(progresso)
    );
}

function moduloConcluido(progresso, estrutura, fase, modulo) {
    return progresso[fase][modulo] >= estrutura[fase][modulo].aulas;
}

function faseConcluida(progresso, estrutura, fase) {
    return estrutura[fase].every((_, modulo) =>
        moduloConcluido(progresso, estrutura, fase, modulo)
    );
}

function moduloLiberado(progresso, estrutura, fase, modulo) {
    if (fase === 0 && modulo === 0) {
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

function faseLiberada(progresso, estrutura, fase) {
    if (fase === 0) {
        return true;
    }

    return faseConcluida(
        progresso,
        estrutura,
        fase - 1
    );
}

function calcularProgressoGeral(progresso, estrutura) {
    let total = 0;
    let concluido = 0;

    estrutura.forEach((fase, faseIndex) => {
        fase.forEach((modulo, moduloIndex) => {
            total += modulo.aulas;
            concluido += Math.min(
                progresso[faseIndex][moduloIndex],
                modulo.aulas
            );
        });
    });

    return total
        ? Math.round((concluido / total) * 100)
        : 0;
}

function atualizarStatus(progresso, estrutura) {
    const percentual = calcularProgressoGeral(
        progresso,
        estrutura
    );

    let faseAtual = estrutura.findIndex(
        (_, index) => !faseConcluida(
            progresso,
            estrutura,
            index
        )
    );

    if (faseAtual === -1) {
        faseAtual = estrutura.length - 1;
    }

    const niveis = [
        'INICIANTE',
        'INTERMEDIÁRIO',
        'AVANÇADO'
    ];

    const nivel = niveis[faseAtual] || 'AVANÇADO';

    const status = document.querySelector(
        'body > nav section[aria-labelledby="status-nivel"]'
    );

    if (status) {
        const texto = status.querySelector('p');
        const barra = status.querySelector('progress');

        if (texto) {
            texto.textContent = `${nivel} ${percentual}%`;
        }

        if (barra) {
            barra.value = percentual;
            barra.textContent = `${percentual}%`;
        }
    }

    const titulo = document.getElementById('titulo-nivel');

    if (titulo) {
        const icone = titulo.querySelector(
            'span[aria-hidden="true"]'
        );

        titulo.textContent = '';

        if (icone) {
            titulo.appendChild(icone);
        }

        titulo.append(
            ` NÍVEL ATUAL: ${nivel}`
        );
    }
}

function atualizarFiltros(progresso, estrutura, fases) {
    const filtros = document.querySelectorAll(
        'nav[aria-label="Filtro de nível"] a'
    );

    filtros.forEach((link, fase) => {
        const liberada = faseLiberada(
            progresso,
            estrutura,
            fase
        );

        const icone = link.querySelector(
            'span[aria-hidden="true"]'
        );

        link.dataset.liberado = liberada
            ? 'true'
            : 'false';

        link.setAttribute(
            'aria-disabled',
            String(!liberada)
        );

        if (icone) {
            icone.textContent = liberada
                ? '✓'
                : '🔒';
        }
    });

    let faseVisivel = estrutura.findIndex(
        (_, fase) => !faseConcluida(
            progresso,
            estrutura,
            fase
        )
    );

    if (faseVisivel === -1) {
        faseVisivel = estrutura.length - 1;
    }

    const selecionada = Array.from(filtros).findIndex(
        link =>
            link.getAttribute('aria-current') === 'true'
    );

    if (
        selecionada >= 0 &&
        faseLiberada(
            progresso,
            estrutura,
            selecionada
        )
    ) {
        faseVisivel = selecionada;
    }

    filtros.forEach((link, index) => {
        if (
            index === faseVisivel &&
            faseLiberada(
                progresso,
                estrutura,
                index
            )
        ) {
            link.setAttribute(
                'aria-current',
                'true'
            );
        } else {
            link.removeAttribute(
                'aria-current'
            );
        }
    });

    Object.values(fases).forEach(
        (secao, index) => {
            secao.style.display =
                index === faseVisivel
                    ? ''
                    : 'none';
        }
    );
}

function atualizarModulos(
    progresso,
    estrutura,
    fases
) {
    Object.values(fases).forEach(
        (faseElement, faseIndex) => {
            const itens = Array.from(
                faseElement.querySelectorAll(
                    ':scope > ol > li'
                )
            );

            itens.forEach(
                (item, moduloIndex) => {
                    const config =
                        estrutura[faseIndex][moduloIndex];

                    const feito =
                        progresso[faseIndex][moduloIndex];

                    const liberado =
                        moduloLiberado(
                            progresso,
                            estrutura,
                            faseIndex,
                            moduloIndex
                        );

                    const concluido =
                        feito >= config.aulas;

                    const barra =
                        item.querySelector(
                            'progress'
                        );

                    const texto =
                        item.querySelector('p');

                    const icone =
                        item.querySelector(
                            'span[aria-hidden="true"]'
                        );

                    let botao =
                        item.querySelector(
                            'a.botao-modulo'
                        );

                    if (!botao) {
                        botao =
                            document.createElement('a');

                        botao.className =
                            'botao-modulo';

                        item.appendChild(botao);
                    }

                    if (texto) {
                        texto.textContent =
                            `${feito}/${config.aulas} aulas` +
                            (concluido
                                ? ' · 100%'
                                : '');
                    }

                    if (barra) {
                        barra.value = feito;
                        barra.max = config.aulas;
                        barra.textContent =
                            `${feito} de ${config.aulas} aulas`;
                    }

                    item.classList.toggle(
                        'modulo-bloqueado',
                        !liberado
                    );

                    item.classList.toggle(
                        'modulo-desbloqueado',
                        liberado
                    );

                    item.classList.toggle(
                        'modulo-concluido',
                        concluido
                    );

                    item.style.opacity =
                        liberado ? '1' : '0.55';

                    item.style.cursor =
                        'pointer';

                    if (icone) {
                        icone.textContent =
                            liberado
                                ? '💰'
                                : '🔒';

                        icone.style.borderColor =
                            liberado
                                ? 'var(--cor-destaque)'
                                : 'var(--cor-borda)';
                    }

                    const aulaDestino =
                        concluido
                            ? config.aulas
                            : feito + 1;

                    botao.href =
                        `quiz.html?fase=${faseIndex + 1}` +
                        `&modulo=${moduloIndex + 1}` +
                        `&aula=${aulaDestino}`;

                    botao.textContent =
                        !liberado
                            ? 'Bloqueado'
                            : concluido
                                ? 'Revisar quiz'
                                : 'Continuar';

                    if (!liberado) {
                        botao.setAttribute(
                            'aria-disabled',
                            'true'
                        );
                    } else {
                        botao.removeAttribute(
                            'aria-disabled'
                        );
                    }
                }
            );
        }
    );
}

document.addEventListener(
    'DOMContentLoaded',
    () => {
        const fases = {
            '#fase1':
                document.getElementById('fase1'),

            '#fase2':
                document.getElementById('fase2'),

            '#fase3':
                document.getElementById('fase3')
        };

        const estrutura = obterEstrutura();

        let progresso =
            carregarProgresso(
                estrutura,
                Object.values(fases)
            );

        function renderizar() {
            atualizarModulos(
                progresso,
                estrutura,
                fases
            );

            atualizarStatus(
                progresso,
                estrutura
            );

            atualizarFiltros(
                progresso,
                estrutura,
                fases
            );
        }

        const filtros =
            document.querySelectorAll(
                'nav[aria-label="Filtro de nível"] a'
            );

        filtros.forEach(
            (link, index) => {
                link.addEventListener(
                    'click',
                    evento => {
                        evento.preventDefault();

                        if (
                            !faseLiberada(
                                progresso,
                                estrutura,
                                index
                            )
                        ) {
                            alert(
                                'Complete a fase atual para desbloquear esta etapa.'
                            );

                            return;
                        }

                        filtros.forEach(
                            item =>
                                item.removeAttribute(
                                    'aria-current'
                                )
                        );

                        link.setAttribute(
                            'aria-current',
                            'true'
                        );

                        Object.values(
                            fases
                        ).forEach(
                            (
                                secao,
                                faseIndex
                            ) => {
                                secao.style.display =
                                    faseIndex === index
                                        ? ''
                                        : 'none';
                            }
                        );
                    }
                );
            }
        );

        Object.values(fases).forEach(
            (faseElement, faseIndex) => {
                const itens =
                    Array.from(
                        faseElement.querySelectorAll(
                            ':scope > ol > li'
                        )
                    );

                itens.forEach(
                    (item, moduloIndex) => {
                        item.addEventListener(
                            'click',
                            evento => {
                                if (
                                    evento.target.closest(
                                        'a.botao-modulo'
                                    )
                                ) {
                                    return;
                                }

                                if (
                                    !moduloLiberado(
                                        progresso,
                                        estrutura,
                                        faseIndex,
                                        moduloIndex
                                    )
                                ) {
                                    alert(
                                        'Complete os módulos anteriores para desbloquear este conteúdo.'
                                    );

                                    return;
                                }

                                const feito =
                                    progresso[
                                        faseIndex
                                    ][
                                        moduloIndex
                                    ];

                                const aulas =
                                    estrutura[
                                        faseIndex
                                    ][
                                        moduloIndex
                                    ].aulas;

                                const aula =
                                    feito >= aulas
                                        ? aulas
                                        : feito + 1;

                                window.location.href =
                                    `quiz.html?fase=${faseIndex + 1}` +
                                    `&modulo=${moduloIndex + 1}` +
                                    `&aula=${aula}`;
                            }
                        );

                        const botao =
                            item.querySelector(
                                'a.botao-modulo'
                            );

                        botao?.addEventListener(
                            'click',
                            evento => {
                                if (
                                    botao.getAttribute(
                                        'aria-disabled'
                                    ) === 'true'
                                ) {
                                    evento.preventDefault();
                                    evento.stopPropagation();

                                    alert(
                                        'Complete os módulos anteriores para desbloquear este conteúdo.'
                                    );
                                }
                            }
                        );
                    }
                );
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
                        progresso = novo;
                        renderizar();
                    }
                } catch (erro) {
                }
            }
        );

        window.FinanEduProgresso = {
            get() {
                return JSON.parse(
                    JSON.stringify(progresso)
                );
            },

            setModulo(
                fase,
                modulo,
                aulasConcluidas
            ) {
                const f = fase - 1;
                const m = modulo - 1;

                if (!estrutura[f]?.[m]) {
                    return;
                }

                progresso[f][m] =
                    Math.max(
                        0,
                        Math.min(
                            Number(
                                aulasConcluidas
                            ) || 0,
                            estrutura[f][m].aulas
                        )
                    );

                salvarProgresso(
                    progresso
                );

                renderizar();
            }
        };

        renderizar();
    }
);
