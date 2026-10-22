import Link from "next/link";
import ProgressBar from "@/components/ui/ProgressBar";

export default function QuizHeader({ current = 1, total = 3, closeHref = "/trilhas" }) {
  const percentage = Math.round(((current - 1) / total) * 100);

  return (
    <header className="focus-top">
      <Link href={closeHref} className="icon-close" aria-label="Sair do quiz">
        ×
      </Link>
      <ProgressBar value={percentage} id="quizMeter" />
      <span className="focus-step" id="quizPosition">
        {current}/{total}
      </span>
    </header>
  );
}
