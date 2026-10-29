"use client";

import { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import PhaseFilterBar from "./PhaseFilterBar";
import TrailNodeCard from "./TrailNodeCard";

export default function TrailMap() {
  const [activePhase, setActivePhase] = useState("all");
  const { completed, modules: contextModules } = useApp();
  const [modules, setModules] = useState(contextModules || []);

  useEffect(() => {
    if (contextModules && contextModules.length > 0) {
      setModules(contextModules);
      return;
    }
    fetch("/api/modules")
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao carregar módulos");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) setModules(data);
      })
      .catch((err) => console.error("Erro no fetch de modules:", err));
  }, [contextModules]);

  const filteredModules = modules.filter((m) => {
    return activePhase === "all" || m.phase === Number(activePhase);
  });

  return (
    <>
      <PhaseFilterBar activePhase={activePhase} onSelectPhase={setActivePhase} />

      <section className="trail-layout">
        <Card className="map-card" as="article">
          <header className="section-heading">
            <span>
              <h2>Mapa de quizzes</h2>
              <p>Toque na próxima etapa colorida para iniciar os estudos e o quiz rápido.</p>
            </span>
            <Badge variant="tag">3 perguntas por etapa</Badge>
          </header>

          <ol className="path-map" aria-label="Mapa de módulos">
            {filteredModules.map((m) => {
              const originalIndex = modules.findIndex((mod) => mod.id === m.id);
              const isCompleted = completed.includes(m.id);
              const isCurrent = originalIndex === completed.length;
              const isLocked = originalIndex > completed.length;

              return (
                <TrailNodeCard
                  key={m.id}
                  module={m}
                  index={originalIndex}
                  isCompleted={isCompleted}
                  isCurrent={isCurrent}
                  isLocked={isLocked}
                />
              );
            })}
          </ol>
        </Card>
      </section>
    </>
  );
}
