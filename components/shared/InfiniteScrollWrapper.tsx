"use client";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import BookList from "../BookList";

const InfiniteScrollWrapper = ({
  initialBooks,
  totalBooks,
  limit = 10,
}: {
  initialBooks: Book[];
  totalBooks: number;
  limit: number;
}) => {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const fetchMoreBooks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetch(
        `/api/books?pageSize=${limit}&pageNo=${page + 1}`,
      );
      const parseData = await data.json();
      console.log(parseData);
      setBooks((prev) => [...prev, ...parseData]);
      setPage(page + 1);
    } catch (error) {
      console.log(error);
      toast.error("Error while fetching books");
    } finally {
      setLoading(false);
    }
  }, [page, limit]);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.innerHeight + document.documentElement.scrollTop;
      const bottomThreshold = document.documentElement.offsetHeight - 10;

      if (
        scrollPosition >= bottomThreshold &&
        !loading &&
        books.length < totalBooks
      ) {
        fetchMoreBooks();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, page, totalBooks, books.length, router, fetchMoreBooks]);

  // console.log({ len: books.length, totalBooks });
  //   console.log({ page, loading, books: books.map((e) => e.title) });

  return (
    <>
      <BookList title="Library" books={books} containerClassName="mt-28" />
      {loading && (
        <div className="grid h-20 w-screen place-items-center py-10">
          <div className="loader-small"></div>
        </div>
      )}
    </>
  );
};

export default InfiniteScrollWrapper;
