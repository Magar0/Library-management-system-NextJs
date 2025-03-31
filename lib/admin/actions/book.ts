"use server";

import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { desc, eq, sql } from "drizzle-orm";

export const createBook = async (params: BookParams) => {
  try {
    console.log({ params });
    const newBook = await db
      .insert(books)
      .values({
        ...params,
        availableCopies: params.totalCopies,
      })
      .returning();
    return {
      success: true,
      data: JSON.parse(JSON.stringify(newBook[0])),
    };
  } catch (error) {
    console.log("Create book error:", error);
    return {
      success: false,
      message: "An error occurred while creating the book",
    };
  }
};

export const updateBook = async (id: string, params: BookParams) => {
  try {
    const updatedBook = await db
      .update(books)
      .set({
        ...params,
        availableCopies: params.totalCopies,
      })
      .where(eq(books.id, id))
      .returning();
    return {
      success: true,
      data: JSON.parse(JSON.stringify(updatedBook[0])),
    };
  } catch (error) {
    console.log("Update book error:", error);
    return {
      success: false,
      message: "An error occurred while creating the book",
    };
  }
};

export const deleteBook = async (id: string) => {
  try {
    const response = await db.delete(books).where(eq(books.id, id)).returning();
    return {
      success: true,
      data: JSON.parse(JSON.stringify(response[0])),
    };
  } catch (error) {
    console.log("Delete book error:", error);
    return {
      success: false,
      message: "An error occurred while deleting the book",
    };
  }
};

export const getBooks = async ({
  pageNo,
  pageSize,
  sort,
}: {
  pageNo: number;
  pageSize: number;
  sort: string;
}) => {
  try {
    const sorting =
      sort === "name=asc"
        ? books.title
        : sort === "name=desc"
          ? desc(books.title)
          : desc(books.createdAt);

    if (isNaN(pageSize) || isNaN(pageNo) || pageNo < 1 || pageSize < 5) {
      return {
        success: false,
        message: "An error occurred while fetching the book",
      };
    }
    // fetch all users
    const bookData = await db
      .select({
        id: books.id,
        title: books.title,
        author: books.author,
        genre: books.genre,
        createdAt: books.createdAt,
        coverUrl: books.coverUrl,
        totalCount: sql<number>`COUNT(*) OVER()`,
      })
      .from(books)
      .limit(pageSize)
      .offset((pageNo - 1) * pageSize)
      .orderBy(sorting);

    return {
      success: true,
      data: JSON.parse(JSON.stringify(bookData)),
    };
  } catch (error) {
    console.log("Get books error:", error);
    return {
      success: false,
      message: "An error occurred while fetching the books",
    };
  }
};
