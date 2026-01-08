export interface PaginationProps {
  page: number
  total: number
  limit: number
  onPageChange: (page: number) => void
  onLimitChange: (limit: number) => void
}

export interface UsePaginationResult {
  totalPages: number
  handleGoToFirst: () => void
  handleGoToLast: () => void
  handleGoToPrevious: () => void
  handleGoToNext: () => void
}

export function usePagination(
  page: number,
  total: number,
  limit: number,
  onPageChange: (page: number) => void
): UsePaginationResult {
  const totalPages = Math.ceil(total / limit)

  const handleGoToFirst = () => { onPageChange(1); }
  const handleGoToLast = () => { onPageChange(totalPages); }
  const handleGoToPrevious = () => { onPageChange(Math.max(1, page - 1)); }
  const handleGoToNext = () => { onPageChange(Math.min(totalPages, page + 1)); }

  return {
    totalPages,
    handleGoToFirst,
    handleGoToLast,
    handleGoToPrevious,
    handleGoToNext,
  }
}
