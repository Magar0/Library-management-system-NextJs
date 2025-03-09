"use client";

import Link from "next/link";
import React from "react";
import BookCover from "./BookCover";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import dayjs from "dayjs";

const BookCard = ({
  id,
  title,
  genre,
  coverColor,
  coverUrl,
  isLoanedBook = false,
  dueDate,
}: Book) => {
  const remainingDays = dueDate ? dayjs(dueDate).diff(dayjs(), "day") : null;

  return (
    <li className={cn(isLoanedBook && "w-full xs:w-52")}>
      <Link
        href={`/books/${id}`}
        className={cn(isLoanedBook && "flex w-full flex-col items-center")}
      >
        <BookCover coverColor={coverColor} coverImage={coverUrl} />
        <div className={cn("mt-4", !isLoanedBook && "max-w-28 xs:max-w-40")}>
          <p className="book-title">{title}</p>
          <p className="book-genre">{genre}</p>
        </div>
      </Link>
      {isLoanedBook && (
        <div className="mt-3 w-full">
          <div className="book-loaned">
            <Image
              src="/icons/calendar.svg"
              alt="calendar"
              width={18}
              height={18}
              className="object-contain"
            />
            <p className="tex text-lime-100">
              {" "}
              {remainingDays} days left to return
            </p>
          </div>
          <Button
            className="mt-3 min-h-14 w-full bg-dark-600 font-bebas-neue text-base text-white"
            onClick={() => "Receipt download clicked"}
          >
            Download receipt
          </Button>
        </div>
      )}
    </li>
  );
};

export default BookCard;
