import quizzesData from "@/data/quizzes.json";

export async function GET(request, context) {
  const { moduloId } = await context.params;
  const quiz = quizzesData[moduloId];

  if (!quiz) {
    return Response.json({ error: "Quiz não encontrado" }, { status: 404 });
  }

  return Response.json(quiz);
}

