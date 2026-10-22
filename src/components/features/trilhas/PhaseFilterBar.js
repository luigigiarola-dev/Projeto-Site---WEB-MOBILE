"use client";

export default function PhaseFilterBar({ activePhase, onSelectPhase }) {
  const filters = [
    { id: "all", label: "Toda a trilha" },
    { id: "1", label: "Fase 1 · Fundamentos" },
    { id: "2", label: "Fase 2 · Planejamento" },
    { id: "3", label: "Fase 3 · Estratégia" },
  ];

  return (
    <nav className="phase-filters" aria-label="Filtrar fase da trilha">
      {filters.map((f) => (
        <button
          key={f.id}
          type="button"
          className={activePhase === f.id ? "active" : ""}
          onClick={() => onSelectPhase(f.id)}
        >
          {f.label}
        </button>
      ))}
    </nav>
  );
}
