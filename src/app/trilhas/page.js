import TrailHeader from "@/components/features/trilhas/TrailHeader";
import TrailMap from "@/components/features/trilhas/TrailMap";

export const metadata = {
  title: "FinEdu — Trilhas de Evolução",
  description: "Trilha pedagógica de investimentos gamificada no estilo Duolingo.",
};

export default function TrilhasPage() {
  return (
    <section className="page active" id="trilhas" aria-labelledby="trailTitle">
      <TrailHeader />
      <TrailMap />
    </section>
  );
}
