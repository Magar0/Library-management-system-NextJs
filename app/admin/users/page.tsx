"use client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { SquareArrowOutUpRight } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Pagination from "@/components/admin/Pagination";
import RoleChangeBtn from "@/components/admin/RoleChangeBtn";
import Loader from "@/components/shared/Loader";
import { User } from "@/database/schema";
import DeleteDialog from "@/components/admin/DeleteDialog";

interface IUser extends User {
  borrowedBooksCount?: number;
}

const Page = () => {
  const [allUser, setAllUser] = useState<IUser[] | null>(null);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNo, setPageNo] = useState<number>(1);
  const [sort, setSort] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(0);

  // fetch all users
  const fetchData = useCallback(async () => {
    try {
      console.log("🟢🟢Fetching Users");
      const response = await fetch(
        `/api/admin/users?pageSize=${pageSize}&pageNo=${pageNo}&sort=${sort}`,
      );
      const parseData = await response.json();
      const noOfPage = parseData[0]?.totalCount
        ? Math.ceil(parseData[0].totalCount / pageSize)
        : 0;
      setTotalPages(noOfPage);
      setAllUser(parseData);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching Users");
    }
  }, [pageSize, pageNo, sort]);

  const handleDeleteUser = async (id: string) => {
    // this account is for public who want to access admin dashboard
    if ((id = "86e7ec4d-f127-4350-a131-c6c45e777e80")) {
      toast.error("Developer has restricted from deleting this account");
      return;
    }
    try {
      const res = await fetch(`/api/admin/users?userId=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        toast.error("Failed to Delete User");
        return;
      }

      toast.success("Successfully Deleted User");
      fetchData();
    } catch (error) {
      console.log(error);
      toast.error("Failed to Delete User");
    }
  };

  const handleRoleChange = async (
    id: string,
    role: "USER" | "ADMIN" | null,
  ): Promise<void> => {
    try {
      console.log("updating user...");
      const options = {
        method: "PUT",
        body: JSON.stringify({ id, role }),
      };
      await fetch("/api/admin/users", options);
      toast.success("Role changed Successfully");
      setAllUser((pre) => {
        const updated = pre?.map((user) =>
          user.id === id ? { ...user, role } : user,
        );
        return updated || null;
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to change Role");
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageNo, pageSize, fetchData]);

  // console.log({ allUser });
  return (
    <section className="flex min-h-0 flex-grow flex-col rounded-md bg-white p-5">
      <div className="flex items-center justify-between text-slate-800">
        <h3 className="mb-5 font-ibm-plex-sans text-xl font-semibold">
          All Users
        </h3>
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

      <div className="relative flex min-h-0 flex-grow flex-col">
        {!allUser && (
          <div className="absolute flex h-full w-full items-center justify-center">
            <Loader className="h-14 w-14" />
          </div>
        )}
        <Table>
          <TableHeader>
            <TableRow className="my-table">
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Date Joined</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Books Borrowed</TableHead>
              <TableHead>University ID No</TableHead>
              <TableHead>University ID Card</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="min-h-0 flex-grow font-semibold text-neutral-800">
            {!allUser?.length && allUser && (
              <p className="absolute w-full italic text-neutral-400">
                No Pending request
              </p>
            )}
            {allUser?.map((user) => {
              console.log(user);
              return (
                <TableRow key={user.id}>
                  <TableCell className="mt-2.5 flex flex-row gap-2">
                    <Avatar>
                      <AvatarFallback className="bg-amber-100 font-semibold uppercase text-slate-700">
                        {user.fullName?.slice(0, 2) || "AV"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="w-26 flex flex-col max-md:hidden">
                      <p className="truncate font-semibold text-dark-200">
                        {user.fullName}
                      </p>
                      <p className="truncate text-xs text-light-500">
                        {user.email}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : ""}
                  </TableCell>
                  <TableCell>
                    <RoleChangeBtn
                      id={user.id}
                      role={user.role}
                      handleRoleChange={handleRoleChange}
                    />
                  </TableCell>
                  <TableCell>{user.borrowedBooksCount}</TableCell>
                  <TableCell>{user.universityId}</TableCell>
                  <TableCell>
                    <Link
                      className="flex items-center gap-1 text-blue-500"
                      href={`/admin/file/img?path=${user.universityCard}`}
                    >
                      View ID Card <SquareArrowOutUpRight size={15} />
                    </Link>
                  </TableCell>
                  <TableCell className="text-center">
                    <DeleteDialog
                      userId={user.id}
                      handleDeleteItem={handleDeleteUser}
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
