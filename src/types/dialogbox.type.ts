export type GenericDialogProps <T>  = {
  open: boolean;
  title?: string;
  description?: string;
  data?: T;

  onClose: () => void;
  children: (data: T | undefined) => React.ReactNode;
}