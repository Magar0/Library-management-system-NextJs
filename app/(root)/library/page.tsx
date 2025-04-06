import { auth } from "@/auth";
import InfiniteScrollWrapper from "@/components/shared/InfiniteScrollWrapper";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { desc, sql } from "drizzle-orm";
// import { db } from "@/database/drizzle";
// import { users } from "@/database/schema";

export interface IBook extends Book {
  total: number;
}
const Page = async () => {
  const session = await auth();
  if (!session?.user?.id) return null;
  //   const page = Number((await searchParams)?.page) || 1;
  const limit = 12;

  const allBooks = (await db
    .select({
      id: books.id,
      title: books.title,
      author: books.author,
      genre: books.genre,
      rating: books.rating,
      coverUrl: books.coverUrl,
      coverColor: books.coverColor,
      description: books.description,
      totalCopies: books.totalCopies,
      availableCopies: books.availableCopies,
      videoUrl: books.videoUrl,
      createdAt: books.createdAt,
      summary: books.summary,
      total: sql<number>`COUNT (*) OVER()`,
    })
    .from(books)
    .limit(20)
    .orderBy(desc(books.createdAt))) as IBook[];
  return (
    <InfiniteScrollWrapper
      totalBooks={allBooks[0]?.total || 0}
      initialBooks={allBooks}
      limit={limit}
    />
  );
};

export default Page;
