"use client";

import { useApp } from "@/context/AppContext";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import GoalItem from "./GoalItem";
import EmptyGoalsState from "./EmptyGoalsState";

export default function GoalsSection() {
  const { goals, removeGoal, openGoal } = useApp();

  return (
    <Card className="goals-section" aria-labelledby="goalsTitle" as="section">
      <header className="section-heading">
        <span>
          <h2 id="goalsTitle">Suas metas</h2>
          <p>Crie metas que façam sentido para você.</p>
        </span>
        <Button variant="text" onClick={openGoal}>
          + adicionar meta
        </Button>
      </header>

      {goals.length === 0 ? (
        <EmptyGoalsState />
      ) : (
        <ul className="goal-list">
          {goals.map((goal, index) => (
            <GoalItem
              key={goal.id || index}
              goal={goal}
              onRemove={() => removeGoal(goal.id || index)}
            />
          ))}
        </ul>
      )}
    </Card>
  );
}
