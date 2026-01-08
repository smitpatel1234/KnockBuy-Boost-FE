import { useState, useEffect } from "react";
import type { Item } from "@/types/item.types";
import { getAllItems } from "@/services/item.service";
interface UseVariantCollectionItemsReturn {
  items: Item[];
  loading: boolean;
  error: string | null;
}

export function useVariantCollectionItems(): UseVariantCollectionItemsReturn {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getAllItems();
        let itemsData: Item[] = [];
        if (response?.data?.data && Array.isArray(response.data.data)) {
          itemsData = response.data.data;
        }
        setItems(itemsData);
      } catch (err: unknown) {
        const error = err as { response?: { data?: { message?: string } }; message?: string };
        const errorMsg = error.response?.data?.message ? error.response.data.message : error.message ?? "Failed to fetch items";
        setError(errorMsg);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    void fetchItems();
  }, []);

  return { items, loading, error };
}
