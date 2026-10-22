"use client";

import AnswerGroup from "./AnswerGroup";

export default function QuizQuestion({
  question,
  selectedIndex,
  isChecked,
  onSelectOption,
}) {
  if (!question) return null;

  return (
    <section className="quiz-question">
      <p className="eyebrow">Quiz rápido</p>
      <h1 id="quizTitle">{question.q}</h1>

      <AnswerGroup
        options={question.options}
        correctIndex={question.correct}
        selectedIndex={selectedIndex}
        isChecked={isChecked}
        onSelectOption={onSelectOption}
      />
    </section>
  );
}
