export interface FilterState {
    search: string;
    sortBy: string;
    inStock?: boolean;
    category?: string;
    priceRange?: [number, number];
    selectedRating?: string;
    selectedColors?: string[];
    selectedSizes?: string[];
}

export interface FilterSidebarProps {
    onFilterChange?: (filters: FilterState) => void;
    initialFilters?: Partial<FilterState>;
    className?: string;
    dynamicOptions?: {
        colors?: string[];
        sizes?: string[];
    };
}
