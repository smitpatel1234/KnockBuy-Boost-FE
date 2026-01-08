"use client";
import { useCallback, useMemo, useState, useEffect } from "react";
import type { GetAllItemCartType } from "@/types/itemcart.types";
import {
  getItemCart,
  deleteItemCart,
  updateItemCart,
} from "../services/cartitem.service";
import { validatePromo } from "../services/discount.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import type { Discount } from "@/types/discount.types";

export function useCart() {
  const [cartItems, setCartItems] = useState<GetAllItemCartType[]>([]);
  const [promoCode, setPromoCode] = useState("");
  const [discountData, setDiscountData] = useState<Discount | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const AddToCart = useCallback(async () => {
    const res = await getItemCart();
    setCartItems(res.data.data);
  }, []);

  const removeItem = useCallback(
    async (id: string) => {
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.cart_item_id !== id)
      );
      await deleteItemCart({ cart_item_id: id });
      void AddToCart();
    },
    [AddToCart]
  );
  const updateQuantity = useCallback(
    async (cart_item:GetAllItemCartType, newQuantity: number) => {
      if (newQuantity <= 0) {
        void removeItem(cart_item.cart_item_id);
        return;
      }
      if(cart_item.stock<newQuantity)
      {
          toast.message(`only ${cart_item.stock} Quantity  is available for ${cart_item.item_name} product`)
          return
      }
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.cart_item_id ===  cart_item.cart_item_id? { ...item, quantity: newQuantity } : item
        )
      );

      await updateItemCart({
        cart_item_id: cart_item.cart_item_id,
        quantity: newQuantity,
        item: cart_item.item_id,
      });
      void AddToCart();
    },
    [AddToCart, removeItem]
  );

  const applyPromoCode = useCallback(async () => {
    if (!promoCode) return;
    setLoading(true);
    try {
      const res = await validatePromo(promoCode);
      const discount = (res.data as { data: Discount }).data;
      setDiscountData(discount);
      toast.success("Promo code applied successfully!");
    } catch (error) {
      console.error(error);
      setDiscountData(null);
      toast.error("Invalid or inactive promo code");
    } finally {
      setLoading(false);
    }
  }, [promoCode]);

  const proceedToCheckout = useCallback(() => {
    let url = "/checkout";
    if (discountData) {
      url += `?discountId=${discountData.discount_id}`;
    }
    router.push(url);
  }, [discountData, router]);

  const pricing = useMemo(() => {
    const subtotal = cartItems.reduce((sum, item) => {
      if (item.deleted_at) return sum;

      return sum + item.item_price * item.quantity;
    }, 0);

    let discountAmount = 0;
    if (discountData) {
      if (discountData.discount_type === "percentage") {
        discountAmount = (subtotal * discountData.discount_amount) / 100;
      } else {
        discountAmount = discountData.discount_amount;
      }
    }

    discountAmount = Math.min(discountAmount, subtotal);

    const total = subtotal - discountAmount;

    return {
      subtotal,
      discountAmount,
      total,
    };
  }, [cartItems, discountData]);

  useEffect(() => {
    const fetchCart = async () => {
      await AddToCart();
    };
    void fetchCart();
  }, [AddToCart]);
  return {
    cartItems,
    promoCode,
    setPromoCode,
    discountData,
    updateQuantity,
    removeItem,
    applyPromoCode,
    proceedToCheckout,
    loading,
    ...pricing,
  };
}
