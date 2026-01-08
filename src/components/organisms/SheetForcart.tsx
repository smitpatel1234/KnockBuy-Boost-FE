import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CartLayout from '@/components/templates/CartLayout'
import EmptyCartState from '@/components/organisms/cart/EmptyCartState'
import { useCart } from '@/hooks/useCart'
export function SheetForcart() {
      const {
        cartItems,
        promoCode,
        setPromoCode,
        discountAmount,
        discountData,
        updateQuantity,
        removeItem,
        applyPromoCode,
      } = useCart()
    
      if (cartItems.length === 0) {
        return <EmptyCartState />
      }
  return (
    <Sheet >
      <SheetTrigger>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
          <SheetDescription>
            Subtotal
            <Button>
                Go To Cart
            </Button>
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">Name</Label>
            <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">Username</Label>
            <Input id="sheet-demo-username" defaultValue="@peduarte" />
          </div>
        </div>
        <SheetFooter>

        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
