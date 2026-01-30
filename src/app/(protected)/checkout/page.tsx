"use client";
import AddressSelection from "@/components/organisms/checkout/AddressSelection";
import PaymentMethod from "@/components/organisms/PaymentMethod";
import { useCheckout } from "@/hooks/useCheckout";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Page() {
  const {
    selectedAddress,
    setSelectedAddress,
    paymentMethod,
    setPaymentMethod,
    loading,
    handleConfirmOrder,
    isOrderPlaced,
    cartItems,
    orderSummary,
    discount
  } = useCheckout();

  if (isOrderPlaced) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Order Placed Successfully!</h1>
          <p className="text-gray-600">Thank you for your purchase.</p>
        </div>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white min-w-[200px]"
          onClick={() => globalThis.window.location.href = "/profile"}
        >
          Go to Profile
        </Button>
      </div>
    );
  }

  if (loading) return <div className="p-10 flex justify-center">Loading Checkout...</div>;

  return (
    <main className="max-w-6xl mx-auto p-4 min-h-screen">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        <p className="text-gray-600">Complete your purchase</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">1. Shipping Address</h2>
            <AddressSelection onSelect={setSelectedAddress} />
          </section>

          <section className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">2. Payment Method</h2>
            <PaymentMethod payment_method={paymentMethod} SetPayment_Method={setPaymentMethod} />
          </section>
        </div>

        {/* Right Section: Order Summary */}
        <aside className="lg:col-span-1">
          <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm sticky top-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Order Summary</h2>

            {/* Shipping To Preview */}
            <div className="mb-4 p-3 bg-slate-50 rounded-md border border-slate-100">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Shipping To</span>
              {selectedAddress ? (
                <div className="mt-1 text-sm text-gray-700">
                  <p className="font-medium">{selectedAddress.address_line1}</p>
                  <p>{selectedAddress.city}, {selectedAddress.state}</p>
                  <p>{selectedAddress.pincode}</p>
                </div>
              ) : (
                <p className="mt-1 text-sm text-red-500">Please select an address</p>
              )}
            </div>

            <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-1 scrollbar-thin">
              {cartItems.map((item) => (
                <div key={item.cart_item_id} className="flex gap-3 py-2 border-b border-slate-100 last:border-0">
                  <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden relative shrink-0">
                    {item.image_url? (
                      <Image
                        src={item.image_url}
                        alt={item.item_name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Img</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{item.item_name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    ₹{item.item_price * item.quantity}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-200 pt-4 space-y-2">
              {discount && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount ({discount.discount_code})</span>
                  <span>- ₹{orderSummary.discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-lg font-bold text-gray-900 border-t border-slate-100 pt-2 mt-2">
                <span>Total Amount</span>
                <span>₹{orderSummary.total.toFixed(2)}</span>
              </div>
            </div>

            <Button
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!selectedAddress || cartItems.length === 0}
              onClick={() => { void handleConfirmOrder(); }}
            >
              Confirm & Pay
            </Button>
          </div>
        </aside>
      </div>
    </main>
  );
}
