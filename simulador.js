// ===================== FinanEdu - Simulador de Investimentos =====================

document.addEventListener('DOMContentLoaded', () => {

    const formulario = document.getElementById('investment-form');
    const svgGrafico = document.getElementById('investment-chart');
    const spansLegenda = document.querySelectorAll('figcaption span');

    const formatoBRL = new Intl.NumberFormat('pt-BR', {
        style: 'currency',// ===================== FinanEdu - Simulador de Investimentos grafico 1.0 =====================

document.addEventListener('DOMContentLoaded', () => {

    const formulario = document.getElementById('investment-form');
    const elementoGrafico = document.getElementById('investment-chart');

    const formatoBRL = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    let googleChartsPronto = false;
    let ultimosDadosSimulacao = null;
    let ultimosAnosSimulacao = null;

    // Taxas reais de referência (% ao ano), obtidas da API do Banco Central (SGS).
    // Usadas para comparar a simulação do usuário com CDI e Poupança de verdade.
    let taxasReferencia = {
        cdiAnual: 10.75,   // valor de segurança até a API responder
        poupancaAnual: 6.6,
        origem: 'estimado'
    };

    async function carregarTaxasReferencia() {
        try {
            // 4391 = CDI acumulado no mês (%) | 195 = Rendimento da poupança (% a.m.)
            const [cdiResp, poupancaResp] = await Promise.all([
                fetch('https://api.bcb.gov.br/dados/serie/bcdata.sgs.4391/dados/ultimos/1?formato=json'),
                fetch('https://api.bcb.gov.br/dados/serie/bcdata.sgs.195/dados/ultimos/1?formato=json')
            ]);
            if (!cdiResp.ok || !poupancaResp.ok) throw new Error('API do Banco Central indisponível');

            const [cdiJson, poupancaJson] = await Promise.all([cdiResp.json(), poupancaResp.json()]);
            const cdiMensal = parseFloat(cdiJson[0].valor.replace(',', '.'));
            const poupancaMensal = parseFloat(poupancaJson[0].valor.replace(',', '.'));

            taxasReferencia = {
                cdiAnual: (Math.pow(1 + cdiMensal / 100, 12) - 1) * 100,
                poupancaAnual: (Math.pow(1 + poupancaMensal / 100, 12) - 1) * 100,
                origem: 'bcb'
            };
        } catch (erro) {
            console.warn('Não foi possível buscar taxas reais do Banco Central, usando valores estimados.', erro);
            taxasReferencia.origem = 'estimado';
        }
    }

    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(async () => {
        googleChartsPronto = true;
        await carregarTaxasReferencia();
        if (ultimosDadosSimulacao) {
            desenharGrafico(ultimosDadosSimulacao, ultimosAnosSimulacao);
        }
    });

    window.addEventListener('resize', () => {
        if (googleChartsPronto && ultimosDadosSimulacao) {
            desenharGrafico(ultimosDadosSimulacao, ultimosAnosSimulacao);
        }
    });

    /**
     * Calcula a evolução do investimento com aportes mensais e juros compostos.
     */
    function calcularSimulacao(valorInicial, aporteMensal, retornoAnualPercentual, anos) {
        const meses = Math.max(1, Math.round(anos * 12));
        const taxaMensal = (retornoAnualPercentual / 100) / 12;

        function valorNoMes(mesesDecorridos) {
            if (taxaMensal === 0) {
                return valorInicial + aporteMensal * mesesDecorridos;
            }
            const fatorJuros = Math.pow(1 + taxaMensal, mesesDecorridos);
            const fatorAportes = (fatorJuros - 1) / taxaMensal;
            return valorInicial * fatorJuros + aporteMensal * fatorAportes;
        }

        const investido = valorInicial + aporteMensal * meses;
        const totalFinal = valorNoMes(meses);
        const rendimento = totalFinal - investido;

        return { investido, totalFinal, rendimento, valorNoMes, meses };
    }

    function renderizarResultados(dados, anos) {
        document.getElementById('result-years').textContent = anos;
        document.getElementById('summary-years').textContent = anos;
        document.getElementById('total-value').textContent = formatoBRL.format(dados.totalFinal);
        document.getElementById('profit-value').textContent = formatoBRL.format(dados.rendimento);
        document.getElementById('invested-value').textContent = formatoBRL.format(dados.investido);
        document.getElementById('earnings-value').textContent = formatoBRL.format(dados.rendimento);
        document.getElementById('accumulated-value').textContent = formatoBRL.format(dados.totalFinal);
    }

    function desenharGrafico(dados, anos) {
        ultimosDadosSimulacao = dados;
        ultimosAnosSimulacao = anos;

        if (!googleChartsPronto || typeof google === 'undefined') return;

        const valorInicial = parseFloat(document.getElementById('initial-investment').value) || 0;
        const aporteMensal = parseFloat(document.getElementById('monthly-investment').value) || 0;

        // Simulações "reais" de comparação, usando as taxas obtidas do Banco Central
        const simCdi = calcularSimulacao(valorInicial, aporteMensal, taxasReferencia.cdiAnual, anos);
        const simPoupanca = calcularSimulacao(valorInicial, aporteMensal, taxasReferencia.poupancaAnual, anos);

        // Monta os pontos com no máximo 24 amostras ao longo do período
        const amostras = Math.min(dados.meses, 24) || 1;
        const passo = Math.max(1, Math.round(dados.meses / amostras));

        const cabecalho = [
            'Ano',
            'Seu cenário',
            'Total investido (aportes)',
            `CDI real (${taxasReferencia.cdiAnual.toFixed(2)}% a.a.)`,
            `Poupança real (${taxasReferencia.poupancaAnual.toFixed(2)}% a.a.)`
        ];
        const linhas = [cabecalho];

        function totalAportadoAte(mes) {
            return valorInicial + aporteMensal * mes;
        }

        for (let mes = 0; mes <= dados.meses; mes += passo) {
            linhas.push([
                +(mes / 12).toFixed(2),
                Math.round(dados.valorNoMes(mes)),
                Math.round(totalAportadoAte(mes)),
                Math.round(simCdi.valorNoMes(mes)),
                Math.round(simPoupanca.valorNoMes(mes))
            ]);
        }
        const ultimoAno = +(dados.meses / 12).toFixed(2);
        if (linhas[linhas.length - 1][0] !== ultimoAno) {
            linhas.push([
                ultimoAno,
                Math.round(dados.totalFinal),
                Math.round(totalAportadoAte(dados.meses)),
                Math.round(simCdi.totalFinal),
                Math.round(simPoupanca.totalFinal)
            ]);
        }

        const dataTable = google.visualization.arrayToDataTable(linhas);

        const opcoes = {
            curveType: 'function',
            legend: { position: 'bottom', textStyle: { fontSize: 11 } },
            colors: ['#2563eb', '#9aa0a6', '#16a34a', '#f59e0b'],
            series: {
                0: { lineWidth: 4, pointSize: 5 },                       // Seu cenário — destaque
                1: { lineDashStyle: [4, 4], lineWidth: 2, pointSize: 0 }, // Total investido — tracejado
                2: { lineWidth: 2, pointSize: 3 },                       // CDI real
                3: { lineWidth: 2, pointSize: 3 }                        // Poupança real
            },
            chartArea: { left: 60, top: 15, right: 15, bottom: 55, width: '100%', height: '100%' },
            hAxis: { title: 'Anos', titleTextStyle: { fontSize: 11 } },
            vAxis: { title: 'R$', titleTextStyle: { fontSize: 11 }, format: 'short' },
            fontName: 'Segoe UI, Arial, Helvetica, sans-serif',
            backgroundColor: 'transparent'
        };

        const grafico = new google.visualization.LineChart(elementoGrafico);
        grafico.draw(dataTable, opcoes);

        // Nota sobre a origem das taxas de comparação (real vs. estimada)
        const legenda = document.querySelector('#investment-chart').closest('figure').querySelector('figcaption');
        const nota = taxasReferencia.origem === 'bcb'
            ? 'CDI e Poupança com dados reais do Banco Central (SGS).'
            : 'Não foi possível obter dados do Banco Central agora — CDI e Poupança usam valores estimados.';
        if (legenda) {
            legenda.textContent = nota;
        } else {
            const fig = document.querySelector('#investment-chart').closest('figure');
            const fig2 = document.createElement('figcaption');
            fig2.textContent = nota;
            fig.appendChild(fig2);
        }
    }

    function simular(evento) {
        if (evento) evento.preventDefault();

        const valorInicial = parseFloat(document.getElementById('initial-investment').value) || 0;
        const aporteMensal = parseFloat(document.getElementById('monthly-investment').value) || 0;
        const retornoAnual = parseFloat(document.getElementById('annual-return').value) || 0;
        const anos = parseFloat(document.getElementById('investment-years').value) || 1;

        const dados = calcularSimulacao(valorInicial, aporteMensal, retornoAnual, anos);

        renderizarResultados(dados, anos);
        desenharGrafico(dados, anos);
    }

    formulario.addEventListener('submit', simular);

    // Calcula com os valores padrão assim que a página carrega
    simular();

});

        currency: 'BRL'
    });

    /**
     * Calcula a evolução do investimento com aportes mensais e juros compostos.
     */
    function calcularSimulacao(valorInicial, aporteMensal, retornoAnualPercentual, anos) {
        const meses = Math.max(1, Math.round(anos * 12));
        const taxaMensal = (retornoAnualPercentual / 100) / 12;

        function valorNoMes(mesesDecorridos) {
            if (taxaMensal === 0) {
                return valorInicial + aporteMensal * mesesDecorridos;
            }
            const fatorJuros = Math.pow(1 + taxaMensal, mesesDecorridos);
            const fatorAportes = (fatorJuros - 1) / taxaMensal;
            return valorInicial * fatorJuros + aporteMensal * fatorAportes;
        }

        const investido = valorInicial + aporteMensal * meses;
        const totalFinal = valorNoMes(meses);
        const rendimento = totalFinal - investido;

        return { investido, totalFinal, rendimento, valorNoMes, meses };
    }

    function renderizarResultados(dados, anos) {
        document.getElementById('result-years').textContent = anos;
        document.getElementById('summary-years').textContent = anos;
        document.getElementById('total-value').textContent = formatoBRL.format(dados.totalFinal);
        document.getElementById('profit-value').textContent = formatoBRL.format(dados.rendimento);
        document.getElementById('invested-value').textContent = formatoBRL.format(dados.investido);
        document.getElementById('earnings-value').textContent = formatoBRL.format(dados.rendimento);
        document.getElementById('accumulated-value').textContent = formatoBRL.format(dados.totalFinal);
    }

    function atualizarLegenda(anos) {
        const total = spansLegenda.length - 1;
        spansLegenda.forEach((span, indice) => {
            if (indice === 0) {
                span.textContent = '0';
                return;
            }
            const anoAproximado = Math.round((indice / total) * anos);
            span.textContent = `${anoAproximado} ano${anoAproximado === 1 ? '' : 's'}`;
        });
    }

    function desenharGrafico(dados) {
        const NS = 'http://www.w3.org/2000/svg';
        const largura = 600;
        const altura = 250;
        const padding = 12;

        svgGrafico.innerHTML = '';

        const amostras = Math.min(dados.meses, 60) || 1;
        const passo = Math.max(1, Math.round(dados.meses / amostras));

        const pontos = [];
        for (let mes = 0; mes <= dados.meses; mes += passo) {
            pontos.push(dados.valorNoMes(mes));
        }
        if (pontos[pontos.length - 1] !== dados.totalFinal) {
            pontos.push(dados.totalFinal);
        }

        const valorMaximo = Math.max(...pontos);
        const valorMinimo = Math.min(...pontos, 0);
        const amplitude = (valorMaximo - valorMinimo) || 1;

        const coordenadas = pontos.map((valor, indice) => {
            const x = padding + (indice / (pontos.length - 1)) * (largura - padding * 2);
            const y = altura - padding - ((valor - valorMinimo) / amplitude) * (altura - padding * 2);
            return `${x.toFixed(1)},${y.toFixed(1)}`;
        });

        const linhaBase = document.createElementNS(NS, 'line');
        linhaBase.setAttribute('x1', padding);
        linhaBase.setAttribute('x2', largura - padding);
        linhaBase.setAttribute('y1', altura - padding);
        linhaBase.setAttribute('y2', altura - padding);
        linhaBase.setAttribute('stroke', '#e2e2e2');
        linhaBase.setAttribute('stroke-width', '1');
        svgGrafico.appendChild(linhaBase);

        const areaPontos = `${padding},${altura - padding} ${coordenadas.join(' ')} ${largura - padding},${altura - padding}`;
        const area = document.createElementNS(NS, 'polygon');
        area.setAttribute('points', areaPontos);
        area.setAttribute('fill', '#f7f7f8');
        svgGrafico.appendChild(area);

        const linha = document.createElementNS(NS, 'polyline');
        linha.setAttribute('points', coordenadas.join(' '));
        linha.setAttribute('fill', 'none');
        linha.setAttribute('stroke', '#111111');
        linha.setAttribute('stroke-width', '3');
        linha.setAttribute('stroke-linecap', 'round');
        linha.setAttribute('stroke-linejoin', 'round');
        svgGrafico.appendChild(linha);

        const [ultimoX, ultimoY] = coordenadas[coordenadas.length - 1].split(',');
        const pontoFinal = document.createElementNS(NS, 'circle');
        pontoFinal.setAttribute('cx', ultimoX);
        pontoFinal.setAttribute('cy', ultimoY);
        pontoFinal.setAttribute('r', '5');
        pontoFinal.setAttribute('fill', '#111111');
        svgGrafico.appendChild(pontoFinal);
    }

    function simular(evento) {
        if (evento) evento.preventDefault();

        const valorInicial = parseFloat(document.getElementById('initial-investment').value) || 0;
        const aporteMensal = parseFloat(document.getElementById('monthly-investment').value) || 0;
        const retornoAnual = parseFloat(document.getElementById('annual-return').value) || 0;
        const anos = parseFloat(document.getElementById('investment-years').value) || 1;

        const dados = calcularSimulacao(valorInicial, aporteMensal, retornoAnual, anos);

        renderizarResultados(dados, anos);
        atualizarLegenda(anos);
        desenharGrafico(dados);
    }

    formulario.addEventListener('submit', simular);

    // Calcula com os valores padrão assim que a página carrega
    simular();

});
