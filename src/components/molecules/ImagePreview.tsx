"use client";

import Image from "next/image";
import type { ImagePreviewProps } from "@/types/imagepreview.types";

export function ImagePreview({
  src,
  alt = "Category image",
  className = "w-24 h-24 object-cover rounded-md border",
}: ImagePreviewProps) {
  if (!src) {
    return (
      <div className={`${className} bg-gray-100 flex items-center justify-center`}>
        <span className="text-xs text-gray-500">No image</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className} overflow-hidden`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}
