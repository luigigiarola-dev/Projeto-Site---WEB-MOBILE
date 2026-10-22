import Button from "@/components/ui/Button";

export default function FocusFooter({ quizHref, label = "Continuar para o quiz" }) {
  return (
    <footer className="focus-footer">
      <Button href={quizHref} variant="primary" id="continueQuiz">
        {label}
      </Button>
    </footer>
  );
}
