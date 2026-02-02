import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import type { GenericDialogProps } from "@/types/dialogbox.types";

export function GenericDialog<T>({
  open,
  title,
  description,
  data,
  onClose,
  children,
}: Readonly<GenericDialogProps<T>>) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col shadow-lg border border-slate-200">
        <DialogHeader className="border-b border-slate-100 pb-4">
          {title && (
            <DialogTitle className="text-2xl font-bold text-gray-900">
              {title}
            </DialogTitle>
          )}
          {description && (
            <DialogDescription className="text-base text-gray-600 mt-2">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="overflow-y-auto flex-1 px-6 py-4">
          {children(data)}
        </div>
      </DialogContent>
    </Dialog>
  );
}
