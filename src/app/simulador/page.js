"use client";

import { useState, useEffect, useMemo } from "react";
import { useApp } from "@/context/AppContext";
import { calculateSimulation } from "@/lib/calculations";
import SimulatorHeader from "@/components/features/simulador/SimulatorHeader";
import SimulationForm from "@/components/features/simulador/SimulationForm";
import SimulationResultCard from "@/components/features/simulador/SimulationResultCard";

export default function SimuladorPage() {
  const { showToast } = useApp();
  const [rates, setRates] = useState(null);

  useEffect(() => {
    fetch("/api/market-rates")
      .then((res) => {
        if (!res.ok) throw new Error("Falha ao buscar taxas");
        return res.json();
      })
      .then((data) => setRates(data))
      .catch((err) => console.error("Erro no fetch de market-rates:", err));
  }, []);

  const [params, setParams] = useState({
    initial: 1000,
    monthly: 300,
    annualRate: 11.5,
    years: 5,
  });

  const handleChangeParam = (key, value) => {
    setParams((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const simulationResult = useMemo(() => {
    return calculateSimulation(params, rates);
  }, [params, rates]);

  const handleSubmit = () => {
    showToast("Projeção calculada com sucesso!");
  };

  return (
    <section className="page active" id="simulador" aria-labelledby="simTitle">
      <SimulatorHeader />

      <section className="calculator">
        <SimulationForm
          params={params}
          onChangeParam={handleChangeParam}
          onSubmit={handleSubmit}
        />

        <SimulationResultCard simulation={simulationResult} />
      </section>
    </section>
  );
}
