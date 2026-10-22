"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import quizzesData from "@/data/quizzes.json";
import modulesData from "@/data/modules.json";
import { useApp } from "@/context/AppContext";
import QuizHeader from "@/components/features/quiz/QuizHeader";
import QuizBreadcrumb from "@/components/features/quiz/QuizBreadcrumb";
import QuizStepper from "@/components/features/quiz/QuizStepper";
import QuizQuestion from "@/components/features/quiz/QuizQuestion";
import QuizFeedbackPanel from "@/components/features/quiz/QuizFeedbackPanel";
import QuizRewardCard from "@/components/features/quiz/QuizRewardCard";
import Button from "@/components/ui/Button";

export default function QuizClient({ moduloId }) {
  const router = useRouter();
  const { completeModule } = useApp();

  const module = modulesData.find((m) => m.id === moduloId) || modulesData[0];
  const allQuestions = quizzesData[moduloId] || quizzesData.m1;

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const selected = allQuestions.slice(0, 3);
    setQuestions(selected);
    setCurrentIndex(0);
    setSelectedIndex(null);
    setIsChecked(false);
    setCorrectCount(0);
    setIsFinished(false);
  }, [moduloId]);

  if (questions.length === 0) {
    return (
      <article className="focus-page quiz-shell">
        <p>Carregando quiz...</p>
      </article>
    );
  }

  const currentQ = questions[currentIndex];

  const handleSelectOption = (idx) => {
    if (isChecked) return;
    setSelectedIndex(idx);
    setIsChecked(true);

    const isCorrect = idx === currentQ.correct;
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedIndex(null);
      setIsChecked(false);
    } else {
      const finalScore = selectedIndex === currentQ.correct ? correctCount : correctCount;
      completeModule(moduloId, finalScore);
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedIndex(null);
    setIsChecked(false);
    setCorrectCount(0);
    setIsFinished(false);
  };

  const passed = correctCount >= 2;

  if (isFinished) {
    return (
      <QuizRewardCard
        score={correctCount}
        total={questions.length}
        passed={passed}
        onPrimaryAction={() => {
          if (passed) {
            router.push("/trilhas");
          } else {
            handleRestart();
          }
        }}
        primaryActionLabel={passed ? "Voltar à trilha" : "Tentar novamente"}
      />
    );
  }

  return (
    <article className="focus-page quiz-shell">
      <QuizHeader
        current={currentIndex + 1}
        total={questions.length}
        closeHref="/trilhas"
      />

      <QuizBreadcrumb
        phaseName={`Fase ${module.phase} · ${module.phaseName}`}
        moduleTitle={module.title}
      />

      <QuizStepper
        total={questions.length}
        currentIndex={currentIndex}
      />

      <QuizQuestion
        question={currentQ}
        selectedIndex={selectedIndex}
        isChecked={isChecked}
        onSelectOption={handleSelectOption}
      />

      <footer className="focus-footer">
        <QuizFeedbackPanel
          isChecked={isChecked}
          isCorrect={selectedIndex === currentQ.correct}
          tip={currentQ.tip}
        />

        {isChecked && (
          <div className="quiz-actions" style={{ marginTop: 12 }}>
            <Button variant="primary" onClick={handleNext} id="quizAction">
              {currentIndex === questions.length - 1 ? "Ver resultado" : "Próxima"}
            </Button>
          </div>
        )}
      </footer>
    </article>
  );
}
