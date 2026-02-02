import Image from "next/image";
import type { Item } from "@/types/item.types";
import type { MouseEvent } from "react";
export default function CarouselBox({
  carousel_images,
  HandelOnhover,
}: {
  readonly carousel_images: Item["images"];
  readonly HandelOnhover: (e: MouseEvent<HTMLImageElement>) => void;
}) {
  return (
    <div className="flex flex-row h-20  justify-center  ">
      {carousel_images?.map((image) => (
        <div className="flex flex-row h-20" key={image}  >
          <Image
          onMouseEnter={HandelOnhover}
            key={`image${image}`}
            src={image}
            alt="smit"
            className="m-1 rounded-xl border border-black-600 hover:border-blue-600 "
            width={80}
            height={80}
          />
        </div>
      ))}
    </div>
  );
}
