export interface ConfirmationDialogProps {
    isOpen: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
    onClose: () => void;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: "destructive" | "default";
    isLoading?: boolean;
}

export interface DialogboxProps<T> {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    item?: T | null;
}
