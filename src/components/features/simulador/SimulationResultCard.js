"use client";

import Card from "@/components/ui/Card";
import { formatCurrency } from "@/lib/calculations";
import ProjectionChart from "./ProjectionChart";
import StatsGrid from "./StatsGrid";
import CompoundInterestExplainer from "./CompoundInterestExplainer";

export default function SimulationResultCard({ simulation }) {
  const { finalAmount, totalProfit, totalInvested, monthlyRate, dataPoints } = simulation;

  return (
    <Card className="calculator-result">
      <span className="total-box">
        <small>Valor acumulado estimado</small>
        <output id="totalResult">{formatCurrency(finalAmount)}</output>
        <p id="profitResult">Rendimento de {formatCurrency(totalProfit)}</p>
      </span>

      <ProjectionChart dataPoints={dataPoints} />

      <StatsGrid
        totalInvested={totalInvested}
        totalProfit={totalProfit}
        monthlyRate={monthlyRate}
      />

      <CompoundInterestExplainer />
    </Card>
  );
}
