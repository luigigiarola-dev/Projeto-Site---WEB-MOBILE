import modulesData from "@/data/modules.json";

export async function GET() {
  return Response.json(modulesData);
}

