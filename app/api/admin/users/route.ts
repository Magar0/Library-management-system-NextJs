import { db } from "@/database/drizzle";
import { borrowRecords, users } from "@/database/schema";
import { and, desc, eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

// Define the response type
// interface PaginatedResponse {
//   data: User[];
//   totalPages: number;
//   currentPage: number;
//   pageSize: number;
//   totalCount: number;
// }

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const pageSize = Number(searchParams.get("pageSize") || 5);
    const pageNo = Number(searchParams.get("pageNo") || 1);
    const sort = searchParams.get("sort");
    const sorting =
      sort === "name=asc"
        ? users.fullName
        : sort === "name=desc"
          ? desc(users.fullName)
          : desc(users.createdAt);

    if (isNaN(pageSize) || isNaN(pageNo) || pageNo < 1 || pageSize < 5) {
      return NextResponse.json(
        {
          message: "Invalid pagination parameters",
        },
        { status: 400 },
      );
    }
    // fetch all users
    const usersData = await db
      .select({
        id: users.id,
        fullName: users.fullName,
        email: users.email,
        universityId: users.universityId,
        password: users.password,
        universityCard: users.universityCard,
        status: users.status,
        role: users.role,
        lastActivityDate: users.lastActivityDate,
        createdAt: users.createdAt,
        totalCount: sql<number>`COUNT(*) OVER()`,
      })
      .from(users)
      .limit(pageSize)
      .offset((pageNo - 1) * pageSize)
      .orderBy(sorting);

    // fetch no of books borrowed for each user
    const usersWithBorrowedBooks = await Promise.all(
      usersData.map(async (user) => {
        const borrowedBooksCount = await db
          .select({ count: sql<number>`COUNT(*)` })
          .from(borrowRecords)
          .where(
            and(
              eq(borrowRecords.userId, user.id),
              eq(borrowRecords.status, "BORROWED"),
            ),
          );
        return { ...user, borrowedBooksCount: +borrowedBooksCount[0].count };
      }),
    );

    // Send response to the frontend
    return NextResponse.json(usersWithBorrowedBooks, { status: 200 });
  } catch (err) {
    console.log("Error while fetcing user:", err);
    return NextResponse.json(
      { message: "Something went wrong. Please try again later.", error: err },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const {
    id,
    fullName,
    email,
    universityId,
    password,
    universityCard,
    status,
    role,
  } = body;

  if (!id) {
    // in case ID not present
    return NextResponse.json(
      { message: "User ID is required." },
      { status: 400 },
    );
  }
  try {
    await db
      .update(users)
      .set({
        fullName,
        email,
        universityCard,
        password,
        universityId,
        status,
        role,
      })
      .where(eq(users.id, id));
  } catch (error) {
    console.log("Error while updating user");
    return NextResponse.json(
      { message: "Something went wrong. Please try again later.", error },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    if (!userId) {
      return NextResponse.json(
        {
          message: "User ID is required",
        },
        { status: 400 },
      );
    }
    const response = await db
      .delete(users)
      .where(eq(users.id, userId))
      .returning();

    if (!response[0])
      return NextResponse.json(
        { message: "Error Deleting User" },
        { status: 400 },
      );
    return NextResponse.json({ message: "User Deleted" }, { status: 200 });
  } catch (error) {
    console.log("Error while fetcing user:", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again later.", error },
      { status: 500 },
    );
  }
}
