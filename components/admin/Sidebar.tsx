"use client";

import { adminSideBarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

const Sidebar = ({ session }: { session: Session }) => {
  const pathname = usePathname();

  return (
    <div className="admin-sidebar sticky left-0 top-0 flex h-dvh flex-col justify-between bg-white px-5 pb-5 pt-10">
      <div>
        <div className="flex flex-row items-center gap-2 border-b border-dashed border-primary-admin/20 pb-10 max-md:justify-center">
          <Image
            src="/icons/admin/logo.svg"
            alt="logo"
            height={37}
            width={37}
          />
          <h1 className="text-2xl font-semibold text-primary-admin max-md:hidden">
            BookHouse
          </h1>
        </div>
        <div className="mt-10 flex flex-col gap-5">
          {adminSideBarLinks.map((link) => {
            const isSelected =
              (link.route !== "/admin" &&
                pathname.includes(link.route) &&
                link.route.length > 1) ||
              pathname === link.route;

            return (
              <Link href={link.route} key={link.route}>
                <div
                  className={cn(
                    "flex w-full flex-row items-center gap-2 rounded-lg px-5 py-3.5 max-md:justify-center",
                    isSelected && "bg-primary-admin shadow-sm",
                  )}
                >
                  <div className="relative size-5">
                    <Image
                      src={link.img}
                      alt="icon"
                      fill
                      className={cn(
                        "object-contain",
                        isSelected && "brightness-0 invert",
                      )}
                    />
                  </div>
                  <p
                    className={cn(
                      "text-base font-medium text-dark-200 max-md:hidden",
                      { "text-white": isSelected },
                    )}
                  >
                    {link.text}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="user">
        <Avatar>
          <AvatarFallback className="bg-amber-100 uppercase">
            {session?.user?.name?.slice(0, 1) || "NU"}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col max-md:hidden">
          <p className="font-semibold text-dark-200">{session?.user?.name}</p>
          <p className="line-clamp-1 text-xs text-light-500">
            {session?.user?.email}
          </p>
        </div>
        <Button
          variant={"ghost"}
          className="px-2"
          title="logout"
          onClick={() => signOut()}
        >
          <Image src="/icons/logout.svg" alt="logo" height={20} width={20} />
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
