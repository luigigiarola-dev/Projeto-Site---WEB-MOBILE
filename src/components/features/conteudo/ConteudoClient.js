"use client";

import { useState, useEffect } from "react";
import FocusHeader from "@/components/features/conteudo/FocusHeader";
import LessonArticle from "@/components/features/conteudo/LessonArticle";
import FocusFooter from "@/components/features/conteudo/FocusFooter";

export default function ConteudoClient({ moduloId }) {
  const [lesson, setLesson] = useState(null);
  const [stepNumber, setStepNumber] = useState(1);
  const [totalSteps, setTotalSteps] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    Promise.all([
      fetch(`/api/lessons/${moduloId}`).then((r) => {
        if (!r.ok) throw new Error("Aula não encontrada");
        return r.json();
      }),
      fetch("/api/modules").then((r) => {
        if (!r.ok) throw new Error("Erro ao carregar módulos");
        return r.json();
      }),
    ])
      .then(([lessonData, modulesList]) => {
        setLesson(lessonData);
        if (Array.isArray(modulesList)) {
          setTotalSteps(modulesList.length);
          const idx = modulesList.findIndex((m) => m.id === moduloId);
          setStepNumber(idx !== -1 ? idx + 1 : 1);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro no fetch da aula:", err);
        setError(true);
        setLoading(false);
      });
  }, [moduloId]);

  if (loading) {
    return (
      <article className="focus-page">
        <p style={{ padding: "40px", textAlign: "center" }}>Carregando conteúdo da aula...</p>
      </article>
    );
  }

  if (error || !lesson) {
    return (
      <article className="focus-page">
        <p style={{ padding: "40px", textAlign: "center" }}>Aula não encontrada.</p>
      </article>
    );
  }

  return (
    <article className="focus-page">
      <FocusHeader
        step={stepNumber}
        totalSteps={totalSteps}
        closeHref="/trilhas"
      />

      <LessonArticle lesson={lesson} />

      <FocusFooter quizHref={`/quiz/${moduloId}`} />
    </article>
  );
}

