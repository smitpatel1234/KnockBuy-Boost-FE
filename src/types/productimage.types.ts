export interface ProductImageProps {
  images: string[]
  onUpload: (file: File) => void
  onRemove?: (index: number) => Promise<void> 
}
