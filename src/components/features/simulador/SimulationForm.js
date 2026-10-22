"use client";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function SimulationForm({
  params,
  onChangeParam,
  onSubmit,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit();
  };

  return (
    <Card className="calculator-form" as="form" onSubmit={handleSubmit} id="simulationForm">
      <h2>Faça uma projeção</h2>
      <p>Use os valores que desejar; o gráfico é recalculado na hora.</p>

      <fieldset>
        <label>
          <span>💵 Valor inicial (R$)</span>
          <input
            id="initialValue"
            type="number"
            step="any"
            value={params.initial}
            onChange={(e) => onChangeParam("initial", e.target.value)}
            inputMode="decimal"
          />
        </label>

        <label>
          <span>🌱 Aporte mensal (R$)</span>
          <input
            id="monthlyValue"
            type="number"
            step="any"
            value={params.monthly}
            onChange={(e) => onChangeParam("monthly", e.target.value)}
            inputMode="decimal"
          />
        </label>

        <label>
          <span>📈 Rendimento esperado (% ao ano)</span>
          <input
            id="annualRate"
            type="number"
            step="any"
            value={params.annualRate}
            onChange={(e) => onChangeParam("annualRate", e.target.value)}
            inputMode="decimal"
          />
        </label>

        <label>
          <span>⏳ Prazo (anos)</span>
          <input
            id="yearsValue"
            type="number"
            step="any"
            value={params.years}
            onChange={(e) => onChangeParam("years", e.target.value)}
            inputMode="decimal"
          />
        </label>
      </fieldset>

      <Button variant="primary" type="submit">
        SIMULAR AGORA
      </Button>
    </Card>
  );
}
