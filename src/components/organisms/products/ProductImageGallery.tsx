import { Sparkles } from "lucide-react";
import Image from "next/image";
import CarouselBox from "../../molecules/CarouselBox";
import { useRef } from "react";
import { useMouseOverZoom } from "@/hooks/useMouseOverZoom";
import type { ProductImageGalleryProps } from "@/types/product-display.types";

const PLACEHOLDER_IMAGE =
  "http://localhost:5000/uploads/dummy-product-placeholder.avif";

export function ProductImageGallery({
  currentImage,
  onImageHover,
  productName,
  productImages,
}: Readonly<ProductImageGalleryProps>) {
  const source = useRef<HTMLImageElement>(null);
  const target = useRef<HTMLCanvasElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const isShowZoom = useMouseOverZoom(source, target, cursor, 20);

  return (
    <div className="lg:w-1/2 w-full relative">
      {isShowZoom && (
        <canvas
          ref={target}
          width={700}
          height={700}
          className="absolute left-full ml-4 z-50 border-2 border-indigo-200 bg-white rounded-xl shadow-2xl"
        />
      )}
      <div className="bg-white w-full rounded-2xl shadow-xl border-2 border-indigo-100 p-4 relative overflow-hidden group transition-all duration-300 hover:shadow-2xl">
        {/* Hover to Zoom Indicator */}
        <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          Hover to zoom
        </div>

        {/* Dynamic aspect ratio container */}
        <div className="relative w-full" style={{ aspectRatio: "1 / 1" }}>
          {isShowZoom && (
            <div
              ref={cursor}
              className="absolute pointer-events-none border-2 border-indigo-500 bg-indigo-400/20 rounded-lg z-10"
            />
          )}

          <Image
            ref={source}
            src={currentImage ?? productImages?.[0] ?? PLACEHOLDER_IMAGE}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            alt={productName ?? "Product"}
            className="object-contain cursor-crosshair transition-transform duration-300 group-hover:scale-105"
            priority
          />
        </div>
      </div>

      <div className="h-24 w-full mt-4">
        <CarouselBox
          HandelOnhover={onImageHover}
          carousel_images={productImages}
        />
      </div>
    </div>
  );
}
