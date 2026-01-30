"use client";
import { ImageUploadButton } from "@/components/molecules/ImageUploadButton";
import { ImagePreview } from "@/components/molecules/ImagePreview";
import type { ProductImageProps } from "@/types/productimage.types";

export function ProductImage({ images, onUpload, onRemove }: Readonly<ProductImageProps>) {
    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                {images.map((url, index) => (
                    <div key={url} className="relative group">
                        <ImagePreview src={url} className="w-full h-32 object-cover rounded-md border" />
                        {onRemove && (
                            <button
                                type="button"
                                onClick={() => { void onRemove(index); }}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Remove Image"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        )}
                    </div>
                ))}
                {images.length === 0 && (
                    <div className="col-span-full text-center py-4 text-gray-500 text-sm border-2 border-dashed border-gray-200 rounded-lg">
                        No images uploaded
                    </div>
                )}
            </div>
            <ImageUploadButton onImageSelect={onUpload} />
        </div>
    );
} 