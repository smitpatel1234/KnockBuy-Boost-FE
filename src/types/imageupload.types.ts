export interface ImageUploadProps {
  onImageSelect: (file: File) => void | Promise<void>
  accept?: string
  disabled?: boolean
}
