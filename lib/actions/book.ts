"use server";

import { db } from "@/database/drizzle";
import { books, borrowRecords, users } from "@/database/schema";
import { and, desc, eq, sql } from "drizzle-orm";
import dayjs from "dayjs";

interface RecordParams {
  pageNo: number;
  pageSize: number;
  sort: string;
}

export const borrowBook = async (params: BorrowBookParams) => {
  const { userId, bookId } = params;
  try {
    // Check if the user has already borrowed the book and has not returned it
    const existingBorrow = await db
      .select()
      .from(borrowRecords)
      .where(
        and(
          eq(borrowRecords.userId, userId),
          eq(borrowRecords.bookId, bookId),
          eq(borrowRecords.status, "BORROWED"),
        ),
      )
      .limit(1);

    if (existingBorrow.length) {
      return {
        success: false,
        error: "You have already borrowed this book.",
      };
    }

    const book = await db
      .select({ availableCopies: books.availableCopies })
      .from(books)
      .where(eq(books.id, bookId))
      .limit(1);

    if (!book.length || book[0].availableCopies < 1) {
      return {
        success: false,
        error: "Book is not available for borrowing",
      };
    }
    const dueDate = dayjs().add(7, "day").toDate().toDateString();
    // add borrowed books to borrowed table
    const record = await db.insert(borrowRecords).values({
      userId,
      bookId,
      dueDate,
      status: "BORROWED",
    });

    // decrease available books
    await db
      .update(books)
      .set({ availableCopies: book[0].availableCopies - 1 })
      .where(eq(books.id, bookId));
    return {
      success: true,
      data: JSON.parse(JSON.stringify(record)),
    };
  } catch (error) {
    console.log("Decrease book error:", error);
    return {
      success: false,
      error: "An Error occured while borrowing",
    };
  }
};

export const getBorrowRecords = async (Params: RecordParams) => {
  try {
    const sorting =
      Params.sort === "name=asc"
        ? users.fullName
        : Params.sort === "name=desc"
          ? desc(users.fullName)
          : desc(users.createdAt);

    // joining multiple tables based on userId and bookId
    const response = await db
      .select({
        id: borrowRecords.id,
        userId: borrowRecords.userId,
        bookId: borrowRecords.bookId,
        borrowDate: borrowRecords.borrowDate,
        dueDate: borrowRecords.dueDate,
        returnDate: borrowRecords.returnDate,
        status: borrowRecords.status,
        userName: users.fullName,
        bookTitle: books.title,
        totalCount: sql<number>`count(*) over()`,
      })
      .from(borrowRecords)
      .leftJoin(users, eq(borrowRecords.userId, users.id))
      .leftJoin(books, eq(borrowRecords.bookId, books.id))
      .limit(Params.pageSize)
      .offset((Params.pageNo - 1) * Params.pageSize)
      .orderBy(sorting);

    // if there are no record
    if (!response.length) {
      return {
        success: false,
        error: "You have already borrowed this book.",
      };
    }
    return {
      success: true,
      data: JSON.parse(JSON.stringify(response)),
    };
  } catch (err) {
    return {
      success: false,
      error: err,
    };
  }
};

export const handleReturned = async (recordId: string, value: boolean) => {
  try {
    // updating value
    const returnDate = value ? new Date().toISOString().split("T")[0] : null;
    const status = value ? "RETURNED" : "BORROWED";

    const response = await db
      .update(borrowRecords)
      .set({ returnDate, status })
      .where(eq(borrowRecords.id, recordId))
      .returning();
    if (!response) {
      return {
        success: false,
        error: "Error updating",
      };
    }
    return {
      success: true,
      data: JSON.parse(JSON.stringify(response)),
    };
  } catch (err) {
    return {
      success: false,
      error: err,
    };
  }
};
