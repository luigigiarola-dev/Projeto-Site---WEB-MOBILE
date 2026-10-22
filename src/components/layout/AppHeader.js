"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";

export default function AppHeader() {
  const pathname = usePathname();
  const { openProfile, name } = useApp();

  const isHome = pathname === "/";
  const isTrilhas = pathname.startsWith("/trilhas");
  const isSimulador = pathname.startsWith("/simulador");

  return (
    <header className="app-header">
      <Link href="/" className="brand" aria-label="FinEdu, página inicial">
        <span className="brand-mark">₣</span>
        FinEdu
      </Link>

      <nav className="top-nav" aria-label="Navegação principal">
        <Link href="/" className={isHome ? "active" : ""}>
          Início
        </Link>
        <Link href="/trilhas" className={isTrilhas ? "active" : ""}>
          Trilhas
        </Link>
        <Link href="/simulador" className={isSimulador ? "active" : ""}>
          Simulador
        </Link>
      </nav>

      <section className="header-stats">
        <button
          className="profile-button"
          onClick={openProfile}
          title={name ? `Perfil de ${name}` : "Abrir perfil"}
          type="button"
          aria-label="Abrir perfil"
        >
          <span className="avatar">👤</span>
        </button>
      </section>
    </header>
  );
}
