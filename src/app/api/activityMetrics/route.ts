import dbConnect from "@/lib/dbConnect";
import ActivityMetric from "@/models/ActivityMetric";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const data = await ActivityMetric.find({}).sort({ timestamp: 1 }).limit(10);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
