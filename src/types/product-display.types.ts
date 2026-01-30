import type { Variant } from "./item.types";

export interface ProductImageGalleryProps {
  readonly currentImage: string | undefined;
  readonly onImageHover: (e: React.MouseEvent<HTMLImageElement>) => void;
  readonly productName: string | undefined;
  readonly productImages: string[] | undefined;
}

export interface ProductInfoProps {
  readonly productName: string | undefined;
  readonly sku: string | undefined;
  readonly rating: number;
  readonly inStock: number;
  readonly price: number | undefined;
  readonly isInWishlist: boolean;
  readonly onWishlistToggle: () => void;
  readonly description: string | undefined;
}
export interface ProductsPageProps {
  item_id?: string;
}


export interface VariantSectionProps {
  readonly variantProperty: string[];
  readonly variants: Variant[] | undefined;
}
