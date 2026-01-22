import { MaxMinConstraints } from '@/types/pagination.types';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import type { Item } from '@/types/item.types';
import { searchItems } from '@/services/item.service';
import type { SearchFilter, SearchPageParams } from '@/types/';
import { useRouter } from 'next/navigation';
export const useProductSearch = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get('query') ?? '';
    const categoryParam = searchParams.get('category');
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;

    const [products, setProducts] = useState<Item[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [constraints, setConstraints] = useState<MaxMinConstraints[]>([]);

    const [sidebarFilters, setSidebarFilters] = useState<FilterState>({
        search: '',
        sortBy: 'newest',
        priceRange: [0, 500],
        selectedRating: '0',
        selectedColors: [],
        selectedSizes: []
    });

    const { availableColors, availableSizes } = useMemo(() => {
        const colors = new Set<string>();
        const sizes = new Set<string>();
        // Logic to extract variants could go here if we were processing product data
        if (products.length > 0) {
            // Placeholder: functionality to extract facets from products
        }
        return {
            availableColors: Array.from(colors),
            availableSizes: Array.from(sizes)
        };
    }, [products]);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const activeFilters: SearchFilter[] = [];

                if (query) activeFilters.push({ column: 'item.item_name', like: query });
                if (categoryParam && categoryParam !== 'all') activeFilters.push({ column: 'category.category_id', eq: categoryParam });

                if (sidebarFilters.priceRange && sidebarFilters.priceRange.length === 2) {
                    activeFilters.push({ column: 'item.item_price', between: sidebarFilters.priceRange, isSearchByNumber: true });
                }

                if (sidebarFilters.selectedRating && sidebarFilters.selectedRating !== '0') activeFilters.push({ column: 'item.rating', gt: Number(sidebarFilters.selectedRating) });

                if (sidebarFilters.selectedColors && sidebarFilters.selectedColors.length > 0) activeFilters.push({ column: 'variantValue.value', in: sidebarFilters.selectedColors });
                if (sidebarFilters.selectedSizes && sidebarFilters.selectedSizes.length > 0) activeFilters.push({ column: 'variantValue.value', in: sidebarFilters.selectedSizes });

                const params: SearchPageParams = {
                    pagination: { page, limit },
                    filters: activeFilters,
                    sort: []
                };

                const response = await searchItems(params);
                setProducts(response.data.data);
                setTotal(response.data.meta.total);
                if (response.data.meta.constraints) {
                    setConstraints(response.data.meta.constraints);
                }
            } catch (error) {
                console.error('Failed to fetch products', error);
            } finally {
                setLoading(false);
            }
        };

        const timer = setTimeout(() => {
            fetchProducts().catch((err: unknown) => { console.error(err); });
        }, 300);
        return () => clearTimeout(timer);
    }, [query, categoryParam, sidebarFilters, page, limit]);

    const router = useRouter();

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', newPage.toString());
        router.push(`/search?${params.toString()}`);
    };

    const handleLimitChange = (newLimit: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('limit', newLimit.toString());
        params.set('page', '1');
        router.push(`/search?${params.toString()}`);
    };

    return {
        products,
        total,
        loading,
        sidebarFilters,
        setSidebarFilters,
        availableColors,
        availableSizes,
        query,
        page,
        limit,
        handlePageChange,
        handleLimitChange,
        constraints
    };
};
