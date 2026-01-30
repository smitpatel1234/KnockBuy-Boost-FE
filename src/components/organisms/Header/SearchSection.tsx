import { Input } from "@/components/ui/input";
import CategorySlider from "../CategorySlider";
import type { ChangeEvent, KeyboardEvent } from "react";
import { useState, useMemo } from "react";
import Link from "next/link";
import { getSearchSuggestions } from "@/services/item.service";
import type { Item } from "@/types/item.types";
import type { Category } from "@/types/category.types";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";

interface SearchSectionProps { search: string; globalSearchChange: (e: ChangeEvent<HTMLInputElement>) => void; }

export default function SearchSection({ search, globalSearchChange }: SearchSectionProps) {
    const [suggestions, setSuggestions] = useState<{ items: Item[], categories: Category[] } | null>(null);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const debouncedFetch = useMemo(() => debounce(async (query: string) => {
        if (query.length > 1) {
            try {
                const response = await getSearchSuggestions(query);
                setSuggestions(response.data.data);
                setShowSuggestions(true);
            } catch (error) { console.error("Error fetching suggestions:", error); }
            finally { setLoading(false); }
        } else { setSuggestions(null); setShowSuggestions(false); setLoading(false); }
    }, 300), []);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        globalSearchChange(e);
        if (e.target.value.length > 1) {
            setLoading(true);
            void debouncedFetch(e.target.value);
            setShowSuggestions(true);
        }
        else {
            setShowSuggestions(false);
            setLoading(false);
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setShowSuggestions(false);
            if (!search.trim()) {
                router.push("/search");
            } else {
                router.push(`/search?query=${encodeURIComponent(search)}`);
            }
        }
    };

    return (
        <div className="flex w-full gap-2 items-center relative" onBlur={() => { setTimeout(() => { setShowSuggestions(false); }, 200); }}>
            <div className="hidden md:block flex-shrink-0">
              <CategorySlider />
            </div>
            <div className="flex-1 relative">
                <Input placeholder="Search products..." className="w-full bg-white text-sm" value={search}
                    onChange={handleSearchChange} onFocus={() => { if (search.length > 1) setShowSuggestions(true); }} onKeyDown={handleKeyDown} />
                {showSuggestions && (loading || (suggestions && (suggestions.items.length > 0 || suggestions.categories.length > 0))) && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow-lg z-50 mt-1 max-h-96 overflow-y-auto">
                        {loading && (
                            <div className="p-4 flex items-center justify-center text-sm text-gray-500">
                                <span className="animate-pulse">Searching...</span>
                            </div>
                        )}
                        {!loading && suggestions && (
                            <>
                                {suggestions.categories.length > 0 && (
                                    <div className="p-2">
                                        <h3 className="text-xs font-semibold text-gray-500 mb-2 px-2">CATEGORIES</h3>
                                        {suggestions.categories.map((c) => (
                                            <Link key={c.category_id} href={`/search?category=${c.category_id}`} className="block px-2 py-2 hover:bg-gray-50 rounded text-sm text-gray-700">
                                                {c.category_name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                                {suggestions.items.length > 0 && (
                                    <div className="p-2 border-t border-gray-100">
                                        <h3 className="text-xs font-semibold text-gray-500 mb-2 px-2">PRODUCTS</h3>
                                        {suggestions.items.map((i) => (
                                            <Link key={i.item_id} href={`/search?query=${i.item_name}`} className="block px-2 py-2 hover:bg-gray-50 rounded text-sm text-gray-700">
                                                <div className="flex justify-between items-center"><span>{i.item_name}</span></div>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
