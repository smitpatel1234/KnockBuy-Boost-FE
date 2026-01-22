"use client"
import { useAppDispatch } from '@/redux/store'
import { logoutUser } from '@/redux/features/auth-slice'
import { fetchCategoriesAll } from '@/redux/features/category-slice'
import { useEffect } from 'react'
import React from 'react'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

export interface UseHeaderResult {
  handleLogout: () => void,
  globalSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  search: string
}

export function useHeader(router: AppRouterInstance): UseHeaderResult {

  const [search, setSearch] = React.useState<string>("");
  const dispatch = useAppDispatch()

  useEffect(() => {
    void dispatch(fetchCategoriesAll())
  }, [dispatch])

  const handleLogout = () => {
    void dispatch(logoutUser())
  }

  const globalSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  };





  return {
    globalSearchChange,
    handleLogout,
    search
  }
}
