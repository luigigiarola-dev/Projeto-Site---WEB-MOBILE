"use client";

import { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";

export default function ProfileModal() {
  const { isProfileOpen, closeProfile, name, saveName, completed, totalModules, progressPercent } = useApp();
  const [tempName, setTempName] = useState(name);

  useEffect(() => {
    setTempName(name);
  }, [name, isProfileOpen]);

  if (!isProfileOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    saveName(tempName);
    closeProfile();
  };

  return (
    <div className="modal-backdrop" onClick={closeProfile}>
      <dialog open className="dialog-visible" onClick={(e) => e.stopPropagation()}>
        <article>
          <p className="eyebrow">Seu perfil</p>
          <h2 id="profileTitle">
            {name ? `${name}, sua jornada está em movimento!` : "Personalize sua jornada"}
          </h2>
          <p id="profileCompleted">
            {completed.length > 0
              ? `${completed.length} de ${totalModules} aulas concluídas (${progressPercent}%).`
              : "Nenhuma aula concluída ainda."}
          </p>

          <form onSubmit={handleSubmit}>
            <label>
              <span>Como você gostaria de ser chamado?</span>
              <input
                type="text"
                maxLength={40}
                autoComplete="name"
                placeholder="Seu nome"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                autoFocus
              />
            </label>
            <button className="primary-button" type="submit">
              Salvar perfil
            </button>
            <button className="text-button" type="button" onClick={closeProfile}>
              Fechar
            </button>
          </form>
        </article>
      </dialog>
    </div>
  );
}
