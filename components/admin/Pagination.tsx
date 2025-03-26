import React, { SetStateAction } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PageSize } from "@/constants";
import { cn } from "@/lib/utils";

interface Props {
  pageSize: number;
  pageNo: number;
  totalPages: number;
  setPageSize: React.Dispatch<SetStateAction<number>>;
  setPageNo: React.Dispatch<SetStateAction<number>>;
}
const Pagination = ({
  pageNo,
  pageSize,
  totalPages,
  setPageNo,
  setPageSize,
}: Props) => {
  const getPageNumbers = () => {
    if (!totalPages) return [];
    if (totalPages === 1) return [1];
    if (totalPages === 2) return [1, 2];

    const pages = [];
    const maxPagesToShow = 3;
    const startPage = Math.max(1, pageNo - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    if (startPage > 1) pages.push(1);
    if (startPage > 2) pages.push("...");

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    console.log({ startPage, endPage, pages });

    if (endPage < totalPages - 1) pages.push("...");
    if (endPage < totalPages) pages.push(totalPages);
    return pages;
  };

  return (
    <section className="mt-5 flex w-full items-center justify-between gap-3">
      <div className="relative pl-20">
        <Select
          defaultValue={pageSize.toString()}
          onValueChange={(e) => setPageSize(Number(e))}
        >
          <SelectTrigger className="min-w-16">
            <SelectValue placeholder="page" />
            <p className="absolute left-0 top-2 text-neutral-700">No Of Rows</p>
          </SelectTrigger>
          <SelectContent>
            {PageSize.map((e, ind) => (
              <SelectItem value={e} key={ind}>
                {e}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {/* page control btn */}
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          disabled={pageNo === 1 || pageNo === 2}
          onClick={() => setPageNo(1)}
          className={cn(
            "w-10 opacity-100 transition-all duration-300",
            (pageNo === 1 || pageNo === 2) && "opacity-0",
          )}
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          disabled={pageNo === 1}
          className="w-10"
          onClick={() => setPageNo(pageNo - 1)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        {/* page numbers */}
        {getPageNumbers().map((num, index) =>
          num === "..." ? (
            <span key={index}>...</span>
          ) : (
            <Button
              variant={num === pageNo ? "ghost" : "outline"}
              disabled={num === pageNo}
              key={index}
              className="h-8 w-8 p-0 text-neutral-700"
              onClick={() => setPageNo(Number(num))}
            >
              {num}
            </Button>
          ),
        )}
        <Button
          variant="outline"
          disabled={pageNo === totalPages}
          className="w-10"
          onClick={() => setPageNo(pageNo + 1)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          disabled={totalPages === pageNo + 1 || totalPages === pageNo}
          className={cn(
            "w-10 opacity-100 transition-all duration-300",
            (totalPages === pageNo + 1 || totalPages === pageNo) && "opacity-0",
          )}
          onClick={() => setPageNo(totalPages)}
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
};

export default Pagination;
