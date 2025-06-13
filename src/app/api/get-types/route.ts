import { NextResponse } from "next/server";
import types from "@/data/carTypes.json"

export async function GET() {
    return NextResponse.json(types)
}