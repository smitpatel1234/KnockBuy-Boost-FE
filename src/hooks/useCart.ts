"use client";
import { useCallback, useMemo, useState, useEffect } from "react";
import type { GetAllItemCartType } from "@/types/itemcart.types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchCart, removeCartItem, updateCartQuantity, applyPromoCode as applyCartPromo } from "@/redux/features/cart-slice";

export function useCart() {
  const dispatch = useAppDispatch();
  const { items: cartItems, discountData, loading } = useAppSelector((state) => state.cart);
  const [promoCode, setPromoCode] = useState("");
  const router = useRouter();

  const AddToCart = useCallback(() => {
    void dispatch(fetchCart());
  }, [dispatch]);

  const removeItem = useCallback(
    (id: string) => {
      void dispatch(removeCartItem(id));
    },
    [dispatch]
  );

  const updateQuantity = useCallback(
    (cart_item: GetAllItemCartType, newQuantity: number) => {
      if (newQuantity <= 0) {
        removeItem(cart_item.cart_item_id);
        return;
      }
      if (cart_item.stock < newQuantity) {
        toast.message(
          `only ${cart_item.stock.toString()} Quantity  is available for ${cart_item.item_name} product`
        );
        return;
      }

      void dispatch(updateCartQuantity({
        cart_item_id: cart_item.cart_item_id,
        quantity: newQuantity,
        item: cart_item.item_id,
      }));
    },
    [dispatch, removeItem]
  );

  const applyPromoCode = useCallback(async () => {
    if (!promoCode) return;
    try {
      await dispatch(applyCartPromo(promoCode)).unwrap();
      toast.success("Promo code applied successfully!");
    } catch (error: unknown) {
      toast.error(typeof error === "string" ? error : "Invalid or inactive promo code");
    }
  }, [dispatch, promoCode]);

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
    AddToCart();
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

