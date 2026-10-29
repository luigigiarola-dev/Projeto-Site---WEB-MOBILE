"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getUserLevel, getProgressPercentage } from "@/lib/calculations";

const STORAGE_KEY = "finanedu-progress-v1";

const defaultState = {
  name: "",
  goals: [],
  completed: [],
  results: {},
};

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, setState] = useState(defaultState);
  const [modules, setModules] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isGoalOpen, setIsGoalOpen] = useState(false);

  // Carrega lista de módulos da API
  useEffect(() => {
    fetch("/api/modules")
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao carregar módulos");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) setModules(data);
      })
      .catch((err) => console.error("Erro no fetch de modules:", err));
  }, []);

  // Carrega estado do localStorage na montagem
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setState({
          ...defaultState,
          ...parsed,
          goals: Array.isArray(parsed.goals) ? parsed.goals : [],
          completed: Array.isArray(parsed.completed) ? parsed.completed : [],
          results: parsed.results || {},
        });
      }
    } catch (e) {
      console.warn("Erro ao carregar dados do localStorage:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Salva no localStorage quando o estado mudar
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn("Erro ao salvar no localStorage:", e);
    }
  }, [state, isLoaded]);

  const showToast = (message) => {
    setToastMessage(message);
    setIsToastVisible(true);
    setTimeout(() => {
      setIsToastVisible(false);
    }, 3300);
  };

  const saveName = (newName) => {
    setState((prev) => ({ ...prev, name: newName.trim() }));
    showToast(newName.trim() ? `Perfil salvo, ${newName.trim()}!` : "Perfil atualizado.");
  };

  const addGoal = ({ title, note, date }) => {
    if (!title.trim()) return;
    const newGoal = {
      id: Date.now().toString(),
      title: title.trim(),
      note: note.trim(),
      date,
    };
    setState((prev) => ({ ...prev, goals: [...prev.goals, newGoal] }));
    showToast("Nova meta adicionada!");
  };

  const removeGoal = (idOrIndex) => {
    setState((prev) => ({
      ...prev,
      goals: prev.goals.filter((g, index) => g.id !== idOrIndex && index !== idOrIndex),
    }));
    showToast("Meta removida.");
  };

  const completeModule = (moduleId, score = 3) => {
    const passed = score >= 2;
    setState((prev) => {
      const alreadyDone = prev.completed.includes(moduleId);
      const newCompleted = passed && !alreadyDone
        ? [...prev.completed, moduleId].sort((a, b) => {
            return (
              modules.findIndex((m) => m.id === a) -
              modules.findIndex((m) => m.id === b)
            );
          })
        : prev.completed;

      return {
        ...prev,
        completed: newCompleted,
        results: {
          ...prev.results,
          [moduleId]: {
            score,
            total: 3,
            passed,
            updatedAt: new Date().toISOString(),
          },
        },
      };
    });
  };

  const totalModules = modules.length || 6;
  const progressPercent = getProgressPercentage(state.completed.length, totalModules);
  const userLevel = getUserLevel(state.completed.length, totalModules);

  return (
    <AppContext.Provider
      value={{
        ...state,
        modules,
        isLoaded,
        progressPercent,
        userLevel,
        totalModules,
        saveName,
        addGoal,
        removeGoal,
        completeModule,
        showToast,
        toastMessage,
        isToastVisible,
        isProfileOpen,
        openProfile: () => setIsProfileOpen(true),
        closeProfile: () => setIsProfileOpen(false),
        isGoalOpen,
        openGoal: () => setIsGoalOpen(true),
        closeGoal: () => setIsGoalOpen(false),
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
