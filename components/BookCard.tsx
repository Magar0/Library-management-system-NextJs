"use client";

import Link from "next/link";
import React from "react";
import BookCover from "./BookCover";
import { cn } from "@/lib/utils";
import Image from "next/image";
import dayjs from "dayjs";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoiceDocument from "./InvoiceDocument";

interface Props extends Book {
  username?: string;
}
const BookCard = ({
  id,
  title,
  genre,
  coverColor,
  coverUrl,
  isLoanedBook = false,
  dueDate,
  username,
}: Props) => {
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
          <div className="book-loaned mb-3">
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
          <PDFDownloadLink
            document={
              <InvoiceDocument
                title={title}
                dueDate={dueDate || ""}
                username={username || ""}
              />
            }
            className="min-h-14 w-full cursor-pointer rounded-md bg-dark-600 px-3 py-2 font-bebas-neue text-base text-white"
            // onClick={() => "Receipt download clicked"}
            fileName="receipt.pdf"
          >
            {({ loading }) =>
              loading ? "Loading document..." : "Download Receipt"
            }
          </PDFDownloadLink>
        </div>
      )}
    </li>
  );
};

export default BookCard;
