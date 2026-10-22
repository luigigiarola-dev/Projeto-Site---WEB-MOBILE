import Link from "next/link";
import ProgressBar from "@/components/ui/ProgressBar";

export default function FocusHeader({ step = 1, totalSteps = 6, closeHref = "/trilhas" }) {
  const percentage = Math.round((step / totalSteps) * 100);

  return (
    <header className="focus-top">
      <Link href={closeHref} className="icon-close" aria-label="Voltar para trilhas">
        ×
      </Link>
      <ProgressBar value={percentage} />
      <span className="focus-step">
        Aula {step} de {totalSteps}
      </span>
    </header>
  );
}
