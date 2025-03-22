"use client";

import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import Loader from "../shared/Loader";

const RoleChangeBtn = ({
  id,
  role,
  handleRoleChange,
}: {
  id: string;
  role: "ADMIN" | "USER" | null;
  handleRoleChange: (id: string, role: "USER" | "ADMIN") => Promise<any>;
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = async (id: string, newRole: "USER" | "ADMIN") => {
    setIsPopoverOpen(false);
    if (role === newRole) return;
    setLoading(true);
    await handleRoleChange(id, newRole);
    setLoading(false);
  };

  return (
    <Popover open={isPopoverOpen}>
      <PopoverTrigger
        onClick={() => !loading && setIsPopoverOpen(true)}
        className={cn(
          "cursor-pointer rounded-md bg-pink-100 px-3 py-1 text-xs font-normal text-pink-700",
          {
            "bg-green-100 text-green-700": role === "ADMIN",
            "bg-transparent": loading,
          },
        )}
      >
        {loading ? <Loader /> : role}
      </PopoverTrigger>
      <PopoverContent className="w-[120px]">
        <div className="flex gap-2">
          <span
            className="cursor-pointer rounded-md bg-pink-100 px-3 py-1 text-xs font-normal text-pink-700 transition hover:font-bold"
            onClick={() => handleChange(id, "USER")}
          >
            User
          </span>
          <span>{role === "USER" && "✔️"}</span>
        </div>

        <div className="mt-2 flex gap-2">
          <span
            className="cursor-pointer rounded-md bg-green-100 px-3 py-1 text-xs font-normal text-green-700 transition hover:font-bold"
            onClick={() => handleChange(id, "ADMIN")}
          >
            Admin
          </span>
          <span>{role === "ADMIN" && "✔️"}</span>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default RoleChangeBtn;
