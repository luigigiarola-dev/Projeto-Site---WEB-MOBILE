import lessonsData from "@/data/lessons.json";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const lesson = lessonsData[id];
    if (!lesson) {
      return Response.json({ error: "Lição não encontrada" }, { status: 404 });
    }
    return Response.json(lesson);
  }

  return Response.json(lessonsData);
}

