"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { IKImage } from "imagekitio-next";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pagination from "@/components/admin/Pagination";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import DeleteDialog from "@/components/admin/DeleteDialog";
import config from "@/lib/config";
import { deleteBook, getBooks } from "@/lib/admin/actions/book";

interface IBook {
  id: string;
  title: string;
  author: string;
  genre: string;
  coverUrl: string;
  createdAt: Date | null;
  totalCount: number;
}
const Page = () => {
  const [allBook, setAllBook] = useState<IBook[] | null>(null);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNo, setPageNo] = useState<number>(1);
  const [sort, setSort] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(0);

  // fetch all books
  const fetchData = useCallback(async () => {
    console.log("🟢🟢Fetching Books");
    const response = await getBooks({ pageNo, pageSize, sort });
    if (response?.success) {
      const noOfPage = response.data[0]?.totalCount
        ? Math.ceil(response.data[0].totalCount / pageSize)
        : 0;
      setTotalPages(noOfPage);
      setAllBook(response.data);
    } else {
      toast.error(response.message);
    }
  }, [pageSize, pageNo, sort]);

  const handleDeleteBook = async (id: string) => {
    const response = await deleteBook(id);
    if (response?.success) {
      toast.success("Book deleted successfully");
      fetchData();
    } else {
      toast.error(response.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageNo, pageSize, fetchData]);

  return (
    <section className="flex min-h-0 w-full flex-grow flex-col rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold"> All Books</h2>
        <div className="flex items-center gap-3">
          <div
            onClick={() =>
              setSort((pre) => (pre === "name=asc" ? "name=desc" : "name=asc"))
            }
            className="flex cursor-pointer items-center gap-1"
          >
            <p>A-Z</p>
            <Image
              alt="icon"
              src="/icons/admin/arrow-swap.svg"
              height={25}
              width={25}
            />
          </div>
          <Button className="bg-primary-admin" asChild>
            <Link href="/admin/books/new" className="text-white">
              + Create a New Book
            </Link>
          </Button>
        </div>
      </div>
      <div className="relative flex min-h-0 flex-grow flex-col">
        {!allBook && (
          <div className="absolute flex h-full w-full items-center justify-center">
            <Loader className="h-14 w-14" />
          </div>
        )}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Book Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead>Date Created</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="min-h-0 flex-grow font-semibold text-neutral-800">
            {!allBook?.length && allBook && (
              <p className="absolute mt-3 w-full italic text-neutral-400">
                No Pending request{" "}
              </p>
            )}
            {allBook?.map((book) => {
              return (
                <TableRow key={book.id}>
                  <TableCell className="mt-2.5 flex flex-row items-center gap-2">
                    <div className="h-5 w-5">
                      <IKImage
                        path={book.coverUrl}
                        urlEndpoint={config.env.imagekit.urlEndpoint}
                        alt="img"
                      />
                    </div>
                    <p className="text-sm font-semibold">{book.title}</p>
                  </TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.genre}</TableCell>
                  <TableCell>
                    {book.createdAt
                      ? new Date(book.createdAt).toLocaleDateString()
                      : ""}
                  </TableCell>
                  <TableCell className="text-center">
                    <DeleteDialog
                      userId={book.id}
                      handleDeleteItem={handleDeleteBook}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <Pagination
          pageSize={pageSize}
          pageNo={pageNo}
          totalPages={totalPages}
          setPageSize={setPageSize}
          setPageNo={setPageNo}
        />
      </div>
    </section>
  );
};

export default Page;
