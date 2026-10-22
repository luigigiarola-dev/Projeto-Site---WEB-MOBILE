export default function QuizStepper({ total = 3, currentIndex = 0 }) {
  const steps = Array.from({ length: total }, (_, i) => i);

  return (
    <ol className="stepper" id="quizStepper">
      {steps.map((s) => {
        let className = "";
        if (s < currentIndex) className = "done";
        else if (s === currentIndex) className = "current";

        return <li key={s} className={className} />;
      })}
    </ol>
  );
}
