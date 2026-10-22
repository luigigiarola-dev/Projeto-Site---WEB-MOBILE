import { formatCurrency } from "@/lib/calculations";

export default function StatsGrid({ totalInvested, totalProfit, monthlyRate }) {
  return (
    <section className="stats-list" aria-label="Detalhes da projeção">
      <article>
        <small>Total investido</small>
        <strong id="investedResult">{formatCurrency(totalInvested)}</strong>
      </article>
      <article>
        <small>Rendimento</small>
        <strong id="yieldResult">{formatCurrency(totalProfit)}</strong>
      </article>
      <article>
        <small>Taxa mensal</small>
        <strong id="monthlyRateResult">
          {(monthlyRate * 100).toFixed(2).replace(".", ",")}%
        </strong>
      </article>
    </section>
  );
}
