import { auth } from "@/auth";
import BookList from "@/components/BookList";
import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { eq, sql } from "drizzle-orm";
import React from "react";

const page = async () => {
  const session = await auth();

  if (!session?.user?.id) return null;

  const borrowedBooks = await db
    .select({
      id: books.id,
      title: books.title,
      author: books.author,
      availableCopies: books.availableCopies,
      coverColor: books.coverColor,
      coverUrl: books.coverUrl,
      createdAt: books.createdAt,
      description: books.description,
      genre: books.genre,
      rating: books.rating,
      totalCopies: books.totalCopies,
      videoUrl: books.videoUrl,
      summary: books.summary,
      dueDate: borrowRecords.dueDate,
      isLoanedBook: sql<boolean>`true`,
    })
    .from(borrowRecords)
    .where(eq(borrowRecords.userId, session?.user?.id as string))
    .innerJoin(books, eq(borrowRecords.bookId, books.id));

  return (
    <BookList
      title="Borrowed Books"
      books={borrowedBooks}
      username={session.user.name}
    />
  );
};

export default page;
