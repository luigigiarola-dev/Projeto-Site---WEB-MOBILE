"use client";

import { useApp } from "@/context/AppContext";
import Badge from "@/components/ui/Badge";

export default function TrailHeader() {
  const { userLevel } = useApp();

  return (
    <header className="intro">
      <span>
        <span className="eyebrow">Seu caminho</span>
        <h1 id="trailTitle">Sua trilha de evolução</h1>
        <p>Complete uma etapa por vez e veja o próximo passo se iluminar.</p>
      </span>
      <Badge variant="pill" id="trailLevel">
        🌱 {userLevel}
      </Badge>
    </header>
  );
}
