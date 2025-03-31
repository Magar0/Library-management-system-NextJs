"use client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { CircleX, SquareArrowOutUpRight } from "lucide-react";

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
import Loader from "@/components/shared/Loader";
import { approveAccount, getAccountReq } from "@/lib/actions/users";
import { cn } from "@/lib/utils";

interface IAccount {
  fullName: string;
  id: string;
  email: string;
  universityId: number;
  universityCard: string;
  createdAt: Date;
  totalCount: number;
}

const Page = () => {
  const [userRequest, setUserRequest] = useState<IAccount[] | null>(null);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNo, setPageNo] = useState<number>(1);
  const [sort, setSort] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isUpdating, setIsUpdating] = useState(false);

  // fetch all users
  const fetchData = useCallback(async () => {
    try {
      console.log("🟢🟢Fetching Users");
      const response = await getAccountReq({ pageNo, pageSize, sort });
      console.log({ response });
      const noOfPage = response.data[0]?.totalCount
        ? Math.ceil(response.data[0].totalCount / pageSize)
        : 0;
      setTotalPages(noOfPage);
      setUserRequest(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching Users");
    }
  }, [pageSize, pageNo, sort]);

  const handleApprove = async (userId: string, value: boolean) => {
    if (isUpdating) return;
    setIsUpdating(true);
    const response = await approveAccount(userId, value);
    if (response.success) {
      setUserRequest(
        (prev) => prev?.filter((item) => item.id !== userId) || null,
      );
      toast.success(`${value ? "Approved" : "Rejected"} Successfully`);
    } else {
      console.log("Error:", response.error);
      toast.error("Error approving user");
    }
    setIsUpdating(false);
  };

  useEffect(() => {
    fetchData();
  }, [pageNo, pageSize, fetchData]);

  // console.log({ userRequest });
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
        {!userRequest && (
          <div className="absolute flex h-full w-full items-center justify-center">
            <Loader className="h-14 w-14" />
          </div>
        )}
        <Table>
          <TableHeader>
            <TableRow className="my-table">
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Date Joined</TableHead>
              <TableHead>University ID No</TableHead>
              <TableHead>University ID Card</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="min-h-0 flex-grow font-semibold text-neutral-800">
            {!userRequest?.length && userRequest && (
              <p className="absolute mt-3 w-full italic text-neutral-400">
                No Pending request{" "}
              </p>
            )}
            {userRequest?.map((user) => {
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

                  <TableCell>{user.universityId}</TableCell>
                  <TableCell>
                    <Link
                      className="flex items-center gap-1 text-blue-500"
                      href={`/admin/file/img?path=${user.universityCard}`}
                    >
                      View ID Card <SquareArrowOutUpRight size={15} />
                    </Link>
                  </TableCell>
                  <TableCell className="flex items-center justify-center gap-4">
                    <span
                      className={cn(
                        "cursor-pointer rounded-md bg-green-100 px-3 py-2 text-green-700",
                        { "cursor-default": isUpdating },
                      )}
                      onClick={() => handleApprove(user.id, true)}
                    >
                      Approve Account
                    </span>
                    <CircleX
                      className={cn("cursor-pointer", {
                        "cursor-default": isUpdating,
                      })}
                      color="red"
                      size={20}
                      onClick={() => handleApprove(user.id, false)}
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
