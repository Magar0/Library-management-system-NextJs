"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { useState } from "react";

const CustomTable = () => {
  const [sort, setSort] = useState<"asc" | "desc">("asc");

  console.log({ sort });
  return (
    <section className="rounded-md bg-white p-5">
      <div className="flex items-center justify-between text-slate-800">
        <h3 className="mb-5 font-ibm-plex-sans text-xl font-semibold">
          All Users
        </h3>
        <div
          onClick={() => setSort((pre) => (pre === "asc" ? "desc" : "asc"))}
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

      {/* <Avatar>
          <AvatarFallback className="bg-amber-100 font-semibold uppercase text-slate-700">
            {session?.user?.name?.slice(0, 2) || "AV"}
          </AvatarFallback>
        </Avatar> */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Date Joined</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Books Borrowed</TableHead>
            <TableHead>University ID No</TableHead>
            <TableHead>University ID Card</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section>
  );
};

export default CustomTable;
