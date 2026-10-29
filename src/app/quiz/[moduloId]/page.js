import QuizClient from "@/components/features/quiz/QuizClient";

export async function generateStaticParams() {
  return [
    { moduloId: "m1" },
    { moduloId: "m2" },
    { moduloId: "m3" },
    { moduloId: "m4" },
    { moduloId: "m5" },
    { moduloId: "m6" },
  ];
}

export async function generateMetadata({ params }) {
  const { moduloId } = await params;
  return {
    title: `Quiz: Módulo ${moduloId?.toUpperCase?.() || ""} — FinEdu`,
    description: "Valide seu aprendizado com um questionário rápido.",
  };
}

export default async function QuizPage({ params }) {
  const { moduloId } = await params;

  return <QuizClient moduloId={moduloId} />;
}
