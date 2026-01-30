export interface DateInputProps {
  label?: string
  placeholder?: string
  value?: string
  onChange?: (date: string) => void | Promise<void>
  disabled?: boolean
  className?: string
}
// Simple calendar component
export interface MiniCalendarProps {
  selected?: Date;
  onSelect: (date: Date | undefined) => void | Promise<void>;
  disabled?: boolean;
}

export interface DateInputPropsForDatePicker {
  value?: Date
  onChange: (date: Date) => void
}

export interface DateParts {
  day: number
  month: number
  year: number
}