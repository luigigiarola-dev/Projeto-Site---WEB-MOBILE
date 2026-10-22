"use client";

import { useState, useMemo } from "react";
import { useApp } from "@/context/AppContext";
import { calculateSimulation } from "@/lib/calculations";
import SimulatorHeader from "@/components/features/simulador/SimulatorHeader";
import SimulationForm from "@/components/features/simulador/SimulationForm";
import SimulationResultCard from "@/components/features/simulador/SimulationResultCard";

export default function SimuladorPage() {
  const { showToast } = useApp();

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
    return calculateSimulation(params);
  }, [params]);

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
