import { getNutritions } from "@/actions/nutritions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const result = await getNutritions(body);
  return NextResponse.json(result);
}