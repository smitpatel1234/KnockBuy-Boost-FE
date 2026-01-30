"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { getItemCart } from "@/services/cartitem.service";
import { getDiscount } from "@/services/discount.service";
import { palceOrder } from "@/services/palceOrer.service";
import type { Address } from "@/types/address.types";
import type { GetAllItemCartType } from "@/types/itemcart.types";
import type { Discount } from "@/types/discount.types";
import type { payment_method as PaymentMethodType } from "@/types/placeorder.type";
import { socket } from "@/utils/helper/socket";

export const useCheckout = () => {
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>("CASH_ON_DELIVERY");
    const [loading, setLoading] = useState(true);
    const [cartItems, setCartItems] = useState<GetAllItemCartType[]>([]);
    const [discount, setDiscount] = useState<Discount | null>(null);
    const searchParams = useSearchParams();
    const paramDiscountId = searchParams.get("discountId");
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const cartRes = await getItemCart();
                setCartItems(cartRes.data.data);

                if (paramDiscountId) {
                    try {
                        const discountRes = await getDiscount(paramDiscountId);
                        setDiscount(discountRes.data);
                    } catch (e) {
                        console.error("Failed to load discount", e);
                        toast.error("Invalid discount code");
                    }
                }

            } catch (e) {
                console.error("Failed to load checkout data", e);
                toast.error("Failed to load cart items");
            } finally {
                setLoading(false);
            }
        };

        void fetchData();
    }, [paramDiscountId]);

    const orderSummary = useMemo(() => {
        const subtotal = cartItems.reduce((sum, item) => sum + item.item_price * item.quantity, 0);
        let discountAmount = 0;

        if (discount) {
            if (discount.discount_type === "percentage") {
                discountAmount = (subtotal * discount.discount_amount) / 100;
            } else {
                discountAmount = discount.discount_amount;
            }
        }
        discountAmount = Math.min(discountAmount, subtotal);
        const total = subtotal - discountAmount;

        return {
            subtotal,
            discountAmount,
            total,
            itemsCount: cartItems.length
        };
    }, [cartItems, discount]);

    const handleConfirmOrder = useCallback(async () => {
        if (!selectedAddress) {
            toast.error("Please select an address");
            return;
        }
        if (cartItems.length === 0) {
            toast.error("Your cart is empty");
            return;
        }

        try {
            setLoading(true);
            const orderRes  = await palceOrder({
                address_id: selectedAddress.address_id,
                payment_method: paymentMethod,
                discount_id: discount?.discount_id ?? undefined,
            }) as unknown as { data: { data: { order_id: string } } };
            socket.connect();
            socket.emit("placeOrderEvent", orderRes.data.data.order_id);
            socket.disconnect();
            toast.success("Order placed successfully!");
            setIsOrderPlaced(true);
        } catch (e) {
            console.error(e);
            toast.error("Failed to place order");
        } finally {
            setLoading(false);
        }
    }, [selectedAddress, paymentMethod, discount, cartItems]);

    return {
        selectedAddress,
        setSelectedAddress,
        paymentMethod,
        setPaymentMethod,
        loading,
        handleConfirmOrder,
        isOrderPlaced,
        cartItems,
        discount,
        orderSummary
    };
};
