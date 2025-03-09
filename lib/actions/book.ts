"use server";

import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { and, eq } from "drizzle-orm";
import dayjs from "dayjs";

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
