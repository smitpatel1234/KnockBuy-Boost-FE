"use client";
import React from "react";
import { ImageUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ImageUploadButton } from "../molecules/ImageUploadButton";
import { ImagePreview } from "../molecules/ImagePreview";

export default function ProfilePicture({setImage, src,loading}: {setImage: (file: File) => void, src: string|undefined ,loading: boolean}) {


  return (
    <Card className="w-full max-w-xs">
      <div className="flex flex-col items-center gap-3 p-4">
        {/* Preview */}
        <div className="relative h-28 w-28 rounded-full border bg-muted flex items-center justify-center overflow-hidden">
          <ImagePreview  src={src} />
        </div>

        {/* Upload CTA */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <ImageUp className="h-4 w-4" />
          <span>Upload profile photo</span>
        </div>

        <ImageUploadButton onImageSelect={setImage}  disabled={loading}/>
      </div>
    </Card>
  );
}
