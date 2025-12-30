"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  accept?: string;
  disabled?: boolean;
}

export function ImageUploadButton({
  onImageSelect,
  accept = "image/*",
  disabled = false,
}: ImageUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        onClick={handleClick}
        disabled={disabled}
      >
        Upload Image
      </Button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
        disabled={disabled}
      />
    </>
  );
}
