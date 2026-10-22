"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";
import modulesData from "@/data/modules.json";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import PhaseFilterBar from "./PhaseFilterBar";
import TrailNodeCard from "./TrailNodeCard";

export default function TrailMap() {
  const [activePhase, setActivePhase] = useState("all");
  const { completed } = useApp();

  const filteredModules = modulesData.filter((m) => {
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
              const originalIndex = modulesData.findIndex((mod) => mod.id === m.id);
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
