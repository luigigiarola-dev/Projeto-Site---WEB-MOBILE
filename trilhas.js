// ===================== FinanEdu - Trilha de Conhecimento =====================

document.addEventListener('DOMContentLoaded', () => {

    const filtros = document.querySelectorAll('nav[aria-label="Filtro de nível"] a');
    const fases = {
        '#fase1': document.getElementById('fase1'),
        '#fase2': document.getElementById('fase2'),
        '#fase3': document.getElementById('fase3')
    };

    filtros.forEach((link) => {
        const bloqueado = link.textContent.includes('\u{1F512}'); // 🔒

        link.addEventListener('click', (evento) => {
            evento.preventDefault();

            if (bloqueado) {
                alert('Complete o nível atual para desbloquear este filtro.');
                return;
            }

            const alvo = link.getAttribute('href');

            filtros.forEach((l) => l.removeAttribute('aria-current'));
            link.setAttribute('aria-current', 'true');

            Object.entries(fases).forEach(([id, secao]) => {
                secao.style.display = (id === alvo) ? '' : 'none';
            });

            fases[alvo].scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    /* --- Módulos: navega para o quiz ou avisa se estiver bloqueado --- */
    document.querySelectorAll('main > section[id^="fase"] li').forEach((item) => {
        const icone = item.querySelector('span[aria-hidden="true"]');
        const bloqueado = icone.textContent.includes('\u{1F512}');

        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
            if (bloqueado) {
                alert('Complete os módulos anteriores para desbloquear este conteúdo.');
            } else {
                window.location.href = 'quiz.html';
            }
        });
    });

});
