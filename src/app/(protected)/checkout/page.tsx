"use client";

import React, { useState } from "react";
import AddressSelection from "@/components/organisms/checkout/AddressSelection";
import PaymentMethod from "@/components/organisms/PaymentMethod";
import ItemDescription from "@/components/organisms/ItemDescription";

export default function Page() {
  const [selectedAddress, setSelectedAddress] = useState<any | null>(null);

  return (
    <main className="max-w-6xl mx-auto p-4 h-screen">
      <header className="mb-4">
        <h1 className="text-xl font-semibold">Preview of Product</h1>
        <p className="text-sm text-gray-600">Confirm details and place your order</p>
      </header>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100%-80px)]">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-4 overflow-y-auto pr-2">
          <AddressSelection onSelect={setSelectedAddress} />
          <PaymentMethod />
        </div>

        {/* Right Section */}
        <aside className="border rounded-lg p-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-600">Shipping to</div>
              <div className="text-sm text-gray-800 font-medium">
                {selectedAddress ? (
                  <div>
                   
                    <div className="text-sm text-gray-600">{selectedAddress.street}</div>
                    <div className="text-sm text-gray-600">{selectedAddress.city}, {selectedAddress.state} {selectedAddress.postalCode}</div>
                  </div>
                ) : (
                  <div className="text-sm text-red-600">No address selected</div>
                )}
              </div>
            </div>

            <ItemDescription
              id={"11"}
              Item_Name="Sample Item"
              Description="This is a sample item description."
              Price={29.99}
              variant="Standard"
              rating={4.5}
            />
          </div>

          {/* Place Order */}
          <div className="mt-4 border-t pt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Total</span>
              <span className="font-semibold">₹29.99</span>
            </div>

            <button
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
              disabled={!selectedAddress}
            >
              Place Order
            </button>
          </div>
        </aside>
      </div>
    </main>
  );
}
