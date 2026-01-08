export interface SortOption {
  value: string
  label: string
}

export interface SortSelectProps {
  value: string
  onChange: (value: string) => void
  options: SortOption[]
  label?: string
  disabled?: boolean
}
