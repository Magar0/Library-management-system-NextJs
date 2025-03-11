"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { borrowBook } from "@/lib/actions/book";

interface Props {
  userId: string;
  bookId: string;
  borrowingEligibility: {
    isEligible: boolean;
    message: string;
  };
}
const BorrowBtn = ({
  userId,
  bookId,
  borrowingEligibility: { isEligible, message },
}: Props) => {
  const router = useRouter();
  const [borrowing, setBorrowing] = useState(false);

  const handleBorrow = async () => {
    if (!isEligible) {
      toast.error(message);
      return;
    }
    setBorrowing(true);
    try {
      const result = await borrowBook({ bookId, userId });
      if (result?.success) {
        toast.success("Book borrowed successfully");
        router.push("/my-profile");
      } else {
        toast.error(result?.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occured while borrowing the book");
    } finally {
      setBorrowing(false);
    }
  };

  return (
    <Button
      className="book-overview_btn"
      disabled={borrowing}
      onClick={handleBorrow}
    >
      <Image src="/icons/book.svg" alt="book" width={20} height={20} />
      <p className="font-bebas-neue text-xl text-dark-100">
        {borrowing ? "Borrowing book..." : "Borrow"}
      </p>
    </Button>
  );
};

export default BorrowBtn;
