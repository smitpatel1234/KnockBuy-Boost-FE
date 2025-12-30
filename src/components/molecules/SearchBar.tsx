"use client";
import React from "react";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";

export default function SearchBar() {
  return (
    <div className="w-full md:w-[300px] p-1 m-2">
      <Label 
        htmlFor="search" 
        className="text-sm font-semibold text-gray-700 mb-2 block uppercase tracking-wide"
      >
        Search
      </Label>

      <div className="relative">
        <Input
          id="search"
          placeholder="Type to search..."
          className="w-full h-10 px-4 pr-10 border border-slate-300 rounded-lg 
                     bg-white shadow-sm transition-colors duration-200
                     hover:border-slate-400 
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                     focus:outline-none
                     placeholder-gray-400"
        />
        <svg
          className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  );
}
