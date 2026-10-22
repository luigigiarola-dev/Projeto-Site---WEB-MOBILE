import { Suspense } from "react";
import { DM_Sans, Fredoka } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import AppHeader from "@/components/layout/AppHeader";
import MobileNav from "@/components/layout/MobileNav";
import AppFooter from "@/components/layout/AppFooter";
import ProfileModal from "@/components/layout/ProfileModal";
import GoalModal from "@/components/layout/GoalModal";
import ToastNotification from "@/components/layout/ToastNotification";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-dm-sans",
  display: "swap",
});

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-fredoka",
  display: "swap",
});

export const viewport = {
  themeColor: "#5b3df5",
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: "FinEdu — Educação Financeira Prática",
  description:
    "Aprenda a investir de forma prática, gamificada e sem risco. Conquiste sua autonomia financeira com módulos estilo Duolingo e simulador interativo.",
  openGraph: {
    title: "FinEdu — Educação Financeira Prática",
    description: "Plataforma gamificada para aprender investimentos e finanças pessoais.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${dmSans.variable} ${fredoka.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <AppProvider>
          <Suspense fallback={<header className="app-header" />}>
            <AppHeader />
          </Suspense>
          <main>{children}</main>
          <Suspense fallback={null}>
            <MobileNav />
          </Suspense>
          <AppFooter />
          <ProfileModal />
          <GoalModal />
          <ToastNotification />
        </AppProvider>
      </body>
    </html>
  );
}
