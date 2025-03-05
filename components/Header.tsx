"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Session } from "next-auth";

const Header = ({ session }: { session: Session }) => {
  const pathname = usePathname();
  console.log({ session });
  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
      </Link>
      <ul className="flex items-center gap-3 md:gap-10">
        <li>
          <Link
            href="/library"
            className={cn(
              "cursor-pointer text-base capitalize",
              pathname === "/library" ? "text-light-200" : "text-light-100",
            )}
          >
            Library
          </Link>
        </li>
        <li>
          <Link href={"/my-profile"} className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="bg-blue-200 capitalize text-black">
                {session?.user?.name?.slice(0, 2) || "Av"}
              </AvatarFallback>
            </Avatar>
            <p className="font-semibold text-white">
              {session?.user?.name || "User"}
            </p>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
