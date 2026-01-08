import { useAppDispatch, useAppSelector } from "../redux/store";
import { setSelectedCategoryId } from "../redux/features/category-slice";
import { useMemo } from "react";

export const useCategorySlider = () => {
    const dispatch = useAppDispatch();
    const { categories, loading, selectedCategoryId } = useAppSelector((state) => state.category);

    const selectedCategory = useMemo(() => {
        return categories.find(c => c.category_id === selectedCategoryId) ?? null;
    }, [categories, selectedCategoryId]);

    const getCategoriesByParent = (parentId: string | null) => {
        return categories.filter(c => c.parent_category_id === parentId);
    };

    const getParentCategory = (categoryId: string) => {
        const cat = categories.find(c => c.category_id === categoryId);
        if (!cat?.parent_category_id) return null;
        return categories.find(c => c.category_id === cat.parent_category_id) ?? null;
    };

    const selectCategory = (categoryId: string | null) => {
        dispatch(setSelectedCategoryId(categoryId));
    };

    return {
        categories,
        loading,
        selectedCategory,
        selectedCategoryId,
        getCategoriesByParent,
        getParentCategory,
        selectCategory,
    };
};




