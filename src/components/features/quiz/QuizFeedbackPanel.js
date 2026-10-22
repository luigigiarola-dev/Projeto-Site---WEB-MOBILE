"use client";

export default function QuizFeedbackPanel({ isChecked, isCorrect, tip }) {
  if (!isChecked) return <p className="feedback" id="feedback" />;

  const statusClass = isCorrect ? "correct" : "wrong";
  const prefix = isCorrect ? "Correto! " : "Não é essa. ";

  return (
    <p className={`feedback show ${statusClass}`} id="feedback">
      {prefix}
      {tip}
    </p>
  );
}
