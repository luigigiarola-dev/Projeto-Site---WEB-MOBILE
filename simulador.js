// ===================== FinanEdu - Simulador de Investimentos =====================

document.addEventListener('DOMContentLoaded', () => {

    const formulario = document.getElementById('investment-form');
    const svgGrafico = document.getElementById('investment-chart');
    const spansLegenda = document.querySelectorAll('figcaption span');

    const formatoBRL = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
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
