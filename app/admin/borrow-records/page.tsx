"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

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
import { Check, X } from "lucide-react";
import { getBorrowRecords, handleReturned } from "@/lib/actions/book";
import { cn } from "@/lib/utils";

interface IBorrowRecords {
  id: string;
  userName: string;
  bookTitle: string;
  borrowDate: string;
  dueDate: string;
  returnDate: Date | null;
  status: string;
  totalCount: number;
}
const Page = () => {
  const [borrowRecords, setBorrowRecords] = useState<IBorrowRecords[] | null>(
    null,
  );
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNo, setPageNo] = useState<number>(1);
  const [sort, setSort] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  // fetch all books
  const fetchData = useCallback(async () => {
    console.log("🟢🟢Fetching recordes");
    const response = await getBorrowRecords({ pageNo, pageSize, sort });
    console.log({ response });
    if (response?.success) {
      const noOfPage = response.data[0]?.totalCount
        ? Math.ceil(response.data[0].totalCount / pageSize)
        : 0;
      setTotalPages(noOfPage);
      setBorrowRecords(response.data);
    } else {
      console.log("Error fetching records", response.error);
      toast.error("Error fetching records");
    }
  }, [pageSize, pageNo, sort]);

  const handleUpdate = useCallback(async (recordId: string, value: boolean) => {
    setIsUpdating(true);
    const response = await handleReturned(recordId, value);
    if (response?.success) {
      setBorrowRecords((prev) => {
        const updated = prev?.map((record) =>
          record.id === recordId
            ? {
                ...record,
                returnDate: value ? new Date() : null,
                status: value ? "RETURNED" : "BORROWED",
              }
            : record,
        );
        return updated || null;
      });
      toast.success("Record updated successfully");
    } else {
      console.log(response.error);
      toast.error("Error Updating record");
    }
    setIsUpdating(false);
  }, []);

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
        </div>
      </div>
      <div className="relative flex min-h-0 flex-grow flex-col">
        {!borrowRecords && (
          <div className="absolute flex h-full w-full items-center justify-center">
            <Loader className="h-14 w-14" />
          </div>
        )}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">User</TableHead>
              <TableHead>Book</TableHead>
              <TableHead>Borrow Date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Returned Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Mark as Returned</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="min-h-0 flex-grow font-semibold text-neutral-800">
            {!borrowRecords?.length && borrowRecords && (
              <p className="absolute mt-3 w-full italic text-neutral-400">
                No Pending request{" "}
              </p>
            )}
            {borrowRecords?.map((records) => {
              return (
                <TableRow key={records.id}>
                  <TableCell className="mt-2.5 flex flex-row items-center gap-2">
                    <p className="text-sm font-semibold">{records.userName}</p>
                  </TableCell>
                  <TableCell>{records.bookTitle}</TableCell>
                  <TableCell>
                    {records.borrowDate
                      ? new Date(records.borrowDate).toLocaleDateString()
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {records.dueDate
                      ? new Date(records.dueDate).toLocaleDateString()
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {records.returnDate ? (
                      new Date(records.returnDate).toLocaleDateString()
                    ) : (
                      <span className="ms-2">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-neutral-500">
                    {records.status}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      onClick={() =>
                        handleUpdate(records.id, !Boolean(records?.returnDate))
                      }
                      variant="outline"
                      disabled={isUpdating}
                      className={cn(
                        "h-8 w-8 rounded-full p-0 transition-all hover:bg-green-200",
                        { "bg-red-200": records.returnDate },
                      )}
                    >
                      {records.returnDate ? <X /> : <Check />}
                    </Button>
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
