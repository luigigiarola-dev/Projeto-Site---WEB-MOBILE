"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";

export default function GoalModal() {
  const { isGoalOpen, closeGoal, addGoal } = useApp();
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");

  if (!isGoalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addGoal({ title, note, date });
    setTitle("");
    setNote("");
    setDate("");
    closeGoal();
  };

  return (
    <div className="modal-backdrop" onClick={closeGoal}>
      <dialog open className="dialog-visible" onClick={(e) => e.stopPropagation()}>
        <article>
          <p className="eyebrow">Nova anotação</p>
          <h2>Registre uma meta</h2>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Título</span>
              <input
                type="text"
                maxLength={70}
                required
                placeholder="Ex.: Reserva de emergência"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
              />
            </label>

            <label>
              <span>Anotação</span>
              <input
                type="text"
                maxLength={130}
                required
                placeholder="Ex.: Guardar uma parte do que recebo"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </label>

            <label>
              <span>Data desejada</span>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>

            <button className="primary-button" type="submit">
              Adicionar anotação
            </button>
            <button className="text-button" type="button" onClick={closeGoal}>
              Cancelar
            </button>
          </form>
        </article>
      </dialog>
    </div>
  );
}
