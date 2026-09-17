// ===================== FinanEdu - Início =====================

document.addEventListener('DOMContentLoaded', () => {

    /* --- Gráfico de investimentos (CDB / Tesouro Selic / Poupança / Fundos Imobiliários) --- */
    const elementoGrafico = document.getElementById('grafico-investimentos');
    const legendaGrafico = document.querySelector('#titulo-cdb + figure figcaption');

    // Séries do Banco Central (SGS) usadas para deixar o gráfico realista:
    // 4391 = CDI acumulado no mês (%), 432 = Meta Selic definida pelo Copom (% a.a.),
    // 195 = Rendimento da poupança (% a.m.)
    const SERIES_BCB = {
        cdi: 4391,
        selicMeta: 432,
        poupanca: 195
    };
    const MESES_HISTORICO = 12;

    async function buscarSerieBCB(codigo, quantidade) {
        const url = `https://api.bcb.gov.br/dados/serie/bcdata.sgs.${codigo}/dados/ultimos/${quantidade}?formato=json`;
        const resposta = await fetch(url);
        if (!resposta.ok) throw new Error(`Falha ao buscar série ${codigo}`);
        const json = await resposta.json();
        // Cada item: { data: "dd/mm/aaaa", valor: "0.53" }
        return json.map((item) => parseFloat(item.valor.replace(',', '.')));
    }

    // Gera uma variação mensal "realista" (passeio aleatório) para ativos sem
    // série pública simples de acompanhar, como Fundos Imobiliários.
    function gerarVariacaoRealista(mediaMensal, volatilidade, quantidade, seed) {
        let semente = seed;
        function aleatorio() {
            semente = (semente * 9301 + 49297) % 233280;
            return semente / 233280;
        }
        const taxas = [];
        for (let i = 0; i < quantidade; i++) {
            const ruido = (aleatorio() - 0.5) * 2 * volatilidade;
            taxas.push(mediaMensal + ruido);
        }
        return taxas;
    }

    function acumular(valorInicial, taxasMensais) {
        const acumulado = [valorInicial];
        let atual = valorInicial;
        taxasMensais.forEach((taxa) => {
            atual = atual * (1 + taxa / 100);
            acumulado.push(atual);
        });
        return acumulado;
    }

    function montarTabelaDados(cdiMensal, selicAnual, poupancaMensal, fiiMensal) {
        const cdbMensal = cdiMensal.map((t) => t * 1.0); // CDB ~100% do CDI
        const selicMensal = selicAnual.map((t) => t / 12);

        const baseInicial = 1000;
        const serieCdb = acumular(baseInicial, cdbMensal);
        const serieSelic = acumular(baseInicial, selicMensal);
        const seriePoupanca = acumular(baseInicial, poupancaMensal);
        const serieFii = acumular(baseInicial, fiiMensal);

        const linhas = [['Mês', 'CDB (≈100% CDI)', 'Tesouro Selic', 'Poupança', 'Fundos Imobiliários']];
        for (let i = 0; i <= MESES_HISTORICO; i++) {
            linhas.push([
                i,
                Math.round(serieCdb[i]),
                Math.round(serieSelic[i]),
                Math.round(seriePoupanca[i]),
                Math.round(serieFii[i])
            ]);
        }
        return linhas;
    }

    function dadosDeFallback() {
        // Usado quando a API do Banco Central não responde (offline, CORS, etc.)
        const cdi = gerarVariacaoRealista(0.85, 0.08, MESES_HISTORICO, 7);
        const selicAnual = new Array(MESES_HISTORICO).fill(10.5);
        const poupanca = gerarVariacaoRealista(0.55, 0.05, MESES_HISTORICO, 13);
        const fii = gerarVariacaoRealista(0.9, 2.2, MESES_HISTORICO, 21); // mais volátil
        return montarTabelaDados(cdi, selicAnual, poupanca, fii);
    }

    async function obterDadosInvestimentos() {
        try {
            const [cdi, selic, poupanca] = await Promise.all([
                buscarSerieBCB(SERIES_BCB.cdi, MESES_HISTORICO),
                buscarSerieBCB(SERIES_BCB.selicMeta, MESES_HISTORICO),
                buscarSerieBCB(SERIES_BCB.poupanca, MESES_HISTORICO)
            ]);
            // Fundos Imobiliários não têm série simples de rendimento único no SGS,
            // então simulamos uma variação mensal mais volátil e realista.
            const fii = gerarVariacaoRealista(0.9, 2.2, MESES_HISTORICO, 21);

            if (legendaGrafico) {
                legendaGrafico.textContent = 'Comparativo de rendimento ao longo de 12 meses — CDB, Tesouro Selic e Poupança com dados reais do Banco Central (SGS); Fundos Imobiliários simulados.';
            }
            return montarTabelaDados(cdi, selic, poupanca, fii);
        } catch (erro) {
            console.warn('Não foi possível buscar dados do Banco Central, usando valores estimados.', erro);
            if (legendaGrafico) {
                legendaGrafico.textContent = 'Comparativo de rendimento ao longo de 12 meses (valores estimados — não foi possível conectar à API do Banco Central).';
            }
            return dadosDeFallback();
        }
    }

    function desenharGraficoInvestimentos(dadosInvestimentos) {
        if (!elementoGrafico || typeof google === 'undefined') return;

        const dataTable = google.visualization.arrayToDataTable(dadosInvestimentos);

        const opcoes = {
            curveType: 'function',
            legend: { position: 'bottom', textStyle: { fontSize: 12 } },
            colors: ['#2563eb', '#16a34a', '#f59e0b', '#db2777'],
            chartArea: { left: 55, top: 20, right: 15, bottom: 55, width: '100%', height: '100%' },
            hAxis: { title: 'Meses', titleTextStyle: { fontSize: 11 } },
            vAxis: { title: 'R$', titleTextStyle: { fontSize: 11 }, format: 'short' },
            fontName: 'Segoe UI, Arial, Helvetica, sans-serif',
            backgroundColor: 'transparent',
            lineWidth: 3,
            pointSize: 5,
            pointShape: 'circle'
        };

        const grafico = new google.visualization.LineChart(elementoGrafico);
        grafico.draw(dataTable, opcoes);

        // Redesenha o gráfico ao redimensionar a janela para manter responsivo
        window.addEventListener('resize', () => {
            grafico.draw(dataTable, opcoes);
        });
    }

    if (elementoGrafico) {
        google.charts.load('current', { packages: ['corechart'] });
        google.charts.setOnLoadCallback(async () => {
            const dados = await obterDadosInvestimentos();
            desenharGraficoInvestimentos(dados);
        });
    }

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
