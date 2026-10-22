"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileNav() {
  const pathname = usePathname();

  // Oculta a navegação móvel em páginas de foco (aula ou quiz) se desejado
  const isFocusMode = pathname.startsWith("/conteudo") || pathname.startsWith("/quiz");
  if (isFocusMode) return null;

  const isHome = pathname === "/";
  const isTrilhas = pathname.startsWith("/trilhas");
  const isSimulador = pathname.startsWith("/simulador");

  return (
    <nav className="mobile-nav" aria-label="Navegação móvel">
      <Link href="/" className={isHome ? "active" : ""}>
        <span>⌂</span>
        Início
      </Link>
      <Link href="/trilhas" className={isTrilhas ? "active" : ""}>
        <span>◌</span>
        Trilhas
      </Link>
      <Link href="/simulador" className={isSimulador ? "active" : ""}>
        <span>⌁</span>
        Simulador
      </Link>
    </nav>
  );
}
