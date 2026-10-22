"use client";

export default function ProjectionChart({ dataPoints = [] }) {
  if (!dataPoints || dataPoints.length === 0) return null;

  const width = 640;
  const height = 230;
  const padding = { top: 20, right: 25, bottom: 30, left: 55 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const userVals = dataPoints.map((p) => p.userValue);
  const cdiVals = dataPoints.map((p) => p.cdiValue);
  const savingsVals = dataPoints.map((p) => p.savingsValue);
  const allVals = [...userVals, ...cdiVals, ...savingsVals];

  const minVal = 0;
  const maxVal = Math.max(...allVals, 1000);
  const range = maxVal - minVal || 1;

  const getX = (idx) => padding.left + (idx / (dataPoints.length - 1)) * chartW;
  const getY = (val) => padding.top + (1 - (val - minVal) / range) * chartH;

  const formatPoints = (arr) =>
    arr.map((val, idx) => `${getX(idx).toFixed(1)},${getY(val).toFixed(1)}`).join(" ");

  const totalMonths = dataPoints[dataPoints.length - 1]?.month || 12;

  return (
    <div
      className="google-chart"
      id="projectionChart"
      role="img"
      aria-label="Gráfico da projeção de investimento"
      style={{ width: "100%", height: 230, position: "relative" }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
      >
        {/* Linhas de grade e valores verticais */}
        {[1.0, 0.75, 0.5, 0.25, 0].map((ratio) => {
          const y = padding.top + chartH * (1 - ratio);
          const val = Math.round(minVal + range * ratio);
          const valFormatted =
            val >= 1000000
              ? `${(val / 1000000).toFixed(1)}M`
              : val >= 1000
              ? `${(val / 1000).toFixed(0)}k`
              : val;

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
                R${valFormatted}
              </text>
            </g>
          );
        })}

        {/* Eixo X com marcos temporais */}
        {[0, 0.25, 0.5, 0.75, 1.0].map((ratio) => {
          const idx = Math.min(
            dataPoints.length - 1,
            Math.round((dataPoints.length - 1) * ratio)
          );
          const month = Math.round(dataPoints[idx]?.month || 0);
          const x = getX(idx);

          return (
            <text
              key={ratio}
              x={x}
              y={height - 8}
              textAnchor="middle"
              fontSize="11"
              fill="#7a8094"
              fontFamily="DM Sans"
            >
              {month >= 12 ? `${(month / 12).toFixed(0)}a` : `${month}m`}
            </text>
          );
        })}

        {/* Linha Poupança */}
        <polyline
          fill="none"
          stroke="#9da3b5"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="3 3"
          points={formatPoints(savingsVals)}
        />

        {/* Linha CDI */}
        <polyline
          fill="none"
          stroke="#25ae72"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={formatPoints(cdiVals)}
        />

        {/* Linha Projeção do Usuário */}
        <polyline
          fill="none"
          stroke="#6654e8"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={formatPoints(userVals)}
        />
      </svg>
    </div>
  );
}
