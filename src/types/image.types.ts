

export interface ImageUploadProps {
  onImageSelect: (file: File) => void
  accept?: string
  disabled?: boolean
}

export interface ImagePreviewProps {
  src?: string
  alt?: string
  className?: string
}

