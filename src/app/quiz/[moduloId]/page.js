import modulesData from "@/data/modules.json";
import QuizClient from "@/components/features/quiz/QuizClient";

export async function generateStaticParams() {
  return modulesData.map((m) => ({
    moduloId: m.id,
  }));
}

export async function generateMetadata({ params }) {
  const { moduloId } = await params;
  const module = modulesData.find((m) => m.id === moduloId);
  const title = module ? `Quiz: ${module.title} — FinEdu` : "Quiz — FinEdu";

  return {
    title,
    description: "Valide seu aprendizado com um questionário rápido.",
  };
}

export default async function QuizPage({ params }) {
  const { moduloId } = await params;

  return <QuizClient moduloId={moduloId} />;
}
