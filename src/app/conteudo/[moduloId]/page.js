import { notFound } from "next/navigation";
import lessonsData from "@/data/lessons.json";
import modulesData from "@/data/modules.json";
import FocusHeader from "@/components/features/conteudo/FocusHeader";
import LessonArticle from "@/components/features/conteudo/LessonArticle";
import FocusFooter from "@/components/features/conteudo/FocusFooter";

export async function generateStaticParams() {
  return modulesData.map((m) => ({
    moduloId: m.id,
  }));
}

export async function generateMetadata({ params }) {
  const { moduloId } = await params;
  const lesson = lessonsData[moduloId];
  if (!lesson) {
    return { title: "Aula não encontrada — FinEdu" };
  }
  return {
    title: `${lesson.title} — FinEdu`,
    description: `Aprenda sobre ${lesson.title} no módulo ${lesson.step} da trilha FinEdu.`,
  };
}

export default async function ConteudoPage({ params }) {
  const { moduloId } = await params;
  const lesson = lessonsData[moduloId];

  if (!lesson) {
    notFound();
  }

  const moduleIndex = modulesData.findIndex((m) => m.id === moduloId);
  const stepNumber = moduleIndex !== -1 ? moduleIndex + 1 : 1;

  return (
    <article className="focus-page">
      <FocusHeader
        step={stepNumber}
        totalSteps={modulesData.length}
        closeHref="/trilhas"
      />

      <LessonArticle lesson={lesson} />

      <FocusFooter quizHref={`/quiz/${moduloId}`} />
    </article>
  );
}
