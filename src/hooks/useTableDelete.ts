export interface UseTableDeleteResult {
  deleteId: Record<string, unknown> | null
  handleDeleteClick: (row: Record<string, unknown>) => void
  handleConfirmDelete: (onDelete?: (row: Record<string, unknown>) => void) => void
  setDeleteId: (id: Record<string, unknown> | null) => void
}

import { useState } from 'react'

export function useTableDelete(): UseTableDeleteResult {
  const [deleteId, setDeleteId] = useState<Record<string, unknown> | null>(null)

  const handleDeleteClick = (row: Record<string, unknown>) => {
    setDeleteId(row)
  }

  const handleConfirmDelete = (onDelete?: (row: unknown) => void) => {
    if (deleteId && onDelete) {
      onDelete(deleteId)
      setDeleteId(null)
    }
  }

  return {
    deleteId,
    handleDeleteClick,
    handleConfirmDelete,
    setDeleteId,
  }
}
