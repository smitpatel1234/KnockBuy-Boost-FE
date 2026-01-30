"use client";

import { useCategorySlider } from "@/hooks/useCategorySlider";
import { ChevronRight, ChevronLeft, List, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useMemo } from "react";
import type { Category } from "@/types/category.types";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent,  PopoverTrigger } from "@/components/ui/popover";
import { useRouter } from "next/navigation";
export default function CategorySlider() {
    const {  categories,  loading, selectedCategory, selectedCategoryId,   getCategoriesByParent,   getParentCategory,selectCategory} = useCategorySlider();
    const router = useRouter()
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [currentParentId, setCurrentParentId] = useState<string | null>(null);
    const visibleCategories = useMemo(() => {
        return getCategoriesByParent(currentParentId);
    }, [currentParentId, getCategoriesByParent]);
    const handleBack = () => {
        if (!currentParentId) return;
        const parent = getParentCategory(currentParentId);
        setCurrentParentId(parent ? parent.category_id : null);
    };

    const handleSelectAction = (category: Category) => {
        const hasChildren = categories.some(c => c.parent_category_id === category.category_id);

        if (hasChildren) {
            setCurrentParentId(category.category_id);
            selectCategory(category.category_id);
            router.push(`/search?category=${category.category_id}`);
        } else {
            selectCategory(category.category_id);
            setIsPopoverOpen(false);
            router.push(`/search?category=${category.category_id}`);
        }
    };

    if (loading) {
        return (
            <div className="w-full bg-white border-b py-3 px-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
                    <div className="animate-pulse h-9 w-44 bg-gray-100 rounded-lg" />
                </div>
            </div>
        );
    }

    return (
        <div className="w-1/4  ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-4">
                <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className={cn(
                                "flex items-center gap-2 h-10 px-4 font-medium transition-all shadow-sm border-gray-200 hover:border-blue-400 hover:bg-blue-50/50",
                                selectedCategoryId && "border-blue-500 bg-blue-50 text-blue-700 hover:bg-blue-100/50"
                            )}
                        >
                            <List className="h-4 w-4" />
                            {selectedCategory?.category_name ?? "All Categories"}
                            <ChevronRight className={cn("h-4 w-4 transition-transform duration-200 opacity-60", isPopoverOpen && "rotate-90")} />
                        </Button>
                    </PopoverTrigger>

                    <PopoverContent
                        align="start"
                        sideOffset={8}
                        className="w-80 p-0 overflow-hidden rounded-xl shadow-2xl border-gray-200"
                    >
                        <div className="flex items-center justify-between p-3 border-b border-gray-100 bg-gray-50/80 backdrop-blur-sm">
                            {currentParentId ? (
                                <button
                                    onClick={handleBack}
                                    className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors uppercase tracking-tight"
                                >
                                    <ChevronLeft className="h-3.5 w-3.5" />
                                    Back to {getParentCategory(currentParentId)?.category_name ?? "All"}
                                </button>
                            ) : (
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
                                    Product Hierarchy
                                </span>
                            )}
                            <button onClick={() => { setIsPopoverOpen(false); }}
                                className="p-1 rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors" >
                                
                                <X className="h-3.5 w-3.5" />
                            </button>
                        </div>

                        {!currentParentId && (
                            <button
                                onClick={() => {
                                    selectCategory(null);
                                    setIsPopoverOpen(false);
                                    router.push(`/search`);
                                }}
                                className={cn(
                                    "flex items-center justify-between w-full px-4 py-2.5 text-sm transition-all hover:bg-blue-50/50 border-b border-gray-50",
                                    selectedCategoryId ?   "text-gray-600":"text-blue-600 bg-blue-50/30 font-semibold"
                                )}>
                                <span>All Categories</span>
                                {!selectedCategoryId && <Check className="h-4 w-4" />}
                            </button>
                        )}

                        <div className="max-h-[400px] overflow-y-auto p-1.5 no-scrollbar">
                            {visibleCategories.length > 0 ? (
                                visibleCategories.map((cat) => {
                                    const hasChildren = categories.some(c => c.parent_category_id === cat.category_id);
                                    const isSelected = selectedCategoryId === cat.category_id;

                                    return (
                                        <button
                                            key={cat.category_id}
                                            onClick={() => { handleSelectAction(cat); }}
                                            className={cn(
                                                "flex items-center justify-between w-full px-3 py-2.5 text-sm transition-all rounded-lg group mb-0.5",
                                                isSelected ? "bg-blue-50 text-blue-700 font-semibold"  : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                                            )}
                                        >
                                            <div className="flex items-center gap-2">
                                                {isSelected && <div className="w-1 h-4 bg-blue-500 rounded-full" />}
                                                <span className="truncate">{cat.category_name}</span>
                                            </div>

                                            {hasChildren ? (
                                                <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-blue-400 transition-colors" />
                                            ) : isSelected && (
                                                <Check className="h-4 w-4 text-blue-500" />
                                            )}
                                        </button>
                                    );
                                })
                            ) : (
                                <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                                        <List className="h-6 w-6 text-gray-300" />
                                    </div>
                                    <p className="text-sm text-gray-400 font-medium">No sub-categories</p>
                                </div>
                            )}
                        </div>
                    </PopoverContent>
                </Popover>
                {selectedCategory && (
                    <div className="flex items-center gap-2 text-sm text-gray-400 animate-in fade-in slide-in-from-left-2 overflow-hidden">
                        <span className="text-gray-300 hidden sm:block">/</span>
                        <span className="font-medium text-gray-500 truncate max-w-[150px]">{selectedCategory.category_name}</span>
                        <button   onClick={() => { selectCategory(null); }} className="p-1 hover:bg-gray-100 rounded-full transition-colors group"    title="Clear selection" >
                            <X className="h-3 w-3 group-hover:text-red-500" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

