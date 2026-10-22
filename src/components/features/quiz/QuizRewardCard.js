"use client";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function QuizRewardCard({
  score,
  total = 3,
  passed,
  onPrimaryAction,
  primaryActionLabel,
}) {
  return (
    <section className="focus-page reward" aria-labelledby="rewardTitle">
      <Card>
        <span className="confetti">{passed ? "✓" : "↺"}</span>
        <p className="eyebrow" id="rewardLabel">
          {passed ? "Resultado salvo" : "Tente novamente"}
        </p>
        <h1 id="rewardTitle">{passed ? "Aula concluída! 🎉" : "Revise e tente novamente"}</h1>
        <p id="rewardCopy">
          {passed
            ? "Parabéns! Você acertou a maioria das questões e liberou o próximo módulo."
            : "Você precisa acertar pelo menos 2 questões para avançar na trilha."}
        </p>

        <section className="reward-stats">
          <span>
            <small>Acertos</small>
            <strong id="scoreRate">
              {score} de {total}
            </strong>
          </span>
        </section>

        <Button variant="primary" onClick={onPrimaryAction} id="rewardAction">
          {primaryActionLabel || (passed ? "Voltar à trilha" : "Tentar novamente")}
        </Button>
      </Card>
    </section>
  );
}
