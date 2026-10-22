"use client";

import { useMemo, useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import marketRates from "@/data/marketRates.json";

const DEFAULT_MONTHS = ["Nov", "Dez", "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out"];

export default function YieldComparisonCard() {
  const [months, setMonths] = useState(DEFAULT_MONTHS);

  useEffect(() => {
    try {
      const monthsBack = 12;
      const names = [];
      for (let i = 0; i < monthsBack; i++) {
        const d = new Date();
        d.setMonth(d.getMonth() - (monthsBack - 1) + i);
        names.push(
          new Intl.DateTimeFormat("pt-BR", { month: "short" })
            .format(d)
            .replace(".", "")
        );
      }
      setMonths(names);
    } catch {}
  }, []);

  // Gera dados comparativos dos últimos 12 meses para R$ 1.000 aplicados
  const { series, maxVal, minVal } = useMemo(() => {
    const monthsBack = 12;
    const fiiFluctuations = [
      0.018, -0.006, 0.024, 0.004, 0.015, -0.011,
      0.02, 0.006, 0.017, -0.004, 0.015, 0.008,
    ];

    let cdb = 1000;
    let cdi = 1000;
    let selic = 1000;
    let savings = 1000;
    let fiis = 1000;

    const cdbData = [];
    const cdiData = [];
    const selicData = [];
    const savingsData = [];
    const fiisData = [];

    for (let i = 0; i < monthsBack; i++) {
      cdb *= 1 + marketRates.cdiMonthly + 0.0015 + (i % 3) * 0.0004;
      cdi *= 1 + marketRates.cdiMonthly;
      selic *= 1 + marketRates.selicMonthly;
      savings *= 1 + marketRates.savingsMonthly;
      fiis *= 1 + (fiiFluctuations[i] || 0.01);

      cdbData.push(Math.round(cdb));
      cdiData.push(Math.round(cdi));
      selicData.push(Math.round(selic));
      savingsData.push(Math.round(savings));
      fiisData.push(Math.round(fiis));
    }

    const all = [...cdbData, ...cdiData, ...selicData, ...savingsData, ...fiisData];
    return {
      series: [
        { name: "CDB", color: "#6654e8", data: cdbData },
        { name: "CDI", color: "#25ae72", data: cdiData },
        { name: "Meta Selic", color: "#4f9ddd", data: selicData },
        { name: "FIIs", color: "#ffad42", data: fiisData },
        { name: "Poupança", color: "#9da3b5", data: savingsData },
      ],
      maxVal: Math.max(...all, 1150),
      minVal: 980,
    };
  }, []);

  // Dimensões SVG
  const width = 640;
  const height = 230;
  const padding = { top: 20, right: 25, bottom: 35, left: 55 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;
  const range = maxVal - minVal || 1;

  const getY = (val) => padding.top + (1 - (val - minVal) / range) * chartH;
  const getX = (idx) => padding.left + (idx / (months.length - 1)) * chartW;

  return (
    <Card className="chart-card">
      <header className="card-heading">
        <span>
          <h2>Seu dinheiro em movimento</h2>
          <p>R$ 1.000 aplicados há 12 meses</p>
        </span>
        <Badge variant="live">dados de referência</Badge>
      </header>

      <div
        className="google-chart"
        style={{ width: "100%", height: 230, position: "relative" }}
        role="img"
        aria-label="Gráfico comparativo de rendimentos em 12 meses"
      >
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
        >
          {/* Linhas de grade e valores no eixo Y */}
          {[1.0, 0.75, 0.5, 0.25, 0].map((ratio) => {
            const y = padding.top + chartH * (1 - ratio);
            const val = Math.round(minVal + range * ratio);
            return (
              <g key={ratio}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="#ececf3"
                  strokeDasharray="4"
                />
                <text
                  x={padding.left - 8}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="11"
                  fill="#7a8094"
                  fontFamily="DM Sans"
                >
                  R${val}
                </text>
              </g>
            );
          })}

          {/* Rótulos dos meses no eixo X */}
          {months.map((m, idx) => {
            const x = getX(idx);
            return (
              <text
                key={m + idx}
                x={x}
                y={height - 10}
                textAnchor="middle"
                fontSize="11"
                fill="#7a8094"
                fontFamily="DM Sans"
              >
                {m}
              </text>
            );
          })}

          {/* Linhas de cada índice */}
          {series.map((s) => {
            const points = s.data
              .map((val, idx) => `${getX(idx).toFixed(1)},${getY(val).toFixed(1)}`)
              .join(" ");

            return (
              <polyline
                key={s.name}
                fill="none"
                stroke={s.color}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={points}
              />
            );
          })}
        </svg>
      </div>

      <p className="chart-key">
        {series.map((s) => (
          <span key={s.name} style={{ "--key": s.color }}>
            {s.name}
          </span>
        ))}
      </p>
    </Card>
  );
}
