"use client";
import { ImageUploadButton } from "@/components/molecules/ImageUploadButton";
import { ImagePreview } from "@/components/molecules/ImagePreview";

export function ProductImage() {
    return (
        <div className="flex flex-col gap-2">
            <ImagePreview />
            <ImageUploadButton onImageSelect={(E:File) => {}} />
        </div>
    );
} 