import HomeHero from "@/components/features/home/HomeHero";
import YieldComparisonCard from "@/components/features/home/YieldComparisonCard";
import GoalsSection from "@/components/features/home/GoalsSection";

export const metadata = {
  title: "FinEdu — Sua Jornada Financeira",
  description: "Acompanhe seus rendimentos e organize suas metas financeiras pessoais.",
};

export default function HomePage() {
  return (
    <section className="page active" id="inicio" aria-labelledby="homeTitle">
      <HomeHero />

      <section className="hero-grid">
        <YieldComparisonCard />
      </section>

      <GoalsSection />
    </section>
  );
}
