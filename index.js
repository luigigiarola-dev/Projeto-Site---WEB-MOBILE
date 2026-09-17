// ===================== FinanEdu - Início =====================

document.addEventListener('DOMContentLoaded', () => {

    /* --- Carrossel do gráfico (CDB / Tesouro Selic / Poupança) --- */
    const dadosGraficos = [
        {
            titulo: 'CDB',
            legenda: 'Evolução do CDB ao longo do tempo',
            alt: 'Gráfico de evolução do investimento em CDB'
        },
        {
            titulo: 'Tesouro Selic',
            legenda: 'Evolução do Tesouro Selic ao longo do tempo',
            alt: 'Gráfico de evolução do investimento em Tesouro Selic'
        },
        {
            titulo: 'Poupança',
            legenda: 'Evolução da Poupança ao longo do tempo',
            alt: 'Gráfico de evolução do investimento na Poupança'
        }
    ];

    let indiceGrafico = 0;

    const secaoCdb = document.querySelector('section[aria-labelledby="titulo-cdb"]');
    const tituloCdb = document.getElementById('titulo-cdb');
    const figcaptionCdb = secaoCdb.querySelector('figcaption');
    const imgCdb = secaoCdb.querySelector('img');
    const btnAnterior = secaoCdb.querySelector('button[aria-label="Gráfico anterior"]');
    const btnProximo = secaoCdb.querySelector('button[aria-label="Próximo gráfico"]');

    function atualizarGrafico() {
        const dados = dadosGraficos[indiceGrafico];
        tituloCdb.textContent = dados.titulo;
        figcaptionCdb.textContent = dados.legenda;
        imgCdb.alt = dados.alt;
    }

    btnAnterior.addEventListener('click', () => {
        indiceGrafico = (indiceGrafico - 1 + dadosGraficos.length) % dadosGraficos.length;
        atualizarGrafico();
    });

    btnProximo.addEventListener('click', () => {
        indiceGrafico = (indiceGrafico + 1) % dadosGraficos.length;
        atualizarGrafico();
    });

    /* --- Trilha de aprendizado: navega para o quiz ou avisa se estiver bloqueada --- */
    document.querySelectorAll('#trilhas article').forEach((artigo) => {
        const icone = artigo.querySelector('span[aria-hidden="true"]');
        const bloqueado = icone.textContent.includes('\u{1F512}'); // 🔒

        artigo.style.cursor = 'pointer';
        artigo.addEventListener('click', () => {
            if (bloqueado) {
                alert('Complete as aulas anteriores para desbloquear esta trilha.');
            } else {
                window.location.href = 'quiz.html';
            }
        });
    });

    /* --- Botão "Ver todas as trilhas" --- */
    const botaoVerTrilhas = document.querySelector('#trilhas > button');
    if (botaoVerTrilhas) {
        botaoVerTrilhas.addEventListener('click', () => {
            window.location.href = 'trilhas.html';
        });
    }

});
