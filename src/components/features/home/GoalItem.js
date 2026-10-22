"use client";

import { formatDate } from "@/lib/calculations";

export default function GoalItem({ goal, onRemove }) {
  return (
    <li>
      <span>
        <strong>{goal.title}</strong>
        <p>{goal.note || "Sem anotação"}</p>
        <time>{formatDate(goal.date)}</time>
      </span>
      <button
        className="remove-goal"
        type="button"
        onClick={onRemove}
        aria-label={`Excluir meta: ${goal.title}`}
      >
        ×
      </button>
    </li>
  );
}
