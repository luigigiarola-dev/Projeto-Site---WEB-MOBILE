"use client";

import { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";

export default function HomeHero() {
  const { name } = useApp();
  const [todayLabel, setTodayLabel] = useState("Hoje");

  useEffect(() => {
    try {
      const formatted = new Intl.DateTimeFormat("pt-BR", {
        weekday: "short",
        day: "numeric",
        month: "short",
      }).format(new Date());
      setTodayLabel(formatted);
    } catch {}
  }, []);

  return (
    <header className="intro">
      <span>
        <span className="eyebrow">Sua jornada financeira</span>
        <h1 id="homeTitle">
          {name ? `Olá, ${name}! Pronto para estudar? ✨` : "Seu próximo passo começa aqui ✨"}
        </h1>
        <p>Pequenas decisões de hoje constroem uma vida financeira mais leve amanhã.</p>
      </span>
      <span className="date-pill">
        📅 <span>{todayLabel}</span>
      </span>
    </header>
  );
}
