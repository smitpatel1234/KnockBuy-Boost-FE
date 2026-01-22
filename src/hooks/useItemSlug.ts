"use client";

import type { ItemBySlug } from "@/types/item.types";
import { getItemByslug } from "@/services/item.service";
import { useEffect, useState } from "react";
import { createItemCart } from "@/services/cartitem.service";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/store";
import { fetchCart } from "@/redux/features/cart-slice";

export const useItemSlug = (id: string) => {
  const [product, setProduct] = useState<ItemBySlug>();
  const [loading, setloading] = useState<boolean>(true);
  const [varientp, setVarientp] = useState<string[]>();

  const dispatch = useAppDispatch();

  const AddToCart = async () => {
    if (!product) {
      return toast.message("Product not found")
    }
    const item_id = product.item_id;
    try {
      await createItemCart({
        item: item_id,
        quantity: 1,
      });

      void dispatch(fetchCart());
      toast.success("Added to cart");
    } catch {
      toast.message("Failed to add to cart or out of stock");
    }
  };
  useEffect(() => {
    const fetchProduct = async () => {
      setloading(true);
      if (!id) {

        return;
      }

      try {
        const res = await getItemByslug(id);
        const Product = res.data.data;
        setProduct(Product);
        const emptySet = new Set<string>();
        Product.variant?.map((variant) => (emptySet.add(variant.variantProperty_id)))
        setVarientp([...emptySet])
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setloading(false);
      }
    };

    void fetchProduct();
  }, []);

  return { loading, product, AddToCart, varientp };
};
