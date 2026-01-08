import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Shield, Truck } from "lucide-react";
import type { PromoCodeProps } from "@/types/cart.types";
import type { Discount } from "@/types/discount.types";

export default function PricingSummary({
  promoCode,
  onPromoCodeChange,
  onApplyPromoCode,
  discount,
  subtotal,
  discountData,
}: PromoCodeProps & { subtotal: number; discountData?: Discount | null }) {
  const router = useRouter();
  const total = subtotal - discount;

  const handleCheckout = () => {
    const params = new URLSearchParams();
    params.set("total", total.toString());
    if (discountData?.discount_id) {
      params.set("discountId", discountData.discount_id);
    }
    router.push(`/checkout?${params.toString()}`);
  };

  return (
    <div className="space-y-4">
      {/* Subtotal */}
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Subtotal</span>
        <span className="font-medium text-gray-900">
          ${subtotal.toFixed(2)}
        </span>
      </div>




      {/* Discount */}
      {discount > 0 && (
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Discount</span>
          <span className="font-medium text-green-600">
            -${discount.toFixed(2)}
          </span>
        </div>
      )}

      <Separator />

      {/* Total */}
      <div className="flex justify-between text-lg">
        <span className="font-semibold text-gray-900">Total</span>
        <span className="font-bold text-blue-600">${total.toFixed(2)}</span>
      </div>

      {/* Promo Code */}
      <div className="space-y-2 pt-4 border-t border-slate-200">
        <label className="text-sm font-medium text-gray-700">Promo Code</label>
        <div className="flex gap-2">
          <Input
            placeholder="Enter code"
            value={promoCode}
            onChange={(e) => { onPromoCodeChange(e.target.value); }}
            className="flex-1"
          />
          <Button variant="outline" onClick={() => void onApplyPromoCode()} className="px-4">
            Apply
          </Button>
        </div>
        {discount > 0 && (
          <Badge className="bg-green-100 text-green-700">
            Discount applied: ${discount.toFixed(2)}
          </Badge>
        )}
      </div>

      {/* Checkout Button */}
      <Button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 mt-6"
        onClick={handleCheckout}
      >
        Proceed to Checkout
      </Button>

      {/* Trust Badges */}
      <div className="space-y-2 pt-4 border-t border-slate-200 text-center">
        <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
          <Shield className="w-4 h-4" />
          Secure checkout
        </div>
        <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
          <Truck className="w-4 h-4" />
          Free returns
        </div>
      </div>
    </div>
  );
}
