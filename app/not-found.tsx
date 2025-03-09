"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };
  return (
    <main className="root-container flex min-h-screen flex-col items-center justify-center">
      <p className="font-bebas-neue text-5xl font-bold text-light-100">
        404 - Page Not found
      </p>
      <p className="mt-3 max-w-xl text-center text-light-400">
        The page you are looking for might have been removed or does not exist
      </p>
      <Button className="mt-10 text-lg font-semibold" onClick={goBack}>
        Go Back
      </Button>
    </main>
  );
};

export default Page;
