import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/Select";

export default function FilterBar() {
  return (
    <div className=" bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 rounded-lg shadow-sm p-4 m-4 ">
      <div className="flex flex-wrap items-end gap-4">
        
        {/* COLUMN SELECT */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Column</label>
          <Select>
            <SelectTrigger className="w-[180px] bg-white border-slate-300 hover:border-slate-400 focus:ring-2 focus:ring-blue-500">
              <SelectValue placeholder="Select column" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Columns</SelectLabel>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="status">Status</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* OPERATOR SELECT */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Operator</label>
          <Select>
            <SelectTrigger className="w-[180px] bg-white border-slate-300 hover:border-slate-400 focus:ring-2 focus:ring-blue-500">
              <SelectValue placeholder="Select operator" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Operators</SelectLabel>
                <SelectItem value="equals">Equals</SelectItem>
                <SelectItem value="contains">Contains</SelectItem>
                <SelectItem value="startsWith">Starts With</SelectItem>
                <SelectItem value="endsWith">Ends With</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* VALUE SELECT */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Value</label>
          <Select>
            <SelectTrigger className="w-[180px] bg-white border-slate-300 hover:border-slate-400 focus:ring-2 focus:ring-blue-500">
              <SelectValue placeholder="Select value" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Values</SelectLabel>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

      </div>
    </div>
  );
}
