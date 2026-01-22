"use client";

import { useCart } from "@/hooks/useCart";
import CartItemRow from "./CartItemRow";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
// import EmptyCartState from "./EmptyCartState"; // Removed as sidebar just hides when empty

export default function CartSidebar() {
    const { cartItems, updateQuantity, removeItem, proceedToCheckout, total } = useCart();

    if (cartItems.length === 0) {
        return null;
    }

    return (
        <div className="w-[355px] bg-white border-l h-[calc(100vh-4rem)] sticky top-16 flex flex-col shadow-sm">
            <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Your Cart</h2>
                <p className="text-sm text-gray-500">{cartItems.length} items</p>
            </div>

            <ScrollArea className="flex-1">
                <div className="p-4 space-y-4">
                    {cartItems.map((item) => (
                        <div key={item.cart_item_id}>
                            <CartItemRow
                                cartitem={item}
                                onQuantityChange={updateQuantity}
                                onRemove={removeItem}
                            />
                            <Separator className="mt-4" />
                        </div>
                    ))}
                </div>
            </ScrollArea>

            <div className="p-4 border-t bg-gray-50/50">
                <div className="space-y-3">
                    <div className="flex justify-between font-medium">
                        <span>Subtotal</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <Button
                        className="w-full bg-blue-600 hover:bg-blue-700 font-semibold"
                        onClick={proceedToCheckout}
                    >
                        Proceed to Checkout
                    </Button>
                </div>
            </div>
        </div>
    );
}
