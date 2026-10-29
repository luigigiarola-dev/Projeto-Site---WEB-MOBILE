import quizzesData from "@/data/quizzes.json";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const moduloId = searchParams.get("moduloId");

  if (moduloId) {
    const quiz = quizzesData[moduloId];
    if (!quiz) {
      return Response.json({ error: "Quiz não encontrado" }, { status: 404 });
    }
    return Response.json(quiz);
  }

  return Response.json(quizzesData);
}

