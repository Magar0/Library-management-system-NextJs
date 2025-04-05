import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Session } from "next-auth";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { signOut } from "@/auth";

const Header = ({ session }: { session: Session }) => {
  return (
    <header className="my-10 flex w-full justify-between gap-5">
      <Link href="/" className="flex items-center gap-5">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
        <p className="hidden font-bebas-neue text-3xl text-white md:block">
          BookHouse
        </p>
      </Link>
      <ul className="flex items-center gap-3 md:gap-10">
        {session?.user?.role === "ADMIN" && (
          <li>
            <Link href={"/admin"} className="font-semibold text-white">
              Admin
            </Link>
          </li>
        )}
        <li>
          <Link href={"/library"} className="font-semibold text-white">
            Library
          </Link>
        </li>
        <li>
          <Popover>
            <PopoverTrigger className="flex cursor-pointer items-center gap-2">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="bg-blue-200 uppercase text-black">
                  {session?.user?.name?.slice(0, 2) || "AV"}
                </AvatarFallback>
              </Avatar>
              <p className="hidden font-semibold text-white md:block">
                {session?.user?.name || "User"}
              </p>
            </PopoverTrigger>
            <PopoverContent className="flex w-fit flex-col gap-1 bg-transparent">
              <Link
                href={"/my-profile"}
                className="relative flex w-full items-center justify-start gap-2 rounded-md px-5 py-3 text-white transition-all duration-300 hover:bg-accent hover:text-slate-800 hover:shadow-sm"
              >
                <Image
                  src="/icons/user.svg"
                  alt="icon"
                  className="brightness-100 invert transition-all duration-300 group-hover:invert-0"
                  height={20}
                  width={20}
                />
                <p className="text-sm font-medium">My Profile</p>
              </Link>
              <Button
                className="group w-full justify-start gap-2 px-5 py-3 text-white transition-all duration-300 hover:font-medium hover:text-slate-800"
                variant="ghost"
                onClick={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <Image
                  src="/icons/log-out.svg"
                  alt="icon"
                  className="brightness-100 invert transition-all duration-300 group-hover:invert-0"
                  height={20}
                  width={20}
                />
                <p className="font-medium">Logout</p>
              </Button>
            </PopoverContent>
          </Popover>
        </li>
      </ul>
    </header>
  );
};

export default Header;
