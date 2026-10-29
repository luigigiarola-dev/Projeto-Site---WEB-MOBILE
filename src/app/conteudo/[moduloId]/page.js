import ConteudoClient from "@/components/features/conteudo/ConteudoClient";

export async function generateStaticParams() {
  return [
    { moduloId: "m1" },
    { moduloId: "m2" },
    { moduloId: "m3" },
    { moduloId: "m4" },
    { moduloId: "m5" },
    { moduloId: "m6" },
  ];
}

export async function generateMetadata({ params }) {
  const { moduloId } = await params;
  return {
    title: `Aula: Módulo ${moduloId?.toUpperCase?.() || ""} — FinEdu`,
    description: `Aprenda sobre finanças no módulo ${moduloId} da trilha FinEdu.`,
  };
}

export default async function ConteudoPage({ params }) {
  const { moduloId } = await params;

  return <ConteudoClient moduloId={moduloId} />;
}
