import Card from "@/components/ui/Card";

export default function SimulatorHeader() {
  return (
    <Card className="sim-header" as="header">
      <section>
        <span className="eyebrow">Laboratório FinEdu</span>
        <h1 id="simTitle">Simulador de investimentos</h1>
        <p>Veja como seus aportes e o tempo podem influenciar uma projeção.</p>
      </section>
      <span className="sim-illustration" aria-hidden="true">
        📈
      </span>
    </Card>
  );
}
