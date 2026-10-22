"use client";

import Link from "next/link";
import { useApp } from "@/context/AppContext";

export default function TrailNodeCard({ module, index, isCompleted, isCurrent, isLocked }) {
  const { showToast } = useApp();

  let statusClass = "locked";
  let icon = "🔒";

  if (isCompleted) {
    statusClass = "completed";
    icon = "✓";
  } else if (isCurrent) {
    statusClass = "current";
    icon = module.icon;
  } else if (!isLocked) {
    statusClass = "available";
    icon = module.icon;
  }

  const handleLockedClick = (e) => {
    if (isLocked) {
      e.preventDefault();
      showToast("Conclua a etapa anterior para desbloquear este módulo.");
    }
  };

  const content = (
    <button
      className={`node ${statusClass}`}
      disabled={isLocked}
      type="button"
      onClick={isLocked ? handleLockedClick : undefined}
    >
      <span className="node-core">{icon}</span>
      <small>{module.title}</small>
    </button>
  );

  return (
    <li>
      {isLocked ? (
        content
      ) : (
        <Link href={`/conteudo/${module.id}`} style={{ textDecoration: "none" }}>
          {content}
        </Link>
      )}
    </li>
  );
}
