// ===================== FinanEdu - Quiz =====================

document.addEventListener('DOMContentLoaded', () => {

    const form = document.querySelector('form[aria-label="Alternativas da pergunta"]');
    const botaoVerificar = form.querySelector('button[type="submit"]');
    const botaoContinuar = document.querySelector('main > article > footer button');
    const progressoSpans = document.querySelectorAll('section[aria-label="Progresso da atividade"] span');

    let respondido = false;

    function desabilitar(botao, desabilitado) {
        botao.disabled = desabilitado;
        botao.style.opacity = desabilitado ? '0.5' : '';
        botao.style.cursor = desabilitado ? 'not-allowed' : 'pointer';
    }

    desabilitar(botaoContinuar, true);

    form.addEventListener('submit', (evento) => {
        evento.preventDefault();
        if (respondido) return;

        const selecionado = form.querySelector('input[name="resposta"]:checked');
        if (!selecionado) {
            alert('Escolha uma alternativa antes de verificar.');
            return;
        }

        const labelSelecionado = selecionado.closest('label');
        const labelCorreto = form.querySelector('label[data-correta="true"]');
        const acertou = labelSelecionado === labelCorreto;

        labelSelecionado.classList.add(acertou ? 'alternativa-correta' : 'alternativa-incorreta');
        if (!acertou) {
            labelCorreto.classList.add('alternativa-correta');
        }

        form.querySelectorAll('input[name="resposta"]').forEach((input) => {
            input.disabled = true;
        });
        desabilitar(botaoVerificar, true);

        // Preenche o próximo segmento de progresso
        const proximoPendente = Array.from(progressoSpans).find(
            (span) => span.getAttribute('aria-hidden') === 'true' && span.textContent === '\u25CB'
        );
        if (proximoPendente) {
            proximoPendente.textContent = '\u25CF';
            proximoPendente.style.backgroundColor = 'var(--cor-destaque)';
        }

        respondido = true;
        desabilitar(botaoContinuar, false);
    });

    botaoContinuar.addEventListener('click', () => {
        if (!respondido) return;
        window.location.href = 'trilhas.html';
    });

    /* --- Navegação entre aulas --- */
    const botaoProximaAula = document.querySelector(
        'main > nav[aria-label="Navegação entre aulas"] button:last-of-type'
    );
    botaoProximaAula.addEventListener('click', () => {
        window.location.href = 'trilhas.html';
    });

});
