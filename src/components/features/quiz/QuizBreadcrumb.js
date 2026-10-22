export default function QuizBreadcrumb({ phaseName, moduleTitle }) {
  return (
    <ol className="breadcrumb">
      <li id="quizPhase">{phaseName}</li>
      <li id="quizModule">{moduleTitle}</li>
      <li>Quiz rápido</li>
    </ol>
  );
}
