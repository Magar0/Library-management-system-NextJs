import Image from "next/image";
import React from "react";
import BookCover from "./BookCover";
import BorrowBtn from "./BorrowBtn";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

interface Props extends Book {
  userId: string;
}
const BookOverview = async ({
  title,
  author,
  genre,
  rating,
  totalCopies,
  availableCopies,
  description,
  coverColor,
  coverUrl,
  id: bookId,
  userId,
}: Props) => {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  const borrowEligibility = {
    isEligible: availableCopies > 0 && user?.status === "APPROVED",
    message:
      availableCopies < 1
        ? "Book is not available now"
        : "You are not eligible to borrow this book",
  };

  // console.log({ userId });

  return (
    <section className="book-overview">
      <div className="flex flex-1 flex-col gap-5">
        <h1>{title}</h1>
        <div className="book-info">
          <p>
            By <span className="font-semibold text-light-200">{author}</span>
          </p>
          <p>
            Category{" "}
            <span className="font-semibold text-light-200">{genre}</span>
          </p>

          <div className="flex flex-row gap-1">
            <Image src="/icons/star.svg" alt="star" width={22} height={22} />
            <p>{rating}</p>
          </div>
        </div>

        <div className="book-copies">
          <p>
            Total Books:<span>{totalCopies}</span>
          </p>
          <p>
            Available Books:<span>{availableCopies}</span>
          </p>
        </div>
        <p className="book-description">{description}</p>
        {user && (
          <BorrowBtn
            bookId={bookId}
            userId={userId}
            borrowingEligibility={borrowEligibility}
          />
        )}
      </div>
      <div className="relative flex flex-1 justify-center">
        <Link className="relative" href={`/books/${bookId}`}>
          <BookCover
            variant="wide"
            className="z-10"
            coverColor={coverColor}
            coverImage={coverUrl}
          />
          <div className="absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden">
            <BookCover
              variant="wide"
              coverColor={coverColor}
              coverImage={coverUrl}
            />
          </div>
        </Link>
      </div>
    </section>
  );
};

export default BookOverview;
