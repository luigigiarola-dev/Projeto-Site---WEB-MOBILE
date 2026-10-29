import marketRates from "@/data/marketRates.json";

export async function GET() {
  return Response.json(marketRates);
}

