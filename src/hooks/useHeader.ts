"use client"
import { useAppSelector, useAppDispatch } from '@/redux/store'
import { logoutUser } from '@/redux/features/auth-slice'
import { fetchCategoriesAll } from '@/redux/features/category-slice'
import { useEffect } from 'react'
import React from 'react'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { debounce } from 'lodash'

export interface UseHeaderResult {
  handleLogout: () => void,
  globalSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  search: string
}

export function useHeader(router: AppRouterInstance): UseHeaderResult {

  const [search, setSearch] = React.useState<string>("");
  const { selectedCategoryId } = useAppSelector((state) => state.category);
  const dispatch = useAppDispatch()

  useEffect(() => {
    void dispatch(fetchCategoriesAll())
  }, [dispatch])

  const handleLogout = () => {
    void dispatch(logoutUser())
  }

  const debouncedGlobalSearch = React.useMemo(
    () =>
      debounce((query: string, categoryId?: string | null) => {
        const url = categoryId
          ? `/search?query=${encodeURIComponent(query)}&category=${encodeURIComponent(categoryId)}`
          : `/search?query=${encodeURIComponent(query)}`;
        router.push(url);
      }, 500),
    [router]
  );


  const globalSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    debouncedGlobalSearch(value, selectedCategoryId);
  };





  return {
    globalSearchChange,
    handleLogout,
    search
  }
}
