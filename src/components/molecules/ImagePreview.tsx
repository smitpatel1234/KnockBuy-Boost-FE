"use client";

import React from "react";

interface ImagePreviewProps {
  src?: string;
  alt?: string;
  className?: string;
}

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

  return <img src={src} alt={alt} className={className} />;
}
