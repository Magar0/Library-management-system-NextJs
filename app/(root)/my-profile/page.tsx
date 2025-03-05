import { signOut } from "@/auth";
import BookList from "@/components/BookList";
import { Button } from "@/components/ui/button";
import { sampleBooks } from "@/constants";
import React from "react";

const page = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
      className="mb-10"
    >
      <Button>Logout</Button>
      <BookList title="Borrowed Books" books={sampleBooks} />
    </form>
  );
};

export default page;
