"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/Select";
import { Button } from "@/components/atoms/Button";
import { Label } from "@/components/atoms/Label";
import {
  ChevronsLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsRightIcon,
} from "lucide-react";

interface PaginationProps {
  page: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

export default function Pagination({
  page,
  total,
  limit,
  onPageChange,
  onLimitChange,
}: PaginationProps) {
  const totalPages = Math.ceil(total / limit);

  const handleGoToFirst = () => onPageChange(1);
  const handleGoToLast = () => onPageChange(totalPages);
  const handleGoToPrevious = () => onPageChange(Math.max(1, page - 1));
  const handleGoToNext = () => onPageChange(Math.min(totalPages, page + 1));

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-2">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Label className="text-sm font-medium text-slate-500 whitespace-nowrap">
            Rows per page
          </Label>
          <Select
            value={limit.toString()}
            onValueChange={(val) => onLimitChange(parseInt(val))}
          >
            <SelectTrigger className="h-9 w-[70px] bg-white border-slate-200 focus:ring-1 focus:ring-primary/20">
              <SelectValue placeholder={limit.toString()} />
            </SelectTrigger>
            <SelectContent align="center" className="min-w-[70px]">
              {[10, 20, 50, 100].map((l) => (
                <SelectItem key={l} value={l.toString()} className="text-sm cursor-pointer">
                  {l}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="text-sm font-medium text-slate-400">
          Total results: <span className="text-slate-900 font-semibold">{total}</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-sm font-medium text-slate-500 min-w-[100px] text-center">
          Page <span className="text-slate-900 font-semibold">{page}</span> of <span className="text-slate-900 font-semibold">{totalPages || 1}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 border-slate-200 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            onClick={handleGoToFirst}
            disabled={page <= 1}
          >
            <ChevronsLeftIcon className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 border-slate-200 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            onClick={handleGoToPrevious}
            disabled={page <= 1}
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 border-slate-200 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            onClick={handleGoToNext}
            disabled={page >= totalPages || totalPages === 0}
          >
            <ChevronRightIcon className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 border-slate-200 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            onClick={handleGoToLast}
            disabled={page >= totalPages || totalPages === 0}
          >
            <ChevronsRightIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
