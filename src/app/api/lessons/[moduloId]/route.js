import lessonsData from "@/data/lessons.json";

export async function GET(request, context) {
  const { moduloId } = await context.params;
  const lesson = lessonsData[moduloId];

  if (!lesson) {
    return Response.json({ error: "Lição não encontrada" }, { status: 404 });
  }

  return Response.json(lesson);
}

