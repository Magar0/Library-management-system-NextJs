import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const pageSize = Number(searchParams.get("pageSize") || 10);
    const pageNo = Number(searchParams.get("pageNo") || 1);

    if (isNaN(pageSize) || isNaN(pageNo) || pageNo < 1 || pageSize < 5) {
      return NextResponse.json(
        {
          message: "Invalid pagination parameters",
        },
        { status: 400 },
      );
    }

    const data = await db
      .select()
      .from(books)
      .limit(pageSize)
      .offset((pageNo - 1) * pageSize)
      .orderBy(books.createdAt);
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.log("Error while fetcing books:", err);
    return NextResponse.json(
      { message: "Something went wrong. Please try again later.", error: err },
      { status: 500 },
    );
  }
}
